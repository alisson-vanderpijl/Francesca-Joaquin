"use client";

import { AtHomeBeautyCard } from "@/components/cards/AtHomeBeautyCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { AtHomeBeautyProvider } from "@/types";

type GetReadyAtHomeServicesProps = {
  providers: AtHomeBeautyProvider[];
};

export function GetReadyAtHomeServices({
  providers,
}: GetReadyAtHomeServicesProps) {
  const { t } = useLanguage();
  const section = t.getReadyPage;

  return (
    <section className="mt-20 border-t border-charcoal/10 pt-20 md:mt-28 md:pt-28">
      <FadeIn>
        <header className="mb-12 max-w-2xl md:mb-16">
          <h2 className="font-serif text-3xl text-charcoal md:text-4xl">
            {section.atHomeTitle}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-charcoal/70 md:text-base">
            {section.atHomeSubtitle}
          </p>
        </header>
      </FadeIn>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {providers.map((provider, index) => (
          <FadeIn key={provider.id} delay={index * 80}>
            <AtHomeBeautyCard
              provider={provider}
              labels={{
                services: section.servicesLabel,
                phone: section.phoneLabel,
              }}
            />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
