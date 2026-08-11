import type { Metadata } from "next";
import { Outfit, Public_Sans } from "next/font/google";
import "./globals.css";
import { InitialLoader } from "@/components/initial-loader";
import { MotionProvider } from "@/components/motion/motion-provider";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { siteConfig } from "@/data/site";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  display: "swap",
});

const loaderVisibilityScript = `try{if(window.sessionStorage.getItem("sdn-danabhakti:intro-seen")==="1"){document.documentElement.setAttribute("data-intro-seen","true")}else{document.documentElement.setAttribute("data-intro-loading","true")}}catch{document.documentElement.setAttribute("data-intro-loading","true")}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: {
    icon: [{ url: "/images/brand/logo-sdn-danabhakti-full.webp", type: "image/webp" }],
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    locale: "id_ID",
    siteName: siteConfig.name,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${outfit.variable} ${publicSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: loaderVisibilityScript }} />
      </head>
      <body>
        <noscript>
          <style>{`.motion-reveal{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        <MotionProvider>
          <InitialLoader />
          <ScrollProgress />
          {children}
          <WhatsAppButton />
        </MotionProvider>
      </body>
    </html>
  );
}
