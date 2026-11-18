"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useSiteConfig } from "@/components/providers/ContentProvider";
import { siteContainerClass } from "@/lib/layout-classes";

export function Footer() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const siteConfig = useSiteConfig();

  if (
    pathname === "/" ||
    pathname === "/rsvp" ||
    pathname?.startsWith("/admin")
  ) {
    return null;
  }

  return (
    <footer className="mt-auto w-full bg-charcoal">
      <div
        className={`${siteContainerClass} flex flex-col items-center gap-4 py-12 text-center`}
      >
        <p className="font-serif text-xl text-ivory">{siteConfig.coupleNames}</p>
        <p className="max-w-md text-sm leading-relaxed text-ivory/75">
          {siteConfig.weddingDate}
        </p>
        <div className="flex gap-6 pt-2">
          <Link
            href="/rsvp"
            className="text-xs uppercase tracking-widest text-ivory/70 transition-colors hover:text-ivory"
          >
            {t.footer.rsvp}
          </Link>
          <Link
            href="/guide"
            className="text-xs uppercase tracking-widest text-ivory/70 transition-colors hover:text-ivory"
          >
            {t.footer.guide}
          </Link>
        </div>
      </div>
    </footer>
  );
}
