import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";
import { getFirestore, collection, doc, getDoc, getDocs, setDoc, updateDoc, addDoc, deleteDoc, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";
import { getMessaging, getToken, onMessage, isSupported } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyBPOPRg9AxDqojhkskOIRO-4AHxvLICP7Q",
  authDomain: "adk-vitrine.firebaseapp.com",
  projectId: "adk-vitrine",
  storageBucket: "adk-vitrine.firebasestorage.app",
  messagingSenderId: "907323574295",
  appId: "1:907323574295:web:4dd20633922364c5903452",
  measurementId: "G-E5KSD303HQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const getMessagingInstance = async () => {
  try {
    const supported = await isSupported();
    if (supported) {
      return getMessaging(app);
    }
  } catch (err) {
    console.warn("Erreur lors de la vérification de Firebase Messaging:", err);
  }
  return null;
};

export { 
  app, auth, db, getMessagingInstance,
  signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail, createUserWithEmailAndPassword,
  collection, doc, getDoc, getDocs, setDoc, updateDoc, addDoc, deleteDoc, query, where, onSnapshot,
  getToken, onMessage
};
