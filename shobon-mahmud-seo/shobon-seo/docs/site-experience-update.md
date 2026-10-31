# Site experience update — 31 October 2026

## Scope
- Shared, responsive landing-page hero for service, industry and location pages; service-specific inclusions, industry context and localized CTA labels.
- Contact-page and WhatsApp hero actions on 38 rendered pages, including the hubs, About, blog indexes and localized locations.
- About portrait treatment, editorial blog treatment, case-study/services/industries hub refresh.
- Existing full page content, SEO metadata, canonicals and route slugs retained. Local SEO component and its page-specific stylesheet unchanged. Shared footer redesigned site-wide as requested.
- Layered footer invitation, contact links, service/industry navigation; localized footer invitation refreshed.
- Redesigned final and contextual CTA panels. Contact form backend unchanged.
- Selected client proof added to Holistic SEO, Dhaka and Arabic location pages using the existing curated Wolfpixel → AMA → ARHQ collection.

## Five free tools
At `/free-tools`: metadata, headings, links/anchors, image accessibility and JSON-LD syntax checkers. Visitors provide a page URL (for resolving relative links) and HTML. Parsing takes place in an inert browser template; markup is never inserted into the visible document, executed or submitted by the tools. Results are cleared when input changes. Example, reset, input validation, 2 MB input limit and plain-text report download included.

These tools inspect supplied markup; they do not fetch websites, check live HTTP statuses, measure speed, validate Google rich-result eligibility or claim ranking/traffic scores. Empty image alt is distinguished from missing alt. Character-length checks are explicitly editorial guidance. External Rich Results Test link provides a separate eligibility check. Free tools page is indexable and included in the pages sitemap.

## Verification
- TypeScript and clean production build pass.
- CMS suite passes.
- Five-tool tests with a DOM implementation cover valid/broken metadata, noindex, invalid canonical protocols, skipped/empty headings, missing/encoded fragments, missing versus decorative alt, nested/broken JSON-LD, invalid URL, oversized input, plain-text input and inert script handling.
- Rendered checks: 38 heroes each have Contact + WhatsApp, one H1 and valid fragment links. Local SEO retains its own layout.
- Production-server HTTP smoke checks pass for free tools, service, industry, English and Arabic locations, and sitemap; free tools URL is present in the sitemap.
- Browser visual/interaction QA unavailable: Chromium Headless Shell installation failed with an invalid/truncated download. Responsive behavior was checked in source and generated markup, not through browser screenshots.
