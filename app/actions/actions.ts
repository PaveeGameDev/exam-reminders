"use server";

import { joinClassSchema, writeExamSchema } from "@/app/actions/actionsSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";
import { ExamNote, User } from "@prisma/client";

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
  const { date, content, subjectId, examTypeId } = writeExamSchema.parse({
    content: formData.get("content"),
    date: formData.get("date"),
    subjectId: formData.get("subjectId"),
    examTypeId: formData.get("typeId"),
  });

  const existingExam = await prisma.exam.findFirst({
    where: {
      classId: user.classId!,
      date: date,
      subjectId: subjectId,
      examTypeId: examTypeId,
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
      examTypeId: examTypeId,
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

export async function updateUserNotePreference(user: User, examNote: ExamNote) {
  const currentPreference = await prisma.userExamPreferences.findFirst({
    where: { userId: user.id, examId: examNote.examId },
  });
  if (currentPreference) {
    const updatedPreference = await prisma.userExamPreferences.update({
      where: { id: currentPreference.id },
      data: { examNoteId: examNote.id },
    });
  } else {
    const createdPreference = await prisma.userExamPreferences.create({
      data: {
        userId: user.id,
        examId: examNote.examId,
        examNoteId: examNote.id,
      },
    });
    revalidatePath("/");
  }
}

export async function updateUserExamPreferencesStateId(
  user: User,
  examId: number,
  stateId: number,
) {
  const currentPreference = await prisma.userExamPreferences.findFirst({
    where: { userId: user.id, examId: examId },
  });
  if (currentPreference) {
    const updatedPreference = await prisma.userExamPreferences.update({
      where: { id: currentPreference.id },
      data: { stateId: stateId },
    });
  } else {
    const examNote = await prisma.examNote.findFirst({
      where: { examId: examId },
    });

    const createdPreference = await prisma.userExamPreferences.create({
      data: {
        userId: user.id,
        examId: examId,
        examNoteId: examNote!.id,
        stateId: stateId,
      },
    });
  }
  revalidatePath("/");
}
