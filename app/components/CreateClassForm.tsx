"use client";
import { writeExam } from "@/app/actions/actions";
import { Subject, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { FormResponse } from "@/app/types/types";
import { useRouter } from "next/navigation";
import FormInputSubjectPart from "@/app/components/createClass/FormInputSubjectPart";
type Props = {
  defaultSubjects: Subject[];
  user: User;
};

export default function CreateClassForm({ defaultSubjects, user }: Props) {
  const router = useRouter();
  const [afterSubmit, setAfterSubmit] = useState<FormResponse | null>(null);

  const [activeSubjects, setActiveSubjects] = useState<
    {
      id: number;
      subject: string;
    }[]
  >(() =>
    defaultSubjects.map((subject, index) => ({
      id: index,
      subject: subject.name,
    })),
  );

  useEffect(() => {
    return () => {
      setActiveSubjects(
        defaultSubjects.map((subject, index) => ({
          id: index,
          subject: subject.name,
        })),
      );
    };
  }, []);

  useEffect(() => {
    if (afterSubmit?.success) router.push("/");
  }, [afterSubmit]);

  const onDelete = (id: number): void => {
    setActiveSubjects(activeSubjects?.filter((subject) => subject.id !== id));
  };
  const onCreate = (content: string): void => {
    // @ts-ignore
    setActiveSubjects([
      ...activeSubjects!,
      {
        id: activeSubjects![activeSubjects!.length - 1].id + 1,
        subject: content,
      },
    ]);
  };

  return (
    <form
      action={async (formData) => {
        setAfterSubmit(await writeExam(formData, user));
      }}
      className="flex flex-col space-y-4 bg-base-200 shadow-xl border border-gray-300 p-6 rounded-lg max-w-md w-full"
    >
      <label htmlFor="content" className="font-semibold">
        Jméno třídy
      </label>
      <input
        id="content"
        name="content"
        placeholder="Třída U - Gymnázium Opatov"
        maxLength={100}
        required
        className="textarea input-bordered w-full text-lg"
      />
      <div>
        {activeSubjects?.map((subject, index) => (
          <p key={index}>{subject.subject}</p>
        ))}
      </div>
      {activeSubjects?.map((subject, index) => (
        <FormInputSubjectPart
          key={index}
          id={subject.id}
          content={subject.subject}
          onDelete={(id: number) => onDelete(id)}
          onCreate={(content: string) => onCreate(content)}
          isCreational={false}
        />
      ))}

      <button type="submit" className="btn btn-primary mt-2">
        Vytvořit
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
