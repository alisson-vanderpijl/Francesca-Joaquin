"use client";

import Image from "next/image";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { PeruDestination } from "@/types";

type PeruDestinationCardProps = {
  destination: PeruDestination;
};

export function PeruDestinationCard({ destination }: PeruDestinationCardProps) {
  const { t } = useLanguage();
  const labels = t.cardLabels;

  const durationLabel =
    destination.minDurationDays === 1
      ? `1 ${labels.day}`
      : `${destination.minDurationDays} ${labels.days}`;

  return (
    <article className="flex h-full flex-col overflow-hidden border border-charcoal/10 bg-ivory transition-all duration-300 hover:border-charcoal/20">
      {destination.imageUrl ? (
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={destination.imageUrl}
            alt={destination.name}
            fill
            className="object-cover"
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ) : (
        <ImagePlaceholder
          label={destination.imageLabel}
          aspectRatio="wide"
          className="w-full"
        />
      )}

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <h3 className="font-serif text-xl text-charcoal md:text-2xl">{destination.name}</h3>
        <p className="mt-1 text-xs uppercase tracking-widest text-earth">
          {labels.minDurationPrefix} {durationLabel}
        </p>

        <p className="mt-4 text-sm leading-relaxed text-charcoal/70">
          {destination.description}
        </p>

        <dl className="mt-6 space-y-3 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-widest text-charcoal/40">
              {labels.location}
            </dt>
            <dd className="mt-1 text-charcoal/80">{destination.address}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}