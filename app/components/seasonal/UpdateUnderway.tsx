import Image from "next/image";
type Props = {
  text: string;
  image: string;
  backOn: string;
};

export default function UpdateUnderway({ text, image, backOn }: Props) {
  return (
    <div className="flex flex-col items-center mt-5 mx-2 space-y-2">
      <h1>Exam reminders</h1>
      <h2>Právě se pracuje na něčem skvělém</h2>
      <p>
        Některé vylepšení aplikace se dají dělat za pochodu, ale na ty co se
        vyplatí počkat se musí chvilku počkat
      </p>
      <p>Právě pro tebe připravuji:</p>
      <p>{text}</p>
      <p>Vše bude zase běžet jako po másle v:</p>
      <p>{backOn}</p>
      <p>Mezitím se můžeš podívat na následující týden</p>
      <Image src={image} alt="Upcoming week" width={400} height={800} />
    </div>
  );
}
