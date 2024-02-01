"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Loading from "@/app/loading";
import logo from "@/public/images/DALL·E 2024-01-27 11.04.56 - A sleek and modern logo for an app development website, featuring a stylized app icon integrated with a circuit pattern. The logo should combine vibra.png";

const NavBar = () => {
  const { status, data: session } = useSession();

  return (
    <div className="flex bg-slate-200 p-5 space-x-3 items-center justify-between">
      <Link href="/" className="mr-5 flex-none">
        <Image src={logo} alt="Logo" height={80} priority />
      </Link>
      {status === "loading" && <Loading />}
      <Link href="/write" className="mr-5 flex-none">
        Write
      </Link>
      <Link href="/settings" className="mr-5 flex-none">
        Settings
      </Link>
      {status === "authenticated" && (
        <div>
          {session.user!.name}
          <Link href="/api/auth/signout" className="ml-3">
            Sign Out
          </Link>
        </div>
      )}
      {status === "unauthenticated" && (
        <Link href="/api/auth/signin">Login</Link>
      )}
    </div>
  );
};
export default NavBar;
