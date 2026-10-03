
import pageCopy from "@/content/copy-components-layout-Logo.json";
import Link from "next/link";
import Image from "@/components/content/EditableImage";
import { cn } from "@/lib/utils";

export function Logo({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <Link href={pageCopy.text_001} className={cn("group inline-flex items-center gap-2.5", className)} aria-label={pageCopy.text_002}>
      <Image src={pageCopy.text_003} alt={pageCopy.text_004} aria-hidden width={32} height={32} unoptimized className="size-8 rounded-[9px]" />
      <span className={cn("text-[0.9375rem] font-semibold tracking-tight", tone === "dark" ? "text-on-night" : "text-ink")}>
        {pageCopy.text_005}</span>
    </Link>
  );
}
