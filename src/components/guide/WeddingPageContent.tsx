"use client";

import { GuideIcon, guideCardIconClass } from "@/components/guide/GuideIcons";
import { DressCodeSection } from "@/components/guide/DressCodeSection";
import { TransportSection } from "@/components/guide/TransportSection";
import { Timeline } from "@/components/timeline/Timeline";
import { FadeIn } from "@/components/ui/FadeIn";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { WeddingEvent } from "@/types";

type WeddingPageContentProps = {
  weddingEvents: WeddingEvent[];
};

export function WeddingPageContent({ weddingEvents }: WeddingPageContentProps) {
  const { t } = useLanguage();
  const howToGetThere = t.wedding.howToGetThere;
  const buses = t.wedding.transport.buses;
  const taxi = t.wedding.transport.taxi;

  return (
    <>
      <FadeIn>
        <header className="mb-12 border-b border-charcoal/10 pb-10 md:mb-16 md:pb-14">
          <h1 className="font-serif text-4xl text-charcoal md:text-5xl lg:text-6xl">
            {t.wedding.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-charcoal/70 md:text-base">
            {t.wedding.subtitle}
          </p>
        </header>
      </FadeIn>

      <FadeIn delay={50}>
        <section id="how-to-get-there">
          <h2 className="font-serif text-2xl text-charcoal md:text-3xl">
            {howToGetThere.title}
          </h2>
          <ImagePlaceholder
            label={howToGetThere.mapLabel}
            aspectRatio="wide"
            className="mt-8 w-full"
          />
          <p className="mt-8 font-serif text-xl text-charcoal md:text-2xl">
            {howToGetThere.transportQuestion}
          </p>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <article className="h-full border border-charcoal/10 p-6 md:p-8">
              <GuideIcon id="bus" className={guideCardIconClass} />
              <h3 className="mt-4 font-serif text-xl text-charcoal md:text-2xl">
                {buses.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                {buses.description}
              </p>
              <p className="mt-4 text-xs text-charcoal/45">{buses.note}</p>
            </article>
            <article className="h-full border border-charcoal/10 p-6 md:p-8">
              <GuideIcon id="taxi" className={guideCardIconClass} />
              <h3 className="mt-4 font-serif text-xl text-charcoal md:text-2xl">
                {taxi.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                {taxi.description}
              </p>
              <p className="mt-4 text-xs text-charcoal/45">{taxi.note}</p>
            </article>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={100}>
        <section id="itinerary" className="mt-20 border-t border-charcoal/10 pt-20 md:mt-28 md:pt-28">
          <header className="mb-12 max-w-2xl md:mb-16">
            <h2 className="font-serif text-3xl text-charcoal md:text-4xl">
              {t.wedding.timeline.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-charcoal/70 md:text-base">
              {t.wedding.timeline.subtitle}
            </p>
          </header>
          <Timeline events={weddingEvents} />
        </section>
      </FadeIn>

      <DressCodeSection />
      <TransportSection />
    </>
  );
}
