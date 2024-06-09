export const shiftMonth = (
  monthInt: number,
  shiftCoefficient: number,
): number => {
  return (monthInt + shiftCoefficient) % 12;
};
