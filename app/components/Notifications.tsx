"use client";

import { useEffect, useState } from "react";
import { firebaseApp } from "@/firebase";
import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";

export default function Notifications() {
  const [token, setToken] = useState("");
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState("");

  const [moreInfo, setMoreInfo] = useState<string>("no info yet");
  const [permission, setPermission] = useState("no");

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      try {
        const registration = navigator.serviceWorker.register(
          "/firebase-messaging-sw.js",
          {
            scope: "/",
          },
        );
        console.log(
          "Firebase Messaging Service Worker registered with scope:",
          registration,
        );
      } catch (error) {
        console.error(
          "Firebase Messaging Service Worker registration failed:",
          error,
        );
      }
    }
  }, []);

  const firebaseConfig = {
    apiKey: "AIzaSyBVtefQB3xj4nabuokHI3qmJl8bfLGrirQ",
    authDomain: "exam-reminders.firebaseapp.com",
    projectId: "exam-reminders",
    storageBucket: "exam-reminders.appspot.com",
    messagingSenderId: "40646740550",
    appId: "1:40646740550:web:683e833259dc76cad41847",
    measurementId: "G-FLF8CZGR1R",
  };

  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  function requestPermission() {
    console.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
      }
      setPermission(permission);
    });
  }

  const getFMSToken = () => {
    requestPermission();
    setTimeout(() => {
      waitForToken();
    }, 3000);
  };

  const waitForToken = () => {
    const messaging = getMessaging(firebaseApp);

    setMoreInfo(moreInfo + "1");

    getToken(messaging, {
      vapidKey:
        "BBFRkShoUVmOPYX7Q2d4A_z930XDqdkBSliBmd5VxqNeOK-TIIxrOpHWMagwAriRRLK41E6WrYyETBVeq0ghBHk",
    })
      .then((currentToken) => {
        if (currentToken) {
          setMoreInfo(moreInfo + "currentToken" + currentToken);
          console.log(currentToken);
          setToken(currentToken);
        } else {
          // Show permission request UI
          setMoreInfo(
            "No registration token available. Request permission to generate one.",
          );
          // ...
        }
      })
      .catch((err) => {
        setMoreInfo(
          moreInfo + `An error occurred while retrieving token. \n ${err}`,
        );
        // ...
      });
  };

  const retrieveToken = async () => {
    try {
      if (typeof window !== "undefined" && "serviceWorker" in navigator) {
        const messaging = getMessaging(firebaseApp);

        const permission = await Notification.requestPermission();

        console.log(permission);
        setPermission(permission);

        if (permission === "granted") {
          setMoreInfo(moreInfo + "1");
          const currentToken = await getToken(messaging, {
            vapidKey:
              "BBFRkShoUVmOPYX7Q2d4A_z930XDqdkBSliBmd5VxqNeOK-TIIxrOpHWMagwAriRRLK41E6WrYyETBVeq0ghBHk", // Replace with your Firebase project's VAPID key
          });
          setMoreInfo(moreInfo + "currentToken" + currentToken);
          if (currentToken) {
            setToken(currentToken);
          } else {
            setMoreInfo(
              moreInfo +
                "No registration token available. Request permission to generate one.",
            );
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

  const requestNotifications = async () => {
    getFMSToken();
  };

  return (
    <div>
      <div onClick={requestNotifications}>Enable Notifications</div>
      {/*<FcmTokenComp />*/}
      <p className="break-all w-60">{permission}</p>
      <p className="break-all w-60">{moreInfo}</p>
      <p className="break-all w-60">{token}</p>
    </div>
  );
}
