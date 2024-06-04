"use client";
import { Exam, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import {
  changeExamDate,
  updateExamStateId,
  updateUserExamPreferencesStateId,
} from "@/app/actions/actions";
import DialogBox from "@/app/components/DialogBox";
import { useEffect, useState } from "react";
import { FormResponse } from "@/app/types/types";
import { updateExamDateSchema } from "@/app/actions/actionsSchema";
import PopUpBoxDate from "@/app/components/PopUpBoxDate";

type Props = { exam: Exam };
export default function ExamOverviewChangeDate({ exam }: Props) {
  const router = useRouter();
  const [afterSubmit, setAfterSubmit] = useState<FormResponse | null>(null);

  useEffect(() => {
    if (afterSubmit?.success) router.push("/");
  }, [afterSubmit]);

  const onConfirm = async (date: Date) => {
    setAfterSubmit(await changeExamDate(exam.id, date));
    router.push("/");
  };

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    //@ts-ignore
    document?.getElementById("change_date_modal")?.showModal();
  };

  return (
    <div>
      <button
        onClick={onClick}
        className="btn btn-outline btn-primary w-full bg-white"
      >
        <p className="text-black">Změnit datum</p>
      </button>
      <PopUpBoxDate
        header="Změnit datum testu"
        id="change_date_modal"
        cancelText="Ponechat"
        confirmText="Změnit datum"
        confirmAction={(date) => onConfirm(date)}
        date={exam.date}
      />
    </div>
  );
}
