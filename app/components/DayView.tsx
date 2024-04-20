import { Exam, User } from "@prisma/client";
import { getDayName } from "@/functions/getDayName";
import DisplayExam from "@/app/components/DisplayExam";
import Link from "next/link";
import DayViewContent from "@/app/components/DayViewContent";

type Props = {
  day: Date;
  exams: Exam[];
  user: User;
  clickableAll?: boolean;
};
export default function DayView({
  day,
  exams,
  user,
  clickableAll = false,
}: Props) {
  let displayExams;

  if (!clickableAll) {
    displayExams = exams.map((exam, index) => (
      <Link href={`/${exam.id}`} key={exam.id}>
        <DisplayExam exam={exam} user={user} isFirst={index === 0} />
      </Link>
    ));
  } else {
    displayExams = exams.map((exam) => (
      <DisplayExam exam={exam} user={user} key={exam.id} isFirst={true} />
    ));
  }

  return (
    <div className="card bg-base-200 shadow-md border border-primary flex flex-row items-start justify-start mb-3 min-h-20">
      <div className="w-24 min-w-24 m-0">
        <div className="flex flex-col h-24 justify-center">
          <div className="flex justify-center items-center h-full">
            <p className="capitalize text-2xl text-center h-fit">
              {getDayName(day, "cs-CZ")}
            </p>
          </div>
          <hr className="w-full h-0.5 bg-primary border-primary" />
          <div className="flex justify-center items-center h-full">
            <p className="capitalize text-2xl text-center h-fit">
              {day.getDate()}.{day.getMonth() + 1}
            </p>
          </div>
        </div>
      </div>
      <DayViewContent>{displayExams}</DayViewContent>
    </div>
  );
}
