import { getDayName } from "@/functions/getNameDay";

type Props = {
  day: Date;
};

export default function BlankDay({ day }: Props) {
  return (
    <div className="card max-w-96 bg-base-200 shadow-xl border border-gray-300 flex items-center justify-center mb-4">
      <div className="card-body flex flex-col justify-start p-0 w-full">
        <h2 className="text-2xl text-center m-1 underline underline-offset-4">
          {getDayName(day, "en-US")} - {day.getDate()}.{day.getMonth() + 1}
        </h2>
        <div className="h-16"></div>
      </div>
    </div>
  );
}
