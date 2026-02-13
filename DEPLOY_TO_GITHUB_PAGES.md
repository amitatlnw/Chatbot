# Deploying to GitHub Pages

This project is a static client-side chat app and can be hosted on GitHub Pages. Below are two simple options — manual (via repo settings) and automated (GitHub Actions).

Prerequisites
- `index.html` is present at the repository root (it is).
- If you use Firebase, `config.js` must contain valid Firebase client config and your Realtime Database rules must allow access (or use Authentication).

Option A — Manual (quick)
1. Push your code to the `main` branch on GitHub.
2. Open your repository on github.com → Settings → Pages.
3. Under "Build and deployment" choose "Branch: main" and "Folder: / (root)".
4. Save. GitHub Pages will publish your site at `https://<your-username>.github.io/<repo>/` after a minute.

Option B — Automated via GitHub Actions
1. Add the workflow file `.github/workflows/gh-pages.yml` (included in this repo).
2. Push to `main`; the workflow will run and publish the repository root to the `gh-pages` branch.
3. In GitHub Pages settings, choose `gh-pages` branch and `/ (root)` as the site source.

Notes about `config.js` and secrets
- This app uses the Firebase client SDK from the browser. The Firebase "API key" and other fields are safe for client use, but your database rules must be configured to prevent unwanted reads/writes.
- For production you can keep `config.js` in the repo, or use environment-specific configs (CI secrets) and write `config.js` as part of the CI build. This repo includes `config.example.js` as a template.

Local testing
Run a local static server from the project root:

```bash
python3 -m http.server 8000
```

Open http://localhost:8000/index.html

Troubleshooting
- If status reads "Disconnected", open the browser console for Firebase errors (auth or DB rules).
- For quick offline testing use `index.html` with `app-demo.js` (demo mode) — it uses localStorage and requires no server.

If you want, I can also:
- Configure the workflow to build/publish only the `dist` folder (if you later add a build step), or
- Add a small script to generate `config.js` from repo secrets in CI.

