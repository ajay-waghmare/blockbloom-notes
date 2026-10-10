/*
 * sheets.json -> a real .xlsx, written directly as OOXML in a zip.
 * No Excel, no COM, no dependencies - this machine's Office licence has expired
 * and its actual spreadsheet app is WPS, so driving Excel is not an option.
 *
 * Usage: node make-xlsx.js <sheets.json> <out.xlsx>
 */
const fs = require('fs');
const zlib = require('zlib');

const [SRC, OUT] = process.argv.slice(2);
if (!SRC || !OUT) { console.error('usage: node make-xlsx.js <sheets.json> <out.xlsx>'); process.exit(2); }
const sheets = JSON.parse(fs.readFileSync(SRC, 'utf8'));

/* ---------- zip ---------- */
const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c; }
  return t;
})();
function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}
function zip(files) {
  const local = [], central = [];
  let offset = 0, cdSize = 0;
  for (const f of files) {
    const name = Buffer.from(f.name, 'utf8');
    const raw = Buffer.isBuffer(f.data) ? f.data : Buffer.from(f.data, 'utf8');
    const comp = zlib.deflateRawSync(raw, { level: 9 });
    const crc = crc32(raw);
    const lh = Buffer.alloc(30);
    lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(0, 6);
    lh.writeUInt16LE(8, 8); lh.writeUInt16LE(0, 10); lh.writeUInt16LE(0x5929, 12);
    lh.writeUInt32LE(crc, 14); lh.writeUInt32LE(comp.length, 18); lh.writeUInt32LE(raw.length, 22);
    lh.writeUInt16LE(name.length, 26); lh.writeUInt16LE(0, 28);
    local.push(lh, name, comp);
    const ch = Buffer.alloc(46);
    ch.writeUInt32LE(0x02014b50, 0); ch.writeUInt16LE(20, 4); ch.writeUInt16LE(20, 6);
    ch.writeUInt16LE(0, 8); ch.writeUInt16LE(8, 10); ch.writeUInt16LE(0, 12); ch.writeUInt16LE(0x5929, 14);
    ch.writeUInt32LE(crc, 16); ch.writeUInt32LE(comp.length, 20); ch.writeUInt32LE(raw.length, 24);
    ch.writeUInt16LE(name.length, 28); ch.writeUInt16LE(0, 30); ch.writeUInt16LE(0, 32);
    ch.writeUInt16LE(0, 34); ch.writeUInt16LE(0, 36); ch.writeUInt32LE(0, 38);
    ch.writeUInt32LE(offset, 42);
    central.push(ch, name);
    cdSize += 46 + name.length;
    offset += 30 + name.length + comp.length;
  }
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(files.length, 8); end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(cdSize, 12); end.writeUInt32LE(offset, 16);
  return Buffer.concat([...local, ...central, end]);
}

/* ---------- helpers ---------- */
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const colName = n => { let s = ''; while (n > 0) { const r = (n - 1) % 26; s = String.fromCharCode(65 + r) + s; n = (n - r - 1) / 26; } return s; };
const EPOCH = Date.UTC(1899, 11, 30);
const isISODate = v => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v);
const dateSerial = v => { const [y, m, d] = v.split('-').map(Number); return (Date.UTC(y, m - 1, d) - EPOCH) / 86400000; };

/* style ids: 0 default | 1 header | 2 percent | 3 date | 4 bold */
const S_DEFAULT = 0, S_HEADER = 1, S_PCT = 2, S_DATE = 3, S_BOLD = 4;

const STYLES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<numFmts count="2"><numFmt numFmtId="164" formatCode="0.0%"/><numFmt numFmtId="165" formatCode="yyyy\\-mm\\-dd"/></numFmts>
<fonts count="3">
<font><sz val="11"/><color theme="1"/><name val="Calibri"/></font>
<font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font>
<font><b/><sz val="11"/><color theme="1"/><name val="Calibri"/></font>
</fonts>
<fills count="3">
<fill><patternFill patternType="none"/></fill>
<fill><patternFill patternType="gray125"/></fill>
<fill><patternFill patternType="solid"><fgColor rgb="FF0C8E80"/><bgColor indexed="64"/></patternFill></fill>
</fills>
<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>
<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
<cellXfs count="5">
<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
<xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="center"/></xf>
<xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>
<xf numFmtId="165" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>
<xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1"/>
</cellXfs>
<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>`;

/* ---------- build each sheet ---------- */
function cellXml(ref, value, style) {
  const s = style ? ` s="${style}"` : '';
  if (value === null || value === undefined || value === '') return '';
  if (typeof value === 'number') return `<c r="${ref}"${s}><v>${value}</v></c>`;
  return `<c r="${ref}"${s} t="inlineStr"><is><t xml:space="preserve">${esc(value)}</t></is></c>`;
}

const sheetXmls = sheets.map(sh => {
  const headers = sh.headers;
  const nCols = headers.length;
  const isSummary = sh.name === 'Summary';
  const dateCols = new Set(headers.map((h, i) => h === 'Date' ? i : -1).filter(i => i >= 0));
  const textCols = new Set(headers.map((h, i) => h === 'Month' ? i : -1).filter(i => i >= 0));

  const rows = [];
  rows.push(`<row r="1" ht="22" customHeight="1">` +
    headers.map((h, i) => cellXml(colName(i + 1) + '1', h, S_HEADER)).join('') + `</row>`);

  sh.rows.forEach((r, ri) => {
    const rn = ri + 2;
    let cells = '';
    for (let c = 0; c < nCols; c++) {
      let v = r[c];
      let style = S_DEFAULT;
      if (v && typeof v === 'object' && Object.prototype.hasOwnProperty.call(v, 'pct')) {
        v = v.pct; style = S_PCT;
      } else if (isISODate(v) && dateCols.has(c)) {
        v = dateSerial(v); style = S_DATE;
      } else if (textCols.has(c)) {
        v = v === null || v === undefined ? null : String(v);
      } else if (isSummary && c === 0 && v) {
        style = S_BOLD;
      }
      cells += cellXml(colName(c + 1) + rn, v, style);
    }
    rows.push(`<row r="${rn}">${cells}</row>`);
  });

  const widths = (sh.widths || []).map((w, i) =>
    `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join('');
  const lastRow = sh.rows.length + 1;
  const dim = `A1:${colName(nCols)}${lastRow}`;
  const filter = (!isSummary && sh.rows.length)
    ? `<autoFilter ref="${dim}"/>` : '';

  return {
    name: sh.name,
    xml: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<dimension ref="${dim}"/>
<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/><selection pane="bottomLeft" activeCell="A2" sqref="A2"/></sheetView></sheetViews>
<sheetFormatPr defaultRowHeight="15"/>
${widths ? `<cols>${widths}</cols>` : ''}
<sheetData>${rows.join('')}</sheetData>
${filter}
</worksheet>`,
  };
});

/* ---------- package ---------- */
const CT = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
${sheetXmls.map((s, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('\n')}
</Types>`;

const RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`;

const WB = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<sheets>${sheetXmls.map((s, i) => `<sheet name="${esc(s.name)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join('')}</sheets>
</workbook>`;

const WBRELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
${sheetXmls.map((s, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join('\n')}
<Relationship Id="rId${sheetXmls.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;

const files = [
  { name: '[Content_Types].xml', data: CT },
  { name: '_rels/.rels', data: RELS },
  { name: 'xl/workbook.xml', data: WB },
  { name: 'xl/_rels/workbook.xml.rels', data: WBRELS },
  { name: 'xl/styles.xml', data: STYLES },
  ...sheetXmls.map((s, i) => ({ name: `xl/worksheets/sheet${i + 1}.xml`, data: s.xml })),
];

fs.writeFileSync(OUT, zip(files));
console.log(`wrote ${OUT}  (${fs.statSync(OUT).size.toLocaleString()} bytes, ${sheets.length} sheets)`);
sheets.forEach(s => console.log(`  ${s.name.padEnd(18)} ${s.rows.length} rows x ${s.headers.length} cols`));
