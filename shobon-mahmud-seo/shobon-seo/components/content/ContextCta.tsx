import pageCopy from "@/content/copy-components-content-ContextCta.json";
import { Arrow } from "@/components/ui/Arrow";
import Link from "next/link";
import "@/components/sections/conversion.css";
export function ContextCta({line,action="Discuss your project",href="/contact",variant}:{line:string;action?:string;href?:string;variant?:"classic"}) {
 if(variant==="classic") return <ClassicContextCta line={line} action={action} href={href}/>;
 return <div className="conversion-context"><div><span>A PRACTICAL NEXT STEP</span><p>{line}</p></div><Link href={href}>{action}<span aria-hidden="true">↗</span></Link></div>;
}

function ClassicContextCta({ line, action = pageCopy.text_001, href = "/contact" }: { line: string; action?: string; href?: string }) {
  return (
    <div className="context-cta flex flex-col gap-4 rounded-[var(--radius-card)] border border-line bg-paper-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <p className="text-lg font-medium tracking-tight text-ink">{line}</p>
      <Link href={href} className="group inline-flex min-h-11 shrink-0 items-center gap-1.5 self-start rounded-full px-3 font-medium text-link hover:text-link-hover">
        {action} <Arrow />
      </Link>
    </div>
  );
}
