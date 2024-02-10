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
      <div className="space-y-11 w-full max-w-md mx-auto">
        {examNotes.map((note) => (
          <DisplayExamNote examNote={note} user={user} key={note.id} />
        ))}
      </div>
    </main>
  );
}
