/* Create/update ONE localized store listing via androidpublisher v3.
 * Usage: node play-listing-set.js <sa.json> <package> <lang e.g. ja-JP> <listing.json> [--dry-run]
 * listing.json = {"title":"...","shortDescription":"...","fullDescription":"..."}
 * Validates Play limits BEFORE touching the API. --dry-run: PUT + read-back inside an edit, then DELETE the edit (nothing published).
 * Images are NOT touched: Play falls back to the default-language graphics for a locale with none. */
const fs=require('fs'),crypto=require('crypto'),https=require('https');
const [KEY,PKG,LANG,FILE]=process.argv.slice(2); const DRY=process.argv.includes('--dry-run');
if(!KEY||!PKG||!LANG||!FILE){console.error('usage: <sa.json> <package> <lang> <listing.json> [--dry-run]');process.exit(2);}
const sa=JSON.parse(fs.readFileSync(KEY,'utf8')); const L=JSON.parse(fs.readFileSync(FILE,'utf8'));
const len=s=>[...(s||'')].length; // code points, so full-width chars count as 1 like Play does
const LIM={title:30,shortDescription:80,fullDescription:4000};
let bad=false; for(const k of Object.keys(LIM)){const n=len(L[k]);const ok=n>0&&n<=LIM[k];console.log(`${ok?'✓':'✗'} ${k.padEnd(16)} ${n}/${LIM[k]}`);if(!ok)bad=true;}
if(bad){console.error('LIMIT VIOLATION — refusing to push.');process.exit(3);}
const PROMO=/無料|最高|No\.?\s?1|人気|広告なし|Free|Best|#1/i; if(PROMO.test(L.title)){console.error('TITLE contains a promotional term — Play metadata policy risk. Refusing.');process.exit(4);}
const b64=s=>Buffer.from(s).toString('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
const req=(o,b)=>new Promise((res,rej)=>{const r=https.request(o,x=>{let d='';x.on('data',c=>d+=c);x.on('end',()=>res({status:x.statusCode,body:d}))});r.on('error',rej);if(b)r.write(b);r.end()});
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
 const id=JSON.parse(mk.body).id; console.log(`\nedit ${id} opened${DRY?' (DRY RUN — will be discarded)':''}`);
 const body=JSON.stringify({language:LANG,title:L.title,shortDescription:L.shortDescription,fullDescription:L.fullDescription});
 const put=await req({method:'PUT',hostname:H,path:`${base}/${id}/listings/${LANG}`,headers:{...A,'Content-Length':Buffer.byteLength(body)}},body);
 console.log(`listings.update ${LANG} → HTTP ${put.status}`); if(put.status!==200){console.log(put.body.slice(0,600));}
 const rb=await req({method:'GET',hostname:H,path:`${base}/${id}/listings`,headers:A});
 const langs=(JSON.parse(rb.body).listings||[]).map(x=>x.language); console.log('locales in edit:',langs.join(', '));
 if(DRY||put.status!==200){const d=await req({method:'DELETE',hostname:H,path:`${base}/${id}`,headers:A});console.log(`edit discarded (HTTP ${d.status}). Nothing published.`);process.exit(put.status===200?0:5);}
 const cm=await req({method:'POST',hostname:H,path:`${base}/${id}:commit`,headers:{...A,'Content-Length':0}});
 console.log(`edits.commit → HTTP ${cm.status}`); if(cm.status!==200){console.log(cm.body.slice(0,600));process.exit(6);}
 console.log(`\n✔ ${LANG} listing COMMITTED (goes through Google review).`);
})().catch(e=>{console.error('FATAL',e.message);process.exit(1)});
