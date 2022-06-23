import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/storage"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBYbxxSMMHqcE8stMeprQfYfhfrKufbyJ4",
  authDomain: "picturesposting-app.firebaseapp.com",
  projectId: "picturesposting-app",
  storageBucket: "picturesposting-app.appspot.com",
  messagingSenderId: "42620638643",
  appId: "1:42620638643:web:840ab0c7675670c95927c6",
  measurementId: "G-VP2BXR057V"
};
    

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

// export { db, auth ,storage};




// import { initializeApp } from "firebase/app";
// import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyBYbxxSMMHqcE8stMeprQfYfhfrKufbyJ4",
//   authDomain: "picturesposting-app.firebaseapp.com",
//   projectId: "picturesposting-app",
//   storageBucket: "picturesposting-app.appspot.com",
//   messagingSenderId: "42620638643",
//   appId: "1:42620638643:web:840ab0c7675670c95927c6",
//   measurementId: "G-VP2BXR057V"
// };

// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// export const auth = firebase.auth();

