"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useDrafts } from "@/lib/drafts-store"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Zap, AlertCircle } from "lucide-react"

const PLATFORMS = ["x", "linkedin", "instagram", "tiktok", "newsletter"]
const VIBES = ["Professional", "Casual", "Funny", "Inspirational", "Educational"]
const DAILY_LIMIT = 5

export default function RepurposePage() {
  const [originalContent, setOriginalContent] = useState("")
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [selectedVibe, setSelectedVibe] = useState("")
  const [loading, setLoading] = useState(false)
  const [repurposed, setRepurposed] = useState<Record<string, string>>({})
  const [step, setStep] = useState<"input" | "preview">("input")
  const [error, setError] = useState("")
  const [usageRemaining, setUsageRemaining] = useState(DAILY_LIMIT)
  const [usageLoading, setUsageLoading] = useState(true)

  const router = useRouter()
  const { user, logout } = useAuth()
  const { addDraft } = useDrafts()

  useEffect(() => {
    const checkUsage = async () => {
      if (!user) return
      try {
        const response = await fetch(`/api/usage-check?userId=${user.id}`)
        const data = await response.json()
        setUsageRemaining(data.remaining)
      } catch (err) {
        console.error("Error checking usage:", err)
      } finally {
        setUsageLoading(false)
      }
    }
    checkUsage()
  }, [user])

  if (!user) {
    router.push("/login")
    return null
  }

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) => (prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]))
  }

  const handleRepurpose = async () => {
    if (!originalContent || selectedPlatforms.length === 0 || !selectedVibe) return

    if (usageRemaining <= 0) {
      setError("Daily generation limit reached. Come back tomorrow!")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/repurpose", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalContent,
          platforms: selectedPlatforms,
          vibe: selectedVibe,
          userId: user.id,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to repurpose content")
      }

      const data = await response.json()
      setRepurposed(data.repurposedContent)
      setUsageRemaining(data.remaining)
      setStep("preview")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      await addDraft({
        originalContent,
        repurposedContent: repurposed,
        platforms: selectedPlatforms,
        vibe: selectedVibe,
        status: "draft",
      })
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save draft")
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header user={user} onLogout={handleLogout} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {step === "input" ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">Create & Repurpose Content</h1>
                <p className="text-muted-foreground">Transform your ideas into platform-specific posts</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary">{usageRemaining}</div>
                <div className="text-sm text-muted-foreground">Generations left today</div>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-8 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-500">{error}</p>
              </div>
            )}

            <div className="space-y-8">
              {/* Original Content */}
              <div>
                <label className="block text-lg font-semibold mb-3">Your Content</label>
                <Textarea
                  placeholder="Paste or type your original content here..."
                  value={originalContent}
                  onChange={(e) => setOriginalContent(e.target.value)}
                  className="min-h-40 bg-card border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Vibe Selection */}
              <div>
                <label className="block text-lg font-semibold mb-3">Content Vibe</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {VIBES.map((vibe) => (
                    <button
                      key={vibe}
                      onClick={() => setSelectedVibe(vibe)}
                      className={`p-3 rounded-lg border-2 transition-all font-medium ${
                        selectedVibe === vibe
                          ? "border-primary bg-primary/20 text-primary"
                          : "border-border bg-card hover:border-primary/50 text-foreground"
                      }`}
                    >
                      {vibe}
                    </button>
                  ))}
                </div>
              </div>

              {/* Platform Selection */}
              <div>
                <label className="block text-lg font-semibold mb-4">Platforms</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {PLATFORMS.map((platform) => (
                    <button
                      key={platform}
                      onClick={() => togglePlatform(platform)}
                      className={`p-4 rounded-lg border-2 transition-all capitalize font-medium ${
                        selectedPlatforms.includes(platform)
                          ? "border-primary bg-primary/20 text-primary"
                          : "border-border bg-card hover:border-primary/50 text-foreground"
                      }`}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-4 pt-8">
                <Button
                  onClick={() => router.back()}
                  variant="outline"
                  className="flex-1 border-border text-foreground hover:bg-secondary py-6"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleRepurpose}
                  disabled={
                    !originalContent ||
                    selectedPlatforms.length === 0 ||
                    !selectedVibe ||
                    loading ||
                    usageRemaining <= 0 ||
                    usageLoading
                  }
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-6"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  {loading ? "Repurposing..." : usageRemaining <= 0 ? "Limit Reached" : "Repurpose Content"}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-2">Your Repurposed Content</h1>
            <p className="text-muted-foreground mb-12">Review and edit before publishing</p>

            <div className="space-y-6">
              {Object.entries(repurposed).map(([platform, content]) => (
                <div key={platform} className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-3 capitalize text-primary">{platform}</h3>
                  <p className="text-foreground whitespace-pre-wrap bg-secondary rounded p-4 mb-4">{content}</p>
                  <div className="text-sm text-muted-foreground">{content.length} characters</div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-8">
              <Button
                onClick={() => {
                  setStep("input")
                  setRepurposed({})
                }}
                variant="outline"
                className="flex-1 border-border text-foreground hover:bg-secondary py-6"
              >
                Back to Edit
              </Button>
              <Button
                onClick={handleSave}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-6"
              >
                Save to Drafts <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
