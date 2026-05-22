import { Exam, ExamNote, User } from "@prisma/client";
import prisma from "@/prisma/client";
export async function getBestExamNote(
  exam: Exam,
  user: User,
): Promise<ExamNote | null> {
  const examNotes = await prisma.exam
    .findUnique({ where: { id: exam.id } })
    .examNotes();

  const preference = await prisma.userExamPreferences.findFirst({
    where: { userId: user.id, examId: exam.id },
  });

  if (!examNotes || examNotes.length === 0) {
    console.error("No examNotes found for exam:", exam.id);
    return null;
  }

  if (!examNotes) console.error("No examNotes", exam, user);
  if (preference) {
    const preferredNote = examNotes.find((note) => note.id === preference.examNoteId);
    if (preferredNote) return preferredNote;
  }
  const usersNote = examNotes.find((note) => note.userId === user.id);
  if (usersNote) return usersNote;

  // Fixed the crash by introducing optional chaining (?.) and fallback (|| 0)
  const sortedNotes = examNotes.slice().sort((a, b) => {
    const lengthB = b.content?.length || 0;
    const lengthA = a.content?.length || 0;
    return lengthB - lengthA;
  });

  return sortedNotes[0] || null;
}
