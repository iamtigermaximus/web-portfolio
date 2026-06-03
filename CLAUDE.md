# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Portfolio — Full Stack Developer

A professional, dark-themed portfolio website with a hidden admin panel for content management.

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Database:** PostgreSQL (Neon) + Prisma 6
- **Auth:** NextAuth.js v4 (CredentialsProvider, JWT strategy) — admin only
- **Styling:** Styled Components v6 — "Dark Slate Glass" theme (`src/lib/theme.ts`)
- **Animations:** Framer Motion (scroll reveals, page transitions)
- **Forms:** React Hook Form + Zod validation
- **Image Uploads:** Cloudinary
- **Data Fetching:** TanStack Query v5
- **Icons:** Phosphor Icons

## Getting Started

```bash
npm install
# Set DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL, Cloudinary creds in .env.local
npx prisma db push
npm run db:seed       # creates admin@example.com / admin123
npm run dev           # Next.js on :3000
```

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Production server |
| `npm run lint` | ESLint |
| `npm run db:push` | Push Prisma schema to DB |
| `npm run db:seed` | Seed admin user + sample data |

## Test Account

| Email | Password | Role |
|-------|----------|------|
| admin@example.com | admin123 | Administrator |

Admin panel: `http://localhost:3000/dashboard-secret`

## Architecture

### Two route groups

1. **`(public)`** — unauthenticated portfolio pages: Home (hero), About, Skills, Projects, Certificates, Contact. Uses the public layout with Navbar + Footer.
2. **`(admin)`** at `/dashboard-secret` — protected admin panel with CRUD for projects, skills, certificates, and a messages inbox. Uses AdminSidebar layout.

The admin route is hidden behind NextAuth middleware (`src/middleware.ts` or via layout-level auth checks). To change the admin path from `/dashboard-secret`, rename the folder and update the middleware matcher.

### Data model (Prisma)

- **User** — admin account (email, password hash)
- **Project** — portfolio project (title, description, tech stack, image, live/github URLs, featured flag, ordering)
- **Skill** — skill with category, proficiency level (0-100), icon name, ordering
- **Certificate** — course name, issuer, date, credential URL, image, skills learned
- **Message** — contact form submissions (name, email, message, read status)

### API routes

| Route | Access | Purpose |
|-------|--------|---------|
| `/api/auth/[...nextauth]` | Public | NextAuth handler |
| `/api/admin/projects` | Admin | Project CRUD |
| `/api/admin/skills` | Admin | Skill CRUD |
| `/api/admin/certificates` | Admin | Certificate CRUD |
| `/api/admin/messages` | Admin | View contact messages |
| `/api/public/projects` | Public | List featured projects |
| `/api/public/skills` | Public | List skills |
| `/api/public/certificates` | Public | List certificates |
| `/api/contact` | Public | Submit contact form |

## Project Layout

```
src/
├── app/
│   ├── (public)/           # Portfolio pages (Home, About, Skills, Projects, Certificates, Contact)
│   ├── (admin)/dashboard-secret/ # Protected admin panel (Dashboard, CRUD, Messages)
│   ├── login/              # Admin login page
│   ├── api/                # REST API routes (admin + public + contact)
│   └── layout.tsx          # Root layout with AppProviders
├── components/
│   ├── ui/                 # Design system: GlassCard, Button, Input, Modal, Badge, ProficiencyBar, SectionHeading, Spinner
│   ├── sections/           # Page sections: Hero, About, Skills, Projects, Certificates, Contact
│   ├── admin/              # Admin: DataTable, StatsCards, DeleteConfirmModal, CloudinaryUpload, TagInput
│   ├── layout/             # Navbar, Footer, AdminSidebar
│   ├── auth/               # AuthProvider
│   └── contexts/           # AppProviders, QueryProvider
├── contexts/               # ThemeContext (dark/light toggle, stored in localStorage)
├── hooks/                  # useAuth, useScrollReveal, useLocalStorage, useProtectedRoute
├── lib/                    # prisma, auth, theme, validations (Zod schemas), cloudinary, utils, global-styles, registry
└── types/                  # TypeScript types + next-auth type augmentation
```

## Key Patterns

- **Glass theme:** Styled Components theme in `src/lib/theme.ts` — dark slate backgrounds with glass-morphism effects (backdrop-filter blur, semi-transparent borders).
- **Scroll reveals:** `useScrollReveal` hook wraps Framer Motion to animate sections into view on scroll.
- **Cloudinary uploads:** `CloudinaryUpload` component handles image uploads via Cloudinary widget; URLs stored in Prisma.
- **Admin auth:** NextAuth JWT strategy — middleware/layout checks session before rendering admin pages. `useProtectedRoute` hook redirects unauthenticated users.
- **Contact form:** `POST /api/contact` stores submissions as `Message` records. No auth required.
- **Public APIs:** Data is fetched client-side via TanStack Query from `/api/public/*` endpoints, which serve data without auth.
- **Admin CRUD:** All admin operations go through `/api/admin/*` routes protected by NextAuth session checks.
- **Ordering:** Projects and skills support manual ordering via an `order` integer field.
