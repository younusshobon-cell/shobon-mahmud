# Shobon Mahmud — SEO Portfolio

A production-ready personal SEO website built with **Next.js 16 (App Router), TypeScript, Tailwind CSS v4 and Motion**, designed for deployment on **Vercel**.

Every page is statically generated, every content type is structured data, and the site is built to demonstrate the SEO practices it describes: semantic HTML, one H1 per page, canonicals, breadcrumbs, JSON-LD, XML sitemap, deliberate internal linking and fast Core Web Vitals.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
npm run build && npm run start
```

Requires Node.js 20.9+.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel → **Add New Project** → import the repo. Framework preset: Next.js (auto-detected). No build settings to change.
3. Add environment variables (Project → Settings → Environment Variables) — at minimum `NEXT_PUBLIC_SITE_URL`.
4. Deploy, then connect your domain.

`robots.txt` automatically blocks indexing on Vercel **preview** deployments and allows it on **production**.

---

## ✅ Before launch — replace these placeholders

Anything in `[SQUARE BRACKETS]` shows on the site with a dashed outline so it can't be missed.

| What | Where |
|---|---|
| Site URL, contact email | `.env.local` / Vercel env vars |
| Social profile URLs (LinkedIn etc.) | `lib/site.ts` → `socials` |
| Base location | `lib/site.ts` → `baseLocation` |
| Homepage metrics (`[XX]`) | `lib/site.ts` → `trustMetrics` |
| Career timeline | `lib/site.ts` → `experience` |
| Tools list — **delete any you don't use** | `lib/site.ts` → `tools` |
| Your story + photo caption | `app/about/page.tsx` |
| **All 6 case studies** (currently drafts) | `lib/content/case-studies.ts` |
| Budget ranges on the contact form | `components/forms/ContactForm.tsx` |
| Dates in privacy/terms (have them reviewed) | `app/privacy`, `app/terms` |
| Starter blog articles — review, add your own examples | `lib/content/blog.ts` |

**Case studies:** each has `draft: true`. Drafts show a notice, are `noindex`, and stay out of the sitemap. Fill in real data, add monthly Search Console values to `chart` for the results graph, then set `draft: false`. Under NDA? Describe the client instead of naming them.

---

## Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical domain, e.g. `https://www.yourdomain.com` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public email (hidden when empty) |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Contact form delivery via [Resend](https://resend.com) (server-only) |
| `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY` | Optional. Maps Embed API key — restrict by HTTP referrer. Keyless embed used otherwise |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity project ID |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console HTML-tag token |

Analytics only load when their IDs are set, after the page becomes interactive. Secrets never reach the browser.

---

## Adding content

All content lives in `lib/content/` as typed objects. Add an object → the page, sitemap entry, internal links and schema are generated automatically.

- **Blog post** → `blog.ts`. Body is structured blocks (`p`, `h3`, `ul`, `ol`, `quote`); the table of contents and reading time are generated. Optional `faqs` render with FAQPage schema. Set `image` to a file in `/public` for a featured image.
- **Case study** → `case-studies.ts`
- **Service** → `services.ts`
- **Industry** → `industries.ts`
- **Location** → `locations.ts` (every location needs genuinely local content — no copy-paste city pages)

Pagination (`/blog/page/2` …) activates automatically after 9 posts. Category pages exist for every category and are `noindex` until they have a post.

To move to MDX or a headless CMS later, keep the types in `lib/content/types.ts` and swap the data source — templates don't change.

## Photos

In `assets/images/`, referenced via `lib/images.ts` with alt text. The Wolfpixel logo and the GUCCI print were cropped out of two photos so no third-party branding appears. Replace any file with the same name to swap a photo. `public/og-default.jpg` is the social share image.

---

## Structure

```
app/                  routes (App Router)
  services/[slug]     industries/[slug]   locations/[slug]
  portfolio/[slug]    blog/[slug]         blog/category/[category]   blog/page/[page]
  api/contact         sitemap.ts          robots.ts
components/
  layout/   Navbar, Footer, Logo, SocialLinks, Analytics
  sections/ homepage sections (Hero, GrowthSystem, ProcessTimeline…)
  cards/    Service, Industry, Location, CaseStudy, Blog, Metric
  content/  PageHero, Section, FAQ, PointGrid, ContextCta, ResultsChart
  related/  RelatedCaseStudies, RelatedArticles, RelatedServices…
  blog/     BlogIndex, BlogSearch, TableOfContents, ArticleBody
  seo/      JsonLd, Breadcrumbs
  maps/     LocalMap (lazy-loaded)
lib/
  site.ts   ← personal details & placeholders
  seo.ts    metadata builder     schema.ts  JSON-LD builders
  content/  all structured content
```

## Design system

Tokens are in `app/globals.css` (`@theme`). The palette comes from two things in Shobon's world: the **navy** of his studio portrait (dark sections) and the **blue of a search-result link** (the single accent). One typeface family (Geist, bundled locally — no external font requests).

## SEO implementation notes

- Schema: `Person` + `WebSite` sitewide; `BreadcrumbList` on every inner page; `BlogPosting`, `FAQPage` (only where FAQs are visible), `Service`, `ProfilePage`. No `LocalBusiness` — location pages describe remote work, not offices.
- Portfolio filtering is client-side, but every case study is server-rendered in the HTML, so all remain crawlable.
- FAQs use native `<details>` — accessible, crawlable, zero JS.
- Motion respects `prefers-reduced-motion`. The first page load is never hidden behind an animation (protects LCP).
