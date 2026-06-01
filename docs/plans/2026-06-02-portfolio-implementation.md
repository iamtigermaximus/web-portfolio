# Portfolio Website — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a production-ready dark-themed portfolio website with hidden admin panel (CRUD for Projects, Skills, Certificates, Messages) using Next.js 16 App Router, TypeScript, PostgreSQL, Prisma, Styled Components, NextAuth.js, and Framer Motion.

**Architecture:** Public route group `(public)` serves the portfolio sections as separate routes (Hero, About, Skills, Projects, Certificates, Contact). Admin route group `(admin)` at `/dashboard-secret` is protected by NextAuth.js middleware and provides full CRUD via sidebar navigation. All data flows through REST API routes — public GET endpoints for read and admin POST/PUT/DELETE endpoints for write, with Cloudinary for image uploads.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, PostgreSQL (Neon), Prisma 6, NextAuth.js v4 (CredentialsProvider), Styled Components v6, Framer Motion, React Hook Form + Zod, Cloudinary, react-hot-toast, date-fns, @phosphor-icons/react

---

## Phase 1: Project Foundation

### Task 1.1: Install Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install all production dependencies**

```bash
npm install styled-components @prisma/client next-auth@4 bcryptjs framer-motion react-hook-form @hookform/resolvers zod react-hot-toast date-fns cloudinary @phosphor-icons/react next-seo
```

**Step 2: Install dev dependencies**

```bash
npm install -D prisma @types/styled-components @types/bcryptjs
```

**Step 3: Verify install**

Check `package.json` has all packages listed. Run `npm ls styled-components framer-motion next-auth`.

---

### Task 1.2: Configure Next.js for Styled Components

**Files:**
- Modify: `next.config.ts`

**Step 1: Update next.config.ts**

Enable styled-components compiler support + Cloudinary image domains:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
```

---

### Task 1.3: Create Environment File

**Files:**
- Create: `.env.local`
- Create: `.env.example`

**.env.example:**
```
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

---

### Task 1.4: Create Prisma Schema

**Files:**
- Create: `prisma/schema.prisma`

**Schema content:**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Project {
  id          String   @id @default(cuid())
  title       String
  description String   @db.Text
  imageUrl    String?
  techStack   String[]
  liveUrl     String?
  githubUrl   String?
  featured    Boolean  @default(false)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Skill {
  id               String   @id @default(cuid())
  name             String
  category         String
  proficiencyLevel Int      @default(75)
  iconName         String   @default("code")
  order            Int      @default(0)
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}

model Certificate {
  id            String   @id @default(cuid())
  courseName    String
  issuer        String
  issueDate     DateTime
  credentialUrl String?
  imageUrl      String?
  skillsLearned String[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Message {
  id        String   @id @default(cuid())
  name      String
  email     String
  message   String   @db.Text
  isRead    Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

**Step 2: Generate Prisma client**

```bash
npx prisma generate
```

---

### Task 1.5: Create Prisma Client Singleton

**Files:**
- Create: `src/lib/prisma.ts`

```ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

---

### Task 1.6: Create Styled Components Registry (SSR)

**Files:**
- Create: `src/lib/registry.tsx`

```tsx
"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") return <>{children}</>;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}
```

---

### Task 1.7: Clean Up Default Files

**Files:**
- Delete: `src/app/page.module.css`
- Delete: `src/app/globals.css`
- Delete: `src/app/page.tsx` (will be recreated in route group)

---

## Phase 2: Theme & Styling Infrastructure

### Task 2.1: Create Theme Definition

**Files:**
- Create: `src/lib/theme.ts`

Define the "Dark Slate Glass" theme with all design tokens: colors (bg, surface, card, primary, accent, text variants, etc.), radii, spacing, font sizes, font weights, breakpoints. Export as `darkTheme` typed object and `ThemeType` interface.

Colors:
- `bg`: `#0f172a`
- `surface`: `#1e293b`
- `card`: `rgba(255, 255, 255, 0.03)`
- `cardBorder`: `rgba(255, 255, 255, 0.06)`
- `primary`: `#818cf8`
- `primaryHover`: `#6366f1`
- `accent`: `#22d3ee`
- `textPrimary`: `#f8fafc`
- `textSecondary`: `#94a3b8`
- `textMuted`: `#64748b`
- `success`: `#34d399`
- `error`: `#f87171`

Breakpoints: `sm: 640px, md: 768px, lg: 1024px, xl: 1280px`

---

### Task 2.2: Create Theme Context

**Files:**
- Create: `src/contexts/ThemeContext.tsx`

Client-side context providing the `darkTheme` object via `useAppTheme()` hook. Wrap children in `ThemeProvider` from styled-components.

---

### Task 2.3: Create Global Styles

**Files:**
- Create: `src/lib/global-styles.ts`

A `createGlobalStyle` from styled-components that sets:
- CSS custom properties from theme
- Inter font import from Google Fonts
- Body: `background: #0f172a; color: #f8fafc; font-family: 'Inter', sans-serif;`
- Scrollbar styling (thin, dark)
- Selection color (indigo)
- Smooth scroll behavior
- Box-sizing border-box reset
- All heading/paragraph defaults

---

## Phase 3: Authentication

### Task 3.1: Create NextAuth Configuration

**Files:**
- Create: `src/lib/auth.ts`

NextAuth v4 configuration with CredentialsProvider:
- Authorize function: find user by email in Prisma, compare password with bcrypt
- JWT strategy with callbacks (jwt + session) to attach user id and email to token/session
- Pages: `signIn: "/login"`

```ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) return null;
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;
        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) { token.id = user.id; token.email = user.email; }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};
```

---

### Task 3.2: Create Auth API Route

**Files:**
- Create: `src/app/api/auth/[...nextauth]/route.ts`

```ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

---

### Task 3.3: Create Middleware

**Files:**
- Create: `src/middleware.ts`

Protect all `/dashboard-secret/*` routes and `/api/admin/*` routes. Redirect to `/login` if no session.

```ts
export { default } from "next-auth/middleware";
export const config = {
  matcher: ["/dashboard-secret/:path*", "/api/admin/:path*"],
};
```

---

### Task 3.4: Create Login Page

**Files:**
- Create: `src/app/login/page.tsx`

Minimal, clean dark-themed login page:
- Centered glassmorphism card
- Email + password fields
- "Sign In" button with indigo styling
- Error message display (invalid credentials)
- Uses `signIn` from `next-auth/react`
- Redirects to `/dashboard-secret` on success

---

## Phase 4: Zod Validation Schemas

### Task 4.1: Create Validation Schemas

**Files:**
- Create: `src/lib/validations.ts`

Zod schemas for:
- `projectSchema`: title (min 1), description (min 1), imageUrl, techStack (string array), liveUrl, githubUrl, featured, order
- `skillSchema`: name (min 1), category (min 1), proficiencyLevel (1-100), iconName, order
- `certificateSchema`: courseName (min 1), issuer (min 1), issueDate, credentialUrl, imageUrl, skillsLearned (string array)
- `contactSchema`: name (min 2), email (valid email), message (min 10)
- `loginSchema`: email (valid email), password (min 1)

---

## Phase 5: Public API Routes

### Task 5.1: Public Projects API

**Files:**
- Create: `src/app/api/public/projects/route.ts`

GET: Return all projects ordered by `order` ascending, then `createdAt` descending. Return JSON array.

---

### Task 5.2: Public Skills API

**Files:**
- Create: `src/app/api/public/skills/route.ts`

GET: Return all skills ordered by `order` ascending. Return JSON array.

---

### Task 5.3: Public Certificates API

**Files:**
- Create: `src/app/api/public/certificates/route.ts`

GET: Return all certificates ordered by `issueDate` descending. Return JSON array.

---

### Task 5.4: Contact API

**Files:**
- Create: `src/app/api/contact/route.ts`

POST: Validate body with contactSchema, create Message record in DB, return 201 with `{ success: true }`. Return 400 with validation errors on failure.

---

## Phase 6: Admin API Routes

### Task 6.1: Admin Projects CRUD

**Files:**
- Create: `src/app/api/admin/projects/route.ts` (GET all + POST)
- Create: `src/app/api/admin/projects/[id]/route.ts` (GET one + PUT + DELETE)

All routes validate session exists via `getServerSession`.

---

### Task 6.2: Admin Skills CRUD

**Files:**
- Create: `src/app/api/admin/skills/route.ts` (GET all + POST)
- Create: `src/app/api/admin/skills/[id]/route.ts` (GET one + PUT + DELETE)

---

### Task 6.3: Admin Certificates CRUD

**Files:**
- Create: `src/app/api/admin/certificates/route.ts` (GET all + POST)
- Create: `src/app/api/admin/certificates/[id]/route.ts` (GET one + PUT + DELETE)

---

### Task 6.4: Admin Messages

**Files:**
- Create: `src/app/api/admin/messages/route.ts`

GET: Return all messages ordered by `createdAt` descending.
PATCH: Mark a message as read (body: `{ id: string, isRead: boolean }`).

---

## Phase 7: UI Component Library

### Task 7.1: Create Base UI Components

**Files:**
- Create: `src/components/ui/GlassCard.tsx`
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Input.tsx`
- Create: `src/components/ui/Modal.tsx`
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/Spinner.tsx`
- Create: `src/components/ui/ProficiencyBar.tsx`
- Create: `src/components/ui/SectionHeading.tsx`

Each component:
- Styled with styled-components, using theme props
- Supports variants (Button: primary, secondary, ghost. Badge: default, accent, muted)
- Fully typed props
- Glassmorphism on GlassCard: `background: rgba(255,255,255,0.03); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 24px;`
- Modal: portal-based with backdrop blur, fade animation, close on Escape and click-outside
- ProficiencyBar: animated width bar with gradient fill, percentage label
- Spinner: CSS-only spinning animation

---

## Phase 8: Custom Hooks

### Task 8.1: Create Hooks

**Files:**
- Create: `src/hooks/useAuth.ts` — wraps `useSession` from next-auth, returns `{ user, isLoading, isAuthenticated }`
- Create: `src/hooks/useProtectedRoute.ts` — redirects to `/login` if unauthenticated (client-side guard for admin)
- Create: `src/hooks/useScrollReveal.ts` — returns a ref + `isInView` boolean using IntersectionObserver for scroll animations
- Create: `src/hooks/useLocalStorage.ts` — generic typed hook for localStorage read/write with JSON serialization

---

## Phase 9: Layout Components

### Task 9.1: Create Navbar

**Files:**
- Create: `src/components/layout/Navbar.tsx`

Sticky top navbar with glassmorphism effect:
- Logo/name on left
- Nav links: Home, About, Skills, Projects, Certificates, Contact
- Active link indicator (indigo underline or dot)
- Mobile: hamburger menu → slide-out drawer
- Uses `usePathname()` for active state
- Subtle backdrop blur on scroll

---

### Task 9.2: Create Footer

**Files:**
- Create: `src/components/layout/Footer.tsx`

Minimal footer: copyright line, tiny "Built with Next.js" note.

---

### Task 9.3: Create Public Layout

**Files:**
- Create: `src/app/(public)/layout.tsx`

Wraps all public pages with:
- StyledComponentsRegistry
- ThemeContext provider
- GlobalStyles
- Navbar
- Footer
- Main content area with padding-top for fixed navbar

---

### Task 9.4: Create Admin Sidebar

**Files:**
- Create: `src/components/layout/AdminSidebar.tsx`

Fixed left sidebar (240px width):
- Navigation links with Phosphor icons: Dashboard, Projects, Skills, Certificates, Messages
- Active state (highlighted with indigo bg)
- User email at bottom
- Sign out button
- Collapses to icon-only on mobile
- Dark surface background with right border

---

### Task 9.5: Create Admin Layout

**Files:**
- Create: `src/app/(admin)/dashboard-secret/layout.tsx`

Admin shell:
- Client component
- Checks session with `useSession`, redirects to `/login` if unauthenticated
- Renders AdminSidebar + content area with left margin for sidebar
- Responsive: sidebar collapses on mobile, hamburger toggle

---

## Phase 10: Public Section Components

### Task 10.1: Hero Section (Home Page)

**Files:**
- Create: `src/components/sections/HeroSection.tsx`
- Create: `src/app/(public)/page.tsx`

Full-viewport hero:
- Animated gradient background (radial, subtle purple/cyan)
- Name/title with Framer Motion word-rotate animation (e.g., "Full Stack Developer" → "UI/UX Designer" → "Problem Solver")
- Subtitle blurb
- Two CTA buttons: "View Projects" (primary) → `/projects`, "Get In Touch" (secondary/ghost) → `/contact`
- Downward scroll indicator (animated chevron bounce)
- Responsive: stacks vertically on mobile, adjusts font sizes

---

### Task 10.2: About Section

**Files:**
- Create: `src/components/sections/AboutSection.tsx`
- Create: `src/app/(public)/about/page.tsx`

Content:
- Section heading "About Me"
- GlassCard with bio text (hardcoded or from a simple data file)
- Avatar/image area (placeholder)
- GitHub + LinkedIn icon links (Phosphor icons) at bottom
- Framer Motion fade-up on scroll

---

### Task 10.3: Skills Section

**Files:**
- Create: `src/components/sections/SkillsSection.tsx`
- Create: `src/app/(public)/skills/page.tsx`

Content:
- Section heading "Skills"
- Category tabs (All, Frontend, Backend, DevOps, Tools — derived from data)
- Grid of skill cards per category
- Each card: icon (Phosphor), skill name, animated ProficiencyBar
- Bars animate on scroll into view (useScrollReveal)
- Data fetched from `/api/public/skills`

---

### Task 10.4: Projects Section

**Files:**
- Create: `src/components/sections/ProjectsSection.tsx`
- Create: `src/app/(public)/projects/page.tsx`

Content:
- Section heading "Projects"
- Filter tabs (All, and derived categories from techStack)
- Responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
- ProjectCard: image (with fallback gradient), title, truncated description, tech stack badges, GitHub + Live links
- Each card is a GlassCard with hover lift effect
- Staggered fade-up animation on cards
- Data fetched from `/api/public/projects`

---

### Task 10.5: Certificates Section

**Files:**
- Create: `src/components/sections/CertificatesSection.tsx`
- Create: `src/app/(public)/certificates/page.tsx`

Content:
- Section heading "Certificates"
- Clean grid of certificate cards (2 col mobile, 3 col tablet, 4 col desktop)
- CertificateCard: thumbnail image, course name, issuer, date (formatted with date-fns), skills tags
- Click opens a Modal with larger image, full details, credential link button
- Data fetched from `/api/public/certificates`

---

### Task 10.6: Contact Section

**Files:**
- Create: `src/components/sections/ContactSection.tsx`
- Create: `src/app/(public)/contact/page.tsx`

Content:
- Section heading "Get In Touch"
- GlassCard containing the form
- React Hook Form with zodResolver (contactSchema)
- Fields: name, email, message (textarea)
- Submit button with loading spinner state
- On success: POST to `/api/contact`, show react-hot-toast success, reset form
- On error: show error toast
- Framer Motion fade-up

---

## Phase 11: Admin Pages

### Task 11.1: Dashboard Page

**Files:**
- Create: `src/components/admin/StatsCards.tsx`
- Create: `src/app/(admin)/dashboard-secret/page.tsx`

4 stat cards in a responsive grid:
- Total Projects (with count)
- Total Skills (with count)
- Total Certificates (with count)
- Unread Messages (with count + highlighted if > 0)
- Each card: glassmorphism, large number, label, Phosphor icon
- Fetch counts from admin API endpoints

---

### Task 11.2: Admin Projects Page

**Files:**
- Create: `src/app/(admin)/dashboard-secret/projects/page.tsx`
- Create: `src/components/admin/DataTable.tsx`
- Create: `src/components/admin/FormModal.tsx`
- Create: `src/components/admin/DeleteConfirmModal.tsx`
- Create: `src/components/admin/CloudinaryUpload.tsx`

Full CRUD page:
- "Add Project" button at top
- DataTable: columns for Title, Tech Stack (badges), Featured (checkbox), Order, Actions (edit/delete)
- Click Add/Edit → FormModal slides in with React Hook Form
- Form fields: title, description (textarea), imageUrl (with Cloudinary upload widget), techStack (tag input — type + Enter to add), liveUrl, githubUrl, featured toggle, order number
- CloudinaryUpload component: button opens Cloudinary upload widget, returns URL
- Delete: opens DeleteConfirmModal, on confirm calls DELETE API, refreshes table
- Sortable by order, filterable by search
- Toast on success/failure

---

### Task 11.3: Admin Skills Page

**Files:**
- Create: `src/app/(admin)/dashboard-secret/skills/page.tsx`

Same CRUD pattern as projects:
- Table columns: Name, Category, Proficiency (bar), Order, Actions
- Form: name, category (text input), proficiencyLevel (1-100 slider or number), iconName (Phosphor icon name), order
- Delete confirmation modal

---

### Task 11.4: Admin Certificates Page

**Files:**
- Create: `src/app/(admin)/dashboard-secret/certificates/page.tsx`

Same CRUD pattern:
- Table columns: Course Name, Issuer, Issue Date, Actions
- Form: courseName, issuer, issueDate (date picker), credentialUrl, imageUrl (with CloudinaryUpload), skillsLearned (tag input)
- Delete confirmation modal

---

### Task 11.5: Admin Messages Page

**Files:**
- Create: `src/app/(admin)/dashboard-secret/messages/page.tsx`

Message inbox:
- List of messages, newest first
- Each message: name, email, preview text, date, read/unread dot
- Click to expand full message
- "Mark as Read" toggle (PATCH API)
- Empty state: "No messages yet"

---

## Phase 12: Cloudinary Integration

### Task 12.1: Cloudinary Server Config

**Files:**
- Create: `src/lib/cloudinary.ts`

Configure Cloudinary with env vars. Export a function to generate upload signatures if needed.

---

### Task 12.2: Cloudinary Upload Component

**Files:**
- Create: `src/components/admin/CloudinaryUpload.tsx`

Client component:
- "Upload Image" button
- Opens Cloudinary upload widget (using their script)
- Shows preview after upload
- Calls `onUpload(url)` callback with the secure_url
- Error handling

---

## Phase 13: SEO & Metadata

### Task 13.1: Add SEO

**Files:**
- Modify: `src/app/layout.tsx` — add metadata export (title, description)
- Modify: Each public page — add page-specific metadata with NextSEO or Next.js Metadata API

Use Next.js 16 built-in Metadata API (no next-seo needed since it's App Router):
- Root layout: default title, description, open graph
- Each public page: `export const metadata: Metadata = { ... }`

---

## Phase 14: Seed Script & Documentation

### Task 14.1: Create Seed Script

**Files:**
- Create: `prisma/seed.ts`

Seed the database with:
- 1 admin user (hashed password via bcrypt)
- 4-6 sample projects with realistic data
- 8-10 sample skills across categories (Frontend, Backend, DevOps, Tools)
- 3-4 sample certificates
- 1-2 sample contact messages

Add `"prisma": { "seed": "npx tsx prisma/seed.ts" }` to package.json.
Add `"db:seed": "npx tsx prisma/seed.ts"` to scripts.

---

### Task 14.2: Update README

**Files:**
- Modify: `README.md`

Write comprehensive README with:
- Project description
- Tech stack
- Getting started (clone, install, env setup, migrate, seed, dev)
- Environment variables table
- Project structure overview
- Vercel deployment steps
- Creating first admin user

---

## Phase 15: Polish & Final Integration

### Task 15.1: Add Framer Motion Animations

- Page transitions: wrap public layout children in AnimatePresence
- Scroll reveal: useScrollReveal hook on each section
- Staggered children on grids (skills, projects, certificates)
- Hover effects on cards (scale, shadow, border glow)

### Task 15.2: Responsive Testing Pass

- Mobile: < 640px — single column, hamburger nav, stacked layouts
- Tablet: 640-1024px — 2-column grids, visible nav, smaller sidebar
- Desktop: > 1024px — full layout, sidebar visible, 3-4 column grids

### Task 15.3: Add react-hot-toast Toaster

Add `<Toaster>` with dark theme to root layout.

### Task 15.4: Loading & Empty States

- Add `loading.tsx` files for each public route (skeleton cards)
- Add empty states: "No projects yet", "No messages", etc.
- Add error boundaries for API failures

### Task 15.5: Final Build & Test

```bash
npm run build   # Production build
npm run lint    # Should pass
```

---

## Execution Order

1. Phase 1 (Foundation) → Phase 2 (Theme) → Phase 3 (Auth) → Phase 4 (Validations) → Phase 5 (Public APIs) → Phase 6 (Admin APIs) → Phase 7 (UI Components) → Phase 8 (Hooks) → Phase 9 (Layouts) → Phase 10 (Public Sections) → Phase 11 (Admin Pages) → Phase 12 (Cloudinary) → Phase 13 (SEO) → Phase 14 (Seed) → Phase 15 (Polish)

Total: ~15 phases, ~45 tasks. Each task is self-contained with clear file paths and expected outcomes.
