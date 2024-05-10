import prisma from "@/prisma/client";

export const getSubjectNameById = async (
  subjectId: number,
): Promise<string> => {
  const subjects = await prisma.classSubjects.findMany({ where: {} });
  const subject = subjects.find((subject) => subject.id === subjectId);
  if (subject) return subject.name;
  return "";
};
