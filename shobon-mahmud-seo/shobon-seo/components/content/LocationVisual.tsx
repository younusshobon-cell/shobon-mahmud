
import pageCopy from "@/content/copy-components-content-LocationVisual.json";
import { locationExtras } from "@/lib/content/location-extras";

const silhouettes: Record<string, React.ReactNode> = {
  pacific: <><path d="M12 203h476M30 203l54-83 50 83m-52-80 12-31 23 78m14 33 58-97 58 97m24 0 29-71 34 71m44 0 40-110 49 110"/><path d="M12 167h158m-126-14h130m-114-13h129m-95-32h62m-62 24h62M15 155l145-54m-145 54 145 48"/></>,
  newyork: <><path d="M12 203h476M33 203V122h42v81m14 0V81h50v122m16 0v-55h37v55m10 0V103h52v100m14 0V48h45v155m-22-155V24m32 179V92h41v111m14 0v-69h45v69"/><path d="M270 75h45m-203 38h12m-12 26h12m-12 26h12m111-26h13m-13 26h13m54-85h12m-12 32h12m-12 32h12"/></>,
  austin: <><path d="M12 203h476M20 203l48-43 38 43m22 0v-82h31v82m20 0V96h45v107m15 0v-61h36v61m20 0V73h54v130m-27-130V46m38 157v-76h43v76m15 0 37-48 36 48"/><path d="M47 161h75m-60-12h92m-35-9h48m-132 29 78 34m-78-34 78-35"/></>,
  dubai: <><path d="M12 203h476M24 203v-52h32v52m28 0V118h30v85m24 0v-79h38v79m18 0v-62h29v62m22 0V77h30v126m29 0V31h26v172m-13-172V13m32 190V84h35v119m17 0v-58h35v58m14 0V116h31v87"/><path d="M291 48h26m-27 31h29m-33 32h35m-39 32h43m-15-107-12-24-11 24"/></>,
  london: <><path d="M12 203h476M29 203V142h40v61m24 0V93h38v110m-32-110 13-30 13 30m38 110v-93h43v93m-21-93V47m-6 30h12m35 126v-59h46v59m18 0V98h59v105m-48-105V65h37v33m31 105v-77h42v77m15 0V91h33v112"/><circle cx="112" cy="119" r="9"/></>,
  saudi: <><path d="M12 203h476M21 203q47-95 97 0m-66 0v-55h36v55m52 0V92h49v111m-25-111V60m39 143v-68h31v68m19 0V44h30v159m-15-159V21m36 182v-96h45v96m20 0q35-85 80 0"/><path d="M156 120h18m-18 24h18m-18 24h18m107-91h22m-22 29h22m-22 29h22m-22 29h22"/></>,
};

export function LocationVisual({ slug, city }: { slug: string; city: string }) {
  const detail = locationExtras[slug];
  if (!detail) return null;
  return <div className={`market-visual lg:self-center lg:-translate-y-8 market-${detail.palette}`} aria-label={`Stylised skyline inspired by ${city}`} role="img">
    <div className="market-visual__orb" />
    <p className="relative z-10 text-xs font-semibold uppercase tracking-[0.22em] opacity-75">{pageCopy.text_001}</p>
    <svg viewBox="0 0 500 220" className="relative z-10 mt-auto w-full" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{silhouettes[detail.palette]}</svg>
    <div className="relative z-10 flex items-center justify-between border-t border-current/25 pt-4 text-sm font-medium"><span>{detail.eyebrow}</span><span>{pageCopy.text_002}</span></div>
  </div>;
}
