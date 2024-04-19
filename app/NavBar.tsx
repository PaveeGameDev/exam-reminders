"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Loading from "@/app/loading";
import { MdOutlineAccountCircle, MdAccountCircle } from "react-icons/md";
import {
  PiPencilSimpleLineFill,
  PiPencilSimpleLineLight,
} from "react-icons/pi";
import { HiOutlineBookOpen, HiBookOpen } from "react-icons/hi2";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const { status, data: session } = useSession();
  const path = usePathname();

  const isActive = (basePath: string) => path.startsWith(basePath);

  const currentPath = (): string => {
    if (isActive("/write")) {
      return "write";
    } else if (isActive("/settings")) {
      return "settings";
    } else {
      return "read";
    }
  };

  return (
    <div className="flex flex-row justify-between align-middle mx-3 mt-6 bg-primary rounded-full overflow-hidden h-12">
      {status === "loading" && (
        <div className="mx-5 flex items-center justify-end w-screen">
          <Loading />
        </div>
      )}

      {status === "authenticated" && (
        <>
          <Link
            href="/write"
            className={` flex mx-5 items-center justify-center ${
              currentPath() === "write" ? "font-bold" : ""
            }`}
          >
            {currentPath() === "write" ? (
              <PiPencilSimpleLineFill className="w-5 h-5" />
            ) : (
              <PiPencilSimpleLineLight className="w-5 h-5" />
            )}
          </Link>
          <Link
            href="/"
            className={`grow flex items-center justify-center border-x-4 ${
              currentPath() === "read" ? "font-bold" : ""
            }`}
          >
            {currentPath() === "read" ? (
              <HiBookOpen className="w-5 h-5" />
            ) : (
              <HiOutlineBookOpen className="w-5 h-5" />
            )}
          </Link>
          <Link
            href="/settings"
            className="mx-5 flex items-center justify-center"
          >
            {currentPath() === "settings" ? (
              <MdAccountCircle className="w-5 h-5" />
            ) : (
              <MdOutlineAccountCircle className="w-5 h-5" />
            )}
          </Link>
        </>
      )}
      {status === "unauthenticated" && (
        <Link
          href="/api/auth/signin"
          className="mx-5 flex items-center justify-end w-screen"
        >
          Přihlásit se
        </Link>
      )}
    </div>
  );
};

export default NavBar;
