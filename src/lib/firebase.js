// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrCwTR2Qg98Lbr1qejfll2k01vCP77Lm4",
  authDomain: "react-app-ifaz.firebaseapp.com",
  databaseURL: "https://react-app-ifaz-default-rtdb.firebaseio.com",
  projectId: "react-app-ifaz",
  storageBucket: "react-app-ifaz.appspot.com",
  messagingSenderId: "709318665389",
  appId: "1:709318665389:web:780f83899d8faf02095224",
  measurementId: "G-5T15RJ4FHD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const signIn = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject)
  })
}

export const signOut = () => {
  return auth.signOut();
}

export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider)
}

export const signInWithGithub = () => {
  return signInWithPopup(auth, githubProvider)
}

export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email)
}