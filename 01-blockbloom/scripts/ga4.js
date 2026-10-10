/* READ-ONLY GA4 reader for Block Bloom. Zero dependencies, same JWT pattern as the Play
   scripts. Usage: node ga4.js <service-account.json> <propertyId> [days]

   Reads nothing but reports; it cannot write to the property. */
const fs = require('fs'), crypto = require('crypto'), https = require('https');

const KEY = process.argv[2];
const PROPERTY = process.argv[3];
const DAYS = parseInt(process.argv[4] || '28', 10);
const sa = JSON.parse(fs.readFileSync(KEY, 'utf8'));

const b64 = s => Buffer.from(s).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const req = (o, body) => new Promise((res, rej) => {
  const r = https.request(o, x => { const d = []; x.on('data', c => d.push(c)); x.on('end', () => res({ status: x.statusCode, body: Buffer.concat(d).toString('utf8') })); });
  r.on('error', rej); if (body) r.write(body); r.end();
});

async function token() {
  const now = Math.floor(Date.now() / 1000);
  const claims = {
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    aud: sa.token_uri, iat: now, exp: now + 3600,
  };
  const si = `${b64(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))}.${b64(JSON.stringify(claims))}`;
  const sg = crypto.createSign('RSA-SHA256'); sg.update(si);
  const form = `grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${si}.${b64(sg.sign(sa.private_key))}`;
  const r = await req({ method: 'POST', hostname: 'oauth2.googleapis.com', path: '/token', headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(form) } }, form);
  const j = JSON.parse(r.body);
  if (!j.access_token) throw new Error('auth failed: ' + r.body.slice(0, 300));
  return j.access_token;
}

async function runReport(tk, body) {
  const payload = JSON.stringify(body);
  const r = await req({
    method: 'POST', hostname: 'analyticsdata.googleapis.com',
    path: `/v1beta/properties/${PROPERTY}:runReport`,
    headers: { Authorization: `Bearer ${tk}`, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) },
  }, payload);
  if (r.status !== 200) return { error: r.status, body: r.body };
  return JSON.parse(r.body);
}

const rows = r => (r.rows || []).map(x => ({
  dims: (x.dimensionValues || []).map(d => d.value),
  vals: (x.metricValues || []).map(m => m.value),
}));

(async () => {
  const tk = await token();
  const range = [{ startDate: `${DAYS}daysAgo`, endDate: 'today' }];

  console.log('GA4 property ' + PROPERTY + '  ·  last ' + DAYS + ' days\n');

  // 1. Overall reach
  const totals = await runReport(tk, {
    dateRanges: range,
    metrics: [{ name: 'activeUsers' }, { name: 'newUsers' }, { name: 'sessions' }, { name: 'userEngagementDuration' }],
  });
  if (totals.error) {
    console.error('HTTP ' + totals.error);
    console.error(totals.body.slice(0, 900));
    process.exit(2);
  }
  const t = rows(totals)[0];
  if (t) {
    const secs = Number(t.vals[3] || 0);
    console.log('  active users        ' + t.vals[0]);
    console.log('  new users           ' + t.vals[1]);
    console.log('  sessions            ' + t.vals[2]);
    console.log('  engagement          ' + Math.round(secs / 60) + ' min total');
  } else {
    console.log('  (no rows - nothing has been reported yet)');
  }

  // 2. The funnel we instrumented
  console.log('\nEVENTS');
  const ev = await runReport(tk, {
    dateRanges: range,
    dimensions: [{ name: 'eventName' }],
    metrics: [{ name: 'eventCount' }, { name: 'totalUsers' }],
    orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
    limit: 40,
  });
  if (ev.error) { console.error('  HTTP ' + ev.error + ' ' + ev.body.slice(0, 200)); }
  else {
    const OURS = new Set(['game_start', 'game_over', 'first_clear', 'first_game_over',
      'tutorial_begin', 'tutorial_complete', 'level_complete', 'daily_challenge_done',
      'streak_claimed', 'lifeline_used', 'share_result', 'review_prompt']);
    const list = rows(ev);
    if (!list.length) console.log('  (none yet)');
    for (const r of list) {
      const mine = OURS.has(r.dims[0]) ? ' <- ours' : '';
      console.log('  ' + r.dims[0].padEnd(24) + String(r.vals[0]).padStart(6) + ' events  ' + String(r.vals[1]).padStart(5) + ' users' + mine);
    }
    const missing = [...OURS].filter(e => !list.some(r => r.dims[0] === e));
    if (missing.length) console.log('\n  custom events NOT yet seen: ' + missing.join(', '));
  }

  // 3. Daily shape
  console.log('\nBY DAY');
  const daily = await runReport(tk, {
    dateRanges: range,
    dimensions: [{ name: 'date' }],
    metrics: [{ name: 'activeUsers' }, { name: 'newUsers' }],
    orderBys: [{ dimension: { dimensionName: 'date' } }],
  });
  if (daily.error) console.error('  HTTP ' + daily.error);
  else {
    const list = rows(daily);
    if (!list.length) console.log('  (nothing yet)');
    for (const r of list) {
      const d = r.dims[0];
      console.log('  ' + d.slice(0, 4) + '-' + d.slice(4, 6) + '-' + d.slice(6) + '   active ' + String(r.vals[0]).padStart(4) + '   new ' + String(r.vals[1]).padStart(4));
    }
  }
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
