import { ExamNote, User } from "@prisma/client";
import { getUsersName } from "@/functions/getUsersName";
import DisplayExamNoteButton from "@/app/components/DisplayExamNoteButton";

type Props = {
  examNote: ExamNote;
  user: User;
};
export default async function DisplayExamNote({ examNote, user }: Props) {
  return (
    <div className="card max-w-96 bg-base-200 shadow-xl border border-gray-300 flex items-center justify-center">
      <div className="card-body text-center">
        <h2 className="card-title justify-center w-full">
          {await getUsersName(examNote, user)}
        </h2>
        <p>{examNote.content}</p>
        <div className="card-actions justify-center mt-4">
          <DisplayExamNoteButton examNote={examNote} user={user} />
        </div>
      </div>
    </div>
  );
}
