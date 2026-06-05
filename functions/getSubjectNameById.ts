import prisma from "@/prisma/client";

export const getSubjectNameById = async (
    subjectId: number,
): Promise<string> => {
  const subject = await prisma.classSubjects.findUnique({
    where: { id: subjectId },
    select: { name: true },
  });
  return subject?.name ?? "";
};