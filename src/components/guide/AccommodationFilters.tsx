"use client";

import { HotelCard } from "@/components/cards/HotelCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { HotelsContent } from "@/lib/content-types";

type AccommodationFiltersProps = Pick<HotelsContent, "hotels">;

export function AccommodationFilters({ hotels }: AccommodationFiltersProps) {
  const { t } = useLanguage();
  const countLabel =
    hotels.length === 1 ? t.cardLabels.lodgingFoundOne : t.cardLabels.lodgingFoundMany;

  return (
    <>
      <p className="mb-8 text-sm text-charcoal/50">
        {hotels.length} {countLabel}
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {hotels.map((hotel, index) => (
          <FadeIn key={hotel.id} delay={index * 80}>
            <HotelCard hotel={hotel} />
          </FadeIn>
        ))}
      </div>
    </>
  );
}