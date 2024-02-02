import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import { writeExam } from "@/app/actions/actions";
import WriteExamForm from "@/app/components/WriteExamForm";

export default async function Write() {
  const session = await getServerSession(authOptions);
  if (!session) return <p>Login to continue</p>;
  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! },
  });
  if (!user) return <p>An error occurred</p>;

  const subjects = await prisma.subject.findMany({ where: {} });

  const afterSubmit = async (formData: FormData) => {
    "use server";
    const result = await writeExam(formData);
    console.log(result);
  };

  return (
    <main className="flex justify-center p-6">
      <WriteExamForm subjects={subjects} />
    </main>
  );
}
