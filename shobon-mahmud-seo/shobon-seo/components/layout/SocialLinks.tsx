import { activeSocials, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SocialLinks({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const socials = activeSocials();
  if (!socials.length && !siteConfig.email) return null;
  const base = tone === "dark" ? "text-on-night-muted hover:text-on-night" : "text-muted hover:text-ink";
  return (
    <ul className={cn("flex flex-wrap gap-x-5 gap-y-2 text-sm", className)}>
      {siteConfig.email && (
        <li>
          <a href={`mailto:${siteConfig.email}`} className={cn("underline-offset-4 hover:underline", base)}>
            {siteConfig.email}
          </a>
        </li>
      )}
      {socials.map((s) => (
        <li key={s.key}>
          <a href={s.href} target="_blank" rel="me noopener noreferrer" className={cn("underline-offset-4 hover:underline", base)}>
            {s.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
