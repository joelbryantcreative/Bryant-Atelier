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

## Free Video Plan, first-person voice, industries (added after launch preview)

- [ ] **Free Video Plan copy** (`src/_includes/partials/plan.njk`, `/free-video-plan/`): the single free offer, which replaces the Content Review and Story Session. Approve the three parts (your story in one line, 3 short-form ideas with hooks, what's holding your video back), the "How you get it" line, the page headline "your free story and content plan.", the "How it works" steps and the form questions. All marked DRAFT. Use `docs/free-video-plan-template.md` to make each plan.
- [ ] **Do 3 plans before launch** and time them. If one takes more than 45 minutes, trim the template before promising 48 hours to everyone. Sending those 3 plans unprompted to businesses you'd love to work with doubles as outreach.
- [ ] **Voice is "we"** across the site (switched back from "I" for a more professional, studio feel). Where Lineage and Convert originally said "we", their exact wording is restored (e.g. "our approach.", "We sat each person…", "Email us, give us a call…"). Joel is named where a person matters: "Or text Joel", the About section, "You work with Joel", "You'll speak with Joel directly", and the FAQ answer "Joel, directly." The Craved This Approach now says "just Joel on camera" (originally "just myself on camera"). Testimonials are unchanged.
- [ ] **Ads & Growth line:** "I run the ads myself… I work alongside growth partner Biggs Growth" with a link to biggsgrowth.com.au. Confirm Jake is happy to be named and linked.
- [ ] **"Who I work with" cards** (`src/_data/industries.json`): approve the six categories and their example lists. **[ADD]** a real estate or property still for the sixth card; until then it shows a placeholder.
- [ ] **Buttons:** every offer button now says "Get your free video plan" (header, hero, mobile menu, How I work, Client wins, Meet the filmmaker). "Book a call" stays on the contact page, in the mobile menu and next to the form. Old `/review/` links redirect to `/free-video-plan/`.
- [ ] **Hero proof:** the small award line was removed from the hero (the award card right below shows it). Once you have your Google rating and years of experience, add proof chips to the hero like Jake's.
- [ ] **Form submissions:** plan requests go to the same Formsubmit inbox with the subject "Free video plan request from bryantatelier.com.au". The form includes an optional budget band (Under $2,000 to $10,000+) so you can spot brand film leads. **Price anchor:** only add "Usually $X" if you charge that for creative development.

## Homepage sections modelled on Biggs Growth

- [ ] **How I work** (`/#approach`): four steps (Start free, Develop, Direct, Distribute), each with a "You get" line. Develop/Direct/Distribute keep Lineage's wording; the step names under them, the "You get" lines and step 01 are DRAFT. Also the "Step one is free." strip.
- [ ] **Client wins** (`/#recognition`, replaces the old Recognition section). All figures come from the project write-ups: Flowing Wood (4 festivals, 3 countries, 1 award, shot solo over two weeks), Bytropic (2 days of filming became a hero film, social cut-downs and website stills), Koud (3 days filmed solo, thirty strangers), Craved This (1 of 3 launch films, plus website visuals), Convivio (released for the launch). Check you're happy with each summary. **If you have real numbers you can share** (views, enquiries, sales, bookings, with the client's OK), they'd make these cards much stronger.
- [ ] **Testimonial headlines** are word-for-word fragments of each quote; the tags are my labels for the work involved.
- [ ] **Meet the filmmaker** (`/#about`): **[ADD]** your portrait, ideally 2 or 3 extra photos (on set, in the field) for a collage like Jake's, plus a few lines on why you started and something about you outside work.
- [ ] **Why work with me:** six reasons, all DRAFT. Only keep the ones you agree with.

## From the Biggs Growth review

- [ ] **FAQ** (`src/_data/faq.json`, homepage `#faq`): approve the 3 drafted answers (what's in the plan, do you travel, who will I work with). **[ADD]** answers for: how much it costs (your starting prices), do I need to be on camera, how long a brand film takes, who owns the footage. Only answered questions are sent to Google as FAQ data; placeholders are left out automatically.
- [ ] **"Or text Joel on 0497 962 046"** now sits under the main buttons (hero, free plan, How I work, Client wins, Meet the filmmaker, "Don't see your business?", plan page). On phones it opens a text message. Check you're happy to be texted on that number.
- [ ] **Header** shows "Get in touch" (to the contact page) next to the free video plan button. Your number is under the hero buttons ("Or text Joel"), in the contact section, the footer and the phone menu.
- [ ] **Contact section:** "Pick whichever is easiest" (Text, Call, Email), "You'll speak with me directly, not a sales team", and a checklist of what's in the free plan. DRAFT.
- [ ] **Free Video Plan:** now **4 parts** (added "What others in your industry do well") and **"within 2 business days"** instead of 48 hours, on every page, the form and the template.
- [ ] **Still needed from you:** starting prices, years of experience, Google rating (if you have reviews), photos and a few lines on why you started, ABN.

- [ ] **Headline** is now "Stories worth telling. Content that works." (replacing the brief's "Stories with roots."). The Originals page keeps Lineage's "stories with roots." Update your Instagram bio and any print to match.

- [ ] **Hero sentence** (DRAFT): "Your one-stop creative workshop. We turn your story into brand films, documentaries, short-form content and ads that bring in customers." ("Atelier" is French for workshop.) The footer keeps the shorter list version.

- [x] **Portrait added** (`src/_img/people/joel.jpg`): in the band under the hero, as a small avatar beside "Or text Joel" in the hero, and in Meet the filmmaker. **[ADD]** 2 or 3 more photos (on set, in the field, editing) to turn the About photo into a collage like Jake's.

- [ ] **Experience:** "Nearly 10 years making films and content" now shows as a chip in the hero and a pill in Meet the filmmaker (`site.json` → `experience`). Change the wording there if "films and content" isn't quite right.
- [ ] **Google reviews:** the hero has a ready-made rating chip that stays hidden until you fill in `site.json` → `google.rating` (and optionally `reviewCount`). Only switch it on once the reviews are live on Google.

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
- **Client logos removed at your request:** the 21 that only appeared on Convert Studios (Bed Threads through Youfoodz, including Nivea and OGX Beauty). 13 remain: Koud, The Breath Haus, Convivio, Kalio, Bytropic, Rogue Watches, Ultimate Ears, Fat Fish Bikes, Salty Cabins, Away at Byron Bay, Craved This, We Forest Earth, Huckberry.
- **Testimonials not used:** Rogue Watches, Alex Libby (Huckberry), Tucann (all Convert).
- **Old assets not carried over:** Convert's aqua→blue gradient, Lineage's Canela/SF Pro fonts (swapped for Instrument Sans and Fraunces), the 4 MB hover GIFs, the unused Unsplash allowance, and the stray "Under Armour.svg" and "White Logo.png" files.
- **Colour:** black and white, no accent colour (your choice, replacing the brief's Oxblood). Ink `#141414`, Bone `#F4F1EA`, Mist `#E9E6DF`, deep black `#0D0D0D` for the contact bands. Buttons are white on dark sections and black on light ones. Muted text on light backgrounds is `#5C5751` so it passes contrast.
