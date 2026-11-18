"use client";

import { PageHeader } from "@/components/guide/PageHeader";
import { useLanguage } from "@/i18n/LanguageProvider";

export type GuidePageHeaderId =
  | "stay"
  | "eatDrink"
  | "getReady"
  | "health"
  | "practicalInfo"
  | "exploreLima"
  | "explorePeru"
  | "map";

type GuidePageHeaderProps = {
  pageId: GuidePageHeaderId;
  subtitle?: string;
};

export function GuidePageHeader({ pageId, subtitle }: GuidePageHeaderProps) {
  const { t } = useLanguage();
  const header = t.pageHeaders[pageId];

  return (
    <PageHeader
      title={header.title}
      subtitle={subtitle ?? header.subtitle}
    />
  );
}