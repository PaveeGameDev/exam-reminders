import HistoryButton from "@/app/components/homepage/HistoryButton";

export default function HistoryButtons() {
  return (
    <div>
      <HistoryButton isActive={true} url="/" text="Tento měsíc" />
    </div>
  );
}
