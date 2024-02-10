import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import WriteExamForm from "@/app/components/WriteExamForm";

export default async function Write() {
  const session = await getServerSession(authOptions);
  if (!session) return <p>Login to continue</p>;
  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! },
  });
  if (!user) return <p>An error occurred</p>;
  if (!user.classId) return "User needs to be in a class";
  const subjects = await prisma.subject.findMany({ where: {} });

  return (
    <main className="flex justify-center p-6">
      <WriteExamForm subjects={subjects} user={user} />
    </main>
  );
}
