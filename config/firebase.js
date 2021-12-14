import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2zKC_VtvqFgSA1msE3GBFRItqOEZcX3E",
  authDomain: "college-hawk-dev.firebaseapp.com",
  projectId: "college-hawk-dev",
  storageBucket: "college-hawk-dev.appspot.com",
  messagingSenderId: "533364086085",
  appId: "1:533364086085:web:bdb0c1112cfdd0d82f9a2c",
  measurementId: "G-94X3SH8BFM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

module.exports = app;