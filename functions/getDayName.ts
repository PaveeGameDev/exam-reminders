export function getDayName(date: Date, locale: string = "cs-CZ"): string {
  return date.toLocaleDateString(locale, { weekday: "long" });
}
