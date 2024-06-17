import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import { getBestExamNote } from "@/functions/getBestExamNote";
import ExamOverviewHeader from "@/app/components/examOverview/ExamOverviewHeader";
import ExamOverviewDisplayNotes from "@/app/components/examOverview/ExamOverviewDisplayNotes";
import ExamOverviewAddNote from "@/app/components/examOverview/ExamOverviewAddNote";
import ExamOverviewFooter from "@/app/components/examOverview/ExamOverviewFooter";
import NoLogin from "@/app/components/Errors/NoLogin";
import NoUser from "@/app/components/Errors/NoUser";
import ErrorTemplate from "@/app/components/Errors/ErrorTemplate";

export default async function ExamOverview({
  params,
}: {
  params: { examId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) return <NoLogin />;
  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! },
  });
  if (!user) return <NoUser />;
  if (!parseInt(params.examId)) {
    return (
      <ErrorTemplate
        header="Máš správnou adresu?"
        buttonLink="/"
        buttonText="Vrátit se domů"
      >
        Zkontroluj že máš správně adresu. Nemáš tam náhodou velká písmena?
      </ErrorTemplate>
    );
  }
  const exam = await prisma.exam.findUnique({
    where: { id: parseInt(params.examId) },
  });
  if (!exam)
    return (
      <ErrorTemplate
        header="Takový test neexistuje"
        buttonLink="/"
        buttonText="Vrátit se domů"
      >
        Toto číslo úkolu neexistuje, možná překlik?
      </ErrorTemplate>
    );
  if (exam.classId !== user.classId)
    return (
      <ErrorTemplate
        header="Toto není tvůj test"
        buttonLink="/"
        buttonText="Vrátit se domů"
      >
        Toto není test pro tvojí třídu, jsi ve správné třídě?
      </ErrorTemplate>
    );

  const bestExamNote = await getBestExamNote(exam, user);

  if (!bestExamNote) return;

  const examNotes = await prisma.examNote.findMany({
    where: { examId: parseInt(params.examId) },
  });

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[50rem]">
        <div className="m-3">
          <ExamOverviewHeader exam={exam} />
          <ExamOverviewDisplayNotes exam={exam} user={user} />
          <ExamOverviewAddNote user={user} examId={exam.id} />
        </div>
        <ExamOverviewFooter
          exam={exam}
          user={user}
          bestExamNote={bestExamNote}
        />
      </div>
    </div>
  );
}
