"use client";
import { User } from "@prisma/client";
import { MdDone } from "react-icons/md";
import React from "react";
import { updateUserExamPreferencesStateId } from "@/app/actions/actions";
import { useRouter } from "next/navigation";

type Props = { examId: number; user: User };
export default function DoneButton({ examId, user }: Props) {
  const router = useRouter();
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    updateUserExamPreferencesStateId(user, examId, 3);
    router.push("/");
  };

  return (
    <button onClick={onClick} className="btn btn-outline btn-primary">
      <MdDone />
    </button>
  );
}
