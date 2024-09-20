// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDC0b-gatW2Sj7Z5qrEOFVXeUOez_ilLcQ",
  authDomain: "annual-report-portal-43c19.firebaseapp.com",
  projectId: "annual-report-portal-43c19",
  storageBucket: "annual-report-portal-43c19.appspot.com",
  messagingSenderId: "1048754300124",
  appId: "1:1048754300124:web:5c25ae124b6baf35b04019",
  measurementId: "G-9BEL9WTF82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);