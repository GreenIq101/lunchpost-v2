"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

export interface UserProfile {
  userId: string
  username: string
  bio: string
  profileImage?: string
  links: {
    twitter?: string
    linkedin?: string
    website?: string
  }
  theme: "dark" | "light"
}

interface ProfileContextType {
  profile: UserProfile | null
  updateProfile: (data: Partial<UserProfile>) => void
  getProfileByUsername: (username: string) => UserProfile | null
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [allProfiles, setAllProfiles] = useState<UserProfile[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("launchpost_profiles")
    if (stored) {
      setAllProfiles(JSON.parse(stored))
      const currentUser = localStorage.getItem("launchpost_user")
      if (currentUser) {
        const user = JSON.parse(currentUser)
        const userProfile = JSON.parse(stored).find((p: UserProfile) => p.userId === user.id)
        if (userProfile) {
          setProfile(userProfile)
        }
      }
    }
  }, [])

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!profile) return

    const updated = { ...profile, ...data }
    setProfile(updated)

    const updatedProfiles = allProfiles.map((p) => (p.userId === profile.userId ? updated : p))
    if (!allProfiles.some((p) => p.userId === profile.userId)) {
      updatedProfiles.push(updated)
    }

    setAllProfiles(updatedProfiles)
    localStorage.setItem("launchpost_profiles", JSON.stringify(updatedProfiles))
  }

  const getProfileByUsername = (username: string) => {
    return allProfiles.find((p) => p.username === username) || null
  }

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, getProfileByUsername }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error("useProfile must be used within ProfileProvider")
  }
  return context
}
