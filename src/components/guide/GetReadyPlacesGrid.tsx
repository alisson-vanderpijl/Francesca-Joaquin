"use client";

import { RecommendationCard } from "@/components/cards/RecommendationCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { useLanguage } from "@/i18n/LanguageProvider";
import { withLocaleOverride } from "@/lib/localize-item";
import type { Recommendation } from "@/types";

type GetReadyPlacesGridProps = {
  places: Recommendation[];
};

export function GetReadyPlacesGrid({ places }: GetReadyPlacesGridProps) {
  const { locale, t } = useLanguage();
  const overrides = t.getReadyPage.placeOverrides as Record<
    string,
    Partial<Recommendation>
  >;
  const { address, phone } = t.cardLabels;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {places.map((place, index) => {
        const item = withLocaleOverride(place, locale, overrides);
        return (
          <FadeIn key={place.id} delay={index * 80} className="h-full">
            <RecommendationCard
              item={item}
              showImage={false}
              showPhone
              labels={{ address, phone }}
            />
          </FadeIn>
        );
      })}
    </div>
  );
}