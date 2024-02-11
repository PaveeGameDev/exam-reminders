import { Exam, User } from "@prisma/client";
import prisma from "@/prisma/client";
import { getBestExamNote } from "@/functions/getBestExamNote";
import { ExamHeader } from "@/app/components/ExamHeader";
import { ExpandableText } from "@/app/components/ExpandableText";
import DoneButton from "@/app/components/DoneButton";
import IrrelevantButton from "@/app/components/IrrelevantButton";

type Props = {
  exam: Exam;
  user: User;
};
export default async function DisplayExam({ exam, user }: Props) {
  if (!exam) return;

  const examNotes = await prisma.exam
    .findUnique({ where: { id: exam.id } })
    .examNotes();

  const bestExamNote = await getBestExamNote(examNotes!, user);

  return (
    <div className="mx-2 mb-4">
      <div className="flex justify-center">
        <ExamHeader exam={exam} />
      </div>
      <ExpandableText showButton={false} length={40}>
        {bestExamNote.content}
      </ExpandableText>
      <div className="flex flex-row justify-start gap-3 mt-2">
        <DoneButton examId={exam.id} user={user} />
        <IrrelevantButton examId={exam.id} user={user} />
      </div>
    </div>
  );
}
