import { Language } from "@/app/types/types";
export const translateMonth = (
  monthInt: number,
  language: Language,
): string | null => {
  if (monthInt < 0 || monthInt > 11) return null;

  const czechTranslate = {
    0: "Leden",
    1: "Únor",
    2: "Březen",
    3: "Duben",
    4: "Květen",
    5: "Červen",
    6: "Červenec",
    7: "Srpen",
    8: "Září",
    9: "Říjen",
    10: "Listopad",
    11: "Prosinec",
  };

  const englishTranslate = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };

  if (language === "cs-CZ") {
    // @ts-ignore
    return czechTranslate[monthInt];
  }
  if (language === "en") {
    // @ts-ignore
    return englishTranslate[monthInt];
  }
  return null;
};
