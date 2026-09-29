import type { Metadata } from "next";
import { siteConfig } from "./site";

type BuildMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  /** Use the title as-is (skip the "— Shobon Mahmud" template). */
  absoluteTitle?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  image = "/og-default.jpg",
  type = "website",
  publishedTime,
  modifiedTime,
  noindex,
  absoluteTitle,
}: BuildMetaInput): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [{ url: image, width: 1200, height: 630, alt: `${siteConfig.name} — ${siteConfig.jobTitle}` }],
      ...(type === "article" ? { publishedTime, modifiedTime, authors: [siteConfig.name] } : {}),
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}
