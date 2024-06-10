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
      className={`btn btn-primary ${
        isActive ? "" : "btn-outline"
      } rounded-full `}
    >
      <p className="text-black">{text}</p>
    </Link>
  );
}
