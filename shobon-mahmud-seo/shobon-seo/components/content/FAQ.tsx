
import pageCopy from "@/content/copy-components-content-FAQ.json";
import { Plus } from "lucide-react";
import type { FAQ as FAQType } from "@/lib/content/types";
import { faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Native <details> — accessible and crawlable with zero JavaScript. */
export function FAQ({ faqs, title = pageCopy.text_001, withSchema = false }: { faqs: FAQType[]; title?: string; withSchema?: boolean }) {
  if (!faqs.length) return null;
  return (
    <section aria-labelledby="faq-heading" className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <div id="faq-heading">
        <SectionHeading title={title} />
      </div>
      <div className="border-t border-line">
        {faqs.map((f) => (
          <details key={f.q} className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left text-[1.0625rem] font-medium text-ink [&::-webkit-details-marker]:hidden">
              {f.q}
              <Plus aria-hidden className="mt-1 size-4 shrink-0 text-muted transition-transform duration-200 group-open:rotate-45" />
            </summary>
            <p className="max-w-2xl pb-6 leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
      {withSchema && <JsonLd data={faqSchema(faqs)} />}
    </section>
  );
}
