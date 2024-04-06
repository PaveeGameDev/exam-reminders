import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import DayView from "@/app/components/DayView";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) return "Login to continue";
  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! },
  });
  if (!user) return "An error occurred";
  if (!user.classId) return "User needs to be in a class";

  const exams = await prisma.exam.findMany({
    where: { classId: user.classId! },
  });

  const days = [];

  for (let i = 0; i < 30; i++) {
    let dayCanBeVisible = true;
    const date = new Date();
    date.setDate(date.getDate() + i);
    const filteredExams = exams.filter(
      (exam) =>
        exam.date.getDate() === date.getDate() &&
        exam.date.getMonth() === date.getMonth() &&
        exam.date.getFullYear() === date.getFullYear() &&
        exam.stateId !== 1 &&
        exam.stateId !== 2,
    );
    if (filteredExams.length > 0) {
      for (const filteredExam of filteredExams) {
        const currentUserExamPreference =
          await prisma.userExamPreferences.findFirst({
            where: { userId: user.id, examId: filteredExam.id },
          });
        if (
          currentUserExamPreference?.stateId === 1 ||
          currentUserExamPreference?.stateId === 2
        ) {
        } else {
          if (dayCanBeVisible) {
            dayCanBeVisible = false;
            if (filteredExams.length === 1) {
              days.push(
                <Link href={`/${filteredExams[0].id}`} key={i}>
                  <DayView
                    day={date}
                    exams={filteredExams}
                    user={user}
                    clickableAll={true}
                  />
                </Link>,
              );
            } else {
              days.push(
                <DayView
                  day={date}
                  exams={filteredExams}
                  key={i}
                  user={user}
                />,
              );
            }
          }
        }
      }
    }
  }

  return <main className="relative h-screen">{days}</main>;
}
