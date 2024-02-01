import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import { writeExam } from "@/app/actions/actions";

export default async function Write() {
  const session = await getServerSession(authOptions);
  if (!session) return "Login to continue";
  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! },
  });
  if (!user) return "An error occurred";

  return (
    <main className="relative h-screen">
      <form action={writeExam}>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" required />
        <label htmlFor="date">Date</label>
        <input type="date" id="date" name="date" required />
        <label htmlFor="subjectId">SubjectId</label>
        <input type="number" id="subjectId" name="subjectId" required />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
