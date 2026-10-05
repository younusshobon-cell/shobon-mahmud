
import pageCopy from "@/content/copy-components-sections-DhakaLanding.json";
import { MapPin, Search, Megaphone, Globe, MessageCircle, BarChart3, ArrowUpRight, Check, Stethoscope, Store, CalendarDays } from "lucide-react";
import { HeroImageLayout } from "@/components/content/EditableImage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/content/Section";
import { GrowthPrompt } from "@/components/content/GrowthPrompt";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQ } from "@/components/content/FAQ";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site";

const services = [
  { icon: Search, title: pageCopy.text_001, body: pageCopy.text_002, href: "/services/on-page-seo" },
  { icon: MapPin, title: pageCopy.text_003, body: pageCopy.text_004, href: "/services/local-seo" },
  { icon: Megaphone, title: pageCopy.text_005, body: pageCopy.text_006, href: "#facebook-marketing" },
  { icon: ArrowUpRight, title: pageCopy.text_007, body: pageCopy.text_008, href: "/contact" },
  { icon: Globe, title: pageCopy.text_009, body: pageCopy.text_010, href: "#website-offer" },
  { icon: BarChart3, title: pageCopy.text_011, body: pageCopy.text_012, href: "/services/content-seo" },
];

const businesses = [
  { title: pageCopy.text_013, body: pageCopy.text_014 },
  { title: pageCopy.text_015, body: pageCopy.text_016 },
  { title: pageCopy.text_017, body: pageCopy.text_018 },
  { title: pageCopy.text_019, body: pageCopy.text_020 },
  { title: pageCopy.text_021, body: pageCopy.text_022 },
  { title: pageCopy.text_023, body: pageCopy.text_024 },
];

const faqs = [
  { q: pageCopy.text_025, a: pageCopy.text_026 },
  { q: pageCopy.text_027, a: pageCopy.text_028 },
  { q: pageCopy.text_029, a: pageCopy.text_030 },
  { q: pageCopy.text_031, a: pageCopy.text_032 },
  { q: pageCopy.text_033, a: pageCopy.text_034 },
  { q: pageCopy.text_035, a: pageCopy.text_036 },
  { q: pageCopy.text_037, a: pageCopy.text_038 },
  { q: pageCopy.text_039, a: pageCopy.text_040 },
  { q: pageCopy.text_041, a: pageCopy.text_042 },
  { q: pageCopy.text_043, a: pageCopy.text_044 },
];

const areas = ["Dhanmondi", "Mirpur", "Uttara", "Gulshan", "Banani", "Bashundhara", "Mohammadpur", "Badda", "Rampura", "Motijheel", pageCopy.text_045];
const included = [pageCopy.text_046, pageCopy.text_047, pageCopy.text_048, pageCopy.text_049, pageCopy.text_050, pageCopy.text_051];
const steps = [
  { title: pageCopy.text_052, body: pageCopy.text_053 },
  { title: pageCopy.text_054, body: pageCopy.text_055 },
  { title: pageCopy.text_056, body: pageCopy.text_057 },
  { title: pageCopy.text_058, body: pageCopy.text_059 },
];

export function DhakaLanding() {
  const url = new URL("/locations/seo-consultant-dhaka", siteConfig.url).toString();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": url + "#service",
    name: pageCopy.text_060,
    serviceType: ["SEO", pageCopy.text_061, pageCopy.text_062, pageCopy.text_063, pageCopy.text_064],
    url,
    description: pageCopy.text_065,
    areaServed: { "@type": "City", name: "Dhaka", containedInPlace: { "@type": "Country", name: "Bangladesh" } },
    provider: { "@id": `${siteConfig.url}/#person`, "@type": "Person", name: siteConfig.name, url: new URL("/about", siteConfig.url).toString() },
    hasOfferCatalog: { "@type": "OfferCatalog", name: pageCopy.text_066, itemListElement: [{ "@type": "Offer", price: "15000", priceCurrency: "BDT", url: url + "#website-offer", itemOffered: { "@type": "Service", name: pageCopy.text_067, description: pageCopy.text_068 } }] },
  };
  return (
    <div lang="en">
      <section className="hero-surface relative overflow-hidden" data-hero-theme="dhaka">
        <Container className="relative pt-10 pb-16 sm:pt-14 lg:pb-24">
          <Breadcrumbs items={[{ name: "Locations", href: "/locations" }, { name: "Dhaka", href: "/locations/seo-consultant-dhaka" }]} />
          <HeroImageLayout
            alt="Dhaka location hero image"
            aside={
              <div aria-hidden="true" className="aspect-[4/3] w-full rounded-[28px] border border-dashed border-[#b8d1c4] bg-[#e4efe8]" />
            }
          >
            <div>
              <p className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-link"><MapPin className="size-4" aria-hidden /> {pageCopy.text_069}</p>
              <h1 className="t-h1 text-ink">{pageCopy.text_070}</h1>
              <p className="t-lead mt-6 text-ink-2">{pageCopy.text_071}</p>
              <p className="mt-4 leading-relaxed text-muted">{pageCopy.text_072}<strong className="text-ink">{pageCopy.text_073}</strong>{pageCopy.text_074}</p>
              <div className="mt-8 flex flex-wrap gap-3"><ButtonLink href={pageCopy.text_075}>{pageCopy.text_076}</ButtonLink><ButtonLink href={pageCopy.text_077} variant="secondary">{pageCopy.text_078}</ButtonLink></div>
              <p className="mt-4 text-sm text-muted">{pageCopy.text_079}</p>
            </div>

          </HeroImageLayout>
          <nav aria-label={pageCopy.text_092} className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-line-strong pt-6 text-sm font-medium text-link">
            <a href={pageCopy.text_093}>{pageCopy.text_094}</a><a href={pageCopy.text_095}>{pageCopy.text_096}</a><a href={pageCopy.text_097}>{pageCopy.text_098}</a><a href={pageCopy.text_099}>{pageCopy.text_100}</a><a href={pageCopy.text_101}>{pageCopy.text_102}</a>
          </nav>
        </Container>
      </section>

      <Section labelledBy="dhaka-context">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <p className="mb-4 text-sm font-medium text-[#14604b]">{pageCopy.text_103}</p>
            <h2 id="dhaka-context" className="t-h2 text-ink">{pageCopy.text_104}</h2>
            <div className="t-lead mt-6 space-y-5 text-muted"><p>{pageCopy.text_105}</p><p>{pageCopy.text_106}</p></div>
          </div>
            <div className="rounded-[28px] border border-[#cbded4] bg-white p-6 shadow-[0_24px_70px_-35px_rgba(20,96,75,.3)] sm:p-8">
              <div className="flex items-center justify-between border-b border-line pb-5"><span className="text-sm font-semibold text-[#14604b]">{pageCopy.text_080}</span><Store className="size-5 text-[#14604b]" aria-hidden /></div>
              <p className="mt-6 text-2xl font-semibold text-ink">{pageCopy.text_081}</p>
              <ol className="mt-7 space-y-4">{[{ icon: Search, title: pageCopy.text_082, text: pageCopy.text_083 }, { icon: Megaphone, title: pageCopy.text_084, text: pageCopy.text_085 }, { icon: CalendarDays, title: pageCopy.text_086, text: pageCopy.text_087 }].map(({ icon: Icon, title, text }, i) => <li key={title} className="flex items-center gap-4 rounded-2xl bg-[#f3f7f5] p-4"><span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#14604b]"><Icon className="size-5" aria-hidden /></span><div><span className="text-xs text-muted">{pageCopy.text_088}{i + 1}</span><h2 className="text-base font-semibold text-ink">{title}</h2><p className="mt-1 text-sm text-muted">{text}</p></div></li>)}</ol>
              <a href={pageCopy.text_089} className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#153d32] px-5 py-4 text-white"><span className="text-sm">{pageCopy.text_090}</span><span className="text-xl font-semibold">{pageCopy.text_091}</span></a>
            </div>
        </div>
      </Section>

      <Section tone="muted" labelledBy="dhaka-problems">
        <h2 id="dhaka-problems" className="t-h2 max-w-3xl text-ink">{pageCopy.text_107}</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{[{ title: pageCopy.text_108, body: pageCopy.text_109 }, { title: pageCopy.text_110, body: pageCopy.text_111 }, { title: pageCopy.text_112, body: pageCopy.text_113 }, { title: pageCopy.text_114, body: pageCopy.text_115 }].map(p => <div key={p.title} className="rounded-2xl border border-line bg-white p-6"><h3 className="t-h3 text-ink">{p.title}</h3><p className="mt-3 leading-relaxed text-muted">{p.body}</p></div>)}</div>
      </Section>

      <Section id="services" labelledBy="dhaka-services">
        <p className="mb-4 text-sm font-medium text-[#14604b]">{pageCopy.text_116}</p><h2 id="dhaka-services" className="t-h2 max-w-3xl text-ink">{pageCopy.text_117}</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{services.map(({ icon: Icon, title, body, href }) => <article key={title} className="flex flex-col rounded-2xl border border-line bg-white p-7"><Icon className="mb-6 size-6 text-[#14604b]" strokeWidth={1.75} aria-hidden /><h3 className="t-h3 text-ink">{title}</h3><p className="mt-3 leading-relaxed text-muted">{body}</p><a href={href} className="mt-auto pt-6 text-sm font-semibold text-link">{pageCopy.text_118}</a></article>)}</div>
      </Section>

      <Section id="dental-clinic-marketing" tone="dark" labelledBy="dhaka-clinics">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20"><div><Stethoscope className="mb-5 size-8 text-[#bbdfce]" aria-hidden /><p className="mb-4 text-sm text-[#bbdfce]">{pageCopy.text_119}</p><h2 id="dhaka-clinics" className="t-h2 text-on-night">{pageCopy.text_120}</h2><p className="t-lead mt-6 text-on-night-muted">{pageCopy.text_121}</p><div className="mt-8"><ButtonLink href={pageCopy.text_122} variant="light">{pageCopy.text_123}</ButtonLink></div></div><ol className="space-y-5">{[{ title: pageCopy.text_124, body: pageCopy.text_125 }, { title: pageCopy.text_126, body: pageCopy.text_127 }, { title: pageCopy.text_128, body: pageCopy.text_129 }, { title: pageCopy.text_130, body: pageCopy.text_131 }].map((p, i) => <li key={p.title} className="border-t border-night-line pt-5"><span className="text-sm text-[#bbdfce]">{pageCopy.text_132}{i + 1}</span><h3 className="t-h3 mt-2 text-on-night">{p.title}</h3><p className="mt-2 leading-relaxed text-on-night-muted">{p.body}</p></li>)}</ol></div>
      </Section>

      <Section id="facebook-marketing" labelledBy="dhaka-facebook">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20"><div><MessageCircle className="mb-5 size-7 text-[#14604b]" aria-hidden /><h2 id="dhaka-facebook" className="t-h2 text-ink">{pageCopy.text_133}</h2><p className="t-lead mt-6 text-muted">{pageCopy.text_134}</p></div><div className="space-y-6">{[{ title: pageCopy.text_135, body: pageCopy.text_136 }, { title: pageCopy.text_137, body: pageCopy.text_138 }, { title: pageCopy.text_139, body: pageCopy.text_140 }].map(p => <article key={p.title} className="border-t border-line pt-5"><h3 className="t-h3 text-ink">{p.title}</h3><p className="mt-3 leading-relaxed text-muted">{p.body}</p></article>)}</div></div>
      </Section>

      <Section tone="muted" labelledBy="dhaka-businesses"><h2 id="dhaka-businesses" className="t-h2 text-ink">{pageCopy.text_141}</h2><p className="t-lead mt-5 max-w-3xl text-muted">{pageCopy.text_142}</p><div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">{businesses.map(p => <article key={p.title} className="border-t border-line pt-5"><h3 className="t-h3 text-ink">{p.title}</h3><p className="mt-3 leading-relaxed text-muted">{p.body}</p></article>)}</div></Section>

      <Section id="website-offer" labelledBy="dhaka-website">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16"><div><p className="mb-4 text-sm font-semibold text-[#14604b]">{pageCopy.text_143}</p><h2 id="dhaka-website" className="t-h2 text-ink">{pageCopy.text_144}</h2><p className="t-lead mt-6 text-muted">{pageCopy.text_145}</p><p className="mt-5 leading-relaxed text-muted">{pageCopy.text_146}</p><p className="mt-5 leading-relaxed text-sm text-muted">{pageCopy.text_147}</p></div><div className="rounded-[28px] border border-[#cbded4] bg-[#f3f7f5] p-7 sm:p-9"><p className="text-sm font-medium text-muted">{pageCopy.text_148}</p><p className="mt-3 text-5xl font-semibold tracking-tight text-ink">{pageCopy.text_149}</p><p className="mt-2 text-sm text-muted">{pageCopy.text_150}</p><ul className="my-7 space-y-4">{included.map(text => <li key={text} className="flex gap-3 text-ink-2"><Check className="mt-1 size-4 shrink-0 text-[#14604b]" aria-hidden />{text}</li>)}</ul><ButtonLink href={pageCopy.text_151} className="w-full">{pageCopy.text_152}</ButtonLink><p className="mt-5 leading-relaxed text-sm text-muted">{pageCopy.text_153}</p></div></div>
      </Section>

      <Section tone="muted" labelledBy="dhaka-channel-plan"><h2 id="dhaka-channel-plan" className="t-h2 text-ink">{pageCopy.text_154}</h2><div className="mt-10 grid gap-5 md:grid-cols-3">{[{ title: pageCopy.text_155, body: pageCopy.text_156, tag: pageCopy.text_157 }, { title: pageCopy.text_158, body: pageCopy.text_159, tag: pageCopy.text_160 }, { title: pageCopy.text_161, body: pageCopy.text_162, tag: pageCopy.text_163 }].map(p => <div key={p.title} className="rounded-2xl border border-line bg-white p-7"><p className="text-xs font-semibold uppercase tracking-wider text-[#14604b]">{p.tag}</p><h3 className="t-h3 mt-4 text-ink">{p.title}</h3><p className="mt-3 leading-relaxed text-muted">{p.body}</p></div>)}</div><p className="mt-6 text-sm text-muted">{pageCopy.text_164}</p></Section>

      <GrowthPrompt title="Reach the Dhaka customers looking for your services." />
      <Section labelledBy="dhaka-process"><h2 id="dhaka-process" className="t-h2 text-ink">{pageCopy.text_165}</h2><ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{steps.map((p, i) => <li key={p.title} className="border-t border-line-strong pt-5"><span className="text-sm font-semibold text-[#14604b]">{pageCopy.text_166}{i + 1}</span><h3 className="t-h3 mt-4 text-ink">{p.title}</h3><p className="mt-3 leading-relaxed text-muted">{p.body}</p></li>)}</ol></Section>

      <Section tone="muted" labelledBy="dhaka-areas"><div className="grid gap-10 lg:grid-cols-2 lg:gap-20"><div><h2 id="dhaka-areas" className="t-h2 text-ink">{pageCopy.text_167}</h2><p className="mt-5 leading-relaxed text-muted">{pageCopy.text_168}</p><p className="mt-4 leading-relaxed text-muted">{pageCopy.text_169}<a className="link" href={pageCopy.text_170}>{pageCopy.text_171}</a> {pageCopy.text_172}<a className="link" href={pageCopy.text_173}>{pageCopy.text_174}</a>{pageCopy.text_175}</p></div><div><ul className="flex flex-wrap gap-3">{areas.map(area => <li key={area} className="rounded-full border border-line bg-white px-5 py-2.5 text-sm text-ink">{area}</li>)}</ul><p className="mt-5 leading-relaxed text-sm text-muted">{pageCopy.text_176}</p></div></div></Section>

      <Section labelledBy="dhaka-reporting"><div className="grid gap-10 lg:grid-cols-2 lg:gap-20"><div><h2 id="dhaka-reporting" className="t-h2 text-ink">{pageCopy.text_177}</h2><p className="mt-5 leading-relaxed text-muted">{pageCopy.text_178}</p></div><ul className="space-y-4">{[pageCopy.text_179, pageCopy.text_180, pageCopy.text_181, pageCopy.text_182].map(text => <li key={text} className="flex gap-3 rounded-xl border border-line bg-[#f3f7f5] p-4"><BarChart3 className="mt-1 size-5 shrink-0 text-[#14604b]" aria-hidden />{text}</li>)}</ul></div></Section>

      <Section id="dhaka-faq" tone="muted"><FAQ faqs={faqs} title={pageCopy.text_183} /></Section>

      <Section tone="dark" labelledBy="dhaka-contact"><div className="max-w-3xl"><p className="mb-4 text-sm text-[#bbdfce]">{pageCopy.text_184}</p><h2 id="dhaka-contact" className="t-h2 text-on-night">{pageCopy.text_185}</h2><p className="t-lead mt-6 text-on-night-muted">{pageCopy.text_186}</p><div className="mt-8 flex flex-wrap gap-3"><ButtonLink href={pageCopy.text_187} variant="light">{pageCopy.text_188}</ButtonLink>{siteConfig.email && <ButtonLink href={"mailto:" + siteConfig.email} variant="outline-light">{pageCopy.text_189}</ButtonLink>}</div></div></Section>
      <JsonLd data={schema} />
    </div>
  );
}
