"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/** A search result for Shobon's own site — the hero's signature detail. Decorative. */
export function SerpSnippet({ siteName, url, path, title, description, className }: { siteName: string; url: string; path: string; title: string; description: string; className?: string }) {
  const host = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn("rounded-2xl border border-line bg-white p-4 shadow-[0_18px_40px_-18px_rgba(15,26,43,0.35)] sm:p-5", className)}
    >
      <div className="flex items-center gap-2.5">
        <Image src="/icon.svg" alt="" aria-hidden width={28} height={28} unoptimized className="size-7 rounded-full" />
        <div className="min-w-0 leading-tight">
          <p className="text-[0.8125rem] text-ink">{siteName}</p>
          <p className="truncate text-xs text-url">{host} › {path}</p>
        </div>
      </div>
      <p className="mt-2.5 text-[1.0625rem] leading-snug text-link">{title}</p>
      <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted line-clamp-2">{description}</p>
    </motion.div>
  );
}
