export type Recommendation = {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  phone?: string;
  imageLabel?: string;
  imageUrl?: string;
  websiteUrl?: string;
  googleMapsUrl?: string;
};

export type Restaurant = Recommendation & {
  district: string;
  cuisineType: string;
  ambiance: string;
};

export type PeruDestination = Recommendation & {
  minDurationDays: number;
  imageLabel: string;
  imageUrl?: string;
};

export type TravelAgency = Recommendation & {
  imageLabel: string;
  imageUrl?: string;
};

export type AtHomeBeautyProvider = {
  id: string;
  name: string;
  phone: string;
  services: string[];
};

export type AccommodationType = "hotel" | "airbnb";

/** 1 = $ (económico) … 4 = $$$$ (lujo) */
export type PriceLevel = 1 | 2 | 3 | 4;

export type Hotel = Omit<Recommendation, "category"> & {
  category: AccommodationType;
  district: string;
  imageLabel: string;
  imageUrl?: string;
  airbnbUrl?: string;
  priceLevel?: PriceLevel;
  /** Tarifa mostrada en la ficha (ej. desde USD 265 por noche) */
  roomRate?: string;
};

export type AttendanceStatus = "attending" | "not_attending";

export type RSVPData = {
  name: string;
  attendance: AttendanceStatus;
  attendingWithPartner?: boolean;
  partnerName?: string;
  arrivalDate?: string;
  phoneCountryCode?: string;
  phone?: string;
};

export type WeddingEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  description: string;
  additionalInfo?: string;
};

export type GuideCategory = {
  id: string;
  href: string;
  imageLabel: string;
  external?: boolean;
};

export type FilterOption = {
  id: string;
  label: string;
};

export type NavItemId =
  | "itinerary"
  | "wedding"
  | "giftRegistry"
  | "stay"
  | "eatDrink"
  | "getReady"
  | "health"
  | "practicalInfo"
  | "exploreLima"
  | "explorePeru"
  | "map";

export type NavItem = {
  id: NavItemId;
  href: string;
};

export type NavGroup = {
  id: "ourWedding" | "guestGuide";
  items: NavItem[];
};
