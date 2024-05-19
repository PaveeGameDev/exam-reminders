importScripts(
  "https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js",
);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVtefQB3xj4nabuokHI3qmJl8bfLGrirQ",
  authDomain: "exam-reminders.firebaseapp.com",
  projectId: "exam-reminders",
  storageBucket: "exam-reminders.appspot.com",
  messagingSenderId: "40646740550",
  appId: "1:40646740550:web:683e833259dc76cad41847",
  measurementId: "G-FLF8CZGR1R",
};

onBackgroundMessage(messaging, (payload) => {
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

// class CustomPushEvent extends Event {
//   constructor(data) {
//     super("push");
//
//     Object.assign(this, data);
//     this.custom = true;
//   }
// }
//
// /*
//  * Overrides push notification data, to avoid having 'notification' key and firebase blocking
//  * the message handler from being called
//  */
// self.addEventListener("push", (e) => {
//   // Skip if event is our own custom event
//   if (e.custom) return;
//
//   // Kep old event data to override
//   const oldData = e.data;
//
//   // Create a new event to dispatch, pull values from notification key and put it in data key,
//   // and then remove notification key
//   const newEvent = new CustomPushEvent({
//     data: {
//       ehheh: oldData.json(),
//       json() {
//         const newData = oldData.json();
//         newData.data = {
//           ...newData.data,
//           ...newData.notification,
//         };
//         delete newData.notification;
//         return newData;
//       },
//     },
//     waitUntil: e.waitUntil.bind(e),
//   });
//
//   // Stop event propagation
//   e.stopImmediatePropagation();
//
//   // Dispatch the new wrapped event
//   dispatchEvent(newEvent);
// });
//
// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload,
//   );
//
//   const { title, body, image, icon, ...restPayload } = payload.data;
//   const notificationOptions = {
//     body,
//     icon: image || "/icons/firebase-logo.png", // path to your "fallback" firebase notification logo
//     data: restPayload,
//   };
//   return self.registration.showNotification(title, notificationOptions);
// });
//
self.addEventListener("notificationclick", (event) => {
  if (event?.notification?.data && event?.notification?.data?.link) {
    self.clients.openWindow(event.notification.data.link);
  }

  // close notification after click
  event.notification.close();
});
