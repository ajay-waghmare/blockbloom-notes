param([string]$Json,[string]$InDir,[string]$OutDir)
Add-Type -AssemblyName System.Drawing
$cfg = Get-Content -Raw -Encoding UTF8 $Json | ConvertFrom-Json
$font = New-Object System.Drawing.Font("Yu Gothic UI Semibold", 64, [System.Drawing.GraphicsUnit]::Pixel)
"font resolved: " + $font.Name + " (" + $font.Size + "px)"
$panelH = 340
foreach ($item in $cfg.items) {
  $src = [System.Drawing.Bitmap]::FromFile((Join-Path $InDir $item.file))
  $w = $src.Width; $h = $src.Height
  $bmp = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.DrawImage($src, 0, 0, $w, $h)
  $bg = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 11, 13, 36))
  $g.FillRectangle($bg, 0, 0, $w, $panelH)
  $accent = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 46, 230, 182))
  $g.FillRectangle($accent, 0, ($panelH - 5), $w, 5)
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $sf = New-Object System.Drawing.StringFormat
  $sf.Alignment = [System.Drawing.StringAlignment]::Center
  $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
  $rect = New-Object System.Drawing.RectangleF 0, 0, $w, ($panelH - 5)
  $g.DrawString($item.caption, $font, [System.Drawing.Brushes]::White, $rect, $sf)
  $out = Join-Path $OutDir $item.out
  $bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
  "{0}  <- {1}  {2}x{3} {4}" -f $item.out, $item.file, $bmp.Width, $bmp.Height, $bmp.PixelFormat
  $g.Dispose(); $bmp.Dispose(); $src.Dispose()
}
