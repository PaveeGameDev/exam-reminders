"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormResponse } from "@/app/types/types";
import { changeExamDate } from "@/app/actions/actions";
import DialogBox from "@/app/components/DialogBox";
import { Exam } from "@prisma/client";
import { updateExamDateSchema } from "@/app/actions/actionsSchema";

type Props = {
  exam: Exam;
};

export default function ChangeDate({ exam }: Props) {
  const router = useRouter();
  const [afterSubmit, setAfterSubmit] = useState<FormResponse | null>(null);
  const [newDate, setNewDate] = useState<Date | null>(null);

  useEffect(() => {
    if (afterSubmit?.success) router.push("/");
  }, [afterSubmit]);

  const onConfirm = async () => {
    setAfterSubmit(await changeExamDate(exam.id, newDate!));
  };

  const onSubmit = (formData: FormData) => {
    const { date } = updateExamDateSchema.parse({
      date: formData.get("date"),
    });
    setNewDate(date);
    //@ts-ignore
    document?.getElementById("change_date_modal")?.showModal();
  };

  return (
    <>
      <form
        action={(formData) => onSubmit(formData)}
        className="flex flex-row items-start space-x-3"
      >
        <input
          type="date"
          id="date"
          name="date"
          required
          className="input input-bordered w-full text-black"
        />

        <button type="submit" className="btn btn-primary btn-outline">
          <p className="text-black">Změnit datum</p>
        </button>
      </form>
      <DialogBox
        header="Přesunout datum testu"
        text={`Opravdu chceš přesunout toto ze dne ${exam.date.getDate()}.${
          exam.date.getMonth() + 1
        } na den ${newDate?.getDate()}.${exam.date.getMonth() + 1}?`}
        confirmAction={onConfirm}
        id="change_date_modal"
        cancelText="Ponechat"
        confirmText="Změnit"
      />
    </>
  );
}
