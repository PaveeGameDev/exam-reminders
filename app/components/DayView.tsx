import { Exam, User } from "@prisma/client";
import { getDayName } from "@/functions/getNameDay";
import DisplayExam from "@/app/components/DisplayExam";

type Props = {
  day: Date;
  exams: Exam[];
  user: User;
};
export default async function DayView({ day, exams, user }: Props) {
  return (
    <div className="card max-w-96 bg-base-200 p-1 shadow-xl border border-gray-300 flex items-center justify-center mb-4">
      <div className="card-body flex flex-col justify-start p-5 w-72">
        <h2 className="text-2xl text-center mb-1">
          {getDayName(day, "en-US")} - {day.getDate()}. {day.getMonth()}
        </h2>
        {exams.map((exam) => (
          <DisplayExam exam={exam} key={exam.id} user={user} />
        ))}
      </div>
    </div>
  );
}
