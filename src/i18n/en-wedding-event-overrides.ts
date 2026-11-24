import type { WeddingEvent } from "@/types";

/** English overlays for La Boda timeline (locale EN). */
export const weddingEventOverridesEn: Record<string, Partial<WeddingEvent>> = {
  "event-1": {
    title: "Ceremony",
    date: "Saturday, April 3, 2027",
    location: "Templo Inmaculado Corazón de María — Order of Saint Augustine",
    description:
      "Shuttle buses will depart from selected points in Miraflores to take you to the ceremony. Details will be shared closer to the date.",
  },
  "event-2": {
    title: "Cocktail & reception",
    date: "Saturday, April 3, 2027",
    time: "5:30 PM (Cocktail) · 7:00 PM (Reception)",
    description:
      "Shuttle buses will take you from the ceremony to the reception. Details will be shared closer to the date.",
  },
};