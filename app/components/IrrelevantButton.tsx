"use client";
import { User } from "@prisma/client";
import { RxCross2 } from "react-icons/rx";

type Props = { examId: number; user: User };
export default function IrrelevantButton({ examId, user }: Props) {
  const onClick = () => {
    console.log(examId, user + " marking as irrelevant");
  };

  return (
    <button onClick={onClick} className="btn btn-outline btn-primary">
      <RxCross2 />
    </button>
  );
}
