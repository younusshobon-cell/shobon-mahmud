import Link from "next/link";
import notes from "@/content/case-growth-notes.json";
import { Section } from "./Section";
import { FAQ } from "./FAQ";

export function CaseGrowthNote({ slug }: { slug: string }) {
  const note = notes[slug as keyof typeof notes];
  if (!note) return null;
  return <>
    <Section tone="muted" labelledBy="case-growth-decision">
      <div className="max-w-3xl">
        <h2 id="case-growth-decision" className="t-h2 text-ink">{note.title}</h2>
        <p className="t-lead mt-6 text-ink-2">{note.intro}</p>
        <p className="mt-5 leading-relaxed text-muted">{note.body}</p>
        <Link href={note.link.href} className="mt-7 inline-block font-medium text-link underline underline-offset-4">{note.link.label}</Link>
      </div>
    </Section>
    <Section><FAQ faqs={note.faqs} title="Questions about this case study" withSchema /></Section>
  </>;
}
