import prisma from "@/prisma/client";
import { ExamNote, User } from "@prisma/client";

export async function getUsersName(activeNote: ExamNote, user: User) {
  if (activeNote.userId !== user.id) {
    const activeNoteUser = await prisma.user.findUnique({
      where: { id: activeNote.userId },
    });
    return activeNoteUser?.name;
  } else {
    return "You";
  }
}
