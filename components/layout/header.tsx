"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut, Settings, Sparkles } from "lucide-react"

interface HeaderProps {
  user?: { email: string }
  onLogout?: () => void
}

export function Header({ user, onLogout }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link
          href="/dashboard"
          className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        >
          LaunchPost
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <Link href="/repurpose" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Repurpose
          </Link>
          <Link
            href="/vibe-changer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <Sparkles className="w-4 h-4" />
            Vibe Changer
          </Link>
          <Link href="/profile" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Profile
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {user && (
            <>
              <span className="text-sm text-muted-foreground hidden sm:block">{user.email}</span>
              <Link href="/profile">
                <Button size="sm" variant="ghost" className="text-foreground">
                  <Settings className="w-4 h-4" />
                </Button>
              </Link>
              <Button size="sm" variant="ghost" className="text-foreground" onClick={onLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
