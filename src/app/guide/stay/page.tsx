import { AccommodationFilters } from "@/components/guide/AccommodationFilters";
import { GuidePageHeader } from "@/components/guide/GuidePageHeader";
import { getHotelsContent } from "@/lib/content-store";
import { guidePageShellClass } from "@/lib/layout-classes";

export default async function StayPage() {
  const hotelsContent = await getHotelsContent();

  return (
    <div className={guidePageShellClass}>
      <GuidePageHeader pageId="stay" />
      <AccommodationFilters hotels={hotelsContent.hotels} />
    </div>
  );
}