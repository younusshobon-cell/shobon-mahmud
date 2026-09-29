import type { FAQ } from "./types";

/** Specific buyer questions, paired with the three editorial FAQs on each service. */
export const serviceSearchFaqs: Record<string, FAQ[]> = {
  "technical-seo": [
    { q: "Why are my pages not indexed by Google?", a: "Check crawl access, canonical tags, noindex rules and whether the pages offer distinct value. Search Console's indexing reports help narrow the cause." },
    { q: "Does Core Web Vitals affect organic growth?", a: "Speed and usability matter, but they are one part of search performance. Fix severe issues while improving pages that answer valuable buyer questions." },
    { q: "How do I audit JavaScript SEO on a Next.js site?", a: "Compare rendered HTML with what a crawler and Google can access, then review metadata, internal links, canonicals and dynamically loaded content." },
    { q: "Can technical SEO help AI search visibility?", a: "Accessible, indexable pages and clear structure make information easier to retrieve. Useful, accurate content and brand evidence still matter." },
    { q: "What should a website migration SEO checklist include?", a: "Map old URLs to relevant new ones, test redirects, preserve important content and links, verify canonicals and monitor indexing and conversions after launch." },
  ],
  "on-page-seo": [
    { q: "How do I optimise a service page for Google rankings?", a: "Match the searcher's decision, explain the offer clearly, add evidence and a useful next step, then check title, headings and internal links." },
    { q: "Should one page target several related keywords?", a: "Yes when they express the same intent. Use separate pages for materially different questions or services." },
    { q: "Do title tags and meta descriptions improve click-through rate?", a: "Clear, relevant snippets can improve clicks, though Google may rewrite them. Test against actual search queries and page performance." },
    { q: "How can internal links grow organic traffic?", a: "Relevant links help people navigate and help crawlers find related pages. Link from strong contextual pages to important decision pages." },
    { q: "Does on-page SEO support AI discovery?", a: "Direct answers, clear entities and verifiable detail make a page easier to interpret and reference; there is no guaranteed inclusion." },
  ],
  "content-seo": [
    { q: "What content generates qualified organic leads?", a: "Service, use-case, comparison and decision guides can connect high-intent searches to enquiries. Choose topics from real buyer questions." },
    { q: "How do I build topical authority without publishing daily?", a: "Cover a focused subject thoroughly with useful primary detail, connect related pages and keep them accurate. A publishing quota alone does not build trust." },
    { q: "Can content help my brand appear in AI answers?", a: "Clear, original explanations with visible expertise can be easier to cite. Review citations and referral behaviour rather than promising placement." },
    { q: "Should I refresh old blog posts for SEO?", a: "Refresh when facts, products or intent have changed. Improve the answer and relevant internal paths, then measure the affected page group." },
    { q: "How do I choose blog keywords that lead to sales?", a: "Map the full decision journey and prioritise questions that connect naturally to products or services, not only the largest search volume." },
  ],
  "off-page-seo": [
    { q: "How do quality backlinks help Google visibility?", a: "Relevant editorial links can help discovery and credibility. Their context and authenticity matter more than a raw link count." },
    { q: "Is buying backlinks a safe growth strategy?", a: "Paid links intended to manipulate ranking carry risk. Earn mentions through useful resources, partnerships and legitimate digital PR." },
    { q: "What is digital PR for SEO?", a: "It creates newsworthy data, expertise or stories that publishers choose to reference, with brand visibility beyond a single link." },
    { q: "Can brand mentions influence AI visibility?", a: "Consistent, accurate third-party references can help people verify a brand. No placement in AI answers can be guaranteed." },
    { q: "How do I measure off-page SEO impact?", a: "Review relevant referrals, qualified mentions, brand searches and the performance of linked pages over time." },
  ],
  "local-seo": [
    { q: "How do I rank in Google Maps near my customers?", a: "Keep an eligible Business Profile accurate, explain services clearly and earn authentic reviews. Relevance, distance and prominence shape results." },
    { q: "Can a service-area business rank without a storefront?", a: "It may be eligible if it meets Google's rules and serves customers in person. Configure the profile honestly and explain real coverage on the site." },
    { q: "Do local landing pages help organic leads?", a: "Yes when each page has genuine coverage, local context and a useful action. City names pasted into duplicate copy are weak." },
    { q: "What local SEO keywords should I target?", a: "Look at service-plus-area searches, neighbourhood language and customer questions, then verify what appears in the actual local results." },
    { q: "How do I measure calls from local search?", a: "Use Business Profile data alongside site analytics and enquiry tracking, while accounting for attribution limits and a clear baseline." },
  ],
  "ecommerce-seo": [
    { q: "How can an online store rank product pages on Google?", a: "Use unique product details, crawlable links, valid structured data and clear availability; prioritise pages with buying demand." },
    { q: "What is the best SEO structure for ecommerce categories?", a: "Organise categories around how customers shop, keep filters controlled and link clearly to valuable subcategories and products." },
    { q: "Can ecommerce SEO increase sales instead of traffic?", a: "Yes when category and product searches match purchase intent and reporting connects organic landing pages to revenue." },
    { q: "How should I handle out-of-stock products for SEO?", a: "Keep useful pages live when stock will return, offer alternatives and avoid redirecting unrelated products. Set expectations clearly." },
    { q: "How do I prevent faceted navigation from creating duplicate pages?", a: "Decide which filtered combinations deserve indexable pages, control the rest and verify canonicals and crawl paths on the actual store." },
  ],
  "international-seo": [
    { q: "How do I target UAE and Saudi Arabia on one website?", a: "Create distinct market content where offerings differ, use appropriate URL structure and language signals, and confirm the right pages surface in each country." },
    { q: "When should I use hreflang for Arabic and English pages?", a: "Use it when equivalent regional or language pages exist. Each version still needs useful localisation, self-references and working return links." },
    { q: "Is automatic translation enough for international SEO?", a: "Usually no. Research local queries, review cultural and product details, and have fluent editors check important conversion pages." },
    { q: "Can a Dubai business rank on Google in the US and UK?", a: "Yes if it genuinely serves those markets and publishes relevant, well-targeted pages. A Dubai base does not imply offices in those countries." },
    { q: "How do I measure organic growth by country?", a: "Segment Search Console, landing-page and conversion data by country and language, then compare against each market's baseline." },
  ],
  "seo-audits": [
    { q: "What does a technical SEO audit include?", a: "It checks crawling, indexing, architecture, rendering and performance alongside the pages that matter to business goals." },
    { q: "How do I know why organic traffic dropped?", a: "Compare dates, affected pages and queries, indexing changes, site releases, seasonality and competitors before naming a cause." },
    { q: "Can an SEO audit find lost leads?", a: "It can identify weak search paths and conversion friction. Pair search data with actual enquiry and sales tracking." },
    { q: "How often should I audit a growing website?", a: "Review after migrations or major launches, and periodically as templates, products and search demand change." },
    { q: "What happens after an SEO audit report?", a: "Turn findings into prioritised tasks with owners, effort and success checks, then verify changes after release." },
  ],
  "keyword-research": [
    { q: "How do I find high-intent SEO keywords for my business?", a: "Start with customer language and buying questions, examine search results and map each distinct intent to a useful page." },
    { q: "Are low-volume keywords worth targeting?", a: "Often yes, especially specific B2B or local terms that match a valuable buyer need. Tools may undercount niche demand." },
    { q: "What is the difference between keyword volume and intent?", a: "Volume estimates search frequency; intent describes what the searcher wants. Intent and conversion fit guide page choice." },
    { q: "How do I research keywords for AI search?", a: "Include natural buyer questions and entity relationships, then test how answer systems describe your category and cite sources." },
    { q: "Should Arabic and English keywords share one page?", a: "Usually separate language pages serve readers better. Research each audience independently and connect equivalent versions correctly." },
  ],
  "competitor-research": [
    { q: "How do I find my real SEO competitors?", a: "Search your priority queries and review the sites that repeatedly appear; they may differ from your commercial rivals." },
    { q: "What is a content gap analysis?", a: "It compares useful search topics and page types your audience needs with what your site and competing results currently cover." },
    { q: "Can competitor SEO research reveal growth opportunities?", a: "Yes. Look for underserved intent, weak answers and page formats you can improve with your own expertise." },
    { q: "Should I copy a competitor's keywords and pages?", a: "No. Use their coverage as context, then build distinct answers that fit your product, evidence and customers." },
    { q: "How do I compare competitors in Google and AI results?", a: "Review relevant organic pages, cited sources and answer patterns for a defined set of buyer questions, then repeat over time." },
  ],
};
