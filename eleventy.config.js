import Image from "@11ty/eleventy-img";
import path from "node:path";

const IMG_SRC = "src/_img";

const pending = [];
// Kick off generation (awaited at the end of the build) and return metadata synchronously,
// so the shortcode is safe inside ordinary Nunjucks loops.
function imageMeta(src, options) {
  const full = path.join(IMG_SRC, src);
  pending.push(Image(full, options));
  return Image.statsSync(full, options);
}

// Responsive <picture> with AVIF/WebP/JPEG, lazy by default.
function picture(src, alt, sizes = "100vw", widths = [480, 800, 1200, 1920], opts = {}) {
  if (alt === undefined) throw new Error(`Missing alt for ${src}`);
  const meta = imageMeta(src, {
    widths,
    formats: ["avif", "webp", "jpeg"],
    outputDir: "_site/img/",
    urlPath: "/img/",
    sharpAvifOptions: { quality: 55 },
    sharpWebpOptions: { quality: 72 },
    sharpJpegOptions: { quality: 76, progressive: true },
  });
  return Image.generateHTML(meta, {
    alt,
    sizes,
    loading: opts.eager ? "eager" : "lazy",
    decoding: "async",
    ...(opts.eager ? { fetchpriority: "high" } : {}),
    ...(opts.class ? { class: opts.class } : {}),
  });
}

// Single URL (e.g. hero poster, OG image, lightbox full-size).
function imageUrl(src, width = 1600, format = "jpeg") {
  const meta = imageMeta(src, {
    widths: [width],
    formats: [format],
    outputDir: "_site/img/",
    urlPath: "/img/",
    sharpJpegOptions: { quality: 78, progressive: true },
    sharpWebpOptions: { quality: 74 },
  });
  return meta[format][0].url;
}

const CATEGORY_LABELS = {
  "brand-films": "Brand Films",
  documentary: "Documentary",
  "content-ads": "Content & Ads",
};

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });

  eleventyConfig.addShortcode("picture", picture);
  eleventyConfig.addShortcode("imageUrl", imageUrl);
  eleventyConfig.on("eleventy.after", async () => { await Promise.all(pending.splice(0)); });

  // Visible review markers so nothing unapproved ships unnoticed.
  eleventyConfig.addShortcode("draft", () => `<span class="flag flag--draft">Draft</span>`);
  eleventyConfig.addFilter("flags", (str = "") =>
    String(str).replace(/\[(ADD|CHECK|DRAFT)([^\]]*)\]/g, (m) => `<span class="flag">${m}</span>`)
  );

  eleventyConfig.addFilter("categoryLabel", (c) => CATEGORY_LABELS[c] || c);
  eleventyConfig.addFilter("categoryLabels", (cs = []) => cs.map((c) => CATEGORY_LABELS[c] || c).join(", "));
  eleventyConfig.addFilter("visible", (projects) => projects.filter((p) => !p.hidden));
  eleventyConfig.addFilter("originals", (projects) => projects.filter((p) => p.original && !p.hidden));
  eleventyConfig.addFilter("bySlugs", (projects, slugs) => slugs.map((s) => projects.find((p) => p.slug === s)).filter(Boolean));
  eleventyConfig.addFilter("findSlug", (projects, slug) => projects.find((p) => p.slug === slug));
  eleventyConfig.addFilter("range1", (n) => Array.from({ length: n }, (_, i) => String(i + 1).padStart(2, "0")));
  eleventyConfig.addFilter("json", (v) => JSON.stringify(v));
  eleventyConfig.addFilter("absUrl", (p, base) => new URL(p, base).href);
  eleventyConfig.addFilter("nextProject", (projects, slug) => {
    const list = projects.filter((p) => !p.hidden);
    const i = list.findIndex((p) => p.slug === slug);
    return list[(i + 1) % list.length];
  });
  eleventyConfig.addGlobalData("year", () => new Date().getFullYear());
  eleventyConfig.addGlobalData("categories", Object.entries(CATEGORY_LABELS).map(([key, label]) => ({ key, label })));

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
