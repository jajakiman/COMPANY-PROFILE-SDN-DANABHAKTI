"use client";

import { usePathname } from "next/navigation";
import { WhatsappLogo } from "@phosphor-icons/react";
import { whatsapp } from "@/data/site";

export function WhatsAppButton() {
  const pathname = usePathname();

  // Hide WhatsApp button on login and admin pages as requested by user
  if (pathname.startsWith("/admin") || pathname === "/login") {
    return null;
  }

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
