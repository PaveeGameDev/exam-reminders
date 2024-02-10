"use client";
import { ExamNote, User } from "@prisma/client";

type Props = {
  examNote: ExamNote;
  user: User;
};
export default async function DisplayExamNoteButton({ examNote, user }: Props) {
  return <button className="btn btn-primary mt-5 w-full max-w-xs">Use</button>;
}
