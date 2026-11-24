import type { WeddingEvent } from "@/types";

/** English overlays for El Itinerario (locale EN). */
export const itineraryEventOverridesEn: Record<
  string,
  Partial<WeddingEvent>
> = {
  "itinerary-welcome": {
    title: "Welcome cocktail",
    date: "Thursday, April 1, 2027",
    time: "To be confirmed",
    location: "To be confirmed",
    address: "Address to be confirmed",
    description:
      "Welcome cocktail for guests arriving before the wedding weekend.\n\nDress code: Smart casual / Cocktail.",
  },
  "itinerary-1": {
    title: "Ceremony",
    date: "Saturday, April 3, 2027",
    location: "Templo Inmaculado Corazón de María — Order of Saint Augustine",
    description:
      "Shuttle buses will depart from selected points in Miraflores to take you to the ceremony. Details will be shared closer to the date.",
  },
  "itinerary-2": {
    title: "Cocktail & reception",
    date: "Saturday, April 3, 2027",
    time: "5:30 PM (Cocktail) · 7:00 PM (Reception)",
    description:
      "Shuttle buses will take you from the ceremony to the reception. Details will be shared closer to the date.",
  },
};