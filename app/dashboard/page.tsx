"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useDrafts } from "@/lib/drafts-store"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Plus, Zap, FileText, Eye, Trash2, Sparkles } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { drafts, deleteDraft } = useDrafts()

  if (!user) {
    router.push("/login")
    return null
  }

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  const recentDrafts = drafts.slice(0, 5)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header user={user} onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground text-lg">
            {user.niche ? `You're ready to repurpose content in ${user.niche}` : "Let's create some amazing content"}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <Link href="/repurpose">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base font-semibold justify-start">
              <Plus className="w-5 h-5 mr-2" />
              Create New Content
            </Button>
          </Link>
          <Link href="/vibe-changer">
            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-base font-semibold justify-start">
              <Sparkles className="w-5 h-5 mr-2" />
              Vibe Changer
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Drafts</p>
                <p className="text-3xl font-bold">{drafts.length}</p>
              </div>
              <FileText className="w-10 h-10 text-primary/50" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Published</p>
                <p className="text-3xl font-bold">{drafts.filter((d) => d.status === "published").length}</p>
              </div>
              <Zap className="w-10 h-10 text-primary/50" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Content Variations</p>
                <p className="text-3xl font-bold">
                  {drafts.reduce((acc, d) => acc + Object.keys(d.repurposedContent).length, 0)}
                </p>
              </div>
              <Zap className="w-10 h-10 text-primary/50" />
            </div>
          </div>
        </div>

        {/* Recent Drafts */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-2xl font-bold">Recent Content</h2>
          </div>

          {recentDrafts.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-muted-foreground mb-4">No content yet. Start by creating your first piece!</p>
              <Link href="/repurpose">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Content
                </Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {recentDrafts.map((draft) => (
                <div key={draft.id} className="p-6 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2 line-clamp-2">{draft.originalContent}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="capitalize">
                          {draft.vibe} • {draft.platforms.join(", ")}
                        </span>
                        <span>{new Date(draft.updatedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex gap-2">
                        {draft.platforms.map((p) => (
                          <span key={p} className="bg-primary/20 text-primary text-xs px-2 py-1 rounded">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Link href={`/repurpose/${draft.id}`}>
                        <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive/90"
                        onClick={() => deleteDraft(draft.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
