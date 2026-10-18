import fs from 'node:fs'

const data = JSON.parse(fs.readFileSync('public/data-v2/catalog-v2.json', 'utf8'))
const errors = []
const ids = new Set()

if (data.lessons.length !== 76) errors.push(`Catalog ${data.lessons.length}/76`)
const counts = {
  core_structured: data.lessons.filter((x) => x.sourceStatus === 'core_structured').length,
  partial_source: data.lessons.filter((x) => x.sourceStatus === 'partial_source').length,
  missing_source: data.lessons.filter((x) => x.sourceStatus === 'missing_source').length,
}
if (counts.core_structured !== 58) errors.push(`Core ${counts.core_structured}/58`)
if (counts.partial_source !== 6) errors.push(`Partial ${counts.partial_source}/6`)
if (counts.missing_source !== 12) errors.push(`Missing ${counts.missing_source}/12`)
for (const item of data.lessons) {
  if (ids.has(item.id)) errors.push(`Duplicate ${item.id}`)
  ids.add(item.id)
  if (!item.titleZh?.trim()) errors.push(`Missing title ${item.id}`)
}

console.log(`Catalog: ${data.lessons.length}; core=${counts.core_structured}; partial=${counts.partial_source}; missing=${counts.missing_source}`)
if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log('CATALOG STATUS: OK')
