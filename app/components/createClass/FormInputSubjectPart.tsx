"use client";
import { useState } from "react";

type Props = {
  id: number;
  content: string;
  onDelete: (id: number) => void;
  onCreate?: (content: string) => void;
  isCreational: boolean;
};

export default function FormInputSubjectPart({
  onDelete,
  onCreate,
  isCreational,
  id,
  content,
}: Props) {
  const [input, setInput] = useState("");
  const onClick = (e: any) => {
    e?.preventDefault();
    if (isCreational && onCreate) {
      onCreate(input);
      setInput("");
    } else {
      onDelete(id);
    }
  };

  return (
    <div className="flex flex-row justify-between w-full">
      <div>
        {isCreational ? (
          <input
            id="Add-new"
            value={input}
            placeholder={content}
            // @ts-ignore
            onInput={(e) => setInput(e.target.value)}
          />
        ) : (
          <p>{content}</p>
        )}
      </div>
      <div>
        <button onClick={(e) => onClick(e)}>X</button>
      </div>
    </div>
  );
}
