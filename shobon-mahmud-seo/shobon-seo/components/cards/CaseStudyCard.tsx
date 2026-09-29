import Link from "next/link";
import type { CaseStudy } from "@/lib/content/types";
import { getIndustry } from "@/lib/content/industries";
import { getServices } from "@/lib/content/services";
import { Fill } from "@/components/ui/Fill";
import { cn } from "@/lib/utils";

export function DraftBadge({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border border-dashed border-current px-2.5 py-0.5 text-xs", className)}>
      Draft — add real data
    </span>
  );
}

function Cta() {
  return (
    <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-link lg:pt-6">
      Explore strategy <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
    </span>
  );
}

export function CaseStudyCard({ study, variant = "default" }: { study: CaseStudy; variant?: "default" | "wide" }) {
  const industry = getIndustry(study.industry);
  const services = getServices(study.services);
  return (
    <Link
      href={`/portfolio/${study.slug}`}
      className={cn(
        "group flex h-full flex-col gap-6 rounded-[var(--radius-panel)] border border-line bg-paper p-6 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-ink sm:p-8",
        variant === "wide" && "lg:grid lg:grid-cols-[1fr_1.1fr] lg:gap-12",
      )}
    >
      <div className="flex flex-col">
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
          <span>{industry?.name}</span>
          {study.draft && <DraftBadge className="text-muted" />}
        </div>
        <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-ink sm:text-2xl">{study.title}</h3>
        <p className="mt-3 text-sm text-muted"><Fill text={study.client} /></p>
        {variant === "wide" && <Cta />}
      </div>
      <dl className={cn("grid content-start gap-5 border-t border-line pt-6 text-[0.9375rem]", variant === "wide" && "lg:border-t-0 lg:pt-0")}>
        <div>
          <dt className="text-sm text-muted">Scenario</dt>
          <dd className="mt-1 text-ink-2">{study.summary}</dd>
        </div>
        <div>
          <dt className="text-sm text-muted">Focus areas</dt>
          <dd className="mt-1 text-ink-2">{services.map((s) => s.name).join(" + ")}</dd>
        </div>
        <div>
          <dt className="text-sm text-muted">Suggested direction</dt>
          <dd className="mt-1 font-medium text-ink"><Fill text={study.outcome} /></dd>
        </div>
      </dl>
      {variant !== "wide" && <Cta />}
    </Link>
  );
}
