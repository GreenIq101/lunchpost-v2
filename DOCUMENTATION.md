# LaunchPost MVP - Complete Documentation

## Overview

LaunchPost is an AI-powered content repurposing platform that helps creators and solopreneurs transform their best ideas into optimized posts for multiple social media platforms. Built with Next.js, Firebase, and OpenRouter AI.

## Features

### 1. AI-Powered Content Repurposing
- Transform one piece of content into optimized posts for 5+ platforms:
  - X (Twitter)
  - LinkedIn
  - Instagram
  - TikTok
  - Newsletters
- Each platform receives tailored formatting and messaging optimized for its audience
- Supports 5 different content vibes: Professional, Casual, Funny, Inspirational, Educational

### 2. Vibe Changer Tool
- Instantly transform your content's tone while keeping the core message
- 5 available vibes:
  - **Professional**: Formal, polished, business-appropriate
  - **Casual**: Friendly, approachable, conversational
  - **Funny**: Witty, humorous, entertaining
  - **Inspirational**: Motivational, uplifting, encouraging
  - **Educational**: Informative, detailed, instructive

### 3. Onboarding Questionnaire
- Multi-step onboarding process on first signup
- Personalization based on creator type, niche, and content vibe
- Helps tailor AI recommendations and suggestions
- Data saved to Firebase for future reference

### 4. Public Bio Page
- Shareable link-in-bio landing page for each creator
- Display profile information, bio, and social links
- Showcase featured published content
- Beautiful, customizable design

### 5. Drafts Management
- Store and organize all generated content
- Edit content before publishing
- View generation history
- Real-time sync with Firebase

### 6. Daily Usage Limits
- **5 free generations per day** per user
- Counter resets at midnight UTC
- Each generation counts as one use regardless of platform count
- Usage tracked in Firebase Realtime Database

### 7. Authentication
- Email/password signup and login
- **Google OAuth authentication** (Sign in with Google)
- Secure token-based sessions via Firebase Auth
- Profile data persisted in Firebase

### 8. Reliability Features
- **Multiple AI model fallbacks**:
  - Primary: OpenAI GPT-3.5 Turbo
  - Fallback 1: Meta Llama 2 70B Chat
  - Fallback 2: Anthropic Claude 3 Haiku
- Automatic retry with different models if one fails
- Ensures high success rate even during peak usage

## Tech Stack

### Frontend
- **Framework**: Next.js 16+ (App Router)
- **UI**: React 19 with Tailwind CSS v4
- **Components**: Shadcn/ui custom components
- **State Management**: React Context API

### Backend
- **API**: Next.js Route Handlers
- **Authentication**: Firebase Authentication
- **Database**: Firebase Realtime Database
- **AI**: OpenRouter API (multiple models)

### Infrastructure
- **Hosting**: Vercel
- **Analytics**: Vercel Analytics
- **SSL/Security**: Vercel managed

## File Structure

\`\`\`
app/
├── layout.tsx                 # Root layout with SEO metadata
├── page.tsx                   # Landing page (SEO optimized)
├── login/page.tsx            # Email/Google login page
├── signup/page.tsx           # Email/Google signup page
├── onboarding/page.tsx       # Multi-step onboarding questionnaire
├── dashboard/page.tsx        # Main dashboard with stats
├── repurpose/page.tsx        # Content repurposing tool
├── vibe-changer/page.tsx     # Vibe transformation tool
├── bio/[username]/page.tsx   # Public bio page
├── profile/page.tsx          # User profile settings
├── api/
│   ├── repurpose/route.ts    # AI content generation API
│   ├── vibe-change/route.ts  # AI tone transformation API
│   └── usage-check/route.ts  # Daily usage tracking API
├── globals.css               # Global Tailwind CSS configuration
└── analytics/                # Vercel Analytics

components/
├── layout/
│   └── header.tsx            # Navigation header
├── ui/                       # Shadcn/ui components
│   ├── button.tsx
│   ├── input.tsx
│   ├── textarea.tsx
│   └── ...

lib/
├── firebase.ts               # Firebase initialization
├── auth-context.tsx          # Authentication context provider
├── drafts-store.tsx          # Drafts management context
├── profile-store.tsx         # Profile management context
└── usage-tracker.ts          # Usage limit tracking utilities

public/
├── favicon.ico
└── images/                   # Static assets

package.json                  # Dependencies
tsconfig.json                 # TypeScript configuration
next.config.mjs               # Next.js configuration
\`\`\`

## Database Schema (Firebase Realtime Database)

\`\`\`
{
  "users": {
    "{userId}": {
      "email": "user@example.com",
      "name": "User Name",
      "creatorType": "Blogger",
      "niche": "Tech",
      "vibe": "Professional",
      "generationsUsedToday": 3,
      "lastGenerationDate": "2025-01-15",
      "createdAt": "2025-01-15T10:30:00Z",
      "bio": "Brief bio text",
      "socialLinks": {
        "twitter": "https://twitter.com/username",
        "linkedin": "https://linkedin.com/in/username"
      }
    }
  },
  "drafts": {
    "{userId}": {
      "{draftId}": {
        "originalContent": "Original text...",
        "repurposedContent": {
          "x": "Tweet text...",
          "linkedin": "LinkedIn post...",
          "instagram": "Instagram caption...",
          "tiktok": "TikTok description...",
          "newsletter": "Newsletter text..."
        },
        "platforms": ["x", "linkedin", "instagram"],
        "vibe": "Professional",
        "status": "draft",
        "createdAt": "2025-01-15T10:30:00Z",
        "updatedAt": "2025-01-15T10:30:00Z"
      }
    }
  }
}
\`\`\`

## API Endpoints

### POST /api/repurpose
Generate AI-powered content for multiple platforms

**Request:**
\`\`\`json
{
  "originalContent": "Your content here",
  "platforms": ["x", "linkedin", "instagram"],
  "vibe": "Professional",
  "userId": "userId123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "repurposedContent": {
    "x": "Tweet content...",
    "linkedin": "LinkedIn post...",
    "instagram": "Instagram caption..."
  },
  "remaining": 2
}
\`\`\`

### POST /api/vibe-change
Transform content tone

**Request:**
\`\`\`json
{
  "text": "Your text here",
  "vibe": "Casual",
  "userId": "userId123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "transformedText": "Transformed content...",
  "remaining": 2
}
\`\`\`

### GET /api/usage-check
Check remaining daily generations

**Request:**
\`\`\`
GET /api/usage-check?userId=userId123
\`\`\`

**Response:**
\`\`\`json
{
  "canGenerate": true,
  "remaining": 4,
  "used": 1,
  "limit": 5
}
\`\`\`

## Environment Variables

\`\`\`env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCEOBdWW4oP7vb1fagbyPuSi7IKfNwUgY0
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=launchpost-cb02b.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://launchpost-cb02b-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=launchpost-cb02b
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=launchpost-cb02b.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=453089025265
NEXT_PUBLIC_FIREBASE_APP_ID=1:453089025265:web:e5fd16efd4d1ab900edd50

# OpenRouter API
OPENROUTER_API_KEY=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
\`\`\`

## Key Features Implementation

### Daily Usage Limits
- Each user gets 5 generations per day
- Counter stored in Firebase Realtime Database
- Automatically resets at midnight UTC
- Tracked per userId in the `users/{userId}` collection
- Checked before each API request

### AI Model Fallback
- Primary model: OpenAI GPT-3.5 Turbo (fastest)
- Falls back to Llama 2 70B if primary fails
- Final fallback: Claude 3 Haiku
- All requests use the same prompt structure
- Automatic retry with next model on failure

### Google Authentication
- Firebase Google Provider integration
- Popup-based authentication flow
- Auto-creates user profile on first login
- Persists user data to Firebase
- Smooth redirect to onboarding after first signup

### SEO Optimization
- Metadata tags for all pages
- Open Graph tags for social sharing
- Structured data JSON-LD
- Semantic HTML structure
- Mobile-responsive design
- Fast page load times via Vercel CDN

## Deployment

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy on push to main branch
4. Automatic SSL certificate
5. Built-in analytics and monitoring

### Firebase Setup
1. Create Firebase project at console.firebase.google.com
2. Enable Authentication (Email/Password, Google)
3. Create Realtime Database
4. Set security rules for user data isolation
5. Note: API keys are exposed in frontend but Firebase rules prevent unauthorized access

## Security Considerations

### Frontend Security
- No sensitive data in environment variables (use NEXT_PUBLIC_ prefix properly)
- API keys for client-side Firebase are restricted via security rules
- Google OAuth uses proper redirect URIs

### Backend Security
- OpenRouter API key stored server-side only
- Firebase Admin SDK would be used for sensitive operations
- User authentication required for all data access
- Row-level security via Firebase user ID checks

### Database Security
- Firebase Realtime Database rules restrict user access to own data
- Authentication required for all database operations
- Data encrypted in transit via HTTPS

## Limits & Quotas

### Free Tier
- 5 content generations per day
- 5 vibe transformations per day
- Unlimited drafts storage
- Unlimited public bio pages
- Full access to all features

### Rate Limiting
- OpenRouter API has built-in rate limiting
- Automatic fallback models prevent single points of failure
- Firebase quota: 100 concurrent connections (free tier)

## Future Enhancements

1. **Premium Plans**
   - Unlimited daily generations
   - Priority AI model access
   - Advanced analytics

2. **Platform Integrations**
   - Direct publishing to social platforms
   - Social media analytics
   - Scheduling capabilities

3. **Advanced Features**
   - Hashtag suggestions
   - Image recommendations
   - A/B testing different versions
   - Content calendar

4. **Team Features**
   - Collaboration and sharing
   - Team billing
   - Role-based permissions

## Troubleshooting

### Issue: Daily limit reached but not at 5 uses
- Check Firebase Realtime Database `lastGenerationDate` field
- Ensure date format matches current date

### Issue: AI generation fails
- Check OpenRouter API key validity
- Verify fallback models are working
- Check API response status codes

### Issue: Firebase auth not working
- Verify OAuth consent screen is configured
- Check Firebase Security Rules
- Ensure redirect URLs are correctly set

## Support

For issues, feature requests, or questions:
- Email: support@launchpost.space
- GitHub Issues: [Repository Issues]
- Community: [Discord/Community Links]

---

**Last Updated**: January 2025
**Version**: 1.0.0 MVP
**Status**: Production Ready
