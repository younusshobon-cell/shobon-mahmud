import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { LegalPage } from "@/components/content/LegalPage";

export const metadata: Metadata = buildMetadata({ title: "Terms of Use", description: `Terms for using the ${siteConfig.name} website.`, path: "/terms" });

// TODO: review with a qualified professional for your jurisdiction before launch.
export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" path="/terms" updated="[ADD DATE]">
      <p>By using this website you agree to these terms.</p>
      <h2>Content</h2>
      <p>Articles and resources on this site are general information, not advice for your specific situation. Search engines change frequently, and results from any SEO work cannot be guaranteed.</p>
      <h2>Intellectual property</h2>
      <p>Content on this site belongs to {siteConfig.name} unless stated otherwise. You may quote short excerpts with a link back to the original page.</p>
      <h2>Client work</h2>
      <p>Paid engagements are governed by a separate written agreement.</p>
      <h2>Changes</h2>
      <p>These terms may be updated from time to time. The date above shows the latest version.</p>
    </LegalPage>
  );
}
