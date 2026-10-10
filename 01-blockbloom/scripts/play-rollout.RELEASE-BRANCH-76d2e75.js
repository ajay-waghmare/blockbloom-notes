/*
 * Block Bloom — promote an ALREADY-UPLOADED versionCode to a full rollout on a track.
 *
 * Flow: auth -> edits.insert -> set track release (status=completed, 100%) with
 *       release notes -> edits.commit (Google sends for review automatically).
 * It does NOT upload a bundle — the AAB must already be on Google (run
 * play-upload.js first to stage it). This is the "make it live to testers" step.
 *
 * Usage:
 *   PLAY_SA_FILE=<path-to-sa.json> \
 *     node tools/play-rollout.js <versionCode> [package] [track] [releaseName] [status]
 *   defaults: package=com.aweagle.blockbloom  track=alpha  status=completed
 *
 * Node 16 compatible: built-in https + crypto only.
 */
const fs = require('fs');
const crypto = require('crypto');
const https = require('https');

const VERSION_CODE = process.argv[2];
const PACKAGE = process.argv[3] || 'com.aweagle.blockbloom';
const TRACK = process.argv[4] || 'alpha';
const RELEASE_NAME = process.argv[5] || `${VERSION_CODE} (rollout)`;
const STATUS = process.argv[6] || 'completed';
// Optional staged rollout: pass a fraction (0.2 = 20%) as arg 7. Play requires
// status=inProgress for anything below 100%, and a partial rollout can be halted
// from the console - a full one reaches everyone before you know there is a problem.
const USER_FRACTION = process.argv[7] ? Number(process.argv[7]) : null;

const path = require('path');
const notesPath = path.join(__dirname, 'release-notes', `vc${VERSION_CODE}.json`);
const RELEASE_NOTES = fs.existsSync(notesPath)
  ? JSON.parse(fs.readFileSync(notesPath, 'utf8'))
  : [{
      language: 'en-US',
      text: 'Bug fixes and visual polish.',
    }];

if (!VERSION_CODE) {
  console.error('Usage: node play-rollout.js <versionCode> [package] [track] [releaseName] [status]');
  process.exit(2);
}

function loadCredential() {
  if (process.env.PLAY_SA_FILE && process.env.PLAY_SA_FILE.trim()) {
    return JSON.parse(fs.readFileSync(process.env.PLAY_SA_FILE.trim(), 'utf8'));
  }
  if (process.env.PLAY_SA_JSON && process.env.PLAY_SA_JSON.trim()) {
    return JSON.parse(process.env.PLAY_SA_JSON);
  }
  throw new Error('Set PLAY_SA_FILE (path to the JSON file) or PLAY_SA_JSON (inline JSON) env var.');
}
const sa = loadCredential();

function b64url(input) {
  return Buffer.from(input).toString('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function httpRequest(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}
function safeParse(s) { try { return JSON.parse(s); } catch (e) { return null; } }

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64url(JSON.stringify({
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/androidpublisher',
    aud: sa.token_uri, iat: now, exp: now + 3600,
  }));
  const signingInput = `${header}.${claims}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signingInput);
  const jwt = `${signingInput}.${b64url(signer.sign(sa.private_key))}`;
  const form = `grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${jwt}`;
  const res = await httpRequest({
    method: 'POST', hostname: 'oauth2.googleapis.com', path: '/token',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(form) },
  }, form);
  const json = safeParse(res.body);
  if (res.status !== 200 || !json || !json.access_token) throw new Error(`Auth failed (${res.status}): ${res.body}`);
  return json.access_token;
}

function api(token, method, path, body) {
  const headers = { Authorization: `Bearer ${token}` };
  let payload = null;
  if (body) {
    payload = JSON.stringify(body);
    headers['Content-Type'] = 'application/json';
    headers['Content-Length'] = Buffer.byteLength(payload);
  }
  return httpRequest({
    method, hostname: 'androidpublisher.googleapis.com',
    path: `/androidpublisher/v3/applications/${encodeURIComponent(PACKAGE)}${path}`, headers,
  }, payload).then((r) => ({ status: r.status, json: safeParse(r.body), raw: r.body }));
}

function die(msg, detail) { console.error(`\n✖ ${msg}`); if (detail) console.error(detail); process.exit(3); }

(async () => {
  console.log(`Promoting versionCode ${VERSION_CODE} to a FULL rollout (status=${STATUS}) on '${TRACK}'…`);
  console.log(`  package : ${PACKAGE}`);
  console.log(`  track   : ${TRACK}`);
  console.log(`  release : "${RELEASE_NAME}"\n`);

  const token = await getAccessToken();
  console.log('• auth OK');

  const edit = await api(token, 'POST', '/edits');
  if (edit.status !== 200 || !edit.json) die(`edits.insert failed (${edit.status})`, edit.raw);
  const editId = edit.json.id;
  console.log(`• edit opened (${editId})`);

  const release = { name: RELEASE_NAME, status: STATUS, versionCodes: [String(VERSION_CODE)], releaseNotes: RELEASE_NOTES };
  if (USER_FRACTION != null) { release.status = 'inProgress'; release.userFraction = USER_FRACTION; }
  const trackBody = { track: TRACK, releases: [release] };
  const tr = await api(token, 'PUT', `/edits/${editId}/tracks/${encodeURIComponent(TRACK)}`, trackBody);
  if (tr.status !== 200) {
    await api(token, 'DELETE', `/edits/${editId}`);
    die(`track update failed (${tr.status})`, tr.raw);
  }
  console.log(`• track '${TRACK}' set → ${STATUS} release "${RELEASE_NAME}" [${VERSION_CODE}]`);

  // No changesNotSentForReview param: this app forces review, so Google sends the
  // changes for review automatically. Setting the param returns HTTP 400.
  const commit = await api(token, 'POST', `/edits/${editId}:commit`);
  if (commit.status !== 200) {
    die(`commit failed (${commit.status})`, commit.raw + '\n(The edit was NOT committed; nothing changed.)');
  }
  console.log(`• committed (edit ${editId}).`);
  console.log(`\n✔ Done. versionCode ${VERSION_CODE} is now a ${STATUS} release on '${TRACK}'.`);
  console.log('  It goes through Google review, then reaches opted-in testers.');
})().catch((e) => { die('unexpected error', e && e.stack ? e.stack : String(e)); });
