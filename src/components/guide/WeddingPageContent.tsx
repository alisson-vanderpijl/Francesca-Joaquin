"use client";

import Image from "next/image";
import { WeddingTabbedSections } from "@/components/guide/WeddingTabbedSections";
import { FadeIn } from "@/components/ui/FadeIn";
import { useLanguage } from "@/i18n/LanguageProvider";
import { guidePageShellClass } from "@/lib/layout-classes";
import type { WeddingEvent } from "@/types";

const WEDDING_HERO_IMAGE = "/Images/wedding-hero.jpg";

type WeddingPageContentProps = {
  weddingEvents: WeddingEvent[];
};

export function WeddingPageContent({ weddingEvents }: WeddingPageContentProps) {
  const { t } = useLanguage();

  return (
    <>
      <FadeIn>
        <section className="w-full">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-sand/40 md:aspect-[21/9]">
            <Image
              src={WEDDING_HERO_IMAGE}
              alt={t.wedding.title}
              fill
              unoptimized
              className="object-cover object-[center_40%]"
              sizes="100vw"
              priority
            />
          </div>
        </section>
      </FadeIn>

      <div className={guidePageShellClass}>
        <FadeIn delay={50}>
          <header className="mb-8 border-b border-charcoal/10 pb-10 md:mb-10 md:pb-14">
            <h1 className="font-serif text-4xl text-charcoal md:text-5xl lg:text-6xl">
              {t.wedding.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-charcoal/70 md:text-base">
              {t.wedding.subtitle}
            </p>
          </header>
        </FadeIn>

        <WeddingTabbedSections weddingEvents={weddingEvents} />
      </div>
    </>
  );
}