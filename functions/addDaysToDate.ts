export function addDaysToDate(date: string, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
