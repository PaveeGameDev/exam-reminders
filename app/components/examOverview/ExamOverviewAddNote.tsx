"use client";
import { User } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { FormResponse } from "@/app/types/types";
import { useRouter } from "next/navigation";
import { writeExamNote } from "@/app/actions/actions";
type Props = {
  user: User;
  examId: number;
};

export default function ExamOverviewAddNote({ user, examId }: Props) {
  const router = useRouter();
  const [afterSubmit, setAfterSubmit] = useState<FormResponse | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    formRef.current?.reset();
    if (afterSubmit?.success) router.refresh();
  }, [afterSubmit]);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        setAfterSubmit(await writeExamNote(formData, user, examId));
      }}
      className="w-full flex flex-col space-y-1 mt-10"
    >
      <textarea
        rows={4}
        id="content"
        name="content"
        placeholder="Co tu schází?"
        required
        maxLength={1000}
        className="rounded-3xl border-black border-2 p-3 px-5 text-lg"
      />
      <div className="flex w-full flex-row justify-end">
        <div className="rounded-3xl flex justify-center items-center bg-primary border-2 border-black">
          <button type="submit" className="text-lg p-2 px-10 text-center">
            Připsat
          </button>
        </div>
      </div>
    </form>
  );
}
