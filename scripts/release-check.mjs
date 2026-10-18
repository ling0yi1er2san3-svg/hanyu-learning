#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const cwd = process.cwd()
const validators = [
  ['Data/catalog', 'scripts/validate-data-v2.mjs'],
  ['Core content', 'scripts/validate-content-v2.mjs'],
  ['Pinyin coverage', 'scripts/validate-pinyin-v2.mjs'],
  ['Vietnamese translation', 'scripts/validate-translation-v2.mjs'],
  ['Audio inventory policy', 'scripts/validate-audio-inventory-v2.mjs'],
  ['Audio technical integrity', 'scripts/validate-audio-integrity-v2.mjs'],
  ['Original audio Q1-Q6', 'scripts/validate-original-audio-all.mjs'],
  ['Hán-Việt verified subset', 'scripts/validate-han-viet-v2.mjs'],
]

const failures = []
console.log('\n=== HANYU LEARNING V2 RELEASE CHECK ===')
console.log('Canonical data root: public/data-v2')
console.log('Policy: public/data is legacy/fallback and is NOT double-counted.')
console.log('Policy: pending Hán-Việt/audio are valid; verified audio requires SHA-256 evidence. Q1-Q4 may be verified by exact PDF embedded filenames; Q5-Q6 still require user listening confirmation.')

for (const [label, rel] of validators) {
  const file = path.join(cwd, rel)
  if (!fs.existsSync(file)) {
    failures.push(`${label}: missing ${rel}`)
    console.error(`FAIL ${label}: missing ${rel}`)
    continue
  }
  const r = spawnSync(process.execPath, [file], { cwd, encoding: 'utf8' })
  const out = `${r.stdout || ''}${r.stderr || ''}`.trim()
  if (out) console.log(`\n--- ${label} ---\n${out}`)
  if (r.status !== 0) failures.push(`${label}: validator exit ${r.status ?? 'unknown'}`)
}

// Independent release invariants so an accidental validator edit cannot silently empty the project.
try {
  const root = path.join(cwd, 'public/data-v2')
  const catalog = JSON.parse(fs.readFileSync(path.join(root, 'catalog-v2.json'), 'utf8'))
  const vocab = JSON.parse(fs.readFileSync(path.join(root, 'vocabulary-index.json'), 'utf8'))
  const search = JSON.parse(fs.readFileSync(path.join(root, 'vocabulary-search-index.json'), 'utf8'))
  const core = (catalog.lessons || []).filter(x => x.sourceStatus === 'core_structured')
  const partial = (catalog.lessons || []).filter(x => x.sourceStatus === 'partial_source')
  const missing = (catalog.lessons || []).filter(x => x.sourceStatus === 'missing_source')
  const expectations = [
    [catalog.lessons?.length === 76, `catalog=${catalog.lessons?.length}/76`],
    [core.length === 58, `core=${core.length}/58`],
    [partial.length === 6, `partial=${partial.length}/6`],
    [missing.length === 12, `missing=${missing.length}/12`],
    [vocab.entries?.length === 1942, `vocab=${vocab.entries?.length}/1942`],
    [search.entries?.length === 1942, `search=${search.entries?.length}/1942`],
  ]
  console.log('\n--- Independent release invariants ---')
  for (const [ok, text] of expectations) {
    console.log(`${ok ? 'PASS' : 'FAIL'} ${text}`)
    if (!ok) failures.push(text)
  }
} catch (e) {
  failures.push(`independent invariants: ${e.message}`)
}

if (failures.length) {
  console.error(`\nRELEASE CHECK: FAILED (${failures.length})`)
  failures.forEach(x => console.error(`- ${x}`))
  process.exit(1)
}
console.log('\nRELEASE CHECK: PASS')
