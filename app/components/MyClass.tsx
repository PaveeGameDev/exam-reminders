import Share from "@/app/components/Share";

type Props = {
  myClassId: number | null;
};
export default function MyClassId({ myClassId }: Props) {
  return (
    <div className="card bg-base-200 shadow-xl border border-gray-300 flex items-center justify-center">
      <div className="card-body text-center">
        <h2 className="card-title justify-center w-full">Tvoje třída</h2>
        <p>Kód tvojí třídy</p>
        <p>{myClassId}</p>
        <div className="card-actions justify-center mt-4">
          <Share btnText="Sdílej tento web se spolužáky" />
        </div>
      </div>
    </div>
  );
}
