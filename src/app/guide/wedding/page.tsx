import { WeddingPageContent } from "@/components/guide/WeddingPageContent";
import { getWeddingEvents } from "@/lib/content-store";
import { guidePageShellClass } from "@/lib/layout-classes";

export default async function WeddingPage() {
  const weddingEvents = await getWeddingEvents();

  return (
    <div className={guidePageShellClass}>
      <WeddingPageContent weddingEvents={weddingEvents} />
    </div>
  );
}
