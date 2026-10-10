const fs=require('fs'),crypto=require('crypto'),https=require('https');
const sa=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const B='pubsite_prod_8701670281323658688', PKG='com.aweagle.blockbloom';
const MONTHS=['202607','202608','202609','202610'];
const b64=s=>Buffer.from(s).toString('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
const req=(o,b)=>new Promise((res,rej)=>{const r=https.request(o,x=>{let d=[];x.on('data',c=>d.push(c));x.on('end',()=>res({status:x.statusCode,buf:Buffer.concat(d)}))});r.on('error',rej);if(b)r.write(b);r.end()});
async function token(){const now=Math.floor(Date.now()/1000);
 const si=`${b64(JSON.stringify({alg:'RS256',typ:'JWT'}))}.${b64(JSON.stringify({iss:sa.client_email,scope:'https://www.googleapis.com/auth/devstorage.read_only',aud:sa.token_uri,iat:now,exp:now+3600}))}`;
 const sg=crypto.createSign('RSA-SHA256');sg.update(si);
 const form=`grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${si}.${b64(sg.sign(sa.private_key))}`;
 const r=await req({method:'POST',hostname:'oauth2.googleapis.com',path:'/token',headers:{'Content-Type':'application/x-www-form-urlencoded','Content-Length':Buffer.byteLength(form)}},form);
 return JSON.parse(r.buf.toString()).access_token;}
function parseCSV(t){
 t=t.replace(/\r/g,'').trim(); if(!t) return [];
 const rows=[]; for(const line of t.split('\n')){
  const out=[];let cur='',q=false;
  for(let i=0;i<line.length;i++){const c=line[i];
   if(q){ if(c==='"'){ if(line[i+1]==='"'){cur+='"';i++;} else q=false; } else cur+=c; }
   else if(c==='"') q=true; else if(c===','){out.push(cur);cur='';} else cur+=c; }
  out.push(cur); rows.push(out); }
 const hdr=rows.shift(); return rows.map(r=>Object.fromEntries(hdr.map((h,i)=>[h.trim(),r[i]])));
}
let TK;
async function get(name){
 const r=await req({method:'GET',hostname:'storage.googleapis.com',path:`/storage/v1/b/${B}/o/${encodeURIComponent(name)}?alt=media`,headers:{Authorization:`Bearer ${TK}`}});
 if(r.status!==200) return [];
 let t=r.buf.toString('utf16le'); if(!/[a-zA-Z]/.test(t.slice(0,80))) t=r.buf.toString('utf8');
 return parseCSV(t);
}
const N=v=>{const x=parseFloat(v);return isNaN(x)?0:x;};
(async()=>{
 TK=await token();
 const R={generated:new Date().toISOString(),months:[],countries:{},languages:{},devices:{},os:{},appver:{},traffic:{},daily:[],rating:null,storeMonthly:[]};
 for(const m of MONTHS){
  const ov=await get(`stats/installs/installs_${PKG}_${m}_overview.csv`);
  if(ov.length){
   let inst=0,unin=0,last=0,lastDate='';
   for(const r of ov){ inst+=N(r['Daily Device Installs']); unin+=N(r['Uninstall events']); last=N(r['Active Device Installs']); lastDate=r['Date'];
     R.daily.push({date:r['Date'],installs:N(r['Daily Device Installs']),uninstalls:N(r['Uninstall events']),active:N(r['Active Device Installs'])}); }
   R.months.push({month:m,installs:inst,uninstalls:unin,net:inst-unin,activeEnd:last,through:lastDate,days:ov.length});
  }
  for(const [file,bucket,key] of [['country','countries','Country'],['language','languages','Language'],['device','devices','Device'],['os_version','os','Android OS Version'],['app_version','appver','App Version Code']]){
   const rows=await get(`stats/installs/installs_${PKG}_${m}_${file}.csv`);
   for(const r of rows){ const k=r[key]||r['Country']||r['Language']||r['Device']||'?'; if(!k) continue;
     const b=R[bucket][k]||(R[bucket][k]={installs:0,uninstalls:0,active:0});
     b.installs+=N(r['Daily Device Installs']); b.uninstalls+=N(r['Uninstall events']);
     b.active=Math.max(b.active,0); if(m===MONTHS[MONTHS.length-1]) b.active=N(r['Active Device Installs'])||b.active; }
  }
  const sp=await get(`stats/store_performance/store_performance_${PKG}_${m}_traffic_source.csv`);
  if(sp.length){ let v=0,a=0;
   for(const r of sp){ v+=N(r['Store listing visitors']); a+=N(r['Store listing acquisitions']);
     const ts=r['Traffic source']||'Other'; const b=R.traffic[ts]||(R.traffic[ts]={visitors:0,acq:0}); b.visitors+=N(r['Store listing visitors']); b.acq+=N(r['Store listing acquisitions']); }
   R.storeMonthly.push({month:m,visitors:v,acquisitions:a,cvr:v?a/v:0}); }
  const ra=await get(`stats/ratings/ratings_${PKG}_${m}_overview.csv`);
  if(ra.length){ const l=ra[ra.length-1]; R.rating={total:N(l['Total Average Rating']),through:l['Date']}; }
 }
 fs.writeFileSync('report.json',JSON.stringify(R,null,1));
 const pct=x=>(x*100).toFixed(1)+'%';
 console.log('=== MONTHLY ===');
 for(const m of R.months) console.log(`${m.month}  installs ${String(m.installs).padStart(4)}  uninstalls ${String(m.uninstalls).padStart(4)}  net ${String(m.net).padStart(4)}  active@end ${String(m.activeEnd).padStart(4)}  (through ${m.through})`);
 console.log('\n=== STORE LISTING ===');
 for(const s of R.storeMonthly) console.log(`${s.month}  visitors ${String(s.visitors).padStart(5)}  installs ${String(s.acquisitions).padStart(4)}  conversion ${pct(s.cvr)}`);
 const top=(o,n,label)=>{console.log(`\n=== TOP ${label} ===`);
  Object.entries(o).filter(([k,v])=>v.installs>0||v.active>0).sort((a,b)=>(b[1].active-a[1].active)||(b[1].installs-a[1].installs)).slice(0,n)
   .forEach(([k,v])=>console.log(`${k.slice(0,34).padEnd(34)} active ${String(v.active).padStart(4)}  installs ${String(v.installs).padStart(4)}  uninstalls ${String(v.uninstalls).padStart(4)}  churn ${v.installs?pct(v.uninstalls/v.installs):'-'}`));};
 top(R.countries,15,'COUNTRIES'); top(R.languages,10,'LANGUAGES'); top(R.os,8,'ANDROID VERSIONS'); top(R.appver,6,'APP VERSIONS'); top(R.devices,10,'DEVICES');
 console.log('\n=== RATING ==='); console.log(R.rating?`total average ${R.rating.total} (through ${R.rating.through})`:'n/a');
 console.log('\nreport.json written');
})().catch(e=>{console.error('FATAL',e.message);process.exit(1)});
