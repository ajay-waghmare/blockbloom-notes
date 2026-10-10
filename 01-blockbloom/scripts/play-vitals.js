/* READ-ONLY Android vitals via Play Developer Reporting API. Usage: node play-vitals.js <sa.json> <pkg> [days=28]
 * NOTE: DAILY aggregation REQUIRES timeZone America/Los_Angeles (UTC is rejected with 400). Data lags ~2-3 days. */
const fs=require("fs"),crypto=require("crypto"),https=require("https");
const [KEY,PKG,DAYS="28"]=process.argv.slice(2); const sa=JSON.parse(fs.readFileSync(KEY,"utf8"));
const b64=s=>Buffer.from(s).toString("base64").replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
const req=(o,b)=>new Promise((res,rej)=>{const r=https.request(o,x=>{let d="";x.on("data",c=>d+=c);x.on("end",()=>res({status:x.statusCode,body:d}))});r.on("error",rej);if(b)r.write(b);r.end()});
const TZ={id:"America/Los_Angeles"};
const dateMinus=(d,n)=>{const t=Date.UTC(d.year,d.month-1,d.day);const x=new Date(t-n*86400000);return {year:x.getUTCFullYear(),month:x.getUTCMonth()+1,day:x.getUTCDate()}};
(async()=>{const now=Math.floor(Date.now()/1000);
 const si=`${b64(JSON.stringify({alg:"RS256",typ:"JWT"}))}.${b64(JSON.stringify({iss:sa.client_email,scope:"https://www.googleapis.com/auth/playdeveloperreporting",aud:sa.token_uri,iat:now,exp:now+3600}))}`;
 const sg=crypto.createSign("RSA-SHA256");sg.update(si);
 const form=`grant_type=${encodeURIComponent("urn:ietf:params:oauth:grant-type:jwt-bearer")}&assertion=${si}.${b64(sg.sign(sa.private_key))}`;
 const t=await req({method:"POST",hostname:"oauth2.googleapis.com",path:"/token",headers:{"Content-Type":"application/x-www-form-urlencoded","Content-Length":Buffer.byteLength(form)}},form);
 const A={Authorization:`Bearer ${JSON.parse(t.body).access_token}`,"Content-Type":"application/json"};const H="playdeveloperreporting.googleapis.com";
 const SETS=[["crashRateMetricSet","crashRate","userPerceivedCrashRate"],["anrRateMetricSet","anrRate","userPerceivedAnrRate"],["slowStartRateMetricSet","slowStartRate",null],["excessiveWakeupRateMetricSet","excessiveWakeupRate",null],["stuckBackgroundWakelockRateMetricSet","stuckBgWakelockRate",null]];
 console.log(`Android vitals — ${PKG} — last ${DAYS} days (daily, America/Los_Angeles)\n`);
 for(const [set,metric,perceived] of SETS){
  const g=await req({method:"GET",hostname:H,path:`/v1beta1/apps/${PKG}/${set}`,headers:A}); if(g.status!==200){console.log(`${set.padEnd(38)} HTTP ${g.status}`);continue;}
  const daily=((JSON.parse(g.body).freshnessInfo||{}).freshnesses||[]).find(f=>f.aggregationPeriod==="DAILY"); if(!daily){console.log(`${set.padEnd(38)} no DAILY freshness`);continue;}
  const end=daily.latestEndTime, start=dateMinus(end,+DAYS-1);
  const metrics=[metric,"distinctUsers"].concat(perceived?[perceived]:[]);
  const q=JSON.stringify({timelineSpec:{aggregationPeriod:"DAILY",startTime:{...start,timeZone:TZ},endTime:{...end,timeZone:TZ}},metrics,pageSize:100});
  const r=await req({method:"POST",hostname:H,path:`/v1beta1/apps/${PKG}/${set}:query`,headers:{...A,"Content-Length":Buffer.byteLength(q)}},q);
  if(r.status!==200){console.log(`${set.padEnd(38)} query HTTP ${r.status} ${r.body.replace(/\s+/g," ").slice(0,160)}`);continue;}
  const rows=JSON.parse(r.body).rows||[]; const pts=rows.map(x=>{const m={};(x.metrics||[]).forEach(v=>m[v.metric]=v.decimalValue?parseFloat(v.decimalValue.value):null);return {d:`${x.startTime.month}/${x.startTime.day}`,...m}});
  const users=pts.reduce((s,p)=>s+(p.distinctUsers||0),0); const nz=pts.filter(p=>(p[metric]||0)>0);
  const maxR=Math.max(0,...pts.map(p=>p[metric]||0)); const maxP=perceived?Math.max(0,...pts.map(p=>p[perceived]||0)):null;
  console.log(`${set.padEnd(38)} data→${end.year}-${String(end.month).padStart(2,"0")}-${String(end.day).padStart(2,"0")}  days-with-data=${pts.length}  Σusers=${users}  max ${metric}=${(maxR*100).toFixed(2)}%${perceived?`  max ${perceived}=${(maxP*100).toFixed(2)}%`:""}`);
  if(nz.length) console.log(`   nonzero days: ${nz.map(p=>`${p.d}=${(p[metric]*100).toFixed(1)}% (${p.distinctUsers||"?"}u)`).join(", ")}`);
 }
 console.log("\nPlay 'bad behaviour' thresholds for reference: user-perceived crash rate ≥1.09%, user-perceived ANR rate ≥0.47% (28-day, Google Play guidance).");
})().catch(e=>{console.error("FATAL",e.message);process.exit(1)});
