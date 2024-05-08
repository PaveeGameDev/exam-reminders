import { Exam } from "@prisma/client";
import { getSubjectNameById } from "@/functions/getSubjectNameById";

type Props = {
  exam: Exam;
};

export const ExamHeader = async ({ exam }: Props) => {
  return (
    <div className="flex-row w-full">
      <h3 className="inline font-semibold text-3xl ">
        {await getSubjectNameById(exam.subjectId)}
      </h3>
    </div>
  );
};
