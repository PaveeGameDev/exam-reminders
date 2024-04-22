import { ExamNote, User } from "@prisma/client";
import { getDisplayName } from "@/functions/getDisplayName";
import DisplayExamNoteButton from "@/app/components/DisplayExamNoteButton";

type Props = {
  examNote: ExamNote;
  user: User;
};
export default async function DisplayExamNote({ examNote, user }: Props) {
  return (
    <div className="card max-w-96 w-full min-w-52 bg-base-200 shadow-xl border border-gray-300 flex items-center justify-center">
      <div className="card-body text-center justify-center items-center">
        <h2 className="card-title justify-center w-full">
          {await getDisplayName(examNote, user)}
        </h2>
        <p className="break-words">{examNote.content}</p>
        <div className="card-actions justify-center mt-4 w-32">
          <DisplayExamNoteButton examNote={examNote} user={user} />
        </div>
      </div>
    </div>
  );
}
