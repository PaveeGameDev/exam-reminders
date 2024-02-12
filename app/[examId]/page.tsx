import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import DisplayExamNote from "@/app/components/DisplayExamNote";

export default async function ChooseExamNote({
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
  if (exam.classId !== user.classId) return "Trying to access others exam";

  const examNotes = await prisma.examNote.findMany({
    where: { examId: parseInt(params.examId) },
  });

  return (
    <main className="flex justify-center p-6">
      <div className="card max-w-96 bg-base-200 shadow-xl border border-gray-300 flex items-center justify-center">
        <div className="card-body text-center justify-center items-center">
          <h2 className="card-title justify-center w-full mb-3">Other notes</h2>
          {examNotes.map((note) => (
            <DisplayExamNote examNote={note} user={user} key={note.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
