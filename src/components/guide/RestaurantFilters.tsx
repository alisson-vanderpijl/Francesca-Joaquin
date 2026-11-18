"use client";

import { useMemo, useState } from "react";
import { RestaurantCard } from "@/components/cards/RestaurantCard";
import { Filter } from "@/components/ui/Filter";
import { FadeIn } from "@/components/ui/FadeIn";
import { useLanguage } from "@/i18n/LanguageProvider";
import { withLocaleOverride } from "@/lib/localize-item";
import type { RestaurantsContent } from "@/lib/content-types";

type RestaurantFiltersProps = RestaurantsContent;

export function RestaurantFilters({
  restaurants,
  restaurantDistricts,
  cuisineTypes,
  ambianceTypes,
}: RestaurantFiltersProps) {
  const { locale, t } = useLanguage();
  const filters = t.eatDrinkPage.filters;
  const tagLabels = t.eatDrinkPage.tagLabels as Record<string, string>;
  const restaurantOverrides = t.eatDrinkPage.restaurantOverrides as Record<
    string,
    { description?: string }
  >;

  const formatOption = (value: string) =>
    value === "Todos" ? filters.all : tagLabels[value] ?? value;
  const [district, setDistrict] = useState("Todos");
  const [cuisine, setCuisine] = useState("Todos");
  const [ambiance, setAmbiance] = useState("Todos");
  const [quickTag, setQuickTag] = useState<string | null>(null);

  const quickTags = useMemo(() => {
    const options = [
      ...cuisineTypes.filter((o) => o !== "Todos"),
      ...ambianceTypes.filter(
        (o) => o !== "Todos" && o !== "Casual" && o !== "Romántico"
      ),
    ];
    return [...new Set(options)];
  }, [cuisineTypes, ambianceTypes]);

  const filtered = useMemo(() => {
    return restaurants.filter((r) => {
      const matchDistrict = district === "Todos" || r.district === district;
      if (quickTag) {
        return (
          matchDistrict &&
          (r.cuisineType === quickTag || r.ambiance === quickTag)
        );
      }
      const matchCuisine = cuisine === "Todos" || r.cuisineType === cuisine;
      const matchAmbiance = ambiance === "Todos" || r.ambiance === ambiance;
      return matchDistrict && matchCuisine && matchAmbiance;
    });
  }, [district, cuisine, ambiance, quickTag, restaurants]);

  function clearQuickTag() {
    setQuickTag(null);
  }

  function handleDistrictChange(value: string) {
    setDistrict(value);
  }

  function handleCuisineChange(value: string) {
    clearQuickTag();
    setCuisine(value);
  }

  function handleAmbianceChange(value: string) {
    clearQuickTag();
    setAmbiance(value);
  }

  function toggleQuickTag(tag: string) {
    if (quickTag === tag) {
      setQuickTag(null);
      return;
    }
    setCuisine("Todos");
    setAmbiance("Todos");
    setQuickTag(tag);
  }

  return (
    <>
      <FadeIn>
        <div className="mb-8 grid grid-cols-1 gap-6 border border-charcoal/10 bg-sand/20 p-6 md:grid-cols-3 md:p-8">
          <Filter
            label={filters.district}
            options={restaurantDistricts}
            value={district}
            onChange={handleDistrictChange}
            formatOption={formatOption}
          />
          <Filter
            label={filters.cuisine}
            options={cuisineTypes}
            value={cuisine}
            onChange={handleCuisineChange}
            formatOption={formatOption}
          />
          <Filter
            label={filters.ambiance}
            options={ambianceTypes}
            value={ambiance}
            onChange={handleAmbianceChange}
            formatOption={formatOption}
          />
        </div>
      </FadeIn>

      {quickTags.length > 0 && (
        <FadeIn delay={40}>
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-charcoal/45">
              {filters.quickFilters}
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5 sm:gap-3">
              {quickTags.map((tag) => {
                const selected = quickTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleQuickTag(tag)}
                    className={`border px-4 py-2 text-sm transition-colors ${
                      selected
                        ? "border-charcoal bg-charcoal text-ivory"
                        : "border-charcoal/15 bg-ivory text-charcoal/70 hover:border-charcoal/40"
                    }`}
                  >
                    {formatOption(tag)}
                  </button>
                );
              })}
            </div>
          </div>
        </FadeIn>
      )}

      <p className="mb-8 text-sm text-charcoal/50">
        {filtered.length}{" "}
        {filtered.length === 1 ? filters.foundOne : filters.foundMany}
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((restaurant, index) => {
          const item = withLocaleOverride(restaurant, locale, restaurantOverrides);
          return (
            <FadeIn key={restaurant.id} delay={index * 80} className="h-full">
              <RestaurantCard restaurant={item} />
            </FadeIn>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-charcoal/50">{filters.empty}</p>
      )}
    </>
  );
}
