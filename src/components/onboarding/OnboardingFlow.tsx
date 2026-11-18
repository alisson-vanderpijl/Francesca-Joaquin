"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { InvitationShell } from "@/components/invitation/InvitationShell";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useSiteConfig } from "@/components/providers/ContentProvider";
import type { Locale } from "@/i18n/types";

type OnboardingStep = "language" | "rsvp-status";

export function OnboardingFlow() {
  const router = useRouter();
  const { setLocale } = useLanguage();
  const [step, setStep] = useState<OnboardingStep>("language");
  const [transitioning, setTransitioning] = useState(false);

  const goToStep = (next: OnboardingStep) => {
    setTransitioning(true);
    setTimeout(() => {
      setStep(next);
      setTransitioning(false);
    }, 300);
  };

  const handleLanguageSelect = (locale: Locale) => {
    setLocale(locale);
    goToStep("rsvp-status");
  };

  const showLanguageSwitcher = step === "rsvp-status";

  return (
    <InvitationShell
      languageSwitcher={showLanguageSwitcher ? <LanguageSwitcher /> : undefined}
    >
      <div
        className={`w-full text-center transition-all duration-500 ease-out ${
          transitioning ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        {step === "language" && (
          <LanguageStep onSelect={handleLanguageSelect} />
        )}
        {step === "rsvp-status" && (
          <RsvpStatusStep
            onYes={() => router.push("/guide")}
            onNo={() => router.push("/rsvp")}
          />
        )}
      </div>
    </InvitationShell>
  );
}

const languageButtonClass =
  "group inline-flex w-full items-center justify-center gap-2 border border-charcoal/20 bg-invitation-surface px-8 py-3.5 text-sm tracking-wide text-charcoal transition-all duration-300 ease-out min-h-[48px] hover:border-charcoal/40 hover:bg-charcoal/[0.03]";

function LanguageStep({ onSelect }: { onSelect: (locale: Locale) => void }) {
  const { t } = useLanguage();
  const siteConfig = useSiteConfig();

  return (
    <>
      <FadeIn>
        <Image
          src="/Images/LogoFJ.png"
          alt={siteConfig.coupleNames}
          width={80}
          height={80}
          className="mx-auto mb-6 h-auto w-14 sm:w-16"
          priority
        />
        <p className="text-xs uppercase tracking-[0.35em] text-earth">
          {siteConfig.weddingDate}
        </p>
        <h1 className="mt-6 whitespace-nowrap font-serif text-[2.5rem] leading-tight text-charcoal md:text-[3rem] lg:text-[3.5rem]">
          {siteConfig.coupleNames}
        </h1>
      </FadeIn>

      <FadeIn delay={150}>
        <div className="mx-auto mt-12 flex w-full max-w-md flex-col gap-4">
          <button
            type="button"
            onClick={() => onSelect("es")}
            className={languageButtonClass}
          >
            <span>{t.onboarding.continueInSpanish}</span>
            <span
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </button>
          <button
            type="button"
            onClick={() => onSelect("en")}
            className={languageButtonClass}
          >
            <span>{t.onboarding.continueInEnglish}</span>
            <span
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </button>
        </div>
      </FadeIn>
    </>
  );
}

function RsvpStatusStep({
  onYes,
  onNo,
}: {
  onYes: () => void;
  onNo: () => void;
}) {
  const { t } = useLanguage();

  return (
    <>
      <FadeIn>
        <p className="text-xs uppercase tracking-[0.3em] text-earth">
          {t.rsvp.label}
        </p>
        <p className="mt-4 font-serif text-2xl text-charcoal md:text-3xl lg:text-4xl">
          {t.onboarding.rsvpStatusQuestion}
        </p>
      </FadeIn>

      <FadeIn delay={100}>
        <div className="mt-10 flex w-full flex-col gap-4 sm:flex-row sm:justify-center">
          <Button
            onClick={onYes}
            variant="secondary"
            className="w-full bg-invitation-surface sm:w-auto sm:min-w-[220px] hover:border-charcoal/40 hover:bg-charcoal/[0.03]"
          >
            {t.onboarding.rsvpYes}
          </Button>
          <Button
            onClick={onNo}
            variant="secondary"
            className="w-full bg-invitation-surface sm:w-auto sm:min-w-[220px] hover:border-charcoal/40 hover:bg-charcoal/[0.03]"
          >
            {t.onboarding.rsvpNo}
          </Button>
        </div>
      </FadeIn>
    </>
  );
}

