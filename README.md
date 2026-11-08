# Bryant Atelier website

Static site built with [Eleventy](https://www.11ty.dev/). No CMS, no client-side framework.

```
npm install
npm run dev     # http://localhost:8080
npm run build   # outputs _site/
```

## Where things live

| What | File |
|---|---|
| Domain, email, phone, socials, service areas, booking link, hero video | `src/_data/site.json` |
| Projects (one entry = one `/work/[slug]/` page) | `src/_data/projects.json` |
| Short-form reels | `src/_data/reels.json` |
| Testimonials, festivals | `src/_data/testimonials.json`, `festivals.json` |
| Client logo strip (generated) | `src/_data/clients.json`, `src/assets/logos/` via `scripts/process_logos.py` |
| Homepage sections | `src/index.njk` |
| Styles (tokens at the top) | `src/css/styles.css` |
| Behaviour (nav, video, filters, lightbox, form) | `src/js/main.js` |
| Source images (resized to AVIF/WebP/JPEG at build) | `src/_img/` |

## Adding a project

1. Add the 16:9 still to `src/_img/work/<slug>.jpg`, and frames to `src/_img/frames/<slug>/01.jpg … 09.jpg`.
2. Add an entry to `projects.json` (copy an existing one).
3. Run `node scripts/make-og.cjs` to make its social share card.

## Scripts

- `node scripts/redirects.mjs` regenerates `vercel.json` and `REDIRECTS.md` from one map.
- `node scripts/make-og.cjs` renders the Open Graph cards and app icons (needs Playwright).
- `python3 scripts/process_logos.py` rebuilds the logo strip (it reads from local clones of the two old repos).

See `TODO.md` for open items and `PLAN.md` for the original plan.
