import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import CreateClassForm from "@/app/components/CreateClassForm";

export default async function CreateClass() {
  const session = await getServerSession(authOptions);
  if (!session) return <p>Login to continue</p>;
  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! },
  });
  if (!user) return <p>An error occurred</p>;
  const defaultSubjects = await prisma.subject.findMany({});

  return (
    <main className="flex justify-center m-3">
      <CreateClassForm defaultSubjects={defaultSubjects} user={user} />
    </main>
  );
}
