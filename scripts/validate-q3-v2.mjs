import fs from 'node:fs';
import path from 'node:path';
const ROOT=path.resolve('public/data-v2');
const expected={1:41,2:27,3:36,4:33,5:34,6:29,7:39,8:30};
let total=0; const ids=new Set(); const errors=[];
for (const [lesson,count] of Object.entries(expected)) {
 const file=path.join(ROOT,'book3',`lesson${String(lesson).padStart(2,'0')}.json`);
 if(!fs.existsSync(file)){errors.push(`missing ${file}`);continue;}
 const j=JSON.parse(fs.readFileSync(file,'utf8'));
 if(j.vocabulary.length!==count) errors.push(`L${lesson}: ${j.vocabulary.length}/${count}`);
 total+=j.vocabulary.length;
 for(const w of j.vocabulary){if(ids.has(w.id)) errors.push(`duplicate ${w.id}`); ids.add(w.id); if(!w.hanzi||!w.pinyin||!w.sourceVerified) errors.push(`invalid ${w.id}`);}
}
console.log(`Q3 lessons=8/8; vocabulary=${total}/269; ids=${ids.size}`);
if(total!==269) errors.push(`Q3 total ${total}/269`);
if(errors.length){console.error('Q3 STATUS: FAILED'); for(const e of errors) console.error('- '+e); process.exit(1);}
console.log('Q3 STATUS: OK');
