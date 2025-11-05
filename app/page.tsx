import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Share2, Sparkles, Users, Gauge, Cpu } from "lucide-react"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            LaunchPost
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Get Started Free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Trusted by creators worldwide</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-balance">
            Repurpose Your Content
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {" "}
              Instantly
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Transform your best ideas into optimized posts for every platform. Get AI-powered content repurposing that
            works in seconds, not hours. Free tier includes 5 generations per day.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/signup">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-secondary bg-transparent"
              >
                Learn More
              </Button>
            </Link>
          </div>

          <div className="pt-8 text-sm text-muted-foreground">
            No credit card required • 5 free generations daily • Access all features
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">10x</div>
            <p className="text-muted-foreground">Faster content creation</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">5+</div>
            <p className="text-muted-foreground">Platform integrations</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">AI</div>
            <p className="text-muted-foreground">Powered optimization</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-balance">Everything you need to scale your content</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed for modern creators and solopreneurs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-colors group">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Repurposing</h3>
              <p className="text-muted-foreground">
                Transform one piece of content into perfectly optimized posts for X, LinkedIn, Instagram, TikTok, and
                newsletters. Each platform gets tailored formatting and messaging.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-colors group">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Vibe Changer</h3>
              <p className="text-muted-foreground">
                Instantly adjust your tone from professional to casual, formal to playful. Keep your core message while
                adapting your voice for different audiences and contexts.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-colors group">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                <Share2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Public Bio Page</h3>
              <p className="text-muted-foreground">
                Share your best content with a beautiful, link-in-bio landing page. Showcase your personality and direct
                followers to your best work.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-colors group">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                <Gauge className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Drafts Manager</h3>
              <p className="text-muted-foreground">
                Store and organize all your generated content in one place. Preview, edit, and prepare posts for
                publishing across multiple platforms simultaneously.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-colors group">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                <Cpu className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Free AI Models</h3>
              <p className="text-muted-foreground">
                Powered by multiple free AI models with automatic fallback. If one fails, we instantly try another to
                ensure reliability.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-colors group">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Google Authentication</h3>
              <p className="text-muted-foreground">
                Sign up and login with your Google account. Fast, secure, and no password to remember. Your account is
                ready in seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground">Start free and upgrade as you grow</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-12 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
                <p className="text-muted-foreground">Perfect for trying LaunchPost</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-primary">$0</div>
                <div className="text-sm text-muted-foreground">Forever free</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground">5 content generations per day</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground">All 5 platforms (X, LinkedIn, Instagram, TikTok, Newsletter)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground">Vibe Changer tool with 5 tone options</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground">Public bio page and link-in-bio</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground">Drafts manager and content history</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground">Google and email authentication</span>
              </div>
            </div>

            <Link href="/signup" className="block">
              <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Premium plans coming soon for unlimited generations
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">Three simple steps to repurpose your content</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                1
              </div>
              <h3 className="text-xl font-semibold">Write or Paste</h3>
              <p className="text-muted-foreground">
                Enter your original content, blog post, article, or idea into LaunchPost
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                2
              </div>
              <h3 className="text-xl font-semibold">Choose Platforms & Vibe</h3>
              <p className="text-muted-foreground">
                Select which social platforms you want to target and your desired tone
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                3
              </div>
              <h3 className="text-xl font-semibold">Generate & Share</h3>
              <p className="text-muted-foreground">
                AI instantly creates platform-specific posts ready to publish or edit
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-3xl mx-auto text-center space-y-8 bg-gradient-to-b from-primary/10 to-transparent rounded-2xl p-12">
          <h2 className="text-4xl font-bold text-balance">Ready to transform your content?</h2>
          <p className="text-lg text-muted-foreground">
            Join creators and solopreneurs who are saving hours on content repurposing every week. Start free with 5
            daily generations.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
              Start Your Free Trial <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">What's included in the free plan?</h3>
              <p className="text-muted-foreground">
                The free plan includes 5 content generations per day, access to all 5 platforms, vibe changer tool,
                public bio page, and full drafts management.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">How does the daily limit work?</h3>
              <p className="text-muted-foreground">
                You get 5 free generations per day. The counter resets at midnight UTC. Each generation counts as one
                use, regardless of how many platforms you repurpose to.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Can I edit the AI-generated content?</h3>
              <p className="text-muted-foreground">
                Yes! All generated content can be edited before saving to drafts or publishing. You have full control
                over the final output.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Is my data safe?</h3>
              <p className="text-muted-foreground">
                Your content is stored securely in Firebase with industry-standard encryption. We never sell or share
                your data.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">What happens if an AI model fails?</h3>
              <p className="text-muted-foreground">
                We use multiple free AI models with automatic fallback. If one fails, we instantly try another model to
                ensure your content generation succeeds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="text-sm text-muted-foreground">© 2025 LaunchPost. All rights reserved.</div>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
