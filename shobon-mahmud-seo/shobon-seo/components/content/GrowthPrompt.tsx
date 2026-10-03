import copy from "@/content/copy-components-content-ContextCta.json";
import { ArrowUpRight, FileText, MessageCircle, Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export function GrowthPrompt({ title = copy.text_014, body = copy.text_015, action = copy.text_016, tone = "light" }: {
  title?: string; body?: string; action?: string; tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <section aria-label={title} className="py-10 sm:py-14">
      <Container>
        <div className={`growth-prompt relative isolate overflow-hidden rounded-[28px] border p-6 sm:p-10 lg:p-12 ${dark ? "on-night border-night-line bg-night text-on-night" : "border-[#cddfd6] bg-[#eff7f2] text-ink"}`}>
          <div aria-hidden className="growth-prompt-glow" />
          <div className="relative grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-16">
            <div>
              <p className={`mb-4 text-sm font-medium ${dark ? "text-link-night" : "text-[#14604b]"}`}>{copy.text_013}</p>
              <h2 className="t-h2 max-w-2xl">{title}</h2>
              <p className={`mt-5 max-w-2xl leading-relaxed ${dark ? "text-on-night-muted" : "text-muted"}`}>{body}</p>
            </div>
            <div>
              <div aria-hidden className="mb-7 grid grid-cols-3 gap-2">
                {[{Icon:Search,label:copy.text_018},{Icon:FileText,label:copy.text_019},{Icon:MessageCircle,label:copy.text_020}].map(({Icon,label}) =>
                  <div data-motion-step key={label} className={`min-w-0 rounded-2xl border p-2.5 sm:p-4 ${dark ? "border-night-line bg-night-2" : "border-[#d4e3da] bg-white/70"}`}>
                    <Icon className={`mb-3 size-5 ${dark ? "text-link-night" : "text-[#14604b]"}`} />
                    <p className="break-words text-xs font-medium leading-relaxed">{label}</p>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <ButtonLink href="/contact" variant={dark ? "light" : "primary"}>{action}<ArrowUpRight aria-hidden className="size-4 shrink-0" /></ButtonLink>
                <ButtonLink href="/services" variant={dark ? "outline-light" : "secondary"}>{copy.text_017}</ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
