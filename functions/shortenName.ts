export function shortenName(name: string | null | undefined) {
  if (!name) return "Anonym"; // Fallback if name is missing

  const names = name.split(" ");
  if (names.length > 1) {
    return names[0] + " " + names[names.length - 1][0] + ".";
  }
  return names[0];
}