"use client";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";

type Props = { examId: number };
export default function ChangeNoteButton({ examId }: Props) {
  return (
    <Link href={`/${examId}`} className="btn btn-outline btn-primary">
      <BsThreeDots size={20} />
    </Link>
  );
}
