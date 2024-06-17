import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  header: string;
  children: ReactNode;
  buttonLink: string;
  buttonText: string;
};

export default function ErrorTemplate({
  header,
  children,
  buttonLink,
  buttonText,
}: Props) {
  return (
    <div className="flex justify-center w-full h-[80vh]">
      <div className="flex flex-col justify-center items-center space-y-5">
        <h1 className="text-center text-4xl font-semibold">{header}</h1>
        <p className="text-center text-2xl">{children}</p>
        <Link
          href={buttonLink}
          className="btn btn-primary w-1/2 h-16 text-xl text-center max-w-72"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
