/* Measure real touch-target sizes from a uiautomator dump.
   Usage: node a11y-targets.js <dump.xml> <densityDpi>
   Android's accessibility guidance is a 48x48dp minimum for anything tappable. */
const fs = require('fs');
const xml = fs.readFileSync(process.argv[2], 'utf8');
const scale = Number(process.argv[3]) / 160;

const out = [];
const re = /<node[^>]*\/?>/g;
let m;
while ((m = re.exec(xml)) !== null) {
  const n = m[0];
  if (!/clickable="true"/.test(n)) continue;
  const b = /bounds="\[(\d+),(\d+)\]\[(\d+),(\d+)\]"/.exec(n);
  if (!b) continue;
  const w = Math.round((b[3] - b[1]) / scale);
  const h = Math.round((b[4] - b[2]) / scale);
  if (w === 0 || h === 0) continue;
  const cd = (/content-desc="([^"]*)"/.exec(n) || [])[1] || '';
  const tx = (/text="([^"]*)"/.exec(n) || [])[1] || '';
  out.push({ label: (cd || tx || '(unlabelled)').slice(0, 30), w, h });
}

out.sort((a, b) => Math.min(a.w, a.h) - Math.min(b.w, b.h));
let fails = 0;
for (const o of out) {
  const bad = o.w < 48 || o.h < 48;
  if (bad) fails++;
  console.log(`  ${bad ? 'FAIL' : 'ok  '} ${String(o.w).padStart(3)}x${String(o.h).padStart(3)} dp   ${o.label}`);
}
console.log(`\n  ${out.length} tappable nodes, ${fails} below the 48dp minimum`);
