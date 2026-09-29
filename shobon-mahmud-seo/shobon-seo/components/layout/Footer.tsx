import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
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
            <div className="mt-6 grid gap-2.5">
              <a href="https://wa.me/8801309580863" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-night-line px-4 py-3 text-sm text-on-night transition-colors hover:border-on-night focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-night" aria-label="Chat on WhatsApp at +880 1309 580863">
                <MessageCircle className="size-5 shrink-0" aria-hidden />
                <span><span className="block font-medium">WhatsApp chat</span><span className="block text-on-night-muted">+880 1309 580863</span></span>
              </a>
              <a href="mailto:younusshobon@gmail.com" className="flex items-center gap-3 rounded-xl border border-night-line px-4 py-3 text-sm text-on-night transition-colors hover:border-on-night focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-night">
                <Mail className="size-5 shrink-0" aria-hidden />
                <span><span className="block font-medium">Email me</span><span className="block break-all text-on-night-muted">younusshobon@gmail.com</span></span>
              </a>
            </div>
            <SocialLinks tone="dark" iconOnly className="mt-5" />
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
