import { blockText } from "./rich";
import cms_blogCategories from "@/content/blog-blogCategories.json";
import cms_rawPosts from "@/content/blog-rawPosts.json";
import type { BlogCategory, Post } from "./types";
import { readingMinutes, wordCount } from "../utils";

export const blogCategories: BlogCategory[] =
  cms_blogCategories as BlogCategory[];

export const getCategory = (slug: string) =>
  blogCategories.find((c) => c.slug === slug);

/** Practical articles and guides. */
const rawPosts: Post[] = cms_rawPosts as Post[];

function postWords(p: Post) {
  const text = p.sections
    .flatMap((s) => [
      s.heading,
      ...s.blocks.map(blockText),
    ])
    .join(" ");
  return wordCount(text);
}

export const posts = rawPosts
  .filter((p) => p.status !== "draft")
  .map((p) => ({ ...p, readingTime: readingMinutes(postWords(p)) }))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export type PostWithMeta = (typeof posts)[number];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const postsFor = (opts: {
  service?: string;
  industry?: string;
  category?: string;
  exclude?: string;
  limit?: number;
}) =>
  posts
    .filter(
      (p) =>
        p.slug !== opts.exclude &&
        (!opts.service || p.relatedServices.includes(opts.service)) &&
        (!opts.industry || p.relatedIndustries.includes(opts.industry)) &&
        (!opts.category || p.category === opts.category),
    )
    .slice(0, opts.limit ?? 3);

export const POSTS_PER_PAGE = 9;
export const excerptOf = (p: Post) => p.description;
