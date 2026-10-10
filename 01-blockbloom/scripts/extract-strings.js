/* Extract static user-facing string literals into res/values/strings.xml and rewrite the
   call sites. Compose sites become stringResource(R.string.key); the ViewModel's toasts
   become str(R.string.key) via a helper added separately.

   Usage: node extract-strings.js <repoRoot> [--dry]
   Only touches literals with NO $ interpolation and NO backslash escapes. */
const fs = require('fs'), path = require('path');

const ROOT = process.argv[2];
const DRY = process.argv.includes('--dry');
const SRC = path.join(ROOT, 'app/src/main/java/com/aweagle/blockbloom');

const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p); else if (e.name.endsWith('.kt')) files.push(p);
  }
})(SRC);

// aapt rejects a resource name that is a Java keyword ("continue" was the first casualty).
const RESERVED = new Set(('abstract assert boolean break byte case catch char class const continue ' +
  'default do double else enum extends final finally float for goto if implements import ' +
  'instanceof int interface long native new package private protected public return short static ' +
  'strictfp super switch synchronized this throw throws transient try void volatile while ' +
  'true false null').split(' '));

const keyOf = (s) => {
  let k = s.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 40);
  if (!k) k = 'str';
  if (/^[0-9]/.test(k)) k = 's_' + k;
  if (RESERVED.has(k)) k = k + '_label';
  return k;
};
const xmlEscape = (s) => s
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/'/g, "\\'").replace(/"/g, '\\"');

const strings = new Map();   // text -> key
const used = new Set();
function keyFor(text) {
  if (strings.has(text)) return strings.get(text);
  let k = keyOf(text), n = 2;
  while (used.has(k)) k = keyOf(text) + '_' + n++;
  used.add(k); strings.set(text, k);
  return k;
}

// kind -> [regex, how to build the replacement]
const SITES = [
  // NOTE: `label = "..."` is deliberately NOT here. In Compose that is an animation's
  // debug name for the inspector ("coachAlpha", "press", "score"), not anything a player
  // sees; localising those would be meaningless and would put stringResource calls in
  // places that are not always composable. Same for `title =`, which has no UI site here.
  ['Text',    /\bText\(\s*"([^"\\$]*)"/g,                     (k) => `Text(stringResource(R.string.${k})`],
  ['cd',      /\bcontentDescription\s*=\s*"([^"\\$]*)"/g,     (k) => `contentDescription = stringResource(R.string.${k})`],
  ['toastVM', /\btoast\(\s*"([^"\\$]*)"\s*\)/g,               (k) => `toast(str(R.string.${k}))`],
];

const report = [];
for (const f of files) {
  const rel = f.replace(/\\/g, '/').split('/com/aweagle/blockbloom/')[1];
  const isVm = rel === 'viewmodel/GameViewModel.kt';
  let text = fs.readFileSync(f, 'utf8');
  const before = text;
  let count = 0;

  for (const [kind, re, build] of SITES) {
    // Compose replacements only apply inside ui/; toast only inside the ViewModel.
    if (kind === 'toastVM' && !isVm) continue;
    if (kind !== 'toastVM' && !rel.startsWith('ui/')) continue;
    text = text.replace(re, (m, lit) => {
      if (!lit.trim()) return m;
      count++;
      return build(keyFor(lit));
    });
  }

  if (text !== before) {
    // imports
    if (!isVm) {
      if (!/^import androidx\.compose\.ui\.res\.stringResource/m.test(text)) {
        text = text.replace(/^(import )/m, 'import androidx.compose.ui.res.stringResource\n$1');
      }
      if (!/^import com\.aweagle\.blockbloom\.R/m.test(text)) {
        text = text.replace(/^(import )/m, 'import com.aweagle.blockbloom.R\n$1');
      }
    }
    report.push(`  ${String(count).padStart(3)}  ${rel}`);
    if (!DRY) fs.writeFileSync(f, text);
  }
}

// strings.xml — keep app_name, append the rest
const xmlPath = path.join(ROOT, 'app/src/main/res/values/strings.xml');
const entries = [...strings.entries()].map(([t, k]) => `    <string name="${k}">${xmlEscape(t)}</string>`);
const xml = `<resources>\n    <string name="app_name">Block Bloom</string>\n${entries.join('\n')}\n</resources>\n`;
if (!DRY) fs.writeFileSync(xmlPath, xml);

console.log(report.join('\n'));
console.log(`\n${strings.size} unique strings extracted across ${report.length} files${DRY ? ' (DRY RUN)' : ''}`);
fs.writeFileSync(path.join(__dirname, 'extracted-keys.json'), JSON.stringify([...strings.entries()].map(([t, k]) => ({ key: k, en: t })), null, 2));
