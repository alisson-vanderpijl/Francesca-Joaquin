import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Providers } from "@/components/providers/Providers";
import {
  getNavGroups,
  getSiteConfig,
  getTranslationsContent,
} from "@/lib/content-store";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  return {
    title: `${siteConfig.coupleNames} — Lima Wedding Guide`,
    description:
      "Guía digital para invitados internacionales — RSVP, hoteles, restaurantes y qué hacer en Lima y Perú.",
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [siteConfig, navGroups, translationsContent] = await Promise.all([
    getSiteConfig(),
    getNavGroups(),
    getTranslationsContent(),
  ]);

  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ivory font-sans text-charcoal">
        <Providers
          siteConfig={siteConfig}
          navGroups={navGroups}
          translationOverrides={translationsContent}
        >
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
