const fs=require('fs'),crypto=require('crypto'),https=require('https');
const sa=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const B='pubsite_prod_8701670281323658688', PREFIX=process.argv[3]||'stats/installs/';
const b64=s=>Buffer.from(s).toString('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
const req=(o,b)=>new Promise((res,rej)=>{const r=https.request(o,x=>{let d=[];x.on('data',c=>d.push(c));x.on('end',()=>res({status:x.statusCode,buf:Buffer.concat(d)}))});r.on('error',rej);if(b)r.write(b);r.end()});
async function token(){const now=Math.floor(Date.now()/1000);
 const si=`${b64(JSON.stringify({alg:'RS256',typ:'JWT'}))}.${b64(JSON.stringify({iss:sa.client_email,scope:'https://www.googleapis.com/auth/devstorage.read_only',aud:sa.token_uri,iat:now,exp:now+3600}))}`;
 const sg=crypto.createSign('RSA-SHA256');sg.update(si);
 const form=`grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${si}.${b64(sg.sign(sa.private_key))}`;
 const r=await req({method:'POST',hostname:'oauth2.googleapis.com',path:'/token',headers:{'Content-Type':'application/x-www-form-urlencoded','Content-Length':Buffer.byteLength(form)}},form);
 return JSON.parse(r.buf.toString()).access_token;}
(async()=>{const tk=await token();
 const r=await req({method:'GET',hostname:'storage.googleapis.com',path:`/storage/v1/b/${B}/o?prefix=${encodeURIComponent(PREFIX)}&maxResults=200`,headers:{Authorization:`Bearer ${tk}`}});
 if(r.status!==200){console.log('HTTP',r.status,r.buf.toString().slice(0,400));return;}
 const j=JSON.parse(r.buf.toString());
 (j.items||[]).forEach(o=>console.log(o.name));
 if(!j.items) console.log('(no objects under prefix '+PREFIX+')');
})();
