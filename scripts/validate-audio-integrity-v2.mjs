import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const dataRoot=path.resolve('public/data-v2');
const projectRoot=path.resolve('.');
const errors=[];
const shaRe=/^[0-9a-f]{64}$/;
let verifiedTotal=0;

function sha256(fp){
  return crypto.createHash('sha256').update(fs.readFileSync(fp)).digest('hex');
}
function lessonPath(book, lesson){
  return path.join(dataRoot,`book${book}`,`lesson${String(lesson).padStart(2,'0')}.json`);
}
function publicPathFromSrc(src){
  const clean=String(src||'').replace(/^https?:\/\/[^/]+/,'').replace(/^\//,'').replace(/^public\//,'');
  return path.join(projectRoot,'public',...clean.split('/'));
}

for (const book of [5,6]) {
  const fp=path.join(dataRoot,`audio-inventory-book${book}.json`);
  if (!fs.existsSync(fp)) { errors.push(`missing ${fp}`); continue; }
  const d=JSON.parse(fs.readFileSync(fp,'utf8'));
  const a=d.archiveIntegrity ?? {};
  if (!shaRe.test(a.sha256??'')) errors.push(`book${book}: invalid archive SHA-256`);
  if (!(a.sizeBytes>0)) errors.push(`book${book}: invalid archive size`);
  if (a.extractionChecked!==true) errors.push(`book${book}: archive extraction not checked`);
  if (a.extractedTrackCount!==15) errors.push(`book${book}: extractedTrackCount ${a.extractedTrackCount}/15`);
  if (d.technicalMetadataStatus!=='verified_file_integrity_and_stream_metadata_only') errors.push(`book${book}: technicalMetadataStatus mismatch`);

  let seconds=0;
  let verified=0;
  for (const t of d.tracks??[]) {
    const m=t.technicalMetadata ?? {};
    if (t.technicalMetadataChecked!==true) errors.push(`book${book} track${t.trackNumber}: technical metadata unchecked`);
    if (m.codec!=='mp3') errors.push(`book${book} track${t.trackNumber}: codec=${m.codec}`);
    if (!(m.durationSeconds>0)) errors.push(`book${book} track${t.trackNumber}: invalid duration`); else seconds+=m.durationSeconds;
    if (!(m.extractedSizeBytes>0)) errors.push(`book${book} track${t.trackNumber}: invalid size`);
    if (!shaRe.test(m.sha256??'')) errors.push(`book${book} track${t.trackNumber}: invalid SHA-256`);
    if (![1,2].includes(m.channels)) errors.push(`book${book} track${t.trackNumber}: channels=${m.channels}`);
    if (!(m.sampleRateHz>0)) errors.push(`book${book} track${t.trackNumber}: invalid sample rate`);

    if (t.mappingVerified===true) {
      verified++;
      verifiedTotal++;
      if (t.contentChecked!==true) errors.push(`book${book} track${t.trackNumber}: mappingVerified but contentChecked is not true`);
      if (t.verificationMethod!=='user_listen_confirmed') errors.push(`book${book} track${t.trackNumber}: invalid verificationMethod`);
      if (!Number.isInteger(t.verifiedLesson)) errors.push(`book${book} track${t.trackNumber}: missing verifiedLesson`);
      if (t.verifiedLesson!==t.candidateLesson) errors.push(`book${book} track${t.trackNumber}: verifiedLesson differs from candidateLesson`);

      const lp=lessonPath(book,t.verifiedLesson);
      if (!fs.existsSync(lp)) { errors.push(`book${book} track${t.trackNumber}: missing lesson json ${lp}`); continue; }
      const lesson=JSON.parse(fs.readFileSync(lp,'utf8'));
      const lessonTracks=(lesson.audio?.tracks??[]).filter(x=>x.mappingVerified===true && Number(x.trackNumber)===Number(t.trackNumber));
      if (lessonTracks.length!==1) { errors.push(`book${book} track${t.trackNumber}: lesson${t.verifiedLesson} must contain exactly one matching verified audio track`); continue; }
      const lt=lessonTracks[0];
      if (String(lt.sha256||'').toLowerCase()!==String(m.sha256).toLowerCase()) errors.push(`book${book} lesson${t.verifiedLesson}: JSON SHA-256 differs from inventory`);
      if (lt.verificationMethod!=='user_listen_confirmed') errors.push(`book${book} lesson${t.verifiedLesson}: lesson track verificationMethod invalid`);
      const audioFp=publicPathFromSrc(lt.src);
      if (!fs.existsSync(audioFp)) { errors.push(`book${book} lesson${t.verifiedLesson}: missing playable original audio ${audioFp}`); }
      else {
        const actual=sha256(audioFp);
        if (actual!==String(m.sha256).toLowerCase()) errors.push(`book${book} lesson${t.verifiedLesson}: copied audio SHA-256 mismatch`);
      }
    } else if (t.contentChecked===true && t.verificationMethod==='user_listen_confirmed') {
      errors.push(`book${book} track${t.trackNumber}: user_listen_confirmed but mappingVerified is false`);
    }
  }
  console.log(`Book ${book}: archive=${a.sizeBytes} bytes, tracks=${d.tracks?.length ?? 0}, duration=${seconds.toFixed(1)}s, manuallyVerified=${verified}`);
}
if (errors.length) {
  console.error('ERRORS');
  errors.forEach(x=>console.error('- '+x));
  process.exit(1);
}
console.log(`AUDIO INTEGRITY STATUS: OK (technical inventory intact; verified playable lesson tracks=${verifiedTotal})`);
