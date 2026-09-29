/**
 * ============================================================
 *  SITE CONFIG — the single place to edit personal details.
 *  Anything in [SQUARE BRACKETS] is a placeholder: replace it
 *  with real information or remove it. Never invent numbers.
 * ============================================================
 */

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Shobon Mahmud",
  jobTitle: "SEO Specialist",
  shortTagline: "SEO Specialist helping businesses grow through search.",
  description:
    "Shobon Mahmud is an SEO specialist who helps SaaS, technology, health tech, legal tech, logistics, design, e-commerce and local businesses turn search visibility into qualified traffic, leads and revenue.",
  url: resolveSiteUrl(),
  locale: "en_US",
  /** Public email. Set NEXT_PUBLIC_CONTACT_EMAIL in .env.local / Vercel. Hidden when empty. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  /** Where you're based. Shown on About/Contact. Leave "" to hide. */
  baseLocation: "[ADD YOUR CITY, COUNTRY]",
  /**
   * Social profiles. Only non-empty URLs are rendered and added to Person schema `sameAs`.
   * TODO: add your real profile URLs.
   */
  socials: {
    linkedin: "",
    x: "",
    github: "",
    medium: "",
  } as Record<string, string>,
} as const;

export const socialLabels: Record<string, string> = {
  linkedin: "LinkedIn",
  x: "X (Twitter)",
  github: "GitHub",
  medium: "Medium",
};

export function activeSocials() {
  return Object.entries(siteConfig.socials)
    .filter(([, href]) => Boolean(href))
    .map(([key, href]) => ({ key, href, label: socialLabels[key] ?? key }));
}

/**
 * Homepage trust metrics.
 * Replace each [XX] with a real, defensible number. Keep `note` honest
 * (e.g. "across 2023–2025 client work, GSC data").
 */
export type Metric = { value: string; label: string; note?: string };

export const trustMetrics: Metric[] = [
  { value: "[XX]+", label: "SEO projects supported", note: "[ADD SOURCE / PERIOD]" },
  { value: "[XX]%", label: "Median organic traffic growth", note: "[ADD SOURCE / PERIOD]" },
  { value: "[XX]+", label: "Keywords moved to page one", note: "[ADD SOURCE / PERIOD]" },
  { value: "8", label: "Industries worked across", note: "SaaS, legal tech, health tech, logistics, design, e-commerce, tech, local" },
];

/** Tools — TODO: delete any you don't actually use day to day. */
export const tools: { name: string; use: string }[] = [
  { name: "Google Search Console", use: "Indexing, queries, performance" },
  { name: "Google Analytics 4", use: "Organic conversions and journeys" },
  { name: "Ahrefs", use: "Links, competitors, keyword gaps" },
  { name: "Semrush", use: "Keyword research, position tracking" },
  { name: "Screaming Frog", use: "Technical crawls and audits" },
  { name: "Google Business Profile", use: "Local visibility" },
  { name: "Looker Studio", use: "SEO reporting" },
  { name: "WordPress", use: "CMS implementation" },
  { name: "Shopify", use: "E-commerce implementation" },
  { name: "Webflow", use: "CMS implementation" },
  { name: "Figma", use: "Wireframes for SEO page templates" },
];

/** Career timeline for /about. Replace placeholders with real roles. */
export const experience: { period: string; role: string; org: string; summary: string }[] = [
  {
    period: "[YEAR] – Present",
    role: "SEO Specialist",
    org: "[COMPANY OR 'Independent']",
    summary: "[ADD: what you own now — e.g. technical SEO and content strategy for SaaS and health tech clients.]",
  },
  {
    period: "[YEAR] – [YEAR]",
    role: "[ROLE]",
    org: "[COMPANY]",
    summary: "[ADD: scope, industries, the kind of problems you solved.]",
  },
  {
    period: "[YEAR]",
    role: "Started in SEO",
    org: "[WHERE / HOW]",
    summary: "[ADD: how you got into SEO — a first site, a first client, a first ranking.]",
  },
];

export const mainNav = [
  { href: "/portfolio", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/locations", label: "Locations" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
] as const;
