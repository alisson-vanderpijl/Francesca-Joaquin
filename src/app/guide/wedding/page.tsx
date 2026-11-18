import { WeddingPageContent } from "@/components/guide/WeddingPageContent";
import { getWeddingEvents } from "@/lib/content-store";

export default async function WeddingPage() {
  const weddingEvents = await getWeddingEvents();

  return <WeddingPageContent weddingEvents={weddingEvents} />;
}
