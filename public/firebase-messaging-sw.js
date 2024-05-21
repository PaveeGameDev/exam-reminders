importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js",
);
//
import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

const firebaseConfig = {
  apiKey: "AIzaSyBVtefQB3xj4nabuokHI3qmJl8bfLGrirQ",
  authDomain: "exam-reminders.firebaseapp.com",
  projectId: "exam-reminders",
  storageBucket: "exam-reminders.appspot.com",
  messagingSenderId: "40646740550",
  appId: "1:40646740550:web:683e833259dc76cad41847",
  measurementId: "G-FLF8CZGR1R",
};
//
// // Initialize the Firebase app in the service worker by passing in
// // your app's Firebase config object.
const firebaseApp = initializeApp(firebaseConfig);
//
// // Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = getMessaging(firebaseApp);
//
// // Handle background messages.
onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  );

  // Customize notification here
  const notificationTitle =
    payload.notification.title || "Background Message Title";
  const notificationOptions = {
    body: payload.notification.body || "Background message body.",
    icon: payload.notification.icon || "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
