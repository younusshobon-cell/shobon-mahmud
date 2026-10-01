
import pageCopy from "@/content/copy-components-layout-SocialLinks.json";
import { activeSocials, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

function SocialIcon({ name }: { name: string }) {
  if (name === "instagram") {
    return <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4.5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
  }
  const paths: Record<string, string> = {
    facebook: pageCopy.text_001,
    youtube: pageCopy.text_002,
    linkedin: pageCopy.text_003,
    x: pageCopy.text_004,
  };
  return <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true"><path d={paths[name]} /></svg>;
}

export function SocialLinks({ tone = "light", className, iconOnly = false }: { tone?: "light" | "dark"; className?: string; iconOnly?: boolean }) {
  const socials = activeSocials();
  if (!socials.length && (iconOnly || !siteConfig.email)) return null;
  const base = tone === "dark" ? "text-on-night-muted hover:text-on-night" : "text-muted hover:text-ink";
  return (
    <ul className={cn(iconOnly ? "flex flex-wrap gap-2" : "flex flex-wrap gap-x-5 gap-y-2 text-sm", className)}>
      {!iconOnly && siteConfig.email && (
        <li>
          <a href={`mailto:${siteConfig.email}`} className={cn("underline-offset-4 hover:underline", base)}>
            {siteConfig.email}
          </a>
        </li>
      )}
      {socials.map((s) => (
        <li key={s.key}>
          <a href={s.href} target="_blank" rel="me noopener noreferrer" aria-label={s.label} title={s.label} className={cn(iconOnly ? "grid size-10 place-items-center rounded-full border border-night-line transition-colors hover:border-on-night focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-night" : "underline-offset-4 hover:underline", base)}>
            {iconOnly ? <SocialIcon name={s.key} /> : s.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
