import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import { writeExam } from "@/app/actions/actions";

export default async function Write() {
  const session = await getServerSession(authOptions);
  if (!session) return <p>Login to continue</p>;
  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! },
  });
  if (!user) return <p>An error occurred</p>;

  const subjects = await prisma.subject.findMany({ where: {} });

  // const afterSubmit = async (formData: FormData) => {
  //   const result = await writeExam(formData);
  //   console.log(result);
  // };

  return (
    <main className="flex justify-center p-6">
      <form
        action={writeExam}
        className="flex flex-col space-y-4 bg-base-200 shadow-xl border border-gray-300 p-6 rounded-lg max-w-md w-full"
      >
        <label htmlFor="content" className="font-semibold">
          Info about the exam
        </label>
        <textarea
          rows={4}
          id="content"
          name="content"
          placeholder="What is the exam about?"
          required
          className="textarea input-bordered w-full"
        />
        <label htmlFor="date" className="font-semibold">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          required
          className="input input-bordered w-full"
        />
        <label htmlFor="subjectId" className="font-semibold">
          Subject
        </label>
        <select
          id="subjectId"
          name="subjectId"
          required
          className="select select-accent w-full max-w-xs"
        >
          {subjects.map((subject) => (
            <option
              key={subject.id}
              id={subject.id.toString()}
              value={subject.id.toString()}
            >
              {subject.name}
            </option>
          ))}
        </select>
        <button type="submit" className="btn btn-primary mt-2">
          Write it down
        </button>
      </form>
    </main>
  );
}
