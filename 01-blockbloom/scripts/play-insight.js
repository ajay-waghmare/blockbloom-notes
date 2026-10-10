/* READ-ONLY: reviews + Android vitals for a Play app. Commits nothing. */
const fs = require('fs'), crypto = require('crypto'), https = require('https');
const KEY = process.argv[2], PACKAGE = process.argv[3] || 'com.aweagle.blockbloom';
const sa = JSON.parse(fs.readFileSync(KEY, 'utf8'));
const b64 = s => Buffer.from(s).toString('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');

function req(opts, body) {
  return new Promise((res, rej) => {
    const r = https.request(opts, x => { let d=''; x.on('data',c=>d+=c); x.on('end',()=>res({status:x.statusCode, body:d})); });
    r.on('error', rej); if (body) r.write(body); r.end();
  });
}
async function token(scope) {
  const now = Math.floor(Date.now()/1000);
  const si = `${b64(JSON.stringify({alg:'RS256',typ:'JWT'}))}.${b64(JSON.stringify({iss:sa.client_email,scope,aud:sa.token_uri,iat:now,exp:now+3600}))}`;
  const sg = crypto.createSign('RSA-SHA256'); sg.update(si);
  const jwt = `${si}.${b64(sg.sign(sa.private_key))}`;
  const form = `grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${jwt}`;
  const r = await req({method:'POST',hostname:'oauth2.googleapis.com',path:'/token',
    headers:{'Content-Type':'application/x-www-form-urlencoded','Content-Length':Buffer.byteLength(form)}}, form);
  const j = JSON.parse(r.body); if (!j.access_token) throw new Error('auth failed: '+r.body.slice(0,300));
  return j.access_token;
}
async function get(host, path, tk) {
  return req({method:'GET',hostname:host,path,headers:{Authorization:`Bearer ${tk}`}});
}
(async () => {
  console.log('='.repeat(64));
  console.log('READ-ONLY Play insight —', PACKAGE);
  console.log('='.repeat(64));

  const tk = await token('https://www.googleapis.com/auth/androidpublisher');
  console.log('\n--- REVIEWS (API returns only reviews WITH comments, last ~7 days) ---');
  const rv = await get('androidpublisher.googleapis.com', `/androidpublisher/v3/applications/${PACKAGE}/reviews?maxResults=100`, tk);
  console.log('HTTP', rv.status);
  if (rv.status === 200) {
    const j = JSON.parse(rv.body);
    const list = j.reviews || [];
    console.log('reviews with comments in window:', list.length);
    for (const r of list) {
      const c = (r.comments||[])[0]; const uc = c && c.userComment;
      if (uc) console.log(`  ${uc.starRating}star  "${(uc.text||'').slice(0,110).replace(/\n/g,' ')}"  dev=${uc.device||'?'} sdk=${uc.androidOsVersion||'?'}`);
    }
    if (!list.length) console.log('  (none — either no recent commented reviews, or very low review volume)');
  } else console.log(rv.body.slice(0, 500));

  console.log('\n--- ANDROID VITALS (Play Developer Reporting API) ---');
  try {
    const tk2 = await token('https://www.googleapis.com/auth/playdeveloperreporting');
    for (const set of ['crashRateMetricSet','anrRateMetricSet','slowStartRateMetricSet']) {
      const r = await get('playdeveloperreporting.googleapis.com', `/v1beta1/apps/${PACKAGE}/${set}`, tk2);
      console.log(`${set}: HTTP ${r.status} ${r.status===200 ? r.body.slice(0,300) : r.body.slice(0,220).replace(/\s+/g,' ')}`);
    }
  } catch (e) { console.log('reporting API unavailable:', e.message.slice(0,200)); }
  console.log('\nDone. Nothing was modified.');
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
