"use client";
import { User } from "@prisma/client";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { updateUserExamPreferencesStateId } from "@/app/actions/actions";

type Props = { examId: number; user: User };
export default function IrrelevantButton({ examId, user }: Props) {
  const router = useRouter();
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    updateUserExamPreferencesStateId(user, examId, 2);
    router.push("/");
  };

  return (
    <button onClick={onClick} className="btn btn-outline btn-primary">
      <RxCross2 />
    </button>
  );
}
