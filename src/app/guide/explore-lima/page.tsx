import { ExploreLimaPlacesGrid } from "@/components/guide/ExploreLimaPlacesGrid";
import { ExploreLimaShoppingSection } from "@/components/guide/ExploreLimaShoppingSection";
import { GuidePageHeader } from "@/components/guide/GuidePageHeader";
import { getExploreLimaPlaces } from "@/lib/content-store";
import { guidePageShellClass } from "@/lib/layout-classes";

export default async function ExploreLimaPage() {
  const exploreLimaPlaces = await getExploreLimaPlaces();

  return (
    <div className={guidePageShellClass}>
      <GuidePageHeader pageId="exploreLima" />
      <ExploreLimaPlacesGrid places={exploreLimaPlaces} />
      <ExploreLimaShoppingSection />
    </div>
  );
}