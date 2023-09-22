import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyB530nncNPoTQwf6Jlf8qo6iBCAyuCYnOo",
//   authDomain: "linkedin-app-993dc.firebaseapp.com",
//   projectId: "linkedin-app-993dc",
//   storageBucket: "linkedin-app-993dc.appspot.com",
//   messagingSenderId: "294533967962",
//   appId: "1:294533967962:web:555425c600ef04b485a863"
// };
const firebaseConfig = {
  apiKey: "AIzaSyAiNJOKsSNwT9Fpu_QyPrnPCqmO3g0v9GE",
  authDomain: "skyapp-99901.firebaseapp.com",
  projectId: "skyapp-99901",
  storageBucket: "skyapp-99901.appspot.com",
  messagingSenderId: "804424849484",
  appId: "1:804424849484:web:25b47ae975d81193267ce9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
