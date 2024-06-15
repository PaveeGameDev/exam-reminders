import prisma from "@/prisma/client";
export async function getClassById(classId: number) {
  return await prisma.class.findUnique({ where: { id: classId } });
}
