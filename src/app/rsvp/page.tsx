"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { GuideIntroStep } from "@/components/onboarding/GuideIntroStep";
import { InvitationShell } from "@/components/invitation/InvitationShell";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useSiteConfig } from "@/components/providers/ContentProvider";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { RSVPForm } from "@/components/rsvp/RSVPForm";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { AttendanceStatus } from "@/types";

type RsvpStep = "form" | "guide-intro" | "confirmed";

export default function RSVPPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const siteConfig = useSiteConfig();
  const r = t.rsvp;
  const [step, setStep] = useState<RsvpStep>("form");

  const handleRsvpSuccess = (attendance: AttendanceStatus) => {
    setStep(attendance === "attending" ? "guide-intro" : "confirmed");
  };

  if (step === "guide-intro") {
    return (
      <InvitationShell languageSwitcher={<LanguageSwitcher />}>
        <GuideIntroStep onEnter={() => router.push("/guide")} />
      </InvitationShell>
    );
  }

  if (step === "confirmed") {
    return (
      <InvitationShell languageSwitcher={<LanguageSwitcher />}>
        <div className="text-center">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.3em] text-earth">
              {r.confirmed.label}
            </p>
            <h1 className="mt-6 font-serif text-3xl text-charcoal md:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {r.confirmed.notAttendingTitle}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-charcoal/70">
              {r.confirmed.notAttendingMessage}
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                href={siteConfig.GUEST_MESSAGE_URL}
                external
                variant="secondary"
                className="w-full bg-invitation-surface sm:w-auto sm:min-w-[220px] hover:border-charcoal/40 hover:bg-charcoal/[0.03]"
              >
                {r.confirmed.leaveMessage}
              </Button>
              <Button
                href="/guide/gift-registry"
                className="w-full sm:w-auto sm:min-w-[220px]"
              >
                {t.giftRegistry.cta}
              </Button>
            </div>
          </FadeIn>
        </div>
      </InvitationShell>
    );
  }

  return (
    <InvitationShell languageSwitcher={<LanguageSwitcher />} align="top">
      <FadeIn>
        <Link
          href="/"
          className="text-xs uppercase tracking-widest text-charcoal/40 transition-colors hover:text-charcoal"
        >
          {r.back}
        </Link>
      </FadeIn>

      <div className="mt-8 text-center">
        <FadeIn delay={100}>
          <header className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-earth">{r.label}</p>
            <h1 className="mt-4 font-serif text-4xl text-charcoal md:text-5xl">
              {r.title}
            </h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-charcoal/70">
              {r.intro}
            </p>
          </header>
        </FadeIn>

        <FadeIn delay={200}>
          <RSVPForm onSuccess={handleRsvpSuccess} />
        </FadeIn>
      </div>
    </InvitationShell>
  );
}
