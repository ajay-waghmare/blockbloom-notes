/* Read-only: list one-time products via the CURRENT monetization API (the legacy
 * inappproducts endpoint now returns 403 "migrate to the new publishing API").
 * Usage: node play-products.js <sa.json> [package] */
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
  const tk = await token();
  const H = { Authorization: `Bearer ${tk}` };
  const paths = [
    ['one-time products', `/androidpublisher/v3/applications/${PKG}/monetization/onetimeproducts`],
    ['subscriptions', `/androidpublisher/v3/applications/${PKG}/subscriptions`],
  ];
  for (const [label, p] of paths) {
    const r = await req({ method: 'GET', hostname: 'androidpublisher.googleapis.com', path: p, headers: H });
    console.log(`\n### ${label}  (HTTP ${r.status})`);
    if (r.status === 204 || !r.body.trim()) { console.log('  (empty — none defined)'); continue; }
    let j; try { j = JSON.parse(r.body); } catch { console.log('  ' + r.body.slice(0, 300)); continue; }
    if (j.error) { console.log('  ' + (j.error.message || '').split('\n')[0]); continue; }
    const items = j.oneTimeProducts || j.subscriptions || [];
    if (!items.length) { console.log('  (none defined)'); continue; }
    for (const it of items) console.log('  ' + (it.productId || it.sku || JSON.stringify(it).slice(0, 80)));
  }
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
