"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { isPWA } from "@/functions/isPWA";

export default function InstallPWA() {
  const [isPwa, setIsPwa] = useState(false);

  useEffect(() => {
    setIsPwa(isPWA());
  }, []);

  if (isPwa) return null;

  return (
    <div className="card bg-base-200 shadow-xl border border-gray-300 flex items-center justify-center">
      <div className="card-body text-center">
        <h2 className="card-title justify-center w-full">
          Přidej si Exam Reminders na plochu
        </h2>
        <p>
          Z této webovky se stane aplikace a můžeš ji používat o dost
          jednodušeji.
        </p>
        <Image
          src="/images/ShareIOS.jpg"
          alt="Download this page to your desktop"
          width={500}
          height={200}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
