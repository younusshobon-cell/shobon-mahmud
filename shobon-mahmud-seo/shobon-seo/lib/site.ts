import cms_siteConfig from "@/content/site-siteConfig.json";
import cms_socialLabels from "@/content/site-socialLabels.json";
import cms_trustMetrics from "@/content/site-trustMetrics.json";
import cms_tools from "@/content/site-tools.json";
import cms_experience from "@/content/site-experience.json";
import cms_mainNav from "@/content/site-mainNav.json";
/**
 * ============================================================
 *  SITE CONFIG — the single place to edit personal details.
 *  Public details and claims live here. Do not add unverified performance metrics.
 * ============================================================
 */

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL)
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export const siteConfig = { ...cms_siteConfig, url: resolveSiteUrl() };

export const socialLabels: Record<string, string> = cms_socialLabels;

export function activeSocials() {
  return Object.entries(siteConfig.socials)
    .filter(([, href]) => Boolean(href))
    .map(([key, href]) => ({ key, href, label: socialLabels[key] ?? key }));
}

/** Homepage at-a-glance facts; only the project count is supplied by Shobon. */
export type Metric = { value: string; label: string; note?: string };

export const trustMetrics: Metric[] = cms_trustMetrics;

/** Common tools in an SEO workflow, listed as capabilities rather than certifications. */
export const tools: { name: string; use: string }[] = cms_tools;

/** Practice areas rather than unverified employment history. */
export const experience: {
  period: string;
  role: string;
  org: string;
  summary: string;
}[] = cms_experience;

export const mainNav = cms_mainNav;
