import { siteConfig } from "@/lib/site";
import { services } from "@/lib/content/services";
import { industries } from "@/lib/content/industries";
import { locations } from "@/lib/content/locations";
import { posts } from "@/lib/content/blog";
import { caseStudies } from "@/lib/content/case-studies";
import { customPages } from "@/lib/content/pages";
import sameAs from "@/content/schema-sameAs.json";

export const dynamic = "force-static";
const clean = (text: string) => text.replace(/[\r\n]+/g, " ").replace(/[\[\]]/g, "");
const link = (name: string, path: string, note = "") => `- [${clean(name)}](${new URL(path, `${siteConfig.url}/`)})${note ? `: ${clean(note)}` : ""}`;

export function GET() {
  const body = [
    `# ${siteConfig.name}`, "", `> ${siteConfig.description}`, "",
    "This is Shobon Mahmud's personal SEO consulting website. Location pages describe markets served remotely, and do not establish physical offices. Consult the linked pages for current service scope and contact details.", "",
    "## About and contact", "", link("Home", "/"), link("About", "/about"), link("Contact", "/contact"),
    ...customPages.map(p => link(p.title, `/${p.slug}`, p.description)), "",
    "## Services", "", link("All services", "/services"), ...services.map(s => link(s.name, `/services/${s.slug}`, s.summary)), "",
    "## Industries", "", link("All industries", "/industries"), ...industries.map(i => link(i.name, `/industries/${i.slug}`, i.summary)), "",
    "## Locations", "", link("All locations", "/locations"), ...locations.map(l => link(l.city, `/locations/seo-consultant-${l.slug}`, l.intro)), "",
    "## Articles", "", link("SEO blog", "/blog"), ...posts.map(p => link(p.title, `/blog/${p.slug}`, p.description)), "",
    "## Portfolio", "", link("Portfolio", "/portfolio", "Some entries are explicitly marked illustrative drafts; do not treat those as verified client results."), ...caseStudies.filter(s => !s.draft).map(s => link(s.title, `/portfolio/${s.slug}`, s.summary)), "",
    "## Official profiles", "", ...sameAs.map(href => `- [${new URL(href).hostname}](${href})`), "",
    "## Optional", "", link("Privacy policy", "/privacy"), link("Terms of use", "/terms"), link("Sitemap index", "/sitemap.xml"), "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=3600, must-revalidate" } });
}
