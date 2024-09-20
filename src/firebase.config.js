// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDC0b-gatW2Sj7Z5qrEOFVXeUOez_ilLcQ",
  authDomain: "annual-report-portal-43c19.firebaseapp.com",
  databaseUrl: "https://annual-report-portal-43c19-default-rtdb.firebaseio.com/",
  projectId: "annual-report-portal-43c19",
  storageBucket: "annual-report-portal-43c19.appspot.com",
  messagingSenderId: "1048754300124",
  appId: "1:1048754300124:web:5c25ae124b6baf35b04019",
  measurementId: "G-9BEL9WTF82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getDatabase(app)
export const auth = getAuth(app)