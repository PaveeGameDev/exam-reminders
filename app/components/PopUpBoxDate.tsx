type Props = {
  header: string;
  confirmText: string;
  cancelText: string;
  confirmAction: (date: Date) => void;
  id: string;
  date: Date;
};
export default function PopUpBoxDate({
  header,
  id,
  confirmText,
  cancelText,
  confirmAction,
  date,
}: Props) {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{header}</h3>
        <input
          type="date"
          id="output"
          defaultValue={
            date ? new Date(date).toISOString().substr(0, 10) : undefined
          }
          min={new Date().toISOString().substr(0, 10)}
          className="w-full h-12 border-primary rounded-3xl p-3 px-5 my-4 border-2"
        />
        <div className="flex flex-row justify-between mr-3 h-min-8">
          <form
            method="dialog"
            className="bg-gray-300 w-full flex justify-center"
          >
            <button>{cancelText}</button>
          </form>
          <button
            onClick={() =>
              //ToDo - fix this typescript bug or make it better
              // @ts-ignore
              confirmAction(new Date(document?.getElementById("output")?.value))
            }
            className="bg-primary w-full"
          >
            <p>{confirmText}</p>
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
