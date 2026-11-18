"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { useLanguage } from "@/i18n/LanguageProvider";

export function TransportSection() {
  const { t } = useLanguage();
  const transport = t.wedding.transport;

  const options = [transport.designatedDrivers, transport.taxi] as const;

  return (
    <section
      id="transport"
      className="mt-20 border-t border-charcoal/10 pt-20 md:mt-28 md:pt-28"
    >
      <FadeIn>
        <header className="mb-12 max-w-2xl md:mb-16">
          <h2 className="font-serif text-3xl text-charcoal md:text-4xl">
            {transport.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-charcoal/70 md:text-base">
            {transport.intro}
          </p>
        </header>
      </FadeIn>

      <div className="space-y-8">
        {options.map((option, index) => (
          <FadeIn key={option.title} delay={index * 80}>
            <article className="border border-charcoal/10 p-6 md:p-8">
              <h3 className="font-serif text-xl text-charcoal md:text-2xl">
                {option.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                {option.description}
              </p>
              <p className="mt-4 text-xs text-charcoal/45">{option.note}</p>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
