import { MapPageContent } from "@/components/guide/MapPageContent";
import { getSiteConfig } from "@/lib/content-store";

export default async function MapPage() {
  const siteConfig = await getSiteConfig();

  return <MapPageContent googleMapsUrl={siteConfig.GOOGLE_MAPS_URL} />;
}
