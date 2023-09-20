import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyBPAa0oSbTzBzFqGl0nVOgyXM4TaQCJjUc",
//   authDomain: "linkedin-clone-f24bd.firebaseapp.com",
//   projectId: "linkedin-clone-f24bd",
//   storageBucket: "linkedin-clone-f24bd.appspot.com",
//   messagingSenderId: "27074203400",
//   appId: "1:27074203400:web:65583c1f7a58a8fa85a6bd",
// };
const firebaseConfig = {
  apiKey: "AIzaSyB530nncNPoTQwf6Jlf8qo6iBCAyuCYnOo",
  authDomain: "linkedin-app-993dc.firebaseapp.com",
  projectId: "linkedin-app-993dc",
  storageBucket: "linkedin-app-993dc.appspot.com",
  messagingSenderId: "294533967962",
  appId: "1:294533967962:web:555425c600ef04b485a863",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };
