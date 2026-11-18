"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { useLanguage } from "@/i18n/LanguageProvider";

export function StayDistrictGuide() {
  const { t } = useLanguage();
  const section = t.stayPage;

  return (
    <section className="mb-16 md:mb-20">
      <FadeIn>
        <header className="mb-10 max-w-2xl md:mb-12">
          <h2 className="font-serif text-3xl text-charcoal md:text-4xl">
            {section.chooseWhereToStayTitle}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-charcoal/70 md:text-base">
            {section.chooseWhereToStaySubtitle}
          </p>
        </header>
      </FadeIn>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {section.districts.map((district, index) => (
          <FadeIn key={district.name} delay={index * 80}>
            <article className="h-full border border-charcoal/10 bg-ivory p-6 md:p-8">
              <h3 className="font-serif text-xl text-charcoal md:text-2xl">
                {district.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                {district.description}
              </p>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
