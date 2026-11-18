"use client";

import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { useLanguage } from "@/i18n/LanguageProvider";
import { renderInlineBold } from "@/lib/render-inline-bold";

const iconClass = "h-7 w-7 shrink-0 stroke-earth/85";

function CarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass} aria-hidden="true">
      <path d="M5 15h14" />
      <path d="M7 15l2.5-6h5l2.5 6" />
      <path d="M9 6h6v2H9z" />
      <circle cx="7.5" cy="17" r="1.5" />
      <circle cx="16.5" cy="17" r="1.5" />
    </svg>
  );
}

function PracticalInfoIcon({ id, title }: { id: string; title?: string }) {
  const cityTransport =
    id === "transport-city" ||
    id === "getting-around" ||
    /transporte en la ciudad|getting around the city/i.test(title ?? "");

  const airportTransport =
    id === "transport-airport" ||
    /transporte aeropuerto|airport transport/i.test(title ?? "");

  if (cityTransport) {
    return <CarIcon />;
  }

  if (airportTransport) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass} aria-hidden="true">
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 20 3c-1.5-1-3.5 0-4.5 1.5L12 8 7 7 4 8.5 12 12l-1.5 8 2 .5 3-5.5 3.5 1 1 2.5z" />
      </svg>
    );
  }

  switch (id) {
    case "currency":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={iconClass} aria-hidden="true">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8c-2 0-3 .75-3 2s1.5 2 3 2 3 .75 3 2-1 2-3 2" />
          <path d="M12 6v2M12 16v2" />
        </svg>
      );
    case "tipping":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={iconClass} aria-hidden="true">
          <rect x="3" y="6" width="14" height="9" rx="1" />
          <path d="M5 9h10M5 12h6" />
          <rect x="7" y="9" width="12" height="9" rx="1" />
          <path d="M9 12h8M9 15h5" />
        </svg>
      );
    case "water":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={iconClass} aria-hidden="true">
          <path d="M12 3c4 6 6 9.5 6 13a6 6 0 0 1-12 0c0-3.5 2-7 6-13z" />
        </svg>
      );
    case "food":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={iconClass} aria-hidden="true">
          <path d="M6 3v8a3 3 0 0 0 6 0V3M9 11v10M18 3v18" />
        </svg>
      );
    case "electricity":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={iconClass} aria-hidden="true">
          <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
        </svg>
      );
    case "weather":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={iconClass} aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={iconClass} aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 10v6M12 7h.01" />
        </svg>
      );
  }
}

export function PracticalInfoContent() {
  const { t } = useLanguage();
  const section = t.practicalInfoPage;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {section.topics.map((topic, index) => (
        <FadeIn key={topic.id} delay={index * 60} className="h-full">
          <article className="flex h-full min-h-[280px] flex-col border border-charcoal/10 bg-ivory p-6 md:min-h-[300px] md:p-8">
            <header className="flex flex-col gap-4">
              <PracticalInfoIcon id={topic.id} title={topic.title} />
              <h2 className="font-serif text-xl text-charcoal md:text-2xl">
                {topic.title}
              </h2>
            </header>
            <p className="mt-4 flex-1 whitespace-pre-line text-sm leading-relaxed text-charcoal/70">
              {renderInlineBold(topic.body)}
            </p>
            {"linkHref" in topic &&
            topic.linkHref &&
            "linkLabel" in topic &&
            topic.linkLabel ? (
              <div className="mt-6 pt-2">
                <Button href={topic.linkHref} variant="secondary" className="w-full text-xs">
                  {topic.linkLabel}
                </Button>
              </div>
            ) : null}
          </article>
        </FadeIn>
      ))}
    </div>
  );
}