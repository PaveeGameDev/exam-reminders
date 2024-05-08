"use client";
import { joinClassForm } from "@/app/actions/actions";
import { useRef, useState } from "react";
import { FormResponse } from "@/app/types/types";
import Link from "next/link";
export default function JoinClass() {
  const ref = useRef<HTMLFormElement>(null);
  const [afterSubmit, setAfterSubmit] = useState<FormResponse | null>(null);

  return (
    <div className="card bg-base-200 shadow-xl border border-gray-300 flex items-center justify-center p-6">
      <div className="card-body">
        <form
          ref={ref}
          action={async (formData) => {
            ref.current?.reset();
            setAfterSubmit(await joinClassForm(formData));
          }}
          className="flex flex-col items-center"
        >
          <label htmlFor="classId" className="mb-2 text-xl font-semibold">
            Zapsat se / Vytvořit třídu
          </label>
          <input
            className="input input-bordered input-primary w-full max-w-xs text-center text-lg"
            type="number"
            id="classId"
            name="classId"
            placeholder="Např. 123456"
            required
          />
          <button className="btn btn-primary mt-5 w-full max-w-xs">
            Zapsat se
          </button>
          <Link
            href="/createclass"
            className="btn btn-primary mt-5 w-full max-w-xs"
          >
            Vytvořit třídu
          </Link>
          {afterSubmit && afterSubmit.success && (
            <p className="text-success text-center">{afterSubmit.success}</p>
          )}
          {afterSubmit && afterSubmit.error && (
            <p className="text-error text-center">{afterSubmit.error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
