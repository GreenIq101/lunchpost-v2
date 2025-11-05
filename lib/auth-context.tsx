"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth"
import { ref, set, get, update } from "firebase/database"
import { auth, database, googleProvider } from "./firebase"

interface User {
  id: string
  email: string
  name: string
  creatorType?: string
  niche?: string
  vibe?: string
  generationsUsedToday?: number
  lastGenerationDate?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signup: (email: string, password: string, name: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  updateUserProfile: (data: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userRef = ref(database, `users/${firebaseUser.uid}`)
          const snapshot = await get(userRef)
          if (snapshot.exists()) {
            const userData = snapshot.val()
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email || "",
              name: firebaseUser.displayName || userData.name || "",
              creatorType: userData.creatorType,
              niche: userData.niche,
              vibe: userData.vibe,
              generationsUsedToday: userData.generationsUsedToday || 0,
              lastGenerationDate: userData.lastGenerationDate,
            })
          } else {
            // Create user profile if it doesn't exist
            const newUserData = {
              email: firebaseUser.email,
              name: firebaseUser.displayName || "",
              createdAt: new Date().toISOString(),
              generationsUsedToday: 0,
            }
            await set(userRef, newUserData)
            setUser({
              id: firebaseUser.uid,
              ...newUserData,
            })
          }
        } catch (error) {
          console.error("Error fetching user profile:", error)
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signup = async (email: string, password: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const firebaseUser = userCredential.user

    // Update display name
    await updateProfile(firebaseUser, { displayName: name })

    // Store user profile in database
    const userRef = ref(database, `users/${firebaseUser.uid}`)
    await set(userRef, {
      email,
      name,
      createdAt: new Date().toISOString(),
      generationsUsedToday: 0,
    })

    setUser({
      id: firebaseUser.uid,
      email,
      name,
      generationsUsedToday: 0,
    })
  }

  const loginWithGoogle = async () => {
    const userCredential = await signInWithPopup(auth, googleProvider)
    const firebaseUser = userCredential.user

    const userRef = ref(database, `users/${firebaseUser.uid}`)
    const snapshot = await get(userRef)

    if (!snapshot.exists()) {
      // Create new user on first Google login
      await set(userRef, {
        email: firebaseUser.email,
        name: firebaseUser.displayName,
        createdAt: new Date().toISOString(),
        generationsUsedToday: 0,
      })
    }

    const userData = snapshot.val() || {}
    setUser({
      id: firebaseUser.uid,
      email: firebaseUser.email || "",
      name: firebaseUser.displayName || userData.name || "",
      creatorType: userData.creatorType,
      niche: userData.niche,
      vibe: userData.vibe,
      generationsUsedToday: userData.generationsUsedToday || 0,
    })
  }

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const firebaseUser = userCredential.user

    const userRef = ref(database, `users/${firebaseUser.uid}`)
    const snapshot = await get(userRef)
    const userData = snapshot.val()

    setUser({
      id: firebaseUser.uid,
      email: firebaseUser.email || "",
      name: userData?.name || email.split("@")[0],
      generationsUsedToday: userData?.generationsUsedToday || 0,
    })
  }

  const logout = async () => {
    await signOut(auth)
    setUser(null)
  }

  const updateUserProfile = async (data: Partial<User>) => {
    if (user) {
      const userRef = ref(database, `users/${user.id}`)
      await update(userRef, data)
      setUser({ ...user, ...data })
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, loginWithGoogle, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
