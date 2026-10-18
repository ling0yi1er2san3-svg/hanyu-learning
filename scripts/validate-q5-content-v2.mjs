import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('public/data-v2/book5');
const expected = new Map([
  [1,1],[2,1],[3,1],[4,2],[5,1],[6,1],[7,2],[8,1],[9,1],[10,1]
]);
let errors=[];
let sections=0;
let chars=0;
for (const [lesson, expectedSections] of expected) {
  const file=path.join(ROOT,`lesson${String(lesson).padStart(2,'0')}.json`);
  if (!fs.existsSync(file)) { errors.push(`missing lesson${lesson}`); continue; }
  const d=JSON.parse(fs.readFileSync(file,'utf8'));
  if (d.verification?.textsVerified !== true) errors.push(`${d.id}: textsVerified != true`);
  const arr=Array.isArray(d.texts)?d.texts:[];
  if (arr.length!==expectedSections) errors.push(`${d.id}: sections ${arr.length}/${expectedSections}`);
  sections += arr.length;
  for (const t of arr) {
    if (!t.sourceVerified) errors.push(`${d.id}/${t.id}: sourceVerified false`);
    if (!t.chinese || t.chinese.trim().length < 80) errors.push(`${d.id}/${t.id}: text too short`);
    if (!Array.isArray(t.sourcePages) || !t.sourcePages.length) errors.push(`${d.id}/${t.id}: missing sourcePages`);
    chars += (t.chinese||'').length;
  }
}
console.log(`Q5 content lessons=${expected.size}/${expected.size}`);
console.log(`texts=${sections}`);
console.log(`characters=${chars}`);
if (errors.length) {
  console.error(errors.join('\n'));
  console.error('Q5 CONTENT STATUS: FAILED');
  process.exit(1);
}
console.log('Q5 CONTENT STATUS: OK');
