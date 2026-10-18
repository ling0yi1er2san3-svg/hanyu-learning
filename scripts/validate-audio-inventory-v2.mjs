import fs from 'node:fs';
import path from 'node:path';

const root=path.resolve('public/data-v2');
const errors=[];
let verifiedTotal=0;
for (const book of [5,6]) {
  const fp=path.join(root,`audio-inventory-book${book}.json`);
  if (!fs.existsSync(fp)) { errors.push(`missing ${fp}`); continue; }
  const d=JSON.parse(fs.readFileSync(fp,'utf8'));
  if (d.trackCount!==15) errors.push(`book${book}: trackCount ${d.trackCount}/15`);
  if (d.lessonTrackCandidates!==13) errors.push(`book${book}: lesson candidates ${d.lessonTrackCandidates}/13`);

  const lessonTracks=(d.tracks??[]).filter(x=>x.candidateLesson!=null);
  const expected=book===5 ? Array.from({length:13},(_,i)=>i+1) : Array.from({length:13},(_,i)=>i+14);
  const got=lessonTracks.map(x=>x.candidateLesson);
  if (JSON.stringify(got)!==JSON.stringify(expected)) errors.push(`book${book}: sequential candidate lesson list mismatch`);

  const verified=lessonTracks.filter(x=>x.mappingVerified===true);
  verifiedTotal += verified.length;
  for (const t of verified) {
    if (t.contentChecked!==true) errors.push(`book${book} track${t.trackNumber}: verified mapping without contentChecked=true`);
    if (t.verificationMethod!=='user_listen_confirmed') errors.push(`book${book} track${t.trackNumber}: unsupported verificationMethod=${t.verificationMethod}`);
    if (t.verifiedLesson!==t.candidateLesson) errors.push(`book${book} track${t.trackNumber}: verifiedLesson must equal candidateLesson after manual confirmation`);
    if (!t.verifiedAt) errors.push(`book${book} track${t.trackNumber}: missing verifiedAt`);
  }

  const allowedStatuses=['not_listened_or_transcribed','partially_user_listen_verified','user_listen_verified'];
  if (!allowedStatuses.includes(d.contentVerificationStatus)) errors.push(`book${book}: invalid contentVerificationStatus=${d.contentVerificationStatus}`);
  const expectedStatus=verified.length===0?'not_listened_or_transcribed':verified.length===lessonTracks.length?'user_listen_verified':'partially_user_listen_verified';
  if (d.contentVerificationStatus!==expectedStatus) errors.push(`book${book}: contentVerificationStatus=${d.contentVerificationStatus}, expected ${expectedStatus}`);
  if (d.verifiedLessonTrackCount!=null && d.verifiedLessonTrackCount!==verified.length) errors.push(`book${book}: verifiedLessonTrackCount=${d.verifiedLessonTrackCount}/${verified.length}`);

  console.log(`Book ${book}: tracks=${d.trackCount}, lessonCandidates=${d.lessonTrackCandidates}, verified=${verified.length}`);
}
if (errors.length) { console.error('ERRORS'); errors.forEach(x=>console.error('- '+x)); process.exit(1); }
console.log(`AUDIO INVENTORY STATUS: OK (manually verified lesson mappings=${verifiedTotal}; pending candidates remain allowed)`);
