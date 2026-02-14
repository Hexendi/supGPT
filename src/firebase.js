import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqWsfZYv1nCAHipZUcNe8jIjLSbyFPn5E",
  authDomain: "databasetest-ad78c.firebaseapp.com",
  projectId: "databasetest-ad78c",
  storageBucket: "databasetest-ad78c.firebasestorage.app",
  messagingSenderId: "336846465166",
  appId: "1:336846465166:web:a3eb40c0602e7de73341df",
  
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };