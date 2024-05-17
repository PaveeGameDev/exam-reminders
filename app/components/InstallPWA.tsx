"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { isPWA } from "@/functions/isPWA";
import { getOS } from "@/functions/getOS";
import useFcmToken from "@/hooks/useFCMToken";
import FcmTokenComp from "@/firebaseForeground";

export default function InstallPWA() {
  const [isPwa, setIsPwa] = useState(false);
  const [os, setOS] = useState<string | null>(null);
  const fcmToken = useFcmToken();

  useEffect(() => {
    setIsPwa(isPWA());
    setOS(getOS());
  }, []);

  const requestNotifications = () => {
    Notification.requestPermission();
  };

  //Todo - get rid of this code comment, it should not be commented out
  // if (isPwa) return null;

  return (
    <div className="card bg-base-200 shadow-xl border border-gray-300 flex items-center justify-center">
      <FcmTokenComp />
      <div onClick={requestNotifications}>Enable Notifications</div>
      <div className="card-body text-center">
        <h2 className="card-title justify-center w-full">
          Přidej si Exam Reminders na plochu
        </h2>
        <p>
          Z této webovky se stane aplikace a můžeš ji používat o dost
          jednodušeji.
        </p>

        {os === "MacOS" ? (
          <Image
            src="/images/ShareIOS.jpg"
            alt="Download this page to your desktop"
            width={500}
            height={200}
            className="w-full h-full"
          />
        ) : (
          <Image
            src="/images/ShareAndroid.jpg"
            alt="Download this page to your desktop"
            width={500}
            height={200}
            className="w-full h-full"
          />
        )}
      </div>
      <p>{fcmToken.notificationPermissionStatus}</p>
      <p className="break-all w-60">{fcmToken.token}</p>
    </div>
  );
}
