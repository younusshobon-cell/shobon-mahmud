import { sitemapIndex, xmlResponse } from "@/lib/sitemaps";

export function GET() {
  return xmlResponse(sitemapIndex());
}
