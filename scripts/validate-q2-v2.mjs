import fs from 'node:fs'
import path from 'node:path'
const ROOT=path.resolve('public/data-v2')
const expected={16:30,17:24,18:23,19:17,20:23,21:27,22:27,23:23,24:23}
const errors=[]; const all=[]
for (const [ls,c] of Object.entries(expected)) {
 const l=Number(ls), f=path.join(ROOT,'book2',`lesson${String(l).padStart(2,'0')}.json`)
 if(!fs.existsSync(f)){errors.push(`missing ${f}`);continue}
 const d=JSON.parse(fs.readFileSync(f,'utf8'))
 if(d.id!==`b2_l${String(l).padStart(2,'0')}`) errors.push(`wrong id L${l}`)
 if(d.sourceStatus!=='core_structured') errors.push(`wrong status L${l}`)
 if(d.vocabulary?.length!==c) errors.push(`L${l}: ${d.vocabulary?.length}/${c}`)
 for(const w of d.vocabulary??[]){
  if(!w.hanzi?.trim()) errors.push(`${w.id} missing hanzi`)
  if(!w.pinyin?.trim()) errors.push(`${w.id} missing pinyin`)
  if(!w.meaningVi?.trim()) errors.push(`${w.id} missing meaningVi`)
  if(!w.sourceVerified) errors.push(`${w.id} not verified`)
  all.push(w)
 }
}
const ids=new Set(all.map(x=>x.id)); if(ids.size!==all.length) errors.push('duplicate Q2 vocabulary IDs')
if(all.length!==217) errors.push(`Q2 total ${all.length}/217`)
const idx=JSON.parse(fs.readFileSync(path.join(ROOT,'vocabulary-index.json'),'utf8'))
const q1=idx.entries.filter(x=>x.book===1), q2=idx.entries.filter(x=>x.book===2)
if(q1.length!==211) errors.push(`index Q1 ${q1.length}/211`)
if(q2.length!==217) errors.push(`index Q2 ${q2.length}/217`)
if(idx.entries.length < 428 || idx.count !== idx.entries.length) errors.push(`global index invalid ${idx.entries.length}`)
const search=JSON.parse(fs.readFileSync(path.join(ROOT,'vocabulary-search-index.json'),'utf8'))
if(search.entries.length!==idx.entries.length) errors.push(`search index ${search.entries.length}/${idx.entries.length}`)
const allIds=new Set(idx.entries.map(x=>x.id)); if(allIds.size!==idx.entries.length) errors.push('duplicate global IDs')
console.log(`Q2 lessons=9/9; vocabulary=${all.length}/217; uniqueIds=${ids.size}`)
console.log(`Global vocabulary index=${idx.entries.length}/1942 (Q1+Q2 preserved)`)
if(errors.length){console.error('Q2 STATUS: FAILED');errors.forEach(x=>console.error('- '+x));process.exit(1)}
console.log('Q2 STATUS: OK')
