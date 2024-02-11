import { Exam, ExamNote, User } from "@prisma/client";
import ChangeNoteButton from "@/app/components/ChangeNoteButton";
import { getUsersName } from "@/functions/getUsersName";

type Props = {
  user: User;
  exam: Exam;
  activeNote: ExamNote;
};
export default async function ChangeNoteButtonContainer({
  activeNote,
  user,
  exam,
}: Props) {
  return (
    <div className="flex flex-row justify-end">
      <div className="flex flex-row items-center">
        <p className="mr-2">{await getUsersName(activeNote, user)}</p>
        <ChangeNoteButton examId={exam.id} />
      </div>
    </div>
  );
}
