import randomIntFromInterval from "@/functions/randomIntFromInterval";
import { getClassById } from "@/functions/classIdExists";

export default async function generateClassIdCode(): Promise<number> {
  const randomNum = randomIntFromInterval(100, 999);
  if (!(await getClassById(randomNum))) return randomNum;
  return generateClassIdCode();
}
