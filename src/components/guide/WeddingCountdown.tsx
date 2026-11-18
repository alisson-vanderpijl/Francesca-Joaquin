"use client";

import { useEffect, useMemo, useState } from "react";
import { useSiteConfig } from "@/components/providers/ContentProvider";
import { useLanguage } from "@/i18n/LanguageProvider";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(targetMs: number): TimeLeft | null {
  const diff = targetMs - Date.now();
  if (diff <= 0) return null;
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export function WeddingCountdown() {
  const siteConfig = useSiteConfig();
  const { t } = useLanguage();
  const c = t.guide.landing.countdown;

  const countdownAt =
    siteConfig.weddingCountdownAt ?? "2027-04-24T16:00:00-05:00";

  const targetMs = useMemo(
    () => new Date(countdownAt).getTime(),
    [countdownAt],
  );

  const [left, setLeft] = useState<TimeLeft | null>(() =>
    Number.isNaN(targetMs) ? null : getTimeLeft(targetMs),
  );

  useEffect(() => {
    if (Number.isNaN(targetMs)) return;
    const tick = () => setLeft(getTimeLeft(targetMs));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [targetMs]);

  if (Number.isNaN(targetMs)) return null;

  return (
    <div className="pointer-events-auto inline-block w-full max-w-[min(100%,22rem)] border border-charcoal/20 bg-ivory/92 px-5 py-4 shadow-sm backdrop-blur-sm sm:max-w-[28rem] sm:px-7 sm:py-5">
      <p className="text-xs uppercase tracking-[0.35em] text-earth">{c.label}</p>
      {left ? (
        <dl className="mt-3 grid grid-cols-4 gap-2 text-center sm:mt-4 sm:gap-4">
          {(
            [
              { key: "days" as const, value: left.days },
              { key: "hours" as const, value: left.hours },
              { key: "minutes" as const, value: left.minutes },
              { key: "seconds" as const, value: left.seconds },
            ] as const
          ).map(({ key, value }) => (
            <div key={key}>
              <dd className="font-serif text-2xl text-charcoal tabular-nums sm:text-3xl md:text-4xl">
                {key === "days" ? value : String(value).padStart(2, "0")}
              </dd>
              <dt className="mt-1 text-[10px] uppercase tracking-wider text-charcoal/50 sm:text-xs">
                {c[key]}
              </dt>
            </div>
          ))}
        </dl>
      ) : (
        <p className="mt-3 font-serif text-xl text-charcoal sm:mt-4 sm:text-2xl">{c.today}</p>
      )}
    </div>
  );
}