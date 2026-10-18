param()

$ErrorActionPreference = "Stop"

function Write-Info($Text) { Write-Host "[INFO] $Text" -ForegroundColor Cyan }
function Write-Ok($Text) { Write-Host "[ OK ] $Text" -ForegroundColor Green }
function Write-Warn($Text) { Write-Host "[WARN] $Text" -ForegroundColor Yellow }
function Fail($Text, $Code = 1) {
  Write-Host ""
  Write-Host "[FAIL] $Text" -ForegroundColor Red
  exit $Code
}
function Read-JsonUtf8([string]$Path) {
  $utf8 = New-Object System.Text.UTF8Encoding($false)
  $text = [System.IO.File]::ReadAllText($Path, $utf8)
  return ($text | ConvertFrom-Json)
}
function Write-Utf8NoBom([string]$Path, [string]$Text) {
  $utf8 = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Text, $utf8)
}
function Save-Json($Object, [string]$Path) {
  $json = $Object | ConvertTo-Json -Depth 100
  Write-Utf8NoBom $Path $json
}
function Set-Prop($Object, [string]$Name, $Value) {
  if ($null -eq $Object.PSObject.Properties[$Name]) {
    $Object | Add-Member -NotePropertyName $Name -NotePropertyValue $Value
  } else {
    $Object.$Name = $Value
  }
}
function Resolve-PublicSrc([string]$ProjectRoot, [string]$Src) {
  if (-not $Src) { return $null }
  $clean = $Src.Replace('/', '\').TrimStart('\')
  return Join-Path (Join-Path $ProjectRoot 'public') $clean
}

$ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$TemplateRoot = Join-Path $PSScriptRoot 'pristine-q5-q6'

if (-not (Test-Path -LiteralPath (Join-Path $ProjectRoot 'public\data-v2'))) {
  Fail 'Khong tim thay public\data-v2. Hay chep patch vao thu muc goc hanyu-learning-v2-github-ready.' 41
}
if (-not (Test-Path -LiteralPath $TemplateRoot)) {
  Fail 'Thieu pristine-q5-q6 trong patch.' 42
}

Write-Info 'Kiem tra va khoi phuc JSON Q5-Q6 da bi loi ma hoa boi mapper cu...'
$repaired = 0
$preserved = 0

foreach ($book in @(5,6)) {
  $bookTemplate = Join-Path $TemplateRoot ("book{0}" -f $book)
  $templates = @(Get-ChildItem -LiteralPath $bookTemplate -File -Filter 'lesson*.json' | Sort-Object Name)
  foreach ($tplFile in $templates) {
    $destDir = Join-Path $ProjectRoot ("public\data-v2\book{0}" -f $book)
    if (-not (Test-Path -LiteralPath $destDir)) { New-Item -ItemType Directory -Force -Path $destDir | Out-Null }
    $destFile = Join-Path $destDir $tplFile.Name

    $clean = Read-JsonUtf8 $tplFile.FullName
    $verifiedTracks = @()

    if (Test-Path -LiteralPath $destFile) {
      try {
        $old = Read-JsonUtf8 $destFile
        foreach ($t in @($old.audio.tracks)) {
          if ($null -eq $t) { continue }
          if ($t.mappingVerified -ne $true) { continue }
          if ([string]$t.verificationMethod -ne 'user_listen_confirmed') { continue }
          if (-not $t.src -or -not $t.sha256) { continue }

          $audioFile = Resolve-PublicSrc $ProjectRoot ([string]$t.src)
          if (-not $audioFile -or -not (Test-Path -LiteralPath $audioFile)) {
            Write-Warn ("Bo qua mapping cu vi thieu file audio: {0}" -f $t.src)
            continue
          }
          $actual = (Get-FileHash -LiteralPath $audioFile -Algorithm SHA256).Hash.ToLowerInvariant()
          $expected = ([string]$t.sha256).ToLowerInvariant()
          if ($actual -ne $expected) {
            Write-Warn ("Bo qua mapping cu vi SHA-256 khong khop: {0}" -f $t.src)
            continue
          }
          $verifiedTracks += $t
        }
      } catch {
        Write-Warn ("Khong doc duoc ban cu {0}; se khoi phuc tu ban chuan." -f $tplFile.Name)
      }
    }

    if ($null -eq $clean.audio) {
      Set-Prop $clean 'audio' ([pscustomobject]@{ tracks=@(); mappingVerified=$false; candidateTracks=@() })
    }
    if ($null -eq $clean.audio.tracks) { Set-Prop $clean.audio 'tracks' @() }
    if ($null -eq $clean.audio.candidateTracks) { Set-Prop $clean.audio 'candidateTracks' @() }

    if ($verifiedTracks.Count -gt 0) {
      $clean.audio.tracks = @($clean.audio.tracks) + @($verifiedTracks)
      $clean.audio.mappingVerified = $true
      foreach ($vt in $verifiedTracks) {
        foreach ($cand in @($clean.audio.candidateTracks)) {
          if (($null -ne $cand.trackNumber) -and ([int]$cand.trackNumber -eq [int]$vt.trackNumber)) {
            Set-Prop $cand 'mappingVerified' $true
            Set-Prop $cand 'mappingBasis' 'user_listen_confirmed'
            Set-Prop $cand 'contentChecked' $true
          }
        }
      }
      if ($clean.verification) { Set-Prop $clean.verification 'audioVerified' $true }
      $preserved += $verifiedTracks.Count
    }

    Save-Json $clean $destFile
    $repaired += 1
  }
}

Write-Ok ("Da khoi phuc {0} lesson JSON Q5-Q6; giu lai {1} mapping audio da xac nhan co SHA hop le." -f $repaired,$preserved)
exit 0
