
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAe9VHyxJKjus-M4XrimththsB-RqQEm1Q",
  authDomain: "formm-a3286.firebaseapp.com",
  projectId: "formm-a3286",
  storageBucket: "formm-a3286.appspot.com",
  messagingSenderId: "630789125719",
  appId: "1:630789125719:web:7e3844ef541d9f18d1d512"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default auth;