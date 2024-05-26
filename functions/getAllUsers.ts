import prisma from "@/prisma/client";

export async function getAllUsers() {
  return await prisma.user.findMany();
}
