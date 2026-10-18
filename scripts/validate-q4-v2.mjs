import fs from 'node:fs';
import path from 'node:path';
const ROOT=path.resolve('public/data-v2');
const expected={11:41,12:45,13:31,14:40,15:40,16:30,17:28,18:30,19:35};
let total=0; const ids=new Set(); const errors=[];
for (const [lesson,count] of Object.entries(expected)) {
 const file=path.join(ROOT,'book4',`lesson${String(lesson).padStart(2,'0')}.json`);
 if(!fs.existsSync(file)){errors.push(`missing ${file}`);continue;}
 const j=JSON.parse(fs.readFileSync(file,'utf8'));
 if(j.vocabulary.length!==count) errors.push(`L${lesson}: ${j.vocabulary.length}/${count}`);
 if(j.vocabularyExpectedCount!==count) errors.push(`L${lesson}: expected field ${j.vocabularyExpectedCount}/${count}`);
 total+=j.vocabulary.length;
 for(const w of j.vocabulary){if(ids.has(w.id)) errors.push(`duplicate ${w.id}`); ids.add(w.id); if(!w.hanzi||!w.pinyin||!w.meaningVi||!w.sourceVerified) errors.push(`invalid ${w.id}`);}
}
console.log(`Q4 lessons=9/9; vocabulary=${total}/320; ids=${ids.size}`);
if(total!==320) errors.push(`Q4 total ${total}/320`);
if(errors.length){console.error('Q4 STATUS: FAILED'); for(const e of errors) console.error('- '+e); process.exit(1);}
console.log('Q4 STATUS: OK');
