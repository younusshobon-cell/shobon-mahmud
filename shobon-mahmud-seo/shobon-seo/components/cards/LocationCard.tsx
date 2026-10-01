
import pageCopy from "@/content/copy-components-cards-LocationCard.json";
import Link from "next/link";
import type { Location } from "@/lib/content/types";
import { getIndustries } from "@/lib/content/industries";
import { Arrow } from "@/components/ui/Arrow";

export function LocationCard({ location }: { location: Location }) {
  const inds = getIndustries(location.industries).slice(0, 3);
  return (
    <Link
      href={`/locations/${location.slug}`}
      className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[0_12px_35px_-28px_rgba(15,26,43,0.65)] transition-all hover:-translate-y-1 hover:border-ink hover:shadow-[0_24px_48px_-25px_rgba(15,26,43,0.35)] sm:p-7"
    >
      <p className="text-sm text-muted">{location.country}</p>
      <h3 className="mt-1 flex items-center justify-between text-2xl font-semibold tracking-tight text-ink">
        {location.city} <Arrow className="text-muted group-hover:text-link" />
      </h3>
      <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted line-clamp-3">{location.intro}</p>
      <p className="mt-auto pt-6 text-sm text-ink-2">{pageCopy.text_001}{inds.map((i) => i.name).join(", ")}</p>
    </Link>
  );
}
