"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Zap, AlertCircle } from "lucide-react"

const VIBES = [
  {
    name: "Professional",
    description: "Formal, polished, and business-ready",
    example: "Our latest platform update includes significant performance improvements.",
  },
  {
    name: "Casual",
    description: "Friendly, approachable, and conversational",
    example: "Hey! We just made some cool improvements to the platform. Check it out!",
  },
  {
    name: "Funny",
    description: "Witty, humorous, and entertaining",
    example: "We spent way too much time optimizing performance. You're welcome.",
  },
  {
    name: "Inspirational",
    description: "Motivational, uplifting, and encouraging",
    example: "We're excited to share how we're empowering creators everywhere.",
  },
  {
    name: "Educational",
    description: "Informative, detailed, and instructive",
    example: "Our performance improvements reduce load times by up to 40%. Here's how...",
  },
]

const DAILY_LIMIT = 5

export default function VibChangerPage() {
  const [inputText, setInputText] = useState("")
  const [selectedVibe, setSelectedVibe] = useState<string>("")
  const [transformedText, setTransformedText] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")
  const [usageRemaining, setUsageRemaining] = useState(DAILY_LIMIT)
  const [usageLoading, setUsageLoading] = useState(true)

  const router = useRouter()
  const { user, logout } = useAuth()

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

  const handleTransform = async () => {
    if (!inputText || !selectedVibe) return

    if (usageRemaining <= 0) {
      setError("Daily generation limit reached. Come back tomorrow!")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/vibe-change", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: inputText,
          vibe: selectedVibe,
          userId: user.id,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to transform content")
      }

      const data = await response.json()
      setTransformedText(data.transformedText)
      setUsageRemaining(data.remaining)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(transformedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header user={user} onLogout={handleLogout} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Vibe Changer</h1>
            <p className="text-muted-foreground">Transform your content's tone while keeping the message the same</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vibes Selection */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Choose a Vibe</h2>
            <div className="space-y-3">
              {VIBES.map((vibe) => (
                <button
                  key={vibe.name}
                  onClick={() => {
                    setSelectedVibe(vibe.name)
                    setTransformedText("")
                  }}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedVibe === vibe.name
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <h3
                    className={`font-semibold mb-1 ${selectedVibe === vibe.name ? "text-primary" : "text-foreground"}`}
                  >
                    {vibe.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{vibe.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Main Interface */}
          <div className="lg:col-span-2 space-y-8">
            {/* Input */}
            <div className="bg-card border border-border rounded-lg p-8 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <label className="text-lg font-semibold">Original Content</label>
                <span className="text-sm text-muted-foreground">{inputText.length} characters</span>
              </div>
              <Textarea
                placeholder="Paste your content here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-32 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />

              <Button
                onClick={handleTransform}
                disabled={!inputText || !selectedVibe || loading || usageRemaining <= 0 || usageLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6"
              >
                <Zap className="w-5 h-5 mr-2" />
                {loading ? "Changing Vibe..." : usageRemaining <= 0 ? "Limit Reached" : "Transform with Vibe"}
              </Button>
            </div>

            {/* Output */}
            {transformedText && (
              <div className="bg-card border border-primary/50 rounded-lg p-8 space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-primary">{selectedVibe} Version</h3>
                    <p className="text-sm text-muted-foreground mt-1">Ready to share</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{transformedText.length} characters</span>
                </div>

                <div className="bg-secondary rounded-lg p-4 mb-4">
                  <p className="text-foreground whitespace-pre-wrap">{transformedText}</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleCopy}
                    variant="outline"
                    className="flex-1 border-border text-foreground hover:bg-secondary bg-transparent"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    {copied ? "Copied!" : "Copy Text"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Examples */}
        <div className="mt-16 pt-12 border-t border-border">
          <h2 className="text-2xl font-bold mb-8">See the Difference</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIBES.map((vibe) => (
              <div key={vibe.name} className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold mb-3 text-primary">{vibe.name}</h3>
                <p className="text-sm text-muted-foreground italic bg-secondary rounded p-3">"{vibe.example}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
