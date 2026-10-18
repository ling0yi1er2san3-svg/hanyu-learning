import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve('public/data-v2/book5');
let lessons=0, units=0, translated=0, assistant=0, errors=[];
for (let lesson=1; lesson<=10; lesson++) {
  const file=path.join(root, `lesson${String(lesson).padStart(2,'0')}.json`);
  if (!fs.existsSync(file)) { errors.push(`missing lesson${lesson}`); continue; }
  const d=JSON.parse(fs.readFileSync(file,'utf8')); lessons++;
  const nodes=[...(d.texts ?? []), ...(d.dialogues ?? []).flatMap(x => x.lines ?? [])];
  if (!nodes.length) errors.push(`${d.id}: no content units`);
  for (const n of nodes) {
    units++;
    if (typeof n.vietnamese === 'string' && n.vietnamese.trim()) translated++;
    else errors.push(`${d.id}: untranslated unit: ${String(n.chinese).slice(0,35)}`);
    if (n.vietnameseStatus === 'assistant_translation') assistant++;
    else errors.push(`${d.id}: missing assistant_translation status`);
  }
  if (!d.verification?.translationCoverageComplete) errors.push(`${d.id}: translationCoverageComplete != true`);
  if (d.verification?.translationSourceVerified !== false) errors.push(`${d.id}: translationSourceVerified must be false`);
  if (d.verification?.translationMethod !== 'assistant_translation') errors.push(`${d.id}: translationMethod != assistant_translation`);
  if (d.verification?.generatedTranslation !== true) errors.push(`${d.id}: generatedTranslation != true`);
}
console.log(`Q5 translation lessons=${lessons}/10`);
console.log(`units=${units}`);
console.log(`translated=${translated}/${units}`);
console.log(`assistant_translation=${assistant}/${units}`);
if (units !== 12) errors.push(`Q5 expected 12 units, got ${units}`);
if (errors.length) {
  console.error('Q5 TRANSLATION STATUS: FAILED');
  for (const e of errors) console.error('- '+e);
  process.exit(1);
}
console.log('Q5 TRANSLATION STATUS: OK');
