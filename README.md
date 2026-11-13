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

## Adding research reports

The Research page (`/research/`) is built from one YAML file per report in
`src/content/research/`. To add a report, copy
`src/content/research/intelligence-led-defence.yaml` and fill it in:

```yaml
title: "Report title"
summary: >-
  One-paragraph summary shown on the card. The hashtags are added after it.
url: /research/my-report/        # or a full https:// link for external work
image: /research/images/my-report.png
imageAlt: "Description of the preview image"
tags:                            # rendered as clickable #hashtags
  - cybersecurity
pubDate: 2026-11-13
source: Adaptive Online          # author or publisher
draft: false                     # true hides it from the page
```

- **External reports:** set `url` to the full `https://` address and `source`
  to the author or publisher. The card opens in a new tab and is labelled
  "external".
- **Your own HTML reports:** put the file at
  `public/research/<name>/index.html` and the preview image (ideally 16:9, e.g.
  1200×675) in `public/research/images/`. Remove any scripts injected by the
  tool that generated the report before publishing.

Each tag gets its own filtered page at `/research/tag/<tag>/` automatically.

## Deployment

Pushing to `main` triggers `.github/workflows/astro.yml`, which builds the
site with Astro and publishes it to GitHub Pages. The custom domain
(adaptive-online.com) is configured via the repository's Pages settings and
the `CNAME` files in the repo root and `public/`.
