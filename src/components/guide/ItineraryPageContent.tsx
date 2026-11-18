"use client";

import { Timeline } from "@/components/timeline/Timeline";
import { FadeIn } from "@/components/ui/FadeIn";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { WeddingEvent } from "@/types";

type ItineraryPageContentProps = {
  itineraryEvents: WeddingEvent[];
};

export function ItineraryPageContent({
  itineraryEvents,
}: ItineraryPageContentProps) {
  const { t } = useLanguage();

  return (
    <>
      <FadeIn>
        <header className="mb-12 border-b border-charcoal/10 pb-10 md:mb-16 md:pb-14">
          <h1 className="font-serif text-4xl text-charcoal md:text-5xl lg:text-6xl">
            {t.itinerary.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-charcoal/70 md:text-base">
            {t.itinerary.subtitle}
          </p>
        </header>
      </FadeIn>

      <FadeIn delay={100}>
        <Timeline events={itineraryEvents} showDates />
      </FadeIn>
    </>
  );
}
