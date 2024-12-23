import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC1FUPosLzRegbK-1r0SsBO9BQvAj8q2fg",
  authDomain: "quizwiz-833f1.firebaseapp.com",
  projectId: "quizwiz-833f1",
  storageBucket: "quizwiz-833f1.firebasestorage.app",
  messagingSenderId: "628331135074",
  appId: "1:628331135074:web:80badc958156dc251e113b",
  measurementId: "G-CDHP2JPS64"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { db, analytics, auth};

