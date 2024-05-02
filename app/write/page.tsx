import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import WriteExamForm from "@/app/components/WriteExamForm";
import { isDateObj } from "@/app/actions/actionsSchema";

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
  const subjects = await prisma.subject.findMany({});
  const examTypes = await prisma.examType.findMany({
    where: { NOT: { id: 1 } },
    orderBy: { priority: "desc" },
  });

  let date: null | string = null;

  if (searchParams.date) {
    const miniDates = searchParams.date
      .split("-")
      .map((miniDate) => parseInt(miniDate));
    miniDates[miniDates.length - 1] = miniDates[miniDates.length - 1] + 1;
    const internalDate = miniDates.join("-");
    const { success } = isDateObj.safeParse({
      dateZod: internalDate,
    });
    if (success) {
      if (!isNaN(new Date(internalDate).getTime())) {
        date = internalDate;
      }
    }
  }

  return (
    <main className="flex justify-center">
      <WriteExamForm
        subjects={subjects}
        user={user}
        examTypes={examTypes}
        date={date}
      />
    </main>
  );
}
