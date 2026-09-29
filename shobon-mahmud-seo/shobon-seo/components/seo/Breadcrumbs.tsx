import Link from "next/link";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";
import { JsonLd } from "./JsonLd";
import { cn } from "@/lib/utils";

export function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-8">
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
                    <span aria-hidden className="opacity-50">/</span>
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
