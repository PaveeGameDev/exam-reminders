import { getExamTypeById } from "@/functions/getExamTypeById";
import { Exam } from "@prisma/client";
import prisma from "@/prisma/client";

type Props = {
  exam: Exam;
};

export const ExamHeader = async ({ exam }: Props) => {
  const subjects = await prisma.subject.findMany({ where: {} });
  const getSubjectNameById = (subjectId: number): string => {
    const subject = subjects.find((subject) => subject.id === subjectId);
    if (subject) return subject.name;
    return "";
  };
  const examType = await getExamTypeById(exam.examTypeId);

  const chooseColor = (id: number): string => {
    switch (id) {
      case 0:
        return "text-black-500";
      case 1:
        return "text-black-500";
      case 2:
        return "text-blue-600";
      case 3:
        return "text-blue-600";
      case 4:
        return "text-error";
      case 5:
        return "text-error";
      default:
        return "text-black-500";
    }
  };

  return (
    <div className="flex-row w-full">
      <h3 className="inline font-semibold text-3xl ">
        {getSubjectNameById(exam.subjectId)}
      </h3>
    </div>
  );
};
