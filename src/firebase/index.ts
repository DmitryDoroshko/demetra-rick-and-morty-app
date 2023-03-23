import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDitHuxLclc1fmpTEMveS8iDRs2nxonKs4",
  authDomain: "rick-and-morty-5e99a.firebaseapp.com",
  projectId: "rick-and-morty-5e99a",
  storageBucket: "rick-and-morty-5e99a.appspot.com",
  messagingSenderId: "176670627021",
  appId: "1:176670627021:web:7013e046470e0193a88584",
  measurementId: "G-PZ06WWNZY9"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
