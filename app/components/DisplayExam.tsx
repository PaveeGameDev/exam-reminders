import { Exam } from "@prisma/client";

type Props = {
  exam: Exam;
};
export default function DisplayExam({ exam }: Props) {
  return (
    <div>
      <p>Exam info:</p>
      <p>{exam.subjectId}</p>
      <p>{exam.content}</p>
      <p>{exam.date.toString()}</p>
    </div>
  );
}
