import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root=path.resolve('.');
const data=path.join(root,'public','data-v2');
const errors=[];
const sha=(fp)=>crypto.createHash('sha256').update(fs.readFileSync(fp)).digest('hex');
const publicFile=(src)=>path.join(root,'public',String(src||'').replace(/^\//,''));
let mapped=0, sourceOnly=0;
for (const book of [1,2,3,4,5,6]) {
  const ip=path.join(data,`audio-inventory-book${book}.json`);
  if(!fs.existsSync(ip)){errors.push(`book${book}: missing inventory`);continue;}
  const inv=JSON.parse(fs.readFileSync(ip,'utf8'));
  if(book<=4){
    for(const t of inv.tracks??[]){
      if(!t.src) continue;
      const fp=publicFile(t.src);
      if(!fs.existsSync(fp)){errors.push(`book${book} ${t.trackId}: missing ${t.src}`);continue;}
      const actual=sha(fp);
      if(actual!==String(t.webSha256||'').toLowerCase()) errors.push(`book${book} ${t.trackId}: web SHA mismatch`);
      if(t.lesson!=null){
        const lp=path.join(data,`book${book}`,`lesson${String(t.lesson).padStart(2,'0')}.json`);
        if(fs.existsSync(lp)){
          const lesson=JSON.parse(fs.readFileSync(lp,'utf8'));
          const found=(lesson.audio?.tracks??[]).find(x=>x.mappingVerified===true && x.src===t.src);
          if(!found) errors.push(`book${book} lesson${t.lesson}: missing verified JSON mapping for ${t.src}`);
          else if(String(found.sha256||'').toLowerCase()!==actual) errors.push(`book${book} lesson${t.lesson}: JSON SHA mismatch`);
          else mapped++;
        }
      }
    }
  }else{
    for(const t of inv.tracks??[]){
      const fp=path.join(root,'public','audio','source',`book${book}`,`track${String(t.trackNumber).padStart(2,'0')}.mp3`);
      if(!fs.existsSync(fp)){errors.push(`book${book} track${t.trackNumber}: bundled source missing`);continue;}
      const actual=sha(fp), expected=String(t.technicalMetadata?.sha256||'').toLowerCase();
      if(actual!==expected) errors.push(`book${book} track${t.trackNumber}: bundled source SHA mismatch`);
      else sourceOnly++;
    }
  }
}
if(errors.length){console.error('ORIGINAL AUDIO VALIDATION: FAIL');errors.forEach(e=>console.error('- '+e));process.exit(1)}
console.log(`ORIGINAL AUDIO VALIDATION: PASS (verified lesson mappings Q1-Q4=${mapped}; bundled Q5-Q6 source tracks=${sourceOnly})`);
