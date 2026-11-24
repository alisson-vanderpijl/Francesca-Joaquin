import type { Locale } from "@/i18n/types";
import { itineraryEventOverridesEn } from "@/i18n/en-itinerary-event-overrides";
import { weddingEventOverridesEn } from "@/i18n/en-wedding-event-overrides";
import { withLocaleOverride } from "@/lib/localize-item";
import type { WeddingEvent } from "@/types";

export function localizeItineraryEvents(
  events: WeddingEvent[],
  locale: Locale,
): WeddingEvent[] {
  if (locale !== "en") return events;
  return events.map((event) =>
    withLocaleOverride(event, locale, itineraryEventOverridesEn),
  );
}

export function localizeWeddingEvents(
  events: WeddingEvent[],
  locale: Locale,
): WeddingEvent[] {
  if (locale !== "en") return events;
  return events.map((event) =>
    withLocaleOverride(event, locale, weddingEventOverridesEn),
  );
}