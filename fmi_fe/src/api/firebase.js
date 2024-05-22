import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCty8PZzUdb8C8xVb6DvRxXYxk-NjcrG70",
  authDomain: "fmi-project-e3816.firebaseapp.com",
  projectId: "fmi-project-e3816",
  storageBucket: "fmi-project-e3816.appspot.com",
  messagingSenderId: "220788804101",
  appId: "1:220788804101:web:0d3130069755703140ea6c",
  measurementId: "G-TLT1ND8PPQ",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
