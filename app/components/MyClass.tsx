"use client";
type Props = {
  myClassId: number | null;
};
export default function MyClassId({ myClassId }: Props) {
  const share = () => {
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          url: "https://exam-reminders.vercel.app/",
        })
        .then(() => {
          console.log("Shared successfully");
        })
        .catch((error) => {
          console.error("Error sharing:", error);
        });
    } else {
      console.error("Web Share API not supported");
    }
  };

  return (
    <div className="card max-w-96 bg-base-200 shadow-xl border border-gray-300 flex items-center justify-center">
      <div className="card-body text-center">
        <h2 className="card-title justify-center w-full">Tvoje třída</h2>
        <p>Kód tvojí třídy</p>
        <p>{myClassId}</p>
        <div className="card-actions justify-center mt-4">
          <button onClick={share} className="btn btn-primary">
            Sdílej tento web se spolužáky
          </button>
        </div>
      </div>
    </div>
  );
}
