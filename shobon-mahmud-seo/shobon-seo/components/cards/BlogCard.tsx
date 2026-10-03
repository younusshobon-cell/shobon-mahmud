
import pageCopy from "@/content/copy-components-cards-BlogCard.json";
import Image from "@/components/content/EditableImage";
import Link from "next/link";
import type { PostWithMeta } from "@/lib/content/blog";
import { getCategory } from "@/lib/content/blog";
import { formatDate } from "@/lib/utils";
import { photos } from "@/lib/images";
import { PostCover } from "./PostCover";

export function BlogCard({ post, priority }: { post: PostWithMeta; priority?: boolean }) {
  const cat = getCategory(post.category);
  return (
    <article className="group relative flex h-full flex-col">
      <PostCover title={post.title} category={cat?.name ?? ""} image={post.image} className="aspect-[16/10]" priority={priority} />
      <p className="mt-5 text-sm text-link">{cat?.name}</p>
      <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-ink">
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 group-hover:underline decoration-1 underline-offset-4">
          {post.title}
        </Link>
      </h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted line-clamp-3">{post.description}</p>
      <div className="mt-auto flex items-center gap-3 pt-5 text-sm text-muted">
        <Image src={photos.smile.src} alt={pageCopy.text_001} width={28} height={28} className="size-7 rounded-full object-cover" />
        <span className="text-ink-2">{post.author}</span>
        <span aria-hidden className="h-3 w-px bg-line-strong" />
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden className="h-3 w-px bg-line-strong" />
        <span>{post.readingTime} {pageCopy.text_002}</span>
      </div>
    </article>
  );
}
