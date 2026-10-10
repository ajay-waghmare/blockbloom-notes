/* Read-only: list the store-listing locales that exist. Opens an edit, GETs
 * listings, deletes the edit. Commits nothing.
 * Usage: node play-locales.js <sa.json> [package] */
const fs = require('fs'), crypto = require('crypto'), https = require('https');
const KEY = process.argv[2], PKG = process.argv[3] || 'com.aweagle.blockbloom';
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
  const t = await token();
  const H = { Authorization: `Bearer ${t}` };
  const base = `/androidpublisher/v3/applications/${PKG}/edits`;
  const ins = await req({ method: 'POST', hostname: 'androidpublisher.googleapis.com', path: base, headers: H });
  const id = JSON.parse(ins.body).id;
  const ls = await req({ method: 'GET', hostname: 'androidpublisher.googleapis.com', path: `${base}/${id}/listings`, headers: H });
  const j = JSON.parse(ls.body);
  const locs = (j.listings || []).map(l => l.language).sort();
  console.log(`store listings live in ${locs.length} locale(s):`);
  console.log('  ' + locs.join('  '));
  const want = ['en-US', 'pt-BR', 'tr-TR', 'ko-KR', 'de-DE', 'ja-JP', 'es-ES'];
  console.log('\nrelease-note locales I intend to send:');
  for (const w of want) console.log(`  ${locs.includes(w) ? 'OK  ' : 'MISSING  '}${w}`);
  await req({ method: 'DELETE', hostname: 'androidpublisher.googleapis.com', path: `${base}/${id}`, headers: H });
  console.log('\nedit discarded — nothing committed.');
})().catch(e => { console.error(e.message); process.exit(1); });
