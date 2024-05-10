import prisma from "@/prisma/client";
export async function getUserClassSubjectPreference(userId: string) {
  return await prisma.classSubjectUserPreference.findMany({
    where: { userId: userId },
  });
}
