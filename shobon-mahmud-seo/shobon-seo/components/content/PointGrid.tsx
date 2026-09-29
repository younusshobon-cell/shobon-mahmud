import type { Point } from "@/lib/content/types";
import { cn } from "@/lib/utils";

export function PointGrid({ points, columns = 3, numbered = false }: { points: Point[]; columns?: 2 | 3; numbered?: boolean }) {
  return (
    <ul className={cn("grid gap-x-10 gap-y-9 sm:grid-cols-2", columns === 3 && "lg:grid-cols-3")}>
      {points.map((p, i) => (
        <li key={p.title} className="border-t border-line pt-5">
          <h3 className="t-h3 flex gap-3 text-ink">
            {numbered && <span className="tabular-nums text-link">{String(i + 1).padStart(2, "0")}</span>}
            {p.title}
          </h3>
          <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
        </li>
      ))}
    </ul>
  );
}
