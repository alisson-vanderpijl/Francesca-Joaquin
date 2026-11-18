"use client";

import Image from "next/image";
import { GuideIcon, guideCardIconClass } from "@/components/guide/GuideIcons";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { useSiteConfig } from "@/components/providers/ContentProvider";
import { useLanguage } from "@/i18n/LanguageProvider";
import { guidePageShellClass } from "@/lib/layout-classes";

export function GiftRegistryContent() {
  const { t } = useLanguage();
  const siteConfig = useSiteConfig();

  return (
    <div className={guidePageShellClass}>
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <FadeIn>
          <div className="relative aspect-[5/6] w-full overflow-hidden border border-charcoal/10">
            <Image
              src="/Images/gift-registry.jpg"
              alt={t.giftRegistry.title}
              fill
              unoptimized
              className="object-cover object-[center_30%]"
              sizes="(max-width: 1024px) 100vw, 576px"
            />
          </div>
        </FadeIn>

        <div className="text-center lg:text-left">
          <FadeIn delay={80}>
            <div className="flex flex-col items-center lg:items-start">
              <GuideIcon
                id="giftRegistry"
                className={`${guideCardIconClass} h-8 w-8`}
              />
              <h1 className="mt-4 font-serif text-4xl text-charcoal md:text-5xl">
                {t.giftRegistry.title}
              </h1>
            </div>
          </FadeIn>

          <FadeIn delay={120}>
            <p className="mt-8 text-sm leading-relaxed text-charcoal/70 md:text-base">
              {t.giftRegistry.description}
            </p>
          </FadeIn>

          <FadeIn delay={160}>
            <div className="mt-12 flex flex-col items-center lg:items-start">
              <Button href={siteConfig.GIFT_REGISTRY_URL} external>
                {t.giftRegistry.cta}
              </Button>
              <p className="mt-4 text-xs text-charcoal/40">
                {t.giftRegistry.externalNote}
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}