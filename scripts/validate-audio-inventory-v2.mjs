import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('public/data-v2');
const errors=[];
for (const book of [5,6]) {
  const fp=path.join(root,`audio-inventory-book${book}.json`);
  if (!fs.existsSync(fp)) { errors.push(`missing ${fp}`); continue; }
  const d=JSON.parse(fs.readFileSync(fp,'utf8'));
  if (d.trackCount!==15) errors.push(`book${book}: trackCount ${d.trackCount}/15`);
  if (d.lessonTrackCandidates!==13) errors.push(`book${book}: lesson candidates ${d.lessonTrackCandidates}/13`);
  if ((d.tracks??[]).some(x=>x.mappingVerified===true)) errors.push(`book${book}: inventory contains prematurely verified mapping`);
  const lessonTracks=(d.tracks??[]).filter(x=>x.candidateLesson!=null);
  const expected=book===5 ? Array.from({length:13},(_,i)=>i+1) : Array.from({length:13},(_,i)=>i+14);
  const got=lessonTracks.map(x=>x.candidateLesson);
  if (JSON.stringify(got)!==JSON.stringify(expected)) errors.push(`book${book}: sequential candidate lesson list mismatch`);
  console.log(`Book ${book}: tracks=${d.trackCount}, lessonCandidates=${d.lessonTrackCandidates}, verified=0`);
}
if (errors.length) { console.error('ERRORS'); errors.forEach(x=>console.error('- '+x)); process.exit(1); }
console.log('AUDIO INVENTORY STATUS: OK (candidate mapping only, no playable mapping verified)');
