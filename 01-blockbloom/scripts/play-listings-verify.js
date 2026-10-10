/* Read-only: open an edit, GET each locale in bundle.json, compare sha256 of title|short|full, delete the edit.
 * Usage: node play-listings-verify.js <sa.json> <package> <bundle.json> */
const fs=require('fs'),crypto=require('crypto'),https=require('https');
const [KEY,PKG,FILE]=process.argv.slice(2);
const sa=JSON.parse(fs.readFileSync(KEY,'utf8')); const B=JSON.parse(fs.readFileSync(FILE,'utf8'));
const b64=s=>Buffer.from(s).toString('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
const req=(o,b)=>new Promise((res,rej)=>{const r=https.request(o,x=>{let d=[];x.on('data',c=>d.push(c));x.on('end',()=>res({status:x.statusCode,body:Buffer.concat(d).toString('utf8')}))});r.on('error',rej);if(b)r.write(b);r.end()});
async function token(){const now=Math.floor(Date.now()/1000);
 const si=`${b64(JSON.stringify({alg:'RS256',typ:'JWT'}))}.${b64(JSON.stringify({iss:sa.client_email,scope:'https://www.googleapis.com/auth/androidpublisher',aud:sa.token_uri,iat:now,exp:now+3600}))}`;
 const sg=crypto.createSign('RSA-SHA256');sg.update(si);
 const form=`grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${si}.${b64(sg.sign(sa.private_key))}`;
 const r=await req({method:'POST',hostname:'oauth2.googleapis.com',path:'/token',headers:{'Content-Type':'application/x-www-form-urlencoded','Content-Length':Buffer.byteLength(form)}},form);
 const j=JSON.parse(r.body);if(!j.access_token)throw new Error('auth: '+r.body.slice(0,200));return j.access_token;}
const sha=s=>crypto.createHash('sha256').update(s,'utf8').digest('hex').slice(0,16);
const H='androidpublisher.googleapis.com';
(async()=>{
 const tk=await token();const A={Authorization:`Bearer ${tk}`,'Content-Type':'application/json'};
 const base=`/androidpublisher/v3/applications/${PKG}/edits`;
 const mk=await req({method:'POST',hostname:H,path:base,headers:{...A,'Content-Length':0}});
 if(mk.status!==200)throw new Error('edits.insert '+mk.status+' '+mk.body.slice(0,300));
 const id=JSON.parse(mk.body).id; let bad=0;
 for(const [lang,L] of Object.entries(B)){
  const g=await req({method:'GET',hostname:H,path:`${base}/${id}/listings/${lang}`,headers:A});
  if(g.status!==200){console.log(`${lang.padEnd(6)} GET ${g.status} ✗`);bad++;continue;}
  const x=JSON.parse(g.body);
  const want=sha(L.title+'|'+L.shortDescription+'|'+L.fullDescription), got=sha((x.title||'')+'|'+(x.shortDescription||'')+'|'+(x.fullDescription||''));
  console.log(`${lang.padEnd(6)} live sha ${got} ${got===want?'== sent ✓':'!= sent '+want+' ✗'}  "${x.title}"`);
  if(got!==want)bad++;
 }
 const all=await req({method:'GET',hostname:H,path:`${base}/${id}/listings`,headers:A});
 console.log('live locales:',(JSON.parse(all.body).listings||[]).map(l=>l.language).join(', '));
 const del=await req({method:'DELETE',hostname:H,path:`${base}/${id}`,headers:A});
 console.log(`edit discarded (HTTP ${del.status}). ${bad?bad+' MISMATCH':'all identical'}`);
 process.exit(bad?1:0);
})().catch(e=>{console.error(e.message);process.exit(2)});
