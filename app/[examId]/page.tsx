import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import { getBestExamNote } from "@/functions/getBestExamNote";
import { getDayName } from "@/functions/getNameDay";
import { ExamHeader } from "@/app/components/ExamHeader";
import IrrelevantButton from "@/app/components/IrrelevantButton";
import { getUsersName } from "@/functions/getUsersName";
import DisplayExamNote from "@/app/components/DisplayExamNote";
import ChangeDate from "@/app/components/ChangeDate";
import ExamIcon from "@/app/components/ExamIcon";

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
    <>
      <div className="card max-w-96 bg-base-200 shadow-xl border border-gray-300 flex items-center justify-center mb-4">
        <div className="card-body flex flex-col justify-start p-0 w-full">
          <h2 className="text-2xl text-center m-1 underline underline-offset-4">
            {getDayName(exam.date, "en-US")} - {exam.date.getDate()}.
            {exam.date.getMonth() + 1}
          </h2>
          <div className="mx-2 mb-4">
            <div className="flex justify-center text-center mb-5">
              <ExamHeader exam={exam} />
              <ExamIcon examType={exam.examTypeId} />
            </div>
            <div className="flex flex-col gap-3">
              <p className="mb-6">{bestExamNote.content}</p>
              <div className="flex justify-between gap-3">
                <div className="flex flex-col justify-start gap-3 mt-2">
                  {/*<DoneButton examId={exam.id} user={user} />*/}
                  <IrrelevantButton
                    isIndividual={true}
                    exam={exam}
                    user={user}
                  />
                  <IrrelevantButton
                    isIndividual={false}
                    exam={exam}
                    user={user}
                  />
                </div>
                <div className="flex gap-2 items-center border-primary border-4 rounded-xl p-2 h-min">
                  <p>By: {getUsersName(bestExamNote, user)}</p>
                  {/*<LikeNote />*/}
                </div>
              </div>
              <ChangeDate exam={exam} />
            </div>
          </div>
        </div>
      </div>
      <div className="card max-w-96 bg-base-200 shadow-xl border border-gray-300 flex items-center justify-center">
        <div className="card-body text-center justify-center items-center">
          <h2 className="card-title justify-center w-full mb-3">
            Notes written by other people
          </h2>
          {examNotes.map((note) => (
            <DisplayExamNote examNote={note} user={user} key={note.id} />
          ))}
        </div>
      </div>
    </>
  );
}
