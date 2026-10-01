import cms_homeFaqs from "@/content/faqs-homeFaqs.json";
import cms_serviceHubFaqs from "@/content/faqs-serviceHubFaqs.json";
import cms_industryHubFaqs from "@/content/faqs-industryHubFaqs.json";
import cms_locationHubFaqs from "@/content/faqs-locationHubFaqs.json";
import cms_portfolioFaqs from "@/content/faqs-portfolioFaqs.json";
import cms_aboutFaqs from "@/content/faqs-aboutFaqs.json";
import cms_contactFaqs from "@/content/faqs-contactFaqs.json";
import cms_blogFaqs from "@/content/faqs-blogFaqs.json";
import cms_privacyFaqs from "@/content/faqs-privacyFaqs.json";
import cms_termsFaqs from "@/content/faqs-termsFaqs.json";
import type { FAQ } from "./types";

export const homeFaqs: FAQ[] = cms_homeFaqs as FAQ[];

export const serviceHubFaqs: FAQ[] = cms_serviceHubFaqs as FAQ[];

export const industryHubFaqs: FAQ[] = cms_industryHubFaqs as FAQ[];

export const locationHubFaqs: FAQ[] = cms_locationHubFaqs as FAQ[];

export const portfolioFaqs: FAQ[] = cms_portfolioFaqs as FAQ[];

export const aboutFaqs: FAQ[] = cms_aboutFaqs as FAQ[];

export const contactFaqs: FAQ[] = cms_contactFaqs as FAQ[];

export const blogFaqs: FAQ[] = cms_blogFaqs as FAQ[];

export function expandFaqs(
  existing: FAQ[],
  topic: string,
  kind: "service" | "industry" | "location",
): FAQ[] {
  const extra: FAQ[] =
    kind === "service"
      ? [
          {
            q: `How do I know if I need ${topic.toLowerCase()}?`,
            a: `Review your search goals and the pages that should attract qualified visitors. If ${topic.toLowerCase()} addresses the main gap, a focused audit can turn it into a prioritised plan.`,
          },
          {
            q: `How is ${topic.toLowerCase()} measured?`,
            a: "Set a baseline in Search Console and analytics, then review relevant queries, page performance and qualified actions. Isolate the pages changed and note the reporting period.",
          },
          {
            q: `Can ${topic.toLowerCase()} work alongside other SEO services?`,
            a: "Yes. Technical access, relevant page content and clear internal links reinforce each other. The right combination depends on the site's bottleneck.",
          },
          {
            q: `What happens after a ${topic.toLowerCase()} review?`,
            a: "You should have a short, prioritised list of actions, owners and measurements. Implementation and a follow-up review show whether the changes worked.",
          },
          {
            q: `Is ${topic.toLowerCase()} a one-time task?`,
            a: "Some fixes are one-off, but sites and search results change. Review important pages after launches, migrations or content changes, and monitor performance regularly.",
          },
        ]
      : kind === "industry"
        ? [
            {
              q: `What does ${topic} SEO focus on first?`,
              a: `Start with the buying journey in ${topic.toLowerCase()}: which questions signal discovery, comparison and readiness to act. Then map those searches to useful pages.`,
            },
            {
              q: `Which keywords matter for ${topic.toLowerCase()} businesses?`,
              a: "Prioritise terms that match the product or service and the buyer's intent. Combine customer language, Search Console data and search-result analysis instead of choosing only high-volume terms.",
            },
            {
              q: `Can ${topic.toLowerCase()} SEO generate qualified leads?`,
              a: "It can when pages address decision-stage searches and make the next step clear. Track enquiries and sales quality, not just sessions or rankings.",
            },
            {
              q: `How long should a ${topic.toLowerCase()} SEO plan run?`,
              a: "Allow time for research, implementation, crawling and measurement. Technical fixes can move sooner; competitive content and authority often need sustained work over months.",
            },
            {
              q: `What content should a ${topic.toLowerCase()} site avoid?`,
              a: "Avoid near-duplicate pages and broad claims without useful detail. Publish pages that answer a distinct buyer question with accurate, first-hand information.",
            },
          ]
        : [
            {
              q: `Can you help with SEO in ${topic} remotely?`,
              a: `Yes. Research, audits and recommendations for ${topic} can be delivered remotely. Local search decisions still require accurate market and business information.`,
            },
            {
              q: `Do I need a dedicated ${topic} landing page?`,
              a: `Create one if you genuinely serve ${topic} and can explain the service, coverage and local relevance clearly. A location name swapped into generic copy is not enough.`,
            },
            {
              q: `What affects local rankings in ${topic}?`,
              a: "Relevance, proximity and prominence affect local results. A complete eligible Business Profile, useful service pages and authentic reviews support visibility.",
            },
            {
              q: `Can my business appear in ${topic} without a local office?`,
              a: "Organic visibility is possible with relevant content and real service coverage. Map visibility has eligibility and proximity constraints; never use a fake address.",
            },
            {
              q: `How do you measure SEO in ${topic}?`,
              a: `Track queries and landing pages relevant to ${topic}, then connect visits to calls, enquiries or sales. Compare results against a defined baseline.`,
            },
          ];
  return [...existing, ...extra].slice(0, 8);
}

export function articleFaqs(existing: FAQ[] = [], topic: string): FAQ[] {
  const generic: FAQ[] = [
    {
      q: `What is the main takeaway from ${topic.toLowerCase()}?`,
      a: "Start with the searcher's task and your site's current evidence, then prioritise a small set of useful changes that you can measure.",
    },
    {
      q: `How can I apply ${topic.toLowerCase()} to my website?`,
      a: "Identify the relevant page or template, check its search queries and user goal, make a focused change and compare results against a dated baseline.",
    },
    {
      q: "Which SEO metrics matter most?",
      a: "Relevant organic queries, clicks and qualified actions matter more than a single average ranking. Use Search Console and analytics together.",
    },
    {
      q: "How long should I wait before assessing a change?",
      a: "First confirm the page was crawled and indexed. Then compare a meaningful period while allowing for seasonality, competition and other site changes.",
    },
    {
      q: "Should I optimise for search engines or readers?",
      a: "Write primarily for people who need the answer. Clear headings, descriptive links and technically accessible pages help both readers and search engines understand it.",
    },
    {
      q: "When should I ask an SEO specialist for help?",
      a: "Get help when important pages are missing from search, a migration is planned, or you cannot tell which technical or content work will affect business goals.",
    },
    {
      q: "Does this advice guarantee a ranking?",
      a: "No. SEO changes can improve relevance and accessibility, but rankings depend on the market and search systems. Measure outcomes without assuming a guaranteed position.",
    },
    {
      q: "Where can I learn more about this topic?",
      a: "Review the related service and industry pages on this site, then compare the guidance against your own Search Console data and search results.",
    },
  ];
  return [...existing, ...generic].slice(0, 8);
}

export const privacyFaqs: FAQ[] = cms_privacyFaqs as FAQ[];

export const termsFaqs: FAQ[] = cms_termsFaqs as FAQ[];
