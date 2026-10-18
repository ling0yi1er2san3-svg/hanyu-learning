import fs from 'node:fs'
import path from 'node:path'
const ROOT=path.resolve('public/data-v2')
const expected={14:56,15:46,16:49,17:63,18:61,19:52,20:75,21:63,22:70}
let errors=[]; let total=0; let ids=new Set()
for (const [lesson,count] of Object.entries(expected)) {
 const file=path.join(ROOT,'book6',`lesson${String(lesson).padStart(2,'0')}.json`)
 if(!fs.existsSync(file)){errors.push(`missing ${file}`);continue}
 const d=JSON.parse(fs.readFileSync(file,'utf8')); total+=d.vocabulary.length
 if(d.vocabulary.length!==count) errors.push(`B${lesson}: ${d.vocabulary.length}/${count}`)
 for(const w of d.vocabulary){ if(ids.has(w.id)) errors.push(`duplicate ${w.id}`); ids.add(w.id); if(!w.hanzi||!w.pinyin||!w.sourceVerified) errors.push(`invalid ${w.id}`)}
}
console.log(`Q6 lessons=${Object.keys(expected).length}/9; vocabulary=${total}/535; ids=${ids.size}`)
if(errors.length){console.error('Q6 STATUS: FAILED'); errors.forEach(e=>console.error('- '+e)); process.exit(1)}
console.log('Q6 STATUS: OK')
