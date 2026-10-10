/* Replace phone screenshots for ONE locale. Usage: node play-images-push.js <sa.json> <pkg> <lang> <ordered-list.json> [--dry-run]
 * ordered-list.json = ["path1.png","path2.png",...] in display order. Does deleteall for that locale's phoneScreenshots first.
 * --dry-run: upload into an edit, list, then DELETE the edit (nothing published). */
const fs=require('fs'),crypto=require('crypto'),https=require('https');
const [KEY,PKG,LANG,LIST]=process.argv.slice(2); const DRY=process.argv.includes('--dry-run');
const sa=JSON.parse(fs.readFileSync(KEY,'utf8')); const files=JSON.parse(fs.readFileSync(LIST,'utf8'));
if(files.length<2||files.length>8){console.error('Play requires 2-8 phone screenshots; got '+files.length);process.exit(2);}
const b64=s=>Buffer.from(s).toString('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
const req=(o,b)=>new Promise((res,rej)=>{const r=https.request(o,x=>{let d=[];x.on('data',c=>d.push(c));x.on('end',()=>res({status:x.statusCode,body:Buffer.concat(d).toString('utf8')}))});r.on('error',rej);if(b)r.write(b);r.end()});
async function token(){const now=Math.floor(Date.now()/1000);
 const si=`${b64(JSON.stringify({alg:'RS256',typ:'JWT'}))}.${b64(JSON.stringify({iss:sa.client_email,scope:'https://www.googleapis.com/auth/androidpublisher',aud:sa.token_uri,iat:now,exp:now+3600}))}`;
 const sg=crypto.createSign('RSA-SHA256');sg.update(si);
 const form=`grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${si}.${b64(sg.sign(sa.private_key))}`;
 const r=await req({method:'POST',hostname:'oauth2.googleapis.com',path:'/token',headers:{'Content-Type':'application/x-www-form-urlencoded','Content-Length':Buffer.byteLength(form)}},form);
 const j=JSON.parse(r.body);if(!j.access_token)throw new Error('auth: '+r.body.slice(0,200));return j.access_token;}
const H='androidpublisher.googleapis.com';
(async()=>{
 const tk=await token();const A={Authorization:`Bearer ${tk}`};
 const base=`/androidpublisher/v3/applications/${PKG}/edits`;
 const mk=await req({method:'POST',hostname:H,path:base,headers:{...A,'Content-Length':0}});
 if(mk.status!==200)throw new Error('edits.insert '+mk.status+' '+mk.body.slice(0,300));
 const id=JSON.parse(mk.body).id; console.log(`edit ${id} opened${DRY?' (DRY RUN — will be discarded)':''}`);
 const da=await req({method:'DELETE',hostname:H,path:`${base}/${id}/listings/${LANG}/phoneScreenshots`,headers:A});
 console.log(`deleteall ${LANG}/phoneScreenshots → HTTP ${da.status}`);
 let n=0, fail=false;
 for(const f of files){ n++; const buf=fs.readFileSync(f);
  const up=await req({method:'POST',hostname:H,path:`/upload/androidpublisher/v3/applications/${PKG}/edits/${id}/listings/${LANG}/phoneScreenshots?uploadType=media`,headers:{...A,'Content-Type':'image/png','Content-Length':buf.length}},buf);
  const ok=up.status===200; if(!ok)fail=true;
  console.log(`  [${n}/${files.length}] ${f.split(/[\/]/).pop()}  ${buf.length}B → HTTP ${up.status}${ok?'  id='+JSON.parse(up.body).image.id:'  '+up.body.slice(0,200)}`);
 }
 const ls=await req({method:'GET',hostname:H,path:`${base}/${id}/listings/${LANG}/phoneScreenshots`,headers:A});
 console.log(`${LANG} phoneScreenshots in edit: ${(JSON.parse(ls.body).images||[]).length}`);
 if(DRY||fail){const d=await req({method:'DELETE',hostname:H,path:`${base}/${id}`,headers:A});console.log(`edit discarded (HTTP ${d.status}). Nothing published.`);process.exit(fail?5:0);}
 const cm=await req({method:'POST',hostname:H,path:`${base}/${id}:commit`,headers:{...A,'Content-Length':0}});
 console.log(`edits.commit → HTTP ${cm.status}`); if(cm.status!==200){console.log(cm.body.slice(0,600));process.exit(6);}
 console.log(`\n✔ ${LANG} phoneScreenshots COMMITTED (${files.length} images, goes through Google review).`);
})().catch(e=>{console.error('FATAL',e.message);process.exit(1)});
