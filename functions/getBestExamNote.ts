import { Exam, ExamNote, User } from "@prisma/client";
import prisma from "@/prisma/client";
export async function getBestExamNote(
  exam: Exam,
  user: User,
): Promise<ExamNote> {
  const examNotes = await prisma.exam
    .findUnique({ where: { id: exam.id } })
    .examNotes();

  const preference = await prisma.userExamPreferences.findFirst({
    where: { userId: user.id, examId: examNotes![0].examId },
  });

  if (
    preference &&
    examNotes!.find((note) => note.id === preference.examNoteId)
  ) {
    return examNotes!.find((note) => note.id === preference.examNoteId)!;
  }

  const usersNote = examNotes!.find((note) => note.userId === user.id);
  if (usersNote) return usersNote;
  return examNotes!.sort((a, b) => b.content.length - a.content.length)[0];
}
