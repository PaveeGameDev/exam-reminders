"use server";
import prisma from "@/prisma/client";
export async function writeTokenToDatabase(token: string, userId: string) {
  return await prisma.user.update({
    where: { id: userId },
    data: { notificationToken: token },
  });
}
