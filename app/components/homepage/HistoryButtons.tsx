import HistoryButton from "@/app/components/homepage/HistoryButton";
import { HistoryButtonsRelevantQueryParams } from "@/app/types/types";
import { addDaysToDate } from "@/functions/addDaysToDate";

type Props = {
  relevantQueryParams: HistoryButtonsRelevantQueryParams;
};

export default function HistoryButtons({ relevantQueryParams }: Props) {
  const today = new Date();

  return (
    <div className="flex flex-row w-full justify-between mb-5">
      <HistoryButton
        isActive={Boolean(
          !relevantQueryParams.to && !relevantQueryParams.wholeHistory,
        )}
        url="/"
        text="Tento měsíc"
      />
      <HistoryButton
        isActive={Boolean(relevantQueryParams.from)}
        url={`/?from=${addDaysToDate(
          today.toISOString(),
          -14,
        ).toISOString()}&to=${addDaysToDate(
          today.toISOString(),
          1,
        ).toISOString()}`}
        text="Minulé 2 týdny"
      />
      <HistoryButton
        isActive={Boolean(relevantQueryParams.wholeHistory)}
        url="/?wholeHistory=1"
        text="Celá historie"
      />
    </div>
  );
}
