import { industryEntries, urlSitemap, xmlResponse } from "@/lib/sitemaps";

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  if (!file.endsWith(".xml")) return new Response("Not found", { status: 404 });
  const entries = industryEntries(file.slice(0, -4));
  if (!entries) return new Response("Not found", { status: 404 });
  return xmlResponse(urlSitemap(entries));
}
