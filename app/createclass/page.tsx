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
  if (!user.classId) return "Musíte se přihlásit do třídy";
  const defaultSubjects = await prisma.subject.findMany({});

  console.log(defaultSubjects, "default subjects");

  return (
    <main className="flex justify-center">
      <CreateClassForm defaultSubjects={defaultSubjects} user={user} />
    </main>
  );
}
