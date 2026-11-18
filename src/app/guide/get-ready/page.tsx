import { GetReadyPlacesGrid } from "@/components/guide/GetReadyPlacesGrid";
import { GuidePageHeader } from "@/components/guide/GuidePageHeader";
import { getGetReadyPlaces } from "@/lib/content-store";
import { guidePageShellClass } from "@/lib/layout-classes";

export default async function GetReadyPage() {
  const getReadyPlaces = await getGetReadyPlaces();

  return (
    <div className={guidePageShellClass}>
      <GuidePageHeader pageId="getReady" />
      <GetReadyPlacesGrid places={getReadyPlaces} />
    </div>
  );
}