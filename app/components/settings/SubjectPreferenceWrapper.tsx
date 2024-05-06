import { ClassSubjects, Exam, User } from "@prisma/client";
import { getSubjectsInClass } from "@/functions/getSubjectsInClass";
import { getUserClassSubjectPreference } from "@/functions/getUserClassSubjectPreference";
import SubjectPreference from "@/app/components/settings/SubjectPreference";

type Props = {
  user: User;
};

export default async function SubjectPreferenceWrapper({ user }: Props) {
  if (!user.classId) return "Login to class to proceed";
  const subjectsInClass = await getSubjectsInClass(user.classId);
  const subjectPreference = await getUserClassSubjectPreference(user.id);

  const possibleSubjects = subjectsInClass.filter(
    (subject) => subject.stateId !== 2,
  );

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

  const activeSubjects = possibleSubjects.filter((subject) =>
    isWanted(subject),
  );
  const disabledSubjects = possibleSubjects.filter(
    (subject) => !isWanted(subject),
  );

  return (
    <SubjectPreference
      user={user}
      activeSubjects={activeSubjects}
      disabledSubjects={disabledSubjects}
    />
  );
}
