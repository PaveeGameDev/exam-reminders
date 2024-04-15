"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormResponse } from "@/app/types/types";
import { changeExamDate } from "@/app/actions/actions";

type Props = {
  examId: number;
};

export default function ChangeDate({ examId }: Props) {
  const router = useRouter();
  const [afterSubmit, setAfterSubmit] = useState<FormResponse | null>(null);

  useEffect(() => {
    if (afterSubmit?.success) router.push("/");
  }, [afterSubmit]);

  return (
    <form
      action={async (formData) => {
        setAfterSubmit(await changeExamDate(examId, formData));
      }}
      className="flex flex-row items-start space-x-3"
    >
      <input
        type="date"
        id="date"
        name="date"
        required
        className="input input-bordered w-full"
      />

      <button type="submit" className="btn btn-primary btn-outline">
        <p className="text-black">Změnit datum</p>
      </button>
    </form>
  );
}
