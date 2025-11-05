"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { ref, push, update, remove, onValue } from "firebase/database"
import { database } from "./firebase"
import { useAuth } from "./auth-context"

export interface ContentDraft {
  id: string
  originalContent: string
  repurposedContent: {
    x?: string
    linkedin?: string
    instagram?: string
    tiktok?: string
    newsletter?: string
  }
  platforms: string[]
  vibe: string
  createdAt: Date
  updatedAt: Date
  status: "draft" | "published"
}

interface DraftsContextType {
  drafts: ContentDraft[]
  addDraft: (draft: Omit<ContentDraft, "id" | "createdAt" | "updatedAt">) => Promise<void>
  updateDraft: (id: string, updates: Partial<ContentDraft>) => Promise<void>
  deleteDraft: (id: string) => Promise<void>
  publishDraft: (id: string) => Promise<void>
  loading: boolean
}

const DraftsContext = createContext<DraftsContextType | undefined>(undefined)

export function DraftsProvider({ children }: { children: React.ReactNode }) {
  const [drafts, setDrafts] = useState<ContentDraft[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      setDrafts([])
      setLoading(false)
      return
    }

    const draftsRef = ref(database, `drafts/${user.id}`)
    const unsubscribe = onValue(draftsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const draftsArray: ContentDraft[] = Object.entries(data).map(([id, draft]: [string, any]) => ({
          ...draft,
          id,
          createdAt: new Date(draft.createdAt),
          updatedAt: new Date(draft.updatedAt),
        }))
        setDrafts(draftsArray.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()))
      } else {
        setDrafts([])
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [user])

  const addDraft = async (draft: Omit<ContentDraft, "id" | "createdAt" | "updatedAt">) => {
    if (!user) return

    const draftsRef = ref(database, `drafts/${user.id}`)
    await push(draftsRef, {
      ...draft,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  }

  const updateDraft = async (id: string, updates: Partial<ContentDraft>) => {
    if (!user) return

    const draftRef = ref(database, `drafts/${user.id}/${id}`)
    await update(draftRef, {
      ...updates,
      updatedAt: new Date().toISOString(),
    })
  }

  const deleteDraft = async (id: string) => {
    if (!user) return

    const draftRef = ref(database, `drafts/${user.id}/${id}`)
    await remove(draftRef)
  }

  const publishDraft = async (id: string) => {
    await updateDraft(id, { status: "published" })
  }

  return (
    <DraftsContext.Provider value={{ drafts, addDraft, updateDraft, deleteDraft, publishDraft, loading }}>
      {children}
    </DraftsContext.Provider>
  )
}

export function useDrafts() {
  const context = useContext(DraftsContext)
  if (!context) {
    throw new Error("useDrafts must be used within DraftsProvider")
  }
  return context
}
