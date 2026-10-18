import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('public/data-v2');
const mapPath = path.join(root, 'han-viet-char-verified.json');
const sourcesPath = path.join(root, 'han-viet-sources.json');
const mainPath = path.join(root, 'vocabulary-index.json');
const searchPath = path.join(root, 'vocabulary-search-index.json');

const fail = (msg) => { console.error(`ERROR: ${msg}`); process.exitCode = 1; };
const read = fp => JSON.parse(fs.readFileSync(fp, 'utf8'));

for (const fp of [mapPath, sourcesPath, mainPath, searchPath]) {
  if (!fs.existsSync(fp)) fail(`Missing ${path.relative(process.cwd(), fp)}`);
}
if (process.exitCode) process.exit();

const hv = read(mapPath);
const sources = read(sourcesPath);
const main = read(mainPath);
const search = read(searchPath);
const sourceId = hv.sourceId;
const source = (sources.sources ?? []).find(s => s.id === sourceId);
if (!source) fail(`Source ${sourceId} is not declared in han-viet-sources.json`);
if (!source?.license) fail(`Source ${sourceId} has no license metadata`);

const readings = hv.readings ?? {};
const han = /[\u3400-\u9fff\uf900-\ufaff]/u;
const allowed = new Set(['verified_external_character', 'composed_from_verified_characters']);
const hanChars = (s='') => [...s].filter(ch => han.test(ch));
const compose = (s='') => {
  const chars = hanChars(s);
  if (!chars.length || chars.some(ch => !readings[ch])) return null;
  return chars.map(ch => readings[ch]).join(' ');
};

let verified = 0;
let pending = 0;
const mainById = new Map();
for (const e of main.entries ?? []) {
  if (!e.id) { fail('Vocabulary index entry missing id'); continue; }
  if (mainById.has(e.id)) fail(`Duplicate vocabulary ID ${e.id}`);
  mainById.set(e.id, e);
  const expected = compose(e.hanzi ?? '');
  if (expected) {
    verified++;
    if (e.hanViet !== expected) fail(`${e.id} ${e.hanzi}: expected Hán-Việt '${expected}', got '${e.hanViet}'`);
    const expectedStatus = hanChars(e.hanzi ?? '').length === 1 ? 'verified_external_character' : 'composed_from_verified_characters';
    if (e.hanVietStatus !== expectedStatus) fail(`${e.id}: expected status ${expectedStatus}, got ${e.hanVietStatus}`);
    if (e.hanVietSource !== sourceId) fail(`${e.id}: expected source ${sourceId}, got ${e.hanVietSource}`);
  } else {
    pending++;
    if (e.hanViet != null && e.hanViet !== '') fail(`${e.id} ${e.hanzi}: Hán-Việt populated without a fully verified character composition`);
    if (allowed.has(e.hanVietStatus)) fail(`${e.id}: managed verified status present without a valid composition`);
    if (e.hanVietSource === sourceId) fail(`${e.id}: source ${sourceId} present while Hán-Việt is not composable`);
  }
}

if ((main.hanVietCoverage?.verifiedOrComposed ?? -1) !== verified) fail(`Main coverage metadata ${main.hanVietCoverage?.verifiedOrComposed} != actual ${verified}`);
if ((main.hanVietCoverage?.total ?? -1) !== (main.entries?.length ?? 0)) fail('Main coverage total does not match vocabulary total');
if (main.hanVietCoverage?.source !== sourceId) fail('Main coverage source mismatch');

const searchById = new Map((search.entries ?? []).map(e => [e.id, e]));
if (searchById.size !== (search.entries?.length ?? 0)) fail('Duplicate IDs in search index');
if (searchById.size !== mainById.size) fail(`Search index size ${searchById.size} != main index size ${mainById.size}`);
for (const [id, e] of mainById) {
  const s = searchById.get(id);
  if (!s) { fail(`Missing ${id} in search index`); continue; }
  for (const key of ['hanzi','hanViet','hanVietStatus','hanVietSource']) {
    if ((s[key] ?? null) !== (e[key] ?? null)) fail(`${id}: search/main mismatch in ${key}`);
  }
}
if ((search.hanVietCoverage?.verifiedOrComposed ?? -1) !== verified) fail(`Search coverage metadata ${search.hanVietCoverage?.verifiedOrComposed} != actual ${verified}`);
if ((search.hanVietCoverage?.source ?? null) !== sourceId) fail('Search coverage source mismatch');

let lessonCount = 0;
let lessonVerified = 0;
for (let b=1;b<=6;b++) {
  const dir=path.join(root,`book${b}`);
  if (!fs.existsSync(dir)) continue;
  for (const name of fs.readdirSync(dir).filter(n => /^lesson\d+\.json$/.test(n))) {
    const d=read(path.join(dir,name));
    lessonCount++;
    for (const e of d.vocabulary ?? []) {
      const idx=mainById.get(e.id);
      if (!idx) { fail(`${name}: vocabulary ID ${e.id} missing from main index`); continue; }
      for (const key of ['hanzi','hanViet','hanVietStatus','hanVietSource']) {
        if ((e[key] ?? null) !== (idx[key] ?? null)) fail(`${name} ${e.id}: lesson/main mismatch in ${key}`);
      }
      if (e.hanViet) lessonVerified++;
    }
  }
}
if (lessonVerified !== verified) fail(`Lesson verified occurrence count ${lessonVerified} != index verified count ${verified}`);

console.log(`Hán-Việt source=${sourceId}`);
console.log(`Verified character readings=${Object.keys(readings).length}`);
console.log(`Vocabulary Hán-Việt verified/composed=${verified}/${main.entries?.length ?? 0}`);
console.log(`Pending=${pending}`);
console.log(`Lesson files checked=${lessonCount}`);
if (!process.exitCode) console.log('HAN-VIET STATUS: OK (verified external subset only)');
