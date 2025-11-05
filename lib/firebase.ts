import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyCEOBdWW4oP7vb1fagbyPuSi7IKfNwUgY0",
  authDomain: "launchpost-cb02b.firebaseapp.com",
  databaseURL: "https://launchpost-cb02b-default-rtdb.firebaseio.com",
  projectId: "launchpost-cb02b",
  storageBucket: "launchpost-cb02b.firebasestorage.app",
  messagingSenderId: "453089025265",
  appId: "1:453089025265:web:e5fd16efd4d1ab900edd50",
  measurementId: "G-8GX5MNR4QW",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const database = getDatabase(app)
export const googleProvider = new GoogleAuthProvider()

setPersistence(auth, browserLocalPersistence).catch(console.error)
