
import pageCopy from "@/content/copy-components-sections-HomeDepth.json";
import Link from "next/link";
import { Section } from "@/components/content/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PointGrid } from "@/components/content/PointGrid";

const diagnostic = [
  { title: pageCopy.text_001, body: pageCopy.text_002 },
  { title: pageCopy.text_003, body: pageCopy.text_004 },
  { title: pageCopy.text_005, body: pageCopy.text_006 },
];
const roadmap = [
  { title: pageCopy.text_007, body: pageCopy.text_008 },
  { title: pageCopy.text_009, body: pageCopy.text_010 },
  { title: pageCopy.text_011, body: pageCopy.text_012 },
];

export function HomeDepth() {
  return (
    <>
      <Section labelledBy="seo-diagnostic">
        <div id="seo-diagnostic"><SectionHeading kicker={pageCopy.text_013} title={pageCopy.text_014} intro={pageCopy.text_015} /></div>
        <div className="mt-12"><PointGrid points={diagnostic} numbered /></div>
        <Link href={pageCopy.text_016} className="link mt-9 inline-block font-medium">{pageCopy.text_017}</Link>
      </Section>
      <Section tone="muted" labelledBy="seo-roadmap">
        <div id="seo-roadmap"><SectionHeading kicker={pageCopy.text_018} title={pageCopy.text_019} intro={pageCopy.text_020} /></div>
        <div className="mt-12"><PointGrid points={roadmap} numbered /></div>
      </Section>
      <Section labelledBy="seo-fit">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div id="seo-fit"><SectionHeading kicker={pageCopy.text_021} title={pageCopy.text_022} /></div>
          <div className="space-y-5 text-lg leading-relaxed text-ink-2">
            <p>{pageCopy.text_023}</p>
            <p>{pageCopy.text_024}<Link href={pageCopy.text_025} className="link">{pageCopy.text_026}</Link>{pageCopy.text_027}<Link href={pageCopy.text_028} className="link">{pageCopy.text_029}</Link>{pageCopy.text_030}</p>
          </div>
        </div>
      </Section>
    </>
  );
}
