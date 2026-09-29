import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { services } from "@/lib/content/services";
import { industries } from "@/lib/content/industries";
import { locations } from "@/lib/content/locations";
import { caseStudies } from "@/lib/content/case-studies";
import { blogCategories, posts } from "@/lib/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => new URL(p, siteConfig.url).toString();
  const latest = posts[0]?.updated ?? posts[0]?.date;
  const staticPages = ["/", "/services", "/portfolio", "/blog", "/about", "/contact", "/industries", "/locations", "/privacy", "/terms"].map((p) => ({
    url: u(p),
    lastModified: p === "/blog" && latest ? new Date(latest) : undefined,
  }));
  return [
    ...staticPages,
    ...services.map((s) => ({ url: u(`/services/${s.slug}`) })),
    ...industries.map((i) => ({ url: u(`/industries/${i.slug}`) })),
    ...locations.map((l) => ({ url: u(`/locations/${l.slug}`) })),
    // Draft case studies are noindexed, so they stay out of the sitemap until published.
    ...caseStudies.filter((c) => !c.draft).map((c) => ({ url: u(`/portfolio/${c.slug}`), lastModified: new Date(c.date) })),
    ...posts.map((p) => ({ url: u(`/blog/${p.slug}`), lastModified: new Date(p.updated ?? p.date) })),
    ...blogCategories.filter((c) => posts.some((p) => p.category === c.slug)).map((c) => ({ url: u(`/blog/category/${c.slug}`) })),
  ];
}
