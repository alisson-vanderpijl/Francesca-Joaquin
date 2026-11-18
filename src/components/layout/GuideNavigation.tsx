"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavGroups } from "@/components/providers/ContentProvider";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { NavItemId } from "@/types";

type GuideNavigationProps = {
  onNavigate?: () => void;
  variant?: "menu" | "landing";
};

export function GuideNavigation({
  onNavigate,
  variant = "menu",
}: GuideNavigationProps) {
  const pathname = usePathname();
  const { t } = useLanguage();
  const navGroups = useNavGroups();

  const linkClass = (href: string) => {
    const base =
      variant === "landing"
        ? "group flex items-center justify-between border-b border-charcoal/10 py-4 text-base transition-colors"
        : "block py-3 text-sm tracking-wide transition-colors";

    const state =
      pathname === href
        ? "text-earth"
        : "text-charcoal/70 hover:text-charcoal";

    return `${base} ${state}`;
  };

  const groupLabels: Record<
    (typeof navGroups)[number]["id"],
    { title: string; description: string }
  > = {
    ourWedding: {
      title: t.nav.ourWedding,
      description: t.nav.ourWeddingDesc,
    },
    guestGuide: {
      title: t.nav.guestGuide,
      description: t.nav.guestGuideDesc,
    },
  };

  const containerClass =
    variant === "landing"
      ? "grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-12 lg:gap-20"
      : "flex flex-col gap-8";

  return (
    <div className={containerClass}>
      {navGroups.map((group) => (
        <div key={group.id}>
          <p className="text-xs uppercase tracking-[0.25em] text-earth">
            {groupLabels[group.id].title}
          </p>
          <p
            className={`mt-2 leading-relaxed text-charcoal/50 ${
              variant === "landing" ? "max-w-md text-sm" : "max-w-sm text-xs"
            }`}
          >
            {groupLabels[group.id].description}
          </p>
          <nav
            className={`mt-6 flex flex-col ${
              variant === "menu" ? "border-t border-charcoal/10" : ""
            }`}
          >
            {group.items.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={onNavigate}
                className={linkClass(item.href)}
              >
                <span>{t.nav[item.id as NavItemId]}</span>
                {variant === "landing" && (
                  <span
                    className="text-charcoal/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-charcoal/60"
                    aria-hidden="true"
                  >
                    →
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      ))}
    </div>
  );
}
