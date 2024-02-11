"use client";
import { writeExam } from "@/app/actions/actions";
import { ExamType, Subject, User } from "@prisma/client";
import { useRef, useState } from "react";
import { FormResponse } from "@/app/types/types";
import Select from "@/app/components/Select";
type Props = {
  subjects: Subject[];
  user: User;
  examTypes: ExamType[];
};

export default function WriteExamForm({ subjects, user, examTypes }: Props) {
  const ref = useRef<HTMLFormElement>(null);
  const [afterSubmit, setAfterSubmit] = useState<FormResponse | null>(null);
  return (
    <form
      ref={ref}
      action={async (formData) => {
        ref.current?.reset();
        setAfterSubmit(await writeExam(formData, user));
      }}
      className="flex flex-col space-y-4 bg-base-200 shadow-xl border border-gray-300 p-6 rounded-lg max-w-md w-full"
    >
      <Select options={subjects} id="subjectId" header="Subjects" />
      <Select options={examTypes} id="typeId" header="Type" />
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

      <button type="submit" className="btn btn-primary mt-2">
        Write it down
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
