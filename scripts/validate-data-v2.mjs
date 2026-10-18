import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve('public/data-v2')
const catalog = JSON.parse(fs.readFileSync(path.join(ROOT, 'catalog-v2.json'), 'utf8'))
const index = JSON.parse(fs.readFileSync(path.join(ROOT, 'vocabulary-index.json'), 'utf8'))
const search = JSON.parse(fs.readFileSync(path.join(ROOT, 'vocabulary-search-index.json'), 'utf8'))
const expectedBookWords = { 1: 211, 2: 217, 3: 269, 4: 320, 5: 390, 6: 535 }
const errors = []

if (catalog.lessons.length !== 76) errors.push(`Catalog ${catalog.lessons.length}/76`)
const core = catalog.lessons.filter((x) => x.sourceStatus === 'core_structured')
const partial = catalog.lessons.filter((x) => x.sourceStatus === 'partial_source')
const missing = catalog.lessons.filter((x) => x.sourceStatus === 'missing_source')
if (core.length !== 58) errors.push(`Core ${core.length}/58`)
if (partial.length !== 6) errors.push(`Partial ${partial.length}/6`)
if (missing.length !== 12) errors.push(`Missing ${missing.length}/12`)
if (index.status === 'not_generated') errors.push('vocabulary-index.json chưa được phát sinh vật lý')
if (index.entries.length !== 1942 || index.count !== 1942) errors.push(`Vocabulary ${index.entries.length}/1942`)
if (search.entries.length !== 1942 || search.count !== 1942) errors.push(`Search index ${search.entries.length}/1942`)

const ids = new Set()
for (const word of index.entries) {
  if (!word.id) errors.push('Vocabulary thiếu ID')
  else if (ids.has(word.id)) errors.push(`Duplicate ID ${word.id}`)
  else ids.add(word.id)
  if (!word.hanzi?.trim()) errors.push(`${word.id}: thiếu Hanzi`)
  if (!word.pinyin?.trim()) errors.push(`${word.id}: thiếu Pinyin`)
  if (!word.sourceVerified) errors.push(`${word.id}: sourceVerified != true`)
}
for (const [book, expected] of Object.entries(expectedBookWords)) {
  const actual = index.entries.filter((x) => x.book === Number(book)).length
  if (actual !== expected) errors.push(`Book ${book}: ${actual}/${expected}`)
}
for (const item of core) {
  const file = path.join(ROOT, `book${item.book}`, `lesson${String(item.lesson).padStart(2,'0')}.json`)
  if (!fs.existsSync(file)) errors.push(`Thiếu lesson JSON: ${item.id}`)
}

console.log(`Catalog=${catalog.lessons.length}; core=${core.length}; partial=${partial.length}; missing=${missing.length}`)
console.log(`Vocabulary=${index.entries.length}; Search=${search.entries.length}`)
if (errors.length) {
  console.error('\nDATA STATUS: FAILED')
  for (const error of errors.slice(0, 200)) console.error(`- ${error}`)
  process.exit(1)
}
console.log('\nDATA STATUS: OK')
