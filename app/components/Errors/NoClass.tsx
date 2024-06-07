import Link from "next/link";

export default function NoClass() {
  return (
    <div className="flex justify-center w-full h-[80vh]">
      <div className="flex flex-col justify-center items-center space-y-5">
        <h1 className="text-center text-4xl font-semibold">
          Ještě nejsi ve třídě?
        </h1>
        <p className="text-center text-2xl">
          Zapsáním do třídy můžeš začít používat Co Píšem naplno, tak neváhej a
          zapiš se do třídy.
          <br />
          <br />
          Jsi první z celé tvojí třídy? Vytvoř si třídu a pozvi spolužáky.
        </p>
        <Link
          href="/settings"
          className="btn btn-primary w-3/4 h-16 text-xl text-center"
        >
          Zapsat se / Vytvořit třídu
        </Link>
      </div>
    </div>
  );
}
