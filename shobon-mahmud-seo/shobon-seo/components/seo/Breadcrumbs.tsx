
import pageCopy from "@/content/copy-components-seo-Breadcrumbs.json";
import Link from "next/link";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";
import { JsonLd } from "./JsonLd";
import { cn } from "@/lib/utils";

export function Breadcrumbs({ items, tone = "light", homeLabel = "Home", label = pageCopy.text_001 }: { items: Crumb[]; tone?: "light" | "dark"; homeLabel?: string; label?: string }) {
  const all = [{ name: homeLabel, href: "/" }, ...items];
  return (
    <>
      <nav aria-label={label} className="mb-8">
        <ol className={cn("flex flex-wrap items-center gap-x-2 gap-y-1 text-sm", tone === "dark" ? "text-on-night-muted" : "text-muted")}>
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className={tone === "dark" ? "text-on-night" : "text-ink"}>{c.name}</span>
                ) : (
                  <>
                    <Link href={c.href} className="hover:underline underline-offset-4">{c.name}</Link>
                    <span aria-hidden className="opacity-50">{pageCopy.text_002}</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(all)} />
    </>
  );
}
