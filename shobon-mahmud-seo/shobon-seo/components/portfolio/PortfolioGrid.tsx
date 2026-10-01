"use client";
import pageCopy from "@/content/copy-components-portfolio-PortfolioGrid.json";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

type Item = { key: string; filter: string; node: React.ReactNode };

/**
 * Every card is server-rendered into the HTML, so all case studies are
 * crawlable. The filter only changes what's shown to the visitor.
 */
export function PortfolioGrid({ items, filters }: { items: Item[]; filters: { value: string; label: string }[] }) {
  const [active, setActive] = useState("all");
  const available = filters.filter((f) => f.value === "all" || items.some((i) => i.filter === f.value));
  const shown = items.filter((i) => active === "all" || i.filter === active);

  return (
    <div>
      <div role="group" aria-label={pageCopy.text_001} className="flex flex-wrap gap-2">
        {available.map((f) => (
          <button
            key={f.value}
            type="button"
            aria-pressed={active === f.value}
            onClick={() => setActive(f.value)}
            className={cn(
              "h-10 rounded-full border px-4 text-sm transition-colors",
              active === f.value ? "border-ink bg-ink text-paper" : "border-line-strong text-ink-2 hover:border-ink",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="sr-only">{shown.length} {pageCopy.text_002}</p>
      <motion.ul layout className="mt-10 grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((item) => (
            <motion.li
              key={item.key}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              {item.node}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
