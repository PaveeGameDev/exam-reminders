import { Subject } from "@prisma/client";
import prisma from "@/prisma/client";

export async function getSubjectById(id: number): Promise<Subject | null> {
  return await prisma.subject.findUnique({ where: { id: id } });
}
