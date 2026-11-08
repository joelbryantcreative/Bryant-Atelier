# TODO for Joel

Everything that needs your eyes before launch. On the site, items show as a yellow **DRAFT** tag or a yellow `[ADD …]` / `[CHECK …]` label, so you can also find them by browsing the preview.

## [ADD] Missing content

- [ ] **Photo of Joel** for the About section (`/#about`). Portrait, 4:5, at least 1600px tall. Put it in `src/_img/people/joel.jpg` and I'll swap out the placeholder.
- [ ] **Fat Fish Bikes** (`/work/fat-fish-bikes/`): About, Approach and Impact copy (`src/_data/projects.json`). Neither old site had any.
- [ ] **Fat Fish Bikes frames**: 9 stills, 16:9. The page shows a placeholder until they're added.
- [ ] **Short-form ad clients.** The five reels have no titles or client names in either extract (`src/_data/reels.json`). The ad 1 poster shows a Tucann logo, so it may be the Tucann work. Once named, each reel can show its client.
- [ ] **Ads & Growth work.** Ben Handler's testimonial mentions paid ad campaigns for Buyers Agent Institute, but there's no video for them in either repo. Add it if you can share it.

## [DRAFT] New copy to approve

| Where | Copy |
|---|---|
| Home, Services, Monthly Content | "One shoot day a month. We turn it into a set of short-form pieces for social, all cut from the same footage. You show up every week, and it all looks like you." |
| Home, Services, Ads & Growth | "Strategy, ad creative, paid distribution and optimisation, run with our ads partner." |
| Home, Approach | "One shoot. A hero film, a month of social content and the ads that carry it, all from the same footage." |
| Home, About | "Bryant Atelier is run by Joel Bryant, a filmmaker and founder based in Byron Bay." |
| Home, About | "It brings two studios under one roof: Lineage Films for brand films and documentary, and Convert Studios for content and ads." |
| Home, About | "Joel directs, shoots and edits much of the work himself, from solo documentary shoots on remote coastline to campaign days with a small crew." (based on the Flowing Wood, Koud and Rogue write-ups) |
| Contact, Book a call card | "Prefer to talk it through? Call or email, or send the form and we'll set up a time." |
| Contact form | New optional question "What are you after?" with options: Brand film or documentary / Monthly content / Ads & growth / Not sure yet |
| /work | Heading "Short-form ads and social content." and line "Tap to play. Sound on." |
| /originals | "Our own films, made under the Lineage Films label." |
| /originals | "Flowing Wood went on to screen at four film festivals, and was awarded Best Byron Bay Film at the Byron Bay International Film Festival." |
| /originals | "Have a story worth holding?" and "Brand-funded original films are part of what we make." |
| /privacy | "Bryant Atelier brings together the studios previously known as Lineage Films and Convert Studios. Lineage Films continues as the label for our original films." |
| /privacy | "On this website, our enquiry form is handled by Formsubmit, and our videos are hosted and played by Vimeo." |
| 404 page | "this page has moved on." and "It may have come from one of our old sites. The work, the films and the contact form all live here now." |

## [CHECK] Facts and permissions

- [ ] **Edited testimonials.** In Ben Handler's and Craved This's quotes, "Convert Studios" now reads **[Bryant Atelier]**. The square brackets mark it as an edit. OK with you, and with them?
- [ ] **Daniela Maiorano's quote** was reworded from a WhatsApp message (per the Lineage extract). Confirm she's happy with that wording.
- [ ] **Festival years.** Noosa (2025) and Leavenworth (2026) come from the laurel artwork; the extract didn't state them. Confirm. The Lineage extract also said the "festival run [was] 2025", which doesn't fit a 2026 Leavenworth laurel.
- [ ] **Fat Fish Bikes year.** Shows as `[CHECK YEAR]` on its page.
- [ ] **Good Old Days film.** It uses Vimeo `1037171037`, the same ID that was once Lineage's homepage reel. Confirm it's really the Good Old Days film.
- [ ] **Convivio:** the About copy says "Daniela and her brother", while Approach and Impact name him Atilio. Kept verbatim; pick one if you like.
- [ ] **Privacy policy, analytics.** It says the site uses "cookies and analytics tools". Nothing is installed, so either add analytics or cut that wording. It's also worth a professional review (the policy itself says so).
- [ ] **Hero poster.** While the reel loads, the hero shows the Flowing Wood still. Swap it for a frame from the hero reel (`1195077840`) if you prefer.

## Before launch (setup)

- [ ] **Email.** The site shows `hello@bryantatelier.com.au`. Create that inbox, or tell me which address to show (`src/_data/site.json`).
- [ ] **Form destination.** Submissions currently go to `joel@lineagefilms.com.au`, because Formsubmit only delivers to a verified inbox. Once the new inbox exists, change `formEndpoint` in `site.json`, submit one test, and click Formsubmit's verification email.
- [ ] **Instagram.** Confirm the `@bryantatelier` handle exists.
- [ ] **Booking link.** If you add Calendly or similar, set `bookingUrl` in `site.json`; every "Book a call" button picks it up.
- [ ] **Domain.** Buy `bryantatelier.com.au` (it's `url` in `site.json`). If you go with `.au` instead, change that one value, then run `node scripts/redirects.mjs` and `node scripts/make-og.cjs`.
- [ ] **Vimeo privacy.** Every video (the hero `1195077840`, all project films and hover previews, and reels `1198616005` to `1198616184`) must allow embedding on the new domain.
- [ ] **Vercel.** Create a new project from this folder (it builds with `npm run build` and outputs `_site`). Nothing has been deployed.
- [ ] **Redirects.** Follow the steps in `REDIRECTS.md` when you're ready to point the old domains here.
- [ ] **Google Search Console.** Verify the new domain, submit `/sitemap.xml`, and use the Change of Address tool for `lineagefilms.com.au`.
- [ ] **ABN.** Neither site showed one. Add it to the footer if you want it there.

## Left out on purpose

- **We Forest Earth and Grün Resort** are hidden, with no page, tile or sitemap entry. Their data is kept in `projects.json` with `"hidden": true`; remove that line once the film is ready.
- **Testimonials not used:** Rogue Watches, Alex Libby (Huckberry), Tucann (all Convert).
- **Old assets not carried over:** Convert's aqua→blue gradient, Lineage's Canela/SF Pro fonts (swapped for Instrument Sans and Fraunces), the 4 MB hover GIFs, the unused Unsplash allowance, and the stray "Under Armour.svg" and "White Logo.png" files.
- **Colour note:** Ink, Bone and Oxblood use Convert's exact hex values. Dusk uses the brief's `#8C8291` (Convert's `#4F5D6B` is too dark to read on Ink). Muted text on light backgrounds uses `#5C5751`, a slightly darker Slate, so it passes contrast on Mist.
