"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { useLanguage } from "@/i18n/LanguageProvider";

const iconClass = "h-7 w-7 shrink-0 stroke-earth/85";

function PracticalInfoIcon({ id }: { id: string }) {
  switch (id) {
    case "currency":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={iconClass} aria-hidden="true">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8c-2 0-3 .75-3 2s1.5 2 3 2 3 .75 3 2-1 2-3 2" />
          <path d="M12 6v2M12 16v2" />
        </svg>
      );
    case "tipping":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={iconClass} aria-hidden="true">
          <rect x="3" y="6" width="14" height="9" rx="1" />
          <path d="M5 9h10M5 12h6" />
          <rect x="7" y="9" width="12" height="9" rx="1" />
          <path d="M9 12h8M9 15h5" />
        </svg>
      );
    case "water":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={iconClass} aria-hidden="true">
          <path d="M12 3c4 6 6 9.5 6 13a6 6 0 0 1-12 0c0-3.5 2-7 6-13z" />
        </svg>
      );
    case "food":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={iconClass} aria-hidden="true">
          <path d="M6 3v8a3 3 0 0 0 6 0V3M9 11v10M18 3v18" />
        </svg>
      );
    case "electricity":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={iconClass} aria-hidden="true">
          <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
        </svg>
      );
    case "weather":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={iconClass} aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      );
    case "getting-around":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={iconClass} aria-hidden="true">
          <path d="M5 15h14l-1.5-5.5a2 2 0 0 0-1.9-1.5H8.4a2 2 0 0 0-1.9 1.5L5 15z" />
          <path d="M5 15v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h8v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2" />
          <circle cx="8" cy="17" r="1.25" />
          <circle cx="16" cy="17" r="1.25" />
          <path d="M7 10h4M13 10h4" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={iconClass} aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 10v6M12 7h.01" />
        </svg>
      );
  }
}

export function PracticalInfoContent() {
  const { t } = useLanguage();
  const section = t.practicalInfoPage;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {section.topics.map((topic, index) => (
        <FadeIn
          key={topic.id}
          delay={index * 60}
          className={`h-full ${topic.id === "weather" ? "md:col-span-2" : ""}`}
        >
          <article className="h-full border border-charcoal/10 bg-ivory p-6 md:p-8">
            <div className="flex items-center gap-3">
              <PracticalInfoIcon id={topic.id} />
              <h2 className="font-serif text-xl text-charcoal md:text-2xl">{topic.title}</h2>
            </div>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-charcoal/70">
              {topic.body}
            </p>
          </article>
        </FadeIn>
      ))}
    </div>
  );
}