import localFont from "next/font/local";
import pageCopy from "@/content/copy-components-sections-Hero.json";
import Image from "@/components/content/EditableImage";
import { ArrowUpRight, Check, MoveDown } from "lucide-react";
import { photos } from "@/lib/images";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

const manrope = localFont({
  src: "../../assets/fonts/Manrope-Latin.woff",
  weight: "200 800",
  display: "swap",
});

export function Hero() {
  return (
    <section className="growth-hero" aria-labelledby="growth-hero-title">
      <Container>
        <div className="growth-hero-topline"><span><i aria-hidden="true" />{pageCopy.text_001}</span><span>{pageCopy.location}</span></div>
        <div className="growth-hero-grid">
          <div className="growth-hero-copy">
            <h1 id="growth-hero-title" className={manrope.className}>{pageCopy.text_002.split(/(?<=\.)\s+/).map((line, index) => <span key={line} className={index === 1 ? "growth-headline-accent" : "growth-headline-line"}><span className="growth-headline-text">{line}</span></span>)}</h1>
            <p className="growth-hero-intro">{pageCopy.text_003}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={pageCopy.text_004}>{pageCopy.text_005}<ArrowUpRight size={18} aria-hidden="true" /></ButtonLink>
              <ButtonLink href={pageCopy.text_006} variant="secondary">{pageCopy.text_007}</ButtonLink>
            </div>
            <p className="growth-hero-note">{pageCopy.text_008}</p>
            <div className="growth-hero-disciplines"><span>SEO & discovery</span><span>Content & trust</span><span>Conversion & growth</span></div>
          </div>
          <div className="growth-hero-art">
            <div className="growth-portrait">
              <Image src={photos.studio.src} alt={photos.studio.alt} fill priority placeholder="blur" sizes="(min-width: 1024px) 480px, 90vw" className="object-cover object-[50%_30%]" />
              <div className="growth-portrait-caption"><strong>{pageCopy.portrait_name}</strong><span>{pageCopy.portrait_role}</span></div>
              <span className="growth-portrait-arrow" aria-hidden="true"><ArrowUpRight size={35} /></span>
            </div>
            <div className="growth-framework">
              <div className="growth-framework-heading"><span>{pageCopy.framework_label}</span><span aria-hidden="true">01 — 03</span></div>
              <p>{pageCopy.framework_title}</p>
              <ol>{pageCopy.framework_steps.map((step,index)=><li key={step}><span className="growth-step-number">0{index+1}</span><span>{step}</span>{index===2 ? <Check size={16} aria-hidden="true" /> : <MoveDown size={15} aria-hidden="true" />}</li>)}</ol>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
