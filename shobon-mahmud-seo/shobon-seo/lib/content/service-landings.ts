/**
 * Hand-written, service-specific copy for the service landing pages.
 * Each service has its own hero, search examples, journey, audiences,
 * fit criteria, principles and calls to action, so no two pages repeat.
 * Structured CMS content (covers, process, deliverables, FAQs…) still
 * comes from services-services.json and is rendered alongside this copy.
 */

export type IconName =
  | "Compass" | "Layers" | "LineChart" | "Target" | "BarChart3" | "Building2" | "Rocket" | "Globe"
  | "Repeat" | "Code2" | "FileSearch" | "Link2" | "Scale" | "PenLine" | "BookOpen" | "MousePointerClick"
  | "Palette" | "Archive" | "Siren" | "Zap" | "Trees" | "Bug" | "LayoutGrid" | "Package" | "ShoppingCart"
  | "Shirt" | "Sofa" | "Cpu" | "Leaf" | "Store" | "Gift" | "Eye" | "ShieldCheck" | "Megaphone" | "Wrench"
  | "Home" | "Sparkles" | "Stethoscope" | "ShoppingBag" | "MapPin" | "Phone" | "Search";

export type ServiceLandingCopy = {
  label: string;
  eyebrow: string;
  h1: [string, string, string];
  intro: string;
  proof: [string, string, string];
  note: string;
  queries: string[];
  split: { eyebrow: string; title: string; lead: string; journeyLabel: string; journey: [IconName, string, string][] };
  covers: { eyebrow: string; title: string; intro: string };
  process: { title: string; intro: string };
  deliverables: { title: string; intro: string };
  audiences: { title: string; intro: string; items: { icon: IconName; name: string; text: string; href: string }[] };
  fit: { good: string[]; different: string[] };
  principles: [string, string][];
  mid: { title: string; body: string; action: string };
  final: { eyebrow: string; title: string; body: string; whatsapp: string };
  faqTitle: string;
  articlesTitle: string;
};

export const serviceLandings: Record<string, ServiceLandingCopy> = {
  "digital-growth-strategy": {
    label: "Digital Growth Strategy",
    eyebrow: "DIGITAL GROWTH STRATEGY · ONE PLAN FOR EVERY CHANNEL",
    h1: ["Stop guessing", "where growth", "should come from."],
    intro: "I help businesses decide which channels, pages and improvements deserve attention first. One plan that connects search, content, your website and reporting to the customers you want more of.",
    proof: ["Business & customer diagnosis", "Channel priorities", "Measurement plan"],
    note: "Led by Shobon Mahmud · Strategy first, activity second",
    queries: ["“where should we invest next?”", "“why aren’t leads growing?”", "“which channel actually works?”", "“what should we stop doing?”"],
    split: {
      eyebrow: "MORE ACTIVITY IS NOT A STRATEGY",
      title: "Too many ideas. Not enough direction.",
      lead: "The plan starts with your commercial reality, not a list of tactics. We look at who buys, how they find you today and where the website loses them, then agree a short list of priorities your team can deliver.",
      journeyLabel: "ILLUSTRATIVE PLANNING SEQUENCE",
      journey: [["Compass", "Understand the business", "Offers, margins, customers and capacity"], ["Layers", "Choose the channels", "Where demand exists and where you can compete"], ["LineChart", "Measure what matters", "Leads, quality and the context behind the numbers"]],
    },
    covers: { eyebrow: "WHAT THE STRATEGY COVERS", title: "Five decisions that shape the year ahead.", intro: "Each area answers a practical question about where effort should go, and what to leave alone for now." },
    process: { title: "How the strategy comes together.", intro: "Short, focused phases with a decision at the end of each one, so the plan never drifts into a document nobody uses." },
    deliverables: { title: "What you take away.", intro: "Practical outputs your team, partners or new hires can pick up and act on without me in the room." },
    audiences: {
      title: "For teams deciding where to put the next pound, dollar or dirham.",
      intro: "The right plan depends on the business model. A clinic, a SaaS product and an online store grow through different decisions.",
      items: [
        { icon: "Target", name: "Founders planning the next stage", text: "Turn a long list of growth ideas into an order of work that matches your budget and team.", href: "/contact" },
        { icon: "BarChart3", name: "Marketing leads under pressure", text: "Explain clearly why some channels deserve more investment and others need to wait.", href: "/services/conversion-rate-optimization" },
        { icon: "Building2", name: "Service businesses", text: "Connect enquiries, sales conversations and the pages people read before they get in touch.", href: "/industries/local-services" },
        { icon: "Rocket", name: "SaaS & product teams", text: "Align acquisition, evaluation pages and trial or demo journeys around one goal.", href: "/industries/saas" },
        { icon: "ShoppingBag", name: "Online stores", text: "Balance category growth, product content and paid channels around margin.", href: "/industries/ecommerce" },
        { icon: "Globe", name: "Businesses entering new markets", text: "Plan language, research and pages before spending on visibility in a new country.", href: "/locations" },
      ],
    },
    fit: {
      good: ["You want a clear order of priorities, not a pile of tactics.", "You can share sales, lead and analytics context honestly.", "Decision-makers are available to agree trade-offs.", "You plan to implement, in-house, with partners or with me."],
      different: ["You need a single tactic executed tomorrow with no planning.", "You expect a guaranteed growth figure before any diagnosis.", "Nobody can give access to data or the people who own it.", "You want a strategy deck that will sit in a folder."],
    },
    principles: [["Commercial context first", "Recommendations follow your offers, capacity and margins, not channel trends."], ["Fewer, better priorities", "A short list you can deliver beats a long list nobody owns."], ["Decisions you can revisit", "Each priority has a reason and a review point, so the plan changes when the evidence does."]],
    mid: { title: "Not sure which problem to solve first?", body: "Share where growth has stalled. We will talk through the evidence before choosing a scope.", action: "Talk through my priorities" },
    final: { eyebrow: "LET’S AGREE THE NEXT MOVE", title: "Give your growth work one clear direction.", body: "Tell me about your business, the customers you want more of and what you have already tried. We’ll discuss where the plan should start.", whatsapp: "a digital growth strategy" },
    faqTitle: "Growth strategy: questions before you start.",
    articlesTitle: "Growth strategy, explained plainly.",
  },

  "Holistic-SEO": {
    label: "Holistic SEO",
    eyebrow: "HOLISTIC SEO · TECHNICAL + ON-PAGE + OFF-PAGE",
    h1: ["Every part of", "your SEO,", "pulling one way."],
    intro: "Technical health, page content and authority usually get handled separately. I connect them into one plan, so crawlability, relevance and reputation support the same buyers and the same pages.",
    proof: ["Crawl & indexing", "Intent-led pages", "Authority & mentions"],
    note: "Led by Shobon Mahmud · One plan, three foundations",
    queries: ["“pages not indexed”", "“traffic but no leads”", "“site migration SEO”", "“why did our visibility drop?”"],
    split: {
      eyebrow: "ISOLATED FIXES STALL",
      title: "Fixing one layer rarely fixes the result.",
      lead: "A technical fix can’t rescue a page nobody needs, and strong content can’t perform if it is never indexed. The work starts by finding which layer is limiting the rest.",
      journeyLabel: "HOW THE FOUNDATIONS CONNECT",
      journey: [["Code2", "Search engines can reach it", "Crawl paths, rendering and index signals"], ["FileSearch", "The page answers the query", "Intent, headings, copy and internal links"], ["Link2", "Others vouch for it", "Relevant mentions, links and brand signals"]],
    },
    covers: { eyebrow: "WHAT HOLISTIC SEO COVERS", title: "The connected checklist behind the plan.", intro: "From crawl paths to the words on the page, reviewed together so one fix doesn’t cancel out another." },
    process: { title: "From scattered tasks to one implementation plan.", intro: "Each phase has a purpose, an owner and a way to check completion. The order changes when your site’s evidence calls for it." },
    deliverables: { title: "Handoffs your team can act on.", intro: "A plan should survive the handoff to a developer, writer or decision-maker. The proposal confirms which deliverables are included." },
    audiences: {
      title: "For websites where several things need fixing at once.",
      intro: "A connected plan helps most when technical, content and authority issues overlap and nobody owns the whole picture.",
      items: [
        { icon: "Repeat", name: "Sites after a migration", text: "Recover structure, redirects and internal links when a move has disrupted visibility.", href: "/case-studies" },
        { icon: "Layers", name: "Growing content libraries", text: "Organise overlapping pages so each one has a clear role and audience.", href: "/services/content-seo" },
        { icon: "Code2", name: "JavaScript-heavy websites", text: "Make sure important content renders and can be indexed reliably.", href: "/industries/technology" },
        { icon: "Rocket", name: "SaaS marketing sites", text: "Connect feature, comparison and integration pages to real buyer intent.", href: "/industries/saas" },
        { icon: "ShoppingBag", name: "Large catalogues", text: "Control crawl waste from filters while strengthening category pages.", href: "/services/ecommerce-seo" },
        { icon: "Scale", name: "Regulated & expert fields", text: "Pair technical quality with expert-reviewed content buyers can trust.", href: "/industries/legal-tech" },
      ],
    },
    fit: {
      good: ["Several parts of your search presence need attention at once.", "Developers or a CMS team can implement technical changes.", "You want reasons and priorities, not just an audit spreadsheet.", "You’re prepared for compounding progress, not overnight jumps."],
      different: ["One isolated issue is the only thing that needs fixing.", "You need a guaranteed position for a keyword.", "Link volume matters more to you than relevance.", "Nobody can make changes to the website."],
    },
    principles: [["Diagnose before prescribing", "The audit identifies the constraint; the plan addresses it first."], ["Implementation-ready handoffs", "Recommendations written for the developer, writer or editor who will act on them."], ["Honest attribution", "Reporting separates what changed on the site from market and algorithm movement."]],
    mid: { title: "Which foundation is holding your site back?", body: "Share your website and what you are seeing in search. We will discuss the constraint before choosing the scope.", action: "Review my site’s priorities" },
    final: { eyebrow: "LET’S CONNECT THE WORK", title: "Give your SEO one direction and a clear next step.", body: "Share your website, the customers you want to reach and the constraint you want to solve. We’ll discuss a focused plan and how to measure progress.", whatsapp: "holistic SEO for my website" },
    faqTitle: "Holistic SEO: questions before you start.",
    articlesTitle: "Technical and on-page SEO, explained.",
  },

  "content-seo": {
    label: "Content SEO",
    eyebrow: "CONTENT SEO · TOPICS, BRIEFS & REFRESHES",
    h1: ["Content that", "answers the search", "and moves the buyer."],
    intro: "I plan the topics, structure and briefs behind content people actually look for. Each page gets a clear role, from the first question to the moment someone compares you or gets in touch.",
    proof: ["Topical maps", "SERP-led briefs", "Content refreshes"],
    note: "Led by Shobon Mahmud · Research before writing",
    queries: ["“how to choose a…”", "“X vs Y for small teams”", "“what does it cost to…”", "“best way to fix…”"],
    split: {
      eyebrow: "PUBLISHING MORE ISN’T THE GOAL",
      title: "Lots of posts. Very few enquiries.",
      lead: "I look at the questions your buyers ask at each stage and the pages that already exist. Then we decide what to create, merge, refresh or retire, so the library gets more useful instead of just bigger.",
      journeyLabel: "FROM QUESTION TO CONVERSATION",
      journey: [["Search", "Match the real question", "Intent and format from the live results"], ["BookOpen", "Answer it properly", "Expertise, examples and a clear structure"], ["MousePointerClick", "Show the next step", "Links to services, comparisons or contact"]],
    },
    covers: { eyebrow: "WHAT CONTENT SEO COVERS", title: "From the topic map to the finished brief.", intro: "Research, structure and editorial direction your writers can work from with confidence." },
    process: { title: "How a content plan is built.", intro: "We start with what exists and what buyers ask, then turn it into briefs your team can write against." },
    deliverables: { title: "What lands in your editorial queue.", intro: "Documents designed for writers and editors, not just for SEO reviews." },
    audiences: {
      title: "For teams with expertise worth finding.",
      intro: "Good content plans look different for a law-tech platform, a clinic and a design studio. The questions, proof and review process change.",
      items: [
        { icon: "PenLine", name: "In-house writing teams", text: "Briefs with intent, structure and sources, so drafts need fewer rewrites.", href: "/contact" },
        { icon: "Rocket", name: "SaaS companies", text: "Plan problem, comparison and use-case content that supports evaluation.", href: "/industries/saas" },
        { icon: "Stethoscope", name: "Health & expert brands", text: "Structure reviewed, cited content for topics where accuracy matters.", href: "/industries/health-tech" },
        { icon: "Scale", name: "Legal & compliance topics", text: "Explain complex subjects clearly, with jurisdiction and review in mind.", href: "/industries/legal-tech" },
        { icon: "Palette", name: "Agencies & studios", text: "Turn portfolio work into case studies with searchable context.", href: "/industries/design" },
        { icon: "Archive", name: "Sites with an old blog", text: "Find posts worth refreshing, merging or redirecting.", href: "/services/Holistic-SEO" },
      ],
    },
    fit: {
      good: ["You have expertise worth sharing but no clear content plan.", "Someone can write, or review, the content.", "You prefer fewer, more useful pages over volume.", "You’ll connect content to services and contact paths."],
      different: ["You want dozens of posts a month with no review.", "You need AI copy published unedited at scale.", "Guaranteed rankings matter more than usefulness.", "No subject expert is available to check accuracy."],
    },
    principles: [["Intent before keywords", "Format and depth follow what searchers actually expect to see."], ["Editorial standards", "Claims are sourced, examples are real and expertise is visible."], ["Every page has a job", "Each piece links to the next useful step instead of ending in a dead end."]],
    mid: { title: "Have content that isn’t pulling its weight?", body: "Share your site and a few key pages. We’ll look at what to refresh, merge or create first.", action: "Review my content" },
    final: { eyebrow: "LET’S PLAN YOUR CONTENT", title: "Publish fewer pages that do more work.", body: "Tell me about your audience, your expertise and the content you already have. We’ll discuss where a content plan should begin.", whatsapp: "content SEO" },
    faqTitle: "Content SEO: what people ask first.",
    articlesTitle: "Content strategy, without the fluff.",
  },

  "seo-for-home-service-providers": {
    label: "Home Service SEO",
    eyebrow: "HOME SERVICE SEO · PLUMBERS, ELECTRICIANS, ROOFERS & MORE",
    h1: ["When something breaks,", "be the business", "they call."],
    intro: "I help home service businesses show up for urgent and planned jobs in the areas they actually cover, with service pages, profiles and quote paths that make calling you the obvious next step.",
    proof: ["Emergency & planned jobs", "Service-area pages", "Call & quote paths"],
    note: "Led by Shobon Mahmud · Built around your real coverage",
    queries: ["“emergency plumber near me”", "“boiler repair today”", "“roof leak quote”", "“electrician open now”"],
    split: {
      eyebrow: "URGENT JOBS. PLANNED PROJECTS.",
      title: "A burst pipe and a new kitchen need different pages.",
      lead: "An emergency search needs a phone number and reassurance in seconds. A planned renovation needs examples, process and a quote form. I structure your pages and profile around both.",
      journeyLabel: "ILLUSTRATIVE CALL-OUT JOURNEY",
      journey: [["Siren", "Spot the right service fast", "Clear emergency and service information"], ["MapPin", "Confirm you cover the area", "Honest service-area and availability details"], ["Phone", "Call or request a quote", "One tap to call, message or book"]],
    },
    covers: { eyebrow: "WHAT HOME SERVICE SEO COVERS", title: "Everything between the search and the call-out.", intro: "Local visibility, service pages and a mobile experience that works when customers are in a hurry." },
    process: { title: "How we get your phone ringing for the right jobs.", intro: "Practical steps that fit around a busy trade business, with clear asks for photos, details and feedback." },
    deliverables: { title: "What your business gets.", intro: "Improvements you can see on your profile and website, not just a report." },
    audiences: {
      title: "For trades customers need fast, and trades they plan around.",
      intro: "Every trade has its own mix of emergency calls, scheduled work and seasonal demand. The pages should follow that mix.",
      items: [
        { icon: "Wrench", name: "Plumbers & heating engineers", text: "Separate emergency, repair and installation searches with clear pages.", href: "/contact" },
        { icon: "Zap", name: "Electricians", text: "Explain domestic and commercial work, qualifications and coverage.", href: "/contact" },
        { icon: "Home", name: "Roofers & builders", text: "Show real projects, materials and a simple way to request a survey.", href: "/industries/local-services" },
        { icon: "Sparkles", name: "Cleaning services", text: "Clarify packages, frequency and areas so enquiries arrive qualified.", href: "/industries/local-services" },
        { icon: "Trees", name: "Landscapers & gardeners", text: "Plan seasonal content and project galleries with useful context.", href: "/services/content-seo" },
        { icon: "Bug", name: "Pest control", text: "Answer urgent problem searches with clear treatment and call options.", href: "/services/local-seo" },
      ],
    },
    fit: {
      good: ["You serve a defined area and can describe it accurately.", "You can share real job photos and project details.", "Your team can answer calls and quote requests promptly.", "You want more of the jobs you actually want."],
      different: ["You want pages for towns you don’t really serve.", "You’re looking for fake reviews or invented credentials.", "Nobody can answer the phone when leads arrive.", "You need guaranteed map placement."],
    },
    principles: [["Real coverage only", "Service areas reflect where you actually work, with no doorway pages."], ["Built for the phone", "Most urgent searches happen on mobile, so pages are designed for that moment."], ["Job quality over volume", "We look at which jobs come in, not just how many calls."]],
    mid: { title: "Getting calls for the wrong jobs?", body: "Tell me your services and area. We’ll look at which pages and profile details need work first.", action: "Review my local presence" },
    final: { eyebrow: "LET’S FILL YOUR DIARY WITH THE RIGHT JOBS", title: "Be the easy call in your service area.", body: "Share your trade, the areas you cover and the jobs you want more of. We’ll discuss where to start.", whatsapp: "SEO for my home service business" },
    faqTitle: "Home service SEO: common questions.",
    articlesTitle: "Local search tips for trades.",
  },

  "ecommerce-seo": {
    label: "E-commerce SEO",
    eyebrow: "E-COMMERCE SEO · CATEGORIES, PRODUCTS & FILTERS",
    h1: ["Help shoppers", "find the product", "and trust the page."],
    intro: "I help online stores turn category and product pages into useful landing pages for search, while keeping filters, duplicates and thin pages from diluting the catalogue.",
    proof: ["Category optimisation", "Product schema", "Faceted navigation"],
    note: "Led by Shobon Mahmud · For catalogues of any size",
    queries: ["“waterproof hiking boots women”", "“oak dining table 6 seater”", "“gift for runners”", "“quiet espresso grinder”"],
    split: {
      eyebrow: "A GRID OF PRODUCTS ISN’T A LANDING PAGE",
      title: "Shoppers search by need. Catalogues are built by SKU.",
      lead: "Most store traffic should land on categories, not the homepage. I review how categories, filters and products are organised, so the pages people land on answer their needs and search engines spend time on the URLs that matter.",
      journeyLabel: "ILLUSTRATIVE SHOPPING JOURNEY",
      journey: [["LayoutGrid", "Land on the right category", "Filters and copy that match the search"], ["Package", "Compare the products", "Specs, reviews and clear differences"], ["ShoppingCart", "Buy with confidence", "Delivery, returns and stock information"]],
    },
    covers: { eyebrow: "WHAT E-COMMERCE SEO COVERS", title: "From the category tree to structured data.", intro: "Technical control and merchandising-aware content, planned together." },
    process: { title: "How we improve a catalogue.", intro: "We start with the categories that matter commercially, then work outwards through templates, filters and products." },
    deliverables: { title: "What your store team receives.", intro: "Template-level recommendations and priorities your developers and merchandisers can apply across the catalogue." },
    audiences: {
      title: "For stores where the catalogue is the website.",
      intro: "Fashion sizing, furniture dimensions and electronics specs create different search and filter problems.",
      items: [
        { icon: "Shirt", name: "Fashion & apparel", text: "Handle sizes, colours and seasonal ranges without duplicate URLs.", href: "/industries/ecommerce" },
        { icon: "Sofa", name: "Furniture & homeware", text: "Write category guidance that helps people choose dimensions and materials.", href: "/industries/ecommerce" },
        { icon: "Cpu", name: "Electronics & tech retail", text: "Make specs comparable and structured data accurate.", href: "/industries/technology" },
        { icon: "Leaf", name: "Health & beauty", text: "Present ingredients and claims carefully, with reviewable information.", href: "/industries/health-tech" },
        { icon: "Store", name: "Retailers with a shop", text: "Connect online categories with local stock and store visits.", href: "/services/local-seo" },
        { icon: "Gift", name: "Niche & specialist stores", text: "Use expertise to win specific searches big marketplaces ignore.", href: "/services/content-seo" },
      ],
    },
    fit: {
      good: ["Your platform lets you edit categories, templates and filters.", "You can share product data and margin priorities.", "You want growth in categories that make commercial sense.", "Merchandising and development can support changes."],
      different: ["You want thousands of auto-generated pages.", "Manufacturer descriptions must stay untouched everywhere.", "Nobody can change the platform templates.", "Ranking guarantees are a requirement."],
    },
    principles: [["Margin-aware priorities", "Categories that matter commercially get attention first."], ["Respect for crawl budget", "Filters are indexable only where there is real search demand."], ["Accurate structured data", "Schema reflects real price, stock and reviews, never inflated."]],
    mid: { title: "Are filters creating more URLs than customers?", body: "Share your store and platform. We’ll look at the categories and crawl issues worth fixing first.", action: "Review my store" },
    final: { eyebrow: "LET’S GROW THE RIGHT CATEGORIES", title: "Turn your catalogue into pages shoppers want to land on.", body: "Tell me about your store, your platform and the categories that matter most. We’ll discuss what deserves attention first.", whatsapp: "e-commerce SEO for my store" },
    faqTitle: "E-commerce SEO: before you start.",
    articlesTitle: "Store SEO, explained clearly.",
  },

  "conversion-rate-optimization": {
    label: "Conversion Rate Optimization",
    eyebrow: "CONVERSION RATE OPTIMIZATION · FROM VISIT TO ENQUIRY",
    h1: ["You already have", "the visitors.", "Let’s keep more of them."],
    intro: "I review the pages, offers and forms between a visit and an enquiry. Using your data and real customer questions, we prioritise the changes most likely to remove friction, then check what happened.",
    proof: ["Tracking baseline", "Landing-page review", "Forms & enquiry paths"],
    note: "Led by Shobon Mahmud · Evidence before redesigns",
    queries: ["“why do visitors leave?”", "“form gets no submissions”", "“landing page not converting”", "“how to get more enquiries”"],
    split: {
      eyebrow: "TRAFFIC ISN’T THE ONLY LEVER",
      title: "More visitors won’t fix a page people leave.",
      lead: "Before suggesting tests or redesigns, I check tracking, look at how people move through key pages and listen to the questions your sales team hears. Changes are prioritised by evidence and effort, not opinion.",
      journeyLabel: "WHERE ENQUIRIES GET LOST",
      journey: [["Eye", "First impression", "Does the page match what they came for?"], ["ShieldCheck", "Reasons to trust", "Proof, clarity and answers to objections"], ["MousePointerClick", "An easy next step", "Short forms and obvious calls to action"]],
    },
    covers: { eyebrow: "WHAT CRO COVERS", title: "Five checks between a click and a conversation.", intro: "Measurement, messaging and forms, reviewed in the order that removes the most friction." },
    process: { title: "How conversion work runs.", intro: "A steady loop of evidence, change and review, sized to what your traffic can genuinely tell us." },
    deliverables: { title: "What you can put to work.", intro: "Clear briefs and findings that designers, developers and copywriters can implement directly." },
    audiences: {
      title: "For websites that get visits but not enough conversations.",
      intro: "A booking form, a SaaS trial and a quote request lose people for different reasons.",
      items: [
        { icon: "Megaphone", name: "Teams running paid campaigns", text: "Make landing pages earn the clicks you already pay for.", href: "/services/digital-growth-strategy" },
        { icon: "Building2", name: "B2B service firms", text: "Clarify offers and shorten the route to a sales conversation.", href: "/industries/technology" },
        { icon: "Rocket", name: "SaaS sign-up flows", text: "Reduce friction between pricing, trial and demo requests.", href: "/industries/saas" },
        { icon: "ShoppingCart", name: "Online stores", text: "Review product pages, basket and checkout for avoidable drop-off.", href: "/industries/ecommerce" },
        { icon: "Stethoscope", name: "Clinics & booking businesses", text: "Make appointments and enquiries simple on a phone.", href: "/industries/health-tech" },
        { icon: "Wrench", name: "Local service providers", text: "Turn service pages into clear quote and call journeys.", href: "/services/seo-for-home-service-providers" },
      ],
    },
    fit: {
      good: ["Your site gets steady traffic but too few enquiries.", "Analytics can be checked or set up properly.", "You can make page and form changes quickly.", "You value learning, even when a change doesn’t win."],
      different: ["Traffic is too low to learn anything reliable yet.", "You want a full redesign before looking at data.", "You need a guaranteed conversion uplift.", "Nobody can edit pages or forms."],
    },
    principles: [["Measure first", "Tracking is checked before any change is judged."], ["Small, clear changes", "One idea at a time, so results can be understood."], ["Report the misses too", "Changes that don’t help are shared, because they still teach us something."]],
    mid: { title: "Where are your visitors dropping off?", body: "Share your key pages and goals. We’ll look at the evidence and agree which friction to tackle first.", action: "Review my conversion path" },
    final: { eyebrow: "LET’S TURN MORE VISITS INTO CONVERSATIONS", title: "Make the next step obvious for the right visitors.", body: "Share your website, your traffic sources and what a good enquiry looks like. We’ll discuss what to review first.", whatsapp: "conversion rate optimization" },
    faqTitle: "CRO: questions worth asking first.",
    articlesTitle: "Conversion, explained with evidence.",
  },
};
