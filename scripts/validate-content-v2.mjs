import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('public/data-v2');
const catalogData = JSON.parse(fs.readFileSync(path.join(ROOT,'catalog-v2.json'),'utf8'));
const catalog = Array.isArray(catalogData) ? catalogData : catalogData.lessons;
const core = catalog.filter(x => x.sourceStatus === 'core_structured');
const errors = [];
let lessons = 0;
let textSections = 0;
let dialogueSections = 0;
let dialogueLines = 0;
let chineseChars = 0;

for (const item of core) {
  const file = path.join(ROOT,`book${item.book}`,`lesson${String(item.lesson).padStart(2,'0')}.json`);
  if (!fs.existsSync(file)) { errors.push(`${item.id}: missing lesson file`); continue; }
  const d = JSON.parse(fs.readFileSync(file,'utf8'));
  lessons++;
  if (d.verification?.textsVerified !== true) errors.push(`${d.id}: textsVerified != true`);
  const texts = Array.isArray(d.texts) ? d.texts : [];
  const dialogues = Array.isArray(d.dialogues) ? d.dialogues : [];
  let hasSourceContent = false;
  for (const t of texts) {
    textSections++;
    if (!t.sourceVerified) errors.push(`${d.id}/${t.id}: text sourceVerified false`);
    const s=(t.chinese||'').trim();
    if (s) { hasSourceContent = true; chineseChars += s.length; }
  }
  for (const g of dialogues) {
    dialogueSections++;
    if (!g.sourceVerified) errors.push(`${d.id}/${g.id}: dialogue sourceVerified false`);
    const lines = Array.isArray(g.lines) ? g.lines : [];
    if (lines.length) hasSourceContent = true;
    dialogueLines += lines.length;
    for (const ln of lines) {
      const s=(ln.chinese||'').trim();
      if (!s) errors.push(`${d.id}/${g.id}: empty dialogue line`);
      chineseChars += s.length;
    }
  }
  if (!hasSourceContent) errors.push(`${d.id}: no source text/dialogue content`);
}
console.log(`Core content lessons=${lessons}/${core.length}`);
console.log(`textSections=${textSections}; dialogueSections=${dialogueSections}; dialogueLines=${dialogueLines}`);
console.log(`Chinese characters=${chineseChars}`);
if (errors.length) {
  console.error(errors.join('\n'));
  console.error('GLOBAL CONTENT STATUS: FAILED');
  process.exit(1);
}
console.log('GLOBAL CONTENT STATUS: OK');
