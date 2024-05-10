import prisma from "@/prisma/client";
export async function getSubjectsInClass(classId: number) {
  return await prisma.classSubjects.findMany({ where: { classId: classId } });
}
