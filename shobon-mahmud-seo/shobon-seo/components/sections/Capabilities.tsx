
import pageCopy from "@/content/copy-components-sections-Capabilities.json";
import Link from "next/link";
import { Section } from "@/components/content/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Arrow } from "@/components/ui/Arrow";

const capabilities = [
  { slug: "technical-seo", name: pageCopy.text_001, body: pageCopy.text_002 },
  { slug: "on-page-seo", name: pageCopy.text_003, body: pageCopy.text_004 },
  { slug: "content-seo", name: pageCopy.text_005, body: pageCopy.text_006 },
  { slug: "off-page-seo", name: pageCopy.text_007, body: pageCopy.text_008 },
  { slug: "local-seo", name: pageCopy.text_009, body: pageCopy.text_010 },
  { slug: "ecommerce-seo", name: pageCopy.text_011, body: pageCopy.text_012 },
];

export function Capabilities() {
  return (
    <Section labelledBy="capabilities-heading">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start" id="capabilities-heading">
          <SectionHeading
            kicker={pageCopy.text_015}
            title={pageCopy.text_016}
            intro={pageCopy.text_017}
          />
          <Link href={pageCopy.text_018} className="group mt-8 inline-flex items-center gap-1.5 font-medium text-link">
            {pageCopy.text_019}<Arrow />
          </Link>
        </div>
        <ul className="border-t border-line">
          {capabilities.map((c) => (
            <li data-motion-step key={c.slug} className="border-b border-line">
              <Link href={`/services/${c.slug}`} className="group grid gap-2 py-6 sm:grid-cols-[180px_1fr_auto] sm:items-baseline sm:gap-8">
                <h3 className="text-lg font-semibold tracking-tight text-ink transition-colors group-hover:text-link">{c.name}</h3>
                <p className="leading-relaxed text-muted">{c.body}</p>
                <Arrow className="hidden text-muted group-hover:text-link sm:block" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-14">
        <Link
          href={pageCopy.text_020}
          className="group relative block overflow-hidden rounded-[var(--radius-panel)] border border-line-strong bg-[linear-gradient(115deg,#e8ecfd_0%,#f7f8fb_55%,#e9f1ec_100%)] px-7 py-8 shadow-[0_22px_55px_-35px_rgba(15,26,43,0.46)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-link hover:shadow-[0_28px_65px_-32px_rgba(15,26,43,0.38)] sm:px-10 sm:py-10"
        >
          <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(31,63,209,.08)_1px,transparent_1px)] [background-size:26px_26px]" aria-hidden="true" />
          <div className="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-link">{pageCopy.text_021}</span>
              <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl">{pageCopy.text_022}</h3>
              <p className="mt-3 text-base leading-relaxed text-ink-2">{pageCopy.text_023}</p>
            </div>
            <span className="inline-flex min-h-12 w-fit items-center justify-center gap-3 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors group-hover:bg-link sm:text-base">
              {pageCopy.text_024}<Arrow className="text-white" />
            </span>
          </div>
        </Link>
      </div>
    </Section>
  );
}
