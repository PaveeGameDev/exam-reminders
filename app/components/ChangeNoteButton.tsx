"use client";
import { HiOutlineArrowsRightLeft } from "react-icons/hi2";
import Link from "next/link";

type Props = { examId: number };
export default function ChangeNoteButton({ examId }: Props) {
  return (
    <Link href={`/${examId}`} className="btn btn-outline btn-primary">
      <HiOutlineArrowsRightLeft size={20} />
    </Link>
  );
}
