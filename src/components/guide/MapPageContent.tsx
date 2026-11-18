"use client";

import { MapCTA } from "@/components/map/MapCTA";
import { GuidePageHeader } from "@/components/guide/GuidePageHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { useLanguage } from "@/i18n/LanguageProvider";
import { guidePageShellClass } from "@/lib/layout-classes";

type MapPageContentProps = {
  googleMapsUrl: string;
};

export function MapPageContent({ googleMapsUrl }: MapPageContentProps) {
  const { t } = useLanguage();

  return (
    <div className={guidePageShellClass}>
      <GuidePageHeader pageId="map" />

      <FadeIn>
        <ImagePlaceholder
          label={t.mapPage.placeholderLabel}
          aspectRatio="wide"
          className="mb-12"
        />
      </FadeIn>

      <FadeIn delay={100}>
        <MapCTA googleMapsUrl={googleMapsUrl} />
      </FadeIn>
    </div>
  );
}