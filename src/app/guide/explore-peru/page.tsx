import { ExplorePeruPlacesGrid } from "@/components/guide/ExplorePeruPlacesGrid";
import { ExplorePeruTravelAgencies } from "@/components/guide/ExplorePeruTravelAgencies";
import { GuidePageHeader } from "@/components/guide/GuidePageHeader";
import { getExplorePeruPlaces, getTravelAgencies } from "@/lib/content-store";
import { guidePageShellClass } from "@/lib/layout-classes";

export default async function ExplorePeruPage() {
  const [explorePeruPlaces, travelAgencies] = await Promise.all([
    getExplorePeruPlaces(),
    getTravelAgencies(),
  ]);

  return (
    <div className={guidePageShellClass}>
      <GuidePageHeader pageId="explorePeru" />
      <ExplorePeruPlacesGrid places={explorePeruPlaces} />
      <ExplorePeruTravelAgencies agencies={travelAgencies} />
    </div>
  );
}