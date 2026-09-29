import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Keep Vercel preview deployments out of the index.
  const isProd = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;
  return {
    rules: isProd ? [{ userAgent: "*", allow: "/", disallow: ["/api/"] }] : [{ userAgent: "*", disallow: "/" }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
