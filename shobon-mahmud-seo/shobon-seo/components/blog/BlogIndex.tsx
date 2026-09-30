import { heroTheme } from "@/lib/hero-theme";
import Link from "next/link";
import { blogCategories, getCategory, posts, type PostWithMeta } from "@/lib/content/blog";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { BlogCard } from "@/components/cards/BlogCard";
import { PostCover } from "@/components/cards/PostCover";
import { BlogSearch } from "./BlogSearch";
import { formatDate, cn } from "@/lib/utils";
import { FAQ } from "@/components/content/FAQ";
import { blogFaqs } from "@/lib/content/faqs";
import type { Crumb } from "@/lib/schema";

export function BlogIndex({
  title,
  intro,
  items,
  crumbs,
  activeCategory,
  page = 1,
  totalPages = 1,
  basePath = "/blog",
  showFeatured = false,
}: {
  title: string;
  intro: string;
  items: PostWithMeta[];
  crumbs: Crumb[];
  activeCategory?: string;
  page?: number;
  totalPages?: number;
  basePath?: string;
  showFeatured?: boolean;
}) {
  const featured = showFeatured ? items.find((p) => p.featured) : undefined;
  const list = featured ? items.filter((p) => p !== featured) : items;
  const index = posts.map((p) => ({ slug: p.slug, title: p.title, description: p.description, category: getCategory(p.category)?.name ?? "" }));

  return (
    <>
      <section className="hero-surface" style={heroTheme(basePath)}>
        <Container className="pt-10 pb-10 sm:pt-14 lg:pb-14">
          <Breadcrumbs items={crumbs} />
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="t-h1 text-ink">{title}</h1>
              <p className="t-lead mt-5 text-muted">{intro}</p>
            </div>
            <BlogSearch index={index} />
          </div>

          <nav aria-label="Blog categories" className="mt-10 -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            <ul className="flex gap-2 pb-1">
              <li>
                <Link href="/blog" aria-current={!activeCategory ? "page" : undefined} className={cn("inline-flex h-9 items-center whitespace-nowrap rounded-full border px-4 text-sm", !activeCategory ? "border-ink bg-ink text-paper" : "border-line-strong text-ink-2 hover:border-ink")}>All</Link>
              </li>
              {blogCategories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/blog/category/${c.slug}`} aria-current={activeCategory === c.slug ? "page" : undefined} className={cn("inline-flex h-9 items-center whitespace-nowrap rounded-full border px-4 text-sm", activeCategory === c.slug ? "border-ink bg-ink text-paper" : "border-line-strong text-ink-2 hover:border-ink")}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

        </Container>
      </section>
    <Container className="pb-20 lg:pb-28">
      {featured && (
        <article className="group relative mt-12 grid gap-8 rounded-[var(--radius-panel)] border border-line p-5 sm:p-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12">
          <PostCover category={getCategory(featured.category)?.name ?? ""} image={featured.image} className="aspect-[16/10]" priority />
          <div>
            <p className="text-sm text-link">Featured · {getCategory(featured.category)?.name}</p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl">
              <Link href={`/blog/${featured.slug}`} className="after:absolute after:inset-0 group-hover:underline decoration-1 underline-offset-4">{featured.title}</Link>
            </h2>
            <p className="mt-4 leading-relaxed text-muted">{featured.description}</p>
            <p className="mt-6 text-sm text-muted">
              <time dateTime={featured.date}>{formatDate(featured.date)}</time> <span aria-hidden className="mx-2 opacity-50">/</span> {featured.readingTime} min read
            </p>
          </div>
        </article>
      )}

      <h2 className="sr-only">{featured ? "Latest articles" : "Articles"}</h2>
      {list.length ? (
        <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => <BlogCard key={p.slug} post={p} />)}
        </div>
      ) : (
        <p className="mt-14 rounded-[var(--radius-card)] border border-dashed border-line-strong p-8 text-muted">
          No articles in this category yet. <Link href="/blog" className="link">Browse all articles</Link>.
        </p>
      )}

      {totalPages > 1 && (
        <nav aria-label="Pagination" className="mt-16 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <Link
              key={n}
              href={n === 1 ? basePath : `${basePath}/page/${n}`}
              aria-current={n === page ? "page" : undefined}
              className={cn("grid size-10 place-items-center rounded-full border text-sm", n === page ? "border-ink bg-ink text-paper" : "border-line-strong hover:border-ink")}
            >
              {n}
            </Link>
          ))}
        </nav>
      )}
      <div className="mt-20 border-t border-line pt-16"><FAQ faqs={blogFaqs} title="SEO learning FAQs" /></div>
    </Container>
    </>
  );
}
