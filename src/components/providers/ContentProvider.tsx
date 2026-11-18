"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SiteConfig } from "@/lib/content-types";
import type { NavGroup } from "@/types";

type ContentContextValue = {
  siteConfig: SiteConfig;
  navGroups: NavGroup[];
};

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({
  siteConfig,
  navGroups,
  children,
}: ContentContextValue & { children: ReactNode }) {
  return (
    <ContentContext.Provider value={{ siteConfig, navGroups }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useSiteConfig(): SiteConfig {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useSiteConfig must be used within ContentProvider");
  }
  return context.siteConfig;
}

export function useNavGroups(): NavGroup[] {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useNavGroups must be used within ContentProvider");
  }
  return context.navGroups;
}
