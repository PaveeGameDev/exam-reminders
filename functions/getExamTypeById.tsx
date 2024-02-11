import { ExamType } from "@prisma/client";
import prisma from "@/prisma/client";

export const getExamTypeById = async (
  examTypeId: number,
): Promise<ExamType | null> => {
  return await prisma.examType.findUnique({
    where: { id: examTypeId },
  });
};
