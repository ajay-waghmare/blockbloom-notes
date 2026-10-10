const fs = require('fs');
const crypto = require('crypto');
const https = require('https');

const sa = JSON.parse(fs.readFileSync('D:/Downloads/avid-airway-498216-e5-9f357c8e6b11.json', 'utf8'));

function b64url(input) {
  return Buffer.from(input).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64url(JSON.stringify({
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/androidpublisher',
    aud: sa.token_uri,
    iat: now,
    exp: now + 3600,
  }));
  const signingInput = `${header}.${claims}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signingInput);
  const signature = b64url(signer.sign(sa.private_key));
  const jwt = `${signingInput}.${signature}`;
  const form = `grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${jwt}`;

  return new Promise((resolve, reject) => {
    const req = https.request({
      method: 'POST',
      hostname: 'oauth2.googleapis.com',
      path: '/token',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(form) }
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data).access_token));
    });
    req.on('error', reject);
    req.write(form);
    req.end();
  });
}

(async () => {
  const token = await getAccessToken();
  const req = https.request({
    method: 'GET',
    hostname: 'androidpublisher.googleapis.com',
    path: '/androidpublisher/v3/applications/com.aweagle.blockbloom/reviews',
    headers: { Authorization: `Bearer ${token}` }
  }, res => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      console.log('HTTP', res.statusCode);
      console.log(data);
    });
  });
  req.end();
})();
