
import pageCopy from "@/content/copy-components-content-ContextCta.json";
import Link from "next/link";
import { Arrow } from "@/components/ui/Arrow";

/** A quiet, contextual next step — placed after the content it relates to. */
export function ContextCta({ line, action = pageCopy.text_001, href = "/contact" }: { line: string; action?: string; href?: string }) {
  return (
    <div className="context-cta flex flex-col gap-4 rounded-[var(--radius-card)] border border-line bg-paper-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <p className="text-lg font-medium tracking-tight text-ink">{line}</p>
      <Link href={href} className="group inline-flex min-h-11 shrink-0 items-center gap-1.5 self-start rounded-full px-3 font-medium text-link hover:text-link-hover">
        {action} <Arrow />
      </Link>
    </div>
  );
}
