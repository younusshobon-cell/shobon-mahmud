import Link from "next/link";
import { Search } from "lucide-react";
import type { Industry } from "@/lib/content/types";
import { Arrow } from "@/components/ui/Arrow";

/** Each industry is shown with a real search its buyers make — the visual is the query itself. */
export function IndustryCard({ industry }: { industry: Industry }) {
  // Show a real-looking query (skip template examples that contain [brackets])
  const query = industry.journey.flatMap((j) => j.examples).find((q) => !q.includes("[")) ?? industry.name;
  return (
    <Link
      href={`/industries/${industry.slug}`}
      className="group flex h-full flex-col justify-between gap-8 border-line bg-paper p-6 transition-colors duration-200 hover:bg-paper-2 sm:p-7"
    >
      <div>
        <h3 className="flex items-center justify-between text-lg font-semibold tracking-tight text-ink">
          {industry.name} <Arrow className="text-muted group-hover:text-link" />
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{industry.summary}</p>
      </div>
      <p className="flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-[0.8125rem] text-ink-2 shadow-[0_1px_0_rgba(15,26,43,0.04)]">
        <Search aria-hidden className="size-3.5 shrink-0 text-muted" />
        <span className="truncate">{query}</span>
      </p>
    </Link>
  );
}
