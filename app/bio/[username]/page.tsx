"use client"

import { useEffect, useState } from "react"
import { useProfile } from "@/lib/profile-store"
import { Button } from "@/components/ui/button"
import { useDrafts } from "@/lib/drafts-store"
import { ExternalLink, Twitter, Linkedin } from "lucide-react"

export default function PublicBioPage({ params }: { params: { username: string } }) {
  const { getProfileByUsername } = useProfile()
  const { drafts } = useDrafts()
  const [profile, setProfile] = useState<any>(null)
  const [publishedContent, setPublishedContent] = useState<any[]>([])

  useEffect(() => {
    const found = getProfileByUsername(params.username)
    setProfile(found)

    if (found) {
      // Get published content for this user
      const published = drafts.filter((d) => d.status === "published").slice(0, 6)
      setPublishedContent(published)
    }
  }, [params.username, getProfileByUsername, drafts])

  if (!profile) {
    return (
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Profile Not Found</h1>
          <p className="text-muted-foreground mb-8">This link-in-bio page doesn't exist or has been removed.</p>
          <a href="/">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Back to Home</Button>
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-6 flex items-center justify-center">
            <span className="text-4xl font-bold text-primary-foreground">
              {profile.username.charAt(0).toUpperCase()}
            </span>
          </div>

          {/* Name & Bio */}
          <h1 className="text-4xl font-bold mb-3">{profile.username}</h1>
          <p className="text-lg text-muted-foreground mb-8 whitespace-pre-wrap">{profile.bio}</p>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-8">
            {profile.links?.twitter && (
              <a
                href={`https://twitter.com/${profile.links.twitter.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="border-border text-foreground hover:bg-secondary bg-transparent"
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </Button>
              </a>
            )}
            {profile.links?.linkedin && (
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-border text-foreground hover:bg-secondary bg-transparent"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
              </a>
            )}
            {profile.links?.website && (
              <a href={profile.links.website} target="_blank" rel="noopener noreferrer">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-border text-foreground hover:bg-secondary bg-transparent"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Website
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Published Content */}
        {publishedContent.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Featured Content</h2>
            <div className="grid gap-4">
              {publishedContent.map((post) => (
                <div
                  key={post.id}
                  className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
                >
                  <p className="text-foreground mb-3">{post.originalContent}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.platforms.map((p: string) => (
                      <span key={p} className="bg-primary/20 text-primary text-xs px-3 py-1 rounded-full capitalize">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8 text-center">
        <p className="text-sm text-muted-foreground mb-3">Created with LaunchPost</p>
        <a href="/" className="text-primary hover:underline">
          Get your own link-in-bio
        </a>
      </footer>
    </main>
  )
}
