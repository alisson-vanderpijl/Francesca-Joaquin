"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import type { SiteConfig } from "@/lib/content-types";
import type { NavGroup } from "@/types";
import { ContentProvider } from "./ContentProvider";

type ProvidersProps = {
  children: ReactNode;
  siteConfig: SiteConfig;
  navGroups: NavGroup[];
  translationOverrides?: {
    es: Record<string, unknown>;
    en: Record<string, unknown>;
  };
};

export function Providers({
  children,
  siteConfig,
  navGroups,
  translationOverrides,
}: ProvidersProps) {
  return (
    <ContentProvider siteConfig={siteConfig} navGroups={navGroups}>
      <LanguageProvider translationOverrides={translationOverrides}>
        {children}
      </LanguageProvider>
    </ContentProvider>
  );
}
