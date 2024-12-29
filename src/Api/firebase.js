// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";


// const firebaseConfig = {
//   apiKey: "AIzaSyDh9XfFYywt-qfFODSHiPmAp8c2akVKmsE",
//   authDomain: "react-firebaase.firebaseapp.com",
//   projectId: "react-firebaase",
//   storageBucket: "react-firebaase.appspot.com",
//   messagingSenderId: "176083411163",
//   appId: "1:176083411163:web:6dd117642cd042d2c82cfe",
//   measurementId: "G-46TW1MQLZ3"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth(app);
// const fireStore = getFirestore(app);

// const storage = getStorage(app);

// export { analytics, auth,fireStore ,storage}


// Import Firebase modules
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



// Firebase configuration object (Replace with your actual configuration)
const firebaseConfig = {
  apiKey: "AIzaSyDh9XfFYywt-qfFODSHiPmAp8c2akVKmsE",
    authDomain: "react-firebaase.firebaseapp.com",
    projectId: "react-firebaase",
    storageBucket: "react-firebaase.appspot.com",
    messagingSenderId: "176083411163",
    appId: "1:176083411163:web:6dd117642cd042d2c82cfe",
    measurementId: "G-46TW1MQLZ3"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const firestore = getFirestore(app);

// Initialize Firebase Storage
const storage = getStorage(app);

// Export Firebase services for use in the app
export { app, auth, firestore, storage };
