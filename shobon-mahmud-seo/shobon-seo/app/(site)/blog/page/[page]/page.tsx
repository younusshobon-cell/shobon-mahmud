import pageCopy from "@/content/copy-app-blog-page-page-page.json";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { POSTS_PER_PAGE, posts } from "@/lib/content/blog";
import { BlogIndex } from "@/components/blog/BlogIndex";

type Props = { params: Promise<{ page: string }> };
const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));

export const dynamicParams = false;
export function generateStaticParams() {
  // Page 1 lives at /blog. Next.js needs at least one param, so keep a placeholder page when there is only one.
  const pages = Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: String(i + 2),
  }));
  return pages.length ? pages : [{ page: "2" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const n = Number((await params).page);
  return buildMetadata({
    title: `SEO Blog — Page ${n}`,
    description: `SEO articles, page ${n}.`,
    path: `/blog/page/${n}`,
    noindex: n > totalPages,
  });
}

export default async function BlogPaged({ params }: Props) {
  const n = Number((await params).page);
  if (!Number.isInteger(n) || n < 2 || n > totalPages) notFound();
  const items = posts.slice((n - 1) * POSTS_PER_PAGE, n * POSTS_PER_PAGE);
  return (
    <BlogIndex
      title={`Articles — page ${n}`}
      intro={pageCopy.text_001}
      items={items}
      crumbs={[
        { name: "Blog", href: "/blog" },
        { name: `Page ${n}`, href: `/blog/page/${n}` },
      ]}
      page={n}
      totalPages={totalPages}
    />
  );
}
