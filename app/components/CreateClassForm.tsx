"use client";
import { createClass } from "@/app/actions/actions";
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
    if (activeSubjects.length === 1) return; //ToDo - add a popup screen or remove the functionality totally. Now it break if there is no subject active
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
        setAfterSubmit(
          await createClass(
            formData,
            user,
            activeSubjects.map((subject) => subject.subject),
          ),
        );
      }}
      className="flex flex-col space-y-4 bg-base-200 shadow-xl border border-gray-300 p-6 rounded-lg max-w-md w-full"
    >
      <label htmlFor="className" className="font-semibold">
        Jméno třídy
      </label>
      <input
        id="className"
        name="className"
        placeholder="Třída U - Gymnázium Opatov"
        maxLength={100}
        required
        className="textarea input-bordered w-full text-lg"
      />
      <p className="font-semibold mb-2">Předměty</p>
      <div className="w-full grid grid-cols-2 gap-x-2 gap-y-1">
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
        <FormInputSubjectPart
          key={999}
          id={999}
          content="Přidej svůj předmět"
          onDelete={(id: number) => onDelete(id)}
          onCreate={(content: string) => onCreate(content)}
          isCreational={true}
          showCheck={true}
        />
      </div>
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
