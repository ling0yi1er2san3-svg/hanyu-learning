param(
  [string]$Book5Source = "",
  [string]$Book6Source = ""
)

$ErrorActionPreference = "Stop"

function Write-Info($Text) { Write-Host "[INFO] $Text" -ForegroundColor Cyan }
function Write-Ok($Text) { Write-Host "[ OK ] $Text" -ForegroundColor Green }
function Write-Warn($Text) { Write-Host "[WARN] $Text" -ForegroundColor Yellow }
function Fail($Text, $Code = 1) {
  Write-Host ""
  Write-Host "[FAIL] $Text" -ForegroundColor Red
  exit $Code
}
function Clean-InputPath([string]$Value) {
  if ($null -eq $Value) { return "" }
  return $Value.Trim().Trim('"').Trim("'")
}
function Set-Prop($Object, [string]$Name, $Value) {
  if ($null -eq $Object.PSObject.Properties[$Name]) {
    $Object | Add-Member -NotePropertyName $Name -NotePropertyValue $Value
  } else {
    $Object.$Name = $Value
  }
}
function Write-Utf8NoBom([string]$Path, [string]$Text) {
  $utf8 = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Text, $utf8)
}
function Save-Json($Object, [string]$Path) {
  $json = $Object | ConvertTo-Json -Depth 100
  Write-Utf8NoBom $Path $json
}
function Get-Extractor {
  $candidates = @(
    (Get-Command 7z.exe -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Source -ErrorAction SilentlyContinue),
    "C:\Program Files\7-Zip\7z.exe",
    "C:\Program Files (x86)\7-Zip\7z.exe",
    (Get-Command WinRAR.exe -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Source -ErrorAction SilentlyContinue),
    "C:\Program Files\WinRAR\WinRAR.exe",
    "C:\Program Files (x86)\WinRAR\WinRAR.exe"
  ) | Where-Object { $_ -and (Test-Path -LiteralPath $_) }
  if ($candidates.Count -eq 0) { return $null }
  return $candidates[0]
}
function Resolve-AudioFolder([string]$Source, [int]$Book) {
  $Source = Clean-InputPath $Source
  if (-not $Source) { return $null }
  if (-not (Test-Path -LiteralPath $Source)) { Fail "Không tìm thấy nguồn Quyển $Book: $Source" 11 }

  $item = Get-Item -LiteralPath $Source
  if ($item.PSIsContainer) { return $item.FullName }

  if ($item.Extension.ToLowerInvariant() -ne ".rar") {
    Fail "Nguồn Quyển $Book phải là thư mục MP3 đã giải nén hoặc file .RAR." 12
  }

  $extractor = Get-Extractor
  if (-not $extractor) {
    Write-Host ""
    Write-Warn "Máy chưa có 7-Zip/WinRAR mà script có thể gọi tự động."
    Write-Host "Hãy giải nén RAR bằng phần mềm bạn đang có, rồi chạy lại và kéo THƯ MỤC đã giải nén vào cửa sổ."
    Fail "Không thể tự giải nén RAR." 13
  }

  $temp = Join-Path $env:TEMP "hanyu-original-audio-book$Book"
  if (Test-Path -LiteralPath $temp) { Remove-Item -LiteralPath $temp -Recurse -Force }
  New-Item -ItemType Directory -Path $temp | Out-Null

  Write-Info "Đang giải nén Quyển $Book bằng $([IO.Path]::GetFileName($extractor)) ..."
  if ([IO.Path]::GetFileName($extractor).ToLowerInvariant().StartsWith("7z")) {
    & $extractor x "-o$temp" -y -- $item.FullName | Out-Host
  } else {
    & $extractor x -ibck -y $item.FullName "$temp\" | Out-Host
  }
  if ($LASTEXITCODE -ne 0) { Fail "Giải nén Quyển $Book thất bại." 14 }
  return $temp
}
function Get-PreviewText($Lesson) {
  $text = ""
  if ($Lesson.dialogues -and $Lesson.dialogues.Count -gt 0) {
    $d = $Lesson.dialogues[0]
    if ($d.lines -and $d.lines.Count -gt 0) { $text = [string]$d.lines[0].chinese }
  }
  if (-not $text -and $Lesson.texts -and $Lesson.texts.Count -gt 0) {
    $t = $Lesson.texts[0]
    if ($t.chinese) { $text = [string]$t.chinese }
    elseif ($t.sentences -and $t.sentences.Count -gt 0) { $text = [string]$t.sentences[0].chinese }
  }
  $text = ($text -replace "\s+", " ").Trim()
  if ($text.Length -gt 120) { return $text.Substring(0,120) + "…" }
  return $text
}
function Read-Choice([string]$Prompt) {
  while ($true) {
    $v = (Read-Host $Prompt).Trim().ToUpperInvariant()
    if ($v -in @("Y","N","S","R","Q")) { return $v }
    Write-Warn "Chỉ nhập Y, N, S, R hoặc Q."
  }
}

$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
Set-Location $ProjectRoot

if (-not (Test-Path "public\data-v2\audio-inventory-book5.json")) { Fail "Không đúng thư mục Hanyu Learning V2 (thiếu audio inventory)." 20 }
if (-not (Test-Path "public\data-v2\audio-inventory-book6.json")) { Fail "Không đúng thư mục Hanyu Learning V2 (thiếu audio inventory)." 21 }

Write-Host "============================================================" -ForegroundColor DarkCyan
Write-Host " HANYU LEARNING V2 - MAP AUDIO GỐC Q5/Q6" -ForegroundColor White
Write-Host " Chỉ xác minh khi bạn NGHE và bấm Y." -ForegroundColor White
Write-Host "============================================================" -ForegroundColor DarkCyan
Write-Host ""

# Bản full-audio đóng sẵn source tracks Q5/Q6 trong project.
$bundled5 = Join-Path $ProjectRoot "public\audio\source\book5"
$bundled6 = Join-Path $ProjectRoot "public\audio\source\book6"
if (-not $Book5Source -and (Test-Path -LiteralPath $bundled5)) {
  $Book5Source = $bundled5
  Write-Ok "Dùng audio Q5 đã đóng sẵn trong project; không cần chọn RAR."
}
if (-not $Book6Source -and (Test-Path -LiteralPath $bundled6)) {
  $Book6Source = $bundled6
  Write-Ok "Dùng audio Q6 đã đóng sẵn trong project; không cần chọn RAR."
}
if (-not $Book5Source) {
  Write-Host "Kéo file Audio-han-ngu-5.rar HOẶC thư mục MP3 Quyển 5 vào đây rồi Enter."
  Write-Host "Nhấn Enter trống nếu muốn bỏ qua Quyển 5."
  $Book5Source = Read-Host "Q5"
}
if (-not $Book6Source) {
  Write-Host ""
  Write-Host "Kéo file Audio-han-ngu-6.rar HOẶC thư mục MP3 Quyển 6 vào đây rồi Enter."
  Write-Host "Nhấn Enter trống nếu muốn bỏ qua Quyển 6."
  $Book6Source = Read-Host "Q6"
}

$sources = @{
  5 = Resolve-AudioFolder $Book5Source 5
  6 = Resolve-AudioFolder $Book6Source 6
}

if (-not $sources[5] -and -not $sources[6]) { Fail "Bạn chưa chọn nguồn audio nào." 22 }

$report = New-Object System.Collections.Generic.List[object]
$totalConfirmed = 0
$totalRecognized = 0

foreach ($book in @(5,6)) {
  $sourceDir = $sources[$book]
  if (-not $sourceDir) { continue }

  $inventoryPath = Join-Path $ProjectRoot "public\data-v2\audio-inventory-book$book.json"
  $inventory = Get-Content -LiteralPath $inventoryPath -Raw | ConvertFrom-Json
  $allMp3 = @(Get-ChildItem -LiteralPath $sourceDir -Recurse -File -Filter *.mp3)
  if ($allMp3.Count -eq 0) { Write-Warn "Quyển $book: không tìm thấy MP3."; continue }

  Write-Info "Quyển $book: tìm thấy $($allMp3.Count) file MP3. Đang đối chiếu SHA-256..."

  $hashToTrack = @{}
  foreach ($track in @($inventory.tracks)) {
    $sha = ([string]$track.technicalMetadata.sha256).ToLowerInvariant()
    if ($sha) { $hashToTrack[$sha] = $track }
  }

  $recognized = @{}
  foreach ($mp3 in $allMp3) {
    $sha = (Get-FileHash -LiteralPath $mp3.FullName -Algorithm SHA256).Hash.ToLowerInvariant()
    if ($hashToTrack.ContainsKey($sha)) {
      $track = $hashToTrack[$sha]
      $recognized[[int]$track.trackNumber] = [pscustomobject]@{ File=$mp3; Sha=$sha; Track=$track }
    }
  }
  $totalRecognized += $recognized.Count
  Write-Ok "Quyển $book: nhận diện chính xác $($recognized.Count)/$($inventory.tracks.Count) track theo SHA-256."

  $lessonTracks = @($inventory.tracks | Where-Object { $null -ne $_.candidateLesson }) | Sort-Object {[int]$_.trackNumber}
  foreach ($track in $lessonTracks) {
    $tn = [int]$track.trackNumber
    $lessonNo = [int]$track.candidateLesson
    if (-not $recognized.ContainsKey($tn)) {
      Write-Warn "Q$book Track $tn: không tìm thấy file có SHA-256 đúng; bỏ qua."
      continue
    }

    $lessonFile = Join-Path $ProjectRoot ("public\data-v2\book{0}\lesson{1:D2}.json" -f $book,$lessonNo)
    if (-not (Test-Path -LiteralPath $lessonFile)) {
      Write-Warn "Không tìm thấy lesson JSON: $lessonFile"
      continue
    }
    $lesson = Get-Content -LiteralPath $lessonFile -Raw | ConvertFrom-Json
    $rec = $recognized[$tn]

    # Already verified and same hash: leave untouched.
    $already = @($lesson.audio.tracks | Where-Object { $_.mappingVerified -eq $true -and ([string]$_.sha256).ToLowerInvariant() -eq $rec.Sha })
    if ($already.Count -gt 0) {
      Write-Ok ("Q{0} Bài {1:D2}: đã xác minh track này trước đó." -f $book,$lessonNo)
      continue
    }

    Write-Host ""
    Write-Host "------------------------------------------------------------" -ForegroundColor DarkGray
    Write-Host ("QUYỂN {0} - TRACK {1:D2}  ({2:N1}s)" -f $book,$tn,[double]$track.technicalMetadata.durationSeconds) -ForegroundColor Cyan
    Write-Host ("Ứng viên: Bài {0:D2} - {1}" -f $lessonNo,$lesson.titleZh) -ForegroundColor White
    if ($lesson.titleVi) { Write-Host ("          {0}" -f $lesson.titleVi) -ForegroundColor Gray }
    $preview = Get-PreviewText $lesson
    if ($preview) { Write-Host ("Câu đầu:  {0}" -f $preview) -ForegroundColor Gray }
    Write-Host ("File:     {0}" -f $rec.File.Name) -ForegroundColor DarkGray
    Write-Host ""
    Write-Info "Mở audio bằng trình phát mặc định..."
    Start-Process -FilePath $rec.File.FullName

    while ($true) {
      $choice = Read-Choice "Y=Đúng bài | N=Không đúng | S=Bỏ qua | R=Nghe lại | Q=Dừng"
      if ($choice -eq "R") { Start-Process -FilePath $rec.File.FullName; continue }
      if ($choice -eq "Q") { Write-Warn "Bạn đã dừng xác minh."; break }
      if ($choice -eq "N") {
        Write-Warn "Không map Track $tn vào Bài $lessonNo. mappingVerified vẫn false."
        $report.Add([pscustomobject]@{book=$book;track=$tn;candidateLesson=$lessonNo;result="rejected_or_mismatch";sha256=$rec.Sha})
        break
      }
      if ($choice -eq "S") {
        Write-Info "Bỏ qua Track $tn; chưa thay đổi mapping."
        $report.Add([pscustomobject]@{book=$book;track=$tn;candidateLesson=$lessonNo;result="skipped";sha256=$rec.Sha})
        break
      }
      if ($choice -eq "Y") {
        # Nếu track đang nằm trong public/audio/source của project, dùng trực tiếp để tránh nhân đôi 100+ MB.
        $publicRoot = [IO.Path]::GetFullPath((Join-Path $ProjectRoot "public"))
        $audioFull = [IO.Path]::GetFullPath($rec.File.FullName)
        if ($audioFull.StartsWith($publicRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
          $rel = $audioFull.Substring($publicRoot.Length).TrimStart('\','/') -replace '\\','/'
          $src = "/" + $rel
          $destSha = $rec.Sha
        } else {
          $destDir = Join-Path $ProjectRoot ("public\audio\original\book{0}" -f $book)
          New-Item -ItemType Directory -Force -Path $destDir | Out-Null
          $destName = "lesson{0:D2}.mp3" -f $lessonNo
          $destFile = Join-Path $destDir $destName
          Copy-Item -LiteralPath $rec.File.FullName -Destination $destFile -Force
          $destSha = (Get-FileHash -LiteralPath $destFile -Algorithm SHA256).Hash.ToLowerInvariant()
          if ($destSha -ne $rec.Sha) { Fail "SHA-256 sau khi copy không khớp; dừng để bảo vệ dữ liệu." 30 }
          $src = "/audio/original/book$book/$destName"
        }

        if ($null -eq $lesson.audio) {
          Set-Prop $lesson "audio" ([pscustomobject]@{tracks=@();mappingVerified=$false})
        }
        if ($null -eq $lesson.audio.tracks) { Set-Prop $lesson.audio "tracks" @() }

        $newTrack = [pscustomobject]@{
          id = ("b{0}_l{1:D2}_original_track{2:D2}" -f $book,$lessonNo,$tn)
          src = $src
          label = ("Gốc - Track {0:D2}" -f $tn)
          mappingVerified = $true
          trackNumber = $tn
          sha256 = $rec.Sha
          verificationMethod = "user_listen_confirmed"
          verifiedAt = (Get-Date).ToUniversalTime().ToString("o")
        }
        $kept = @($lesson.audio.tracks | Where-Object { -not (($_.mappingVerified -eq $true) -and ($null -ne $_.trackNumber) -and ([int]$_.trackNumber -eq $tn)) })
        $lesson.audio.tracks = @($kept + $newTrack)
        $lesson.audio.mappingVerified = $true
        if ($lesson.verification) { Set-Prop $lesson.verification "audioVerified" $true }

        foreach ($cand in @($lesson.audio.candidateTracks)) {
          if ([int]$cand.trackNumber -eq $tn) {
            Set-Prop $cand "mappingVerified" $true
            Set-Prop $cand "mappingBasis" "user_listen_confirmed"
            Set-Prop $cand "contentChecked" $true
          }
        }
        Save-Json $lesson $lessonFile

        Set-Prop $track "mappingVerified" $true
        Set-Prop $track "contentChecked" $true
        Set-Prop $track "verifiedLesson" $lessonNo
        Set-Prop $track "verificationMethod" "user_listen_confirmed"
        Set-Prop $track "verifiedAt" (Get-Date).ToUniversalTime().ToString("o")

        $totalConfirmed += 1
        $report.Add([pscustomobject]@{book=$book;track=$tn;lesson=$lessonNo;result="verified";src=$src;sha256=$rec.Sha})
        Write-Ok ("Đã map Q{0} Track {1:D2} -> Bài {2:D2}." -f $book,$tn,$lessonNo)
        break
      }
    }
    if ($choice -eq "Q") { break }
  }

  $verifiedCount = @($inventory.tracks | Where-Object { $_.candidateLesson -ne $null -and $_.mappingVerified -eq $true }).Count
  $candidateCount = @($inventory.tracks | Where-Object { $_.candidateLesson -ne $null }).Count
  if ($verifiedCount -eq 0) { $status = "not_listened_or_transcribed" }
  elseif ($verifiedCount -eq $candidateCount) { $status = "user_listen_verified" }
  else { $status = "partially_user_listen_verified" }
  Set-Prop $inventory "contentVerificationStatus" $status
  Set-Prop $inventory "verifiedLessonTrackCount" $verifiedCount
  Save-Json $inventory $inventoryPath
}

$reportPath = Join-Path $ProjectRoot "ORIGINAL_AUDIO_MAPPING_REPORT.json"
[pscustomobject]@{
  generatedAt = (Get-Date).ToUniversalTime().ToString("o")
  recognizedBySha256 = $totalRecognized
  newlyConfirmed = $totalConfirmed
  mappings = @($report)
} | ConvertTo-Json -Depth 20 | ForEach-Object { Write-Utf8NoBom $reportPath $_ }

Write-Host ""
Write-Host "============================================================" -ForegroundColor DarkCyan
Write-Ok "Hoàn tất mapper. Newly confirmed: $totalConfirmed"
Write-Host "Report: $reportPath"
Write-Host ""
Write-Host "Tiếp theo:" -ForegroundColor White
Write-Host "1. Chạy: node scripts\validate-audio-integrity-v2.mjs" -ForegroundColor Gray
Write-Host "2. Nếu PASS, chạy PUSH_TO_GITHUB.bat" -ForegroundColor Gray
Write-Host "3. GitHub Actions xanh -> Ctrl+F5 trên website" -ForegroundColor Gray
Write-Host "============================================================" -ForegroundColor DarkCyan
exit 0
