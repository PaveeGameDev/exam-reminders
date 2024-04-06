import { Exam, User } from "@prisma/client";
import { getDayName } from "@/functions/getNameDay";
import DisplayExam from "@/app/components/DisplayExam";
import Link from "next/link";

type Props = {
  day: Date;
  exams: Exam[];
  user: User;
  clickableAll?: boolean;
};
export default async function DayView({
  day,
  exams,
  user,
  clickableAll = false,
}: Props) {
  let displayExams;

  if (!clickableAll) {
    displayExams = exams.map((exam) => (
      <Link href={`/${exam.id}`} key={exam.id}>
        <DisplayExam exam={exam} user={user} />
      </Link>
    ));
  } else {
    displayExams = exams.map((exam) => (
      <DisplayExam exam={exam} user={user} key={exam.id} />
    ));
  }

  return (
    <div className="card max-w-96 bg-base-200 shadow-xl border border-gray-300 flex items-center justify-center mb-4">
      <div className="card-body flex flex-col justify-start p-0 w-full">
        <h2 className="text-2xl text-center m-1 underline underline-offset-4">
          {getDayName(day, "en-US")} - {day.getDate()}.{day.getMonth() + 1}
        </h2>
        {displayExams}
      </div>
    </div>
  );
}
