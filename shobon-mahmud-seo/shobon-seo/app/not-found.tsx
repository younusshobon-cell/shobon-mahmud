import { heroTheme } from "@/lib/hero-theme";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
      <section className="hero-surface" style={heroTheme("/404")}>
          <Container className="py-28 lg:py-40">
          <p className="text-sm font-medium text-link">404</p>
          <h1 className="t-h1 mt-4 max-w-2xl text-ink">This page isn&apos;t in the index.</h1>
          <p className="t-lead mt-6 max-w-xl text-muted">The link may be old or mistyped. These are the places most people are looking for:</p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {[["/services", "Services"], ["/portfolio", "Work"], ["/blog", "Blog"], ["/about", "About"]].map(([href, label]) => (
              <li key={href}><Link href={href} className="link">{label}</Link></li>
            ))}
          </ul>
          <div className="mt-10"><ButtonLink href="/">Go to the homepage</ButtonLink></div>
        </Container>
      </section>
  );
}
