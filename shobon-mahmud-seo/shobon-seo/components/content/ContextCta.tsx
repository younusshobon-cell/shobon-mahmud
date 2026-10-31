import Link from "next/link";
import "@/components/sections/conversion.css";
export function ContextCta({line,action="Discuss your project",href="/contact"}:{line:string;action?:string;href?:string}) {
 return <div className="conversion-context"><div><span>A PRACTICAL NEXT STEP</span><p>{line}</p></div><Link href={href}>{action}<span aria-hidden="true">↗</span></Link></div>;
}
