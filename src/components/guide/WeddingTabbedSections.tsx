"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { GuideIcon, guideCardIconClass } from "@/components/guide/GuideIcons";
import { DressCodeSection } from "@/components/guide/DressCodeSection";
import { TransportSection } from "@/components/guide/TransportSection";
import { Timeline } from "@/components/timeline/Timeline";
import { useSiteConfig } from "@/components/providers/ContentProvider";
import { WEDDING_VENUE_MAP_EMBED_URL } from "@/data/wedding-venue-map";
import { useLanguage } from "@/i18n/LanguageProvider";
import { localizeWeddingEvents } from "@/lib/localize-wedding-events";
import type { WeddingEvent } from "@/types";

export const WEDDING_TAB_IDS = [
  "how-to-get-there",
  "itinerary",
  "dress-code",
  "transport",
] as const;

export type WeddingTabId = (typeof WEDDING_TAB_IDS)[number];

type WeddingTabbedSectionsProps = {
  weddingEvents: WeddingEvent[];
};

function tabIdFromHash(hash: string): WeddingTabId | null {
  const id = hash.replace(/^#/, "");
  return (WEDDING_TAB_IDS as readonly string[]).includes(id)
    ? (id as WeddingTabId)
    : null;
}

export function WeddingTabbedSections({ weddingEvents }: WeddingTabbedSectionsProps) {
  const { locale, t } = useLanguage();
  const siteConfig = useSiteConfig();
  const events = localizeWeddingEvents(weddingEvents, locale);
  const howToGetThere = t.wedding.howToGetThere;
  const mapEmbedUrl =
    siteConfig.WEDDING_VENUE_MAP_EMBED_URL?.trim() || WEDDING_VENUE_MAP_EMBED_URL;
  const buses = t.wedding.transport.buses;
  const taxi = t.wedding.transport.taxi;

  const tabs = useMemo(
    () =>
      [
        { id: "how-to-get-there" as const, label: howToGetThere.title },
        { id: "itinerary" as const, label: t.wedding.timeline.title },
        { id: "dress-code" as const, label: t.wedding.dressCode.title },
        { id: "transport" as const, label: t.wedding.transport.title },
      ] satisfies { id: WeddingTabId; label: string }[],
    [howToGetThere.title, t.wedding],
  );

  const [activeTab, setActiveTab] = useState<WeddingTabId>("how-to-get-there");

  useEffect(() => {
    const syncFromHash = () => {
      const fromHash = tabIdFromHash(window.location.hash);
      if (fromHash) setActiveTab(fromHash);
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const selectTab = useCallback((id: WeddingTabId) => {
    setActiveTab(id);
    window.history.replaceState(null, "", `#${id}`);
  }, []);

  return (
    <div className="mt-4">
      <div
        className="-mx-1 flex gap-1 overflow-x-auto border-b border-charcoal/10 pb-px sm:gap-2"
        role="tablist"
        aria-label={t.wedding.title}
      >
        {tabs.map((tab) => {
          const selected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`wedding-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`wedding-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectTab(tab.id)}
              className={`shrink-0 border-b-2 px-3 py-3 text-left text-xs uppercase tracking-widest transition-colors sm:px-4 sm:text-sm ${
                selected
                  ? "border-earth text-charcoal"
                  : "border-transparent text-charcoal/50 hover:border-charcoal/20 hover:text-charcoal"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id="wedding-panel-how-to-get-there"
        role="tabpanel"
        aria-labelledby="wedding-tab-how-to-get-there"
        hidden={activeTab !== "how-to-get-there"}
        className="pt-10 md:pt-12"
      >
        <h2 className="sr-only">{howToGetThere.title}</h2>
        <div className="relative aspect-[16/9] w-full min-h-[220px] overflow-hidden border border-charcoal/10 bg-sand/20 sm:min-h-[320px]">
          <iframe
            src={mapEmbedUrl}
            title={howToGetThere.mapEmbedTitle}
            className="h-full w-full border-0"
            allowFullScreen
            loading="eager"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
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
            {buses.note?.trim() ? (
              <p className="mt-4 text-xs text-charcoal/45">{buses.note}</p>
            ) : null}
          </article>
          <article className="h-full border border-charcoal/10 p-6 md:p-8">
            <GuideIcon id="taxi" className={guideCardIconClass} />
            <h3 className="mt-4 font-serif text-xl text-charcoal md:text-2xl">
              {taxi.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
              {howToGetThere.taxiDescription}
            </p>
          </article>
        </div>
      </div>

      <div
        id="wedding-panel-itinerary"
        role="tabpanel"
        aria-labelledby="wedding-tab-itinerary"
        hidden={activeTab !== "itinerary"}
        className="pt-10 md:pt-12"
      >
        <header className="mb-12 max-w-2xl md:mb-16">
          <h2 className="font-serif text-2xl text-charcoal md:text-3xl">
            {t.wedding.timeline.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-charcoal/70 md:text-base">
            {t.wedding.timeline.subtitle}
          </p>
        </header>
        <Timeline events={events} showDates />
      </div>

      <div
        id="wedding-panel-dress-code"
        role="tabpanel"
        aria-labelledby="wedding-tab-dress-code"
        hidden={activeTab !== "dress-code"}
        className="pt-10 md:pt-12"
      >
        <DressCodeSection variant="tab" />
      </div>

      <div
        id="wedding-panel-transport"
        role="tabpanel"
        aria-labelledby="wedding-tab-transport"
        hidden={activeTab !== "transport"}
        className="pt-10 md:pt-12"
      >
        <TransportSection variant="tab" />
      </div>
    </div>
  );
}