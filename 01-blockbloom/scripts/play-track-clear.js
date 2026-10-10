/* Remove ALL releases from a track (clears a stale draft). Usage: node play-track-clear.js <sa.json> <pkg> <track> [--dry-run] */
const fs=require('fs'),crypto=require('crypto'),https=require('https');
const [KEY,PKG,TRACK]=process.argv.slice(2); const DRY=process.argv.includes('--dry-run');
if(!KEY||!PKG||!TRACK){console.error('usage: <sa.json> <pkg> <track> [--dry-run]');process.exit(2);}
if(TRACK==='production'){console.error('refusing to clear production');process.exit(3);}
const b64=s=>Buffer.from(s).toString('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
const req=(o,b)=>new Promise((res,rej)=>{const r=https.request(o,x=>{let d=[];x.on('data',c=>d.push(c));x.on('end',()=>res({status:x.statusCode,body:Buffer.concat(d).toString('utf8')}))});r.on('error',rej);if(b)r.write(b);r.end()});
const sa=JSON.parse(fs.readFileSync(KEY,'utf8'));
async function token(){const now=Math.floor(Date.now()/1000);
 const si=`${b64(JSON.stringify({alg:'RS256',typ:'JWT'}))}.${b64(JSON.stringify({iss:sa.client_email,scope:'https://www.googleapis.com/auth/androidpublisher',aud:sa.token_uri,iat:now,exp:now+3600}))}`;
 const sg=crypto.createSign('RSA-SHA256');sg.update(si);
 const form=`grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${si}.${b64(sg.sign(sa.private_key))}`;
 const r=await req({method:'POST',hostname:'oauth2.googleapis.com',path:'/token',headers:{'Content-Type':'application/x-www-form-urlencoded','Content-Length':Buffer.byteLength(form)}},form);
 const j=JSON.parse(r.body);if(!j.access_token)throw new Error('auth: '+r.body.slice(0,200));return j.access_token;}
const H='androidpublisher.googleapis.com';
(async()=>{
 const tk=await token();const A={Authorization:`Bearer ${tk}`,'Content-Type':'application/json'};
 const base=`/androidpublisher/v3/applications/${PKG}/edits`;
 const mk=await req({method:'POST',hostname:H,path:base,headers:{...A,'Content-Length':0}});
 if(mk.status!==200)throw new Error('edits.insert '+mk.status+' '+mk.body.slice(0,300));
 const id=JSON.parse(mk.body).id;
 const before=await req({method:'GET',hostname:H,path:`${base}/${id}/tracks/${TRACK}`,headers:A});
 console.log(`BEFORE ${TRACK}: ${before.body.replace(/\s+/g,' ').slice(0,300)}`);
 const body=JSON.stringify({track:TRACK,releases:[]});
 const put=await req({method:'PUT',hostname:H,path:`${base}/${id}/tracks/${TRACK}`,headers:{...A,'Content-Length':Buffer.byteLength(body)}},body);
 console.log(`PUT  → HTTP ${put.status}  ${put.body.replace(/\s+/g,' ').slice(0,200)}`);
 if(put.status!==200&&put.status!==204){await req({method:'DELETE',hostname:H,path:`${base}/${id}`,headers:A});console.error('failed — edit discarded');process.exit(4);}
 if(DRY){const d=await req({method:'DELETE',hostname:H,path:`${base}/${id}`,headers:A});console.log(`DRY RUN — edit discarded (HTTP ${d.status}). Nothing changed.`);return;}
 const c=await req({method:'POST',hostname:H,path:`${base}/${id}:commit`,headers:{...A,'Content-Length':0}});
 console.log(`commit → HTTP ${c.status}`);
 if(c.status!==200){console.error(c.body.slice(0,300));process.exit(5);}
 console.log(`✔ '${TRACK}' cleared.`);
})().catch(e=>{console.error(e.message);process.exit(2)});
