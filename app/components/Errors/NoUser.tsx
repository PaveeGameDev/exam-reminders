import Link from "next/link";

export default function NoUser() {
  return (
    <div className="flex justify-center w-full h-[80vh]">
      <div className="flex flex-col justify-center items-center space-y-5">
        <h1 className="text-center text-4xl font-semibold">
          Něco se nám tu rozbilo
        </h1>
        <p className="text-center text-2xl">
          Zkus se přihlásit znova, něco se tu pokazilo a nevíme co.
          <br />
          <br />
          Pokud by se to opakovalo, kontaktuj prosím developera.
        </p>
        <Link
          href="/api/auth/signin"
          className="btn btn-primary w-1/2 h-16 text-xl text-center"
        >
          Přihlásit se
        </Link>
      </div>
    </div>
  );
}
