import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import { getUpcomingExams } from "@/functions/getUpcomingExams";
import { Exam } from "@prisma/client";
import DayViewWrap from "@/app/components/DayViewWrap";
import { getDayName } from "@/functions/getNameDay";
import HorizontalLine1 from "@/app/components/decorations/HorizontalLine1";
import GoToWriteButton from "@/app/components/GoToWriteButton";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) return "Login to continue";
  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! },
  });
  if (!user) return "An error occurred";
  if (!user.classId) return "User needs to be in a class";
  const exams = await getUpcomingExams(user).then();
  if (!exams) return;
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

  let filteredExams = [];

  for (const exam of exams) {
    if (await isWanted(exam)) {
      filteredExams.push(exam);
    }
  }

  const dayViewWrappers = [];

  filteredExams = filteredExams.filter(
    (exam) => !exam.followerId || exam.followerId === user.id,
  );

  const date = new Date();
  for (let i = 0; i < 30; i++) {
    const examsOnTheDay = filteredExams.filter(
      (exam) =>
        exam.date.getDate() === date.getDate() &&
        exam.date.getMonth() === date.getMonth(),
    );

    if (getDayName(date, "en-US") === "Sunday") {
      dayViewWrappers.push(
        <div key={i}>
          <DayViewWrap
            day={new Date(date)}
            exams={examsOnTheDay}
            user={user}
            key={i}
          />
          <HorizontalLine1 />
        </div>,
      );
    } else {
      dayViewWrappers.push(
        <DayViewWrap
          day={new Date(date)}
          exams={examsOnTheDay}
          user={user}
          key={i}
        />,
      );
    }

    date.setDate(date.getDate() + 1);
  }
  return (
    <main className="relative h-screen">
      <>
        {dayViewWrappers}
        <GoToWriteButton />
      </>
    </main>
  );
}
