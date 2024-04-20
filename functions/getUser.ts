import prisma from "@/prisma/client";

export async function getUser(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
}
