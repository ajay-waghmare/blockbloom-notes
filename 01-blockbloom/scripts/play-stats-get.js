const fs=require('fs'),crypto=require('crypto'),https=require('https');
const sa=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const B='pubsite_prod_8701670281323658688';
const b64=s=>Buffer.from(s).toString('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
const req=(o,b)=>new Promise((res,rej)=>{const r=https.request(o,x=>{let d=[];x.on('data',c=>d.push(c));x.on('end',()=>res({status:x.statusCode,buf:Buffer.concat(d)}))});r.on('error',rej);if(b)r.write(b);r.end()});
async function token(){const now=Math.floor(Date.now()/1000);
 const si=`${b64(JSON.stringify({alg:'RS256',typ:'JWT'}))}.${b64(JSON.stringify({iss:sa.client_email,scope:'https://www.googleapis.com/auth/devstorage.read_only',aud:sa.token_uri,iat:now,exp:now+3600}))}`;
 const sg=crypto.createSign('RSA-SHA256');sg.update(si);
 const form=`grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${si}.${b64(sg.sign(sa.private_key))}`;
 const r=await req({method:'POST',hostname:'oauth2.googleapis.com',path:'/token',headers:{'Content-Type':'application/x-www-form-urlencoded','Content-Length':Buffer.byteLength(form)}},form);
 return JSON.parse(r.buf.toString()).access_token;}
(async()=>{const tk=await token();
 for(const name of process.argv.slice(3)){
  const r=await req({method:'GET',hostname:'storage.googleapis.com',path:`/storage/v1/b/${B}/o/${encodeURIComponent(name)}?alt=media`,headers:{Authorization:`Bearer ${tk}`}});
  let t=r.buf.toString('utf16le'); if(!/[a-zA-Z]/.test(t.slice(0,80))) t=r.buf.toString('utf8');
  console.log("\n########## "+name.split('/').pop()+"  (HTTP "+r.status+") ##########");
  console.log(t.replace(/\r/g,'').trim());
 }})().catch(e=>{console.error('FATAL',e.message);process.exit(1)});
