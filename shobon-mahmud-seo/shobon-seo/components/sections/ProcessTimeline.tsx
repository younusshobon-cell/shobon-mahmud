"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { processSteps } from "@/lib/content/process";


/** Scroll-linked progress line — the only scroll-driven motion on the page. */
export function ProcessTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden className="absolute top-2 bottom-2 left-[19px] w-px bg-line" />
      <motion.span aria-hidden style={{ scaleY }} className="absolute top-2 bottom-2 left-[19px] w-px origin-top bg-link" />
      {processSteps.map((s, i) => (
        <li data-motion-step key={s.title} className="relative grid grid-cols-[40px_1fr] gap-5 pb-10 last:pb-0 sm:gap-8">
          <span className="relative z-10 grid size-10 place-items-center rounded-full border border-line-strong bg-paper text-sm font-medium tabular-nums text-ink">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="pt-1.5">
            <h3 className="text-xl font-semibold tracking-tight text-ink">{s.title}</h3>
            <p className="mt-2 max-w-xl leading-relaxed text-muted">{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
