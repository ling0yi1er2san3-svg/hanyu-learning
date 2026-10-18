$ErrorActionPreference = "Stop"
$Owner = "ling0yi1er2san3-svg"
$Repo = "hanyu-learning"
$RepoFull = "$Owner/$Repo"
$RepoHttps = "https://github.com/$Owner/$Repo.git"
$RepoPage = "https://github.com/$Owner/$Repo"
$ActionsPage = "https://github.com/$Owner/$Repo/actions"
$SettingsPages = "https://github.com/$Owner/$Repo/settings/pages"
$PagesUrl = "https://$Owner.github.io/$Repo/"

function Fail($Message, $Code=1) { Write-Host ""; Write-Host "[FAIL] $Message" -ForegroundColor Red; exit $Code }
function Info($Message) { Write-Host "[INFO] $Message" -ForegroundColor Cyan }
function Ok($Message) { Write-Host "[ OK ] $Message" -ForegroundColor Green }

$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot
if (-not (Test-Path "package.json")) { Fail "package.json not found. Run this file inside the extracted Hanyu project." }
if (-not (Test-Path ".github\workflows\deploy.yml")) { Fail ".github/workflows/deploy.yml is missing." }
if (-not (Get-Command git -ErrorAction SilentlyContinue)) { Fail "Git is not installed or not in PATH. Install Git for Windows, then run PUSH_TO_GITHUB.bat again." 10 }

Info "Target repository: $RepoFull"
if (Get-Command node -ErrorAction SilentlyContinue) {
  Info "Running Hanyu release validation before Git push..."
  & node "scripts/release-check.mjs"; if ($LASTEXITCODE -ne 0) { Fail "Release data validation failed. Nothing was pushed." 20 }
  & node "scripts/verify-pwa.mjs"; if ($LASTEXITCODE -ne 0) { Fail "PWA/Vite validation failed. Nothing was pushed." 21 }
  Ok "Release validation passed."
} else {
  Write-Host "[WARN] Node.js is not installed. Local validation skipped; GitHub Actions will validate before deploy." -ForegroundColor Yellow
}

if (-not (Test-Path ".git")) { Info "Initializing Git repository..."; & git init; if ($LASTEXITCODE -ne 0) { Fail "git init failed." 30 } }
& git branch -M main; if ($LASTEXITCODE -ne 0) { Fail "Could not switch/create main branch." 31 }

$origin = ""; try { $origin = (& git remote get-url origin 2>$null).Trim() } catch {}
if ([string]::IsNullOrWhiteSpace($origin)) {
  & git remote add origin $RepoHttps; if ($LASTEXITCODE -ne 0) { Fail "Could not add origin." 32 }; Ok "origin -> $RepoHttps"
} elseif ($origin -ne $RepoHttps) {
  Write-Host ""; Write-Host "[STOP] Existing origin is different:" -ForegroundColor Yellow; Write-Host "       $origin"; Write-Host "Expected:"; Write-Host "       $RepoHttps"; Write-Host ""
  Fail "Refusing to push to a different repository. This protects your other GitHub projects." 33
}

$HasGh = [bool](Get-Command gh -ErrorAction SilentlyContinue)
$GhAuthed = $false
if ($HasGh) { & gh auth status *> $null; if ($LASTEXITCODE -eq 0) { $GhAuthed = $true } }

Info "Checking GitHub repository..."
& git ls-remote $RepoHttps HEAD *> $null
$RemoteExists = ($LASTEXITCODE -eq 0)
if (-not $RemoteExists) {
  if ($GhAuthed) {
    Info "Repository is missing or inaccessible. Attempting to create $RepoFull as a PUBLIC repository..."
    & gh repo create $RepoFull --public --description "Hanyu Learning V2 PWA" 2>&1
    if ($LASTEXITCODE -ne 0) { Fail "Could not create repository automatically. Check GitHub CLI authentication/permissions." 40 }
    Ok "Repository created: $RepoPage"
    & git remote set-url origin $RepoHttps
  } else {
    Write-Host ""; Write-Host "The repository does not currently appear to exist, and GitHub CLI is not authenticated." -ForegroundColor Yellow
    Write-Host "Create this repository in GitHub first:"; Write-Host "  $RepoPage"; Write-Host ""
    Write-Host "Repository name: hanyu-learning"; Write-Host "Visibility: Public"; Write-Host "Do NOT initialize it with README/.gitignore/license."; Write-Host ""
    Start-Process "https://github.com/new?name=hanyu-learning&visibility=public" -ErrorAction SilentlyContinue
    Fail "After creating the empty repository, run PUSH_TO_GITHUB.bat again." 41
  }
} else { Ok "Repository is reachable." }

Info "Staging project files..."
& git add -A; if ($LASTEXITCODE -ne 0) { Fail "git add failed." 50 }
$changes = (& git status --porcelain)
if ($changes) {
  $stamp = Get-Date -Format "yyyy-MM-dd HH:mm"
  & git commit -m "Hanyu Learning V2 release-ready deploy $stamp"
  if ($LASTEXITCODE -ne 0) {
    Write-Host ""; Write-Host "[STOP] Git could not create the commit." -ForegroundColor Yellow
    Write-Host "If Git asks for your identity, run these two commands once:"; Write-Host '  git config --global user.name "Your Name"'; Write-Host '  git config --global user.email "your-email@example.com"'
    Fail "Commit failed; nothing was pushed." 51
  }
  Ok "New commit created."
} else { Info "No local file changes to commit." }

Info "Pushing main branch..."
& git push -u origin main
if ($LASTEXITCODE -ne 0) { Write-Host ""; Write-Host "If a browser/login window appears, finish GitHub authentication and run this BAT again." -ForegroundColor Yellow; Fail "git push failed." 60 }
Ok "Push completed."

if ($GhAuthed) {
  Info "Configuring GitHub Pages for workflow deployment..."
  & gh api --method POST "repos/$RepoFull/pages" -f build_type="workflow" *> $null
  if ($LASTEXITCODE -ne 0) { & gh api --method PUT "repos/$RepoFull/pages" -f build_type="workflow" *> $null }
  if ($LASTEXITCODE -eq 0) { Ok "GitHub Pages configured for GitHub Actions." } else { Write-Host "[WARN] Could not set Pages automatically. Open Settings > Pages and select GitHub Actions." -ForegroundColor Yellow; Start-Process $SettingsPages -ErrorAction SilentlyContinue }
  Info "Looking for the deploy workflow run..."; Start-Sleep -Seconds 4
  $runId = ""; try { $runId = (& gh run list --repo $RepoFull --workflow "deploy.yml" --limit 1 --json databaseId --jq '.[0].databaseId' 2>$null).Trim() } catch {}
  if ($runId) {
    Info "Watching GitHub Actions run #$runId..."; & gh run watch $runId --repo $RepoFull --exit-status
    if ($LASTEXITCODE -eq 0) { Ok "GitHub Actions deployment succeeded."; Write-Host ""; Write-Host "SITE: $PagesUrl" -ForegroundColor Green; Start-Process $PagesUrl -ErrorAction SilentlyContinue; exit 0 }
    else { Write-Host "[WARN] GitHub Actions run did not finish successfully." -ForegroundColor Yellow; Start-Process $ActionsPage -ErrorAction SilentlyContinue; exit 70 }
  }
}

Write-Host ""; Ok "Source was pushed to GitHub."
Write-Host "GitHub Actions: $ActionsPage"; Write-Host "Pages settings:  $SettingsPages"; Write-Host "Expected site:   $PagesUrl"; Write-Host ""
Write-Host "If Pages Source is not already GitHub Actions:"; Write-Host "Settings -> Pages -> Build and deployment -> Source -> GitHub Actions"
Start-Process $ActionsPage -ErrorAction SilentlyContinue
exit 0
