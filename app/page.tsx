import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import DisplayExam from "@/app/components/DisplayExam";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) return "Login to continue";
  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! },
  });
  if (!user) return "An error occurred";
  if (!user.classId) return "User needs to be in a class";

  const exams = await prisma.exam.findMany({
    where: { classId: user.classId },
  });

  return (
    <main className="relative h-screen">
      {exams.map((exam) => (
        <DisplayExam key={exam.id} exam={exam} />
      ))}
    </main>
  );
}
