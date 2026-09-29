import { activeSocials, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

function SocialIcon({ name }: { name: string }) {
  if (name === "instagram") {
    return <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4.5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
  }
  const paths: Record<string, string> = {
    facebook: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
    youtube: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.369-1.85 3.601 0 4.266 2.37 4.266 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.12 20.452H3.554V9H7.12v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    x: "M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z",
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
