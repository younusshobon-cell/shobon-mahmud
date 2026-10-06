import { PageSchema } from "@/components/seo/PageSchema";
import pageCopy from "@/content/copy-app-about-page.json";
import { heroTheme } from "@/lib/hero-theme";
import type { Metadata } from "next";
import Image from "@/components/content/EditableImage";
import { buildMetadata } from "@/lib/seo";
import { experience, siteConfig, tools } from "@/lib/site";
import { photos } from "@/lib/images";
import { industries } from "@/lib/content/industries";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section } from "@/components/content/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Fill } from "@/components/ui/Fill";
import { RelatedIndustryLinks } from "@/components/related/Related";
import { FAQ } from "@/components/content/FAQ";
import { aboutFaqs } from "@/lib/content/faqs";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = buildMetadata({
  title: pageCopy.text_001,
  description: pageCopy.text_002,
  path: "/about",
  type: "profile",
});

const channels = [{"title": "channel_1_title", "body": "channel_1_body"}, {"title": "channel_2_title", "body": "channel_2_body"}, {"title": "channel_3_title", "body": "channel_3_body"}, {"title": "channel_4_title", "body": "channel_4_body"}, {"title": "channel_5_title", "body": "channel_5_body"}, {"title": "channel_6_title", "body": "channel_6_body"}].map(item => ({title: pageCopy[item.title as keyof typeof pageCopy], body: pageCopy[item.body as keyof typeof pageCopy]}));
const markets = [{"title": "industry_1_title", "body": "industry_1_body"}, {"title": "industry_2_title", "body": "industry_2_body"}, {"title": "industry_3_title", "body": "industry_3_body"}, {"title": "industry_4_title", "body": "industry_4_body"}, {"title": "industry_5_title", "body": "industry_5_body"}, {"title": "industry_6_title", "body": "industry_6_body"}, {"title": "industry_7_title", "body": "industry_7_body"}].map(item => ({title: pageCopy[item.title as keyof typeof pageCopy], body: pageCopy[item.body as keyof typeof pageCopy]}));
const gallery = [pageCopy.photo_1, pageCopy.photo_2, pageCopy.photo_3, pageCopy.photo_4, pageCopy.photo_5, pageCopy.photo_6];

const skills = [
  pageCopy.skill_social, pageCopy.skill_funnel, pageCopy.skill_content, pageCopy.skill_conversion,
  pageCopy.text_003,
  pageCopy.text_004,
  pageCopy.text_005,
  pageCopy.text_006,
  pageCopy.text_007,
  pageCopy.text_008,
  pageCopy.text_009,
  pageCopy.text_010,
  pageCopy.text_011,
  pageCopy.text_012,
  pageCopy.text_013,
];

const principles = [
  { title: pageCopy.text_014, body: pageCopy.text_015 },
  { title: pageCopy.text_016, body: pageCopy.text_017 },
  { title: pageCopy.text_018, body: pageCopy.text_019 },
  { title: pageCopy.text_020, body: pageCopy.text_021 },
];

const workingStyle = [
  { title: pageCopy.text_022, body: pageCopy.text_023 },
  { title: pageCopy.text_024, body: pageCopy.text_025 },
  { title: pageCopy.text_026, body: pageCopy.text_027 },
  { title: pageCopy.text_028, body: pageCopy.text_029 },
];

export default function AboutPage() {
  return (
    <>
      <PageSchema path={"/about"} />
      <section className="hero-surface" style={heroTheme("/about")}>
        <Container className="pt-10 sm:pt-14">
          <Breadcrumbs items={[{ name: "About", href: "/about" }]} />
          <div className="grid gap-12 pb-16 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16 lg:pb-24">
            <div>
              <p className="mb-5 text-sm font-medium text-link">
                {pageCopy.text_030}
              </p>
              <h1 className="t-h1 text-ink">{pageCopy.text_031}</h1>
              <div className="t-lead mt-7 max-w-2xl space-y-5 text-muted">
                <p>{pageCopy.text_032}</p>
                <p>{pageCopy.text_033}</p>
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href={pageCopy.text_034}>
                  {pageCopy.text_035}
                </ButtonLink>
                <ButtonLink href={pageCopy.text_036} variant="secondary">
                  {pageCopy.text_037}
                </ButtonLink>
              </div>
            </div>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[28px] bg-paper-2">
              <Image
                src={photos.outdoor.src}
                alt={photos.outdoor.alt}
                fill
                priority
                placeholder="blur"
                sizes="(min-width: 1024px) 440px, 100vw"
                className="object-cover object-[50%_25%]"
              />
            </div>
          </div>
        </Container>
      </section>

      <Section tone="muted" labelledBy="story">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <h2 id="story" className="t-h2 text-ink">
            {pageCopy.text_038}
          </h2>
          <div className="space-y-5 t-lead text-ink-2">
            <p>{pageCopy.text_039}</p>
            <p>{pageCopy.text_040}</p>
            <p>{pageCopy.text_041}</p>
          </div>
        </div>
      </Section>

      <Section labelledBy="growth-channels">
        <h2 id="growth-channels" className="t-h2 max-w-3xl text-ink">{pageCopy.channels_title}</h2>
        <p className="t-lead mt-5 max-w-3xl text-muted">{pageCopy.channels_body}</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {channels.map((item, i) => <article key={item.title} className="rounded-[24px] border border-line bg-paper-2 p-7">
            <span className="text-sm font-medium text-link">0{i + 1}</span>
            <h3 className="t-h3 mt-5 text-ink">{item.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
          </article>)}
        </div>
      </Section>

      <Section tone="muted" labelledBy="industry-experience">
        <h2 id="industry-experience" className="t-h2 max-w-3xl text-ink">{pageCopy.industries_title}</h2>
        <p className="t-lead mt-5 max-w-3xl text-muted">{pageCopy.industries_body}</p>
        <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {markets.map(item => <article key={item.title} className="border-t border-line-strong pt-5">
            <h3 className="t-h3 text-ink">{item.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
          </article>)}
        </div>
      </Section>

      <Section labelledBy="growth-team">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <h2 id="growth-team" className="t-h2 text-ink">{pageCopy.team_title}</h2>
          <div className="t-lead space-y-5 text-muted"><p>{pageCopy.team_body}</p><p>{pageCopy.team_detail}</p></div>
        </div>
        <h3 className="t-h3 mt-14 text-ink">{pageCopy.gallery_title}</h3>
        <p className="mt-3 text-muted">{pageCopy.gallery_body}</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((caption, i) => <figure key={caption}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-paper-2">
              <Image src={`/images/about/photo-${i + 1}.svg`} alt={`Photo space: ${caption}`} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
            </div>
            <figcaption className="mt-3 text-sm font-medium text-ink-2">{caption}</figcaption>
          </figure>)}
        </div>
      </Section>
      <FinalCta title={pageCopy.cta_mid_title} body={pageCopy.cta_mid_body} />

      <Section labelledBy="experience">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div id="experience">
            <SectionHeading title={pageCopy.text_042} />
            {siteConfig.baseLocation && (
              <p className="mt-4 text-muted">
                {pageCopy.text_043}
                <Fill text={siteConfig.baseLocation} />
                {pageCopy.text_044}
              </p>
            )}
          </div>
          <ol className="relative border-l border-line-strong">
            {experience.map((e) => (
              <li
                key={e.period + e.role}
                className="relative pb-10 pl-8 last:pb-0"
              >
                <span
                  aria-hidden
                  className="absolute top-1.5 -left-[5px] size-2.5 rounded-full border-2 border-paper bg-link"
                />
                <p className="text-sm tabular-nums text-muted">
                  <Fill text={e.period} />
                </p>
                <h3 className="mt-1 text-lg font-semibold tracking-tight text-ink">
                  <Fill text={e.role} />{" "}
                  <span className="font-normal text-muted">
                    {pageCopy.text_045}
                    <Fill text={e.org} />
                  </span>
                </h3>
                <p className="mt-2 leading-relaxed text-ink-2">
                  <Fill text={e.summary} />
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="muted" labelledBy="skills">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 id="skills" className="t-h2 text-ink">
              {pageCopy.text_046}
            </h2>
            <ul className="mt-8 flex flex-wrap gap-2">
              {skills.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-line-strong bg-paper px-4 py-2 text-sm text-ink-2"
                >
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <RelatedIndustryLinks
                items={industries}
                title={pageCopy.text_047}
              />
            </div>
          </div>
          <div>
            <h2 className="t-h2 text-ink">{pageCopy.text_048}</h2>
            <ul className="mt-8 divide-y divide-line-strong border-y border-line-strong">
              {tools.map((t) => (
                <li
                  key={t.name}
                  className="flex items-baseline justify-between gap-6 py-3.5"
                >
                  <span className="font-medium text-ink">{t.name}</span>
                  <span className="text-right text-sm text-muted">{t.use}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="dark" labelledBy="philosophy">
        <div id="philosophy">
          <SectionHeading tone="dark" title={pageCopy.text_049} />
        </div>
        <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {principles.map((p) => (
            <li key={p.title} className="border-t border-night-line pt-5">
              <h3 className="t-h3 text-on-night">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-on-night-muted">
                {p.body}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="style">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <div>
            <h2 id="style" className="t-h2 text-ink">
              {pageCopy.text_050}
            </h2>
            <ul className="mt-10 space-y-7">
              {workingStyle.map((w) => (
                <li key={w.title}>
                  <h3 className="t-h3 text-ink">{w.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted">{w.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <figure>
            <div className="relative aspect-[3/4] overflow-hidden rounded-[28px] bg-paper-2">
              <Image
                src={photos.coast.src}
                alt={photos.coast.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover object-[50%_60%]"
              />
            </div>
            <figcaption className="mt-3 text-sm text-muted">
              {pageCopy.text_051}
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section>
        <FAQ faqs={aboutFaqs} title={pageCopy.text_052} />
      </Section>
      <FinalCta title={pageCopy.cta_final_title} body={pageCopy.cta_final_body} />

    </>
  );
}
