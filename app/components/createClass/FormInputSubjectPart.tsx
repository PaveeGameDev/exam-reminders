"use client";
type Props = {
  id: number;
  content: string;
  onDelete: (id: number) => void;
  onCreate: (content: string) => void;
  isCreational: boolean;
};

export default function FormInputSubjectPart({
  onDelete,
  onCreate,
  isCreational,
  id,
  content,
}: Props) {
  const onClick = (e: any) => {
    e?.preventDefault();
    if (isCreational) {
      onCreate("hello");
    } else {
      onDelete(id);
    }
  };

  return (
    <div>
      <div>
        <p>{content}</p>
        <p>{id}</p>
      </div>
      <div>
        <button onClick={(e) => onClick(e)}>X</button>
      </div>
    </div>
  );
}
