import type { Metric } from "@/lib/site";
import { Fill } from "@/components/ui/Fill";

export function MetricCard({ metric }: { metric: Metric }) {
  return (
    <div className="flex flex-col gap-2 py-6 sm:py-0">
      <p className="text-4xl font-semibold tracking-tight tabular-nums text-ink sm:text-5xl">
        <Fill text={metric.value} />
      </p>
      <p className="text-[0.9375rem] font-medium text-ink-2">{metric.label}</p>
      {metric.note && (
        <p className="text-xs leading-relaxed text-muted">
          <Fill text={metric.note} />
        </p>
      )}
    </div>
  );
}
