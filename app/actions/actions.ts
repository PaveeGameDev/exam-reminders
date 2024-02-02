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
  if (!session) return { error: "Login to continue" };
  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! },
  });
  if (!user) return { error: "No user" };

  const classExists = await prisma.class.findUnique({
    where: { id: Number(classId) },
  });
  if (!classExists) {
    return { error: `Class with ID ${classId} does not exist.` };
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { classId: Number(classId) },
  });

  revalidatePath("/settings");

  return { success: "Class successfully joined" };
}

export async function writeExam(formData: FormData) {
  const { date, content, subjectId } = writeExamSchema.parse({
    content: formData.get("content"),
    date: formData.get("date"),
    subjectId: formData.get("subjectId"),
  });

  const session = await getServerSession(authOptions);
  if (!session) return { error: "Login to continue" };
  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! },
  });
  if (!user) return { error: "No user" };
  if (!user.classId) return { error: "No class" };

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

  return { success: "Exam successfully added" };
}
