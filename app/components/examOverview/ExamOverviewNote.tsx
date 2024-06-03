import { ExamNote, User } from "@prisma/client";
import { getDisplayName } from "@/functions/getDisplayName";
import DisplayExamNoteButton from "@/app/components/DisplayExamNoteButton";

type Props = {
  examNote: ExamNote;
  user: User;
  isPrimary: boolean;
};
export default async function ExamOverviewNote({
  examNote,
  user,
  isPrimary,
}: Props) {
  return (
    <div className="w-full flex flex-col space-y-1">
      <div
        className={`${isPrimary ? "bg-primary" : "bg-base-300"}  rounded-3xl`}
      >
        <p className="p-3 px-5 text-lg">{examNote.content}</p>
      </div>
      <div
        className={`flex w-full flex-row space-x-3 ${
          isPrimary ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`${
            isPrimary ? "bg-primary" : "bg-base-300"
          } rounded-3xl flex justify-center items-center`}
        >
          <p className="p-3 px-7 text-lg text-center">
            {await getDisplayName(examNote, user)}
          </p>
        </div>
        <div className={`${isPrimary ? "hidden" : ""}`}>
          <DisplayExamNoteButton examNote={examNote} user={user} />
        </div>
      </div>
    </div>
  );
}
