import type { CSSProperties, ReactNode } from "react";
import { services } from "@/lib/content/services";
import { industries } from "@/lib/content/industries";
import { caseStudyIndex } from "@/lib/content/case-studies";
import "./hero-art.css";

/**
 * Page-specific hero illustrations for ExperienceHero.
 * Every page gets its own composition and palette so neighbouring pages
 * never share the same visual. All artwork is decorative (aria-hidden);
 * no figures or results are shown, only labels that describe the work.
 */

export type Kind =
  | "services" | "roadmap" | "pillars" | "outline" | "funnel" | "catalog" | "service-area"
  | "industries" | "dashboard" | "brief" | "pulse" | "route" | "moodboard" | "journey" | "terminal" | "local-call"
  | "cases" | "library" | "journal";

type Palette = { bg: string; soft: string; dark: string };

const PALETTES: Record<Kind, Palette> = {
  services: { bg: "#f1f4ec", soft: "#cfe6a8", dark: "#2b4a2f" },
  roadmap: { bg: "#eef3f8", soft: "#bcd6ec", dark: "#1f3f5b" },
  pillars: { bg: "#f2f5ed", soft: "#d9efad", dark: "#224e3c" },
  outline: { bg: "#f9f4ea", soft: "#f2d49a", dark: "#6a4a17" },
  funnel: { bg: "#f9efec", soft: "#f4c1b5", dark: "#7a2f22" },
  catalog: { bg: "#edf5f2", soft: "#a9dcc8", dark: "#18574a" },
  "service-area": { bg: "#f6f1e8", soft: "#f0c987", dark: "#5b3b12" },
  industries: { bg: "#f7f1e8", soft: "#f3d4a8", dark: "#65412c" },
  dashboard: { bg: "#f1f0fa", soft: "#cbc9f4", dark: "#3a3577" },
  brief: { bg: "#f4f1ea", soft: "#dccfb3", dark: "#3b3426" },
  pulse: { bg: "#ecf6f5", soft: "#b5e0dd", dark: "#145a5a" },
  route: { bg: "#f0f3f7", soft: "#c4cfe0", dark: "#23324d" },
  moodboard: { bg: "#faf0f0", soft: "#f6c6cf", dark: "#7a2840" },
  journey: { bg: "#f4f6ea", soft: "#dbe8a2", dark: "#48551a" },
  terminal: { bg: "#edf0f5", soft: "#b8c6dc", dark: "#1d2a3d" },
  "local-call": { bg: "#f7f3e5", soft: "#f5d77e", dark: "#5a4512" },
  cases: { bg: "#f3efe9", soft: "#e3cfb3", dark: "#4b3626" },
  library: { bg: "#eef1f7", soft: "#c8d3ef", dark: "#2d3b6b" },
  journal: { bg: "#f2eff8", soft: "#d7cdf6", dark: "#51446e" },
};

const SERVICE_KINDS: Record<string, Kind> = {
  "digital-growth-strategy": "roadmap",
  "holistic-seo": "pillars",
  "content-seo": "outline",
  "conversion-rate-optimization": "funnel",
  "ecommerce-seo": "catalog",
  "seo-for-home-service-providers": "service-area",
};

const INDUSTRY_KINDS: Record<string, Kind> = {
  saas: "dashboard",
  "legal-tech": "brief",
  "health-tech": "pulse",
  logistics: "route",
  design: "moodboard",
  ecommerce: "journey",
  technology: "terminal",
  "local-services": "local-call",
};

/** Returns the illustration kind for a path, or undefined to keep the default art. */
export function heroArtKind(path: string): Kind | undefined {
  if (path === "/services") return "services";
  if (path === "/industries") return "industries";
  if (path === "/case-studies") return "cases";
  if (path === "/resources") return "library";
  if (path.startsWith("/blog") || path === "/insights") return "journal";
  const service = path.match(/^\/services\/([^/]+)$/)?.[1];
  if (service && SERVICE_KINDS[service]) return SERVICE_KINDS[service];
  const industry = path.match(/^\/industries\/([^/]+)$/)?.[1];
  if (industry && INDUSTRY_KINDS[industry]) return INDUSTRY_KINDS[industry];
  return undefined;
}

export function heroArtStyle(kind: Kind): CSSProperties {
  const p = PALETTES[kind];
  return { background: p.bg, "--exp": p.soft, "--exp-dark": p.dark } as CSSProperties;
}

/** Unique supporting lines for ExperienceHero pages (note under the buttons + bottom strip). */
const HERO_COPY: Partial<Record<Kind, { note: string; strip: [string, string] }>> = {
  services: { note: "Tell me what you want to grow. I’ll suggest which service should come first.", strip: ["Focused services. One connected growth plan.", "Strategy · SEO · Content · Conversion"] },
  industries: { note: "Share your market and buyers. We’ll discuss what they actually search for.", strip: ["Different buyers ask different questions.", "SaaS · Health · Legal · Logistics · Retail"] },
  dashboard: { note: "Share your product and ideal customer. We’ll look at the evaluation journey.", strip: ["Feature, comparison and integration pages buyers actually use.", "Trials · Demos · Pipeline"] },
  brief: { note: "Share your platform and buyers. We’ll discuss the trust signals they need.", strip: ["Careful content for careful software decisions.", "Expertise · Jurisdiction · Stakeholders"] },
  pulse: { note: "Tell me about your product and audiences. We’ll map what each one needs to know.", strip: ["Clear, reviewable information for clinical teams and patients.", "Accuracy · Citations · Compliance-aware copy"] },
  route: { note: "Share your lanes and capabilities. We’ll plan pages procurement teams can trust.", strip: ["Route, cargo and capability pages with real specifics.", "Freight · Warehousing · Last mile"] },
  moodboard: { note: "Share your portfolio and specialism. We’ll make the work easier to find.", strip: ["Give your best work the words search can understand.", "Studios · Agencies · Independent designers"] },
  journey: { note: "Tell me about your store and categories. We’ll trace how shoppers arrive.", strip: ["From the first search to a confident checkout.", "Categories · Products · Checkout"] },
  terminal: { note: "Share your product and docs. We’ll connect technical content with commercial pages.", strip: ["Speak the language engineers search in.", "Docs · APIs · Developer journeys"] },
  "local-call": { note: "Tell me your services and area. We’ll look at how nearby customers find you.", strip: ["Be visible where you actually work.", "Maps · Reviews · Service coverage"] },
  cases: { note: "Want to talk about a project like these? Share your website and goals.", strip: ["Real client work, with the context behind every outcome.", "SEO · Migrations · Growth partnerships"] },
  library: { note: "Looking for something specific? Ask, and I’ll point you to it.", strip: ["Free guides, insights and tools for growth decisions.", "Blog · Insights · Free tools"] },
  journal: { note: "Have a question you’d like answered in a future article? Send it over.", strip: ["Practical notes on search, content and conversion.", "New field notes added regularly"] },
};

export function heroArtCopy(kind: Kind) {
  return HERO_COPY[kind];
}

const Arrow = () => <span className="ha-arrow">↗</span>;
const Check = () => (
  <svg viewBox="0 0 16 16" className="ha-check"><circle cx="8" cy="8" r="8" /><path d="M4.5 8.2 7 10.6l4.6-5" /></svg>
);

function Frame({ kind, children }: { kind: Kind; children: ReactNode }) {
  return <div className="ha" data-art={kind} aria-hidden="true">{children}</div>;
}

/* ---------- Services ---------- */

function ServicesMenu() {
  const list = services.slice(0, 6);
  return (
    <Frame kind="services">
      <div className="ha-shape ha-circle" />
      <p className="ha-kicker ha-menu-kicker">Service menu</p>
      {list.map((s, i) => (
        <div key={s.slug} className={`ha-menu-tab${i === 2 ? " is-active" : ""}`} style={{ "--i": i } as CSSProperties}>
          <span>{String(i + 1).padStart(2, "0")}</span><strong>{s.name}</strong><Arrow />
        </div>
      ))}
    </Frame>
  );
}

function Roadmap() {
  const steps = ["Diagnose", "Prioritise", "Build", "Measure"];
  return (
    <Frame kind="roadmap">
      <div className="ha-shape ha-grid-paper" />
      <div className="ha-card ha-road">
        <p className="ha-kicker">Growth roadmap</p>
        <h3>From diagnosis to measured progress</h3>
        <svg viewBox="0 0 400 140" className="ha-road-path" preserveAspectRatio="none">
          <path d="M10 125 C 80 125, 90 85, 140 85 S 210 60, 260 55 S 340 20, 390 15" />
        </svg>
        <ol className="ha-road-steps">
          {steps.map((s, i) => <li key={s} style={{ "--i": i } as CSSProperties}><span>{String(i + 1).padStart(2, "0")}</span>{s}</li>)}
        </ol>
        <div className="ha-road-channels"><span>Search</span><span>Content</span><span>Website</span><span>Reporting</span></div>
      </div>
      <div className="ha-note ha-road-note">Clear priorities before more activity.</div>
    </Frame>
  );
}

function Pillars() {
  const cols = [
    { name: "Technical", blocks: ["Crawl", "Index", "Render"] },
    { name: "On-page", blocks: ["Intent", "Headings", "Copy", "Links"] },
    { name: "Off-page", blocks: ["Mentions", "Authority"] },
  ];
  return (
    <Frame kind="pillars">
      <div className="ha-shape ha-arch" />
      <div className="ha-pillars">
        {cols.map(c => (
          <div key={c.name} className="ha-pillar">
            {c.blocks.map(b => <span key={b}>{b}</span>)}
            <strong>{c.name}</strong>
          </div>
        ))}
      </div>
      <div className="ha-pillar-base">One connected search strategy</div>
    </Frame>
  );
}

function Outline() {
  return (
    <Frame kind="outline">
      <div className="ha-card ha-doc">
        <div className="ha-doc-bar"><i /><i /><i /><span>content-brief.doc</span></div>
        <div className="ha-doc-h1" />
        <ul>
          <li className="lvl-2"><b>H2</b>Topical map</li>
          <li className="lvl-3"><b>H3</b>SERP analysis</li>
          <li className="lvl-3"><b>H3</b>Questions buyers ask</li>
          <li className="lvl-2"><b>H2</b>Content brief</li>
          <li className="lvl-3"><b>H3</b>Internal links</li>
          <li className="lvl-2"><b>H2</b>Refresh plan</li>
        </ul>
      </div>
      <svg viewBox="0 0 200 200" className="ha-cluster">
        {[[100, 28], [170, 80], [150, 165], [50, 165], [30, 80]].map(([x, y]) => <line key={`${x}${y}`} x1="100" y1="100" x2={x} y2={y} />)}
        {[[100, 28], [170, 80], [150, 165], [50, 165], [30, 80]].map(([x, y]) => <circle key={`c${x}${y}`} cx={x} cy={y} r="13" />)}
        <circle cx="100" cy="100" r="30" className="hub" />
        <text x="100" y="104">Topic</text>
      </svg>
    </Frame>
  );
}

function Funnel() {
  const stages = ["Visit", "Understand", "Trust", "Enquire"];
  return (
    <Frame kind="funnel">
      <div className="ha-shape ha-blob-soft" />
      <div className="ha-funnel">
        {stages.map((s, i) => <div key={s} style={{ "--i": i } as CSSProperties}><span>{s}</span></div>)}
      </div>
      <div className="ha-card ha-form">
        <p className="ha-kicker">Enquiry form</p>
        <span className="ha-input" /><span className="ha-input" /><span className="ha-input short" />
        <span className="ha-btn">Send enquiry <Arrow /></span>
        <svg viewBox="0 0 24 24" className="ha-cursor"><path d="M4 2l15 8-6.5 1.8L10 18z" /></svg>
      </div>
      <div className="ha-note ha-funnel-note">Fewer steps between interest and contact.</div>
    </Frame>
  );
}

function Catalog() {
  const tiles = ["Category page", "Product page", "Product schema", "Internal links"];
  return (
    <Frame kind="catalog">
      <div className="ha-crumb">Home <i>›</i> Category <i>›</i> <b>Product</b></div>
      <div className="ha-shop-grid">
        {tiles.map((t, i) => (
          <div key={t} className={`ha-card ha-tile${i === 2 ? " is-active" : ""}`}>
            <div className="ha-tile-img" style={{ "--i": i } as CSSProperties} />
            <strong>{t}</strong>
            <span className="ha-line" /><span className="ha-line short" />
          </div>
        ))}
      </div>
      <div className="ha-filters">
        <p className="ha-kicker">Filters</p>
        <span>Size</span><span>Colour</span><span>Brand</span>
        <small>Crawlable only where useful</small>
      </div>
    </Frame>
  );
}

function ServiceArea() {
  return (
    <Frame kind="service-area">
      <div className="ha-card ha-map">
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
          <path className="water" d="M-10 220 C 80 180, 150 260, 240 210 S 360 170, 410 200 L410 310 L-10 310z" />
          {[60, 140, 220, 300, 380].map(x => <line key={`v${x}`} x1={x} y1="0" x2={x - 30} y2="300" />)}
          {[50, 120, 190].map(y => <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y + 20} />)}
          <circle className="radius" cx="200" cy="130" r="95" />
          {[[200, 130], [130, 85], [275, 175]].map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`} className={i === 0 ? "pin main" : "pin"}>
              <path d="M0 0c-9-12-14-19-14-26a14 14 0 0 1 28 0c0 7-5 14-14 26z" /><circle cy="-26" r="5" />
            </g>
          ))}
        </svg>
      </div>
      <div className="ha-card ha-search">
        <svg viewBox="0 0 24 24" className="ha-search-icon"><circle cx="10" cy="10" r="6" /><path d="m15 15 5 5" /></svg>
        <span>emergency plumber near me</span>
      </div>
      <div className="ha-chip-stack">
        <span>Service pages</span><span>Service-area pages</span><span>Call &amp; quote paths</span>
      </div>
    </Frame>
  );
}

/* ---------- Industries ---------- */

function IndustriesMosaic() {
  const names = industries.slice(0, 8).map(i => i.name);
  return (
    <Frame kind="industries">
      <div className="ha-mosaic">
        {names.slice(0, 4).map((n, i) => <span key={n} style={{ "--i": i } as CSSProperties}>{n}</span>)}
        <strong>Your market</strong>
        {names.slice(4).map((n, i) => <span key={n} style={{ "--i": i + 4 } as CSSProperties}>{n}</span>)}
      </div>
    </Frame>
  );
}

function Dashboard() {
  return (
    <Frame kind="dashboard">
      <div className="ha-shape ha-circle small" />
      <div className="ha-card ha-browser">
        <div className="ha-browser-bar"><i /><i /><i /><span>yourproduct.com/features</span></div>
        <div className="ha-browser-body">
          <aside><span /><span /><span /><span /></aside>
          <div>
            <div className="ha-tabs"><b>Features</b><span>Integrations</span><span>Comparisons</span></div>
            <svg viewBox="0 0 260 110" className="ha-chart" preserveAspectRatio="none">
              <path className="area" d="M0 100 L0 85 C 40 80, 60 70, 90 66 S 150 50, 180 38 S 230 20, 260 12 L260 110 L0 110z" />
              <path className="line" d="M0 85 C 40 80, 60 70, 90 66 S 150 50, 180 38 S 230 20, 260 12" />
            </svg>
          </div>
        </div>
      </div>
      <div className="ha-note ha-dash-note">Evaluation pages for buyers, not just readers.</div>
      <div className="ha-pill ha-dash-pill">Trial <Arrow /> Demo</div>
    </Frame>
  );
}

function Brief() {
  return (
    <Frame kind="brief">
      <div className="ha-card ha-paper">
        <p className="ha-kicker">Evaluation guide</p>
        <h3>What a careful buyer needs to see</h3>
        <ul>
          <li><Check />Expert-reviewed content</li>
          <li><Check />Jurisdiction clearly noted</li>
          <li><Check />Answers for each stakeholder</li>
        </ul>
        <div className="ha-paper-lines"><span /><span /><span className="short" /></div>
      </div>
      <div className="ha-seal"><span>§</span><small>Trust · Accuracy</small></div>
    </Frame>
  );
}

function Pulse() {
  return (
    <Frame kind="pulse">
      <div className="ha-shape ha-blob-soft" />
      <div className="ha-card ha-ecg">
        <p className="ha-kicker">Product information</p>
        <svg viewBox="0 0 300 80" preserveAspectRatio="none">
          <polyline points="0,45 60,45 75,45 85,20 98,70 110,10 122,55 135,45 200,45 212,32 224,45 300,45" />
        </svg>
        <div className="ha-audiences">
          <div><span>For buyers</span><strong>Clinical teams</strong></div>
          <div><span>For users</span><strong>Patients</strong></div>
        </div>
      </div>
      <div className="ha-badge ha-pulse-badge"><Check />Reviewed &amp; cited</div>
    </Frame>
  );
}

function Route() {
  return (
    <Frame kind="route">
      <div className="ha-card ha-routemap">
        <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid meet">
          <defs><pattern id="ha-dots" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.3" /></pattern></defs>
          <rect width="400" height="260" fill="url(#ha-dots)" className="dots" />
          <path className="lane" d="M50 200 C 120 200, 130 90, 200 100 S 300 60, 350 50" />
          <path className="lane alt" d="M200 100 C 240 150, 300 190, 350 200" />
          {[[50, 200, "Origin"], [200, 100, "Hub"], [350, 50, "Port"], [350, 200, "Warehouse"]].map(([x, y, l]) => (
            <g key={String(l)} transform={`translate(${x} ${y})`}><circle r="9" className="node" /><circle r="3.5" className="core" /><text y="-16">{l}</text></g>
          ))}
        </svg>
      </div>
      <div className="ha-card ha-cargo">
        <div className="ha-box" />
        <div><p className="ha-kicker">Buyer checks</p><span>Capacity</span><span>Certifications</span><span>Transit times</span></div>
      </div>
    </Frame>
  );
}

function Moodboard() {
  return (
    <Frame kind="moodboard">
      <div className="ha-polaroid">
        <div className="ha-polaroid-img" />
        <p>Project · Story · Outcome</p>
        <i className="ha-tape" />
      </div>
      <div className="ha-card ha-type">Aa<small>Words search can read</small></div>
      <div className="ha-swatches"><i /><i /><i /><i /></div>
    </Frame>
  );
}

function Journey() {
  const steps = ["Category", "Product", "Checkout"];
  return (
    <Frame kind="journey">
      <div className="ha-shape ha-circle" />
      <div className="ha-card ha-search wide">
        <svg viewBox="0 0 24 24" className="ha-search-icon"><circle cx="10" cy="10" r="6" /><path d="m15 15 5 5" /></svg>
        <span>running shoes for wide feet</span>
      </div>
      <div className="ha-journey">
        {steps.map((s, i) => (
          <div key={s} className="ha-card" style={{ "--i": i } as CSSProperties}>
            <div className="ha-journey-icon">{i === 0 ? "▦" : i === 1 ? "◧" : "✓"}</div>
            <strong>{s}</strong><span className="ha-line" /><span className="ha-line short" />
          </div>
        ))}
      </div>
      <div className="ha-bag"><i /></div>
    </Frame>
  );
}

function Terminal() {
  return (
    <Frame kind="terminal">
      <div className="ha-term">
        <div className="ha-browser-bar dark"><i /><i /><i /><span>site-audit</span></div>
        <pre>
          <span className="p">$</span> map docs → product{"\n"}
          <span className="ok">✓</span> /docs/api <span className="m">→ /product</span>{"\n"}
          <span className="ok">✓</span> /docs/setup <span className="m">→ /pricing</span>{"\n"}
          <span className="warn">!</span> rendering <span className="m">check JS content</span>{"\n"}
          <span className="warn">!</span> terms <span className="m">match how engineers search</span>{"\n"}
          <span className="p">$</span> <span className="cursor" />
        </pre>
      </div>
      <div className="ha-card ha-link-card"><span>Docs</span><b>⇄</b><span>Product pages</span></div>
    </Frame>
  );
}

function LocalCall() {
  return (
    <Frame kind="local-call">
      <div className="ha-shape ha-arch" />
      <div className="ha-phone">
        <div className="ha-phone-notch" />
        <div className="ha-phone-search">electrician near me</div>
        <div className="ha-phone-map"><span className="dot" /><span className="dot b" /><span className="dot c" /></div>
        <div className="ha-listing">
          <strong>Your business</strong>
          <span className="ha-stars">★★★★★</span>
          <small>Open now · Serves your area</small>
          <div><b>Call</b><span>Directions</span></div>
        </div>
      </div>
      <div className="ha-chip-stack right"><span>Map visibility</span><span>Fresh reviews</span><span>Service coverage</span></div>
    </Frame>
  );
}

/* ---------- Other hubs ---------- */

function Cases() {
  const names = new Map(industries.map(i => [i.slug, i.name]));
  const items = caseStudyIndex.slice(0, 3);
  return (
    <Frame kind="cases">
      <div className="ha-folders">
        {items.map((c, i) => (
          <div key={c.slug} className="ha-folder" style={{ "--i": i } as CSSProperties}>
            <span className="ha-folder-tab">{c.label ?? names.get(c.industry) ?? c.industry}</span>
            <strong>{c.client}</strong>
            <p>The starting point · The work · The context</p>
          </div>
        ))}
      </div>
      <div className="ha-note ha-cases-note">Real projects, explained with their context.</div>
    </Frame>
  );
}

function Library() {
  const books = [["Blog", "Guides"], ["Insights", "Perspectives"], ["Free tools", "Checkers"]];
  return (
    <Frame kind="library">
      <div className="ha-shelf">
        {books.map(([b, s], i) => <div key={b} className="ha-book" style={{ "--i": i } as CSSProperties}><strong>{b}</strong><small>{s}</small></div>)}
        <div className="ha-book lean" />
      </div>
      <div className="ha-shelf-board" />
      <div className="ha-card ha-library-card"><p className="ha-kicker">Resources</p><strong>Practical reading for growth decisions</strong></div>
    </Frame>
  );
}

function Journal() {
  return (
    <Frame kind="journal">
      <div className="ha-card ha-paper-news">
        <div className="ha-masthead"><strong>The Growth Journal</strong><span>Field notes on search &amp; content</span></div>
        <div className="ha-news-cols">
          <div><div className="ha-news-img" /><span className="ha-line" /><span className="ha-line" /><span className="ha-line short" /></div>
          <div><blockquote>“Start with what the searcher needs.”</blockquote><span className="ha-line" /><span className="ha-line" /><span className="ha-line" /><span className="ha-line short" /></div>
        </div>
      </div>
      <div className="ha-pill ha-journal-pill">New article <Arrow /></div>
    </Frame>
  );
}

const ART: Record<Kind, () => ReactNode> = {
  services: ServicesMenu, roadmap: Roadmap, pillars: Pillars, outline: Outline, funnel: Funnel, catalog: Catalog, "service-area": ServiceArea,
  industries: IndustriesMosaic, dashboard: Dashboard, brief: Brief, pulse: Pulse, route: Route, moodboard: Moodboard, journey: Journey, terminal: Terminal, "local-call": LocalCall,
  cases: Cases, library: Library, journal: Journal,
};

export function HeroArt({ kind }: { kind: Kind }) {
  const Art = ART[kind];
  return <Art />;
}
