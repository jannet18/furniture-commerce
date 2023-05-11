import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD2tCH3z1LgLIjCg-zQgZAS4NyxzwOMODc",
  authDomain: "furniture-ecommerce-57a2e.firebaseapp.com",
  projectId: "furniture-ecommerce-57a2e",
  storageBucket: "furniture-ecommerce-57a2e.appspot.com",
  messagingSenderId: "164734847597",
  appId: "1:164734847597:web:b22fa3324d9ebcf2d64d64",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)

export default app;