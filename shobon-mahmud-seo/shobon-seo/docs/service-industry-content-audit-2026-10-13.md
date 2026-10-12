# Service and industry content audit — 13 October 2026

Scope: originally all 10 service detail pages, all 8 industry detail pages, and both hub pages. The user subsequently requested deletion of three services; technical, on-page and off-page SEO were then consolidated into the requested `/services/Holistic-SEO` master page. Final coverage is 5 service detail pages, 8 industry detail pages and both hub pages in `younusshobon-cell/shobon-mahmud`. This is a content and implementation audit, not a ranking forecast or Search Console performance assessment.

## Findings and completed fixes

- **Repeated delivery content:** Replaced repeated service process content with discipline-specific delivery guidance. The consolidated master page now provides six connected steps; the other retained services have relevant individual workflows.
- **Missing decision detail:** Added tailored priorities, illustrative workflows, measurement and preparation guidance to every detail page. Examples are presented as illustrations, not invented client results.
- **Generic industry FAQ expansion:** Removed the template-generated questions on industry detail pages. Each now renders six topic-specific questions, including three newly authored questions about the industry's buying or delivery constraints.
- **Service scoping gaps:** Each service page now includes scope/cost questions and exclusions, alongside its existing service-specific questions. All five final service pages render ten FAQs.
- **Unqualified SEO claims:** Corrected Business Profile eligibility, review claims, fixed backlink timelines, subdomain/subfolder assumptions, health-content review intervals and unsupported category/conversion generalisations.
- **Related-link relevance:** Replaced the repeated first-four-services selection with explicit related-service maps. Local-service industry content now links to the home-service offering. The hubs connect buyers to all live service and industry detail pages.
- **Snippet quality:** Rewrote all 13 final detail-page descriptions and both hub descriptions. Shortened the home-service title and made three service H1s name the service clearly. Updated hub titles and removed the deleted international SEO offering from hub copy.
- **Navigation and trust:** Added crawlable section navigation on detail pages, visible measurement and preparation sections, and an About link identifying the consultant leading the work.
- **Structured data:** Preserved existing WebPage/CollectionPage, Service and Breadcrumb entities. Enabled FAQPage markup using the same questions and answers rendered visibly. This markup does not promise a Google FAQ rich result.
- **Readability:** Long industry search examples now wrap instead of being truncated. Related-service grids now use the available card count, avoiding a four-column layout when only one, two or three services are relevant. Content stays server-rendered and available without JavaScript.
- **Motion:** Added progressive hero entrances and staggered point/journey reveals on service and industry routes, plus lightweight card accent lines, hover/focus movement and FAQ-open animation. Retained location route motion. No scroll listener, animation library or runtime dependency was added. OS reduced-motion changes cancel active Web Animations; cleanup disconnects observers and removes route-specific styling.

## Page-by-page results

Main-content word counts include headings, page navigation, related cards and visible FAQ text. They exclude shared navigation/footer and script payloads. Counts document delivery; they are not targets or ranking scores.

| Page | Main-content words | Visible FAQs | Main correction / addition |
| --- | ---: | ---: | --- |
| [/services](https://shobon-mahmud.vercel.app/services) | 996 | 8 | Removed the deleted international service from the description; added linked service-selection and scoping guidance. |
| [/industries](https://shobon-mahmud.vercel.app/industries) | 901 | 8 | Added an audience-led selection guide and connections to service delivery pages. |
| [/services/content-seo](https://shobon-mahmud.vercel.app/services/content-seo) | 1,498 | 10 | Added inventory, evidence, editorial ownership and refresh decisions; clarified that topic clusters do not guarantee rankings. |
| [/services/local-seo](https://shobon-mahmud.vercel.app/services/local-seo) | 1,402 | 10 | Corrected service-area eligibility and review-factor claims; added truthful coverage and qualified-call measurement. |
| [/services/seo-for-home-service-providers](https://shobon-mahmud.vercel.app/services/seo-for-home-service-providers) | 1,704 | 10 | Made the H1 name the service; expanded urgent versus planned jobs, operational coverage and qualified-job reporting. |
| [/services/ecommerce-seo](https://shobon-mahmud.vercel.app/services/ecommerce-seo) | 1,261 | 10 | Clarified crawl blocking versus noindex; added catalogue decision rules and category/product revenue measurement. |
| [/industries/saas](https://shobon-mahmud.vercel.app/industries/saas) | 1,320 | 6 | Expanded use cases, fact-checked comparisons and activation measurement; removed unsupported conversion superiority claims. |
| [/industries/legal-tech](https://shobon-mahmud.vercel.app/industries/legal-tech) | 1,040 | 6 | Separated software workflows from legal guidance; added jurisdiction, security and reviewer requirements. |
| [/industries/health-tech](https://shobon-mahmud.vercel.app/industries/health-tech) | 1,132 | 6 | Separated provider and patient intent; added clinical review, verified trust information and privacy-aware measurement. |
| [/industries/logistics](https://shobon-mahmud.vercel.app/industries/logistics) | 1,030 | 6 | Expanded lane coverage, quote requirements, operations ownership and service-fit reporting. |
| [/industries/design](https://shobon-mahmud.vercel.app/industries/design) | 1,060 | 6 | Added approved case-study context, concept-versus-client distinction, media guidance and relevant project-enquiry reporting. |
| [/industries/ecommerce](https://shobon-mahmud.vercel.app/industries/ecommerce) | 1,116 | 6 | Separated shopping, product and guidance intent; added verified product information and stock-aware revenue review. |
| [/industries/technology](https://shobon-mahmud.vercel.app/industries/technology) | 1,096 | 6 | Corrected blanket subdomain/subfolder claims; added versioned examples and connected documentation journeys. |
| [/industries/local-services](https://shobon-mahmud.vercel.app/industries/local-services) | 1,099 | 6 | Corrected map visibility and review advice; added actual availability, coverage and qualified booking measurement. |
| [/services/Holistic-SEO](https://shobon-mahmud.vercel.app/services/Holistic-SEO) | 3,041 | 10 | Combined technical, on-page and off-page delivery in 19 major sections; added contrasting gold CTAs and a connected six-step process. |

## Requested service removals

| Removed page | Final behaviour |
| --- | --- |
| `/services/seo-audits` | Permanently redirects (HTTP 308) to `/services` |
| `/services/keyword-research` | Permanently redirects (HTTP 308) to `/services` |
| `/services/competitor-research` | Permanently redirects (HTTP 308) to `/services` |

Removed the three records from the service catalogue and their stale FAQ data. They no longer generate detail pages or appear in the service sitemap. Updated related-service references in industry, location, Arabic location, blog and case-study data to relevant retained services. Removed obsolete links from the service-selection guide and native footer; updated the homepage technical-SEO CTA and visitor-goal destination.

## Holistic SEO consolidation

Canonical route: `/services/Holistic-SEO`, using the exact URL case requested by the user.

| Previous page | Final behaviour |
| --- | --- |
| `/services/technical-seo` | HTTP 308 to `/services/Holistic-SEO` |
| `/services/on-page-seo` | HTTP 308 to `/services/Holistic-SEO` |
| `/services/off-page-seo` | HTTP 308 to `/services/Holistic-SEO` |

The master page preserves the three discipline-specific coverage sets and brings their work into a single plan. Its 19 main sections cover the hero, connected foundations, underlying problem, each discipline, a prominent contact prompt, six-step process, deliverables, practical workflow, measurement, fit, trust, illustrative situations, scope, industries, FAQs, specialised related services and final contact CTA.

Four primary CTAs all point to `/contact`: “Discuss my SEO growth plan”, “Review my website’s priorities”, “Plan my SEO implementation” and “Talk through my SEO priorities”. Buttons use gold `#FFE36E` with navy `#0F1A2B` text (calculated contrast 13.69:1). The page has a navy hero, a blue mid-page contact band, desktop sticky section navigation, mobile wrapping navigation, native FAQs and reduced-motion support. Trust copy explains evidence and responsibility without inventing testimonials or client performance.

Updated every former discipline link in service, industry, location, Arabic location, blog and case-study data, the homepage CTA, native footer, Dhaka page and visitor-goal destination. Removed stale standalone service FAQs and catalogue records. The three old discipline pages no longer generate or appear in the service sitemap.

## Validation

- Production build and TypeScript checks passed; all 73 final static pages generated successfully.
- HTTP checks passed for all 15 final target pages on the local production server.
- Every target page has exactly one H1, a unique title and description, a self-referencing canonical using the configured origin, and no duplicate element IDs.
- All section-navigation anchors resolve. No empty `#` links were found in target main content.
- All 31 distinct internal destinations linked from target main content returned HTTP 200.
- Breadcrumb markup exists on all targets; Service entities exist on the 13 detail pages. Visible FAQ count, question text and answer text match FAQ schema exactly.
- Motion lifecycle tests passed for hubs, detail pages and existing location paths: staggered one-time reveals, changing reduced-motion preference, observer/listener cleanup and route isolation.
- Service-removal runtime tests passed: all three URLs return 308, no removed URL is generated or listed in the sitemap/hub, all related-service references are valid, and all five final service URLs return 200. The three consolidated URLs redirect to the master with no loop. Its three pillar anchors, deliverables, measurement, process and FAQ anchors are present; all four primary CTA destinations are `/contact`.
- CMS regression and sitemap tests passed. The deleted international SEO route remains redirected to the service hub.
- React review: new content components remain server components; browser logic stays in the existing client motion component. Lists have stable keys, decorative elements are hidden from assistive technology, section links are native anchors, and FAQ interaction remains native `details`/`summary`.

## Verification limits and measurement follow-up

Automated visual browser testing could not run because the Chromium download returned an invalid archive. Desktop/mobile appearance, overflow and visual animation quality therefore still need browser review; HTML and motion lifecycle checks are not a substitute for that review. No Core Web Vitals or Lighthouse score is claimed.

Local canonical assertions use the application's local configured origin. Production canonical and social URLs depend on the existing deployment's public site URL configuration; confirm them on the deployed build. No deployment secrets or environment configuration were changed.

After deployment, use Search Console and first-party enquiry/order data to record the affected page groups, publication date and baseline. Compare relevant queries and qualified actions over a meaningful period, accounting for seasonality and other changes. Indexing, rankings, rich results and lead volume are not guaranteed by content expansion or schema.

## Guidance used for factual corrections

- [Google: helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google: writing useful meta descriptions](https://developers.google.com/search/docs/appearance/snippet)
- [Google Business Profile: local ranking factors](https://support.google.com/business/answer/7091)
- [Google Business Profile: genuine review requests](https://support.google.com/business/answer/3474122)
- [Google: crawl access and robots/noindex instructions](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)
