"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import type { Locale } from "@/i18n/types";

type LanguageSwitcherProps = {
  className?: string;
};

export function LanguageSwitcher({ className = "" }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();

  const options: { value: Locale; label: string }[] = [
    { value: "es", label: "ES" },
    { value: "en", label: "EN" },
  ];

  return (
    <div
      className={`flex items-center gap-1 text-xs uppercase tracking-widest ${className}`}
      role="group"
      aria-label="Language selector"
    >
      {options.map((option, index) => (
        <span key={option.value} className="flex items-center gap-1">
          {index > 0 && (
            <span className="text-charcoal/20" aria-hidden="true">
              |
            </span>
          )}
          <button
            type="button"
            onClick={() => setLocale(option.value)}
            className={`px-1 py-0.5 transition-colors duration-200 ${
              locale === option.value
                ? "text-charcoal"
                : "text-charcoal/40 hover:text-charcoal/70"
            }`}
            aria-pressed={locale === option.value}
          >
            {option.label}
          </button>
        </span>
      ))}
    </div>
  );
}
