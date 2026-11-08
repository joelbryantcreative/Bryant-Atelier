// Renders Open Graph cards (1200x630) and app icons with the real fonts.
// Run: node scripts/make-og.cjs   (needs Playwright; writes into src/assets/og and src/assets/icons)
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const root = path.resolve(__dirname, "..");
const projects = JSON.parse(fs.readFileSync(path.join(root, "src/_data/projects.json"))).filter((p) => !p.hidden);
const font = (f) => "file://" + path.join(root, "src/assets/fonts", f);
const css = `
@font-face{font-family:IS;src:url(${font("instrument-sans-latin-wght-normal.woff2")});font-weight:400 700}
@font-face{font-family:FR;src:url(${font("fraunces-latin-wght-italic.woff2")});font-style:italic;font-weight:300 600}
*{margin:0;box-sizing:border-box} body{width:1200px;height:630px;background:#1a1a1a;color:#f5f1e8;font-family:IS;overflow:hidden;position:relative}
.bg{position:absolute;inset:0;background-size:cover;background-position:center}
.sc{position:absolute;inset:0;background:linear-gradient(90deg,rgba(26,26,26,.92) 0%,rgba(26,26,26,.55) 55%,rgba(26,26,26,.2) 100%)}
.c{position:absolute;inset:0;padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between}
.wm{display:inline-flex;flex-direction:column;align-items:center;align-self:flex-start}
.wm b{font-weight:600;font-size:40px;letter-spacing:.12em} .wm i{font-style:normal;font-weight:500;font-size:13px;letter-spacing:.8em;margin-top:9px;margin-right:-.8em}
h1{font-weight:500;font-size:68px;line-height:1.02;letter-spacing:-.04em;max-width:15ch}
h1 em{font-family:FR;font-weight:400;display:block}
.m{font-size:22px;opacity:.8;margin-top:18px}
.badge{display:inline-block;background:#6b2737;padding:8px 16px;border-radius:99px;font-size:16px;letter-spacing:.1em;text-transform:uppercase;font-weight:600;margin-bottom:22px}
.rule{position:absolute;left:0;bottom:0;height:8px;width:100%;background:#6b2737}`;
const still = (f) => "file://" + path.join(root, "src/_img/work", f);
const page = (bg, inner) => `<html><head><style>${css}</style></head><body><div class="bg" style="background-image:url('${bg}')"></div><div class="sc"></div><div class="c"><span class="wm"><b>BRYANT</b><i>ATELIER</i></span><div>${inner}</div></div><div class="rule"></div></body></html>`;

(async () => {
  const outOg = path.join(root, "src/assets/og"), outIc = path.join(root, "src/assets/icons");
  fs.mkdirSync(outOg, { recursive: true });
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  const tmp = path.join(root, "scripts", ".og-tmp.html");
  const load = async (html) => { fs.writeFileSync(tmp, html); await p.goto("file://" + tmp, { waitUntil: "load" }); };
  const shoot = async (html, file) => { await load(html); await p.evaluate(() => document.fonts.ready); await p.screenshot({ path: file, type: "jpeg", quality: 84 }); };
  await shoot(page(still("flowing-wood.jpg"), `<h1>Stories with roots. <em>Content that works.</em></h1><p class="m">Brand films, documentary, content and ads. Byron Bay to the Gold Coast.</p>`), path.join(outOg, "og-default.jpg"));
  for (const pr of projects) {
    await shoot(page(still(pr.still), `${pr.badge ? `<span class="badge">${pr.badge}</span>` : ""}<h1><em>${pr.title}</em></h1><p class="m">${pr.type}</p>`), path.join(outOg, pr.slug + ".jpg"));
  }
  // Icons
  const icon = (s) => `<html><head><style>${css} body{width:${s}px;height:${s}px;display:grid;place-items:center;background:#1a1a1a}
    .i{font-weight:600;font-size:${s * 0.62}px;letter-spacing:0;line-height:1;margin-top:-${s * 0.04}px} .u{position:absolute;left:30%;right:30%;bottom:${s * 0.17}px;height:${Math.max(2, s * 0.035)}px;background:#6b2737}</style></head><body><span class="i">B</span><span class="u"></span></body></html>`;
  for (const [s, name] of [[32, "favicon-32.png"], [180, "apple-touch-icon.png"], [512, "icon-512.png"]]) {
    await p.setViewportSize({ width: s, height: s });
    await load(icon(s)); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(outIc, name) });
  }
  await b.close();
  fs.unlinkSync(tmp);
  console.log("og + icons done:", projects.length + 1, "cards");
})();
