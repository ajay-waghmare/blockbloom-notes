/*
 * AW EagleCraft — baseline sync.
 *
 * Stamps the values in aweagle-baseline.toml into every app's build files, so
 * SDK levels and toolchain versions can never drift apart again. Before this
 * existed they already had: BlockBloom 35, Sortopia 35, QuizMaster 34.
 *
 * Usage:
 *   node D:\DevTools\_shared\tools\sync-baseline.js            # write
 *   node D:\DevTools\_shared\tools\sync-baseline.js --check    # report drift, write nothing
 *
 * --check exits 1 when anything is out of sync, so it doubles as a pre-release gate.
 *
 * Deliberately does NOT touch versionCode / versionName — those are per-app,
 * per-release values and must stay hand-controlled.
 *
 * Node 16 compatible: no dependencies.
 */
const fs = require('fs');
const path = require('path');

const BASELINE = path.join(__dirname, '..', 'aweagle-baseline.toml');
const CHECK_ONLY = process.argv.includes('--check');

/* ---------------------------------------------------------------------------
 * Minimal TOML reader. Handles exactly the subset the baseline uses:
 * [sections], key = "string", key = 36. Comments and blank lines are skipped.
 * A real TOML parser would be a dependency; this is 20 lines and enough.
 * ------------------------------------------------------------------------ */
function readToml(file) {
  const out = {};
  let section = null;
  for (let line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    line = line.trim();
    if (!line || line.startsWith('#')) continue;
    const sec = line.match(/^\[([^\]]+)\]$/);
    if (sec) { section = sec[1]; out[section] = out[section] || {}; continue; }
    const kv = line.match(/^([A-Za-z0-9_]+)\s*=\s*(.+?)\s*(?:#.*)?$/);
    if (!kv || !section) continue;
    let val = kv[2].trim();
    if (val.startsWith('"')) val = val.replace(/^"|"$/g, '');
    else if (/^\d+$/.test(val)) val = Number(val);
    out[section][kv[1]] = val;
  }
  return out;
}

/* Replace capture-group 2 of `re` in `src`. Reports what changed. */
function stamp(src, re, want, label, changes) {
  const m = src.match(re);
  if (!m) { changes.push({ label, status: 'MISSING', from: null, to: want }); return src; }
  if (String(m[2]) === String(want)) return src;
  changes.push({ label, status: 'DRIFT', from: m[2], to: want });
  return src.replace(re, (_, a, __, c) => `${a}${want}${c === undefined ? '' : c}`);
}

function syncApp(name, dir, base) {
  const changes = [];
  const files = {
    app:     path.join(dir, 'app', 'build.gradle.kts'),
    root:    path.join(dir, 'build.gradle.kts'),
    wrapper: path.join(dir, 'gradle', 'wrapper', 'gradle-wrapper.properties'),
  };
  for (const [k, f] of Object.entries(files)) {
    if (!fs.existsSync(f)) {
      console.log(`  ! ${name}: missing ${k} (${f}) — skipped`);
      return changes;
    }
  }

  // --- app/build.gradle.kts : SDK levels + compose compiler -----------------
  let app = fs.readFileSync(files.app, 'utf8');
  app = stamp(app, /(\bcompileSdk\s*=\s*)(\d+)()/,  base.android.compileSdk, 'compileSdk', changes);
  app = stamp(app, /(\btargetSdk\s*=\s*)(\d+)()/,   base.android.targetSdk,  'targetSdk',  changes);
  app = stamp(app, /(\bminSdk\s*=\s*)(\d+)()/,      base.android.minSdk,     'minSdk',     changes);
  app = stamp(app, /(kotlinCompilerExtensionVersion\s*=\s*")([^"]+)(")/,
              base.toolchain.composeCompilerExtension, 'composeCompilerExtension', changes);

  // --- build.gradle.kts : AGP + Kotlin plugin versions ----------------------
  let root = fs.readFileSync(files.root, 'utf8');
  root = stamp(root, /(id\("com\.android\.application"\)\s+version\s+")([^"]+)(")/,
               base.toolchain.agp, 'agp', changes);
  root = stamp(root, /(id\("org\.jetbrains\.kotlin\.android"\)\s+version\s+")([^"]+)(")/,
               base.toolchain.kotlin, 'kotlin', changes);

  // --- gradle-wrapper.properties : Gradle distribution ---------------------
  let wrap = fs.readFileSync(files.wrapper, 'utf8');
  wrap = stamp(wrap, /(distributionUrl=.*?gradle-)([0-9.]+)(-bin\.zip)/,
               base.toolchain.gradle, 'gradle', changes);

  if (!CHECK_ONLY && changes.some(c => c.status === 'DRIFT')) {
    fs.writeFileSync(files.app, app);
    fs.writeFileSync(files.root, root);
    fs.writeFileSync(files.wrapper, wrap);
  }
  return changes;
}

// --------------------------------------------------------------------------
const base = readToml(BASELINE);
console.log(`\nAW EagleCraft baseline  —  SDK ${base.android.compileSdk}/${base.android.targetSdk}` +
            `  AGP ${base.toolchain.agp}  Gradle ${base.toolchain.gradle}  Kotlin ${base.toolchain.kotlin}`);
console.log(CHECK_ONLY ? 'mode: CHECK (nothing will be written)\n' : 'mode: WRITE\n');

let drift = 0, missing = 0;
for (const [name, dir] of Object.entries(base.apps)) {
  const changes = syncApp(name, dir, base);
  if (!changes.length) { console.log(`  OK    ${name}`); continue; }
  console.log(`  ${CHECK_ONLY ? 'DRIFT' : 'FIXED'} ${name}`);
  for (const c of changes) {
    if (c.status === 'MISSING') { missing++; console.log(`          ! ${c.label}: not found in build files (expected ${c.to})`); }
    else { drift++; console.log(`          - ${c.label}: ${c.from} -> ${c.to}`); }
  }
}

console.log('');
if (missing) console.log(`${missing} value(s) could not be located — check those build files by hand.`);
if (!drift && !missing) { console.log('All apps match the baseline.\n'); process.exit(0); }
if (CHECK_ONLY) { console.log(`${drift} value(s) drifted. Run without --check to fix.\n`); process.exit(1); }
console.log(`${drift} value(s) stamped. Rebuild each touched app before releasing.\n`);
process.exit(missing ? 1 : 0);
