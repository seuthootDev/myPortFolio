import type { Locale } from "./locales";

type Period = { start: Date; end?: Date | null };

// Month precision, read in UTC: periods are authored as `YYYY-MM`, which
// parses to midnight UTC on the 1st, so local time zones must not shift it.
function formatMonth(date: Date, locale: Locale) {
  if (locale === "ko") {
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    return `${date.getUTCFullYear()}.${month}`;
  }
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(date);
}

/** e.g. `Aug 2023 – Oct 2025` (en), `2023.08 – 2025.10` (ko). */
export function formatPeriod(
  { start, end }: Period,
  locale: Locale,
  presentLabel: string
) {
  return `${formatMonth(start, locale)} – ${end ? formatMonth(end, locale) : presentLabel}`;
}
