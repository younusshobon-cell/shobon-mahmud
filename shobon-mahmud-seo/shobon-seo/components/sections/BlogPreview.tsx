
import pageCopy from "@/content/copy-components-sections-BlogPreview.json";
import Link from "next/link";
import { posts } from "@/lib/content/blog";
import { Section } from "@/components/content/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogCard } from "@/components/cards/BlogCard";
import { Arrow } from "@/components/ui/Arrow";

export function BlogPreview() {
  const latest = posts.slice(0, 3);
  return (
    <Section labelledBy="blog-heading">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between" id="blog-heading">
        <SectionHeading kicker={pageCopy.text_001} title={pageCopy.text_002} />
        <Link href={pageCopy.text_003} className="group inline-flex shrink-0 items-center gap-1.5 font-medium text-link">
          {pageCopy.text_004}<Arrow />
        </Link>
      </div>
      <div className="mt-12 grid gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {latest.map((p) => <BlogCard key={p.slug} post={p} />)}
      </div>
    </Section>
  );
}
