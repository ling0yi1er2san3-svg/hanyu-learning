import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('public/data-v2/book6');
const expected = new Map([
  [14,5],[15,1],[16,1],[17,1],[18,1],[19,1],[20,1],[21,1],[22,1]
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
    if (t.pinyinStatus !== 'pending') errors.push(`${d.id}/${t.id}: pinyinStatus should remain pending`);
    if (t.vietnameseStatus !== 'pending') errors.push(`${d.id}/${t.id}: vietnameseStatus should remain pending`);
    chars += (t.chinese||'').length;
  }
}
console.log(`Q6 content lessons=${expected.size}/${expected.size}`);
console.log(`texts=${sections}`);
console.log(`characters=${chars}`);
if (errors.length) {
  console.error(errors.join('\n'));
  console.error('Q6 CONTENT STATUS: FAILED');
  process.exit(1);
}
console.log('Q6 CONTENT STATUS: OK');
