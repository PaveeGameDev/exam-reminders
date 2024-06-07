import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import { getUpcomingExams } from "@/functions/getUpcomingExams";
import { Exam } from "@prisma/client";
import DayViewWrap from "@/app/components/DayViewWrap";
import HorizontalLine1 from "@/app/components/decorations/HorizontalLine1";
import GoToWriteButton from "@/app/components/GoToWriteButton";
import NoLogin from "@/app/components/Errors/NoLogin";
import NoClass from "@/app/components/Errors/NoClass";
import NoUser from "@/app/components/Errors/NoUser";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) return <NoLogin />;
  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! },
  });
  if (!user) return <NoUser />;
  if (!user.classId) return <NoClass />;
  const exams = await getUpcomingExams(user);
  if (!exams) return;

  const dayViewWrappers = [];

  const date = new Date();
  for (let i = 0; i < 30; i++) {
    const examsOnTheDay = exams.filter(
      (exam) =>
        exam.date.getDate() === date.getDate() &&
        exam.date.getMonth() === date.getMonth(),
    );

    if (examsOnTheDay.length > 0) {
      if (date.getDay() == 5) {
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
    } else {
      if (date.getDay() == 5) {
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
      } else if (date.getDay() == 6) {
      } else if (date.getDay() == 0) {
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
    }

    date.setDate(date.getDate() + 1);
  }
  return (
    <main className="relative h-screen m-3">
      {dayViewWrappers}
      <GoToWriteButton />
    </main>
  );
}
