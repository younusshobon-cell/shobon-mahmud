import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "light" | "outline-light";

const styles: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-link shadow-[inset_0_-2px_0_rgba(0,0,0,0.25)]",
  secondary: "bg-transparent text-ink border border-line-strong hover:border-ink",
  light: "bg-paper text-ink hover:bg-link-night shadow-[inset_0_-2px_0_rgba(0,0,0,0.12)]",
  "outline-light": "border border-night-line text-on-night hover:border-on-night-muted",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  ...rest
}: { href: string; children: React.ReactNode; variant?: Variant; className?: string } & Omit<React.ComponentProps<typeof Link>, "href">) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.9375rem] font-medium transition-[background-color,border-color,color,transform] duration-200 active:translate-y-px",
        styles[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}
