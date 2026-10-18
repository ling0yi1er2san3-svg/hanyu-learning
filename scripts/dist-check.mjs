#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
const cwd = process.cwd();
const dist = path.join(cwd, 'dist');
const issues = []; const notes = [];
if (!fs.existsSync(dist)) issues.push('Không có thư mục dist/.');
const index = path.join(dist, 'index.html');
if (!fs.existsSync(index)) issues.push('Không có dist/index.html.');
if (!issues.length) {
  const html = fs.readFileSync(index, 'utf8');
  if (/https?:\/\/localhost(?::\d+)?/i.test(html)) issues.push('dist/index.html còn tham chiếu localhost.');
  if (/\/(?:src|public)\//i.test(html)) issues.push('dist/index.html còn tham chiếu trực tiếp /src/ hoặc /public/.');
  const refs = [...html.matchAll(/(?:src|href)=["']([^"'#?]+)(?:[?#][^"']*)?["']/gi)].map((m) => m[1]);
  const local = refs.filter((r) => !/^(?:https?:|data:|blob:|mailto:|tel:|#)/i.test(r));
  for (const r of local) {
    const clean = decodeURIComponent(r);
    let candidate;
    if (clean.startsWith('/')) {
      const parts = clean.replace(/^\/+/, '').split('/');
      // GitHub Pages may prefix /<repo>/; try both exact and without first segment.
      const c1 = path.join(dist, ...parts);
      const c2 = parts.length > 1 ? path.join(dist, ...parts.slice(1)) : c1;
      if (!fs.existsSync(c1) && !fs.existsSync(c2)) issues.push(`Asset không tồn tại trong dist: ${r}`);
    } else {
      candidate = path.resolve(dist, clean);
      if (!fs.existsSync(candidate)) issues.push(`Asset không tồn tại trong dist: ${r}`);
    }
  }
  notes.push(`Local refs checked: ${local.length}`);
}
console.log('\n=== DIST CHECK ===');
notes.forEach((x) => console.log('NOTE:', x));
issues.forEach((x) => console.log('FAIL:', x));
if (issues.length) process.exit(1);
console.log('PASS: dist/index.html và các asset tĩnh chính tồn tại.');
