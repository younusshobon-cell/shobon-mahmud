"use client";
import { useId } from "react";
import Link from "next/link";
import Image from "next/image";
import { photos } from "@/lib/images";
import { Container } from "@/components/ui/Container";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import copy from "@/content/copy-components-sections-FinalCta.json";
import "./conversion.css";
export function FinalCta({title=copy.text_001,body=copy.text_002,actionTitle="Discuss your project",actionClassName}: {title?:string;body?:string;actionTitle?:string;actionClassName?:string}) {
 const id=useId();return <section className="conversion-section" aria-labelledby={id}><Container><div className="conversion-panel"><div className="conversion-copy"><p className="conversion-kicker">YOUR NEXT CHAPTER STARTS HERE</p><h2 id={id}>{title}</h2><p className="conversion-body">{body}</p><div className="conversion-actions"><Link className={`conversion-button ${actionClassName??""}`} href="/contact">{actionTitle}<span aria-hidden="true">↗</span></Link><WhatsAppLink/></div><p className="conversion-note">Start with your website, your goals and what is getting in the way.</p></div><div className="conversion-card"><div className="conversion-person"><Image src={photos.studio.src} alt="Shobon Mahmud" width={80} height={80} sizes="80px"/><div><strong>Shobon Mahmud</strong><span>Digital Growth Partner</span></div></div><h3>A useful first conversation.</h3><ol><li><span>01</span>Understand your business and audience</li><li><span>02</span>Discuss the opportunities and constraints</li><li><span>03</span>Agree whether there is a good fit</li></ol><p>Direct communication. Clear scope. No ranking guarantees.</p></div></div></Container></section>;
}
