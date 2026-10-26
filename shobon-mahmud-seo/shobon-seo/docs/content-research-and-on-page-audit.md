# Content research and on-page audit — 27 October 2026

## Scope and evidence

Reviewed the repository content and 50 prerendered public pages, including English, Arabic and Bangla locations, hubs, services, industries, case studies, five articles and legal/contact pages. Automated checks inspect emitted HTML, not just source templates. Results and page-level titles, headings, descriptions and canonicals are in `on-page-audit-results.json`.

This is an implementation/content audit, not a Search Console indexing audit. No private query, backlink, conversion or indexing data was available. Public search results are a dated sample, not a claim about fixed Google positions in every city. The LinkedIn screenshots were reviewed as third-party claims; their proposed numeric originality thresholds were not used as a ranking model. Main-content five-word-shingle overlap was used only to identify pages for editorial review, not as a Google quality score.

## Keyword and competitor briefs

| Existing URL / primary topic | Intent and reader | Observed competing formats, tone and length | Editorial response |
| --- | --- | --- | --- |
| technical-seo-audit / technical SEO audit | Informational how-to; owner or marketer preparing a development brief | Ahrefs: instructional, tool-assisted, beginner-to-practitioner, advertised 25-minute read. Search results also include long checklists and downloadable templates. | Preserve the audit steps; add evidence collection, a specific service-page diagnosis, implementation acceptance criteria and performance triage. Avoid an unprioritised list of warnings. |
| saas-keyword-research-by-intent / SaaS keyword research | Informational process; founder or content lead mapping demand to pages | OnSaaS: seven-step buyer-intent roadmap with direct practitioner tone. Ahrefs SaaS guide: broader product-led strategy, advertised 19-minute read. | Narrow to keyword-to-page planning; add a fictional scheduling product example, unsupported-capability exclusions, SERP worksheet and product-review brief. No invented keyword volumes. |
| google-business-profile-optimization / Google Business Profile optimisation | Practical profile management; eligible local business owner | BrightLocal: modular learning hub. Spokk: field-by-field long guide, short answer and takeaways, owner-oriented checklist tone. | Start with eligibility and customer contact, then show a service-area mismatch example, real-photo guidance and maintenance routine. Verify platform requirements against Google rather than competitor speculation. |
| internal-linking-strategy / internal linking strategy | Informational audit and implementation; editor or site owner | Ahrefs: actionable explanatory guide, advertised 17-minute read. Semrush: structured audit guide, advertised 14-minute read. Both include architecture and orphan-page issues. | Explain page roles, use this site's actual guide-to-service journey, add an orphan check and release validation. Avoid link quotas and guaranteed indexing. |
| ai-overviews-search-visibility / AI Overviews SEO | Informational adaptation; owner assessing traffic and content changes | Evergreen Media: explanatory strategic guide, advertised 10-minute read, statistics-led framing. Google: technical and editorial guidance rather than a sales pitch. | Separate access, content usefulness and attribution; add a diagnostic workflow and evidence-based service-page example. No citation guarantee or invented causal claims. |

Read-time figures above are publisher labels, not independently measured word counts. Where no reliable length was displayed, no numeric length is asserted. Our articles are scoped to their reader's task rather than made longer than competitors for its own sake. Search volume and keyword difficulty were not available and are not fabricated.

### Research pages opened

- https://ahrefs.com/blog/technical-seo-audit/
- https://ahrefs.com/blog/saas-seo/
- https://www.onsaas.me/blog/saas-keyword-research
- https://www.brightlocal.com/learn/google-business-profile/optimization/
- https://www.spokk.io/blog/google-business-profile-optimization
- https://ahrefs.com/blog/internal-links-for-seo/
- https://www.semrush.com/blog/internal-links/
- https://www.evergreen.media/en/guide/google-ai-overviews/
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/crawling-indexing/canonicalization
- https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- https://support.google.com/business/answer/7091
- https://support.google.com/business/answer/3038177

Competitors informed the format and audience assessment. Technical recommendations were checked against primary Google documentation. New examples and workflows were written for this site rather than copied from competitors.

## Findings and changes

- **Brand vs acquisition intent:** shared personal branding already largely used Digital Growth Partner. Made the home introduction and portrait role explicit. Kept SEO services focused on their named work. Location titles/headings had drifted to broad growth language despite their SEO-consultant URLs; restored consultant positioning in English and matching translated headings. Industry titles/headings now name their specific SEO audience. No page URLs changed.
- **Service prioritisation:** Digital Growth Strategy is first in the source collection, so the services hub and shared lists follow the same order. Added a strategy-first choice to the service selection guide.
- **Contact friction:** added WhatsApp beside the main enquiry CTA in the home hero, services hub, shared final CTA and contact page; retained the contact form and footer email. Explicit label, 48px minimum button height, safe new-tab behaviour and editable prefilled text. No automatic message is sent and no obstructive popup is introduced.
- **Article depth:** expanded all five articles with specific workflows, clearly labelled illustrative scenarios and implementation checks. Kept original section anchors, author identity and original publication dates; set substantive-update dates. Sources and limitations remain visible. Added mobile contents navigation and descriptive image alternatives.
- **Thin category archives:** each of the five filters currently holds only one article. Removed the repeated general-blog FAQ from category pages, kept useful navigation, set those thin filters to noindex/follow and removed them from the XML sitemap. The threshold automatically permits indexing at two articles; this is an editorial rule for this small site, not a Google requirement. Individual articles remain indexable.
- **Distinct intent:** service detail pages explain work and scope; industries explain buyer journeys; locations explain market/coverage; case studies retain the supplied project evidence; hubs help compare options; articles teach tasks; contact starts an enquiry. No generic keyword paragraphs were added to legal or contact pages.
- **E-E-A-T:** retained real author links and supplied case-study material, added official references and clear example limitations. No new credentials, client results, endorsements, reviews or first-hand testing claims were invented. E-E-A-T is not a score that this change can certify as 'highest'.

## Verification and remaining limits

The rendered audit checks one H1 per page, nonempty metadata, duplicate titles/descriptions/H1s, canonical presence, image alt presence, JSON-LD parsing, internal destinations and local fragment targets. It also flags substantial main-content overlap for manual review. It cannot prove Google indexing, ranking, real-world authority, live Core Web Vitals or completed WhatsApp conversations. The form backend was not changed. A WhatsApp click opens a draft; the visitor must send it.

Production build, TypeScript, rich-blog and CMS validation are run after implementation. Image files are resized and compressed WebP; responsive Next Image markup reserves dimensions. Final deployed runtime checks are recorded separately. Search Console follow-up should inspect the main commercial pages and updated articles after recrawl, and compare qualified enquiries rather than assuming a ranking gain.

## Final image direction and generation prompts

The first tactile paper illustrations were rejected by the owner. The final assets use a charcoal/white/lime editorial direction, generated with the built-in image generation tool and then compressed with Sharp to 1200 × 675 WebP. They are conceptual covers, not data visualisations or client evidence. All five are used on their matching article and blog card; 16:9 card containers avoid cropping the typography.

Shared prompt: Premium editorial blog cover, landscape 16:9; flat Swiss graphic design; near-black charcoal background; warm white typography; electric lime accents; subtle fine grid; oversized title on the left; eyebrow “SHOBON MAHMUD / FIELD NOTES”; generous safe margins; no paper-cut style, people, 3D, stock photos, fabricated numeric data or logos.

| Asset under public/images/blog/ | Title and visual prompt |
| --- | --- |
| technical-seo-audit.webp | TECHNICAL SEO / AUDIT; abstract x-ray of website structure with fine page outlines, one lime access path and a check symbol. |
| saas-keyword-research-by-intent.webp | SAAS KEYWORD / RESEARCH; query cards converging on a software page with one highlighted route. |
| google-business-profile-optimization.webp | LOCAL SEARCH / VISIBILITY; overhead street-grid concept, location marker and profile card; no real map labels. |
| internal-linking-strategy.webp | INTERNAL / LINKING; asymmetric constellation of page outlines, thin routes and selected lime paths. |
| ai-overviews-search-visibility.webp | AI SEARCH / VISIBILITY; answer card connected to supporting documents, one source highlighted. |

Final files range from approximately 23–48 KB before responsive image delivery. Original generated PNGs are not shipped.

### Completed verification

- Production-domain build and TypeScript: passed.
- Rich-blog round-trip/rendering and CMS validation suites: passed.
- 50 public HTTP routes: 200.
- Five WebP assets, WhatsApp destination, service ordering, article update dates, indexable articles and category sitemap exclusions: passed.
- Legacy /work, /portfolio and /locations/dubai: still 404.
- Rendered audit: no missing/duplicate title, description or H1; no unresolved internal destination, missing local fragment or invalid JSON-LD.
- Browser screenshot verification could not run because the Chromium download returned an invalid archive. Responsive markup and image sizing were checked, but no visual-browser pass is claimed.
