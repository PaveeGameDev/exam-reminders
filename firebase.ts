// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "exam-reminders.firebaseapp.com",
  projectId: "exam-reminders",
  storageBucket: "exam-reminders.appspot.com",
  messagingSenderId: "40646740550",
  appId: "1:40646740550:web:17c7e034216656f5d41847",
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);
