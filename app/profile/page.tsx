"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useProfile } from "@/lib/profile-store"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Copy, ExternalLink } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { profile, updateProfile } = useProfile()

  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("")
  const [twitter, setTwitter] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [website, setWebsite] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    if (profile) {
      setUsername(profile.username)
      setBio(profile.bio)
      setTwitter(profile.links?.twitter || "")
      setLinkedin(profile.links?.linkedin || "")
      setWebsite(profile.links?.website || "")
    } else {
      setUsername(user.email.split("@")[0])
    }
  }, [user, profile, router])

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  const handleSave = () => {
    updateProfile({
      userId: user?.id || "",
      username,
      bio,
      links: { twitter, linkedin, website },
    })
  }

  const bioUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/bio/${username}`

  const handleCopy = () => {
    navigator.clipboard.writeText(bioUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!user) return null

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header user={user} onLogout={handleLogout} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-2">Your Public Profile</h1>
        <p className="text-muted-foreground mb-12">Customize your link-in-bio page</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 bg-card border border-border rounded-lg p-8 space-y-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-semibold mb-2">Username</label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                placeholder="your-username"
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
              <p className="text-xs text-muted-foreground mt-1">Your profile URL: /bio/{username}</p>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-semibold mb-2">Bio</label>
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell visitors about yourself..."
                className="min-h-24 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="font-semibold">Social Links</h3>

              <div>
                <label className="block text-sm text-muted-foreground mb-1">Twitter/X</label>
                <Input
                  type="text"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  placeholder="@username"
                  className="bg-secondary border-border text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-1">LinkedIn</label>
                <Input
                  type="text"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="linkedin.com/in/username"
                  className="bg-secondary border-border text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-1">Website</label>
                <Input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yoursite.com"
                  className="bg-secondary border-border text-foreground"
                />
              </div>
            </div>

            {/* Save Button */}
            <Button onClick={handleSave} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6">
              Save Profile
            </Button>
          </div>

          {/* Preview */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-6">
              <h3 className="font-semibold mb-4">Profile Link</h3>

              <div className="bg-secondary rounded-lg p-4 mb-4 flex items-center justify-between gap-2">
                <code className="text-sm font-mono text-primary truncate">{bioUrl}</code>
              </div>

              <Button
                onClick={handleCopy}
                variant="outline"
                className="w-full border-border text-foreground hover:bg-secondary mb-2 bg-transparent"
              >
                <Copy className="w-4 h-4 mr-2" />
                {copied ? "Copied!" : "Copy Link"}
              </Button>

              <a href={`/bio/${username}`} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="w-full border-border text-foreground hover:bg-secondary bg-transparent"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </a>

              <div className="mt-6 pt-6 border-t border-border space-y-3">
                <p className="text-xs text-muted-foreground">Share your best content with a beautiful landing page</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
