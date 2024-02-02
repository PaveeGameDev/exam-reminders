"use client";
import { writeExam } from "@/app/actions/actions";
import { Subject } from "@prisma/client";
import { useRef, useState } from "react";
import { FormResponse } from "@/app/types/types";
type Props = {
  subjects: Subject[];
};

export default function WriteExamForm({ subjects }: Props) {
  const ref = useRef<HTMLFormElement>(null);
  const [afterSubmit, setAfterSubmit] = useState<FormResponse | null>(null);
  return (
    <form
      ref={ref}
      action={async (formData) => {
        ref.current?.reset();
        setAfterSubmit(await writeExam(formData));
      }}
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
      {afterSubmit && afterSubmit.success && (
        <p className="text-success text-center">{afterSubmit.success}</p>
      )}
      {afterSubmit && afterSubmit.error && (
        <p className="text-error text-center">{afterSubmit.error}</p>
      )}
    </form>
  );
}
