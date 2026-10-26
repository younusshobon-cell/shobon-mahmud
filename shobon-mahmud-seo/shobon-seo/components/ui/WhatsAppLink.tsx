import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { ButtonLink } from "./Button";

export function WhatsAppLink({ subject = "my business growth", label = "Chat on WhatsApp" }: { subject?: string; label?: string }) {
  const message = `Hi Shobon, I'd like to discuss ${subject}. My website is: `;
  return <ButtonLink href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`} variant="secondary" target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`}>
    <MessageCircle size={18} aria-hidden="true" />{label}
  </ButtonLink>;
}
