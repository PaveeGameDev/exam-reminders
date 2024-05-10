"use client";
import { useState } from "react";
import { HiOutlineXCircle } from "react-icons/hi2";
import { CiCircleCheck } from "react-icons/ci";

type Props = {
  id: number;
  content: string;
  onDelete: (id: number) => void;
  onCreate?: (content: string) => void;
  isCreational: boolean;
  showCheck?: boolean;
};

export default function FormInputSubjectPart({
  onDelete,
  onCreate,
  isCreational,
  id,
  content,
  showCheck,
}: Props) {
  const [input, setInput] = useState("");
  const onClick = (e: any): void => {
    // console.log(content, id, e);
    e?.preventDefault();
    if (e?.detail === 1) {
      //Todo - take a look on how this behavior works
      if (isCreational && onCreate && input) {
        onCreate(input);
        setInput("");
      } else {
        onDelete(id);
      }
    }
  };

  return (
    <div className="flex justify-center items-center w-full border-primary border-2 rounded">
      <div className="w-3/4 flex justify-center items-center">
        {isCreational ? (
          <input
            className="w-full text-center input focus:border-0 focus:outline-0"
            id="Add-new"
            value={input}
            placeholder={content}
            maxLength={30}
            // @ts-ignore
            onInput={(e) => setInput(e.target.value)}
          />
        ) : (
          <p className="text-center break-words">{content}</p>
        )}
      </div>
      <div className="w-1/4 flex justify-center items-center">
        <button
          onClick={(e) => onClick(e)}
          className="flex justify-center items-center"
        >
          {showCheck ? (
            <CiCircleCheck
              style={{ color: "#FFC836" }}
              size={40}
              strokeWidth={0.5}
            />
          ) : (
            <HiOutlineXCircle style={{ color: "#FFC836" }} size={40} />
          )}
        </button>
      </div>
    </div>
  );
}
