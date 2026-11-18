"use client";

import { RecommendationCard } from "@/components/cards/RecommendationCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { useLanguage } from "@/i18n/LanguageProvider";
import { withLocaleOverride } from "@/lib/localize-item";
import type { Recommendation } from "@/types";

type ExploreLimaPlacesGridProps = {
  places: Recommendation[];
};

export function ExploreLimaPlacesGrid({ places }: ExploreLimaPlacesGridProps) {
  const { locale, t } = useLanguage();
  const overrides = t.exploreLimaPage.placeOverrides as Record<
    string,
    Partial<Recommendation>
  >;

  const visiblePlaces = places.filter((place) => place.id !== "lima-shopping");

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {visiblePlaces.map((place, index) => {
        const item = withLocaleOverride(place, locale, overrides);

        return (
          <FadeIn key={place.id} delay={index * 80} className="h-full">
            <RecommendationCard
              item={item}
              labels={{ address: t.cardLabels.address }}
            />
          </FadeIn>
        );
      })}
    </div>
  );
}