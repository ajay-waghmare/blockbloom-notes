/*
 * AW EagleCraft — Play compliance preflight.
 *
 * Answers "will Google let me ship?" for the WHOLE portfolio in one command,
 * so a Play Console warning email is never the first time we hear about it.
 *
 * Usage:
 *   node D:\DevTools\_shared\tools\play-preflight.js
 *
 * Exits 1 if any app would be blocked. Checks, per app:
 *   1. targetSdk vs the current Play floor (+ days left on the clock)
 *   2. Edge-to-edge readiness — from API 36 the opt-out is IGNORED, so an app
 *      that still paints its own bar colours draws content under the status bar
 *   3. Orientation locks — apps targeting 36 cannot restrict orientation on
 *      large screens (games are exempt, but we want to SEE the lock, not guess)
 *   4. Godot projects — an empty target_sdk in export_presets.cfg silently
 *      inherits the engine default, which is how a build ships under-targeted
 *
 * Node 16 compatible: no dependencies.
 */
const fs = require('fs');
const path = require('path');

const BASELINE = path.join(__dirname, '..', 'aweagle-baseline.toml');

function readToml(file) {
  const out = {}; let section = null;
  for (let line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    line = line.trim();
    if (!line || line.startsWith('#')) continue;
    const sec = line.match(/^\[([^\]]+)\]$/);
    if (sec) { section = sec[1]; out[section] = out[section] || {}; continue; }
    const kv = line.match(/^([A-Za-z0-9_]+)\s*=\s*(.+?)\s*(?:#.*)?$/);
    if (!kv || !section) continue;
    let v = kv[2].trim();
    if (v.startsWith('"')) v = v.replace(/^"|"$/g, '');
    else if (/^\d+$/.test(v)) v = Number(v);
    out[section][kv[1]] = v;
  }
  return out;
}

const read = f => (fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : null);
const num  = (src, key) => { const m = src && src.match(new RegExp(`\\b${key}\\s*=\\s*(\\d+)`)); return m ? Number(m[1]) : null; };

/* Find MainActivity.kt without walking the whole tree twice. */
function findFile(dir, name, depth = 0) {
  if (depth > 8 || !fs.existsSync(dir)) return null;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { const hit = findFile(p, name, depth + 1); if (hit) return hit; }
    else if (e.name === name) return p;
  }
  return null;
}

function auditGradleApp(name, dir, floor) {
  const appGradle = read(path.join(dir, 'app', 'build.gradle.kts'));
  if (!appGradle) return { name, error: 'no app/build.gradle.kts' };

  const themes   = read(path.join(dir, 'app', 'src', 'main', 'res', 'values', 'themes.xml')) || '';
  const manifest = read(path.join(dir, 'app', 'src', 'main', 'AndroidManifest.xml')) || '';
  const mainAct  = findFile(path.join(dir, 'app', 'src', 'main'), 'MainActivity.kt');
  const mainSrc  = mainAct ? read(mainAct) : '';

  const vName = (appGradle.match(/versionName\s*=\s*"([^"]+)"/) || [])[1] || '?';
  const hazards = [];

  // API 36 ignores the edge-to-edge opt-out; these attrs then do nothing but
  // still signal the app was designed expecting insets it no longer gets.
  if (/<item\s+name="android:statusBarColor"/.test(themes) ||
      /<item\s+name="android:navigationBarColor"/.test(themes)) {
    hazards.push('themes.xml still sets statusBarColor/navigationBarColor (ignored at 36)');
  }
  if (/windowOptOutEdgeToEdgeEnforcement/.test(themes + manifest)) {
    hazards.push('edge-to-edge opt-out present — ignored from API 36');
  }
  if (mainSrc && !/enableEdgeToEdge/.test(mainSrc)) {
    hazards.push('MainActivity does not call enableEdgeToEdge()');
  }
  if (!/statusBarsPadding|navigationBarsPadding|systemBarsPadding|safeDrawingPadding/.test(
        listSources(path.join(dir, 'app', 'src', 'main')))) {
    hazards.push('no window-inset padding found in sources — content may sit under the bars');
  }
  const orient = manifest.match(/android:screenOrientation="([^"]+)"/);
  if (orient) hazards.push(`orientation locked to "${orient[1]}" — restricted on large screens at 36 (games exempt)`);

  return {
    name,
    compileSdk: num(appGradle, 'compileSdk'),
    targetSdk:  num(appGradle, 'targetSdk'),
    minSdk:     num(appGradle, 'minSdk'),
    versionCode: num(appGradle, 'versionCode'),
    versionName: vName,
    compliant: num(appGradle, 'targetSdk') >= floor,
    hazards,
  };
}

/* Concatenate source text once so the inset check is a single scan. */
function listSources(dir, acc = { s: '' }, depth = 0) {
  if (depth > 8 || !fs.existsSync(dir)) return acc.s;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) listSources(p, acc, depth + 1);
    else if (e.name.endsWith('.kt')) acc.s += fs.readFileSync(p, 'utf8');
  }
  return acc.s;
}

function auditGodot(name, dir, floor) {
  const cfg = read(path.join(dir, 'export_presets.cfg'));
  if (!cfg) return { name: name + ' (godot)', error: 'no export_presets.cfg' };
  const t = (cfg.match(/gradle_build\/target_sdk\s*=\s*"([^"]*)"/) || [])[1];
  return {
    name: name + ' (godot)',
    targetSdk: t ? Number(t) : null,
    compliant: !!t && Number(t) >= floor,
    hazards: t ? [] : ['gradle_build/target_sdk is EMPTY — inherits the engine default; set it explicitly'],
  };
}

// --------------------------------------------------------------------------
const base  = readToml(BASELINE);
const floor = base.play.required_target_sdk;
const days  = Math.ceil((new Date(base.play.deadline) - new Date()) / 86400000);

console.log(`\n  PLAY PREFLIGHT — target API floor ${floor}, deadline ${base.play.deadline} (${days} days)\n`);

const rows = [
  ...Object.entries(base.apps).map(([n, d]) => auditGradleApp(n, d, floor)),
  ...Object.entries(base.godot || {}).map(([n, d]) => auditGodot(n, d, floor)),
];

let blocked = 0, warned = 0;
for (const r of rows) {
  if (r.error) { console.log(`  ??  ${r.name.padEnd(18)} ${r.error}`); continue; }
  const mark = r.compliant ? 'OK ' : 'X  ';
  if (!r.compliant) blocked++;
  const ver = r.versionCode ? `vc${r.versionCode} (${r.versionName})` : '';
  console.log(`  ${mark} ${r.name.padEnd(18)} target ${String(r.targetSdk).padEnd(4)}` +
              `${r.compileSdk ? 'compile ' + r.compileSdk + '  ' : ''}${ver}`);
  for (const h of r.hazards) { warned++; console.log(`        !  ${h}`); }
}

console.log('');
if (blocked) {
  console.log(`  ${blocked} app(s) BELOW the API ${floor} floor — updates will be refused.`);
  console.log(`  Fix: set targetSdk in aweagle-baseline.toml, then: node tools\\sync-baseline.js\n`);
} else {
  console.log(`  All apps meet the API ${floor} floor.`);
  console.log(`  Next scheduled bump: ${base.cadence.next_review} (deadline ${base.cadence.next_deadline}).\n`);
}
if (warned) console.log(`  ${warned} behaviour warning(s) above — not release blockers, but they are what break visually at 36.\n`);
process.exit(blocked ? 1 : 0);
