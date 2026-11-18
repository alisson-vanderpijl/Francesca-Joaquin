"use client";

import { GuideNavigation } from "@/components/layout/GuideNavigation";

type NavMenuProps = {
  onNavigate?: () => void;
};

export function NavMenu({ onNavigate }: NavMenuProps) {
  return (
    <div className="px-6 py-6 lg:px-10 lg:py-8">
      <GuideNavigation onNavigate={onNavigate} variant="menu" />
    </div>
  );
}
