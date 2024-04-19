import Link from "next/link";

export default function SignoutHandler() {
  return (
    <div>
      <Link href="/api/auth/signout" className="ml-3 btn btn-secondary">
        Odhlásit se
      </Link>
    </div>
  );
}
