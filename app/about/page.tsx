import Link from "next/link";

export default function About() {
  return (
    <div className="flex flex-col justify-center items-center space-y-5 mt-10 m-5">
      <h1 className="text-center text-6xl font-semibold">Co Píšem?</h1>
        <p className="text-center text-2xl">
            Co Píšem je webová aplikace, která ti ulehčí život. Celá třída může využít
            toto místo ke sdílení poznámek k testům nebo úkolům. <br/>
            <br/> Už se nikdy nestane, že bys zapomněl na budoucí test, protože
            na Co Píšem bude vše přehledně zapsáno. <br/>
            <br/>
            Co Píšem je nejjednodušší způsob, jak sdílet kalendář s celou třídou.
            <br/>
            <br/>
            Pojď do toho!
        </p>
        <Link
            href="/api/auth/signin"
            className="btn btn-primary w-1/2 h-16 text-xl text-center max-w-72"
        >
            Přihlásit se
        </Link>
    </div>
  );
}
