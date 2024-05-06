"use server";

import {
  createClassSchema,
  joinClassSchema,
  updateExamDateSchema,
  writeExamNoteSchema,
  writeExamSchema,
} from "@/app/actions/actionsSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";
import { ClassSubjects, Exam, ExamNote, Prisma, User } from "@prisma/client";
import generateClassIdCode from "@/functions/generateClassIdCode";
import ClassSubjectsCreateManyInput = Prisma.ClassSubjectsCreateManyInput;

export async function joinClassForm(formData: FormData) {
  const { classId } = joinClassSchema.parse({
    classId: formData.get("classId"),
  });

  return joinClass(classId);
}

export async function joinClass(classId: number) {
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
  const { date, content, subjectId, examTypeId, isPublic } =
    writeExamSchema.parse({
      content: formData.get("content"),
      date: formData.get("date"),
      subjectId: formData.get("subjectId"),
      examTypeId: formData.get("typeId"),
      isPublic: Boolean(formData.get("isPublic")),
    });

  let existingExam: Exam | null = null;

  if (isPublic) {
    existingExam = await prisma.exam.findFirst({
      where: {
        classId: user.classId!,
        date: date,
        subjectId: subjectId,
        examTypeId: examTypeId,
        followerId: null,
      },
    });
  } else {
    existingExam = await prisma.exam.findFirst({
      where: {
        classId: user.classId!,
        date: date,
        subjectId: subjectId,
        examTypeId: examTypeId,
        followerId: user.id,
      },
    });
  }

  if (!existingExam) {
    if (isPublic) {
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
    } else {
      const createdExam = await prisma.exam.create({
        data: {
          classId: user.classId!,
          date: date,
          subjectId: subjectId,
          examTypeId: examTypeId,
          followerId: user.id,
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
    }
    revalidatePath("/write");
    return { success: "Exam successfully added" };
  }

  if (isPublic) {
    const createdExamNote = await prisma.examNote.create({
      data: {
        examId: existingExam.id,
        content: content,
        userId: user.id,
        dateCreated: new Date(),
      },
    });
    revalidatePath("/write");
    return { success: "Exam note successfully added" };
  }

  if (existingExam.followerId === user.id) {
    const createdExamNote = await prisma.examNote.create({
      data: {
        examId: existingExam.id,
        content: content,
        userId: user.id,
        dateCreated: new Date(),
      },
    });
    revalidatePath("/write");
    return { success: "Exam note successfully added" };
  }

  const createdExam = await prisma.exam.create({
    data: {
      classId: user.classId!,
      date: date,
      subjectId: subjectId,
      examTypeId: examTypeId,
      followerId: user.id,
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

export async function changeExamDate(examId: number, date: Date) {
  const updatedExam = await prisma.exam.update({
    where: { id: examId },
    data: { date: date },
  });

  revalidatePath("/");

  return { success: "Exams date successfully updated" };
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
    const createdPreference = await prisma.userExamPreferences.create({
      data: {
        userId: user.id,
        examId: examId,
        stateId: stateId,
      },
    });
  }
  revalidatePath("/");
}

export async function updateExamStateId(examId: number, stateId: number) {
  const updatedExam = await prisma.exam.update({
    where: { id: examId },
    data: { stateId: stateId },
  });
  revalidatePath("/");
}

export async function writeExamNote(
  formData: FormData,
  user: User,
  examId: number,
) {
  const { content } = writeExamNoteSchema.parse({
    content: formData.get("content"),
  });

  const createdExamNote = await prisma.examNote.create({
    data: {
      examId: examId,
      content: content,
      userId: user.id,
      dateCreated: new Date(),
    },
  });
  revalidatePath(`/${examId}`);
  if (createdExamNote) {
    return { success: "Exam note successfully added" };
  } else {
    return { error: "Exam note cannot be added" };
  }
}

export async function createClass(
  formData: FormData,
  user: User,
  subjects: string[],
) {
  const { className } = createClassSchema.parse({
    className: formData.get("className"),
  });

  const classCode = await generateClassIdCode();

  const createdClass = await prisma.class.create({
    data: { id: classCode, name: className },
  });

  if (!createdClass) {
    return { error: "Cannot create class" };
  }

  const classSubjects = subjects.map((subject) => ({
    classId: classCode,
    name: subject,
  }));

  const createdClassSubjects = await prisma.classSubjects.createMany({
    data: classSubjects,
  });

  if (!createdClassSubjects) {
    return { error: "Cannot create subjects" };
  }

  const joinClassResponse = await joinClass(createdClass.id);

  if (joinClassResponse?.error) {
    return joinClassResponse;
  }

  return { success: "Class successfully created" };
}

export async function changeClassSubjectUserPreference(
  user: User,
  activeSubjectsId: number[],
  disabledSubjectsId: number[],
) {
  for (let i = 0; i < activeSubjectsId.length; i++) {
    const subjectId = activeSubjectsId[i];

    const currentClassSubjectUserPreference =
      await prisma.classSubjectUserPreference.findFirst({
        where: {
          classId: user.classId,
          userId: user.id,
          classSubjectsId: subjectId,
        },
      });
    if (currentClassSubjectUserPreference) {
      await prisma.classSubjectUserPreference.update({
        where: { id: currentClassSubjectUserPreference.id },
        data: { stateId: 0 },
      });
    }
  }

  for (let i = 0; i < disabledSubjectsId.length; i++) {
    const subjectId = disabledSubjectsId[i];

    const currentClassSubjectUserPreference =
      await prisma.classSubjectUserPreference.findFirst({
        where: {
          classId: user.classId,
          userId: user.id,
          classSubjectsId: subjectId,
        },
      });
    if (currentClassSubjectUserPreference) {
      await prisma.classSubjectUserPreference.update({
        where: { id: currentClassSubjectUserPreference.id },
        data: { stateId: 2 },
      });
    } else {
      await prisma.classSubjectUserPreference.create({
        data: {
          userId: user.id,
          classSubjectsId: subjectId,
          classId: user.classId,
          stateId: 2,
        },
      });
    }
  }
  revalidatePath(`/`);
  return { success: "Preferences successfully updated" };
}
