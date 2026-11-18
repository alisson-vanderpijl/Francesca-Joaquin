"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { NavMenu } from "@/components/layout/NavMenu";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useSiteConfig } from "@/components/providers/ContentProvider";
import { siteContainerClass } from "@/lib/layout-classes";

export function Header() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const siteConfig = useSiteConfig();
  const [menuOpen, setMenuOpen] = useState(false);
  const isEntry = pathname === "/";
  const isRsvp = pathname === "/rsvp";
  const isAdmin = pathname?.startsWith("/admin");

  if (isEntry || isRsvp || isAdmin) return null;

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-ivory/95 backdrop-blur-sm">
      <div
        className={`${siteContainerClass} flex items-center justify-between gap-4 py-5`}
      >
        <Link
          href="/guide"
          className="shrink-0 font-serif text-lg tracking-wide text-charcoal transition-opacity hover:opacity-70 lg:text-xl"
        >
          {siteConfig.coupleNames}
        </Link>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 p-2"
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-px w-6 bg-charcoal transition-transform duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-6 bg-charcoal transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px w-6 bg-charcoal transition-transform duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      <div
        aria-hidden={!menuOpen}
        className={`absolute right-0 top-full z-50 hidden w-[22rem] origin-top-right border border-charcoal/10 bg-ivory shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-[opacity,transform] duration-200 ease-out lg:block ${
          menuOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="max-h-[85vh] overflow-y-auto">
          <NavMenu onNavigate={closeMenu} />
        </div>
      </div>

      <div
        aria-hidden={!menuOpen}
        className={`grid border-t border-charcoal/10 transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden ${
          menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="max-h-[85vh] overflow-y-auto">
            <NavMenu onNavigate={closeMenu} />
          </div>
        </div>
      </div>
    </header>
  );
}
