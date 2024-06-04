"use client";
type Props = {
  btnText: string;
  text?: string;
};
export default function Share({ btnText, text }: Props) {
  const share = () => {
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          url: "https://exam-reminders.vercel.app/",
          text: text,
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
    <button onClick={share} className="btn btn-primary btn-outline bg-white">
      <p className="text-black">{btnText}</p>
    </button>
  );
}
