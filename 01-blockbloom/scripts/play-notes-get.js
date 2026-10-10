/* Read-only: print the release-notes TEXT per locale for every release on a track.
 * Opens an edit, reads the track, deletes the edit. Commits nothing.
 * Usage: node play-notes-get.js <sa.json> [package] [track]
 */
const fs = require('fs'), crypto = require('crypto'), https = require('https');
const KEY = process.argv[2], PKG = process.argv[3] || 'com.aweagle.blockbloom', TRACK = process.argv[4] || 'production';
if (!KEY) { console.error('Usage: node play-notes-get.js <sa.json> [package] [track]'); process.exit(2); }
const sa = JSON.parse(fs.readFileSync(KEY, 'utf8'));
const b64 = s => Buffer.from(s).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const req = (o, b) => new Promise((res, rej) => {
  const r = https.request(o, x => { const d = []; x.on('data', c => d.push(c)); x.on('end', () => res({ status: x.statusCode, body: Buffer.concat(d).toString('utf8') })); });
  r.on('error', rej); if (b) r.write(b); r.end();
});
async function token() {
  const now = Math.floor(Date.now() / 1000);
  const si = `${b64(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))}.${b64(JSON.stringify({ iss: sa.client_email, scope: 'https://www.googleapis.com/auth/androidpublisher', aud: sa.token_uri, iat: now, exp: now + 3600 }))}`;
  const sg = crypto.createSign('RSA-SHA256'); sg.update(si);
  const form = `grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${si}.${b64(sg.sign(sa.private_key))}`;
  const r = await req({ method: 'POST', hostname: 'oauth2.googleapis.com', path: '/token', headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(form) } }, form);
  return JSON.parse(r.body).access_token;
}
(async () => {
  const tk = await token();
  const H = { Authorization: `Bearer ${tk}`, 'Content-Type': 'application/json' };
  const base = `/androidpublisher/v3/applications/${PKG}/edits`;
  const ins = await req({ method: 'POST', hostname: 'androidpublisher.googleapis.com', path: base, headers: H }, '{}');
  const edit = JSON.parse(ins.body); if (!edit.id) { console.error('edits.insert failed', ins.status, ins.body.slice(0, 200)); process.exit(1); }
  try {
    const tr = await req({ method: 'GET', hostname: 'androidpublisher.googleapis.com', path: `${base}/${edit.id}/tracks/${TRACK}`, headers: H });
    const t = JSON.parse(tr.body);
    for (const rel of (t.releases || [])) {
      console.log(`\n### ${rel.name}  status=${rel.status}  versionCodes=${(rel.versionCodes || []).join(',')}${rel.userFraction != null ? '  userFraction=' + rel.userFraction : ''}`);
      for (const n of (rel.releaseNotes || [])) console.log(`\n[${n.language}] (${[...n.text].length} chars)\n${n.text}`);
    }
  } finally {
    const del = await req({ method: 'DELETE', hostname: 'androidpublisher.googleapis.com', path: `${base}/${edit.id}`, headers: H });
    console.log(`\nEdit discarded (HTTP ${del.status}). Nothing committed.`);
  }
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
