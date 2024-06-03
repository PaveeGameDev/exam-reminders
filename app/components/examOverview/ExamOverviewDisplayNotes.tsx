import { Exam, User } from "@prisma/client";
import { getBestExamNote } from "@/functions/getBestExamNote";
import ExamOverviewNote from "@/app/components/examOverview/ExamOverviewNote";
import prisma from "@/prisma/client";

type Props = {
  exam: Exam;
  user: User;
};
export default async function ExamOverviewDisplayNotes({ exam, user }: Props) {
  const bestExamNote = await getBestExamNote(exam, user);
  const examNotes = await prisma.examNote.findMany({
    where: { examId: exam.id },
  });

  if (!bestExamNote) return;
  return (
    <div className="flex flex-col space-y-10">
      <ExamOverviewNote examNote={bestExamNote} user={user} isPrimary={true} />
      <div className="flex flex-col space-y-5">
        {examNotes
          .filter((note) => note.id !== bestExamNote.id)
          .map((note) => (
            <ExamOverviewNote
              examNote={note}
              user={user}
              isPrimary={false}
              key={note.id}
            />
          ))}
      </div>
    </div>
  );
}
