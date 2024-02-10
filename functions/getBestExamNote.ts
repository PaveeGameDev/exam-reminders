import { ExamNote, User } from "@prisma/client";

export function getBestExamNote(examNotes: ExamNote[], user: User): ExamNote {
  const usersNote = examNotes.find((note) => note.userId === user.id);
  if (usersNote) return usersNote;
  return examNotes.sort((a, b) => b.content.length - a.content.length)[0];
}
