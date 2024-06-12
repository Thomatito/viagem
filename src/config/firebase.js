import { initializeApp } from "firebase/app";
 import { getAuth } from "firebase/auth"; 
 import { getFirestore } from "firebase/firestore";

 const firebaseConfig = {
    apiKey: "AIzaSyD2gpKKu84Wg5bUHy-A78pNgLrBezfBPB8",
    authDomain: "viagem-e6790.firebaseapp.com",
    projectId: "viagem-e6790",
    storageBucket: "viagem-e6790.appspot.com",
    messagingSenderId: "1022155659881",
    appId: "1:1022155659881:web:0f78e369ba386e342d20f8"
  };
  

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);