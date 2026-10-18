param([string]$Base = './')
$ErrorActionPreference = "Stop"
Write-Host "=== HANYU RELEASE BUILD v4 ===" -ForegroundColor Cyan
if (-not (Test-Path package.json)) { throw "Hãy chạy script tại thư mục gốc project (phải có package.json)." }
if (Test-Path package-lock.json) {
  Write-Host "[1/6] npm ci" -ForegroundColor Yellow
  npm ci
} else {
  Write-Host "[1/6] npm install (không có package-lock.json)" -ForegroundColor Yellow
  npm install
}
Write-Host "[2/6] data integrity" -ForegroundColor Yellow
node scripts/release-check.mjs --strict
Write-Host "[3/6] PWA/Vite" -ForegroundColor Yellow
node scripts/verify-pwa.mjs
Write-Host "[4/6] npm audit production" -ForegroundColor Yellow
npm audit --omit=dev --audit-level=high
Write-Host "[5/6] production build (base=$Base)" -ForegroundColor Yellow
npm run build -- --base "$Base"
Write-Host "[6/6] dist integrity" -ForegroundColor Yellow
node scripts/dist-check.mjs
if (-not (Test-Path dist/index.html)) { throw "Build không tạo dist/index.html" }
Write-Host "PASS - release local đã vượt qua toàn bộ kiểm tra." -ForegroundColor Green
