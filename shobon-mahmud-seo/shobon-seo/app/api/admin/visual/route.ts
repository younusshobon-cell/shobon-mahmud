import { caseStudies } from "@/lib/content/case-studies";
import { photos } from "@/lib/images";
import imageSources from "@/content/image-sources.json";
import { authenticated } from "@/lib/admin/auth";
import { visualContent } from "@/lib/admin/visual-content";
import { fieldsOf } from "@/lib/admin/visual";
import { sitemapSections, entriesFor } from "@/lib/sitemaps";
export const runtime = "nodejs";
export async function GET() {
  if (!(await authenticated())) return Response.json({error: "Please sign in."}, {status: 401});
  return Response.json({images: Object.entries(photos).map(([key, photo]) => ({src: typeof photo.src === "string" ? photo.src : photo.src.src, field: {id: "image-sources", path: [key], value: imageSources[key as keyof typeof imageSources]}})), fields: Object.entries(visualContent).flatMap(([id, value]) => fieldsOf(id, value)), pages: [...new Set([...sitemapSections.flatMap(section => entriesFor(section).map(e => e.path)), ...caseStudies.map(item => `/portfolio/${item.slug}`)])]}, {headers: {"Cache-Control": "private, no-store"}});
}
