import type { CaseStudy, PortfolioFilter } from "./types";

/**
 * ============================================================
 *  CASE STUDIES — ALL ENTRIES BELOW ARE DRAFT TEMPLATES.
 *  Replace every [BRACKETED] value with your real project data,
 *  then set `draft: false`. Draft studies show a visible notice
 *  on the site and are excluded from the sitemap.
 *
 *  If a client is under NDA, describe them instead of naming
 *  them, e.g. "Series A legal tech platform (US)".
 *  Chart data: paste monthly values from Search Console into `chart`.
 * ============================================================
 */

export const portfolioFilters: { value: "all" | PortfolioFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "saas", label: "SaaS" },
  { value: "legal-tech", label: "Legal Tech" },
  { value: "health-tech", label: "Health Tech" },
  { value: "logistics", label: "Logistics" },
  { value: "design", label: "Design" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "local", label: "Local SEO" },
];

const pendingResults = [
  { label: "Organic clicks", value: "[+XX%]" },
  { label: "Keywords in top 10", value: "[XX → XX]" },
  { label: "Organic leads / conversions", value: "[+XX%]" },
  { label: "Timeframe", value: "[XX months]" },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "saas-organic-growth",
    client: "[CLIENT NAME] — B2B SaaS platform",
    industry: "saas",
    filter: "saas",
    title: "Turning a product-led SaaS site into an organic acquisition channel",
    outcome: "[ADD ONE-SENTENCE OUTCOME, e.g. 'Organic demo requests grew X% in Y months.']",
    summary: "Technical SEO, bottom-of-funnel pages and internal linking for a SaaS product with strong adoption but weak organic visibility.",
    services: ["technical-seo", "content-seo", "competitor-research", "on-page-seo"],
    timeline: "[XX months]",
    date: "2025-01-01",
    featured: true,
    situation: "[REPLACE] Describe the starting point: product, market, team, and what organic search looked like before you started (traffic level, main pages, how leads came in).",
    challenge: "[REPLACE] What specifically blocked growth? e.g. JavaScript rendering issues, no comparison or alternative pages, blog content disconnected from the product.",
    research: [
      { title: "Keyword research", body: "[REPLACE] What you learned about how buyers search — which intents were missing." },
      { title: "Competitor research", body: "[REPLACE] Who ranked for the valuable searches and why." },
      { title: "SERP analysis", body: "[REPLACE] Formats and page types Google rewarded." },
      { title: "Technical analysis", body: "[REPLACE] Crawl, index and rendering findings." },
    ],
    strategy: ["[REPLACE] Strategic decision 1 and why", "[REPLACE] Strategic decision 2 and why", "[REPLACE] Strategic decision 3 and why"],
    execution: ["[REPLACE] What was implemented", "[REPLACE] What was implemented", "[REPLACE] What was implemented"],
    results: pendingResults,
    chartLabel: "Monthly organic clicks (Google Search Console)",
    takeaway: "[REPLACE] The one insight that made this work — something another SaaS team could learn from.",
    draft: true,
  },
  {
    slug: "health-tech-seo",
    client: "[CLIENT NAME] — Health technology company",
    industry: "health-tech",
    filter: "health-tech",
    title: "Building trust signals and search visibility for a health tech platform",
    outcome: "[ADD ONE-SENTENCE OUTCOME]",
    summary: "Content architecture, expert authorship and technical fixes for a health technology company in a high-trust category.",
    services: ["content-seo", "technical-seo", "keyword-research"],
    timeline: "[XX months]",
    date: "2024-09-01",
    featured: true,
    situation: "[REPLACE] Starting point and audience (clinicians, patients, or both).",
    challenge: "[REPLACE] Main obstacles — e.g. missing expertise signals, B2B and patient content mixed together.",
    research: [
      { title: "Keyword research", body: "[REPLACE]" },
      { title: "Competitor research", body: "[REPLACE]" },
      { title: "SERP analysis", body: "[REPLACE]" },
      { title: "Technical analysis", body: "[REPLACE]" },
    ],
    strategy: ["[REPLACE]", "[REPLACE]", "[REPLACE]"],
    execution: ["[REPLACE]", "[REPLACE]", "[REPLACE]"],
    results: pendingResults,
    chartLabel: "Monthly organic clicks (Google Search Console)",
    takeaway: "[REPLACE]",
    draft: true,
  },
  {
    slug: "logistics-seo",
    client: "[CLIENT NAME] — Logistics provider",
    industry: "logistics",
    filter: "logistics",
    title: "Scaling service and lane pages for a logistics company",
    outcome: "[ADD ONE-SENTENCE OUTCOME]",
    summary: "Service architecture, location pages and local SEO for a logistics business competing for quote-ready searches.",
    services: ["local-seo", "on-page-seo", "technical-seo"],
    timeline: "[XX months]",
    date: "2024-06-01",
    featured: true,
    situation: "[REPLACE]",
    challenge: "[REPLACE]",
    research: [
      { title: "Keyword research", body: "[REPLACE]" },
      { title: "Competitor research", body: "[REPLACE]" },
      { title: "SERP analysis", body: "[REPLACE]" },
      { title: "Technical analysis", body: "[REPLACE]" },
    ],
    strategy: ["[REPLACE]", "[REPLACE]", "[REPLACE]"],
    execution: ["[REPLACE]", "[REPLACE]", "[REPLACE]"],
    results: pendingResults,
    chartLabel: "Monthly organic clicks (Google Search Console)",
    takeaway: "[REPLACE]",
    draft: true,
  },
  {
    slug: "legal-tech-seo",
    client: "[CLIENT NAME] — Legal technology platform",
    industry: "legal-tech",
    filter: "legal-tech",
    title: "Precision content strategy for a legal tech product",
    outcome: "[ADD ONE-SENTENCE OUTCOME]",
    summary: "Keyword research, practice-area pages and on-page optimisation for legal software sold to careful, expert buyers.",
    services: ["keyword-research", "on-page-seo", "content-seo"],
    timeline: "[XX months]",
    date: "2024-03-01",
    featured: false,
    situation: "[REPLACE]",
    challenge: "[REPLACE]",
    research: [
      { title: "Keyword research", body: "[REPLACE]" },
      { title: "Competitor research", body: "[REPLACE]" },
      { title: "SERP analysis", body: "[REPLACE]" },
      { title: "Technical analysis", body: "[REPLACE]" },
    ],
    strategy: ["[REPLACE]", "[REPLACE]", "[REPLACE]"],
    execution: ["[REPLACE]", "[REPLACE]", "[REPLACE]"],
    results: pendingResults,
    chartLabel: "Monthly organic clicks (Google Search Console)",
    takeaway: "[REPLACE]",
    draft: true,
  },
  {
    slug: "design-studio-seo",
    client: "[CLIENT NAME] — Design studio",
    industry: "design",
    filter: "design",
    title: "Making a portfolio-led design site findable",
    outcome: "[ADD ONE-SENTENCE OUTCOME]",
    summary: "Written case studies, specialist service pages and performance fixes for a visually led creative website.",
    services: ["on-page-seo", "technical-seo", "off-page-seo"],
    timeline: "[XX months]",
    date: "2023-11-01",
    featured: false,
    situation: "[REPLACE]",
    challenge: "[REPLACE]",
    research: [
      { title: "Keyword research", body: "[REPLACE]" },
      { title: "Competitor research", body: "[REPLACE]" },
      { title: "SERP analysis", body: "[REPLACE]" },
      { title: "Technical analysis", body: "[REPLACE]" },
    ],
    strategy: ["[REPLACE]", "[REPLACE]", "[REPLACE]"],
    execution: ["[REPLACE]", "[REPLACE]", "[REPLACE]"],
    results: pendingResults,
    chartLabel: "Monthly organic clicks (Google Search Console)",
    takeaway: "[REPLACE]",
    draft: true,
  },
  {
    slug: "ecommerce-category-seo",
    client: "[CLIENT NAME] — Online store",
    industry: "ecommerce",
    filter: "ecommerce",
    title: "Category restructuring and crawl control for an online store",
    outcome: "[ADD ONE-SENTENCE OUTCOME]",
    summary: "Category architecture, faceted navigation rules and product schema for a growing e-commerce catalogue.",
    services: ["ecommerce-seo", "technical-seo", "keyword-research"],
    timeline: "[XX months]",
    date: "2023-08-01",
    featured: false,
    situation: "[REPLACE]",
    challenge: "[REPLACE]",
    research: [
      { title: "Keyword research", body: "[REPLACE]" },
      { title: "Competitor research", body: "[REPLACE]" },
      { title: "SERP analysis", body: "[REPLACE]" },
      { title: "Technical analysis", body: "[REPLACE]" },
    ],
    strategy: ["[REPLACE]", "[REPLACE]", "[REPLACE]"],
    execution: ["[REPLACE]", "[REPLACE]", "[REPLACE]"],
    results: pendingResults,
    chartLabel: "Monthly organic clicks (Google Search Console)",
    takeaway: "[REPLACE]",
    draft: true,
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);

export const caseStudiesFor = (opts: { industry?: string; service?: string; exclude?: string; limit?: number }) => {
  const list = caseStudies.filter(
    (c) =>
      c.slug !== opts.exclude &&
      (!opts.industry || c.industry === opts.industry) &&
      (!opts.service || c.services.includes(opts.service)),
  );
  return list.slice(0, opts.limit ?? 3);
};
