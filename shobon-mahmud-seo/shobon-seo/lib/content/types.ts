/**
 * Structured content types. Every page template renders from these,
 * so adding a new service / industry / location / case study / post
 * is just adding an object to the matching file in /lib/content.
 */

export type FAQ = { q: string; a: string };
export type Point = { title: string; body: string };

export type Service = {
  slug: string;
  name: string;
  /** One line for cards and meta descriptions (≤ 160 chars). */
  summary: string;
  seoTitle: string;
  heroTitle: string;
  heroIntro: string;
  problem: string[];
  covers: Point[];
  process: Point[];
  deliverables: string[];
  commonProblems: string[];
  whoFor: string[];
  useCases: Point[];
  faqs: FAQ[];
  relatedIndustries: string[];
  relatedPosts?: string[];
  /** Contextual CTA line shown mid-page. */
  ctaLine: string;
};

export type Industry = {
  slug: string;
  name: string;
  summary: string;
  seoTitle: string;
  heroTitle: string;
  heroIntro: string;
  landscape: string[];
  challenges: Point[];
  /** Buyer journey → the searches that happen at each stage. */
  journey: { stage: string; intent: string; examples: string[] }[];
  opportunities: Point[];
  exampleStrategy: string[];
  relatedServices: string[];
  faqs: FAQ[];
};

export type Location = {
  slug: string;
  city: string;
  region: string;
  country: string;
  seoTitle: string;
  heroTitle: string;
  intro: string;
  /** Map center */
  coords: { lat: number; lng: number };
  context: string[];
  industries: string[];
  problems: Point[];
  opportunities: Point[];
  relatedServices: string[];
  faqs: FAQ[];
};

export type PortfolioFilter =
  | "saas"
  | "legal-tech"
  | "health-tech"
  | "logistics"
  | "design"
  | "ecommerce"
  | "local";

export type CaseStudy = {
  slug: string;
  /** Real client name, or a description if under NDA. */
  client: string;
  industry: string; // industry slug
  filter: PortfolioFilter;
  title: string;
  outcome: string;
  summary: string;
  services: string[]; // service slugs
  timeline: string;
  date: string;
  featured: boolean;
  situation: string;
  challenge: string;
  research: Point[];
  strategy: string[];
  execution: string[];
  results: { label: string; value: string }[];
  /** Optional monthly series (e.g. organic clicks from GSC) for the results chart. */
  chart?: { label: string; value: number }[];
  chartLabel?: string;
  takeaway: string;
  /** Optional path in /public for a screenshot. */
  image?: string;
  /** True while the case study still contains placeholder data. */
  draft: boolean;
};

export type Block =
  | { type: "heading"; level: 1 | 2 | 3 | 4 | 5 | 6; text: string; id?: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string };

export type Post = {
  status?: "draft" | "published";
  slug: string;
  title: string;
  seoTitle?: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  category: string; // category slug
  tags: string[];
  featured?: boolean;
  image?: string;
  sections: { id: string; heading: string; blocks: Block[] }[];
  faqs?: FAQ[];
  relatedServices: string[];
  relatedIndustries: string[];
};

export type BlogCategory = { slug: string; name: string; description: string };
