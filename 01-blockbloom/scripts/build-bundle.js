/* Build bundle.json for play-listings-set-multi.js from the locale workflow.
 * Usage: node build-bundle.js <task.output | journal.jsonl> <out bundle.json> [expectedLocales,csv]
 * Prefers the workflow return value ({finals:[...]}); falls back to journal rule:
 *   per locale, the LAST titled result is the review — and there must be exactly 2 titled (draft+review).
 * es-419 text is duplicated to es-ES (neutral Spanish, both markets). */
const fs=require('fs'); const [SRC,OUT]=process.argv.slice(2);
const raw=fs.readFileSync(SRC,'utf8'); let finals=null;
if(/\.jsonl$/.test(SRC)){
  const L=raw.trim().split('\n').map(l=>{try{return JSON.parse(l)}catch(e){return null}}).filter(x=>x&&x.type==='result'&&x.result&&x.result.title);
  const by={}; L.forEach(x=>{(by[x.result.locale]=by[x.result.locale]||[]).push(x.result)});
  finals=[]; for(const [loc,arr] of Object.entries(by)){ if(arr.length!==2) throw new Error(`${loc}: expected 2 titled results (draft+review), found ${arr.length} — reviews not finished`); finals.push(arr[arr.length-1]); }
  console.log('source: journal (last titled per locale)');
} else {
  const j=JSON.parse(raw.slice(raw.indexOf('{'))); finals=j.finals||(j.result&&j.result.finals); if(!finals) throw new Error('no finals in output'); console.log('source: workflow return value (finals)');
}
const EXPECT=(process.argv[4]||'pt-BR,es-419,id,uk').split(','); const have=finals.map(f=>f.locale);
for(const e of EXPECT) if(!have.includes(e)) throw new Error('missing locale '+e+' (have '+have.join(',')+')');
const bundle={};
for(const f of finals){ const rec={title:f.title,shortDescription:f.short_description,fullDescription:f.full_description}; bundle[f.locale]=rec; if(f.locale==='es-419') bundle['es-ES']=rec; }
fs.writeFileSync(OUT,JSON.stringify(bundle,null,1),{encoding:'utf8'});
const len=s=>[...s].length;
for(const [k,v] of Object.entries(bundle)) console.log(`${k.padEnd(7)} t${String(len(v.title)).padStart(2)}/30 s${String(len(v.shortDescription)).padStart(2)}/80 f${String(len(v.fullDescription)).padStart(4)}/4000  "${v.title}"`);
console.log('\nREVIEW NOTES:'); for(const f of finals) console.log(`\n── ${f.locale}\n${(f.notes||'').split('\n').slice(0,14).join('\n')}`);
