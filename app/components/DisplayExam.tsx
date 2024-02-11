import { Exam, User } from "@prisma/client";
import prisma from "@/prisma/client";
import { getBestExamNote } from "@/functions/getBestExamNote";
import ChangeNoteButton from "@/app/components/ChangeNoteButton";
import { ExamHeader } from "@/app/components/ExamHeader";
import { ExpandableText } from "@/app/components/ExpandableText";

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
    <div className="mx-2">
      <ExamHeader exam={exam} />
      <ExpandableText showLess={false} length={40}>
        {bestExamNote.content}
      </ExpandableText>
      <div className="flex flex-row justify-end">
        <ChangeNoteButton examId={exam.id} />
      </div>
    </div>
  );
}
