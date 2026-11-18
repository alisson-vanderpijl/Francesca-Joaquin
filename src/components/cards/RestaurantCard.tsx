"use client";

import Image from "next/image";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Restaurant } from "@/types";

type RestaurantCardProps = {
  restaurant: Restaurant;
};

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const { t } = useLanguage();
  const labels = t.cardLabels;
  const tagLabels = t.eatDrinkPage.tagLabels as Record<string, string>;
  const displayTag = (tag: string) => tagLabels[tag] ?? tag;
  const imageLabel = restaurant.imageLabel ?? restaurant.name;
  const tags = [
    ...new Set(
      [restaurant.cuisineType, restaurant.ambiance].filter(
        (tag): tag is string => Boolean(tag?.trim()),
      ),
    ),
  ];

  return (
    <article className="flex h-full flex-col overflow-hidden border border-charcoal/10 bg-ivory transition-all duration-300 hover:border-charcoal/20">
      {restaurant.imageUrl ? (
        <div className="relative aspect-[4/3] w-full shrink-0">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            className="object-cover"
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ) : (
        <ImagePlaceholder
          label={imageLabel}
          aspectRatio="landscape"
          className="w-full shrink-0"
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col p-6 md:p-8">
        <h3 className="font-serif text-xl text-charcoal md:text-2xl">{restaurant.name}</h3>
        <p className="mt-1 text-xs uppercase tracking-widest text-earth">
          {displayTag(restaurant.district)}
        </p>

        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="border border-charcoal/10 px-3 py-1 text-xs text-charcoal/70"
              >
                {displayTag(tag)}
              </span>
            ))}
          </div>
        )}

        <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
          {restaurant.description}
        </p>

        <dl className="mt-6 space-y-3 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-widest text-charcoal/40">
              {labels.address}
            </dt>
            <dd className="mt-1 whitespace-pre-line text-charcoal/80">
              {restaurant.address}
            </dd>
          </div>
          {restaurant.phone && (
            <div>
              <dt className="text-xs uppercase tracking-widest text-charcoal/40">
                {labels.phone}
              </dt>
              <dd className="mt-1">
                <a
                  href={`tel:${restaurant.phone.replace(/\s/g, "")}`}
                  className="text-lg font-medium text-earth transition-colors hover:text-charcoal"
                >
                  {restaurant.phone}
                </a>
              </dd>
            </div>
          )}
        </dl>

        <div className="mt-auto flex flex-wrap gap-4 pt-4">
          {restaurant.websiteUrl && (
            <a
              href={restaurant.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest text-charcoal/60 transition-colors hover:text-charcoal"
            >
              {labels.visitWebsite} →
            </a>
          )}
          {restaurant.googleMapsUrl && (
            <a
              href={restaurant.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest text-charcoal/60 transition-colors hover:text-charcoal"
            >
              {labels.googleMaps}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}