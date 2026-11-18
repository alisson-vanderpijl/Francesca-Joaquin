import type { NavGroup } from "@/types";
import { WEDDING_VENUE_MAP_EMBED_URL } from "@/data/wedding-venue-map";

export const SITE_CONFIG = {
  coupleNames: "Francesca & Joaquín",
  weddingDate: "3 de Abril de 2027 - Lima, Perú",
  weddingCountdownAt: "2027-04-03T15:30:00-05:00",
  welcomeTitle: "Bienvenidos a Lima",
  welcomeMessage:
    "Estamos muy felices de compartir este momento con ustedes. Esta guía contiene toda la información que necesitan para disfrutar Lima, descubrir Perú y acompañarnos en nuestro matrimonio.",
  introText:
    "Desde dónde hospedarse y dónde comer, hasta qué visitar y cómo vestirse — todo en un solo lugar, pensado especialmente para ustedes.",
  /** Insert the shared Google Maps link here when ready */
  GOOGLE_MAPS_URL: "",
  WEDDING_VENUE_MAP_EMBED_URL,
  /** External gift registry platform URL */
  GIFT_REGISTRY_URL: "https://example.com/gift-registry",
  /** External link for guests to leave a message (e.g. WhatsApp or form) */
  GUEST_MESSAGE_URL: "https://example.com/guest-message",
  mapDescription:
    "Hemos preparado un mapa con todos los lugares recomendados en esta guía — hoteles, restaurantes, salones y puntos de interés en Lima.",
} as const;

export const NAV_GROUPS: NavGroup[] = [
  {
    id: "ourWedding",
    items: [
      { id: "itinerary", href: "/guide/itinerary" },
      { id: "wedding", href: "/guide/wedding" },
      { id: "giftRegistry", href: "/guide/gift-registry" },
    ],
  },
  {
    id: "guestGuide",
    items: [
      { id: "stay", href: "/guide/stay" },
      { id: "eatDrink", href: "/guide/eat-drink" },
      { id: "getReady", href: "/guide/get-ready" },
      { id: "health", href: "/guide/health" },
      { id: "exploreLima", href: "/guide/explore-lima" },
      { id: "explorePeru", href: "/guide/explore-peru" },
      { id: "map", href: "/guide/map" },
      { id: "practicalInfo", href: "/guide/practical-information" },
    ],
  },
];
