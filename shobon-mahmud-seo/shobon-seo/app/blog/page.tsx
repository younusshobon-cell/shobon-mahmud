import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { POSTS_PER_PAGE, posts } from "@/lib/content/blog";
import { BlogIndex } from "@/components/blog/BlogIndex";

export const metadata: Metadata = buildMetadata({
  title: "SEO Blog — Strategy, Technical, Local & Content SEO",
  description: "Practical articles on SEO strategy, technical SEO, local SEO, e-commerce SEO, content and AI search — with practical, decision-focused guidance.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <BlogIndex
      title="Notes on search, from the work."
      intro="Practical writing on SEO strategy, technical SEO, local and e-commerce search, content and how AI is changing visibility."
      items={posts.slice(0, POSTS_PER_PAGE)}
      crumbs={[{ name: "Blog", href: "/blog" }]}
      totalPages={Math.ceil(posts.length / POSTS_PER_PAGE)}
      showFeatured
    />
  );
}
