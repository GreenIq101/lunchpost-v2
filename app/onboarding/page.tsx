"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const CREATOR_TYPES = ["Blogger", "Podcaster", "YouTuber", "Social Creator", "Entrepreneur"]
const NICHES = ["Tech", "Business", "Lifestyle", "Finance", "Marketing", "Health & Wellness"]
const VIBES = ["Professional", "Casual", "Funny", "Inspirational", "Educational"]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [creatorType, setCreatorType] = useState("")
  const [niche, setNiche] = useState("")
  const [vibe, setVibe] = useState("")
  const router = useRouter()
  const { user, updateUserProfile } = useAuth()

  if (!user) {
    router.push("/login")
    return null
  }

  const handleNext = async () => {
    if (step === 1 && !creatorType) return
    if (step === 2 && !niche) return
    if (step === 3 && !vibe) return

    if (step === 3) {
      await updateUserProfile({ creatorType, niche, vibe })
      router.push("/dashboard")
    } else {
      setStep(step + 1)
    }
  }

  const progressPercentage = (step / 3) * 100

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="text-sm text-muted-foreground">{step}/3</span>
          </div>
          <h1 className="text-4xl font-bold mb-2 text-balance">Personalize Your LaunchPost</h1>
          <p className="text-lg text-muted-foreground">Help us understand your content better</p>
        </div>

        {/* Step 1: Creator Type */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-2xl font-semibold mb-6">What type of creator are you?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CREATOR_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setCreatorType(type)}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    creatorType === type
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        creatorType === type ? "border-primary bg-primary" : "border-border"
                      }`}
                    >
                      {creatorType === type && <CheckCircle2 className="w-4 h-4 text-primary-foreground" />}
                    </div>
                    <span className="font-medium text-lg">{type}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Niche */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-2xl font-semibold mb-6">What's your niche?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {NICHES.map((n) => (
                <button
                  key={n}
                  onClick={() => setNiche(n)}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    niche === n ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        niche === n ? "border-primary bg-primary" : "border-border"
                      }`}
                    >
                      {niche === n && <CheckCircle2 className="w-4 h-4 text-primary-foreground" />}
                    </div>
                    <span className="font-medium text-lg">{n}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Vibe */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-2xl font-semibold mb-6">What's your content vibe?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {VIBES.map((v) => (
                <button
                  key={v}
                  onClick={() => setVibe(v)}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    vibe === v ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        vibe === v ? "border-primary bg-primary" : "border-border"
                      }`}
                    >
                      {vibe === v && <CheckCircle2 className="w-4 h-4 text-primary-foreground" />}
                    </div>
                    <span className="font-medium text-lg">{v}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-4 mt-12">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="flex-1 border-border text-foreground hover:bg-secondary py-6"
            >
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={(step === 1 && !creatorType) || (step === 2 && !niche) || (step === 3 && !vibe)}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-6"
          >
            {step === 3 ? "Get Started" : "Next"} <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </main>
  )
}
