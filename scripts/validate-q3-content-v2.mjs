import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('public/data-v2/book3');
let errors = [];
let lessonCount = 0;
let dialogueCount = 0;
let lineCount = 0;
for (let lesson = 1; lesson <= 8; lesson++) {
  const file = path.join(root, `lesson${String(lesson).padStart(2,'0')}.json`);
  if (!fs.existsSync(file)) { errors.push(`missing ${file}`); continue; }
  const x = JSON.parse(fs.readFileSync(file,'utf8'));
  lessonCount++;
  if (x.verification?.textsVerified !== true) errors.push(`${x.id}: textsVerified != true`);
  if (!Array.isArray(x.dialogues) || x.dialogues.length === 0) errors.push(`${x.id}: no dialogues`);
  for (const d of x.dialogues ?? []) {
    dialogueCount++;
    if (!Array.isArray(d.lines) || d.lines.length === 0) errors.push(`${x.id}/${d.id}: empty lines`);
    for (const line of d.lines ?? []) {
      lineCount++;
      if (!String(line.chinese ?? '').trim()) errors.push(`${x.id}/${d.id}: empty chinese line`);
    }
  }
}
console.log(`Q3 content lessons=${lessonCount}/8; dialogues=${dialogueCount}; lines=${lineCount}`);
if (errors.length) {
  console.error(errors.join('\n'));
  console.error('Q3 CONTENT STATUS: FAILED');
  process.exit(1);
}
console.log('Q3 CONTENT STATUS: OK');
