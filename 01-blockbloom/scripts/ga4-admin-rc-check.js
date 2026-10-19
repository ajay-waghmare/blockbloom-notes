// READ-ONLY setup probe: GA4 Admin (property, streams, key events, retention) + Firebase Remote Config template.
// Usage: node setup-check-2026-10-20.js <sa.json> <ga4PropertyId> <firebaseProjectId>
const fs = require('fs');
const https = require('https');
const crypto = require('crypto');
const [, , KEY, PROP, FB] = process.argv;
if (!KEY || !PROP || !FB) { console.error('usage: <sa.json> <ga4PropertyId> <firebaseProjectId>'); process.exit(2); }
const sa = JSON.parse(fs.readFileSync(KEY, 'utf8'));
const b64 = (s) => Buffer.from(s).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

function post(host, path, body, headers) {
  return new Promise((resolve, reject) => {
    const req = https.request({ method: 'POST', hostname: host, path, headers }, (res) => {
      let d = ''; res.on('data', (c) => (d += c)); res.on('end', () => resolve({ status: res.statusCode, body: d }));
    });
    req.on('error', reject); req.end(body);
  });
}
function get(host, path, token) {
  return new Promise((resolve, reject) => {
    const req = https.request({ method: 'GET', hostname: host, path, headers: { Authorization: `Bearer ${token}` } }, (res) => {
      let d = ''; res.on('data', (c) => (d += c)); res.on('end', () => resolve({ status: res.statusCode, body: d }));
    });
    req.on('error', reject); req.end();
  });
}
async function token(scope) {
  const now = Math.floor(Date.now() / 1000);
  const si = `${b64(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))}.${b64(JSON.stringify({ iss: sa.client_email, scope, aud: sa.token_uri, exp: now + 3600, iat: now }))}`;
  const sig = crypto.createSign('RSA-SHA256').update(si).sign(sa.private_key);
  const jwt = `${si}.${b64(sig)}`;
  const form = `grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${jwt}`;
  const r = await post('oauth2.googleapis.com', '/token', form, { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(form) });
  const j = JSON.parse(r.body);
  if (!j.access_token) throw new Error(`token (${scope}): ${r.body.slice(0, 200)}`);
  return j.access_token;
}
function show(label, r, pick) {
  if (r.status !== 200) { console.log(`${label}: HTTP ${r.status} ${r.body.replace(/\s+/g, ' ').slice(0, 220)}`); return null; }
  const j = JSON.parse(r.body);
  console.log(`${label}:`); console.log(pick(j)); return j;
}

(async () => {
  console.log(`service account: ${sa.client_email}`);
  // ---- GA4 Admin API (read-only scope) ----
  try {
    const t = await token('https://www.googleapis.com/auth/analytics.readonly');
    const H = 'analyticsadmin.googleapis.com';
    show('property', await get(H, `/v1beta/properties/${PROP}`, t), (j) =>
      `  name=${j.displayName} tz=${j.timeZone} currency=${j.currencyCode} industry=${j.industryCategory} created=${j.createTime}`);
    show('data streams', await get(H, `/v1beta/properties/${PROP}/dataStreams`, t), (j) =>
      (j.dataStreams || []).map((s) => `  ${s.type} ${s.displayName} ${s.androidAppStreamData ? s.androidAppStreamData.packageName : ''}`).join('\n') || '  (none)');
    show('key events (conversions)', await get(H, `/v1beta/properties/${PROP}/keyEvents?pageSize=50`, t), (j) =>
      (j.keyEvents || []).map((k) => `  ${k.eventName}${k.custom ? '' : ' (default)'} ${k.countingMethod || ''}`).join('\n') || '  (none)');
    show('data retention', await get(H, `/v1beta/properties/${PROP}/dataRetentionSettings`, t), (j) =>
      `  eventDataRetention=${j.eventDataRetention} resetOnNewActivity=${j.resetUserDataOnNewActivity}`);
    show('google signals', await get(H, `/v1alpha/properties/${PROP}/googleSignalsSettings`, t), (j) =>
      `  state=${j.state} consent=${j.consent}`);
    show('attribution', await get(H, `/v1beta/properties/${PROP}/attributionSettings`, t), (j) =>
      `  acquisition=${j.acquisitionConversionEventLookbackWindow} other=${j.otherConversionEventLookbackWindow} model=${j.reportingAttributionModel}`);
    show('custom dimensions', await get(H, `/v1beta/properties/${PROP}/customDimensions?pageSize=50`, t), (j) =>
      (j.customDimensions || []).map((d) => `  ${d.scope} ${d.parameterName} -> "${d.displayName}"`).join('\n') || '  (none)');
    show('firebase link', await get(H, `/v1beta/properties/${PROP}/firebaseLinks`, t), (j) =>
      (j.firebaseLinks || []).map((l) => `  ${l.project}`).join('\n') || '  (none)');
  } catch (e) { console.log('GA4 admin: ' + e.message); }

  // ---- Firebase Remote Config template (needs a role on the Firebase project) ----
  try {
    const t = await token('https://www.googleapis.com/auth/firebase.remoteconfig');
    const r = await get('firebaseremoteconfig.googleapis.com', `/v1/projects/${FB}/remoteConfig`, t);
    show('remote config', r, (j) => {
      const params = Object.entries(j.parameters || {}).map(([k, v]) => `  ${k} = ${JSON.stringify(v.defaultValue && v.defaultValue.value)}${v.conditionalValues ? ' +conditions' : ''}`);
      const conds = (j.conditions || []).map((c) => `  condition: ${c.name} -> ${c.expression}`);
      return [`  version=${j.version && j.version.versionNumber} updated=${j.version && j.version.updateTime}`, ...params, ...conds].join('\n');
    });
  } catch (e) { console.log('remote config: ' + e.message); }
})();
