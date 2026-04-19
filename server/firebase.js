
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_BASE_API,
  authDomain:  import.meta.env.VITE_AUTH_DOMAIN,
  projectId:  import.meta.env.VITE_PRO_ID,
  storageBucket:  import.meta.env.VITE_STORAGE_BUCK,
  messagingSenderId:  import.meta.env.VITE_MSG_ID,
  appId:  import.meta.env.VITE_APP_ID,
  
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
