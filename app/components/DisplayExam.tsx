import { Exam, User } from "@prisma/client";
import prisma from "@/prisma/client";
import { getBestExamNote } from "@/functions/getBestExamNote";
import { ExamHeader } from "@/app/components/ExamHeader";
import { ExpandableText } from "@/app/components/ExpandableText";
import DoneButton from "@/app/components/DoneButton";
import IrrelevantButton from "@/app/components/IrrelevantButton";
import ExamIcon from "@/app/components/ExamIcon";

type Props = {
  exam: Exam;
  user: User;
};
export default async function DisplayExam({ exam, user }: Props) {
  if (!exam) return;

  const bestExamNote = await getBestExamNote(exam, user);

  if (!bestExamNote) return;

  const currentUserExamPreference = await prisma.userExamPreferences.findFirst({
    where: { userId: user.id, examId: exam.id },
  });

  if (currentUserExamPreference?.stateId === 2) return;

  return (
    <div className="flex flex-row justify-between w-full align-middle my-2 items-center h-full">
      <div className="flex flex-col ml-3 justify-start">
        <div>
          <ExamHeader exam={exam} />
        </div>
        <ExpandableText showButton={false} length={18}>
          {bestExamNote.content}
        </ExpandableText>
      </div>
      <ExamIcon examType={exam.examTypeId} />
    </div>
  );
}
