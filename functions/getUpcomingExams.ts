import prisma from "@/prisma/client";
import { Exam, User } from "@prisma/client";
import { getUserActiveSubject } from "@/functions/getUserActiveSubject";

export const getUpcomingExams = async (user: User): Promise<Exam[] | null> => {
  const activeSubjects = await getUserActiveSubject(user);
  const allExams = await prisma.exam.findMany({
    where: {
      classId: user.classId!,
      stateId: 0,
      date: {
        gte: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
        ),
        lte: new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          new Date().getDate(),
        ),
      },
    },
  });

  return allExams.filter((exam) =>
    activeSubjects.find((subject) => exam.subjectId === subject.id),
  );
};
