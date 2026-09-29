import { sectionSitemap, xmlResponse } from "@/lib/sitemaps";

export function GET() {
  return xmlResponse(sectionSitemap("blog"));
}
