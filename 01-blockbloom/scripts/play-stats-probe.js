/* READ-ONLY: probe the Play stats GCS bucket for installs/ratings CSVs. */
const fs=require('fs'),crypto=require('crypto'),https=require('https');
const sa=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const DEV_ID='8701670281323658688';
const CANDIDATES=(process.argv[3]?[process.argv[3]]:[`pubsite_prod_rev_${DEV_ID}`,`pubsite_prod_${DEV_ID}`]);
const b64=s=>Buffer.from(s).toString('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
const req=(o,b)=>new Promise((res,rej)=>{const r=https.request(o,x=>{let d='';x.on('data',c=>d+=c);x.on('end',()=>res({status:x.statusCode,body:d}))});r.on('error',rej);if(b)r.write(b);r.end()});
async function token(){const now=Math.floor(Date.now()/1000);
 const si=`${b64(JSON.stringify({alg:'RS256',typ:'JWT'}))}.${b64(JSON.stringify({iss:sa.client_email,scope:'https://www.googleapis.com/auth/devstorage.read_only',aud:sa.token_uri,iat:now,exp:now+3600}))}`;
 const sg=crypto.createSign('RSA-SHA256');sg.update(si);
 const form=`grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${si}.${b64(sg.sign(sa.private_key))}`;
 const r=await req({method:'POST',hostname:'oauth2.googleapis.com',path:'/token',headers:{'Content-Type':'application/x-www-form-urlencoded','Content-Length':Buffer.byteLength(form)}},form);
 const j=JSON.parse(r.body); if(!j.access_token) throw new Error('token: '+r.body.slice(0,200)); return j.access_token;}
(async()=>{
 const tk=await token(); console.log('GCS OAuth OK');
 for(const B of CANDIDATES){
  const r=await req({method:'GET',hostname:'storage.googleapis.com',path:`/storage/v1/b/${B}/o?prefix=stats/installs/&maxResults=400`,headers:{Authorization:`Bearer ${tk}`}});
  console.log(`\nbucket gs://${B}  → HTTP ${r.status}`);
  if(r.status!==200){console.log('  '+r.body.replace(/\s+/g,' ').slice(0,180));continue;}
  const j=JSON.parse(r.body); const items=(j.items||[]);
  console.log(`  ${items.length} install-report object(s)`);
  items.filter(i=>/blockbloom/.test(i.name)).slice(-12).forEach(i=>console.log('  '+i.name+'  '+i.size+'B'));
  const r2=await req({method:'GET',hostname:'storage.googleapis.com',path:`/storage/v1/b/${B}/o?prefix=stats/ratings/&maxResults=400`,headers:{Authorization:`Bearer ${tk}`}});
  if(r2.status===200){const k=(JSON.parse(r2.body).items||[]).filter(i=>/blockbloom/.test(i.name));console.log(`  ${k.length} ratings-report object(s) for blockbloom`);k.slice(-3).forEach(i=>console.log('  '+i.name));}
 }
})().catch(e=>{console.error('FATAL',e.message);process.exit(1)});
