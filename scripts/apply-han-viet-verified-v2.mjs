import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('public/data-v2');
const hv = JSON.parse(fs.readFileSync(path.join(root, 'han-viet-char-verified.json'), 'utf8'));
const readings = hv.readings;
const sourceId = hv.sourceId;
const han = /[\u3400-\u9fff\uf900-\ufaff]/u;
const managedStatuses = new Set(['verified_external_character', 'composed_from_verified_characters']);

const hanChars = (s='') => [...s].filter(ch => han.test(ch));
const compose = (s='') => {
  const chars = hanChars(s);
  if (!chars.length) return null;
  const out = [];
  for (const ch of chars) {
    if (!readings[ch]) return null;
    out.push(readings[ch]);
  }
  return out.join(' ');
};

function clearManagedEntry(e) {
  if (managedStatuses.has(e.hanVietStatus) || e.hanVietSource === sourceId) {
    e.hanViet = null;
    e.hanVietStatus = 'pending';
    delete e.hanVietSource;
  }
}

function applyEntry(e) {
  clearManagedEntry(e);
  const v = compose(e.hanzi ?? '');
  if (!v) return false;
  e.hanViet = v;
  e.hanVietStatus = hanChars(e.hanzi ?? '').length === 1
    ? 'verified_external_character'
    : 'composed_from_verified_characters';
  e.hanVietSource = sourceId;
  return true;
}

let lessonsTouched = 0;
let vocabApplied = 0;
for (let b = 1; b <= 6; b++) {
  const dir = path.join(root, `book${b}`);
  if (!fs.existsSync(dir)) continue;
  for (const name of fs.readdirSync(dir).filter(x => /^lesson\d+\.json$/.test(x))) {
    const fp = path.join(dir, name);
    const d = JSON.parse(fs.readFileSync(fp, 'utf8'));
    let lessonApplied = 0;
    for (const e of d.vocabulary ?? []) {
      if (applyEntry(e)) { lessonApplied++; vocabApplied++; }
    }
    d.verification = d.verification ?? {};
    d.verification.hanVietVerifiedSubsetApplied = lessonApplied > 0;
    d.verification.hanVietSource = lessonApplied > 0 ? sourceId : null;
    fs.writeFileSync(fp, JSON.stringify(d, null, 2) + '\n');
    if (lessonApplied > 0) lessonsTouched++;
  }
}

for (const name of ['vocabulary-index.json', 'vocabulary-search-index.json']) {
  const fp = path.join(root, name);
  const d = JSON.parse(fs.readFileSync(fp, 'utf8'));
  let n = 0;
  for (const e of d.entries ?? []) if (applyEntry(e)) n++;
  d.hanVietCoverage = {
    verifiedOrComposed: n,
    total: d.entries?.length ?? 0,
    source: sourceId,
    note: 'Only items fully composable from the verified character subset are populated.'
  };
  fs.writeFileSync(fp, JSON.stringify(d, null, 2) + '\n');
}

console.log(`Applied verified Hán-Việt subset to ${vocabApplied} lesson-vocabulary occurrences across ${lessonsTouched} lesson files.`);
