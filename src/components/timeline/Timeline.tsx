"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import type { WeddingEvent } from "@/types";

type TimelineProps = {
  events: WeddingEvent[];
  showDates?: boolean;
};

export function Timeline({ events, showDates = false }: TimelineProps) {
  const { t } = useLanguage();
  const mapsLabel = t.cardLabels.googleMaps;
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 hidden h-full w-px bg-charcoal/15 md:left-1/2 md:block" />

      <div className="space-y-12 md:space-y-16">
        {events.map((event, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={event.id}
              className={`relative grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-12 ${
                isEven ? "" : "md:[&>*:first-child]:order-2"
              }`}
            >
              <div
                className={`${isEven ? "md:text-right" : "md:text-left"} md:pr-12`}
              >
                {showDates && event.date && (
                  <p className="text-xs uppercase tracking-widest text-earth">
                    {event.date}
                  </p>
                )}
                <h3
                  className={`font-serif text-2xl text-charcoal md:text-3xl ${
                    showDates && event.date ? "mt-2" : ""
                  }`}
                >
                  {event.title}
                </h3>
                <p className="mt-3 text-sm font-medium text-charcoal/80">
                  {event.time}
                </p>
              </div>

              <div
                className={`border border-charcoal/10 bg-ivory p-6 md:p-8 ${
                  isEven ? "md:pl-12" : "md:pr-12"
                }`}
              >
                <p className="text-sm font-medium text-charcoal">{event.location}</p>
                <p className="mt-2 text-sm text-charcoal/60">{event.address}</p>
                {event.description?.trim() ? (
                  <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-charcoal/70">
                    {event.description}
                  </p>
                ) : null}
                {event.googleMapsUrl ? (
                  <a
                    href={event.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block text-xs uppercase tracking-widest text-charcoal/60 transition-colors hover:text-charcoal ${
                      event.description?.trim() ? "mt-4" : "mt-3"
                    }`}
                  >
                    {mapsLabel}
                  </a>
                ) : null}
              </div>

              <div className="absolute left-4 top-6 hidden h-2 w-2 -translate-x-1/2 rounded-full bg-earth md:left-1/2 md:block" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
