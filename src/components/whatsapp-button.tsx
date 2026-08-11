import { WhatsappLogo } from "@phosphor-icons/react/ssr";
import { whatsapp } from "@/data/site";

export function WhatsAppButton() {
  return (
    <a
      className="whatsapp-button"
      href={whatsapp.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubungi SDN Danabhakti melalui WhatsApp, tab baru"
    >
      <WhatsappLogo aria-hidden="true" size={24} weight="fill" />
      <span>WhatsApp</span>
    </a>
  );
}
