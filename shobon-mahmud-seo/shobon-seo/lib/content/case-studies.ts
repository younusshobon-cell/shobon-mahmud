import type { CaseStudy, PortfolioFilter } from "./types";

/** Complete illustrative strategies. No client performance data or measured outcome is implied. */
export const portfolioFilters: { value: "all" | PortfolioFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "saas", label: "SaaS" },
  { value: "legal-tech", label: "Legal Tech" },
  { value: "health-tech", label: "Health Tech" },
  { value: "logistics", label: "Logistics" },
  { value: "design", label: "Design" },
  { value: "ecommerce", label: "E-commerce" },

];

export const caseStudies: CaseStudy[] = [
  {
    "slug": "saas-organic-growth",
    "client": "B2B SaaS acquisition scenario",
    "industry": "saas",
    "filter": "saas",
    "title": "SaaS SEO: build pages for buyers ready to compare",
    "outcome": "Suggested direction: Prioritise honest comparison and integration pages over broad awareness content.",
    "summary": "A SaaS search strategy that connects product-led pages, technical access and demo intent.",
    "services": [
      "technical-seo",
      "content-seo",
      "competitor-research",
      "on-page-seo"
    ],
    "timeline": "Scope-dependent",
    "date": "2026-09-29",
    "featured": true,
    "situation": "A product-led software site has strong feature documentation but little visibility for comparison and integration searches.",
    "challenge": "Blog posts attract broad readers while product pages are buried; the site needs a clearer route from search query to demo.",
    "research": [
      {
        "title": "Keyword research",
        "body": "Group alternative, comparison and integration queries by intent and product fit."
      },
      {
        "title": "Competitor review",
        "body": "Review competing product pages for evidence, pricing clarity and feature depth."
      },
      {
        "title": "SERP analysis",
        "body": "Check search results for page types and how buyers phrase evaluation questions."
      },
      {
        "title": "Technical review",
        "body": "Audit indexation, rendered content, canonicals and internal links to commercial pages."
      }
    ],
    "strategy": [
      "Prioritise honest comparison and integration pages over broad awareness content.",
      "Link guides and documentation to relevant use-case and demo pages.",
      "Fix crawl and index blockers before scaling new templates."
    ],
    "execution": [
      "Write page briefs with buyer questions, product proof and next actions.",
      "Add contextual internal links from high-visibility guides.",
      "Monitor commercial page groups and demo events in analytics."
    ],
    "results": [
      {
        "label": "Primary signal",
        "value": "Non-branded clicks"
      },
      {
        "label": "Conversion signal",
        "value": "Qualified demo requests"
      },
      {
        "label": "Quality signal",
        "value": "Indexation of key pages"
      },
      {
        "label": "Review focus",
        "value": "Engagement on comparison pages"
      }
    ],
    "takeaway": "The strongest SaaS SEO opportunity may be a small, high-intent query set rather than the largest keyword list.",
    "draft": false
  },
  {
    "slug": "health-tech-seo",
    "client": "Health technology content scenario",
    "industry": "health-tech",
    "filter": "health-tech",
    "title": "Health tech SEO: clarity, evidence and findable pages",
    "outcome": "Suggested direction: Build separate pathways for each audience with clear page purpose.",
    "summary": "An SEO framework for expert-reviewed health technology content and distinct audiences.",
    "services": [
      "content-seo",
      "technical-seo",
      "keyword-research"
    ],
    "timeline": "Scope-dependent",
    "date": "2026-09-29",
    "featured": true,
    "situation": "A health technology site serves clinicians and business buyers, but both journeys are mixed into broad product pages.",
    "challenge": "Sensitive topics require accurate, reviewed information; generic articles do not explain the technology or who it helps.",
    "research": [
      {
        "title": "Keyword research",
        "body": "Separate clinician, operations and patient-adjacent search needs."
      },
      {
        "title": "Competitor review",
        "body": "Compare credible specialist sites and how they support claims."
      },
      {
        "title": "SERP analysis",
        "body": "Identify where search results expect definitions, workflows or product details."
      },
      {
        "title": "Technical review",
        "body": "Check duplicate topics, indexing and links between evidence and product pages."
      }
    ],
    "strategy": [
      "Build separate pathways for each audience with clear page purpose.",
      "Route factual claims through qualified subject-matter review.",
      "Use technology and workflow terms that match how buyers evaluate solutions."
    ],
    "execution": [
      "Create reviewed solution pages with author and update information.",
      "Connect educational resources to relevant product use cases.",
      "Track organic enquiries by audience and page group."
    ],
    "results": [
      {
        "label": "Primary signal",
        "value": "Relevant non-branded visibility"
      },
      {
        "label": "Conversion signal",
        "value": "Qualified product enquiries"
      },
      {
        "label": "Quality signal",
        "value": "Reviewed content coverage"
      },
      {
        "label": "Review focus",
        "value": "Engagement with solution pages"
      }
    ],
    "takeaway": "In high-trust categories, accuracy and a clear audience matter more than publishing at volume.",
    "draft": false
  },
  {
    "slug": "logistics-seo",
    "client": "Logistics service-area scenario",
    "industry": "logistics",
    "filter": "logistics",
    "title": "Logistics SEO: service and route search architecture",
    "outcome": "Suggested direction: Create distinct service pages before expanding route coverage.",
    "summary": "A logistics SEO approach for real service coverage, freight queries and quote-ready traffic.",
    "services": [
      "local-seo",
      "on-page-seo",
      "technical-seo"
    ],
    "timeline": "Scope-dependent",
    "date": "2026-09-29",
    "featured": true,
    "situation": "A provider handles several freight services and corridors, but one generic page tries to serve every need.",
    "challenge": "Users search by shipment type, route and operational constraint; generic location copy cannot answer those details.",
    "research": [
      {
        "title": "Keyword research",
        "body": "Cluster queries by freight service, shipment type and active corridor."
      },
      {
        "title": "Competitor review",
        "body": "Review competitors that rank for route and quote searches."
      },
      {
        "title": "SERP analysis",
        "body": "Compare map and organic results for operational intent."
      },
      {
        "title": "Technical review",
        "body": "Audit duplicated location pages and navigation depth."
      }
    ],
    "strategy": [
      "Create distinct service pages before expanding route coverage.",
      "Publish corridor pages only where the business can supply useful operational detail.",
      "Make quote requirements, coverage and contact paths easy to understand."
    ],
    "execution": [
      "Draft service and active-lane page templates with unique details.",
      "Improve navigation from service pages to supported corridors.",
      "Measure quote enquiries by originating page and geography."
    ],
    "results": [
      {
        "label": "Primary signal",
        "value": "Relevant service clicks"
      },
      {
        "label": "Conversion signal",
        "value": "Qualified quote requests"
      },
      {
        "label": "Quality signal",
        "value": "Active route page visibility"
      },
      {
        "label": "Review focus",
        "value": "Local profile actions"
      }
    ],
    "takeaway": "Useful operational specifics distinguish logistics pages from swapped-city templates.",
    "draft": false
  },
  {
    "slug": "legal-tech-seo",
    "client": "Legal software evaluation scenario",
    "industry": "legal-tech",
    "filter": "legal-tech",
    "title": "Legal tech SEO: precise pages for expert buyers",
    "outcome": "Suggested direction: Create workflow pages tied to real product capabilities.",
    "summary": "A search strategy for legal technology teams targeting workflow and software evaluation queries.",
    "services": [
      "keyword-research",
      "on-page-seo",
      "content-seo"
    ],
    "timeline": "Scope-dependent",
    "date": "2026-09-29",
    "featured": false,
    "situation": "A legal software product supports multiple practice workflows, but its site describes features in internal product language.",
    "challenge": "Potential buyers search for a specific task and jurisdictional context; broad claims cannot answer their evaluation questions.",
    "research": [
      {
        "title": "Keyword research",
        "body": "Map workflow, integration and comparison terms used by legal teams."
      },
      {
        "title": "Competitor review",
        "body": "Review competing software and publisher pages for gaps."
      },
      {
        "title": "SERP analysis",
        "body": "Check whether results call for product pages or neutral explainers."
      },
      {
        "title": "Technical review",
        "body": "Audit thin templates, duplicate headings and internal links."
      }
    ],
    "strategy": [
      "Create workflow pages tied to real product capabilities.",
      "Use accurate terminology and qualified review for legal assertions.",
      "Connect educational pages to product demonstrations without overstating claims."
    ],
    "execution": [
      "Build briefs for practice workflows and integration pages.",
      "Review content accuracy with a legal subject expert.",
      "Track relevant organic visits and qualified demos by page group."
    ],
    "results": [
      {
        "label": "Primary signal",
        "value": "Workflow query visibility"
      },
      {
        "label": "Conversion signal",
        "value": "Qualified demos"
      },
      {
        "label": "Quality signal",
        "value": "Reviewed page coverage"
      },
      {
        "label": "Review focus",
        "value": "Product-page engagement"
      }
    ],
    "takeaway": "Specific and accurate workflow explanations beat vague promises in legal technology search.",
    "draft": false
  },
  {
    "slug": "design-studio-seo",
    "client": "Design studio discovery scenario",
    "industry": "design",
    "filter": "design",
    "title": "Design agency SEO: make case studies discoverable",
    "outcome": "Suggested direction: Turn selected projects into clear narratives with context and process.",
    "summary": "A search approach for visual portfolios that need useful text, service clarity and fast pages.",
    "services": [
      "on-page-seo",
      "technical-seo",
      "off-page-seo"
    ],
    "timeline": "Scope-dependent",
    "date": "2026-09-29",
    "featured": false,
    "situation": "A design studio shows excellent visuals, but its project pages offer little context for searchers or prospective clients.",
    "challenge": "Search engines and buyers need to understand the brief, role, industry and outcome; oversized assets also slow browsing.",
    "research": [
      {
        "title": "Keyword research",
        "body": "Identify service and industry terms that match the studio portfolio."
      },
      {
        "title": "Competitor review",
        "body": "Review agencies ranking with detailed case studies."
      },
      {
        "title": "SERP analysis",
        "body": "Check search results for agency selection and project intent."
      },
      {
        "title": "Technical review",
        "body": "Audit image weight, alt text, headings and internal links."
      }
    ],
    "strategy": [
      "Turn selected projects into clear narratives with context and process.",
      "Create specialist service pages for distinct offerings.",
      "Optimise media delivery without reducing visual quality."
    ],
    "execution": [
      "Write project summaries that explain the problem and contribution.",
      "Link relevant case studies from service pages.",
      "Measure enquiry starts and organic entry to service and work pages."
    ],
    "results": [
      {
        "label": "Primary signal",
        "value": "Qualified project enquiries"
      },
      {
        "label": "Conversion signal",
        "value": "Service page clicks"
      },
      {
        "label": "Quality signal",
        "value": "Case study engagement"
      },
      {
        "label": "Review focus",
        "value": "Page experience"
      }
    ],
    "takeaway": "Great visuals become more useful when a prospective buyer can understand the work behind them.",
    "draft": false
  },
  {
    "slug": "ecommerce-category-seo",
    "client": "E-commerce catalogue scenario",
    "industry": "ecommerce",
    "filter": "ecommerce",
    "title": "E-commerce SEO: category structure and crawl control",
    "outcome": "Suggested direction: Make high-value categories distinct and helpful.",
    "summary": "An online-store SEO framework for useful categories, filtered URLs and product discovery.",
    "services": [
      "ecommerce-seo",
      "technical-seo",
      "keyword-research"
    ],
    "timeline": "Scope-dependent",
    "date": "2026-09-29",
    "featured": false,
    "situation": "A store has a growing catalogue and many filter combinations but inconsistent category copy and internal linking.",
    "challenge": "Low-value URLs consume crawl attention while the core category pages fail to answer product-selection questions.",
    "research": [
      {
        "title": "Keyword research",
        "body": "Map product attributes to category and buying-guide searches."
      },
      {
        "title": "Competitor review",
        "body": "Review competing category pages and filters for usefulness."
      },
      {
        "title": "SERP analysis",
        "body": "Identify when results favour categories, products or comparison content."
      },
      {
        "title": "Technical review",
        "body": "Audit facets, canonical signals, indexation and product availability handling."
      }
    ],
    "strategy": [
      "Make high-value categories distinct and helpful.",
      "Control indexation of faceted URLs based on real search demand.",
      "Connect buying guides to categories and relevant products."
    ],
    "execution": [
      "Rewrite key category templates with selection guidance.",
      "Define crawl rules for filters and discontinued items.",
      "Track organic revenue and product discovery by landing category."
    ],
    "results": [
      {
        "label": "Primary signal",
        "value": "Relevant category clicks"
      },
      {
        "label": "Conversion signal",
        "value": "Organic transactions"
      },
      {
        "label": "Quality signal",
        "value": "Indexed category coverage"
      },
      {
        "label": "Review focus",
        "value": "Filtered URL quality"
      }
    ],
    "takeaway": "A clean catalogue structure can make buying easier for people and crawling clearer for search engines.",
    "draft": false
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);

export const caseStudiesFor = (opts: { industry?: string; service?: string; exclude?: string; limit?: number }) => {
  const list = caseStudies.filter((c) => c.slug !== opts.exclude && (!opts.industry || c.industry === opts.industry) && (!opts.service || c.services.includes(opts.service)));
  return list.slice(0, opts.limit ?? 3);
};
