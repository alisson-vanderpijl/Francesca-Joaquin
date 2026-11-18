import { ItineraryPageContent } from "@/components/guide/ItineraryPageContent";
import { getItineraryEvents } from "@/lib/content-store";
import { guidePageShellClass } from "@/lib/layout-classes";

export default async function ItineraryPage() {
  const itineraryEvents = await getItineraryEvents();

  return (
    <div className={guidePageShellClass}>
      <ItineraryPageContent itineraryEvents={itineraryEvents} />
    </div>
  );
}
