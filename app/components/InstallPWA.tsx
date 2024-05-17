"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { isPWA } from "@/functions/isPWA";
import { getOS } from "@/functions/getOS";
import useFcmToken from "@/hooks/useFCMToken";
import FcmTokenComp from "@/firebaseForeground";
import { getMessaging, getToken } from "firebase/messaging";
import { firebaseApp } from "@/firebase";

export default function InstallPWA() {
  const [isPwa, setIsPwa] = useState(false);
  const [os, setOS] = useState<string | null>(null);
  const [token, setToken] = useState("");
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState("");

  const retrieveToken = async () => {
    try {
      if (typeof window !== "undefined" && "serviceWorker" in navigator) {
        const messaging = getMessaging(firebaseApp);

        const permission = await Notification.requestPermission();

        console.log(permission);

        if (permission === "granted") {
          const currentToken = await getToken(messaging, {
            vapidKey:
              "BBFRkShoUVmOPYX7Q2d4A_z930XDqdkBSliBmd5VxqNeOK-TIIxrOpHWMagwAriRRLK41E6WrYyETBVeq0ghBHk", // Replace with your Firebase project's VAPID key
          });
          if (currentToken) {
            setToken(currentToken);
          } else {
            console.log(
              "No registration token available. Request permission to generate one.",
            );
          }
        }
      }
    } catch (error) {
      console.log("Error retrieving token:", error);
    }
  };

  useEffect(() => {
    setIsPwa(isPWA());
    setOS(getOS());
  }, []);

  const requestNotifications = async () => {
    retrieveToken();
  };

  //Todo - get rid of this code comment, it should not be commented out
  // if (isPwa) return null;

  return (
    <div className="card bg-base-200 shadow-xl border border-gray-300 flex items-center justify-center">
      {/*<FcmTokenComp />*/}
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
      <p className="break-all w-60">{token}</p>
    </div>
  );
}
