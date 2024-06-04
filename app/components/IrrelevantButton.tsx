"use client";
import { Exam, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import {
  updateExamStateId,
  updateUserExamPreferencesStateId,
} from "@/app/actions/actions";
import DialogBox from "@/app/components/DialogBox";

type Props = { exam: Exam; user: User; isIndividual: boolean };
export default function IrrelevantButton({ exam, user, isIndividual }: Props) {
  const router = useRouter();
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (isIndividual) {
      //@ts-ignore
      document?.getElementById("irrelevant_modal_alone")?.showModal();
    } else {
      //@ts-ignore
      document?.getElementById("irrelevant_modal_all")?.showModal();
    }
  };

  const onConfirm = () => {
    if (isIndividual) {
      updateUserExamPreferencesStateId(user, exam.id, 2);
    } else {
      updateExamStateId(exam.id, 2);
    }
    router.push("/");
  };
  return (
    <div>
      <button
        onClick={onClick}
        className="btn btn-outline btn-primary w-full bg-white"
      >
        <p className="text-black">
          {isIndividual ? "Odstranit pro mě" : "Odstranit pro všechny"}
        </p>
      </button>
      <DialogBox
        header={isIndividual ? "Odstranit pro mě" : "Odstranit pro všechny"}
        text={`Opravdu chceš odstranit toto dne ${exam.date.getDate()}.${
          exam.date.getMonth() + 1
        } ${isIndividual ? "pro sebe" : "pro všechny"}?`}
        confirmAction={onConfirm}
        id={isIndividual ? "irrelevant_modal_alone" : "irrelevant_modal_all"}
        cancelText="Ponechat"
        confirmText={isIndividual ? "Odstranit" : "Odstranit pro všechny"}
      />
    </div>
  );
}
