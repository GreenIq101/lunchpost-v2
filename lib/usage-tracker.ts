import { ref, get, update } from "firebase/database"
import { database } from "./firebase"

const DAILY_LIMIT = 5

export async function checkUsageLimit(userId: string): Promise<{ canGenerate: boolean; remaining: number }> {
  const userRef = ref(database, `users/${userId}`)
  const snapshot = await get(userRef)
  const userData = snapshot.val()

  const today = new Date().toISOString().split("T")[0]
  const lastGenerationDate = userData?.lastGenerationDate

  let generationsUsedToday = userData?.generationsUsedToday || 0

  // Reset counter if date changed
  if (lastGenerationDate !== today) {
    generationsUsedToday = 0
  }

  const canGenerate = generationsUsedToday < DAILY_LIMIT
  const remaining = Math.max(0, DAILY_LIMIT - generationsUsedToday)

  return { canGenerate, remaining }
}

export async function incrementUsage(userId: string): Promise<void> {
  const userRef = ref(database, `users/${userId}`)
  const snapshot = await get(userRef)
  const userData = snapshot.val()

  const today = new Date().toISOString().split("T")[0]
  const lastGenerationDate = userData?.lastGenerationDate

  let generationsUsedToday = userData?.generationsUsedToday || 0

  // Reset counter if date changed
  if (lastGenerationDate !== today) {
    generationsUsedToday = 0
  }

  await update(userRef, {
    generationsUsedToday: generationsUsedToday + 1,
    lastGenerationDate: today,
  })
}
