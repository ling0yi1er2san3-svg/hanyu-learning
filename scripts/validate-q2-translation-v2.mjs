import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('public/data-v2/book2');
let lessons=0, units=0, translated=0, assistant=0, errors=[];
for (let lesson=16; lesson<=24; lesson++) {
  const file=path.join(root, `lesson${String(lesson).padStart(2,'0')}.json`);
  if (!fs.existsSync(file)) { errors.push(`missing lesson${lesson}`); continue; }
  const d=JSON.parse(fs.readFileSync(file,'utf8')); lessons++;
  const nodes=[];
  for (const t of d.texts ?? []) nodes.push(t);
  for (const dia of d.dialogues ?? []) for (const line of dia.lines ?? []) nodes.push(line);
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
}
console.log(`Q2 translation lessons=${lessons}/9`);
console.log(`units=${units}`);
console.log(`translated=${translated}/${units}`);
console.log(`assistant_translation=${assistant}/${units}`);
if (errors.length) {
  console.error('Q2 TRANSLATION STATUS: FAILED');
  for (const e of errors) console.error('- '+e);
  process.exit(1);
}
console.log('Q2 TRANSLATION STATUS: OK');
