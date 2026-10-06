"use client";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { processSteps } from "@/lib/content/process";

export function ProcessTimeline({ activeStep = 0, onActiveChange }: { activeStep?: number; onActiveChange?: (index: number) => void }) {
  const ref = useRef<HTMLOListElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  useEffect(() => {
    if (!onActiveChange) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const list = ref.current;
      if (!list) return;
      const rect = list.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const target = window.innerHeight * 0.45;
      let nearest = 0, distance = Infinity;
      Array.from(list.children).forEach(node => {
        if (!(node instanceof HTMLLIElement)) return;
        const box = node.getBoundingClientRect();
        const delta = Math.abs(box.top + box.height / 2 - target);
        if (delta < distance) { distance = delta; nearest = Number(node.dataset.processIndex); }
      });
      onActiveChange(nearest);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, [onActiveChange]);
  return (
    <ol ref={ref} className="relative">
      <span aria-hidden className="absolute top-2 bottom-2 left-[19px] w-px bg-line" />
      <motion.span aria-hidden style={{ scaleY: reducedMotion ? 1 : scaleY }} className="absolute top-2 bottom-2 left-[19px] w-px origin-top bg-link" />
      {processSteps.map((step, index) => (
        <li id={`seo-process-step-${index}`} data-process-index={index} data-motion-step key={step.title} tabIndex={0} aria-current={activeStep === index ? "step" : undefined} onPointerEnter={() => onActiveChange?.(index)} onFocus={() => onActiveChange?.(index)} className="relative grid scroll-mt-28 grid-cols-[40px_1fr] gap-5 pb-7 last:pb-0 sm:gap-6">
          <span className={`relative z-10 mt-4 grid size-10 place-items-center rounded-full border text-sm font-medium tabular-nums transition-colors motion-reduce:transition-none ${activeStep === index ? "border-ink bg-ink text-paper" : "border-line-strong bg-paper text-ink"}`}>{String(index + 1).padStart(2, "0")}</span>
          <div className={`rounded-[20px] border p-5 transition-colors duration-300 motion-reduce:transition-none ${activeStep === index ? "border-night-line bg-night text-on-night" : "border-transparent bg-paper/70 text-ink"}`}>
            <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
            <p className={`mt-2 max-w-xl leading-relaxed ${activeStep === index ? "text-on-night" : "text-muted"}`}>{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
