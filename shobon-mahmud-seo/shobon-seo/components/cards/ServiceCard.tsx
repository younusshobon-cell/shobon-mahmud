
import pageCopy from "@/content/copy-components-cards-ServiceCard.json";
import Link from "next/link";
import type { Service } from "@/lib/content/types";
import { Arrow } from "@/components/ui/Arrow";

export function ServiceCard({ service, index }: { service: Service; index?: number }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="interactive-card group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-paper p-6 transition-colors duration-200 hover:border-ink sm:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="t-h3 text-ink">{service.name}</h3>
        {typeof index === "number" && <span className="text-sm tabular-nums text-muted">{String(index + 1).padStart(2, "0")}</span>}
      </div>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{service.summary}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-link">
        {service.name} {pageCopy.text_001}<Arrow />
      </span>
    </Link>
  );
}
