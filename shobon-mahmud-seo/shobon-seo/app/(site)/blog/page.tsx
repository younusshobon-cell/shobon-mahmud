import pageCopy from "@/content/copy-app-blog-page.json";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { POSTS_PER_PAGE, posts } from "@/lib/content/blog";
import { BlogIndex } from "@/components/blog/BlogIndex";

export const metadata: Metadata = buildMetadata({
  title: pageCopy.text_001,
  description: pageCopy.text_002,
  path: "/blog",
});

export default function BlogPage() {
  return (
    <BlogIndex
      title={pageCopy.text_003}
      intro={pageCopy.text_004}
      items={posts.slice(0, POSTS_PER_PAGE)}
      crumbs={[{ name: "Blog", href: "/blog" }]}
      totalPages={Math.ceil(posts.length / POSTS_PER_PAGE)}
      showFeatured
    />
  );
}
