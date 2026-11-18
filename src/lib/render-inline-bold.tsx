import type { ReactNode } from "react";

const BOLD_SEGMENT = /(\*\*[^*]+\*\*)/g;

export function renderInlineBold(text: string): ReactNode[] {
  return text.split(BOLD_SEGMENT).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <span key={index} className="font-semibold text-charcoal/90">
          {part.slice(2, -2)}
        </span>
      );
    }
    return part;
  });
}