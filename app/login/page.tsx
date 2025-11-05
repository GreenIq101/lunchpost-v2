"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"
import { ArrowRight, Mail, Lock, Loader2, Chrome } from "lucide-react"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "@/lib/firebase" // 👈 Make sure you have firebase initialized

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { login } = useAuth()

  // 🧠 Email/password login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      if (!email || !password) {
        setError("Email and password are required.")
        return
      }

      await login(email, password)
      router.push("/dashboard")
    } catch (err: any) {
      console.error(err)
      setError("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // 🔹 Google Sign-In
  const handleGoogleLogin = async () => {
    setError("")
    setLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      if (result.user) {
        router.push("/dashboard")
      }
    } catch (err: any) {
      console.error(err)
      setError("Google sign-in failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            LaunchPost
          </h1>
          <p className="text-muted-foreground mt-2">Welcome back</p>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-xl p-8 space-y-6 shadow-lg">
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/50 rounded-lg p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base font-semibold"
            >
              {loading ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : "Sign In"}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </form>

          {/* Google Sign-In */}
          <Button
            variant="outline"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center border-border text-foreground hover:bg-secondary"
          >
            <Chrome className="mr-2 w-5 h-5" /> Sign in with Google
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">No account yet?</span>
            </div>
          </div>

          {/* Signup Link */}
          <Link href="/signup">
            <Button
              variant="outline"
              className="w-full border-border text-foreground hover:bg-secondary bg-transparent"
            >
              Create Account
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <Link href="#" className="text-sm text-primary hover:underline">
            Forgot your password?
          </Link>
        </div>
      </div>
    </main>
  )
}
