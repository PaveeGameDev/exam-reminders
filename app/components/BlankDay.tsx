import { getDayName } from "@/functions/getDayName";

type Props = {
  day: Date;
};

export default function BlankDay({ day }: Props) {
  return (
    <div className="card bg-base-200 shadow-md border border-primary flex flex-row items-start justify-start mb-3 min-h-20">
      <div className="w-[128px] m-0">
        <div className="flex flex-col h-24 justify-center">
          <div className="flex justify-center items-center h-full">
            <p className="capitalize text-2xl text-center h-fit">
              {getDayName(day, "cs-CZ")}
            </p>
          </div>
          <hr className="w-full h-0.5 bg-primary border-primary" />
          <div className="flex justify-center items-center h-full">
            <p className="capitalize text-2xl text-center h-fit">
              {day.getDate()}.{day.getMonth() + 1}
            </p>
          </div>
        </div>
      </div>
      <hr className="h-24 w-0.5 bg-primary border-primary" />
    </div>
  );
}
