import { siteConfig } from "./site";
import sameAs from "@/content/schema-sameAs.json";
import type { FAQ, Post, Service } from "./content/types";

const url = (path = "/") => new URL(path, siteConfig.url).toString();
export const PERSON_ID = `${siteConfig.url}/#person`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: siteConfig.name,
    jobTitle: siteConfig.jobTitle,
    description: siteConfig.description,
    url: url("/"),
    image: url("/og-default.jpg"),
    knowsAbout: [
      "Search engine optimization",
      "Technical SEO",
      "On-page SEO",
      "Content SEO",
      "Local SEO",
      "E-commerce SEO",
      "International SEO",
      "Keyword research",
      "Link building",
    ],
    sameAs,
    ...(siteConfig.email ? { email: `mailto:${siteConfig.email}` } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: url("/"),
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { "@id": PERSON_ID },
    inLanguage: "en",
  };
}

export type Crumb = { name: string; href: string };

export function breadcrumbSchema(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: url(c.href),
    })),
  };
}

export function faqSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleSchema(post: Post, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url(path)}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    mainEntityOfPage: url(path),
    url: url(path),
    image: url(post.image ?? "/og-default.jpg"),
    author: { "@id": PERSON_ID, "@type": "Person", name: siteConfig.name, url: url("/about") },
    publisher: { "@id": PERSON_ID },
    articleSection: post.category,
    keywords: post.tags.join(", "),
    inLanguage: "en",
  };
}

export function serviceSchema(service: Service, path: string, areaServed?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url(path)}#service`,
    name: service.name,
    serviceType: service.name,
    description: service.summary,
    url: url(path),
    provider: { "@id": PERSON_ID },
    ...(areaServed ? { areaServed } : {}),
  };
}

export function profilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: url("/about"),
    mainEntity: { "@id": PERSON_ID },
  };
}
