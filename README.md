## adaptive-online.com

Astro site for Adaptive Online, deployed via GitHub Actions to GitHub Pages.

## 🚀 Project Structure

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

## Development

```sh
npm install
npm run dev
```

## Deployment

Pushing to `main` triggers `.github/workflows/astro.yml`, which builds the
site with Astro and publishes it to GitHub Pages. The custom domain
(adaptive-online.com) is configured via the repository's Pages settings and
the `CNAME` files in the repo root and `public/`.
