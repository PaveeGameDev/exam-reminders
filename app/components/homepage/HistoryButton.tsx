import Link from "next/link";

type Props = {
  isActive: boolean;
  url: string;
  text: string;
};
export default function HistoryButton({ isActive, url, text }: Props) {
  return (
    <Link
      href={url}
      className={`btn btn-primary rounded-full btn-sm ${
        isActive ? "" : "btn-outline"
      }`}
    >
      <p className="text-black">{text}</p>
    </Link>
  );
}
