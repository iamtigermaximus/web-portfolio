# Portfolio — Full Stack Developer

A professional, dark-themed portfolio website with a hidden admin panel for content management.

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Database:** PostgreSQL (Neon) + Prisma 6 ORM
- **Auth:** NextAuth.js v4 (CredentialsProvider, JWT strategy)
- **Styling:** Styled Components v6 — "Dark Slate Glass" theme
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod
- **Image Uploads:** Cloudinary

## Getting Started

```bash
# 1. Clone and install
git clone <repo-url>
cd portfolio
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Fill in your DATABASE_URL, NEXTAUTH_SECRET, and Cloudinary credentials

# 3. Push database schema
npx prisma db push

# 4. Seed with sample data
npm run db:seed

# 5. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the portfolio.

## Test Accounts

| Email | Password | Role |
|---|---|---|
| admin@example.com | admin123 | Administrator |

Admin panel: [http://localhost:3000/dashboard-secret](http://localhost:3000/dashboard-secret)

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Random string for session encryption |
| `NEXTAUTH_URL` | `http://localhost:3000` (or your production URL) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Same as CLOUDINARY_CLOUD_NAME (for client uploads) |

## Creating Your First Admin User

1. Set up your `.env.local` with a valid `DATABASE_URL`
2. Run `npx prisma db push` to create tables
3. Run `npm run db:seed` — this creates `admin@example.com` with password `admin123`
4. Change the password immediately after first login

## Project Structure

```
src/
├── app/
│   ├── (public)/          # Portfolio pages (Home, About, Skills, Projects, Certificates, Contact)
│   ├── (admin)/dashboard-secret/  # Admin panel (Dashboard, CRUD for all content, Messages)
│   ├── login/             # Admin login page
│   └── api/               # REST API routes
├── components/
│   ├── ui/                # Design system (GlassCard, Button, Input, Modal, etc.)
│   ├── sections/          # Page sections (Hero, About, Skills, etc.)
│   ├── admin/             # Admin components (DataTable, StatsCards, etc.)
│   ├── layout/            # Navbar, Footer, AdminSidebar
│   └── contexts/          # Providers (Auth, Query, Theme, App)
├── hooks/                 # useAuth, useScrollReveal, useLocalStorage
├── lib/                   # prisma, auth, theme, validations, cloudinary
└── types/                 # TypeScript type definitions
```

## Vercel Deployment

1. Push your code to GitHub
2. Import the project in Vercel
3. Set the environment variables (listed above)
4. Deploy — `npx prisma db push` runs automatically via `postinstall`

## Changing the Admin Route

To change the admin path from `/dashboard-secret`:
1. Rename the folder `src/app/(admin)/dashboard-secret/`
2. Update the matcher in `src/middleware.ts`

## License

MIT
