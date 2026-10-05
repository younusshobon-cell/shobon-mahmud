import { siteConfig } from "@/lib/site";
import sameAs from "@/content/schema-sameAs.json";

export const dynamic = "force-static";
const link = (name: string, path: string) => `- [${name}](${new URL(path, `${siteConfig.url}/`)})`;

export function GET() {
  const body = [
    `# ${siteConfig.name}`, "",
    "> Dubai-based SEO specialist for technical, content, local SEO and AI discovery.", "",
    "Location pages describe markets served remotely. Illustrative portfolio drafts are not verified client results.", "",
    "## Website", "",
    ...[
      ["About", "/about"], ["Contact", "/contact"], ["Services", "/services"],
      ["Industries", "/industries"], ["Locations", "/locations"],
      ["Blog", "/blog"], ["Portfolio", "/portfolio"],
    ].map(([name, path]) => link(name, path)), "",
    "## Official profiles", "",
    ...sameAs.map(href => `- [${new URL(href).hostname}](${href})`), "",
    "## Optional", "", link("Sitemap", "/sitemap.xml"), "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=3600, must-revalidate" } });
}
