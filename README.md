# UWHPC documentation

This repository contains the UWHPC Starlight documentation site. The production
build is configured for the standard GitHub Pages project URL:
`https://uwhpc.github.io/docs/`.

## Local development

Node.js 22.12 or newer is required.

```bash
npm ci
npm run dev
```

The site uses `/docs` as its base path in development and production.

## Validate a production build

```bash
npm run build
npm run preview -- --host 127.0.0.1
```

`npm run build` runs Astro's content/type checks before generating the static
site in `dist/`.

## Deploy with GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` builds and deploys the site
on every push to `main`, and it can also be started manually.

Before the first deployment:

1. Open the `UWHPC/docs` repository settings on GitHub.
2. Select **Pages**.
3. Set **Source** to **GitHub Actions**.
4. Commit `package-lock.json` with the site sources and push `main`.
5. Watch the **Deploy documentation to GitHub Pages** workflow.

If the site will use a custom domain instead of the standard project URL,
update `site` and remove or change `base` in `astro.config.mjs` before deploying.
