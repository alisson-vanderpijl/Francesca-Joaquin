"use client";

import Link from "next/link";
import { GuideIcon, guideCardIconClass } from "@/components/guide/GuideIcons";
import { FadeIn } from "@/components/ui/FadeIn";
import { useNavGroups } from "@/components/providers/ContentProvider";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { NavItemId } from "@/types";
import { siteContainerClass } from "@/lib/layout-classes";

const WEDDING_IDS: NavItemId[] = ["itinerary", "wedding", "giftRegistry"];
const GUEST_IDS: NavItemId[] = [
  "stay",
  "eatDrink",
  "getReady",
  "health",
  "exploreLima",
  "explorePeru",
  "map",
  "practicalInfo",
];

export function GuideLandingCards() {
  const { t } = useLanguage();
  const navGroups = useNavGroups();

  function getHref(id: NavItemId): string {
    const item = navGroups.flatMap((g) => g.items).find((i) => i.id === id);
    return item?.href ?? "/guide";
  }

  return (
    <>
      <section className="w-full bg-[#f6f6f5] py-10 pt-16 lg:py-12 lg:pt-20">
        <div className={siteContainerClass}>
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.25em] text-earth">
              {t.nav.ourWedding}
            </p>
          </FadeIn>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
            {WEDDING_IDS.map((id, index) => (
              <FadeIn key={id} delay={index * 60}>
                <Link
                  href={getHref(id)}
                  className="group flex h-full min-h-[160px] flex-col justify-between border border-charcoal/10 bg-ivory p-6 transition-all duration-300 hover:border-charcoal/25 md:min-h-[180px] md:p-8"
                >
                  <GuideIcon id={id} className={guideCardIconClass} />
                  <div className="mt-6">
                    <h3 className="font-serif text-xl text-charcoal md:text-2xl">
                      {t.nav[id]}
                    </h3>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-charcoal/50 transition-all duration-300 group-hover:gap-3 group-hover:text-charcoal">
                      {t.guide.landing.explore}
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className={`${siteContainerClass} pb-16 pt-16 lg:pb-24 lg:pt-20`}>
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.25em] text-earth">
            {t.nav.guestGuide}
          </p>
        </FadeIn>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {GUEST_IDS.map((id, index) => (
            <FadeIn key={id} delay={index * 50}>
              <Link
                href={getHref(id)}
                className="group flex h-full min-h-[160px] flex-col justify-between border border-charcoal/10 bg-ivory p-6 transition-all duration-300 hover:border-charcoal/25 md:min-h-[180px] md:p-8"
              >
                <GuideIcon id={id} className={guideCardIconClass} />
                <div className="mt-6">
                  <h3 className="font-serif text-xl text-charcoal md:text-2xl">
                    {t.nav[id]}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-charcoal/50 transition-all duration-300 group-hover:gap-3 group-hover:text-charcoal">
                    {t.guide.landing.explore}
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
