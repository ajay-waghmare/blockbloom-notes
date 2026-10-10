/* READ-ONLY inventory of user-facing string literals in the Block Bloom sources.
   Usage: node inv-strings.js <repoRoot>
   Classifies each as static (localisable as-is) or interpolated (needs a format string). */
const fs = require('fs'), path = require('path');

const ROOT = process.argv[2] || 'D:/DevTools/BlockBloom';
const SRC = path.join(ROOT, 'app/src/main/java/com/aweagle/blockbloom');

const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.kt')) files.push(p);
  }
})(SRC);

// A Kotlin double-quoted literal on one line (no escaped-quote handling needed here).
const SITES = [
  ['Text', /\bText\(\s*"((?:[^"\\]|\\.)*)"/g],
  ['contentDescription', /\bcontentDescription\s*=\s*"((?:[^"\\]|\\.)*)"/g],
  ['label', /\blabel\s*=\s*"((?:[^"\\]|\\.)*)"/g],
  ['title', /\btitle\s*=\s*"((?:[^"\\]|\\.)*)"/g],
  ['body', /\bbody\s*=\s*"((?:[^"\\]|\\.)*)"/g],
  ['toast', /\btoast\(\s*"((?:[^"\\]|\\.)*)"/g],
];

const rows = [];
for (const f of files) {
  const text = fs.readFileSync(f, 'utf8');
  const rel = f.replace(/\\/g, '/').split('/com/aweagle/blockbloom/')[1];
  for (const [kind, re] of SITES) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(text)) !== null) {
      const s = m[1];
      if (!s.trim()) continue;
      rows.push({ file: rel, kind, text: s, interp: /\$/.test(s) });
    }
  }
}

const byKind = {};
for (const r of rows) {
  byKind[r.kind] = byKind[r.kind] || { static: 0, interp: 0 };
  byKind[r.kind][r.interp ? 'interp' : 'static']++;
}

console.log('=== BY KIND ===');
let ts = 0, ti = 0;
for (const [k, v] of Object.entries(byKind)) {
  console.log(`  ${k.padEnd(20)} static ${String(v.static).padStart(3)}   interpolated ${String(v.interp).padStart(3)}`);
  ts += v.static; ti += v.interp;
}
console.log(`  ${'TOTAL'.padEnd(20)} static ${String(ts).padStart(3)}   interpolated ${String(ti).padStart(3)}   all ${ts + ti}`);

console.log('\n=== BY FILE (static only) ===');
const byFile = {};
for (const r of rows) if (!r.interp) byFile[r.file] = (byFile[r.file] || 0) + 1;
for (const [f, n] of Object.entries(byFile).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(3)}  ${f}`);
}

console.log('\n=== INTERPOLATED (need format strings) ===');
for (const r of rows.filter(r => r.interp)) {
  console.log(`  [${r.kind}] ${r.file}  ::  ${r.text}`);
}

fs.writeFileSync(path.join(__dirname, 'strings-inventory.json'), JSON.stringify(rows, null, 2));
console.log(`\nwrote strings-inventory.json (${rows.length} sites)`);
