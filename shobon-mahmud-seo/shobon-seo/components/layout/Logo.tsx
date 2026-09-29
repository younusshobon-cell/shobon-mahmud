import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5", className)} aria-label="Shobon Mahmud — home">
      {tone === "dark" ? (
        <span aria-hidden className="grid size-8 place-items-center rounded-[9px] bg-paper text-[0.8125rem] font-semibold tracking-tight text-night">SM</span>
      ) : (
        <Image src="/icon.svg" alt="" aria-hidden width={32} height={32} unoptimized className="size-8 rounded-[9px]" />
      )}
      <span className={cn("text-[0.9375rem] font-semibold tracking-tight", tone === "dark" ? "text-on-night" : "text-ink")}>
        Shobon Mahmud
      </span>
    </Link>
  );
}
