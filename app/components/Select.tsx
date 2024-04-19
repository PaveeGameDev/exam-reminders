"use client";

type Props = {
  options: { id: number; name: string }[];
  id: string;
  header: string;
};

export default function Select({ header, id, options }: Props) {
  return (
    <>
      <label htmlFor={id} className="font-semibold">
        {header}
      </label>
      <select
        id={id}
        name={id}
        required
        className="select select-accent w-full"
      >
        {options.map((option) => (
          <option
            key={option.id}
            id={option.id.toString()}
            value={option.id.toString()}
          >
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
}
