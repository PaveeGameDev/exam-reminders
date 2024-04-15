import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";
export default function GoToWriteButton() {
  return (
    <div className="fixed bottom-24 right-24 h-8 w-8">
      <Link href="/write">
        <CiCirclePlus size={80} />
      </Link>
    </div>
  );
}
