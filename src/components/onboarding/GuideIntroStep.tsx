"use client";

import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useSiteConfig } from "@/components/providers/ContentProvider";

type GuideIntroStepProps = {
  onEnter: () => void;
};

export function GuideIntroStep({ onEnter }: GuideIntroStepProps) {
  const { t } = useLanguage();
  const siteConfig = useSiteConfig();

  return (
    <div className="relative flex w-full flex-col items-center px-2 text-center md:px-4">
      <div className="mb-12 h-px w-12 bg-earth/40" aria-hidden="true" />

      <FadeIn className="w-full max-w-lg">
        <h2 className="font-serif text-3xl leading-snug text-charcoal md:text-4xl lg:text-[2.75rem] lg:leading-tight">
          {t.onboarding.guideIntroTitle}
        </h2>
      </FadeIn>

      <FadeIn delay={100} className="w-full max-w-lg">
        <p className="mt-10 text-base leading-[1.8] text-charcoal/70 md:text-lg md:leading-[1.85]">
          {t.onboarding.guideIntroMessage}
        </p>
        <p className="mt-6 text-base leading-[1.8] text-charcoal/70 md:text-lg md:leading-[1.85]">
          {t.onboarding.guideIntroMessageSecond}
        </p>
      </FadeIn>

      <FadeIn delay={200} className="w-full max-w-lg">
        <p className="mt-10 text-xs uppercase tracking-[0.3em] text-earth">
          {siteConfig.coupleNames}
        </p>
      </FadeIn>

      <FadeIn delay={300}>
        <div className="mt-16 h-px w-8 bg-charcoal/10" aria-hidden="true" />
      </FadeIn>

      <FadeIn delay={400}>
        <Button onClick={onEnter} className="mt-12 w-full sm:w-auto sm:min-w-[220px]">
          {t.onboarding.guideIntroCta}
        </Button>
      </FadeIn>
    </div>
  );
}
