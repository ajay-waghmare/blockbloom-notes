/* READ-ONLY: reads the LIVE published listing, images, and country availability. Commits nothing. */
const fs=require('fs'),crypto=require('crypto'),https=require('https');
const KEY=process.argv[2], PKG=process.argv[3]||'com.aweagle.blockbloom';
const sa=JSON.parse(fs.readFileSync(KEY,'utf8'));
const b64=s=>Buffer.from(s).toString('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
const req=(o,b)=>new Promise((res,rej)=>{const r=https.request(o,x=>{let d='';x.on('data',c=>d+=c);x.on('end',()=>res({status:x.statusCode,body:d}))});r.on('error',rej);if(b)r.write(b);r.end()});
async function token(){
  const now=Math.floor(Date.now()/1000);
  const si=`${b64(JSON.stringify({alg:'RS256',typ:'JWT'}))}.${b64(JSON.stringify({iss:sa.client_email,scope:'https://www.googleapis.com/auth/androidpublisher',aud:sa.token_uri,iat:now,exp:now+3600}))}`;
  const sg=crypto.createSign('RSA-SHA256');sg.update(si);
  const form=`grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${si}.${b64(sg.sign(sa.private_key))}`;
  const r=await req({method:'POST',hostname:'oauth2.googleapis.com',path:'/token',headers:{'Content-Type':'application/x-www-form-urlencoded','Content-Length':Buffer.byteLength(form)}},form);
  return JSON.parse(r.body).access_token;
}
const H='androidpublisher.googleapis.com';
(async()=>{
  const tk=await token(); const A={Authorization:`Bearer ${tk}`};
  const mk=await req({method:'POST',hostname:H,path:`/androidpublisher/v3/applications/${PKG}/edits`,headers:{...A,'Content-Length':0}});
  const editId=JSON.parse(mk.body).id;
  console.log('edit',editId,'(will be discarded)\n');
  const get=p=>req({method:'GET',hostname:H,path:`/androidpublisher/v3/applications/${PKG}/edits/${editId}${p}`,headers:A});

  console.log('='.repeat(66)+'\nLIVE STORE LISTINGS (what Play indexes for search)\n'+'='.repeat(66));
  const ls=await get('/listings');
  if(ls.status===200){
    const j=JSON.parse(ls.body);
    console.log('locales published:',(j.listings||[]).length);
    for(const L of j.listings||[]){
      console.log(`\n--- ${L.language} ---`);
      console.log(`TITLE      (${(L.title||'').length}/30): ${L.title}`);
      console.log(`SHORT DESC (${(L.shortDescription||'').length}/80): ${L.shortDescription}`);
      console.log(`FULL DESC  (${(L.fullDescription||'').length}/4000 chars)`);
      console.log(`VIDEO      : ${L.video?L.video:'(none)'}`);
      console.log('--- full description as published ---');
      console.log(L.fullDescription||'(empty)');
    }
  } else console.log(ls.status, ls.body.slice(0,400));

  console.log('\n'+'='.repeat(66)+'\nLIVE IMAGES\n'+'='.repeat(66));
  for(const t of ['icon','featureGraphic','phoneScreenshots','sevenInchScreenshots','tenInchScreenshots','tvBanner','promoGraphic']){
    const r=await get(`/listings/en-US/${t}`);
    let n='ERR';
    if(r.status===200){const j=JSON.parse(r.body);n=(j.images||[]).length;}
    console.log(`  ${t.padEnd(22)} ${r.status===200?n+' image(s)':'HTTP '+r.status}`);
  }

  console.log('\n'+'='.repeat(66)+'\nCOUNTRY AVAILABILITY (production)\n'+'='.repeat(66));
  const ca=await get('/countryAvailability/production');
  console.log('HTTP',ca.status);
  if(ca.status===200){
    const j=JSON.parse(ca.body);
    console.log('restrictCountries:',j.restCountries!==undefined?j.restCountries:j.restrictCountries);
    console.log('syncWithProduction:',j.syncWithProduction);
    const c=j.countries||[];
    console.log('countries listed:',c.length, c.length?c.map(x=>x.countryCode).join(','):'(none listed = all/default)');
  } else console.log(ca.body.slice(0,300));

  console.log('\n'+'='.repeat(66)+'\nAPP DETAILS\n'+'='.repeat(66));
  const d=await get('/details');
  if(d.status===200){const j=JSON.parse(d.body);console.log('defaultLanguage:',j.defaultLanguage,'| contactWebsite:',j.contactWebsite||'(none)');}

  await req({method:'DELETE',hostname:H,path:`/androidpublisher/v3/applications/${PKG}/edits/${editId}`,headers:A});
  console.log('\nedit discarded. Nothing modified.');
})().catch(e=>{console.error('FATAL',e.message);process.exit(1)});
