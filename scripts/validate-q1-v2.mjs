import fs from 'node:fs'
import path from 'node:path'
const ROOT = path.resolve('public/data-v2')
const expected = {1:11,2:14,3:15,4:14,5:16,6:19,7:16,8:18,9:13,10:16,11:15,12:18,13:26}
const errors=[]
const all=[]
for (const [lessonS,count] of Object.entries(expected)) {
  const lesson=Number(lessonS)
  const file=path.join(ROOT,'book1',`lesson${String(lesson).padStart(2,'0')}.json`)
  if (!fs.existsSync(file)) { errors.push(`missing ${file}`); continue }
  const d=JSON.parse(fs.readFileSync(file,'utf8'))
  if (d.id !== `b1_l${String(lesson).padStart(2,'0')}`) errors.push(`wrong id L${lesson}`)
  if (d.vocabulary?.length !== count) errors.push(`L${lesson}: ${d.vocabulary?.length}/${count}`)
  for (const w of d.vocabulary ?? []) {
    if (!w.hanzi?.trim()) errors.push(`${w.id} missing hanzi`)
    if (!w.pinyin?.trim()) errors.push(`${w.id} missing pinyin`)
    if (!w.meaningVi?.trim()) errors.push(`${w.id} missing meaningVi`)
    if (!w.sourceVerified) errors.push(`${w.id} not verified`)
    all.push(w)
  }
}
const ids=new Set(all.map(x=>x.id))
if (ids.size !== all.length) errors.push('duplicate vocabulary IDs')
if (all.length !== 211) errors.push(`Q1 total ${all.length}/211`)
const index=JSON.parse(fs.readFileSync(path.join(ROOT,'vocabulary-index.json'),'utf8'))
if (index.entries.filter(x=>x.book===1).length !== 211) errors.push('index Q1 != 211')
console.log(`Q1 lessons=13/13; vocabulary=${all.length}/211; uniqueIds=${ids.size}`)
if (errors.length) { console.error('Q1 STATUS: FAILED'); errors.forEach(x=>console.error('- '+x)); process.exit(1) }
console.log('Q1 STATUS: OK')
