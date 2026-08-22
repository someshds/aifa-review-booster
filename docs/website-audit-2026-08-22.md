# Website audit — AI Fusion Automations

**Site:** [tools.aifusionautomations.com](https://tools.aifusionautomations.com/)  
**Repo:** `someshds/aifa-website` (GitHub Pages)  
**Date:** 22 August 2026  
**Scope:** Full pass across 212 HTML pages, live HTTP checks, sitemap vs file tree, nav/footer, tracking, legal pages, conversion paths, accessibility, and performance.

---

## Executive summary

The site is a real marketing engine: a polished dark-theme homepage, a full products hub, 49 industry landing pages, free tools, and a high-volume AI news desk. Brand, proof (founder walkthroughs, case study), and booking infrastructure are in place.

Operational SEO and conversion plumbing have drifted. The live sitemap lists **103 URLs** while the generator would emit **203**. **None of the 101 news articles** are in `sitemap.xml`. The two newest product pages (`/products/ai-agents.html`, `/products/chatbots.html`) are also missing. Fifty news CTAs point at `/audit`, which **404s**. Global nav still advertises June events. Tracking (GTM, Meta Pixel, GoHighLevel chat) loads without a consent banner, which conflicts with the privacy policy and UK PECR / UK GDPR.

**Overall: 61 / 100.** Strong content and offer; weak discovery, stale conversion paths, and a consent gap.

| Area | Score | One-line verdict |
|---|---|---|
| Information architecture | 72 | Clear hubs (products, services, news, tools) with leftover stubs and dual calendars |
| SEO | 48 | Canonicals exist on most pages; sitemap is stale; key URLs unlisted; titles/descriptions often over-length |
| Content | 70 | News desk was excellent, then stopped 7 July; industry pages are thin templates |
| Conversion | 55 | Booking widget works; `/audit` 404s; tools hub is a redirect; events are expired |
| Accessibility | 58 | Lang/viewport mostly present; no skip links; many inputs lack labels; gradient H1s |
| Performance | 62 | HTML is light; self-hosted MP4s (14–21 MB) and ~324 MB of news media will hurt |
| Security / privacy | 42 | HTTPS on; no security headers; no consent before GTM/Pixel/chat |
| Legal | 64 | Privacy, terms, earnings disclaimer exist; cookie section does not match behaviour |

---

## What was tested

- Static scan of **212 HTML files** (207 real pages, 5 client-side redirect stubs).
- Diff of `sitemap.xml` against `scripts/regenerate_sitemap.py`.
- Live HTTP for homepage, products, news, booking, robots, sitemap, apex/www redirects, a fake 404, `/audit`, CSS/JS, and sample social URLs.
- Manual review of homepage, pricing, privacy, nav/footer JS, strategy-call, industry templates, and news CTAs.

Method notes: GitHub Pages returns `access-control-allow-origin: *` on every asset. There is no custom `404.html`. Client-side `meta refresh` stubs are **not** HTTP 301s.

---

## Critical (fix this week)

### 1. Sitemap is missing 101 news articles and 2 product pages

Live `sitemap.xml` has **103** URLs. The repo generator produces **203**.

**Not in the sitemap (and live):**

- All **101** files under `/news/*.html` except the index
- `/products/ai-agents.html`
- `/products/chatbots.html`

**Still in the sitemap (should not be, per the generator):**

- `/ai-agents-v1.0.html`
- `/essentials-v1.0.html`
- `/growth-v1.0.html`
- `/dominate-v1.0.html`
- `/boxleaguepro-lite.html`

Those five legacy URLs are `index, follow` and compete with canonical product/pricing pages.

**Fix:** Update `EXCLUDE_FILES` to skip `book.html` and `includes/comparison-table.html`, then run `python3 scripts/regenerate_sitemap.py`. Add `noindex` (or HTTP redirects) on `*-v1.0.html` and `boxleaguepro-lite.html`.

### 2. `/audit` is a 404 — 50 news CTAs dead

Live: `GET /audit` → **404** (default GitHub Pages page).

Every scanned “Book free audit” button on news articles points at `https://tools.aifusionautomations.com/audit`. That is the highest-volume conversion leak on the site.

**Fix:** Add `audit.html` as a redirect stub to `/strategy-call.html` (same pattern as `book.html`), **and** replace the 50 hrefs with `/strategy-call.html`. A GitHub Pages `404.html` will not create `/audit`.

### 3. No cookie / marketing consent before GTM, Meta Pixel, and chat

Observed:

- GTM `GTM-5JSZNZ4Q` on **28** pages (homepage defers 2s after `load`; pricing fires Pixel immediately).
- Meta Pixel `630094975903061` on homepage and pricing.
- `js/aifa-nav.js` injects the GoHighLevel chat widget (`668394bfc5fec605b13596ff`) on almost every page, including first paint, not “only when the visitor interacts”.

`privacy-policy-aifa.html` §8 describes these tags and tells users to use browser settings / GA opt-out. That is not PECR-compliant consent for non-essential cookies. Chat is **not** gated on interaction.

**Fix:** Add a consent platform (CookieYes, Cookiebot, or GTM Consent Mode v2). Block GTM/Pixel/chat until analytics + marketing are granted. Update the privacy policy to match. Keep the chat skip list (`strategy-call`, `book`, snapshot pages) as-is.

### 4. Custom 404 is the GitHub Pages error page

Unknown URLs (including `/audit`) show “Page not found · GitHub Pages” with no AIFA nav, no booking CTA, no search.

**Fix:** Add a branded `404.html` at repo root with nav, search/news, tools, and Book a Call.

---

## High

### 5. Apex brand domain is a 301 into a `tools.` GitHub Pages host

- `https://aifusionautomations.com/` → 301 → `https://tools.aifusionautomations.com`
- `https://www.aifusionautomations.com/` → same (Squarespace)
- HTTP on tools. upgrades to HTTPS (good)

The public brand URL therefore looks like a tools subdomain. Combined with no `og:image` on the homepage, social shares of the company URL will look thin.

**Fix:** Either make `www` / apex the GitHub Pages canonical (or Cloudflare) and 301 `tools.` → apex, or keep `tools.` but add a homepage OG image and Organization schema that state the brand clearly.

### 6. Two live booking calendars

| Calendar | Uses |
|---|---|
| `link.aifusionautomations.com/widget/booking/gf7HbRtDlW2EbG4YR1Mm` (30-min strategy) | Homepage, products, `strategy-call.html`, some blog CTAs |
| `api.leadconnectorhq.com/widget/booking/BROmkGCfiVZy4Kgg0sWi` (older) | Blog nav/CTAs on at least 5 posts, including mixed use on `blog/validate-startup-idea-3-minutes.html` |

`products/automations.html` has **no** booking URL at all.

**Fix:** One calendar ID everywhere. Point leftover blog nav CTAs at `/strategy-call.html`.

### 7. Global nav and footer still sell June events

`js/aifa-nav.js` (nav + footer) still links:

- “AI Office Hours - 23 June”
- “AI Workflow Webinar - 25 June”

Office Hours URL still 200s; webinar URL 302s to a replay-style slug. Dates are ~two months old as of this audit.

**Fix:** Move past events to `/webinars/` (replay already exists) and replace nav with the next live event — or drop the Events menu until there is one.

### 8. Tools Hub in the nav is a redirect stub

Free Tools → “Tools Hub” goes to `/tools-index.html`, which is `noindex` + JS/meta refresh to `/`. Users see a flash of “This page has moved.”

**Fix:** Point the nav item at `/#tools` or build a real `/tools/` index that lists Idea Validator, ROI calculator, Review Booster, Analyser, League Scheduler.

### 9. Legacy pages are still indexable

These are full pages, `robots: index, follow`, and currently **in** the sitemap:

- `ai-agents-v1.0.html` (canonical points at itself, not `/products/ai-agents.html`)
- `essentials-v1.0.html`, `growth-v1.0.html`, `dominate-v1.0.html`
- `boxleaguepro-lite.html`

`pricing-v1.0.html` / `roi-calculator.html` / `privacy-policy.html` / `book.html` / `tools-index.html` correctly `noindex`.

**Fix:** `noindex` + canonical to the replacement URL on every v1.0 / lite page. Prefer a real 301 via Cloudflare if you add it.

### 10. Homepage has no Open Graph image and no JSON-LD

`index.html` has title, description, canonical, og:title/description/url — **no `og:image`**, no `twitter:card`, no Organization / LocalBusiness / WebSite schema. 96 non-redirect pages lack `og:image`.

News articles generally do this well. The homepage and product pages do not.

**Fix:** Add `/og-default.png` (1200×630) and a small include (or one-liner) on every marketing page. Add Organization + WebSite JSON-LD on the homepage (East Sussex, `grant@aifusionautomations.com`, sameAs social profiles).

### 11. YouTube footer link 404s

Footer social: `https://www.youtube.com/@AIFusionAutomations` → **404**.  
`https://www.youtube.com/@AIFusion` returns 200 (may or may not be the company channel — verify before swapping).

Homepage HTML still has placeholder `#` social links; `aifa-nav.js` replaces the footer at runtime, so the placeholders are hidden but remain in source.

### 12. News desk stopped 7 July 2026

Cadence was ~5 articles/day through 7 July, then **nothing for 6+ weeks**. `/news/` still claims a daily brief. July 7 pieces still say things like “August 2 is 26 days away” (now in the past).

**Fix:** Either resume the brief, or change the hub copy to “AI news archive” and add an “as of” date. At minimum, stop linking `/audit`.

---

## Medium

### SEO hygiene

- **Titles:** 172 pages over ~60 characters (news headlines + “ | AI Fusion Automations”). Acceptable for news; trim product/service titles where possible.
- **Descriptions:** 174 over 160 characters. 7 missing: ROI calculator v2, five `/videos/*/index.html` slide decks, and `includes/comparison-table.html`.
- **H1:** Five video slide decks have no H1 (they are 1920×1080 canvases, not articles). They are still in the sitemap.
- **Canonical missing:** `blog/gohighlevel-ai-employee-guide.html` plus the video decks and the include fragment.
- **`includes/comparison-table.html` is a public URL** (live 200). It is a partial, not a page. Disallow in `robots.txt` and exclude from the generator.
- **Blog outlier:** `blog/gohighlevel-ai-employee-guide.html` is a light-theme one-off, no canonical, OG image on `database.blotato.io` (third-party CDN you do not control).
- **Homepage OG description** (“Reduce costs by up to 60%”) is more aggressive than the meta description. Align copy with `earnings-disclaimer.html`.

### Tracking coverage is uneven

| Tag | Pages |
|---|---|
| GTM snippet in HTML | 28 |
| `aifa-analytics.js` | 28 |
| `aifa-nav.js` (and therefore chat widget) | 161 |
| Meta Pixel | 2 |

Most news and service pages never send GTM `dataLayer` events even if chat loads. Conversion reporting will under-count.

### Accessibility

- **0 skip links** site-wide.
- **84 pages** have no `<main>`.
- Gradient H1s use `-webkit-text-fill-color: transparent` — some contrast checkers score these as failures.
- Unlabelled inputs: BoxLeague Pro (18), League Scheduler (16), Review Booster (7), CRM lead forms (6), Idea Validator (3), Analyser (4). Placeholders are not labels.
- GTM noscript iframes lack `title` (9 pages).
- News later than ~21 June include nav CSS but **not** `aifa-nav.js` (~50 articles) — inconsistent chrome vs earlier news.

### Performance

Repo is **~494 MB**. Biggest buckets:

- `news/` 326 MB (images ~120 MB, audio ~204 MB)
- `videos/` 135 MB (seven founder MP4s at 12–21 MB each, served from GitHub Pages)
- `tiles/` 27 MB

Homepage hero MP4s will dominate LCP on slow links. News `index.html` is **174 KB** of HTML. Video slide pages pull **Tailwind from `cdn.tailwindcss.com`** (not for production).

GitHub Pages `cache-control: max-age=600` on HTML, CSS, and JS. Fine for HTML; hashed/query-busted CSS/JS should be much longer (needs Cloudflare or similar).

**No security headers** on 200 HTML (no HSTS, CSP, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`). GitHub Pages cannot set these; put Cloudflare (or similar) in front.

### Information architecture / UX

- Products dropdown omits Chatbots (the hub page includes it; footer Services includes it).
- Products hub copy says “Eight integrated products” while the grid also includes AI Agents and Chatbots.
- Double nav flash: many pages ship a local `<nav class="site-nav">` which `aifa-nav.js` then removes and replaces.
- `strategy-call.html` is `noindex` — reasonable for a widget page; keep `/#book-a-call` and the nav CTA pointing here.
- Industry pages (~21 KB each, 49 of them) share the same FAQ skeleton with noun-swaps (“my plumbers business”). Google can treat these as doorway pages if they stay thin.

### Claims vs legal

Homepage: “Reduce costs by up to 60%, respond to customers in under 2 minutes”. Pricing FAQ: OS “typically pays for itself within the first month”. Earnings disclaimer says results are not guaranteed. Keep the disclaimer linked near those claims, or soften the numbers.

Pricing meta: “from £97/mo”; visible tiers also show **£497/mo**. Confirm the entry price is still true.

Privacy policy does not mention ICO registration number, Companies House number, or VAT (optional but expected for a UK B2B site). Footer has two customer-service numbers; confirm both are current.

---

## Low

- `target=_blank` without `rel="noopener"` on 13 links.
- Heading-level skips on 3 pages.
- No `llms.txt` / `ai.txt` if you want LLM crawlers to quote a preferred summary.
- No web app manifest.
- `robots.txt` only disallows `/index.html.bak` (file is not in the tree). Add `/includes/`.
- Client-side redirects (`book.html`, `privacy-policy.html`, etc.) pass link equity poorly compared with HTTP 301s.
- BoxLeague Pro is a large client-side app (`143 KB` HTML) with password fields; treat auth as a product security review, not just a marketing page.
- `news/index.html` search input has no associated `<label>` (placeholder only).

---

## What is working

- HTTPS, apex/www → tools. 301, HTTP → HTTPS.
- `robots.txt` allows `/` and points at the sitemap.
- Most marketing pages have `lang="en"`, charset, viewport, favicon, canonical, and a unique title.
- Product pages have FAQ JSON-LD.
- News articles have `og:image`, Twitter cards, audio, and a consistent article template.
- Global nav/footer injection is the right idea (one place to fix Events, social, legal).
- Redirect stubs for superseded URLs (`privacy-policy.html` → `privacy-policy-aifa.html`) are better than serving duplicates.
- Booking page (`strategy-call.html`) is focused, noindex, and uses the current 30-minute calendar.
- Legal trio exists: privacy, terms, earnings disclaimer.
- Live spot-checks of `/`, `/pricing.html`, `/products/`, `/products/ai-agents.html`, `/products/chatbots.html`, `/news/`, `/blog/`, `/strategy-call.html` all returned **200**.

---

## Priority roadmap

### This week

1. Redirect `/audit` → `/strategy-call.html` and rewrite the 50 news buttons.
2. Regenerate `sitemap.xml`; `noindex` v1.0 / lite pages; exclude `includes/` and `book.html`.
3. Add branded `404.html`.
4. Pull expired June events out of `aifa-nav.js`; fix YouTube URL; point Tools Hub at a real tools list.
5. Add homepage `og:image` + Organization JSON-LD.

### This month

6. Consent Mode / cookie banner; load GTM, Pixel, and chat only after grant; align privacy §8.
7. One booking calendar ID; add CTA on `products/automations.html`.
8. Put Cloudflare (or similar) in front: security headers, HTML 301s, long-cache for `/css` `/js` `/img`.
9. Decide news: resume, or relabel as archive and date-stamp July 7 pieces.
10. Label form fields on tools (ROI, Idea Validator, Review Booster, CRM lead forms).

### Later

11. Collapse industry pages into fewer, genuinely distinct guides — or add unique proof per trade.
12. Host founder videos on YouTube / Cloudflare Stream; keep posters on GitHub Pages.
13. Replace Tailwind-CDN slide decks with static CSS if they stay public.
14. Unify templates so every page gets `aifa-nav.js` + `aifa-analytics.js` + default OG image.
15. Resolve `tools.` vs apex as the canonical brand host.

---

## Evidence snapshot (22 Aug 2026)

| Check | Result |
|---|---|
| HTML files | 212 (207 content, 5 redirect stubs) |
| Live sitemap URLs | 103 |
| Generator would emit | 203 |
| News articles on disk | 101 |
| News articles in sitemap | 0 |
| Unique broken internal destination | `/audit` (50 links) |
| Live `/audit` | HTTP 404 |
| Live unknown URL | GitHub Pages default 404 |
| Security headers on 200 HTML | None |
| GTM / Pixel / chat consent UI | None |
| Last news article | 7 July 2026 |
| YouTube `@AIFusionAutomations` | 404 |
| Repo size | ~494 MB |

Raw counts: `docs/audit-summary-2026-08-22.json`.
