import { Exam, User } from "@prisma/client";
import { getBestExamNote } from "@/functions/getBestExamNote";
import { ExamHeader } from "@/app/components/ExamHeader";
import { ExpandableText } from "@/app/components/ExpandableText";
import ExamIcon from "@/app/components/ExamIcon";

type Props = {
  exam: Exam;
  user: User;
  isFirst: boolean;
};
export default async function DisplayExam({ exam, user, isFirst }: Props) {
  if (!exam) return;

  const bestExamNote = await getBestExamNote(exam, user);

  if (!bestExamNote) return;

  return (
    <div className="flex flex-row justify-between w-full align-middle my-2 items-center min-h-[86px]">
      <div className="flex flex-col ml-3 mr-1 max-w-56">
        <ExamHeader exam={exam} />
        <ExpandableText showButton={false} length={isFirst ? 50 : 50}>
          {bestExamNote.content}
        </ExpandableText>
      </div>
      <ExamIcon examType={exam.examTypeId} />
    </div>
  );
}
