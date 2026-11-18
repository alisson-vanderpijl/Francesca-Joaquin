"use client";

import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { useSiteConfig } from "@/components/providers/ContentProvider";
import { useLanguage } from "@/i18n/LanguageProvider";
import { siteContainerClass } from "@/lib/layout-classes";

export function GiftRegistryContent() {
  const { t } = useLanguage();
  const siteConfig = useSiteConfig();

  return (
    <div
      className={`${siteContainerClass} flex min-h-[50vh] flex-col items-center justify-center py-20 text-center`}
    >
      <div className="flex max-w-xl flex-col items-center">
      <FadeIn>
        <h1 className="font-serif text-4xl text-charcoal md:text-5xl">
          {t.giftRegistry.title}
        </h1>
      </FadeIn>

      <FadeIn delay={100}>
        <p className="mt-8 text-sm leading-relaxed text-charcoal/70 md:text-base">
          {t.giftRegistry.description}
        </p>
      </FadeIn>

      <FadeIn delay={200}>
        <div className="mt-12">
          <Button href={siteConfig.GIFT_REGISTRY_URL} external>
            {t.giftRegistry.cta}
          </Button>
        </div>
        <p className="mt-4 text-xs text-charcoal/40">
          {t.giftRegistry.externalNote}
        </p>
      </FadeIn>
      </div>
    </div>
  );
}
