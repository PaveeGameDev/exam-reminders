"use client";
import { User } from "@prisma/client";
import { MdDone } from "react-icons/md";

type Props = { examId: number; user: User };
export default function DoneButton({ examId, user }: Props) {
  const onClick = () => {
    console.log(examId, user + " marking as done");
  };

  return (
    <button onClick={onClick} className="btn btn-outline btn-primary">
      <MdDone />
    </button>
  );
}
