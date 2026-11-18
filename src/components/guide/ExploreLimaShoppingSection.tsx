"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { useLanguage } from "@/i18n/LanguageProvider";

type ShoppingCardPlace = {
  name: string;
  description: string;
  address?: string;
  websiteUrl?: string;
  district?: string;
  tagline?: string;
  imageUrl?: string;
  imageLabel?: string;
};

function ShoppingPlaceCard({
  place,
  labels,
}: {
  place: ShoppingCardPlace;
  labels: { address: string; visitWebsite: string };
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden border border-charcoal/10 bg-ivory transition-all duration-300 hover:border-charcoal/20">
      {place.imageUrl ? (
        <div className="relative aspect-[4/3] w-full shrink-0">
          <Image
            src={place.imageUrl}
            alt={place.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <h3 className="font-serif text-xl text-charcoal md:text-2xl">{place.name}</h3>
        {place.district && (
          <p className="mt-1 text-xs uppercase tracking-widest text-earth">{place.district}</p>
        )}
        {place.tagline && (
          <p className="mt-1 text-xs uppercase tracking-widest text-charcoal/45">{place.tagline}</p>
        )}
        <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{place.description}</p>

        {place.address && (
          <dl className="mt-6 space-y-3 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-widest text-charcoal/40">{labels.address}</dt>
              <dd className="mt-1 text-charcoal/80">{place.address}</dd>
            </div>
          </dl>
        )}

        {place.websiteUrl && (
          <div className="mt-auto pt-6">
            <Button href={place.websiteUrl} external variant="secondary" className="text-xs">
              {labels.visitWebsite}
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}

export function ExploreLimaShoppingSection() {
  const { t } = useLanguage();
  const section = t.exploreLimaPage.shoppingSection;
  const cardLabels = {
    address: section.addressLabel,
    visitWebsite: section.visitWebsiteLabel,
  };

  return (
    <section className="mt-20 border-t border-charcoal/10 pt-20 md:mt-28 md:pt-28">
      <FadeIn>
        <header className="mb-12 max-w-3xl md:mb-16">
          <h2 className="font-serif text-3xl text-charcoal md:text-4xl">{section.title}</h2>
          {section.subtitle && (
            <p className="mt-4 text-sm leading-relaxed text-charcoal/70 md:text-base">
              {section.subtitle}
            </p>
          )}
        </header>
      </FadeIn>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {section.spots.map((spot, index) => (
          <FadeIn key={spot.id} delay={index * 80} className="h-full">
            <ShoppingPlaceCard place={spot} labels={cardLabels} />
          </FadeIn>
        ))}
      </div>

      <div className="mt-16 md:mt-20">
        <FadeIn delay={120}>
          <h3 className="font-serif text-2xl text-charcoal md:text-3xl">
            {section.miguelDassoTitle}
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-charcoal/70 md:text-base">
            {section.miguelDassoIntro}
          </p>
        </FadeIn>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {section.boutiques.map((boutique, index) => (
            <FadeIn key={boutique.id} delay={160 + index * 60} className="h-full">
              <ShoppingPlaceCard place={boutique} labels={cardLabels} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}