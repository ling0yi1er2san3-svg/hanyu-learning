import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root=path.resolve('public/data-v2');
const errors=[];
const shaRe=/^[0-9a-f]{64}$/;
for (const book of [5,6]) {
  const fp=path.join(root,`audio-inventory-book${book}.json`);
  if (!fs.existsSync(fp)) { errors.push(`missing ${fp}`); continue; }
  const d=JSON.parse(fs.readFileSync(fp,'utf8'));
  const a=d.archiveIntegrity ?? {};
  if (!shaRe.test(a.sha256??'')) errors.push(`book${book}: invalid archive SHA-256`);
  if (!(a.sizeBytes>0)) errors.push(`book${book}: invalid archive size`);
  if (a.extractionChecked!==true) errors.push(`book${book}: archive extraction not checked`);
  if (a.extractedTrackCount!==15) errors.push(`book${book}: extractedTrackCount ${a.extractedTrackCount}/15`);
  if (d.technicalMetadataStatus!=='verified_file_integrity_and_stream_metadata_only') errors.push(`book${book}: technicalMetadataStatus mismatch`);
  if (d.contentVerificationStatus!=='not_listened_or_transcribed') errors.push(`book${book}: content verification must remain unverified`);
  let seconds=0;
  for (const t of d.tracks??[]) {
    const m=t.technicalMetadata ?? {};
    if (t.technicalMetadataChecked!==true) errors.push(`book${book} track${t.trackNumber}: technical metadata unchecked`);
    if (m.codec!=='mp3') errors.push(`book${book} track${t.trackNumber}: codec=${m.codec}`);
    if (!(m.durationSeconds>0)) errors.push(`book${book} track${t.trackNumber}: invalid duration`); else seconds+=m.durationSeconds;
    if (!(m.extractedSizeBytes>0)) errors.push(`book${book} track${t.trackNumber}: invalid size`);
    if (!shaRe.test(m.sha256??'')) errors.push(`book${book} track${t.trackNumber}: invalid SHA-256`);
    if (![1,2].includes(m.channels)) errors.push(`book${book} track${t.trackNumber}: channels=${m.channels}`);
    if (!(m.sampleRateHz>0)) errors.push(`book${book} track${t.trackNumber}: invalid sample rate`);
    if (t.mappingVerified===true || t.contentChecked===true) errors.push(`book${book} track${t.trackNumber}: content/mapping prematurely verified`);
  }
  console.log(`Book ${book}: archive=${a.sizeBytes} bytes, tracks=${d.tracks?.length ?? 0}, duration=${seconds.toFixed(1)}s, SHA-256 metadata=OK, contentVerified=0`);
}
if (errors.length) {
  console.error('ERRORS');
  errors.forEach(x=>console.error('- '+x));
  process.exit(1);
}
console.log('AUDIO INTEGRITY STATUS: OK (file integrity + stream metadata only; spoken-content mapping still unverified)');
