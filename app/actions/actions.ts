"use server";

import { joinClassSchema, writeExamSchema } from "@/app/actions/actionsSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";
import { User } from "@prisma/client";

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

export async function writeExam(formData: FormData, user: User) {
  const { date, content, subjectId } = writeExamSchema.parse({
    content: formData.get("content"),
    date: formData.get("date"),
    subjectId: formData.get("subjectId"),
  });

  const existingExam = await prisma.exam.findFirst({
    where: {
      classId: user.classId!,
      date: date,
      subjectId: subjectId,
    },
  });

  if (existingExam) {
    const createdExamNote = await prisma.examNote.create({
      data: {
        examId: existingExam.id,
        content: content,
        userId: user.id,
        dateCreated: new Date(),
      },
    });

    revalidatePath("/write");

    return { success: "Exam successfully added" };
  }

  const createdExam = await prisma.exam.create({
    data: {
      classId: user.classId!,
      date: date,
      subjectId: subjectId,
    },
  });

  const createdExamNote = await prisma.examNote.create({
    data: {
      examId: createdExam.id,
      content: content,
      userId: user.id,
      dateCreated: new Date(),
    },
  });

  revalidatePath("/write");

  return { success: "Exam successfully added" };
}
