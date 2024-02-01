"use server";

import { joinClassSchema, writeExamSchema } from "@/app/actions/actionsSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";

export async function joinClass(formData: FormData) {
  const { classId } = joinClassSchema.parse({
    classId: formData.get("classId"),
  });

  const session = await getServerSession(authOptions);
  if (!session) return "Login to continue";
  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! },
  });
  if (!user) return "An error occurred";

  const classExists = await prisma.class.findUnique({
    where: { id: Number(classId) },
  });
  if (!classExists) {
    console.error(`Class with ID ${classId} does not exist.`);
    return "Class does not exist.";
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { classId: Number(classId) },
  });

  revalidatePath("/settings");

  console.log(updatedUser);
}

export async function writeExam(formData: FormData) {
  const { date, content, subjectId } = writeExamSchema.parse({
    content: formData.get("content"),
    date: formData.get("date"),
    subjectId: formData.get("subjectId"),
  });

  const session = await getServerSession(authOptions);
  if (!session) return "Login to continue";
  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! },
  });
  if (!user) return "An error occurred";
  if (!user.classId) return "No class id";

  const createdExam = await prisma.exam.create({
    data: {
      classId: user.classId,
      date: date,
      content: content,
      subjectId: subjectId,
      dateCreated: new Date(),
    },
  });

  revalidatePath("/write");

  console.log(createdExam);
}
