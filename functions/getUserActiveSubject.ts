import prisma from "@/prisma/client";
import { ClassSubjects, User } from "@prisma/client";
import { getUserClassSubjectPreference } from "@/functions/getUserClassSubjectPreference";
export async function getUserActiveSubject(
  user: User,
): Promise<ClassSubjects[]> {
  if (!user.classId) return [];
  const subjects = await prisma.classSubjects.findMany({
    where: { classId: user.classId },
  });
  const subjectPreference = await getUserClassSubjectPreference(user.id);
  const possibleSubjects = subjects.filter((subject) => subject.stateId !== 2);

  const isWanted = (subject: ClassSubjects) =>
    subjectPreference.some(
      (preference) =>
        (preference.classSubjectsId === subject.id &&
          preference.stateId === 0) ||
        (preference.classSubjectsId === subject.id &&
          preference.stateId === null),
    ) ||
    subjectPreference.every(
      (preference) => preference.classSubjectsId !== subject.id,
    );
  return possibleSubjects.filter((subject) => isWanted(subject));
}
