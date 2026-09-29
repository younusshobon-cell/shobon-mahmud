import { cn } from "@/lib/utils";

export function SectionHeading({
  kicker,
  title,
  intro,
  className,
  as: Tag = "h2",
  tone = "light",
}: {
  kicker?: string;
  title: string;
  intro?: string;
  className?: string;
  as?: "h1" | "h2";
  tone?: "light" | "dark";
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {kicker && (
        <p className={cn("mb-4 text-sm font-medium", tone === "dark" ? "text-link-night" : "text-link")}>{kicker}</p>
      )}
      <Tag className={cn(Tag === "h1" ? "t-h1" : "t-h2", tone === "dark" ? "text-on-night" : "text-ink")}>{title}</Tag>
      {intro && (
        <p className={cn("t-lead mt-5 max-w-2xl", tone === "dark" ? "text-on-night-muted" : "text-muted")}>{intro}</p>
      )}
    </div>
  );
}
