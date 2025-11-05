import { type NextRequest, NextResponse } from "next/server"
import { ref, get, update } from "firebase/database"
import { database } from "@/lib/firebase"

const OPENROUTER_API_URL = "https://openrouter.io/api/v1/chat/completions"
const OPENROUTER_API_KEY =
  process.env.OPENROUTER_API_KEY || "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"

// const AI_MODELS = ["openai/gpt-3.5-turbo", "meta-llama/llama-2-70b-chat", "anthropic/claude-3-haiku"]

const AI_MODELS = [
  // 🔹 OpenAI Family (fast + reliable)
  "openai/gpt-3.5-turbo",
  "openai/gpt-4o-mini",

  // 🔹 Meta (open-weight LLaMA models)
  "meta-llama/llama-2-70b-chat",
  "meta-llama/llama-3-70b-instruct",

  // 🔹 Anthropic (creative + safe output)
  "anthropic/claude-3-haiku",
  "anthropic/claude-3-opus",

  // 🔹 Mistral (free + good reasoning)
  "mistralai/mixtral-8x7b",
  "mistralai/mistral-7b-instruct",

  // 🔹 Google Gemini (balanced tone)
  "google/gemini-1.5-flash",

  // 🔹 Cohere (short-form text & hooks)
  "cohere/command-r-plus",

  // 🔹 Falcon (fast, open-source)
  "tiiuae/falcon-180b-chat",

  // 🔹 OpenRouter’s free sandbox
  "openrouter/free-tier"
]


async function generateWithModel(
  model: string,
  prompt: string,
): Promise<{ success: boolean; content?: string; error?: string }> {
  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.VERCEL_URL || "http://localhost:3000",
        "X-Title": "LaunchPost",
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    })

    if (!response.ok) {
      return { success: false, error: `Model ${model} failed` }
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content

    if (!content) {
      return { success: false, error: `No content from ${model}` }
    }

    return { success: true, content }
  } catch (error) {
    return { success: false, error: `Error with ${model}: ${error}` }
  }
}

async function incrementUsage(userId: string): Promise<number> {
  const userRef = ref(database, `users/${userId}`)
  const snapshot = await get(userRef)
  const userData = snapshot.val()

  const today = new Date().toISOString().split("T")[0]
  const lastGenerationDate = userData?.lastGenerationDate

  let generationsUsedToday = userData?.generationsUsedToday || 0

  if (lastGenerationDate !== today) {
    generationsUsedToday = 0
  }

  const newCount = generationsUsedToday + 1
  await update(userRef, {
    generationsUsedToday: newCount,
    lastGenerationDate: today,
  })

  const DAILY_LIMIT = 5
  return Math.max(0, DAILY_LIMIT - newCount)
}

export async function POST(request: NextRequest) {
  try {
    const { originalContent, platforms, vibe, userId } = await request.json()

    if (!originalContent || !platforms || !vibe) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (userId) {
      const userRef = ref(database, `users/${userId}`)
      const snapshot = await get(userRef)
      const userData = snapshot.val()

      const today = new Date().toISOString().split("T")[0]
      const lastGenerationDate = userData?.lastGenerationDate
      let generationsUsedToday = userData?.generationsUsedToday || 0

      if (lastGenerationDate !== today) {
        generationsUsedToday = 0
      }

      const DAILY_LIMIT = 5
      if (generationsUsedToday >= DAILY_LIMIT) {
        return NextResponse.json({ error: "Daily generation limit reached. Come back tomorrow!" }, { status: 429 })
      }
    }

    const platformList = platforms.join(", ")
    const prompt = `You are a content repurposing expert. Transform the following content into optimized posts for: ${platformList}. 
    
Use a "${vibe}" tone for all posts.

Original content: "${originalContent}"

Provide the repurposed content in JSON format like this (no markdown code blocks):
{
  "x": "your x post here (max 280 chars)",
  "linkedin": "your linkedin post here (max 500 chars)",
  "instagram": "your instagram caption here (max 2200 chars)",
  "tiktok": "your tiktok description here (max 200 chars)",
  "newsletter": "your newsletter section here (max 800 chars)"
}

Only include the platforms requested. Keep each platform's character limit in mind.`

    let repurposedContent = null
    let lastError = ""

    for (const model of AI_MODELS) {
      const result = await generateWithModel(model, prompt)
      if (result.success && result.content) {
        try {
          const parsed = JSON.parse(result.content)
          repurposedContent = parsed
          break
        } catch (e) {
          const jsonMatch = result.content.match(/\{[\s\S]*\}/)
          if (jsonMatch) {
            try {
              repurposedContent = JSON.parse(jsonMatch[0])
              break
            } catch (e) {
              lastError = `Failed to parse response from ${model}`
            }
          }
        }
      } else {
        lastError = result.error || "Unknown error"
      }
    }

    if (!repurposedContent) {
      return NextResponse.json({ error: `All AI models failed. Last error: ${lastError}` }, { status: 500 })
    }

    const filtered: Record<string, string> = {}
    platforms.forEach((platform: string) => {
      if (repurposedContent[platform]) {
        filtered[platform] = repurposedContent[platform]
      }
    })

    let remaining = 5
    if (userId) {
      remaining = await incrementUsage(userId)
    }

    return NextResponse.json({ repurposedContent: filtered, remaining })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
