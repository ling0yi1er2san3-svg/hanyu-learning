# Hanyu Learning V2 — Release Ready

This package preserves the validated Hanyu V2 course data and adds release automation.

## Data policy
- Canonical dataset: `public/data-v2`.
- `public/data` is legacy/fallback and is not double-counted by release validation.
- Core catalog invariant: 76 lessons total = 58 core + 6 partial + 12 missing-source metadata entries.
- Vocabulary invariant: 1,942 main vocabulary entries and 1,942 search-index entries.
- Core Pinyin and Vietnamese coverage: 738/738 content units.
- Hán-Việt is intentionally verification-first: only externally verified/composed entries are populated; pending entries are valid and must not be guessed.
- Q5/Q6 original-audio candidate mappings remain `mappingVerified:false` until listened/transcribed and content-verified.

## Local Windows release
```powershell
npm install
npm run release:check
npm audit --omit=dev --audit-level=high
npm run build -- --base "./"
npm run check:dist
```

## GitHub Pages
1. Push this project to the repository `main` branch. If you run `npm install` locally first, commit the generated `package-lock.json` for reproducible `npm ci` builds.
2. In GitHub: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. The included `.github/workflows/deploy.yml` automatically computes `/<repository-name>/` as Vite base and deploys `dist/`.

## Important
Do not manually change `mappingVerified:false` to `true` for Q5/Q6 audio without content verification.
