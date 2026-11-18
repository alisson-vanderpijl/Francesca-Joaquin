"use client";

import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/i18n/LanguageProvider";

type MapCTAProps = {
  googleMapsUrl: string;
};

export function MapCTA({ googleMapsUrl }: MapCTAProps) {
  const { t } = useLanguage();
  const copy = t.mapPage;
  const hasMapUrl = Boolean(googleMapsUrl);

  const handleDownload = () => {
    if (hasMapUrl) {
      window.open(googleMapsUrl, "_blank");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
      {hasMapUrl ? (
        <>
          <Button href={googleMapsUrl} external>
            {copy.openMaps}
          </Button>
          <Button variant="secondary" onClick={handleDownload}>
            {copy.downloadMap}
          </Button>
        </>
      ) : (
        <>
          <Button variant="secondary" disabled className="cursor-not-allowed opacity-50">
            {copy.openMaps}
          </Button>
          <Button variant="secondary" disabled className="cursor-not-allowed opacity-50">
            {copy.downloadMap}
          </Button>
          <p className="w-full text-center text-xs text-charcoal/50 sm:col-span-2">
            {copy.adminHint}
          </p>
        </>
      )}
    </div>
  );
}
