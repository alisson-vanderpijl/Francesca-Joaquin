import type { ReactNode } from "react";

const BOLD_SEGMENT = /(\*\*[^*]+\*\*)/g;

function isPhoneLike(value: string): boolean {
  const trimmed = value.trim();
  return /^\+?[\d\s()-]{8,}$/.test(trimmed) && /\d/.test(trimmed);
}

function whatsAppHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}

export function renderInlineBold(text: string): ReactNode[] {
  return text.split(BOLD_SEGMENT).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const inner = part.slice(2, -2);
      if (isPhoneLike(inner)) {
        return (
          <a
            key={index}
            href={whatsAppHref(inner)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-charcoal/90 underline decoration-charcoal/30 underline-offset-2 transition-colors hover:text-charcoal hover:decoration-charcoal/60"
          >
            {inner}
          </a>
        );
      }
      return (
        <span key={index} className="font-semibold text-charcoal/90">
          {inner}
        </span>
      );
    }
    return part;
  });
}