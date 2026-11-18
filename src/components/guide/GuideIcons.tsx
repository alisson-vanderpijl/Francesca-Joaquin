import type { NavItemId } from "@/types";

export type GuideIconId = NavItemId | "bus" | "taxi";

export const guideCardIconClass = "h-7 w-7 stroke-earth/80";

const iconClass = "h-6 w-6 stroke-charcoal/70";

export function GuideIcon({
  id,
  className = iconClass,
}: {
  id: GuideIconId;
  className?: string;
}) {
  switch (id) {
    case "itinerary":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="1" />
          <path d="M3 10h18M8 2v4M16 2v4" />
        </svg>
      );
    case "wedding":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <path d="M12 21c-4-3-7-6-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4-3 7-7 10z" />
        </svg>
      );
    case "giftRegistry":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <rect x="3" y="8" width="18" height="13" rx="1" />
          <path d="M12 8v13M3 12h18M7 8c0-2 1-4 5-4s5 2 5 4" />
        </svg>
      );
    case "stay":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10z" />
        </svg>
      );
    case "eatDrink":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <path d="M6 3v8a4 4 0 0 0 8 0V3M10 11v10M6 21h8" />
          <path d="M18 3v18" />
        </svg>
      );
    case "getReady":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <path d="M10.5 2.5h3l.75 2.5h-4.5l.75-2.5z" strokeLinejoin="round" />
          <path d="M10 5.5h4v11.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V5.5z" />
          <path d="M10.5 17.5h3V21h-3v-3.5z" strokeLinejoin="round" />
          <path d="M17.5 7.5l-1.2 10.5" strokeLinecap="round" />
          <path
            d="M17.8 6.2c1.4.7 2.2 2.2 2 3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "health":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <path d="M12 6v12M6 12h12" />
          <rect x="4" y="4" width="16" height="16" rx="3" />
        </svg>
      );
    case "practicalInfo":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 10v6M12 7h.01" />
        </svg>
      );
    case "exploreLima":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
          <circle cx="12" cy="10" r="2" />
        </svg>
      );
    case "explorePeru":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="8.25" />
          <path d="M12 4.25v2M12 17.75v2M4.25 12h2M17.75 12h2" strokeLinecap="round" />
          <path
            d="M12 6.75 14.75 12 12 13.25 9.25 12 12 6.75z"
            strokeLinejoin="round"
          />
          <path
            d="M12 17.25 9.25 12 12 10.75 14.75 12 12 17.25z"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "map":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <path d="M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2-6-2z" />
          <path d="M9 4v14M15 6v14" />
        </svg>
      );
    case "bus":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <path d="M5 9h14a1 1 0 0 1 1 1v5H4v-5a1 1 0 0 1 1-1z" />
          <path d="M4 13h16" />
          <path d="M8 9V7h8v2" />
          <circle cx="7.5" cy="17" r="1.5" />
          <circle cx="16.5" cy="17" r="1.5" />
        </svg>
      );
    case "taxi":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <path d="M5 15h14" />
          <path d="M7 15l2-6h6l2 6" />
          <path d="M10 5h4v2h-4z" />
          <circle cx="7.5" cy="17" r="1.5" />
          <circle cx="16.5" cy="17" r="1.5" />
        </svg>
      );
    default:
      return null;
  }
}
