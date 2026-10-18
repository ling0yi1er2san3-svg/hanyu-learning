import fs from 'node:fs';
import path from 'node:path';
const ranges = {1:[1,13],2:[16,24],3:[1,8],4:[11,19],5:[1,10],6:[14,22]};
let lessons=0, units=0, translated=0, assistant=0, sourceOrLegacy=0, errors=[];
const byBook={};
for (const [bookS,[from,to]] of Object.entries(ranges)) {
  const book=Number(bookS); byBook[book]={lessons:0,units:0,translated:0};
  for (let lesson=from; lesson<=to; lesson++) {
    const file=path.resolve(`public/data-v2/book${book}/lesson${String(lesson).padStart(2,'0')}.json`);
    if (!fs.existsSync(file)) { errors.push(`book${book}: missing lesson${lesson}`); continue; }
    const d=JSON.parse(fs.readFileSync(file,'utf8')); lessons++; byBook[book].lessons++;
    const nodes=[...(d.texts ?? []), ...(d.dialogues ?? []).flatMap(x => x.lines ?? [])];
    for (const n of nodes) {
      units++; byBook[book].units++;
      if (typeof n.vietnamese === 'string' && n.vietnamese.trim()) { translated++; byBook[book].translated++; }
      else errors.push(`${d.id}: untranslated unit: ${String(n.chinese).slice(0,35)}`);
      if (n.vietnameseStatus === 'assistant_translation') assistant++;
      else sourceOrLegacy++;
    }
    if (book>=2) {
      if (!d.verification?.translationCoverageComplete) errors.push(`${d.id}: translationCoverageComplete != true`);
    }
  }
}
console.log(`TRANSLATION core lessons=${lessons}/58`);
for (const [b,s] of Object.entries(byBook)) console.log(`Book ${b}: lessons=${s.lessons}, translated=${s.translated}/${s.units}`);
console.log(`translated=${translated}/${units}`);
console.log(`assistant_translation=${assistant}`);
console.log(`source_or_legacy_translation=${sourceOrLegacy}`);
if (lessons !== 58) errors.push(`expected 58 core lessons, got ${lessons}`);
if (translated !== units) errors.push(`not all core content units translated: ${translated}/${units}`);
if (errors.length) {
  console.error('GLOBAL TRANSLATION STATUS: FAILED');
  for (const e of errors) console.error('- '+e);
  process.exit(1);
}
console.log('GLOBAL TRANSLATION STATUS: OK');
