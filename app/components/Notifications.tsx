"use client";

import { useEffect, useState } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";

type Props = {
  FB_API_KEY: string;
  FB_measurement_id: string;
};

export default function Notifications({
  FB_API_KEY,
  FB_measurement_id,
}: Props) {
  const [token, setToken] = useState("");
  const [moreInfo, setMoreInfo] = useState<string>("");

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

  // Initialize Firebase
  const firebaseApp = initializeApp({
    apiKey: FB_API_KEY,
    authDomain: "exam-reminders.firebaseapp.com",
    projectId: "exam-reminders",
    storageBucket: "exam-reminders.appspot.com",
    messagingSenderId: "40646740550",
    appId: "1:40646740550:web:17c7e034216656f5d41847",
    measurementId: FB_measurement_id,
  });

  const requestNotifications = async () => {
    requestPermission();
    setTimeout(() => {
      waitForToken();
    }, 1000);
  };

  function requestPermission() {
    console.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
      }
    });
  }

  const waitForToken = () => {
    const messaging = getMessaging(firebaseApp);
    getToken(messaging, {
      vapidKey: process.env.VAPID_KEY,
    })
      .then((currentToken) => {
        if (currentToken) {
          setToken(currentToken);
          setMoreInfo(
            "Vše proběhlo v pořádku, od zítřka budeš dostávat oznámení vždy den před testem",
          );
        } else {
          setMoreInfo(
            "Nepovedlo se propojit tvoje zařízení se serverem, máš povolené oznámení od této aplikace?",
          );
          console.log(
            "No registration token available. Request permission to generate one.",
          );
        }
      })
      .catch((err) => {
        setMoreInfo(
          "Nepovedlo se propojit tvoje zařízení se serverem, máš povolené oznámení od této aplikace?",
        );
        console.warn(`An error occurred while retrieving token. \n ${err}`);
      });
  };

  return (
    <div className="card bg-base-200 shadow-xl border border-gray-300 flex items-center justify-center">
      <div className="card-body text-center flex items-center">
        <h2 className="card-title justify-center w-full">Aktivuj notifikace</h2>
        <p>
          Budeš dostávat notifikace jeden den před tvým testem/úkolem a nikdy na
          nic už nezapomeneš.
        </p>
        <button
          onClick={requestNotifications}
          className="btn btn-primary mt-5 w-full max-w-xs"
        >
          Aktivovat notifikace
        </button>
        <p className="break-all w-60">{token}</p>
        <p className="break-words w-60">{moreInfo}</p>
      </div>
    </div>
  );
}
