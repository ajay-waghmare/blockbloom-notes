/* Read-only GA4: one event broken down by appVersion x deviceModel x country, with its
 * parameters when GA4 exposes them. Built for app_exception / first crash triage.
 * Usage: node ga4-event.js <sa.json> <eventName> [startDate=2026-10-01] [endDate=today]
 */
const fs = require('fs'), crypto = require('crypto'), https = require('https');
const [,, KEY, EVENT, START = '2026-10-01', END = 'today'] = process.argv;
const PROPERTY = '555700046';
if (!KEY || !EVENT) { console.error('Usage: node ga4-event.js <sa.json> <eventName> [start] [end]'); process.exit(2); }
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
async function report(tk, dims, metrics) {
  const body = JSON.stringify({
    dateRanges: [{ startDate: START, endDate: END }],
    dimensions: dims.map(name => ({ name })),
    metrics: metrics.map(name => ({ name })),
    dimensionFilter: { filter: { fieldName: 'eventName', stringFilter: { matchType: 'EXACT', value: EVENT } } },
    limit: 50,
  });
  const r = await req({ method: 'POST', hostname: 'analyticsdata.googleapis.com', path: `/v1beta/properties/${PROPERTY}:runReport`, headers: { Authorization: `Bearer ${tk}`, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } }, body);
  if (r.status !== 200) return [[`GA4 ${r.status}: ${r.body.slice(0, 160)}`]];
  const j = JSON.parse(r.body);
  return (j.rows || []).map(row => [...row.dimensionValues.map(v => v.value), ...row.metricValues.map(v => v.value)]);
}
(async () => {
  const tk = await token();
  console.log(`== ${EVENT}, ${START}..${END} ==`);
  const rows = await report(tk, ['date', 'appVersion', 'deviceModel', 'country', 'platform'], ['eventCount', 'totalUsers']);
  if (!rows.length) console.log('  (no rows)');
  for (const r of rows) console.log('  ' + r.map((v, i) => String(v).padEnd(i < 5 ? 20 : 8)).join(''));
  // Firebase exposes the "fatal" flag of app_exception as the custom dimension customEvent:fatal
  // only if registered; try it, but do not fail if it is not.
  const fatal = await report(tk, ['customEvent:fatal', 'appVersion'], ['eventCount']);
  console.log('\n== fatal flag (needs the custom dimension registered in GA4; otherwise an error line) ==');
  for (const r of fatal) console.log('  ' + r.join('  '));
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
