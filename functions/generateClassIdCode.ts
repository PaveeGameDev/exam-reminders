import randomIntFromInterval from "@/functions/randomIntFromInterval";
import { classIdExists } from "@/functions/classIdExists";

export default async function generateClassIdCode(): Promise<number> {
  const randomNum = randomIntFromInterval(100, 999);
  if (!(await classIdExists(randomNum))) return randomNum;
  return generateClassIdCode();
}
