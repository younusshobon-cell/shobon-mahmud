import { Section } from "@/components/content/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PointGrid } from "@/components/content/PointGrid";
import { ButtonLink } from "@/components/ui/Button";

export function OmanDelivery() {
  return <>
    <Section labelledBy="oman-fit">
      <div id="oman-fit"><SectionHeading title="A hands-on SEO specialist, backed by a delivery team." intro="I am Shobon Mahmud. For the last four years, SEO has been my core skill, supported by content writing, social media growth and funnel planning. I connect search strategy with the work your website and marketing team need to deliver." /></div>
      <div className="mt-12"><PointGrid points={[
        { title: "Experience across demanding sectors", body: "My team and I have worked across local and home services, financial, legal, health, SaaS, product design, brand design and personal portfolio growth. That experience informs how I research intent, organise content and review conversion journeys." },
        { title: "One accountable point of contact", body: "I lead the SEO plan and work with my team on agreed content and implementation tasks. Your stakeholders know who owns each decision and what needs their approval." },
        { title: "Evidence you can review", body: "Before engagement, ask for relevant work samples, a walkthrough of my approach and the reporting format. We establish a baseline and define success for your project before proposing growth targets." }
      ]} /></div>
      <div className="mt-8"><ButtonLink href="/about">Meet me and the team</ButtonLink></div>
    </Section>
    <Section tone="muted" labelledBy="oman-delivery">
      <div id="oman-delivery"><SectionHeading title="A clear delivery process for multiple stakeholders." intro="A practical workflow for public project owners, property marketing teams, internal developers and agency partners." /></div>
      <div className="mt-12"><PointGrid numbered columns={2} points={[
        {title:"Discovery and baseline",body:"Review audiences, existing pages, search performance, lead quality and the information your team is authorised to publish."},
        {title:"Prioritised page and keyword map",body:"Separate government service journeys from property enquiries. Map Arabic and English intent to existing or proposed pages."},
        {title:"Approved content and implementation",body:"Prepare briefs and development tickets with named reviewers. Validate project facts and terminology before publishing."},
        {title:"QA, reporting and handover",body:"Check crawlability, mobile layouts, language routing and tracking. Share progress, remaining issues and the next priorities."}
      ]} /></div>
    </Section>
    <Section labelledBy="oman-measurement">
      <div id="oman-measurement"><SectionHeading title="Report the outcomes your organisation actually needs." intro="Define the reporting scope with your team. Keep public-service success and commercial lead quality visible as separate measures." /></div>
      <div className="mt-12"><PointGrid columns={2} points={[
        {title:"Public project discovery",body:"Relevant non-branded searches, approved page visibility, clicks towards official service journeys and content accuracy checks."},
        {title:"Property enquiry quality",body:"Project and neighbourhood page performance, brochure requests, viewing enquiries and qualified leads confirmed by your sales team."},
        {title:"Transparent implementation",body:"Completed tickets, reviewer approvals, indexing changes and the outstanding decisions required to move forward."},
        {title:"Useful handover",body:"An agreed roadmap, content briefs, tracking definitions and review checklists your team can continue to use."}
      ]} /></div>
      <div className="mt-8"><ButtonLink href="/contact">Discuss your Oman project</ButtonLink></div>
    </Section>
  </>;
}
