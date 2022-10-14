// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCYGUo9wppqx8mDng3zKMuTTmL3-NDqh9s",
  authDomain: "zhuan-restaurant.firebaseapp.com",
  databaseURL:
    "https://zhuan-restaurant-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "zhuan-restaurant",
  storageBucket: "zhuan-restaurant.appspot.com",
  messagingSenderId: "638997146558",
  appId: "1:638997146558:web:29fd804b5671cb9b4c67ef",
  measurementId: "G-L6HZYTM4VB",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
