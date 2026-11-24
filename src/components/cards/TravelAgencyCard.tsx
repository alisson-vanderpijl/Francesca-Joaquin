"use client";

import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { TravelAgency } from "@/types";

type TravelAgencyCardProps = {
  agency: TravelAgency;
};

export function TravelAgencyCard({ agency }: TravelAgencyCardProps) {
  const { t } = useLanguage();

  return (
    <article className="flex h-full flex-col overflow-hidden border border-charcoal/10 bg-ivory transition-all duration-300 hover:border-charcoal/20">
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <h3 className="font-serif text-xl text-charcoal md:text-2xl">{agency.name}</h3>

        <p className="mt-4 text-sm leading-relaxed text-charcoal/70">
          {agency.description}
        </p>

        {(agency.websiteUrl || agency.phone) && (
          <div className="mt-auto pt-8">
            <Button
              href={
                agency.websiteUrl ||
                `tel:${agency.phone!.replace(/\s/g, "")}`
              }
              external={!!agency.websiteUrl}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              {t.cardLabels.contact}
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}
