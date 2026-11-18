"use client";

import { TravelAgencyCard } from "@/components/cards/TravelAgencyCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { TravelAgency } from "@/types";

type ExplorePeruTravelAgenciesProps = {
  agencies: TravelAgency[];
};

export function ExplorePeruTravelAgencies({
  agencies,
}: ExplorePeruTravelAgenciesProps) {
  const { t } = useLanguage();
  const section = t.explorePeruPage;

  return (
    <section className="mt-20 border-t border-charcoal/10 pt-20 md:mt-28 md:pt-28">
      <FadeIn>
        <header className="mb-12 max-w-2xl md:mb-16">
          <h2 className="font-serif text-3xl text-charcoal md:text-4xl">
            {section.travelAgenciesTitle}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-charcoal/70 md:text-base">
            {section.travelAgenciesSubtitle}
          </p>
        </header>
      </FadeIn>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {agencies.map((agency, index) => (
          <FadeIn key={agency.id} delay={index * 80}>
            <TravelAgencyCard agency={agency} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
