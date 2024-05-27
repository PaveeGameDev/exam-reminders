import prisma from "@/prisma/client";
import { Exam, User } from "@prisma/client";
import { getUserActiveSubject } from "@/functions/getUserActiveSubject";

export const getUpcomingExams = async (
  user: User,
  date?: { minDate: Date; maxDate: Date },
): Promise<Exam[] | null> => {
  const activeSubjects = await getUserActiveSubject(user);
  const innerDate: { minDate: Date; maxDate: Date } | undefined = date ?? {
    minDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
    ),
    maxDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      new Date().getDate(),
    ),
  };

  const allExams = await prisma.exam.findMany({
    where: {
      classId: user.classId!,
      stateId: 0,
      date: {
        gte: innerDate.minDate,
        lte: innerDate.maxDate,
      },
    },
  });

  const currentUserExamPreferences = await prisma.userExamPreferences.findMany({
    where: { userId: user.id },
  });

  const isWanted = async (exam: Exam) =>
    currentUserExamPreferences.some(
      (preference) =>
        (preference.examId === exam.id && preference.stateId === 0) ||
        (preference.examId === exam.id && preference.stateId === null),
    ) ||
    currentUserExamPreferences.every(
      (preference) => preference.examId !== exam.id,
    );

  const filteredExams = [];

  for (const exam of allExams) {
    if (await isWanted(exam)) {
      filteredExams.push(exam);
    }
  }

  return allExams
    .filter((exam) =>
      activeSubjects.find((subject) => exam.subjectId === subject.id),
    )
    .filter((exam) => !exam.followerId || exam.followerId === user.id);
};
