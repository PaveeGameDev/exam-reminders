import { User } from "@prisma/client";
import { PrepareNotificationResponse } from "@/app/types/types";
import { getUpcomingExams } from "@/functions/getUpcomingExams";
import { getSubjectNameById } from "@/functions/getSubjectNameById";

export async function prepareNotification(
  user: User,
): Promise<PrepareNotificationResponse> {
  const title: string = "Tvoje testy/úkoly na zítra";
  const tommorowDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 1,
  );
  const theDayAfterTommorowDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 2,
  );

  if (!user.classId) {
    return {
      title: title,
      text: "Přihlaš se do třídy, aby jsi dostával oznámení",
    };
  }

  const tommorowExams = await getUpcomingExams(user, {
    minDate: tommorowDate,
    maxDate: theDayAfterTommorowDate,
  });

  let text = "";

  if (tommorowExams) {
    for (const exam of tommorowExams) {
      const subjectName = await getSubjectNameById(exam.subjectId);
      if (text.length > 0) {
        text += ", " + subjectName;
      } else {
        text += subjectName;
      }
    }
  }

  return { title: title, text: text || "Nic" };
}
