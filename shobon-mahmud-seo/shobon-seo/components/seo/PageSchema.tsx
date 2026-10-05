import { JsonLd } from "./JsonLd";
import { PERSON_ID, WEBSITE_ID } from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import { services } from "@/lib/content/services";
import { locations } from "@/lib/content/locations";
import { industries } from "@/lib/content/industries";
import { posts, blogCategories, POSTS_PER_PAGE } from "@/lib/content/blog";
import { caseStudies } from "@/lib/content/case-studies";
import { customPages } from "@/lib/content/pages";
import { entriesFor, sitemapSections } from "@/lib/sitemaps";

/** Server-rendered page identity; entity schemas stay in their content templates. */
export function PageSchema({ path }: { path: string }) {
  const absolute = (p: string) => new URL(p, `${siteConfig.url}/`).toString();
  const slug = path.split("/").at(-1);
  const service = path.startsWith("/services/") ? services.find(s => s.slug === slug) : undefined;
  const location = path.startsWith("/locations/") ? locations.find(l => `seo-consultant-${l.slug}` === slug) : undefined;
  const industry = path.startsWith("/industries/") ? industries.find(i => i.slug === slug) : undefined;
  const post = path.startsWith("/blog/") ? posts.find(p => p.slug === slug) : undefined;
  const study = path.startsWith("/portfolio/") ? caseStudies.find(s => s.slug === slug) : undefined;
  const custom = customPages.find(p => `/${p.slug}` === path);
  const category = path.startsWith("/blog/category/") ? blogCategories.find(c => c.slug === slug) : undefined;
  const section = sitemapSections.find(s => path === `/${s}`);
  const collection = Boolean(section || category || path.startsWith("/blog/page/"));
  const names: Record<string, string> = { "/": siteConfig.name, "/about": "About Shobon Mahmud", "/contact": "Contact Shobon Mahmud", "/privacy": "Privacy Policy", "/terms": "Terms of Use", "/services": "SEO Services", "/locations": "SEO Consulting Locations", "/industries": "Industries", "/portfolio": "SEO Portfolio", "/blog": "SEO Blog" };
  const name = service?.seoTitle ?? location?.seoTitle ?? industry?.seoTitle ?? post?.title ?? study?.title ?? custom?.title ?? category?.name ?? names[path] ?? (collection ? `SEO Blog — Page ${slug}` : siteConfig.name);
  const description = service?.summary ?? location?.intro ?? industry?.summary ?? post?.description ?? study?.summary ?? custom?.description ?? category?.description;
  let items = section ? entriesFor(section).filter(e => e.path !== path).map(e => e.path) : [];
  if (category) items = posts.filter(p => p.category === category.slug).map(p => `/blog/${p.slug}`);
  if (path === "/blog" || path.startsWith("/blog/page/")) {
    const page = path === "/blog" ? 1 : Number(slug);
    items = posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE).map(p => `/blog/${p.slug}`);
  }
  const page = {
    "@context": "https://schema.org", "@type": path === "/about" ? "ProfilePage" : path === "/contact" ? "ContactPage" : collection ? "CollectionPage" : "WebPage",
    "@id": `${absolute(path)}#webpage`, url: absolute(path), name,
    ...(description ? { description } : {}), inLanguage: "en", isPartOf: { "@id": WEBSITE_ID },
    ...(path === "/about" || path === "/" ? { mainEntity: { "@id": PERSON_ID } } : {}),
    ...(service ? { mainEntity: { "@id": `${absolute(path)}#service` } } : {}),
    ...(location || industry || study ? { mainEntity: { "@id": `${absolute(path)}#${study ? "work" : "service"}` } } : {}),
    ...(post ? { mainEntity: { "@id": `${absolute(path)}#article` } } : {}),
    ...(collection && items.length ? { mainEntity: { "@type": "ItemList", itemListElement: items.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: absolute(p) })) } } : {}),
  };
  const entity = industry ? {
    "@context": "https://schema.org", "@type": "Service", "@id": `${absolute(path)}#service`,
    name: industry.heroTitle, description: industry.summary, serviceType: "SEO consulting", url: absolute(path), provider: { "@id": PERSON_ID },
  } : study ? {
    "@context": "https://schema.org", "@type": "CreativeWork", "@id": `${absolute(path)}#work`,
    name: study.title, description: study.summary, url: absolute(path), author: { "@id": PERSON_ID },
  } : undefined;
  return <JsonLd data={entity ? [page, entity] : page} />;
}
