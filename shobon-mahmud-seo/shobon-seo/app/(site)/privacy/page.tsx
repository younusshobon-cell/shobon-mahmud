import pageCopy from "@/content/copy-app-privacy-page.json";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { LegalPage } from "@/components/content/LegalPage";

export const metadata: Metadata = buildMetadata({
  title: pageCopy.text_001,
  description: `How ${siteConfig.name} collects and uses information on this website.`,
  path: "/privacy",
});

// TODO: review with a qualified professional for your jurisdiction before launch.
export default function PrivacyPage() {
  return (
    <LegalPage
      title={pageCopy.text_002}
      path="/privacy"
      updated="29 September 2026"
    >
      <p>{pageCopy.text_003}</p>
      <h2>{pageCopy.text_004}</h2>
      <p>{pageCopy.text_005}</p>
      <h2>{pageCopy.text_006}</h2>
      <p>{pageCopy.text_007}</p>
      <h2>{pageCopy.text_008}</h2>
      <p>{pageCopy.text_009}</p>
      <h2>{pageCopy.text_010}</h2>
      <p>{pageCopy.text_011}</p>
      <h2>{pageCopy.text_012}</h2>
      <p>
        {pageCopy.text_013}
        {siteConfig.email ? ` or to ${siteConfig.email}` : ""}
        {pageCopy.text_014}
      </p>
    </LegalPage>
  );
}
