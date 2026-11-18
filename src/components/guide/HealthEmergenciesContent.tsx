"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { useLanguage } from "@/i18n/LanguageProvider";

type HealthPlace = {
  name: string;
  websiteUrl: string;
  websiteLabel: string;
  phone: string;
  address?: string;
};

function HealthPlaceCard({
  place,
  labels,
}: {
  place: HealthPlace;
  labels: { phone: string; website: string; address?: string };
}) {
  return (
    <article className="h-full border border-charcoal/10 bg-ivory p-6 md:p-8">
      <h3 className="font-serif text-lg text-charcoal md:text-xl">{place.name}</h3>
      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="text-xs uppercase tracking-widest text-charcoal/40">
            {labels.website}
          </dt>
          <dd className="mt-1">
            <a
              href={place.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-earth transition-colors hover:text-charcoal"
            >
              {place.websiteLabel}
            </a>
          </dd>
        </div>
        {place.address && labels.address && (
          <div>
            <dt className="text-xs uppercase tracking-widest text-charcoal/40">
              {labels.address}
            </dt>
            <dd className="mt-1 text-charcoal/80">{place.address}</dd>
          </div>
        )}
        <div>
          <dt className="text-xs uppercase tracking-widest text-charcoal/40">
            {labels.phone}
          </dt>
          <dd className="mt-1">
            <a
              href={`tel:${place.phone.replace(/[^\d+]/g, "")}`}
              className="text-earth transition-colors hover:text-charcoal"
            >
              {place.phone}
            </a>
          </dd>
        </div>
      </dl>
    </article>
  );
}

export function HealthEmergenciesContent() {
  const { t } = useLanguage();
  const section = t.healthPage;

  return (
    <>
      <FadeIn delay={80}>
        <article className="mb-10 w-full border border-charcoal/20 bg-charcoal px-6 py-10 text-center md:px-10 md:py-12">
          <h2 className="font-serif text-xl text-ivory md:text-2xl lg:text-3xl">
            {section.emergencyTitle}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ivory/90 md:text-base">
            <a
              href="tel:+5114166777"
              className="text-ivory underline decoration-ivory/40 underline-offset-4 transition-colors hover:text-sand hover:decoration-sand"
            >
              {section.emergencyLine}
            </a>
          </p>
        </article>
      </FadeIn>

      <div className="mb-6 max-w-2xl">
        <h2 className="font-serif text-2xl text-charcoal md:text-3xl">
          {section.pharmaciesTitle}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
          {section.pharmaciesIntro}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {section.pharmacies.map((pharmacy, index) => (
          <FadeIn key={pharmacy.name} delay={120 + index * 80}>
            <HealthPlaceCard
              place={pharmacy}
              labels={{
                phone: section.phoneLabel,
                website: section.websiteLabel,
              }}
            />
          </FadeIn>
        ))}
      </div>

      <div className="mb-6 mt-16 max-w-2xl md:mt-20">
        <h2 className="font-serif text-2xl text-charcoal md:text-3xl">
          {section.hospitalsTitle}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {section.hospitals.map((hospital, index) => (
          <FadeIn key={hospital.name} delay={160 + index * 80}>
            <HealthPlaceCard
              place={hospital}
              labels={{
                phone: section.phoneLabel,
                website: section.websiteLabel,
                address: section.addressLabel,
              }}
            />
          </FadeIn>
        ))}
      </div>
    </>
  );
}