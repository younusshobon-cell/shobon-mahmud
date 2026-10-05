import { PageSchema } from "@/components/seo/PageSchema";
import pageCopy from "@/content/copy-app-blog-slug-page.json";
import { heroTheme } from "@/lib/hero-theme";
import type { Metadata } from "next";
import Image from "@/components/content/EditableImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { articleSchema } from "@/lib/schema";
import { getCategory, getPost, posts, postsFor } from "@/lib/content/blog";
import { getServices } from "@/lib/content/services";
import { getIndustries } from "@/lib/content/industries";
import { photos } from "@/lib/images";
import { siteConfig } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { articleFaqs } from "@/lib/content/faqs";
import { FAQ } from "@/components/content/FAQ";
import { ContextCta } from "@/components/content/ContextCta";
import { Section } from "@/components/content/Section";
import {
  RelatedArticles,
  RelatedIndustryLinks,
} from "@/components/related/Related";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return buildMetadata({
    title: p.seoTitle ?? p.title,
    description: p.description,
    path: `/blog/${p.slug}`,
    type: "article",
    image: p.image,
    publishedTime: p.date,
    modifiedTime: p.updated ?? p.date,
  });
}

export default async function ArticlePage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const path = `/blog/${post.slug}`;
  const cat = getCategory(post.category);
  const services = getServices(post.relatedServices);
  let related = postsFor({ category: post.category, exclude: post.slug });
  if (related.length < 3)
    related = [
      ...related,
      ...posts.filter((p) => p.slug !== post.slug && !related.includes(p)),
    ].slice(0, 3);

  return (
    <>
      <PageSchema path={path} />
    <article>
      <section className="hero-surface" style={heroTheme(path)}>
        <Container className="pt-10 pb-12 sm:pt-14 lg:pb-16">
          <Breadcrumbs
            items={[
              { name: "Blog", href: "/blog" },
              ...(cat
                ? [{ name: cat.name, href: `/blog/category/${cat.slug}` }]
                : []),
              { name: post.title, href: path },
            ]}
          />
          <header className="max-w-3xl">
            {cat && (
              <Link
                href={`/blog/category/${cat.slug}`}
                className="text-sm font-medium text-link hover:underline"
              >
                {cat.name}
              </Link>
            )}
            <h1 className="t-h1 mt-4 text-ink">{post.title}</h1>
            <p className="t-lead mt-6 text-muted">{post.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
              <Link
                href={pageCopy.text_001}
                className="flex items-center gap-2.5 text-ink hover:underline"
              >
                <Image
                  src={photos.smile.src}
                  alt={pageCopy.text_002}
                  width={36}
                  height={36}
                  className="size-9 rounded-full object-cover"
                />
                {post.author}
              </Link>
              <span>
                {pageCopy.text_003}
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              {post.updated && (
                <span>
                  {pageCopy.text_004}
                  <time dateTime={post.updated}>
                    {formatDate(post.updated)}
                  </time>
                </span>
              )}
              <span>
                {post.readingTime} {pageCopy.text_005}
              </span>
            </div>
          </header>
        </Container>
      </section>

      <Container className="pt-12 pb-16 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[240px_minmax(0,720px)_1fr]">
          <aside>
            <TableOfContents
              items={post.sections.filter(s=>s.heading).map((s) => ({
                id: s.id,
                heading: s.heading,
              }))}
            />
          </aside>
          <div className="min-w-0 max-w-[720px]">
            <ArticleBody post={post} />

            <div className="mt-14">
              <ContextCta
                line="Need help applying this to your site?"
                action="Discuss my SEO goals"
              />
            </div>

            <div className="mt-14 flex gap-5 rounded-[var(--radius-card)] border border-line p-6">
              <Image
                src={photos.smile.src}
                alt={photos.smile.alt}
                width={64}
                height={64}
                className="size-16 shrink-0 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-ink">{siteConfig.name}</p>
                <p className="text-sm text-muted">{siteConfig.jobTitle}</p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">
                  {pageCopy.text_006}
                  <Link href={pageCopy.text_007} className="link">
                    {pageCopy.text_008}
                  </Link>
                  {pageCopy.text_009}
                </p>
              </div>
            </div>

            <div className="mt-10 space-y-6">
              {services.length > 0 && (
                <div>
                  <h2 className="text-sm font-medium text-muted">
                    {pageCopy.text_010}
                  </h2>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="inline-flex rounded-full border border-line px-3.5 py-1.5 text-sm text-ink-2 hover:border-ink"
                        >
                          {s.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <RelatedIndustryLinks
                items={getIndustries(post.relatedIndustries)}
                title={pageCopy.text_011}
              />
            </div>
          </div>
        </div>
      </Container>

      <Section tone="muted">
        <FAQ faqs={articleFaqs(post.faqs, post.title)} />
      </Section>
      <Section>
        <RelatedArticles items={related} title={pageCopy.text_012} />
      </Section>
      <JsonLd data={articleSchema(post, path)} />
    </article>
    </>
  );
}
