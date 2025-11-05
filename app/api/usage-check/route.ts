import { type NextRequest, NextResponse } from "next/server"
import { ref, get } from "firebase/database"
import { database } from "@/lib/firebase"

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 })
    }

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

    const DAILY_LIMIT = 5
    const remaining = Math.max(0, DAILY_LIMIT - generationsUsedToday)

    return NextResponse.json({
      canGenerate: generationsUsedToday < DAILY_LIMIT,
      remaining,
      used: generationsUsedToday,
      limit: DAILY_LIMIT,
    })
  } catch (error) {
    console.error("Error checking usage:", error)
    return NextResponse.json({ error: "Failed to check usage" }, { status: 500 })
  }
}
