import { Exam, User } from "@prisma/client";
import prisma from "@/prisma/client";
import { getBestExamNote } from "@/functions/getBestExamNote";
import ChangeNoteButtonContainer from "@/app/components/ChangeNoteButtonContainer";

type Props = {
  exam: Exam;
  user: User;
};
export default async function DisplayExam({ exam, user }: Props) {
  if (!exam) return;
  const subjects = await prisma.subject.findMany({ where: {} });

  const getSubjectNameById = (subjectId: number): string => {
    const subject = subjects.find((subject) => subject.id === subjectId);
    if (subject) return subject.name;
    return "";
  };

  const examNotes = await prisma.exam
    .findUnique({ where: { id: exam.id } })
    .examNotes();

  const bestExamNote = await getBestExamNote(examNotes!, user);

  return (
    <div>
      <h3 className="inline font-semibold text-xl">
        {getSubjectNameById(exam.subjectId)}
      </h3>
      <p className="inline"> - </p>
      <p className="inline">{bestExamNote.content}</p>
      <ChangeNoteButtonContainer
        user={user}
        exam={exam}
        activeNote={bestExamNote}
      />
    </div>
  );
}
