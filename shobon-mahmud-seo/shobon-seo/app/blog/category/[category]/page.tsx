import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { blogCategories, getCategory, posts } from "@/lib/content/blog";
import { BlogIndex } from "@/components/blog/BlogIndex";

type Props = { params: Promise<{ category: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return blogCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCategory((await params).category);
  if (!c) return {};
  const count = posts.filter((p) => p.category === c.slug).length;
  // Empty categories stay live for navigation but are kept out of the index.
  return buildMetadata({ title: `${c.name} Articles`, description: c.description, path: `/blog/category/${c.slug}`, noindex: count === 0 });
}

export default async function CategoryPage({ params }: Props) {
  const cat = getCategory((await params).category);
  if (!cat) notFound();
  return (
    <BlogIndex
      title={cat.name}
      intro={cat.description}
      items={posts.filter((p) => p.category === cat.slug)}
      crumbs={[{ name: "Blog", href: "/blog" }, { name: cat.name, href: `/blog/category/${cat.slug}` }]}
      activeCategory={cat.slug}
    />
  );
}
