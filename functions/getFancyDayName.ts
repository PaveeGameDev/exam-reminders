import { getDayName } from "@/functions/getDayName";

export function getFancyDayName(date: Date, locale: string): string {
  const currentDate = new Date();
  const comparedDate = new Date(date);
  if (
    currentDate.getDate() === comparedDate.getDate() &&
    currentDate.getMonth() === comparedDate.getMonth() &&
    currentDate.getFullYear() === comparedDate.getFullYear()
  ) {
    return "Dnes";
  } else if (
    currentDate.getDate() + 1 === comparedDate.getDate() &&
    currentDate.getMonth() === comparedDate.getMonth() &&
    currentDate.getFullYear() === comparedDate.getFullYear()
  ) {
    return "Zítra";
  } else {
    return getDayName(date, locale);
  }
}
