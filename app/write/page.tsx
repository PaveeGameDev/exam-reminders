import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import WriteExamForm from "@/app/components/WriteExamForm";
import { isDateObj } from "@/app/actions/actionsSchema";
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
  const examTypes = await prisma.examType.findMany({
    where: { NOT: { id: 1 } },
    orderBy: { priority: "desc" },
  });

  const defaultDate: string | null = searchParams.date
    ? new Date(
        new Date(searchParams.date).setDate(
          new Date(searchParams.date).getDate() + 1,
        ),
      )
        .toISOString()
        .substr(0, 10)
    : null;

  return (
    <main className="flex justify-center">
      <WriteExamForm
        subjects={subjects}
        user={user}
        examTypes={examTypes}
        date={defaultDate}
      />
    </main>
  );
}
