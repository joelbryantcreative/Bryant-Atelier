# Bryant Atelier: build plan

Status: **approved and built** (defaults accepted). See `TODO.md` for open items. Nothing is deployed or changed on either old site.

---

## 1. Stack

**Static site with a light generator: Eleventy (11ty) on Vercel.** No CMS, no client-side framework, vanilla JS.

Why not hand-written HTML like Lineage: the new site has about 15 pages that share a header, footer and project template. With plain HTML that is 15 copies of the same markup to keep in sync. Eleventy keeps the Lineage approach (plain HTML, CSS and JS go out the door) but builds the pages from one `projects.json` file. Adding a project later means adding one entry.

| Piece | Choice | Source |
|---|---|---|
| Host | Vercel, new project (not created until you say so) | both sites |
| Build | `eleventy` → `_site/`, clean URLs (`/work/flowing-wood`) | |
| Images | `@11ty/eleventy-img`: AVIF/WebP, responsive sizes, lazy below the fold | |
| Video | Vimeo, as now. Background mode for the hero, poster stills everywhere, iframes only load on hover/tap | both |
| Fonts | Instrument Sans + Fraunces, self-hosted woff2 (Latin subset) | brief |
| Form | Formsubmit AJAX (Lineage's setup), new destination email | Lineage |
| Redirects | `vercel.json` host-based 301s | §12 of both extracts |

## 2. File structure

```
bryant-atelier/
  package.json  eleventy.config.js  vercel.json
  PLAN.md  TODO.md  REDIRECTS.md
  src/
    _data/      site.json (domain, email, phone, socials, areas)
                projects.json  reels.json  clients.json  testimonials.json  festivals.json
    _includes/  layouts/base.njk  layouts/project.njk
                partials/header, footer, contact-form, work-tile, reel-card, logo-strip, jsonld
    index.njk                 /
    work/index.njk            /work
    work/project.njk          /work/[project] (one page per projects.json entry)
    originals.njk             /originals
    contact.njk  privacy.njk  404.njk  sitemap.xml.njk  robots.txt.njk
    css/  styles.css (tokens at the top)
    js/   main.js   (nav, hover previews, tap-to-play reels, lightbox, form)
    assets/  img/ logos/ laurels/ headshots/ frames/ fonts/ og/
```

## 3. Sitemap

| Path | Content |
|---|---|
| `/` | Hero, logos, services, selected work, approach, proof, testimonials, about, contact. Section ids kept as `#services #work #approach #testimonials #contact` so old Lineage anchor links still land. |
| `/work` | All work, filter buttons: All / Brand Films / Documentary / Content & Ads. Short-form reels shown as a tap-to-play vertical row. |
| `/work/[project]` | Lineage page layout: client bar, hero film, title, About / Approach, frames gallery + lightbox, Impact, laurels (Flowing Wood), next project. |
| `/originals` | Lineage Films Originals: Flowing Wood first. |
| `/contact` | Form, Book a call, email, phone, service areas. |
| `/privacy` | Convert's policy (Lineage has none), renamed, updated for Formsubmit + Vimeo. |
| `/404` | Simple not-found with links. |

### Projects carried over

| Slug | From | Type tag | Notes |
|---|---|---|---|
| flowing-wood | Lineage | Documentary, Original | Award + 3 selections, laurels |
| convivio-kalio | Lineage | Documentary | |
| koud-the-breath-haus | Lineage | Documentary | |
| craved-this | both | Brand Films | Same Vimeo id on both sites |
| bytropic-nutrition | both | Brand Films, Content & Ads | Copy mentions social cut-downs |
| rogue-watches | both | Brand Films | |
| good-old-days | Lineage | Brand Films (spec) | Original or not? See decisions |
| fat-fish-bikes | Convert | Brand Films | **No copy or frames exist.** Page built with `[ADD]` placeholders |
| Short-form ads 1 to 5 | Convert | Content & Ads | **No titles or client names.** Shown as reel cards, not pages |
| we-forest-earth, grun-resort | Lineage | | Coming-soon, no film. Default: hidden, old URLs → `/work` |

## 4. Design system

> **Update:** Joel chose black and white with no accent colour. The Oxblood and Dusk notes below are superseded; current tokens are at the top of `src/css/styles.css`.

**Hex values.** The brief says to use Convert's exact hex if the extract has them. It does, so the defaults are:

| Token | Brief | Convert extract (used) | Note |
|---|---|---|---|
| Ink | #1B1A17 | **#1A1A1A** | Near-identical |
| Bone | #EEE7DA | **#F5F1E8** | Slightly lighter |
| Oxblood | #6B2222 | **#6B2737** | Labelled "legacy accent" in Convert; not on the live Convert site |
| Dusk | #8C8291 | **#4F5D6B** | Very different: slate blue vs mauve grey |

Contrast checks (WCAG AA needs 4.5:1 for body text):
- Bone on Ink, and Ink on Bone: about 15:1. Fine.
- Bone text on Oxblood buttons about 9.5:1. Fine. Oxblood **text** on Ink is about 1.6:1, so oxblood is used as a fill, never as text on dark.
- Convert Dusk #4F5D6B on Ink is about 2.6:1: **fails as text.** The brief's #8C8291 on Ink is about 4.7:1 (passes on dark, fails on Bone). Either way Dusk stays for rules, labels on dark, and small accents.
- Convert's Slate #6B6660 works for muted text on Bone (about 5:1), so I'll use it as a supporting token.

**Type.** Instrument Sans for wordmark, headings, nav, buttons, body. Fraunces italic for pull quotes, project titles on project pages, and process numerals. Lowercase headlines in the Lineage style ("selected work.").

**Feel.** Lineage's structure and calm (eyebrow labels "01 / Services", generous spacing, full-bleed work grid, dark/light alternation), Convert's direct CTAs. Pill buttons, Oxblood fill. No gradients (Convert's aqua→blue is dropped).

**Reused components:** Vimeo background hero (both), hover-preview tiles (Lineage), tap-to-play reel cards (Convert), logo marquee with CSS tint (Convert motion, Lineage tint), lightbox gallery (Lineage), laurels row (Lineage), accordion (Lineage), Formsubmit AJAX (Lineage). `prefers-reduced-motion` stops the marquee and hover video.

## 5. Content notes (what I'll do by default)

- **Logos:** Convert's 29 + Lineage's 13 client logos (festivals removed) minus 8 duplicates = **34 logos**. Lineage-only additions: The Breath Haus, Convivio, Kalio, Away at Byron Bay, We Forest Earth.
- **Proof:** Winner, Best Byron Bay Film, Byron Bay International Film Festival 2025. Selections: Noosa International Surf Film Festival, Anglet International Surf Film Festival (France) 2025, Leavenworth Mountain Film Festival (USA). Noosa and Leavenworth years are not in the extract → `[CHECK]`.
- **Testimonials (6):** Ben Handler, Nathan Tanner, Craved This (results) + Zac Povolny, Dean Gregory, Daniela Maiorano (story).
  - Two Convert quotes name "Convert Studios". Swapping in "Bryant Atelier" changes a client's words, so I'll show it as **[Bryant Atelier]** in square brackets, the standard mark for an edited quote, and flag it `[CHECK]`.
  - The Lineage extract says Daniela's quote was "reworked from a real WhatsApp message". Flagged `[CHECK]` to confirm she's approved that wording.
- **Em dashes:** some Lineage copy uses them ("…repurposing — the long tail that compounds", "Thanks — that's landed."). I'll swap them for commas or colons and keep every other word the same.
- **New copy:** Monthly Content, the Approach "one shoot" line, About Joel, and the hero subline layout. All marked `[DRAFT]`. Nothing invented: no numbers, credentials or clients.
- **Booking:** neither site has a booking tool, so "Book a call" goes to `/contact` until you give me a link.
- **Privacy:** Convert's policy says the site uses "cookies and analytics tools", but neither site runs analytics. `[CHECK]`: keep it, or trim it to match.

## 6. Build stages (preview link at each)

1. Tokens, fonts, base layout, header and footer, mobile nav.
2. Homepage, section by section (hero → contact).
3. `/work`, `/work/[project]`, `/originals`.
4. `/contact`, `/privacy`, 404, SEO (titles, meta, OG image, JSON-LD), sitemap, robots, `vercel.json` redirects, `REDIRECTS.md`, `TODO.md`.
5. Check: Lighthouse on mobile, keyboard pass, every page at 375px, link check.

**Assets:** the stills, frames, logos, laurels and headshots live in the two GitHub repos, not in the extracts. I'll clone `joelbryantcreative/Lineage-Films` and `joelbryantcreative/Convert-Studios` **read-only** to copy them. Nothing gets pushed to either repo.

---

## 7. Decisions for Joel

Defaults in **bold** are what I'll use if you just say "go".

1. **Domain:** bryantatelier.com.au or bryantatelier.au? (The extracts disagree: Convert assumed .com.au, Lineage assumed .com.) **Default: bryantatelier.com.au**, set in one config value.
2. **Email shown and form destination:** hello@bryantatelier…, joel@lineagefilms.com.au, or hello@convertstudios.au? **Default: hello@bryantatelier.com.au** shown. The form goes to joel@lineagefilms.com.au until the new inbox exists, because Formsubmit needs a verified inbox.
3. **Hex values:** Convert's (above) or the brief's? Dusk matters most because the two values are completely different colours. **Default: Convert's for Ink, Bone and Oxblood, and the brief's #8C8291 for Dusk** because it passes contrast on dark.
4. **Hero reel:** Lineage `1195077840` or Convert `1197941576`? **Default: Lineage**, which is calmer and closer to the brand feel. Also: which still should be the poster frame?
5. **Homepage work (6 to 8):** **Default: Flowing Wood (badge), Convivio × Kalio, Bytropic Nutrition, Koud × The Breath Haus, Rogue Watches, Craved This, plus 2 short-form ads.** Note: the content/ads side is thin. The 5 reels have no client names, and Ben Handler's ad campaign has no video in either extract. Can you name the reel clients, or add ad work?
6. **Good Old Days:** an Original (alongside Flowing Wood), or general work? It's a spec brand film, not a documentary. **Default: Original.**
7. **We Forest Earth and Grün Resort:** **Default: hidden, old URLs → /work.** Or keep them as coming-soon pages?
8. **Fat Fish Bikes:** has a film and poster but no write-up. **Default: build the page with `[ADD]` copy placeholders.**
9. **Ads partner:** named on the site? **Default: not named** ("run with our ads partner" `[DRAFT]`).
10. **Booking tool:** Calendly link? **Default: none, Book a call → /contact.**
11. **Leave anything out?** Any projects, clients or logos from the old sites to drop (e.g. We Forest Earth's logo, since the film isn't out)?
12. **Edited testimonial quotes:** OK to show "[Bryant Atelier]" in place of "Convert Studios" in Ben Handler's and Craved This's quotes?
13. **Where the code lives:** **Default: local only for now.** Later, a new GitHub repo (e.g. `joelbryantcreative/Bryant-Atelier`) when you want it.
