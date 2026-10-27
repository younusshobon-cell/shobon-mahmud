import { siteConfig } from "@/lib/site";

export function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.8a8.5 8.5 0 1 1 16.2-4Z"/><path d="M8.1 7.6c.3-.3.7-.3.9.1l1 2c.1.3 0 .5-.3.8l-.5.5c.7 1.5 1.8 2.6 3.4 3.3l.7-.9c.2-.2.4-.3.7-.1l2 1c.3.1.4.4.3.7-.3 1.2-1.2 1.8-2.3 1.6-3.6-.6-6.7-3.6-7.3-6.9-.2-.9.4-1.7 1.4-2.1Z"/></svg>;
}
export function WhatsAppLink({ subject = "my business growth", label = "Chat on WhatsApp" }: { subject?: string; label?: string }) {
  const message = `Hi Shobon, I'd like to discuss ${subject}. My website is: `;
  return <a href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`} className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[#20cf65] px-6 py-3 text-[15px] font-semibold text-[#062b16] transition-colors hover:bg-[#18b957] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087333]"><WhatsAppIcon />{label}</a>;
}
export function FloatingWhatsApp() {
  return <div className="fixed right-4 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-30 drop-shadow-lg sm:right-6 lg:bottom-6"><WhatsAppLink /></div>;
}
