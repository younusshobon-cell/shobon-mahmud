import { Section } from "./Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PointGrid } from "./PointGrid";
import type { Point } from "@/lib/content/types";

export function SeoBrief({ title, intro, points }: { title: string; intro: string; points: Point[] }) {
  return (
    <Section tone="muted">
      <SectionHeading title={title} intro={intro} />
      <div className="mt-12"><PointGrid points={points} numbered /></div>
    </Section>
  );
}
