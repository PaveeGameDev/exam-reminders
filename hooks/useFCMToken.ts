"use client";
import { useEffect, useState } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import { firebaseApp } from "@/firebase";

const useFcmToken = () => {
  const [token, setToken] = useState("");
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState("granted");

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        if (typeof window !== "undefined" && "serviceWorker" in navigator) {
          const messaging = getMessaging(firebaseApp);

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
      } catch (error) {
        console.log("Error retrieving token:", error);
      }
    };

    retrieveToken();
  }, [notificationPermissionStatus]);

  return { token, notificationPermissionStatus };
};

export default useFcmToken;
