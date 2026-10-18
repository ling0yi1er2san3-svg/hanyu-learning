import fs from 'node:fs';
import path from 'node:path';

const root=path.resolve('public/data-v2');
let total=0, have=0, generated=0, existing=0;
const errors=[];
const byBook={};
for (let book=1; book<=6; book++) {
  const dir=path.join(root,`book${book}`);
  const files=fs.existsSync(dir) ? fs.readdirSync(dir).filter(x=>/^lesson\d+\.json$/.test(x)).sort() : [];
  let bTotal=0,bHave=0,bGenerated=0,bExisting=0;
  for (const f of files) {
    const d=JSON.parse(fs.readFileSync(path.join(dir,f),'utf8'));
    if (d.sourceStatus!=='core_structured') continue;
    const units=[];
    for (const dia of d.dialogues ?? []) for (const line of dia.lines ?? []) if (line.chinese) units.push(line);
    for (const t of d.texts ?? []) if (t.chinese) units.push(t);
    for (const u of units) {
      total++; bTotal++;
      if (typeof u.pinyin==='string' && u.pinyin.trim()) { have++; bHave++; }
      else errors.push(`${d.id}: missing pinyin for Chinese content unit`);
      if (u.pinyinStatus==='generated_icu_han_latin') { generated++; bGenerated++; }
      else if (u.pinyin) { existing++; bExisting++; }
    }
    if (units.length && d.verification?.pinyinCoverageComplete !== true) {
      errors.push(`${d.id}: verification.pinyinCoverageComplete != true`);
    }
  }
  byBook[book]={total:bTotal,have:bHave,generated:bGenerated,existing:bExisting};
}
console.log('HANYU V2 PINYIN VALIDATION');
for (let b=1;b<=6;b++) {
  const x=byBook[b];
  console.log(`Book ${b}: ${x.have}/${x.total} units; generated=${x.generated}; existing=${x.existing}`);
}
console.log(`Global: ${have}/${total}; generated=${generated}; existing=${existing}`);
if (errors.length) {
  console.error('\nERRORS'); errors.forEach(x=>console.error('- '+x)); process.exit(1);
}
console.log('PINYIN STATUS: OK (coverage complete; generated readings remain unverified)');
