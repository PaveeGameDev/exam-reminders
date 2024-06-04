"use client";
import { ExamNote, User } from "@prisma/client";
import { updateUserNotePreference } from "@/app/actions/actions";
import { useRouter } from "next/navigation";
import { AiOutlineLike } from "react-icons/ai";

type Props = {
  examNote: ExamNote;
  user: User;
};
export default function DisplayExamNoteButton({ examNote, user }: Props) {
  const router = useRouter();
  const afterClick = () => {
    updateUserNotePreference(user, examNote);
    router.refresh();
  };

  return (
    <button
      onClick={afterClick}
      className="bg-base-300 rounded-full h-12 w-12 flex justify-center items-center"
    >
      <AiOutlineLike className="w-7 h-7" />
    </button>
  );
}
