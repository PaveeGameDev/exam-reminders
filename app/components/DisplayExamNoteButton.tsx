"use client";
import { ExamNote, User } from "@prisma/client";
import { updateUserNotePreference } from "@/app/actions/actions";
import { useRouter } from "next/navigation";

type Props = {
  examNote: ExamNote;
  user: User;
};
export default function DisplayExamNoteButton({ examNote, user }: Props) {
  const router = useRouter();
  const afterClick = () => {
    updateUserNotePreference(user, examNote);
    router.push("/");
  };

  return (
    <button
      onClick={afterClick}
      className="btn btn-primary mt-0 w-full max-w-xs"
    >
      Use
    </button>
  );
}
