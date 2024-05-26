importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js",
);

const firebaseConfig = {
  apiKey: "AIzaSyBVtefQB3xj4nabuokHI3qmJl8bfLGrirQ",
  authDomain: "exam-reminders.firebaseapp.com",
  projectId: "exam-reminders",
  storageBucket: "exam-reminders.appspot.com",
  messagingSenderId: "40646740550",
  appId: "1:40646740550:web:683e833259dc76cad41847",
  measurementId: "G-2MVHJ5L6EF",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload,
//   );
//   // Customize notification here
//   const notificationTitle = "Background Message Title";
//   const notificationOptions = {
//     body: "Background Message body.",
//     icon: "/firebase-logo.png",
//   };
//
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
