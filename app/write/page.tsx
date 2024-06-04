import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import WriteExamForm from "@/app/components/WriteExamForm";
import { getUserActiveSubject } from "@/functions/getUserActiveSubject";

type Props = {
  searchParams: { [param: string]: string };
};

export default async function Write({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) return <p>Login to continue</p>;
  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! },
  });
  if (!user) return <p>An error occurred</p>;
  if (!user.classId) return "Musíte se přihlásit do třídy";
  const subjects = await getUserActiveSubject(user);
  //For current database configuration, does not serve different purpose other than hide one value that makes no sense for some time so it can be used later
  const examTypes = await prisma.examType.findMany({
    where: { NOT: { id: 1 } },
    orderBy: { priority: "desc" },
  });

  const defaultDate: string | null = searchParams.date
    ? new Date(searchParams.date).toISOString().substr(0, 10)
    : null;

  return (
    <main className="flex justify-center m-3">
      <WriteExamForm
        subjects={subjects}
        user={user}
        examTypes={examTypes}
        date={defaultDate}
      />
    </main>
  );
}
