/* Read-only GA4: everything about ONE app version — daily actives, events, countries, devices.
 * Usage: node ga4-version.js <sa.json> <appVersion> [startDate=2026-10-01] [endDate=today]
 * Use it right after a rollout to see whether the new build is crashing or shedding users.
 */
const fs = require('fs'), crypto = require('crypto'), https = require('https');
const [,, KEY, VERSION, START = '2026-10-01', END = 'today'] = process.argv;
const PROPERTY = '555700046';
if (!KEY || !VERSION) { console.error('Usage: node ga4-version.js <sa.json> <appVersion> [start] [end]'); process.exit(2); }
const sa = JSON.parse(fs.readFileSync(KEY, 'utf8'));
const b64 = s => Buffer.from(s).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const req = (o, b) => new Promise((res, rej) => {
  const r = https.request(o, x => { const d = []; x.on('data', c => d.push(c)); x.on('end', () => res({ status: x.statusCode, body: Buffer.concat(d).toString('utf8') })); });
  r.on('error', rej); if (b) r.write(b); r.end();
});
async function token() {
  const now = Math.floor(Date.now() / 1000);
  const si = `${b64(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))}.${b64(JSON.stringify({ iss: sa.client_email, scope: 'https://www.googleapis.com/auth/analytics.readonly', aud: sa.token_uri, iat: now, exp: now + 3600 }))}`;
  const sg = crypto.createSign('RSA-SHA256'); sg.update(si);
  const form = `grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${si}.${b64(sg.sign(sa.private_key))}`;
  const r = await req({ method: 'POST', hostname: 'oauth2.googleapis.com', path: '/token', headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(form) } }, form);
  return JSON.parse(r.body).access_token;
}
async function report(tk, dims, metrics, extra = {}) {
  const body = JSON.stringify({
    dateRanges: [{ startDate: START, endDate: END }],
    dimensions: dims.map(name => ({ name })),
    metrics: metrics.map(name => ({ name })),
    dimensionFilter: { filter: { fieldName: 'appVersion', stringFilter: { matchType: 'EXACT', value: VERSION } } },
    limit: 50, ...extra,
  });
  const r = await req({ method: 'POST', hostname: 'analyticsdata.googleapis.com', path: `/v1beta/properties/${PROPERTY}:runReport`, headers: { Authorization: `Bearer ${tk}`, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } }, body);
  if (r.status !== 200) throw new Error(`GA4 ${r.status}: ${r.body.slice(0, 300)}`);
  const j = JSON.parse(r.body);
  return (j.rows || []).map(row => [...row.dimensionValues.map(v => v.value), ...row.metricValues.map(v => v.value)]);
}
function table(title, head, rows) {
  console.log(`\n== ${title} (appVersion=${VERSION}, ${START}..${END}) ==`);
  if (!rows.length) { console.log('  (no rows yet)'); return; }
  console.log('  ' + head.map((h, i) => h.padEnd(i === 0 ? 28 : 10)).join(''));
  for (const r of rows) console.log('  ' + r.map((v, i) => String(v).padEnd(i === 0 ? 28 : 10)).join(''));
}
(async () => {
  const tk = await token();
  table('Daily', ['date', 'active', 'new', 'sessions'], await report(tk, ['date'], ['activeUsers', 'newUsers', 'sessions'], { orderBys: [{ dimension: { dimensionName: 'date' } }] }));
  table('Events', ['event', 'count', 'users'], await report(tk, ['eventName'], ['eventCount', 'totalUsers'], { orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }] }));
  table('Countries', ['country', 'active', 'new'], await report(tk, ['country'], ['activeUsers', 'newUsers'], { orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }], limit: 15 }));
  table('Devices', ['model', 'active', 'sessions'], await report(tk, ['deviceModel'], ['activeUsers', 'sessions'], { orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }], limit: 15 }));
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
