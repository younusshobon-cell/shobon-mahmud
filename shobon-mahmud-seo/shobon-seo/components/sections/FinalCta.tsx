"use client";
import { useId } from "react";
import Link from "next/link";
import Image from "next/image";
import EditableImage from "@/components/content/EditableImage";
import { ArrowUpRight } from "lucide-react";
import { photos } from "@/lib/images";
import pageImages from "@/content/page-images.json";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import copy from "@/content/copy-components-sections-FinalCta.json";
import "./conversion.css";

// Classic (pre-refresh) footer CTA, kept for the location pages.
const footerPhoto = pageImages.find(image => image.page === "/" && image.key.includes("portrait-casual"));

function ClassicFinalCta({
  title = copy.text_001,
  body = copy.text_002,
  actionTitle = copy.text_005,
  actionClassName,
}: { title?: string; body?: string; actionTitle?: string; actionClassName?: string }) {
  const classicId = useId();
  return (
    <section aria-labelledby={classicId} className="bg-paper-2">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="cta-panel relative isolate grid gap-10 overflow-hidden rounded-[28px] border border-line bg-paper p-6 sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-16 lg:p-14">
          <div>
            <p className="mb-5 text-sm font-medium text-link">{copy.text_008}</p>
            <h2 id={classicId} className="t-h2 max-w-2xl text-ink">{title}</h2>
            <p className="t-lead mt-5 max-w-xl text-muted">{body}</p>
          </div>
          <div className="relative rounded-[22px] border border-line bg-white/80 p-6 sm:p-7">
            <EditableImage src={footerPhoto?.src ?? photos.casual.src} alt={footerPhoto?.alt || copy.text_003} unoptimized={Boolean(footerPhoto)} width={640} height={360} sizes="(min-width: 1024px) 360px, 90vw" className="aspect-[16/9] w-full rounded-[16px] object-cover" />
            <div className="mt-6 flex flex-col gap-3">
              <ButtonLink href={copy.text_004} className={actionClassName}>{actionTitle}<ArrowUpRight aria-hidden className="size-4 shrink-0" /></ButtonLink>
              <WhatsAppLink />
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted">{copy.text_007}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function FinalCta({title=copy.text_001,body=copy.text_002,actionTitle="Discuss your project",actionClassName,variant}: {title?:string;body?:string;actionTitle?:string;actionClassName?:string;variant?:"classic"}) {
 const id=useId();
 if(variant==="classic") return <ClassicFinalCta title={title} body={body} actionTitle={actionTitle==="Discuss your project"?copy.text_005:actionTitle} actionClassName={actionClassName}/>;
 return <section className="conversion-section" aria-labelledby={id}><Container><div className="conversion-panel"><div className="conversion-copy"><p className="conversion-kicker">YOUR NEXT CHAPTER STARTS HERE</p><h2 id={id}>{title}</h2><p className="conversion-body">{body}</p><div className="conversion-actions"><Link className={`conversion-button ${actionClassName??""}`} href="/contact">{actionTitle}<span aria-hidden="true">↗</span></Link><WhatsAppLink/></div><p className="conversion-note">Start with your website, your goals and what is getting in the way.</p></div><div className="conversion-card"><div className="conversion-person"><Image src={photos.studio.src} alt="Shobon Mahmud" width={80} height={80} sizes="80px"/><div><strong>Shobon Mahmud</strong><span>Digital Growth Partner</span></div></div><h3>A useful first conversation.</h3><ol><li><span>01</span>Understand your business and audience</li><li><span>02</span>Discuss the opportunities and constraints</li><li><span>03</span>Agree whether there is a good fit</li></ol><p>Direct communication. Clear scope. No ranking guarantees.</p></div></div></Container></section>;
}
