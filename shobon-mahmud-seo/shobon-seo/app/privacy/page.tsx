import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { LegalPage } from "@/components/content/LegalPage";

export const metadata: Metadata = buildMetadata({ title: "Privacy Policy", description: `How ${siteConfig.name} collects and uses information on this website.`, path: "/privacy" });

// TODO: review with a qualified professional for your jurisdiction before launch.
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy" updated="[ADD DATE]">
      <p>This policy explains what information this website collects and how it is used.</p>
      <h2>Information you send</h2>
      <p>When you use the contact form, the details you enter (such as your name, email, company, website and message) are sent to me by email so I can reply. They are not sold or shared for marketing.</p>
      <h2>Analytics</h2>
      <p>This site may use Google Analytics and Microsoft Clarity to understand how visitors use it. These services may set cookies and collect usage data such as pages viewed, device type and approximate location.</p>
      <h2>Embedded maps</h2>
      <p>Some pages embed Google Maps, which is loaded from Google and subject to Google&apos;s privacy policy.</p>
      <h2>Your rights</h2>
      <p>You can ask to access or delete information you&apos;ve sent me by getting in touch through the contact page.</p>
      <h2>Contact</h2>
      <p>Questions about this policy can be sent via the contact page{siteConfig.email ? ` or to ${siteConfig.email}` : ""}.</p>
    </LegalPage>
  );
}
