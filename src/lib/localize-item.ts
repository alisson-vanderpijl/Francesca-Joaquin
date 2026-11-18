import type { Locale } from "@/i18n/types";

export function withLocaleOverride<T extends { id: string }>(
  item: T,
  locale: Locale,
  overrides?: Record<string, Partial<T>>,
): T {
  if (locale !== "en" || !overrides) return item;
  const patch = overrides[item.id];
  return patch ? { ...item, ...patch } : item;
}