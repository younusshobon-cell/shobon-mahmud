import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Typographic cover used when an article has no featured image:
 * a stylised search-results page for the article's category.
 * Set `image` on a post to use a real featured image instead.
 */
export function PostCover({ category, image, className, priority }: { title?: string; category: string; image?: string; className?: string; priority?: boolean }) {
  if (image) {
    return (
      <div className={cn("relative overflow-hidden rounded-[var(--radius-card)] bg-paper-2", className)}>
        <Image src={image} alt="" fill sizes="(min-width: 1024px) 400px, 100vw" className="object-cover" priority={priority} />
      </div>
    );
  }
  const widths = [92, 64, 78, 55];
  return (
    <div aria-hidden className={cn("relative overflow-hidden rounded-[var(--radius-card)] bg-night p-5 sm:p-6", className)}>
      <p className="text-xs text-link-night">{category}</p>
      <div className="absolute inset-x-5 bottom-5 space-y-2.5 sm:inset-x-6">
        {widths.map((w, i) => (
          <div key={i} className="space-y-1">
            <div className="h-1.5 rounded-full bg-link-night/70" style={{ width: `${w * 0.55}%` }} />
            <div className="h-1 rounded-full bg-on-night-muted/25" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}
