import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import { getBestExamNote } from "@/functions/getBestExamNote";
import { getDayName } from "@/functions/getDayName";
import { ExamHeader } from "@/app/components/ExamHeader";
import IrrelevantButton from "@/app/components/IrrelevantButton";
import { getDisplayName } from "@/functions/getDisplayName";
import DisplayExamNote from "@/app/components/DisplayExamNote";
import ChangeDate from "@/app/components/ChangeDate";
import ExamIcon from "@/app/components/ExamIcon";
import Share from "@/app/components/Share";
import { getSubjectById } from "@/functions/getSubjectById";
import { getExamTypeById } from "@/functions/getExamTypeById";
import { getUser } from "@/functions/getUser";
import { shortenName } from "@/functions/shortenName";
import { capitalizeFirstLetter } from "@/functions/capitalizeFirstLetter";
import { getFancyDayName } from "@/functions/getFancyDayName";
import AddExamNote from "@/app/components/AddExamNote";
import ExamOverviewHeader from "@/app/components/examOverview/ExamOverviewHeader";
import ExamOverviewDisplayNotes from "@/app/components/examOverview/ExamOverviewDisplayNotes";
import ExamOverviewAddNote from "@/app/components/examOverview/ExamOverviewAddNote";
import ExamOverviewFooter from "@/app/components/examOverview/ExamOverviewFooter";

export default async function ExamOverview({
  params,
}: {
  params: { examId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) return "Login to continue";
  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! },
  });
  if (!user) return "An error occurred";
  if (!parseInt(params.examId)) {
    return "An error occurred with examId";
  }
  const exam = await prisma.exam.findUnique({
    where: { id: parseInt(params.examId) },
  });
  if (!exam) return "Invalid examId";
  if (exam.classId !== user.classId) return "Trying to access not your exam";

  const bestExamNote = await getBestExamNote(exam, user);

  if (!bestExamNote) return;

  const examNotes = await prisma.examNote.findMany({
    where: { examId: parseInt(params.examId) },
  });

  return (
    <div>
      <div className="m-3">
        <ExamOverviewHeader exam={exam} />
        <ExamOverviewDisplayNotes exam={exam} user={user} />
        <ExamOverviewAddNote user={user} examId={exam.id} />
      </div>
      <ExamOverviewFooter exam={exam} user={user} bestExamNote={bestExamNote} />
    </div>
  );
}
