import Link from "next/link";

export default function NoLogin() {
  return (
    <div className="flex justify-center w-full h-[80vh]">
      <div className="flex flex-col justify-center items-center space-y-3">
        <h1 className="text-center text-6xl font-semibold">Co Píšem?</h1>
        <p className="text-center text-2xl">
          Sdílej své poznámky o budoucích testech s celou třídou.
          <br /> Jednoduše.
        </p>
        <Link
          href="/api/auth/signin"
          className="btn btn-primary w-1/2 h-16 text-xl text-center"
        >
          Přihlásit se
        </Link>
        <Link
          href="/about"
          className="btn btn-accent w-1/2 h-16 text-xl text-center"
        >
          Zjistit víc
        </Link>
      </div>
    </div>
  );
}
