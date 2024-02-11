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
        return "neutral";
      case 1:
        return "neutral";
      case 2:
        return "blue-600";
      case 3:
        return "blue-600";
      case 4:
        return "error";
      case 5:
        return "error";
      default:
        return "neutral";
    }
  };

  return (
    <div className="flex-row justify-center align-middle">
      <h3
        className={`inline font-semibold text-3xl uppercase text-${chooseColor(
          examType!.priority,
        )}`}
      >
        {getSubjectNameById(exam.subjectId)}
      </h3>
      <p
        className={`inline font-semibold text-3xl text-${chooseColor(
          examType!.priority,
        )}`}
      >
        {" "}
        -{" "}
      </p>
      <h3
        className={`inline font-semibold text-3xl uppercase text-${chooseColor(
          examType!.priority,
        )}`}
      >
        {examType!.name}
      </h3>
    </div>
  );
};
