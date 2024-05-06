import prisma from "@/prisma/client";
export async function classIdExists(classId: number) {
  return await prisma.class.findUnique({ where: { id: classId } });
}
