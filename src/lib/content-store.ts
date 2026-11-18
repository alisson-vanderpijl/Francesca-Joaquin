import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { SITE_CONFIG as DEFAULT_SITE_CONFIG, NAV_GROUPS } from "@/data/config";
import type {
  ContentSection,
  HotelsContent,
  PageHeaders,
  RestaurantsContent,
  SiteConfig,
  TranslationsContent,
} from "@/lib/content-types";
import { exploreLimaPlaces as DEFAULT_EXPLORE_LIMA } from "@/data/explore-lima";
import { explorePeruPlaces as DEFAULT_EXPLORE_PERU } from "@/data/explore-peru";
import { travelAgencies as DEFAULT_TRAVEL_AGENCIES } from "@/data/travel-agencies";
import { atHomeBeautyProviders as DEFAULT_AT_HOME_BEAUTY } from "@/data/at-home-beauty";
import { getReadyPlaces as DEFAULT_GET_READY } from "@/data/get-ready";
import {
  hotels as DEFAULT_HOTELS,
  hotelDistricts as DEFAULT_HOTEL_DISTRICTS,
  accommodationTypes as DEFAULT_ACCOMMODATION_TYPES,
} from "@/data/hotels";
import {
  restaurants as DEFAULT_RESTAURANTS,
  restaurantDistricts as DEFAULT_RESTAURANT_DISTRICTS,
  cuisineTypes as DEFAULT_CUISINE_TYPES,
  ambianceTypes as DEFAULT_AMBIANCE_TYPES,
} from "@/data/restaurants";
import { itineraryEvents as DEFAULT_ITINERARY_EVENTS } from "@/data/itinerary";
import { weddingEvents as DEFAULT_WEDDING_EVENTS } from "@/data/wedding";
import { translations as DEFAULT_TRANSLATIONS } from "@/i18n/translations";
import type { Locale } from "@/i18n/types";
import type {
  AtHomeBeautyProvider,
  NavGroup,
  PeruDestination,
  Recommendation,
  TravelAgency,
  WeddingEvent,
} from "@/types";

export type {
  ContentSection,
  HotelsContent,
  PageHeaders,
  RestaurantsContent,
  SiteConfig,
  TranslationsContent,
} from "@/lib/content-types";

const DATA_DIR = path.join(process.cwd(), "data");

const DEFAULT_PAGE_HEADERS: PageHeaders = {
  stay: {
    title: "Hospedaje",
    subtitle:
      "Para facilitar su estancia, hemos reservado bloques de habitaciones con tarifas especiales en 2 hoteles y les sugerimos un tercer hotel también recomendado pero con tarifas un poco más económicas. A continuación, encontrará los detalles de cada opción disponible. Para confirmar su reserva, le rogamos que se ponga en contacto directamente con el hotel de su elección. Una vez completado el proceso, le agradeceríamos que nos enviara un correo electrónico con las fechas de su estancia y el nombre del hotel donde se aloja. Quedamos a su disposición para cualquier consulta adicional.",
  },
  eatDrink: {
    title: "Gastronomía",
    subtitle:
      "Reservar con anticipación es muy recomendable en los restaurantes más populares de Lima, especialmente para cena y fines de semana.",
  },
  getReady: {
    title: "Dónde arreglarse",
    subtitle:
      "Salones, spas y barberías para arreglarse antes del matrimonio. Reserva con anticipación.",
  },
  health: {
    title: "Salud y emergencias",
    subtitle:
      "Contactos de confianza para emergencias médicas, farmacias y hospitales cerca de Miraflores y San Isidro.",
  },
  practicalInfo: {
    title: "Información práctica",
    subtitle:
      "Moneda, clima, electricidad y otros datos útiles para disfrutar Lima con tranquilidad.",
  },
  exploreLima: {
    title: "Explora Lima",
    subtitle:
      "Actividades y lugares imperdibles en la capital peruana — desde el centro histórico hasta los distritos costeros.",
  },
  explorePeru: {
    title: "Explore Peru",
    subtitle:
      "Si tienes tiempo extra, Perú ofrece algunos de los destinos más extraordinarios del mundo. Estas son sugerencias para extender tu viaje.",
  },
  map: {
    title: "Mapa",
    subtitle: DEFAULT_SITE_CONFIG.mapDescription,
  },
};

const SECTION_FILES: Record<ContentSection, string> = {
  "site-config": "site-config.json",
  "page-headers": "page-headers.json",
  "itinerary-events": "itinerary-events.json",
  "wedding-events": "wedding-events.json",
  hotels: "hotels.json",
  restaurants: "restaurants.json",
  "explore-lima": "explore-lima.json",
  "explore-peru": "explore-peru.json",
  "travel-agencies": "travel-agencies.json",
  "get-ready": "get-ready.json",
  "at-home-beauty": "at-home-beauty.json",
  translations: "translations.json",
  "nav-groups": "nav-groups.json",
};

const DEFAULTS: Record<ContentSection, unknown> = {
  "site-config": {
    coupleNames: DEFAULT_SITE_CONFIG.coupleNames,
    weddingDate: DEFAULT_SITE_CONFIG.weddingDate,
    weddingCountdownAt: DEFAULT_SITE_CONFIG.weddingCountdownAt,
    GOOGLE_MAPS_URL: DEFAULT_SITE_CONFIG.GOOGLE_MAPS_URL,
    WEDDING_VENUE_MAP_EMBED_URL: DEFAULT_SITE_CONFIG.WEDDING_VENUE_MAP_EMBED_URL,
    GIFT_REGISTRY_URL: DEFAULT_SITE_CONFIG.GIFT_REGISTRY_URL,
    GUEST_MESSAGE_URL: DEFAULT_SITE_CONFIG.GUEST_MESSAGE_URL,
    mapDescription: DEFAULT_SITE_CONFIG.mapDescription,
  } satisfies SiteConfig,
  "page-headers": DEFAULT_PAGE_HEADERS,
  "itinerary-events": DEFAULT_ITINERARY_EVENTS,
  "wedding-events": DEFAULT_WEDDING_EVENTS,
  hotels: {
    hotels: DEFAULT_HOTELS,
    hotelDistricts: [...DEFAULT_HOTEL_DISTRICTS],
    accommodationTypes: [...DEFAULT_ACCOMMODATION_TYPES],
  } satisfies HotelsContent,
  restaurants: {
    restaurants: DEFAULT_RESTAURANTS,
    restaurantDistricts: [...DEFAULT_RESTAURANT_DISTRICTS],
    cuisineTypes: [...DEFAULT_CUISINE_TYPES],
    ambianceTypes: [...DEFAULT_AMBIANCE_TYPES],
  } satisfies RestaurantsContent,
  "explore-lima": DEFAULT_EXPLORE_LIMA,
  "explore-peru": DEFAULT_EXPLORE_PERU,
  "travel-agencies": DEFAULT_TRAVEL_AGENCIES,
  "get-ready": DEFAULT_GET_READY,
  "at-home-beauty": DEFAULT_AT_HOME_BEAUTY,
  translations: {
    es: structuredClone(DEFAULT_TRANSLATIONS.es),
    en: structuredClone(DEFAULT_TRANSLATIONS.en),
  } satisfies TranslationsContent,
  "nav-groups": NAV_GROUPS,
};

async function ensureDataDir(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readSection<T>(section: ContentSection): Promise<T> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, SECTION_FILES[section]);

  try {
    await fs.access(filePath);
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content) as T;
  } catch {
    const defaultValue = DEFAULTS[section] as T;
    await fs.writeFile(filePath, JSON.stringify(defaultValue, null, 2), "utf-8");
    return defaultValue;
  }
}

async function writeSection<T>(section: ContentSection, data: T): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, SECTION_FILES[section]);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const stored = await readSection<SiteConfig>("site-config");
  const defaults = DEFAULTS["site-config"] as SiteConfig;
  return { ...defaults, ...stored };
}

export async function getPageHeaders(): Promise<PageHeaders> {
  return readSection<PageHeaders>("page-headers");
}

export async function getItineraryEvents(): Promise<WeddingEvent[]> {
  return readSection<WeddingEvent[]>("itinerary-events");
}

export async function getWeddingEvents(): Promise<WeddingEvent[]> {
  return readSection<WeddingEvent[]>("wedding-events");
}

export async function getHotelsContent(): Promise<HotelsContent> {
  return readSection<HotelsContent>("hotels");
}

export async function getRestaurantsContent(): Promise<RestaurantsContent> {
  return readSection<RestaurantsContent>("restaurants");
}

export async function getExploreLimaPlaces(): Promise<Recommendation[]> {
  return readSection<Recommendation[]>("explore-lima");
}

export async function getExplorePeruPlaces(): Promise<PeruDestination[]> {
  return readSection<PeruDestination[]>("explore-peru");
}

export async function getTravelAgencies(): Promise<TravelAgency[]> {
  return readSection<TravelAgency[]>("travel-agencies");
}

export async function getGetReadyPlaces(): Promise<Recommendation[]> {
  return readSection<Recommendation[]>("get-ready");
}

export async function getAtHomeBeautyProviders(): Promise<AtHomeBeautyProvider[]> {
  return readSection<AtHomeBeautyProvider[]>("at-home-beauty");
}

export async function getNavGroups(): Promise<NavGroup[]> {
  return readSection<NavGroup[]>("nav-groups");
}

export async function getTranslationsContent(): Promise<TranslationsContent> {
  return readSection<TranslationsContent>("translations");
}

export async function getTranslationsForLocale(
  locale: Locale,
): Promise<Record<string, unknown>> {
  const content = await getTranslationsContent();
  return content[locale];
}

export async function getContentSection(
  section: ContentSection,
): Promise<unknown> {
  return readSection(section);
}

export async function saveContentSection(
  section: ContentSection,
  data: unknown,
): Promise<void> {
  await writeSection(section, data);
}
