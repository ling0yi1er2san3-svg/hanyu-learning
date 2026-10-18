#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const cwd = process.cwd()
const issues = []
const notes = []
const viteCandidates = ['vite.config.ts','vite.config.js','vite.config.mjs'].map(x => path.join(cwd,x))
const vite = viteCandidates.find(fs.existsSync)
if (!vite) {
  issues.push('Không tìm thấy vite.config.*')
} else {
  const t = fs.readFileSync(vite, 'utf8')
  notes.push(`Vite config: ${path.relative(cwd, vite)}`)
  if (!/VitePWA\s*\(/.test(t)) issues.push('vite.config chưa cấu hình VitePWA().')
  if (!/manifest\s*:\s*\{/.test(t)) issues.push('VitePWA chưa có inline manifest.')
  for (const field of ['name','short_name','display','start_url','scope']) {
    if (!new RegExp(`\\b${field}\\s*:`).test(t)) issues.push(`Inline manifest thiếu ${field}.`)
  }
  if (!/navigateFallback\s*:\s*['"]index\.html['"]/.test(t)) issues.push('Workbox thiếu navigateFallback=index.html.')
  if (!/runtimeCaching\s*:/.test(t) || !/mp3\|m4a\|wav\|ogg/i.test(t)) notes.push('Chưa xác nhận rõ runtime cache cho audio.')
  if (!/\bbase\s*:/.test(t)) notes.push('vite.config không ghi base; workflow sẽ truyền --base khi build GitHub Pages.')

  const iconRefs = [...t.matchAll(/src\s*:\s*['"]([^'"]*icon[^'"]*\.png)['"]/g)].map(m => m[1])
  if (iconRefs.length < 2) issues.push('Inline manifest cần icon PWA 192/512.')
  for (const src of iconRefs) {
    const clean = src.replace(/^\.?\//,'').replace(/^public\//,'')
    const p = path.join(cwd, 'public', clean)
    if (!fs.existsSync(p)) issues.push(`Icon không tồn tại: public/${clean}`)
  }
}

const pkgPath = path.join(cwd, 'package.json')
if (!fs.existsSync(pkgPath)) issues.push('Thiếu package.json.')
else {
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath,'utf8'))
    if (!pkg.scripts?.build) issues.push('package.json thiếu scripts.build.')
    if (!pkg.devDependencies?.['vite-plugin-pwa']) issues.push('Thiếu vite-plugin-pwa trong devDependencies.')
  } catch (e) { issues.push(`package.json lỗi: ${e.message}`) }
}

console.log('\n=== HANYU PWA / VITE CHECK ===')
notes.forEach(x => console.log('NOTE:', x))
issues.forEach(x => console.log('FAIL:', x))
if (issues.length) process.exit(1)
console.log('PASS: vite-plugin-pwa inline manifest, icons và cấu trúc build hợp lệ.')
