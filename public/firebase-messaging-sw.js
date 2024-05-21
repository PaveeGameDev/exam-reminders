importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js",
);
//
import initializeApp from "firebase/app";
import getMessaging from "firebase/messaging/sw";
import onBackgroundMessage from "firebase/messaging/sw";

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

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
