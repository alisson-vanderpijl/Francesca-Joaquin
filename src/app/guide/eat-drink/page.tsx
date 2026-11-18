import { GuidePageHeader } from "@/components/guide/GuidePageHeader";
import { RestaurantFilters } from "@/components/guide/RestaurantFilters";
import { getRestaurantsContent } from "@/lib/content-store";
import { guidePageShellClass } from "@/lib/layout-classes";

export default async function EatDrinkPage() {
  const restaurantsContent = await getRestaurantsContent();

  return (
    <div className={guidePageShellClass}>
      <GuidePageHeader pageId="eatDrink" />
      <RestaurantFilters {...restaurantsContent} />
    </div>
  );
}