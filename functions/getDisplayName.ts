import { ExamNote, User } from "@prisma/client";
import { getUser } from "@/functions/getUser";
import { shortenName } from "@/functions/shortenName";

export async function getDisplayName(activeNote: ExamNote, user: User) {
  const activeNoteUser = await getUser(activeNote.userId);

  if (activeNote.userId !== user.id) {
    return shortenName(activeNoteUser!.name!);
  } else {
    return "You";
  }
}
