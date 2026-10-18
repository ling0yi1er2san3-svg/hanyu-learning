# GitHub deployment — Hanyu Learning V2

Target is fixed to:

- GitHub account: `ling0yi1er2san3-svg`
- Repository: `hanyu-learning`
- Branch: `main`
- Pages: `https://ling0yi1er2san3-svg.github.io/hanyu-learning/`
- Deployment: GitHub Actions

## Easiest Windows method

1. Extract this ZIP to a normal folder.
2. Double-click `PUSH_TO_GITHUB.bat`.
3. The script refuses to push if `origin` points to another repository.
4. If `hanyu-learning` no longer exists:
   - With authenticated GitHub CLI (`gh`), the script creates it automatically.
   - Without authenticated `gh`, it opens GitHub's new-repository page and stops. Create an empty **Public** repository named `hanyu-learning`, then run the BAT again.
5. The project is pushed to `main`.
6. If `gh` is authenticated, the script also attempts to set GitHub Pages to **GitHub Actions** and watches deployment until completion.
7. Otherwise, open **Settings → Pages → Source → GitHub Actions** once.

## Protection

The helper is hard-coded to `ling0yi1er2san3-svg/hanyu-learning`.
If the current `origin` points anywhere else, it stops rather than changing or pushing to another repository.

The existing release validators remain in the project and GitHub Actions runs them again before production build/deployment.
