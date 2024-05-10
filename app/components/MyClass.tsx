import Share from "@/app/components/Share";
import { Class } from "@prisma/client";

type Props = {
  myClass: Class | null;
};
export default function MyClassId({ myClass }: Props) {
  return (
    <div className="card bg-base-200 shadow-xl border border-gray-300 flex items-center justify-center">
      <div className="card-body text-center">
        <h2 className="card-title justify-center w-full">Tvoje třída</h2>
        <p>{myClass?.name}</p>
        <p>Kód tvojí třídy</p>
        <p>{myClass?.id}</p>
        <div className="card-actions justify-center mt-4">
          <Share btnText="Sdílej tento web se spolužáky" />
        </div>
      </div>
    </div>
  );
}
