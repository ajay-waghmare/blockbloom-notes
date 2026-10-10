/* READ-ONLY: download the live en-US phone screenshots. Opens an edit, lists images, fetches each URL, deletes the edit. */
const fs=require('fs'),crypto=require('crypto'),https=require('https'),path=require('path');
const [KEY,PKG,OUTDIR]=process.argv.slice(2); const sa=JSON.parse(fs.readFileSync(KEY,'utf8'));
const b64=s=>Buffer.from(s).toString('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
const req=(o,b)=>new Promise((res,rej)=>{const r=https.request(o,x=>{let d=[];x.on('data',c=>d.push(c));x.on('end',()=>res({status:x.statusCode,headers:x.headers,buf:Buffer.concat(d)}))});r.on('error',rej);if(b)r.write(b);r.end()});
const get=u=>new Promise((res,rej)=>{https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},x=>{if(x.statusCode>=300&&x.statusCode<400&&x.headers.location)return get(x.headers.location).then(res,rej);let d=[];x.on('data',c=>d.push(c));x.on('end',()=>res({status:x.statusCode,type:x.headers['content-type'],buf:Buffer.concat(d)}))}).on('error',rej)});
(async()=>{
 const now=Math.floor(Date.now()/1000);
 const si=`${b64(JSON.stringify({alg:'RS256',typ:'JWT'}))}.${b64(JSON.stringify({iss:sa.client_email,scope:'https://www.googleapis.com/auth/androidpublisher',aud:sa.token_uri,iat:now,exp:now+3600}))}`;
 const sg=crypto.createSign('RSA-SHA256');sg.update(si);
 const form=`grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${si}.${b64(sg.sign(sa.private_key))}`;
 const t=await req({method:'POST',hostname:'oauth2.googleapis.com',path:'/token',headers:{'Content-Type':'application/x-www-form-urlencoded','Content-Length':Buffer.byteLength(form)}},form);
 const tk=JSON.parse(t.buf.toString()).access_token; const A={Authorization:`Bearer ${tk}`};
 const H='androidpublisher.googleapis.com', base=`/androidpublisher/v3/applications/${PKG}/edits`;
 const mk=await req({method:'POST',hostname:H,path:base,headers:{...A,'Content-Length':0}}); const id=JSON.parse(mk.buf.toString()).id;
 const ls=await req({method:'GET',hostname:H,path:`${base}/${id}/listings/en-US/phoneScreenshots`,headers:A});
 const imgs=(JSON.parse(ls.buf.toString()).images||[]);
 console.log(`en-US phoneScreenshots: ${imgs.length}`);
 let i=0; for(const im of imgs){ i++; const r=await get(im.url+'=s0'); // =s0 asks Play CDN for full resolution
   const ext=(r.type||'').includes('png')?'png':'jpg'; const f=path.join(OUTDIR,`${String(i).padStart(2,'0')}.${ext}`); fs.writeFileSync(f,r.buf);
   console.log(`  ${f}  ${r.status} ${r.type} ${r.buf.length}B  id=${im.id}`); }
 await req({method:'DELETE',hostname:H,path:`${base}/${id}`,headers:A}); console.log('edit discarded.');
})().catch(e=>{console.error('FATAL',e.message);process.exit(1)});
