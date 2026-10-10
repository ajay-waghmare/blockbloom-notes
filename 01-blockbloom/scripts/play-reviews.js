/* Read-only: list recent Play reviews/ratings. Usage: node play-reviews.js <sa.json> <package> */
const fs=require('fs'),crypto=require('crypto'),https=require('https');
const [KEY,PKG]=process.argv.slice(2);
const sa=JSON.parse(fs.readFileSync(KEY,'utf8'));
const b64=s=>Buffer.from(s).toString('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
const req=(o,b)=>new Promise((res,rej)=>{const r=https.request(o,x=>{let d=[];x.on('data',c=>d.push(c));x.on('end',()=>res({status:x.statusCode,body:Buffer.concat(d).toString('utf8')}))});r.on('error',rej);if(b)r.write(b);r.end()});
async function token(){const now=Math.floor(Date.now()/1000);
 const si=`${b64(JSON.stringify({alg:'RS256',typ:'JWT'}))}.${b64(JSON.stringify({iss:sa.client_email,scope:'https://www.googleapis.com/auth/androidpublisher',aud:sa.token_uri,iat:now,exp:now+3600}))}`;
 const sg=crypto.createSign('RSA-SHA256');sg.update(si);
 const form=`grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${si}.${b64(sg.sign(sa.private_key))}`;
 const r=await req({method:'POST',hostname:'oauth2.googleapis.com',path:'/token',headers:{'Content-Type':'application/x-www-form-urlencoded','Content-Length':Buffer.byteLength(form)}},form);
 const j=JSON.parse(r.body);if(!j.access_token)throw new Error('auth: '+r.body.slice(0,200));return j.access_token;}
(async()=>{
 const tk=await token();const A={Authorization:`Bearer ${tk}`};
 const r=await req({method:'GET',hostname:'androidpublisher.googleapis.com',path:`/androidpublisher/v3/applications/${PKG}/reviews?maxResults=50`,headers:A});
 if(r.status!==200){console.log('HTTP',r.status,r.body.slice(0,300));return;}
 const j=JSON.parse(r.body); const rv=j.reviews||[];
 console.log(`reviews returned: ${rv.length}  (API only returns reviews WITH text from the last ~7 days; silent star-only ratings never appear here)`);
 for(const x of rv){
  const c=(x.comments||[]).find(c=>c.userComment)||{};
  const u=c.userComment||{};
  const when=u.lastModified?new Date(Number(u.lastModified.seconds)*1000).toISOString().slice(0,16).replace('T',' '):'?';
  console.log(`  ${when}  ★${u.starRating}  ${(u.reviewerLanguage||'').padEnd(6)} ${(u.text||'').replace(/\s+/g,' ').slice(0,90)}`);
 }
})().catch(e=>{console.error(e.message);process.exit(2)});
