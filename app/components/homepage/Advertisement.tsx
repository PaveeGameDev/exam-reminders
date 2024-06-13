"use client";
import { ReactNode, useState } from "react";
import HorizontalLine1 from "@/app/components/decorations/HorizontalLine1";
import { useRouter } from "next/navigation";

type Props = {
  header: string;
  children: ReactNode;
  actionButtonText: string;
  actionButtonRedirect: string | undefined;
  showDownBar: boolean;
};
export default function Advertisement({
  actionButtonRedirect,
  actionButtonText,
  children,
  showDownBar,
  header,
}: Props) {
  const router = useRouter();

  const [visible, setVisibility] = useState<Boolean>(true);

  const onClick = () => {
    if (actionButtonRedirect) {
      router.push(actionButtonRedirect);
    } else {
      console.log(
        "A problem occured, both actionButtonAction and actionButtonRedirect are undefined",
      );
    }
  };

  const onClose = () => {
    setVisibility(false);
  };

  if (!visible) return;

  return (
    <>
      <div className="card bg-white shadow-md border border-primary flex flex-col mb-3 min-h-20 items-center space-y-3">
        <p className="text-2xl text-center text-black font-semibold w-full mt-3">
          {header}
        </p>
        <div className="mx-2">{children}</div>
        <div className="w-3/4 flex flex-row mx-3 space-x-3">
          <button
            className="btn btn-primary flex-1 rounded-2xl mb-3"
            onClick={onClick}
          >
            {actionButtonText}
          </button>
          <button
            className="w-16 rounded-2xl btn bg-gray-200"
            onClick={onClose}
          >
            X
          </button>
        </div>
      </div>
      {showDownBar && <HorizontalLine1 />}
    </>
  );
}
