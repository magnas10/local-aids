// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApXRURyFoz5TFRKWB2OAbUB3U6NiLjMTQ",
  authDomain: "local-aid-dcbca.firebaseapp.com",
  projectId: "local-aid-dcbca",
  storageBucket: "local-aid-dcbca.firebasestorage.app",
  messagingSenderId: "749127837556",
  appId: "1:749127837556:web:2665fe07afb77d8f06ae21",
  measurementId: "G-BSK841FW70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
