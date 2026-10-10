/* READ-ONLY GA4: October so far, split by what can distinguish real devices from
 * the emulator (app version / device model / country).
 * Usage: node ga4-oct.js <sa.json> <propertyId> <startDate> */
const fs = require('fs'), crypto = require('crypto'), https = require('https');
const KEY = process.argv[2], PROPERTY = process.argv[3], START = process.argv[4] || '2026-10-01';
const sa = JSON.parse(fs.readFileSync(KEY, 'utf8'));
const b64 = s => Buffer.from(s).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const req = (o, body) => new Promise((res, rej) => {
  const r = https.request(o, x => { const d = []; x.on('data', c => d.push(c)); x.on('end', () => res({ status: x.statusCode, body: Buffer.concat(d).toString('utf8') })); });
  r.on('error', rej); if (body) r.write(body); r.end();
});
async function token() {
  const now = Math.floor(Date.now() / 1000);
  const si = `${b64(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))}.${b64(JSON.stringify({ iss: sa.client_email, scope: 'https://www.googleapis.com/auth/analytics.readonly', aud: sa.token_uri, iat: now, exp: now + 3600 }))}`;
  const sg = crypto.createSign('RSA-SHA256'); sg.update(si);
  const form = `grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${si}.${b64(sg.sign(sa.private_key))}`;
  const r = await req({ method: 'POST', hostname: 'oauth2.googleapis.com', path: '/token', headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(form) } }, form);
  return JSON.parse(r.body).access_token;
}
const run = (tk, body) => req({
  method: 'POST', hostname: 'analyticsdata.googleapis.com',
  path: `/v1beta/properties/${PROPERTY}:runReport`,
  headers: { Authorization: `Bearer ${tk}`, 'Content-Type': 'application/json' },
}, JSON.stringify(body)).then(r => JSON.parse(r.body));

const rows = j => (j.rows || []).map(r => ({ d: r.dimensionValues.map(v => v.value), v: r.metricValues.map(v => Number(v.value)) }));

(async () => {
  const tk = await token();
  const dateRanges = [{ startDate: START, endDate: 'today' }];
  const M = [{ name: 'activeUsers' }, { name: 'newUsers' }, { name: 'sessions' }];

  for (const dim of ['appVersion', 'deviceModel', 'country']) {
    console.log(`\n=== BY ${dim.toUpperCase()}  (${START} → today) ===`);
    const j = await run(tk, { dateRanges, dimensions: [{ name: dim }], metrics: M,
      orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }], limit: 25 });
    if (j.error) { console.log('  HTTP error: ' + (j.error.message || '').split('\n')[0]); continue; }
    const list = rows(j);
    if (!list.length) { console.log('  (no rows)'); continue; }
    console.log('  ' + 'value'.padEnd(30) + 'active'.padStart(7) + 'new'.padStart(6) + 'sessions'.padStart(10));
    for (const r of list) {
      console.log('  ' + (r.d[0] || '(not set)').padEnd(30) + String(r.v[0]).padStart(7) + String(r.v[1]).padStart(6) + String(r.v[2]).padStart(10));
    }
  }
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
