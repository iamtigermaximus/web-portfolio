# Portfolio Website — Design Document
**Date:** 2026-06-02
**Status:** Approved

## Overview

A standalone, dark-themed personal portfolio website with hidden admin panel for content management. Built with Next.js 16 App Router, TypeScript, PostgreSQL (Neon), Prisma 6, Styled Components, Framer Motion, and NextAuth.js.

## Architecture

### Route Structure

```
src/app/
├── (public)/                    # Public-facing portfolio
│   ├── layout.tsx               # ThemeProvider + StyledComponentsRegistry + Navbar + Footer
│   ├── page.tsx                 # Hero section — animated text, CTA
│   ├── about/page.tsx           # Bio, GitHub + LinkedIn icons
│   ├── skills/page.tsx          # Category tabs + proficiency bars
│   ├── projects/page.tsx        # Filterable grid + tech tags
│   ├── certificates/page.tsx    # Thumbnail grid + detail modal
│   ├── contact/page.tsx         # Contact form (name, email, message)
│   └── not-found.tsx
├── (admin)/                     # Hidden admin panel
│   └── dashboard-secret/
│       ├── layout.tsx           # Auth guard + Sidebar + AdminShell
│       ├── page.tsx             # Dashboard stats (counts, unread messages)
│       ├── projects/page.tsx    # CRUD table + form modal
│       ├── skills/page.tsx      # CRUD table + form modal
│       ├── certificates/page.tsx # CRUD table + form modal
│       └── messages/page.tsx    # Inbox with read/unread
├── login/page.tsx               # Minimal admin login form
└── api/
    ├── auth/[...nextauth]/route.ts
    ├── admin/projects/route.ts + [id]/route.ts
    ├── admin/skills/route.ts + [id]/route.ts
    ├── admin/certificates/route.ts + [id]/route.ts
    ├── admin/messages/route.ts
    ├── contact/route.ts
    └── public/projects|skills|certificates/route.ts
```

### Component Tree

```
Public
├── Navbar (sticky glass, logo + links + mobile hamburger)
├── HeroSection (animated gradient bg, word-rotate text, CTA buttons)
├── AboutSection (glass card, avatar, bio, GitHub + LinkedIn)
├── SkillsSection (category tabs, skill cards with animated proficiency bars)
├── ProjectsSection (filter tabs, masonry-style grid, project cards with tech tags)
├── CertificatesSection (grid, thumbnail cards, detail modal)
├── ContactSection (glass form, validation, toast on success)
└── Footer (minimal copyright)

Admin
├── Sidebar (fixed left, nav links, active state, collapse on mobile)
├── AdminHeader (email display, sign out button)
├── StatsCards (4 cards: Projects, Skills, Certs, Messages count)
├── DataTable (sortable columns, search, edit/delete actions)
├── FormModal (React Hook Form + Zod, Cloudinary image upload)
└── DeleteConfirmModal
```

## Design System — "Dark Slate Glass"

| Token | Value |
|---|---|
| Base bg | `#0f172a` (slate-900) |
| Surface | `#1e293b` (slate-800) |
| Card bg | `rgba(255,255,255,0.03)` |
| Card border | `rgba(255,255,255,0.06)` |
| Card blur | `backdrop-filter: blur(20px)` |
| Primary | `#818cf8` (indigo-400) |
| Primary hover | `#6366f1` (indigo-500) |
| Accent | `#22d3ee` (cyan-400) |
| Text primary | `#f8fafc` |
| Text secondary | `#94a3b8` |
| Text muted | `#64748b` |
| Success | `#34d399` |
| Error | `#f87171` |
| Font | Inter (Google Fonts) |
| Radius | 8px sm, 12px md, 16px lg, 24px xl |

## Data Models

5 Prisma models: User, Project, Skill, Certificate, Message.

All admin routes protected by NextAuth CredentialsProvider + middleware. Public API routes are read-only GET. Contact form is public POST.

## Interactions

- **Scroll animations:** Framer Motion `useInView` + `fadeUp` variants, staggered children on grids
- **Page transitions:** Subtle fade between routes
- **Skills bars:** Animate width from 0 to proficiency% on scroll into view
- **Contact form:** React Hook Form + Zod → POST /api/contact → react-hot-toast
- **Admin forms:** Modal-based CRUD, Cloudinary upload widget for images
- **Delete:** Confirmation modal before DELETE API call

## Packages

| Package | Purpose |
|---|---|
| framer-motion | Animations |
| react-hook-form + @hookform/resolvers | Forms |
| zod | Validation |
| react-hot-toast | Toasts |
| date-fns | Dates |
| next-seo | Meta tags |
| styled-components | Styling |
| @prisma/client + prisma | ORM |
| next-auth | Auth |
| bcryptjs | Password hashing |
| cloudinary | Image uploads |
| @phosphor-icons/react | Icons |
