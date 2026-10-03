"use client";

import { useId, useState } from "react";
import { ArrowUpRight, Check, MapPin, Search, MousePointer2 } from "lucide-react";
import copy from "@/content/copy-components-content-ContextCta.json";
import { visitorGoals } from "@/lib/visitor-goals";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const icons = [Search, MousePointer2, MapPin];

export function GrowthGuide() {
  const [selected, setSelected] = useState<string>(visitorGoals[0].id);
  const headingId = useId();
  const resultId = useId();
  const goal = visitorGoals.find(item => item.id === selected) ?? visitorGoals[0];
  return (
    <section data-growth-guide aria-labelledby={headingId} className="bg-paper-2 py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className="mb-4 text-sm font-medium text-link">{copy.text_002}</p>
            <h2 id={headingId} className="t-h2 max-w-xl text-ink">{copy.text_003}</h2>
            <p className="t-lead mt-5 max-w-xl text-muted">{copy.text_004}</p>
          </div>
          <div className="rounded-[28px] border border-line bg-white p-5 sm:p-7">
            <div role="group" aria-label={copy.text_002} className="grid gap-3">
              {visitorGoals.map((item, index) => {
                const Icon = icons[index];
                const active = selected === item.id;
                return <button key={item.id} type="button" aria-pressed={active} aria-controls={resultId} onClick={() => setSelected(item.id)}
                  className={cn("goal-choice flex min-h-14 w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left font-medium transition-colors", active ? "border-link bg-link-soft text-ink" : "border-line text-ink-2 hover:border-line-strong hover:bg-paper")}>
                  <Icon aria-hidden className="size-5 shrink-0 text-link" />
                  <span className="flex-1">{item.label}</span>
                  {active ? <Check aria-hidden className="size-4 shrink-0 text-link" /> : <ArrowUpRight aria-hidden className="size-4 shrink-0 text-muted" />}
                </button>;
              })}
            </div>
            <div id={resultId} className="mt-6 border-t border-line pt-5">
              <p role="status" aria-live="polite" aria-atomic="true" className="min-h-[5.5rem] text-sm leading-relaxed text-muted"><span key={goal.id} className="goal-answer block">{goal.description}</span></p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href={`/contact?goal=${goal.id}`}>{copy.text_011}<ArrowUpRight aria-hidden className="size-4" /></ButtonLink>
                <ButtonLink href={goal.service} variant="secondary">{copy.text_012}</ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
