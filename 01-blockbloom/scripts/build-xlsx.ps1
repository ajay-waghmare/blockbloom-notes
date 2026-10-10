param(
  [string]$SheetsJson,
  [string]$OutFile
)
$ErrorActionPreference = 'Stop'

$sheets = Get-Content -LiteralPath $SheetsJson -Raw -Encoding UTF8 | ConvertFrom-Json

$xl = New-Object -ComObject Excel.Application
$xl.Visible = $false
$xl.DisplayAlerts = $false
$xl.ScreenUpdating = $false

try {
  $wb = $xl.Workbooks.Add()
  # Keep exactly one starting sheet.
  while ($wb.Sheets.Count -gt 1) { $wb.Sheets.Item($wb.Sheets.Count).Delete() }

  $idx = 0
  foreach ($s in $sheets) {
    $idx++
    if ($idx -eq 1) { $ws = $wb.Sheets.Item(1) }
    else { $ws = $wb.Sheets.Add([System.Reflection.Missing]::Value, $wb.Sheets.Item($wb.Sheets.Count)) }
    $ws.Name = $s.name

    $headers = @($s.headers)
    $nCols = $headers.Count
    $rows = @($s.rows)
    $nRows = $rows.Count

    # --- header row ---
    $hArr = New-Object 'object[,]' 1, $nCols
    for ($c = 0; $c -lt $nCols; $c++) { $hArr[0, $c] = [string]$headers[$c] }
    $ws.Range($ws.Cells.Item(1, 1), $ws.Cells.Item(1, $nCols)).Value2 = $hArr

    # --- pre-format text columns BEFORE writing, or Excel coerces them ---
    # "Sep 2026" is parsed as a date and stored as a serial number unless the column is text.
    for ($c = 0; $c -lt $nCols; $c++) {
      if ([string]$headers[$c] -eq 'Month') { $ws.Columns.Item($c + 1).NumberFormat = '@' }
    }

    # --- data ---
    $pctCells = New-Object System.Collections.ArrayList
    if ($nRows -gt 0) {
      $dArr = New-Object 'object[,]' $nRows, $nCols
      for ($r = 0; $r -lt $nRows; $r++) {
        $row = @($rows[$r])
        for ($c = 0; $c -lt $nCols; $c++) {
          $v = $null
          if ($c -lt $row.Count) { $v = $row[$c] }
          if ($null -ne $v -and $v -is [System.Management.Automation.PSCustomObject]) {
            $p = $v.PSObject.Properties['pct']
            if ($null -ne $p) {
              $v = [double]$p.Value
              # Bind the arithmetic to locals first: inside @( ), "$r + 2, $c + 1" parses
              # the comma before the addition and blows up on op_Addition.
              $rr = $r + 2
              $cc = $c + 1
              [void]$pctCells.Add([pscustomobject]@{ R = $rr; C = $cc })
            } else { $v = [string]$v }
          }
          $dArr[$r, $c] = $v
        }
      }
      $ws.Range($ws.Cells.Item(2, 1), $ws.Cells.Item($nRows + 1, $nCols)).Value2 = $dArr
    }

    # Every percentage value gets its format, wherever it sits - the Summary sheet keeps
    # them under a generic "Value" header, so formatting by column name alone misses them.
    foreach ($pc in $pctCells) { $ws.Cells.Item($pc.R, $pc.C).NumberFormat = '0.0%' }

    # --- header styling ---
    $hdr = $ws.Range($ws.Cells.Item(1, 1), $ws.Cells.Item(1, $nCols))
    $hdr.Font.Bold = $true
    $hdr.Font.Color = 16777215
    $hdr.Interior.Color = 8340256          # BGR for a deep teal
    $hdr.HorizontalAlignment = -4131
    $ws.Rows.Item(1).RowHeight = 22
    $hdr.VerticalAlignment = -4108

    # --- column widths ---
    if ($s.PSObject.Properties['widths']) {
      $w = @($s.widths)
      for ($c = 0; $c -lt $nCols -and $c -lt $w.Count; $c++) {
        $ws.Columns.Item($c + 1).ColumnWidth = [double]$w[$c]
      }
    } else {
      $ws.Columns.Item(1).EntireColumn.AutoFit() | Out-Null
    }

    # --- number formats by header name ---
    # Excel coerces an ISO date string to a serial number, so a Date column MUST get a
    # date format or it renders as e.g. 46273.
    for ($c = 0; $c -lt $nCols; $c++) {
      $h = [string]$headers[$c]
      if ($nRows -lt 1) { continue }
      $col = $ws.Range($ws.Cells.Item(2, $c + 1), $ws.Cells.Item($nRows + 1, $c + 1))
      if ($h -eq 'Churn' -or $h -eq 'Conversion') { $col.NumberFormat = '0.0%' }
      elseif ($h -eq 'Date') { $col.NumberFormat = 'yyyy-mm-dd' }
    }

    # --- freeze header + autofilter (skip on Summary) ---
    $ws.Activate()
    $ws.Range('A2').Select() | Out-Null
    $xl.ActiveWindow.FreezePanes = $true
    if ($s.name -ne 'Summary' -and $nRows -gt 0) {
      $ws.Range($ws.Cells.Item(1, 1), $ws.Cells.Item($nRows + 1, $nCols)).AutoFilter() | Out-Null
    }

    # --- Summary sheet extras ---
    if ($s.name -eq 'Summary') {
      $ws.Range('A2').Font.Bold = $true
      $ws.Range('B2').NumberFormat = '@'
      $ws.Columns.Item(3).WrapText = $false
      $ws.Range($ws.Cells.Item(2, 1), $ws.Cells.Item($nRows + 1, 1)).Font.Bold = $true
    }
  }

  $wb.Sheets.Item(1).Activate()
  $xl.ActiveWindow.FreezePanes = $false
  $wb.Sheets.Item(1).Range('A1').Select() | Out-Null

  $dir = Split-Path -Parent $OutFile
  if (-not (Test-Path -LiteralPath $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  if (Test-Path -LiteralPath $OutFile) { Remove-Item -LiteralPath $OutFile -Force }
  $wb.SaveAs($OutFile, 51)   # 51 = xlOpenXMLWorkbook (.xlsx)
  $wb.Close($false)
  "SAVED $OutFile"
}
finally {
  # Cleanup must never mask the real failure: Excel can refuse property sets
  # while it is busy (HRESULT 0x800AC472) and that would replace the true error.
  try { $xl.ScreenUpdating = $true } catch {}
  try { $xl.Quit() } catch {}
  try { [System.Runtime.InteropServices.Marshal]::ReleaseComObject($xl) | Out-Null } catch {}
  [GC]::Collect()
  [GC]::WaitForPendingFinalizers()
}
