import { customPages } from "@/lib/content/pages";
import { blogCategories, POSTS_PER_PAGE, posts } from "@/lib/content/blog";
import { caseStudies } from "@/lib/content/case-studies";
import { industries } from "@/lib/content/industries";
import { locations } from "@/lib/content/locations";
import { services } from "@/lib/content/services";
import { siteConfig } from "@/lib/site";

export const sitemapSections = ["pages", "services", "locations", "industries", "blog", "portfolio"] as const;
export type SitemapSection = (typeof sitemapSections)[number];

type SitemapEntry = { path: string; lastModified?: string };
const absoluteUrl = (path: string) => new URL(path, `${siteConfig.url}/`).toString();
const escapeXml = (value: string) => value.replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;",
})[char] ?? char);

/** Only canonical, indexable URLs belong here. Draft portfolio entries are noindexed. */
export function entriesFor(section: SitemapSection): SitemapEntry[] {
  switch (section) {
    case "pages":
      return [...["/", "/about", "/contact", "/privacy", "/terms"].map((path) => ({ path })), ...customPages.map(p => ({path: `/${p.slug}`, lastModified:p.updated}))];
    case "services":
      return [{ path: "/services" }, ...services.map(({ slug }) => ({ path: `/services/${slug}` }))];
    case "locations":
      return [{ path: "/locations" }, ...locations.map(({ slug }) => ({ path: `/locations/seo-consultant-${slug}` }))];
    case "industries":
      return [{ path: "/industries" }, ...industries.map(({ slug }) => ({ path: `/industries/${slug}` }))];
    case "blog": {
      const pageCount = Math.ceil(posts.length / POSTS_PER_PAGE);
      return [
        { path: "/blog" },
        ...Array.from({ length: Math.max(0, pageCount - 1) }, (_, i) => ({ path: `/blog/page/${i + 2}` })),
        ...blogCategories.filter(({ slug }) => posts.some((post) => post.category === slug)).map(({ slug }) => ({ path: `/blog/category/${slug}` })),
        ...posts.map(({ slug, updated, date }) => ({ path: `/blog/${slug}`, lastModified: updated ?? date })),
      ];
    }
    case "portfolio":
      return [{ path: "/portfolio" }, ...caseStudies.filter(({ draft }) => !draft).map(({ slug, date }) => ({ path: `/portfolio/${slug}`, lastModified: date }))];
  }
}

export function urlSitemap(entries: SitemapEntry[]): string {
  const urls = [...new Map(entries.map((entry) => [entry.path, entry])).values()].map(({ path, lastModified }) => {
    const date = lastModified ? new Date(lastModified) : undefined;
    const modified = date && Number.isFinite(date.getTime()) ? `<lastmod>${escapeXml(date.toISOString())}</lastmod>` : "";
    return `  <url><loc>${escapeXml(absoluteUrl(path))}</loc>${modified}</url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
}

export function sectionSitemap(section: SitemapSection): string {
  return urlSitemap(entriesFor(section));
}

export function sitemapIndex(): string {
  // Read the same CMS collections as the public pages. Publishing content triggers
  // the connected Vercel build, so new industries never need a manual XML edit.
  const paths = [
    ...sitemapSections.map((section) => `/sitemaps/${section}.xml`),
  ];
  const items = paths.map((path) => `  <sitemap><loc>${escapeXml(absoluteUrl(path))}</loc></sitemap>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items.join("\n")}\n</sitemapindex>`;
}

export function xmlResponse(body: string): Response {
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=60, must-revalidate" } });
}
