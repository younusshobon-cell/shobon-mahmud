
import pageCopy from "@/content/copy-components-content-PageHero.json";
import { heroTheme } from "@/lib/hero-theme";
import type { Crumb } from "@/lib/schema";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export function PageHero({
  crumbs,
  kicker,
  title,
  intro,
  children,
  aside,
  tone = "light",
  theme,
}: {
  crumbs: Crumb[];
  kicker?: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
  aside?: React.ReactNode;
  tone?: "light" | "dark";
  theme?: string;
}) {
  const dark = tone === "dark";
  return (
    <section className={cn("hero-surface", dark && pageCopy.text_001)} data-hero-theme={theme} style={dark || theme ? undefined : heroTheme(crumbs.at(-1)?.href ?? "/")}>
      <Container className="pt-10 pb-16 sm:pt-14 lg:pb-24">
        <Breadcrumbs items={crumbs} tone={tone} />
        <div className={cn("grid gap-10", aside && "lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16")}>
          <div>
            {kicker && <p className={cn("mb-5 text-sm font-medium", dark ? "text-link-night" : "text-link")}>{kicker}</p>}
            <h1 className={cn("t-h1 max-w-4xl", dark ? "text-on-night" : "text-ink")}>{title}</h1>
            {intro && <p className={cn("t-lead mt-6 max-w-2xl", dark ? "text-on-night-muted" : "text-muted")}>{intro}</p>}
            {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
          </div>
          {aside}
        </div>
      </Container>
    </section>
  );
}
