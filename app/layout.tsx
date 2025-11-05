import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { DraftsProvider } from "@/lib/drafts-store"
import { ProfileProvider } from "@/lib/profile-store"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LaunchPost - AI Content Repurposing for Creators",
  description:
    "Transform one piece of content into optimized posts for X, LinkedIn, Instagram, TikTok, and newsletters. Save hours with AI-powered content repurposing.",
  keywords: "content repurposing, AI content, social media, content creation, creators, solopreneurs",
  authors: [{ name: "LaunchPost" }],
  creator: "LaunchPost",
  publisher: "LaunchPost",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://launchpost.space",
    siteName: "LaunchPost",
    title: "LaunchPost - AI Content Repurposing for Creators",
    description:
      "Transform one piece of content into optimized posts for X, LinkedIn, Instagram, TikTok, and newsletters.",
    images: [
      {
        url: "/launchpost-content-repurposing.jpg",
        width: 1200,
        height: 1200,
        alt: "LaunchPost - Content Repurposing Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LaunchPost - AI Content Repurposing for Creators",
    description: "Transform one piece of content into optimized posts for all platforms.",
    images: ["/launchpost-content-repurposing.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "https://launchpost.space",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "LaunchPost",
              applicationCategory: "ContentManagement",
              description: "AI-powered content repurposing platform for creators",
              url: "https://launchpost.space",
              image: "/launchpost.jpg",
              operatingSystem: "Web-based",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "150",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "InStock",
              },
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased bg-background text-foreground`}>
        <AuthProvider>
          <DraftsProvider>
            <ProfileProvider>{children}</ProfileProvider>
          </DraftsProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
