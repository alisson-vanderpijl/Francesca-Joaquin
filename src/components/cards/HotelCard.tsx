"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { PriceLevelTag } from "@/components/ui/PriceLevelTag";
import { useLanguage } from "@/i18n/LanguageProvider";
import { withLocaleOverride } from "@/lib/localize-item";
import type { Hotel } from "@/types";

type HotelCardProps = {
  hotel: Hotel;
};

const typeLabels: Record<Hotel["category"], string> = {
  hotel: "Hotel",
  airbnb: "Airbnb",
};

export function HotelCard({ hotel }: HotelCardProps) {
  const { locale, t } = useLanguage();
  const labels = t.cardLabels;
  const overrides = t.stayPage.hotelOverrides as Record<string, Partial<Hotel>>;
  const item = withLocaleOverride(hotel, locale, overrides);

  return (
    <article className="flex h-full flex-col overflow-hidden border border-charcoal/10 bg-ivory transition-all duration-300 hover:border-charcoal/20">
      {item.imageUrl ? (
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ) : (
        <ImagePlaceholder
          label={item.imageLabel}
          aspectRatio="landscape"
          className="w-full"
        />
      )}

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h3 className="font-serif text-xl text-charcoal md:text-2xl">
            {item.name}
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            <PriceLevelTag level={item.priceLevel ?? 2} />
            <span className="text-xs uppercase tracking-widest text-charcoal/50">
              {typeLabels[item.category]}
            </span>
            <span className="text-xs uppercase tracking-widest text-earth">
              {item.district}
            </span>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-charcoal/70">
          {item.description}
        </p>

        <dl className="mt-6 space-y-3 text-sm">
          {item.roomRate && (
            <div>
              <dt className="text-xs uppercase tracking-widest text-charcoal/40">
                {labels.roomRate}
              </dt>
              <dd className="mt-1 text-charcoal/80">{item.roomRate}</dd>
            </div>
          )}
          <div>
            <dt className="text-xs uppercase tracking-widest text-charcoal/40">
              {labels.address}
            </dt>
            <dd className="mt-1 text-charcoal/80">{item.address}</dd>
          </div>
          {item.phone && (
            <div>
              <dt className="text-xs uppercase tracking-widest text-charcoal/40">
                {labels.phone}
              </dt>
              <dd className="mt-1">
                <a
                  href={`tel:${item.phone.replace(/\s/g, "")}`}
                  className="text-earth transition-colors hover:text-charcoal"
                >
                  {item.phone}
                </a>
              </dd>
            </div>
          )}
        </dl>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
          {item.category === "hotel" && item.websiteUrl && (
            <Button href={item.websiteUrl} external className="text-xs">
              {labels.visitWebsite}
            </Button>
          )}
          {item.category === "airbnb" && item.airbnbUrl && (
            <Button href={item.airbnbUrl} external className="text-xs">
              {labels.viewAirbnb}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
