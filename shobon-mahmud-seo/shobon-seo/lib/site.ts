/**
 * ============================================================
 *  SITE CONFIG — the single place to edit personal details.
 *  Public details and claims live here. Do not add unverified performance metrics.
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
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "younusshobon@gmail.com",
  /** Where you're based. Shown on About/Contact. Leave "" to hide. */
  baseLocation: "",
  /** Social profiles are rendered in the footer and added to Person schema `sameAs`. */
  socials: {
    facebook: "https://www.facebook.com/shobon.mahmud.official",
    youtube: "https://www.youtube.com/@shobonmahmud",
    linkedin: "https://www.linkedin.com/in/shobonmahmud/",
    x: "https://x.com/ShobonMahmud",
    instagram: "https://www.instagram.com/shobonmahmud/",
  } as Record<string, string>,
} as const;

export const socialLabels: Record<string, string> = {
  facebook: "Facebook",
  youtube: "YouTube",
  linkedin: "LinkedIn",
  x: "X (Twitter)",
  instagram: "Instagram",
};

export function activeSocials() {
  return Object.entries(siteConfig.socials)
    .filter(([, href]) => Boolean(href))
    .map(([key, href]) => ({ key, href, label: socialLabels[key] ?? key }));
}

/** Homepage at-a-glance facts; only the project count is supplied by Shobon. */
export type Metric = { value: string; label: string; note?: string };

export const trustMetrics: Metric[] = [
  { value: "10+", label: "SEO projects completed", note: "Project count provided by Shobon Mahmud" },
  { value: "3", label: "Growth priorities", note: "Technical health, search intent, and conversion" },
  { value: "7", label: "Core SEO services", note: "Technical, on-page, content, off-page, local, e-commerce, international" },
  { value: "8", label: "Sectors explored", note: "SaaS, legal tech, health tech, logistics, design, e-commerce, tech, local" },
];

/** Common tools in an SEO workflow, listed as capabilities rather than certifications. */
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

/** Practice areas rather than unverified employment history. */
export const experience: { period: string; role: string; org: string; summary: string }[] = [
  {
    period: "Today",
    role: "SEO strategy and delivery",
    org: "Project-led SEO work",
    summary: "Connecting technical audits, keyword research, content planning and conversion goals into a prioritised search roadmap.",
  },
  {
    period: "Project work",
    role: "Cross-industry SEO",
    org: "10+ projects",
    summary: "Applying the same research-first process to different search journeys, from product discovery to location-specific enquiries.",
  },
  {
    period: "Foundation",
    role: "Search fundamentals",
    org: "Ongoing learning",
    summary: "Building a practical approach around crawlability, helpful pages, internal links and measurement that can be checked against real search data.",
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
