import prisma from "@/prisma/client";
import { Exam, User } from "@prisma/client";

export const getUpcomingExams = async (user: User): Promise<Exam[] | null> => {
  const result = await prisma.exam.findMany({
    where: {
      classId: user.classId!,
      stateId: 0,
      date: {
        gte: new Date(),
        lte: new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          new Date().getDate(),
        ),
      },
    },
  });
  return result;
};
