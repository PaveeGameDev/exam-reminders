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

export default function AddExamNote({ user, examId }: Props) {
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
      className="flex flex-col space-y-4 w-full"
    >
      <textarea
        rows={4}
        id="content"
        name="content"
        placeholder="Co tu schází?"
        required
        maxLength={1000}
        className="textarea input-bordered w-full text-lg"
      />

      <button type="submit" className="btn btn-primary mt-2">
        Připsat
      </button>
      {afterSubmit && afterSubmit.success && (
        <p className="text-success text-center">{afterSubmit.success}</p>
      )}
      {afterSubmit && afterSubmit.error && (
        <p className="text-error text-center">{afterSubmit.error}</p>
      )}
    </form>
  );
}
