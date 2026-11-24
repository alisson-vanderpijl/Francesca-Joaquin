import type {
  AtHomeBeautyProvider,
  Hotel,
  NavGroup,
  PeruDestination,
  PriceLevel,
  Recommendation,
  Restaurant,
  TravelAgency,
  WeddingEvent,
} from "@/types";

export type SiteConfig = {
  coupleNames: string;
  weddingDate: string;
  /** ISO 8601 date/time for countdown (e.g. ceremony start, Lima) */
  weddingCountdownAt?: string;
  GOOGLE_MAPS_URL: string;
  /** Google Maps embed iframe src for the wedding venue */
  WEDDING_VENUE_MAP_EMBED_URL?: string;
  GIFT_REGISTRY_URL: string;
  GUEST_MESSAGE_URL: string;
  mapDescription: string;
};

export type PageHeader = {
  title: string;
  subtitle: string;
};

export type PageHeaders = {
  stay: PageHeader;
  eatDrink: PageHeader;
  getReady: PageHeader;
  health: PageHeader;
  practicalInfo: PageHeader;
  exploreLima: PageHeader;
  explorePeru: PageHeader;
  map: PageHeader;
};

export type HotelsContent = {
  hotels: Hotel[];
  hotelDistricts: string[];
  accommodationTypes: string[];
};

export type RestaurantsContent = {
  restaurants: Restaurant[];
  restaurantDistricts: string[];
  cuisineTypes: string[];
  ambianceTypes: string[];
};

export type TranslationsContent = {
  es: Record<string, unknown>;
  en: Record<string, unknown>;
};

export type ContentSection =
  | "site-config"
  | "page-headers"
  | "itinerary-events"
  | "wedding-events"
  | "hotels"
  | "restaurants"
  | "explore-lima"
  | "explore-peru"
  | "travel-agencies"
  | "get-ready"
  | "at-home-beauty"
  | "translations"
  | "nav-groups";

/** Sections editable from /admin. */
export type AdminEditableSection =
  | "itinerary-events"
  | "wedding-events"
  | "gift-registry";

export const ADMIN_CONTENT_SECTIONS: {
  id: AdminEditableSection;
  label: string;
}[] = [
  { id: "itinerary-events", label: "El Itinerario" },
  { id: "wedding-events", label: "La Boda — Itinerario del día" },
  { id: "gift-registry", label: "Lista de regalos" },
];

export type {
  AtHomeBeautyProvider,
  Hotel,
  NavGroup,
  PeruDestination,
  PriceLevel,
  Recommendation,
  Restaurant,
  TravelAgency,
  WeddingEvent,
};
