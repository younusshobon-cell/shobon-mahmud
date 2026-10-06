"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import pageCopy from "@/content/copy-components-sections-HowIWork.json";
import { processSteps } from "@/lib/content/process";
import { Section } from "@/components/content/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessTimeline } from "./ProcessTimeline";

export function HowIWork() {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const count = processSteps.length;
  const rotation = active * 360 / count;
  const transition = { duration: reducedMotion ? 0 : 0.55, ease: "easeInOut" as const };
  function select(index: number) {
    setActive(index);
    document.getElementById(`seo-process-step-${index}`)?.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth", block: "center" });
  }
  return (
    <Section tone="muted" labelledBy="process-heading">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div id="process-heading"><SectionHeading kicker={pageCopy.text_001} title={pageCopy.text_002} intro={pageCopy.text_003} /></div>
          <div className="mt-8 rounded-[28px] border border-line bg-paper p-7 sm:p-9">
            <div className="relative mx-auto aspect-square w-full max-w-[280px]" role="group" aria-label="SEO process steps">
              <svg aria-hidden viewBox="0 0 280 280" className="absolute inset-0 size-full text-line-strong"><circle cx="140" cy="140" r="118" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 6" /></svg>
              <div className="absolute inset-[23%] flex flex-col items-center justify-center rounded-full bg-paper-2 px-3 text-center">
                <p className="flex items-baseline gap-1.5"><span className="text-4xl font-semibold tabular-nums tracking-tight text-ink">{String(active + 1).padStart(2, "0")}</span><span className="text-sm text-muted">/ {String(count).padStart(2, "0")}</span></p>
                <p className="mt-2 text-sm font-medium text-ink-2">{processSteps[active].title}</p>
              </div>
              {processSteps.map((step, index) => {
                const angle = (index * 360 / count - 90) * Math.PI / 180;
                return <button key={step.title} type="button" aria-label={`Go to step ${index + 1}: ${step.title}`} aria-pressed={index === active} onClick={() => select(index)} style={{ left: `${50 + Math.cos(angle) * 42.14}%`, top: `${50 + Math.sin(angle) * 42.14}%` }} className="absolute z-10 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-xs font-medium text-muted"><span className="grid size-7 place-items-center rounded-full border border-line-strong bg-paper">{index + 1}</span></button>;
              })}
              <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-20" animate={{ rotate: rotation }} transition={transition}>
                <div className="absolute top-[7.86%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <motion.span animate={{ rotate: -rotation }} transition={transition} className="grid size-9 place-items-center rounded-full bg-ink text-sm font-semibold text-paper shadow-[0_0_0_5px_var(--color-paper)]">{active + 1}</motion.span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        <ProcessTimeline onActiveChange={setActive} activeStep={active} />
      </div>
    </Section>
  );
}
