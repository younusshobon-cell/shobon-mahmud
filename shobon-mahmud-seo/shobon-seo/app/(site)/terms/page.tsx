import pageCopy from "@/content/copy-app-terms-page.json";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { LegalPage } from "@/components/content/LegalPage";

export const metadata: Metadata = buildMetadata({
  title: pageCopy.text_001,
  description: `Terms for using the ${siteConfig.name} website.`,
  path: "/terms",
});

// TODO: review with a qualified professional for your jurisdiction before launch.
export default function TermsPage() {
  return (
    <LegalPage
      title={pageCopy.text_002}
      path="/terms"
      updated="29 September 2026"
    >
      <p>{pageCopy.text_003}</p>
      <h2>{pageCopy.text_004}</h2>
      <p>{pageCopy.text_005}</p>
      <h2>{pageCopy.text_006}</h2>
      <p>
        {pageCopy.text_007}
        {siteConfig.name} {pageCopy.text_008}
      </p>
      <h2>{pageCopy.text_009}</h2>
      <p>{pageCopy.text_010}</p>
      <h2>{pageCopy.text_011}</h2>
      <p>{pageCopy.text_012}</p>
    </LegalPage>
  );
}
