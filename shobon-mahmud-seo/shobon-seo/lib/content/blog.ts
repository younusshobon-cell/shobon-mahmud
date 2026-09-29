import type { BlogCategory, Post } from "./types";
import { readingMinutes, wordCount } from "../utils";

export const blogCategories: BlogCategory[] = [
  { slug: "seo-strategy", name: "SEO Strategy", description: "Planning, prioritising and measuring SEO as a growth channel." },
  { slug: "technical-seo", name: "Technical SEO", description: "Crawling, indexing, rendering, speed and site architecture." },
  { slug: "local-seo", name: "Local SEO", description: "Map pack visibility, Business Profiles, reviews and location pages." },
  { slug: "ecommerce-seo", name: "E-commerce SEO", description: "Categories, products, faceted navigation and store platforms." },
  { slug: "content-seo", name: "Content SEO", description: "Keyword research, topical authority, briefs and content strategy." },
  { slug: "off-page-seo", name: "Off-Page SEO", description: "Links, digital PR and building authority." },
  { slug: "ai-and-search", name: "AI & Search", description: "AI Overviews, AI assistants and how search visibility is changing." },
  { slug: "case-studies", name: "Case Studies", description: "Breakdowns of real SEO projects and experiments." },
];

export const getCategory = (slug: string) => blogCategories.find((c) => c.slug === slug);

/**
 * Starter articles — written as useful first drafts.
 * Review, add your own examples and experience, then publish under your name.
 */
const rawPosts: Post[] = [
  {
    slug: "technical-seo-audit",
    title: "How to run a technical SEO audit that ends in decisions",
    seoTitle: "Technical SEO Audit: A Practical Process That Prioritises Fixes",
    description: "A practical technical SEO audit process: what to check, in what order, and how to turn findings into a short list your developers will actually ship.",
    date: "2026-08-18",
    author: "Shobon Mahmud",
    category: "technical-seo",
    tags: ["technical seo", "seo audit", "crawling", "indexing"],
    featured: true,
    sections: [
      {
        id: "why-audits-fail",
        heading: "Why most technical audits don't get implemented",
        blocks: [
          { type: "p", text: "A crawler will happily give you thousands of warnings. The problem is that it weights a missing alt attribute on a blog image the same way it weights a canonical tag pointing your top category page somewhere else. Teams open the spreadsheet, feel overwhelmed and fix the easy things." },
          { type: "p", text: "A useful audit starts from a different question: which technical issues are costing this site visibility on pages that matter to the business? Everything else is secondary." },
        ],
      },
      {
        id: "start-with-search-console",
        heading: "Start with what Google already tells you",
        blocks: [
          { type: "p", text: "Before crawling anything, open Search Console. The Pages report shows what Google chose to index and why it excluded the rest. The Performance report shows which pages already earn impressions. Together they tell you where the real problems are." },
          { type: "ul", items: [
            "Large numbers of 'Crawled – currently not indexed' URLs usually point to quality or duplication issues.",
            "'Duplicate, Google chose different canonical than user' means your canonical signals are being ignored.",
            "'Discovered – currently not indexed' on important pages can indicate crawl budget or internal linking problems.",
          ] },
        ],
      },
      {
        id: "crawl-like-google",
        heading: "Crawl the site the way Google sees it",
        blocks: [
          { type: "p", text: "Run a full crawl with JavaScript rendering enabled if the site uses a framework. Compare the rendered HTML with the raw HTML: if headings, body copy or links only appear after rendering, you're relying on Google's rendering queue to see them." },
          { type: "p", text: "Then look at architecture rather than individual errors: how many clicks does it take to reach key pages, which templates generate the most URLs, and where does internal link equity concentrate?" },
        ],
      },
      {
        id: "prioritise",
        heading: "Prioritise by impact, not by count",
        blocks: [
          { type: "p", text: "For each issue, note three things: which templates or pages it affects, how close those pages are to revenue, and how hard it is to fix. A simple impact × effort grid is enough." },
          { type: "ol", items: [
            "Indexing problems on commercial pages come first.",
            "Architecture and internal linking issues that bury important pages come next.",
            "Performance problems on high-traffic templates follow.",
            "Cosmetic warnings go into a backlog, not the roadmap.",
          ] },
        ],
      },
      {
        id: "write-tickets",
        heading: "Write tickets, not findings",
        blocks: [
          { type: "p", text: "Developers don't need a lecture on canonicals. They need a ticket: what's wrong, on which URLs, what the correct behaviour is, and how to verify it's fixed. Audits written this way get implemented in weeks rather than quarters." },
          { type: "quote", text: "The output of a technical audit isn't a report. It's a set of changes that ship." },
        ],
      },
    ],
    faqs: [
      { q: "How often should I run a technical SEO audit?", a: "A full audit once or twice a year, plus monitoring in between and a focused audit before and after any migration or redesign." },
      { q: "Which tools do I need?", a: "Search Console and a crawler cover most needs. Log file analysis becomes valuable on large sites." },
    ],
    relatedServices: ["technical-seo", "seo-audits"],
    relatedIndustries: ["saas", "ecommerce", "technology"],
  },
  {
    slug: "saas-keyword-research-by-intent",
    title: "SaaS keyword research: start at the bottom of the funnel",
    description: "Why SaaS companies should research and build comparison, alternative and integration pages before broad educational content — and how to find those keywords.",
    date: "2026-07-29",
    author: "Shobon Mahmud",
    category: "content-seo",
    tags: ["saas seo", "keyword research", "search intent"],
    sections: [
      {
        id: "volume-trap",
        heading: "The search volume trap",
        blocks: [
          { type: "p", text: "Most SaaS keyword research starts with the biggest terms in the category. They look impressive in a spreadsheet, but they're dominated by review sites and incumbents, and the people searching them are usually months away from buying." },
          { type: "p", text: "The searches closest to revenue are usually small: '[competitor] alternatives', '[tool] vs [tool]', '[your category] for [industry]', '[tool] integration'. Tools often report them as low or zero volume. Your sales team hears them every week." },
        ],
      },
      {
        id: "sources",
        heading: "Where to find bottom-of-funnel keywords",
        blocks: [
          { type: "ul", items: [
            "Sales call notes: which competitors come up, and what prospects are switching from.",
            "Support tickets and onboarding questions: the exact phrasing customers use.",
            "Your integrations list: every meaningful integration is a potential search.",
            "Review platforms: the categories and comparisons buyers already browse.",
            "Search Console: queries you already appear for but have no dedicated page for.",
          ] },
        ],
      },
      {
        id: "page-types",
        heading: "Map keywords to page types",
        blocks: [
          { type: "p", text: "Each intent deserves a different kind of page. Alternative pages need honest comparisons and a clear reason to switch. Integration pages need to explain what the integration actually does. Use-case pages need to speak the language of a specific role or industry." },
          { type: "p", text: "Building these pages first gives new content a commercial foundation to link to — which makes the educational content you publish later far more valuable." },
        ],
      },
      {
        id: "measure",
        heading: "Measure pipeline, not sessions",
        blocks: [
          { type: "p", text: "A comparison page with a few hundred visits a month can generate more demos than a blog post with tens of thousands. Track organic signups and demo requests by landing page so the value of these pages is visible." },
        ],
      },
    ],
    relatedServices: ["keyword-research", "content-seo", "competitor-research"],
    relatedIndustries: ["saas", "technology"],
  },
  {
    slug: "google-business-profile-optimization",
    title: "Google Business Profile optimisation: what actually moves local rankings",
    description: "A focused guide to the Google Business Profile settings, habits and signals that influence map pack visibility for local businesses.",
    date: "2026-07-08",
    author: "Shobon Mahmud",
    category: "local-seo",
    tags: ["local seo", "google business profile", "map pack"],
    sections: [
      {
        id: "three-factors",
        heading: "The three things Google weighs",
        blocks: [
          { type: "p", text: "Google describes local ranking as a combination of relevance, distance and prominence. You can't change distance. You can change how relevant your profile looks for a search, and how prominent your business appears across the web." },
        ],
      },
      {
        id: "categories",
        heading: "Categories matter more than anything you write",
        blocks: [
          { type: "p", text: "Your primary category is one of the strongest relevance signals you control. Choose the one that best describes your main service, then add secondary categories only where they're genuinely accurate." },
          { type: "p", text: "Look at which categories competitors in the top three use. If they all share a category you don't, investigate why." },
        ],
      },
      {
        id: "completeness",
        heading: "Complete everything, then keep it active",
        blocks: [
          { type: "ul", items: [
            "Services with clear descriptions, matching the services on your website.",
            "Accurate hours, including holiday hours.",
            "Real photos of your premises, team and work — updated regularly.",
            "Attributes that apply to your business.",
            "Posts for offers, updates and events.",
          ] },
        ],
      },
      {
        id: "reviews",
        heading: "Build a steady review habit",
        blocks: [
          { type: "p", text: "Review quantity, recency and quality all matter. A few reviews every week beats a burst followed by months of silence. Ask at the moment the customer is happiest, make it easy with a direct link, and reply to every review — especially the critical ones." },
        ],
      },
      {
        id: "website",
        heading: "Your website still counts",
        blocks: [
          { type: "p", text: "The page your profile links to should reinforce the same services, location and contact details. Consistent information across your website, profile and major directories makes Google more confident about who you are and where you operate." },
        ],
      },
    ],
    faqs: [
      { q: "Does keyword stuffing the business name help?", a: "It can appear to work briefly but violates Google's guidelines and risks suspension. Use your real business name." },
      { q: "How often should I post on Google Business Profile?", a: "Weekly or every other week is a good rhythm. Consistency matters more than volume." },
    ],
    relatedServices: ["local-seo"],
    relatedIndustries: ["local-services", "health-tech"],
  },
  {
    slug: "internal-linking-strategy",
    title: "Internal linking: the SEO lever you fully control",
    description: "How to design an internal linking system that helps search engines understand your site and sends authority to the pages that need it.",
    date: "2026-06-16",
    author: "Shobon Mahmud",
    category: "seo-strategy",
    tags: ["internal linking", "site architecture", "on-page seo"],
    sections: [
      {
        id: "why",
        heading: "Why internal links matter",
        blocks: [
          { type: "p", text: "Internal links do three jobs at once. They help search engines discover pages, they signal which pages are most important, and they describe what each page is about through anchor text. Unlike backlinks, every one of them is under your control." },
        ],
      },
      {
        id: "structure",
        heading: "Design the structure before adding links",
        blocks: [
          { type: "p", text: "Start with the pages that matter most to the business — usually services, categories or product pages. Every related article, case study and resource should be able to reach them within a click or two." },
          { type: "ol", items: [
            "Hub pages link down to every page in their topic.",
            "Supporting pages link back up to the hub and across to closely related siblings.",
            "Commercial pages receive contextual links from informational content.",
          ] },
        ],
      },
      {
        id: "anchors",
        heading: "Write anchors that describe the destination",
        blocks: [
          { type: "p", text: "'Click here' tells nobody anything. Descriptive anchors like 'technical SEO audit' help readers and search engines. Vary them naturally — exact-match anchors on every link look unnatural and read badly." },
        ],
      },
      {
        id: "find-opportunities",
        heading: "Finding quick wins",
        blocks: [
          { type: "ul", items: [
            "Pages with lots of backlinks that don't link to commercial pages.",
            "Important pages with very few internal links pointing to them.",
            "Articles that mention a service without linking to it.",
            "Orphan pages that nothing links to at all.",
          ] },
          { type: "p", text: "This site is built on the same principle: every service, industry, location, case study and article links to the related ones, so each page supports the others." },
        ],
      },
    ],
    relatedServices: ["on-page-seo", "technical-seo", "off-page-seo"],
    relatedIndustries: ["saas", "ecommerce"],
  },
  {
    slug: "ai-overviews-search-visibility",
    title: "AI Overviews and search visibility: what changes and what doesn't",
    description: "How AI Overviews and AI assistants affect organic search, which queries are most affected, and how to keep your content visible and cited.",
    date: "2026-05-27",
    author: "Shobon Mahmud",
    category: "ai-and-search",
    tags: ["ai overviews", "ai search", "search visibility"],
    sections: [
      {
        id: "what-changes",
        heading: "What changes",
        blocks: [
          { type: "p", text: "For simple informational questions, AI-generated answers can satisfy the searcher without a click. Definitions, quick facts and basic how-tos are the most exposed. Traffic to that kind of content is under pressure, even when rankings hold." },
        ],
      },
      {
        id: "what-doesnt",
        heading: "What doesn't",
        blocks: [
          { type: "p", text: "Commercial and complex searches still send clicks. Someone comparing software, choosing a provider or buying a product wants to see options and evaluate them. And AI answers are built from sources — well-structured, authoritative pages are what get cited." },
        ],
      },
      {
        id: "how-to-adapt",
        heading: "How to adapt",
        blocks: [
          { type: "ul", items: [
            "Shift effort towards commercial, comparison and experience-based content.",
            "Write clear, direct answers near the top of pages, then add depth.",
            "Show first-hand experience: examples, data and original insight that summaries can't replace.",
            "Make authorship and expertise visible and consistent across the site.",
            "Use structured data that accurately reflects visible content.",
          ] },
        ],
      },
      {
        id: "measure",
        heading: "Measure differently",
        blocks: [
          { type: "p", text: "Clicks alone undercount visibility now. Track impressions, branded search growth and conversions from organic alongside traffic, so a fall in low-value clicks isn't mistaken for a fall in business impact." },
        ],
      },
    ],
    relatedServices: ["content-seo", "seo-audits"],
    relatedIndustries: ["saas", "technology"],
  },
];

function postWords(p: Post) {
  const text = p.sections
    .flatMap((s) => [s.heading, ...s.blocks.flatMap((b) => ("items" in b ? b.items : [b.text]))])
    .join(" ");
  return wordCount(text);
}

export const posts = rawPosts
  .map((p) => ({ ...p, readingTime: readingMinutes(postWords(p)) }))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export type PostWithMeta = (typeof posts)[number];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const postsFor = (opts: { service?: string; industry?: string; category?: string; exclude?: string; limit?: number }) =>
  posts
    .filter(
      (p) =>
        p.slug !== opts.exclude &&
        (!opts.service || p.relatedServices.includes(opts.service)) &&
        (!opts.industry || p.relatedIndustries.includes(opts.industry)) &&
        (!opts.category || p.category === opts.category),
    )
    .slice(0, opts.limit ?? 3);

export const POSTS_PER_PAGE = 9;
export const excerptOf = (p: Post) => p.description;
