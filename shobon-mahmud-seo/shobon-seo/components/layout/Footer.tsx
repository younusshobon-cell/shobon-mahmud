import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { services } from "@/lib/content/services";
import { industries } from "@/lib/content/industries";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

const siteLinks = [
  { href: "/portfolio", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/locations", label: "Locations" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function Column({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-medium text-on-night">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-on-night-muted transition-colors hover:text-on-night">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-night bg-night text-on-night">
      <Container className="pt-16 pb-10 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo tone="dark" />
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-on-night-muted">{siteConfig.shortTagline}</p>
            <SocialLinks tone="dark" className="mt-6" />
          </div>
          <Column title="Site" links={siteLinks} />
          <Column title="Services" links={services.slice(0, 7).map((s) => ({ href: `/services/${s.slug}`, label: s.name }))} />
          <Column title="Industries" links={industries.map((i) => ({ href: `/industries/${i.slug}`, label: i.name }))} />
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-night-line pt-6 text-sm text-on-night-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <ul className="flex gap-5">
            <li><Link href="/privacy" className="hover:text-on-night">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-on-night">Terms</Link></li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
