type Props = {
  header: string;
  text: string;
  confirmText: string;
  cancelText: string;
  confirmAction: () => void;
  id: string;
};
export default function DialogBox({
  confirmAction,
  text,
  header,
  id,
  confirmText,
  cancelText,
}: Props) {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{header}</h3>
        <p className="py-4">{text}</p>
        <div className="flex flex-row justify-between mr-3 h-min-8 rounded-lg overflow-hidden">
          <form
            method="dialog"
            className="bg-gray-300 w-full flex justify-center"
          >
            <button>{cancelText}</button>
          </form>
          <button onClick={confirmAction} className="bg-primary w-full">
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
