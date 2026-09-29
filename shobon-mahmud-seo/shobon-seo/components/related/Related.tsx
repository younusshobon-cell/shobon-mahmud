import Link from "next/link";
import type { CaseStudy, Industry, Service } from "@/lib/content/types";
import type { PostWithMeta } from "@/lib/content/blog";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { BlogCard } from "@/components/cards/BlogCard";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { Arrow } from "@/components/ui/Arrow";

function Head({ title, href, linkLabel }: { title: string; href?: string; linkLabel?: string }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6">
      <h2 className="t-h2 text-ink">{title}</h2>
      {href && (
        <Link href={href} className="group hidden shrink-0 items-center gap-1 text-sm font-medium text-link sm:inline-flex">
          {linkLabel} <Arrow />
        </Link>
      )}
    </div>
  );
}

export function RelatedCaseStudies({ items, title = "Related work" }: { items: CaseStudy[]; title?: string }) {
  if (!items.length) return null;
  return (
    <div>
      <Head title={title} href="/portfolio" linkLabel="All work" />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => <CaseStudyCard key={c.slug} study={c} />)}
      </div>
    </div>
  );
}

export function RelatedArticles({ items, title = "Related reading" }: { items: PostWithMeta[]; title?: string }) {
  if (!items.length) return null;
  return (
    <div>
      <Head title={title} href="/blog" linkLabel="All articles" />
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => <BlogCard key={p.slug} post={p} />)}
      </div>
    </div>
  );
}

export function RelatedServices({ items, title = "Related services" }: { items: Service[]; title?: string }) {
  if (!items.length) return null;
  return (
    <div>
      <Head title={title} href="/services" linkLabel="All services" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((s) => <ServiceCard key={s.slug} service={s} />)}
      </div>
    </div>
  );
}

export function RelatedIndustryLinks({ items, title = "Industries" }: { items: Industry[]; title?: string }) {
  if (!items.length) return null;
  return (
    <div>
      <h2 className="text-sm font-medium text-muted">{title}</h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((i) => (
          <li key={i.slug}>
            <Link href={`/industries/${i.slug}`} className="inline-flex rounded-full border border-line px-3.5 py-1.5 text-sm text-ink-2 transition-colors hover:border-ink hover:text-ink">
              {i.name} SEO
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
