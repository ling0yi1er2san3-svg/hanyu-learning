# Hanyu Learning V2 integration status

Updated: 2026-10-18

## Physical data
- Catalog: 76 lessons = 58 core / 6 partial / 12 missing.
- Core lesson JSON: 58/58 physically present.
- Main vocabulary index: 1,942/1,942 source-real entries.
- Search index: 1,942/1,942 entries.
- No missing/partial lesson is promoted to core.

## Core Chinese content
- Core content lessons: 58/58.
- Text sections: 26.
- Dialogue sections: 74.
- Dialogue lines: 712.
- Chinese source characters: 29,374.
- Q3, Q4, Q5, Q6 content-layer validators pass.

## Pinyin
- Pinyin coverage: 738/738 content units.
- Existing/curated readings: 148.
- ICU Han-Latin generated readings: 590.
- Generated readings remain explicitly unverified; coverage is complete but source verification is not claimed.

## Vietnamese translation
- Global core translation coverage: 738/738 content units.
- Book 1: 141/141 source/legacy Vietnamese units.
- Book 2 B16-B24: 137/137 units; status `assistant_translation`.
- Book 3 B1-B8: 214/214 units; status `assistant_translation`.
- Book 4 B11-B19: 221/221 units; status `assistant_translation`.
- Book 5 B1-B10: 12/12 text sections; status `assistant_translation`.
- Book 6 B14-B22: 13/13 text sections; status `assistant_translation`.
- Assistant-generated Vietnamese is explicitly marked `translationSourceVerified=false` and `translationMethod=assistant_translation`.
- Q5/Q6 also set `generatedTranslation=true`; no claim is made that these Vietnamese translations come from the source textbook.

## Audio
- Q5/Q6 RAR inventories: 15 tracks per book.
- 13 sequential lesson candidates per book were recorded for review.
- Exact mapping remains `mappingVerified:false`; candidate mappings are not exposed as verified lesson audio.

## Validation
- `npm run validate:data` -> OK.
- `npm run validate:content` -> OK.
- `npm run validate:pinyin` -> OK (coverage only; generated readings remain unverified).
- `npm run validate:audio-inventory` -> OK (candidate mapping only).
- `npm run validate:q2-translation` -> OK (137/137).
- `npm run validate:q3-translation` -> OK (214/214).
- `npm run validate:q4-translation` -> OK (221/221).
- `npm run validate:q5-translation` -> OK (12/12).
- `npm run validate:q6-translation` -> OK (13/13).
- `npm run validate:translation` -> OK (738/738 core content units).

## Build / audit status
- This milestone has no `package-lock.json` bundled from the prior runtime ZIP.
- `npm audit` therefore cannot run yet (`ENOLOCK`).
- Attempting `npm install --package-lock-only --ignore-scripts` timed out in the current environment.
- No claim is made that `npm audit` or `npm run build:release` has passed for this milestone.

## Still pending
- Expand Hán-Việt coverage beyond the current externally verified subset (63/1,942 vocabulary occurrences).
- Exact original-audio mapping.
- Manual/source verification of generated Pinyin.
- Final dependency install/audit/build when the package registry is reachable.

## Audio integrity milestone (2026-10-18)

Q5 and Q6 supplied RAR archives were losslessly extracted outside the app bundle for verification. The app still does **not** treat the sequential track-to-lesson candidates as content-verified mappings.

New verified technical metadata in `audio-inventory-book5.json` and `audio-inventory-book6.json`:
- SHA-256 for each supplied RAR archive.
- SHA-256 for every extracted MP3 track.
- ffprobe codec, duration, sample rate, channel count, bitrate and extracted byte size.
- `technicalMetadataStatus: verified_file_integrity_and_stream_metadata_only`.
- `contentVerificationStatus: not_listened_or_transcribed`.

Archive SHA-256:
- Q5: `36f8edfe9a7be32e14e1ed5b7c28974ec46ca026d67d35dc791bbc7e0a38562d`
- Q6: `52c18346bf2a640cb99d30d82737f2a17644b16589c578cff0a81a73034f13a7`

Total audio durations:
- Q5: 5985.9 seconds across 15 tracks.
- Q6: 15635.8 seconds across 15 tracks.

`npm run validate:audio-integrity` validates the technical metadata while also failing if any spoken-content mapping is prematurely marked verified.


## Hán-Việt verified-subset milestone (2026-10-18)

- Policy: no model-only Hán-Việt reading is marked verified.
- Source manifest: `public/data-v2/han-viet-sources.json`.
- Verified character subset: `public/data-v2/han-viet-char-verified.json`.
- Current verified character readings: 56.
- Vocabulary occurrences populated: 63/1,942.
- Single-character entries use `hanVietStatus=verified_external_character`; multi-character vocabulary is populated only when every Han character is in the verified map, using `hanVietStatus=composed_from_verified_characters`.
- Remaining 1,879 vocabulary occurrences stay pending rather than being guessed.
- Source ID: `kaihanzi_hsk_sino_vietnamese_2026` (Kai Hanzi HSK × Sino-Vietnamese dataset, CC BY 4.0).
- `npm run validate:han-viet` checks composition, source/status consistency, lesson/index/search-index synchronization, and coverage metadata.
- Current result: `HAN-VIET STATUS: OK (verified external subset only)`.
