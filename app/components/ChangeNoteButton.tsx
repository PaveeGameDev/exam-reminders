"use client";
import { HiOutlineArrowsRightLeft } from "react-icons/hi2";

type Props = {};
export default function ChangeNoteButton({}: Props) {
  return (
    <button className="btn btn-outline btn-primary">
      <HiOutlineArrowsRightLeft size={20} />
    </button>
  );
}
