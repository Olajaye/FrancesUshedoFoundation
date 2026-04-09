# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint

# Prisma
npx prisma generate          # Regenerate Prisma client after schema changes
npx prisma migrate dev       # Create and apply a migration
npx prisma db push           # Push schema changes without migrations
npx prisma studio            # Open Prisma Studio (DB browser)
```

No test runner is configured in this project.

## Environment Variables

```env
DATABASE_URL=   # PostgreSQL connection string (required)
JWT_SECRET=     # Secret for signing JWTs (required for auth)
```

## Architecture

**Next.js 14 App Router** website for a charity/foundation (The Frances Ushedo Foundation) with a public-facing site and an admin dashboard.

### Key Directories

- `src/app/` — All pages using App Router conventions. Public routes at the top level; admin at `admin/`.
- `src/components/` — Reusable UI components, each in their own folder (e.g., `Navbar/`, `Footer/`, `Hero/`).
- `src/hooks/` — Custom animation hooks (typewriter effects, fading text).
- `src/constant/constant.ts` — Static data: sponsor list, blog posts, and other hardcoded content.
- `src/assets/assest.ts` — Asset imports (images, etc.).
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge).
- `src/lib/auth.ts` — JWT sign/verify helpers using `jose`.
- `src/lib/apiAuth.ts` — `requireAuth(req)` helper used in admin API routes; returns a `NextResponse` (401) on failure or `null` on success.
- `src/lib/prisma.ts` — Prisma client singleton using `@prisma/adapter-pg` driver adapter.
- `src/app/Font/font.tsx` — Google Font definitions (Roboto, Poppins, Montserrat, Edu_QLD) imported in the root layout.
- `prisma/schema.prisma` — Database schema (PostgreSQL). Prisma client is generated to `src/generated/prisma`.

### Routing Structure

```text
/                         → Home (hero, cards, events, stats)
/about                    → About page
/donate                   → Donation page
/contact                  → Contact form
/gallery                  → Image gallery
/event                    → Events list
/event/[id]               → Event detail
/news                     → News list
/news/[id]                → News article
/admin                    → Admin login
/admin/dashboard          → Dashboard (stats, charts, donors)
/admin/dashboard/news     → News CRUD
/admin/dashboard/events   → Events management
/admin/dashboard/events-gallery → Gallery management
/admin/dashboard/donations → Donations
/admin/dashboard/donors   → Donors
/admin/dashboard/messages → Messages
```

### Styling

- Tailwind CSS with a custom **lilac/darckLilac** color theme and custom breakpoints (`custom: 1038px`, `custom2: 1275px`).
- Framer Motion for animations; Swiper for carousels.
- Components use `cn()` from `src/lib/utils.ts` to merge class names.

### Database

Prisma with PostgreSQL using the `@prisma/adapter-pg` driver adapter (not the standard Prisma client). The `DATABASE_URL` must be set in `.env`. Current models: `User`, `Message`, `News`, `Event`. After any schema change, run `npx prisma generate`.

### Auth

JWT-based auth using `jose`. `src/lib/auth.ts` provides `signToken` and `verifyToken`. Login sets an `httpOnly` cookie named `admin_token` (8-hour expiry). Logout clears it via `POST /api/auth/logout`.

- `src/middleware.ts` — protects all `/admin/dashboard/:path*` routes; redirects unauthenticated requests to `/admin`.
- `src/lib/apiAuth.ts` — `requireAuth()` must be called at the top of every admin API route handler to protect it server-side.

### State Management

Redux Toolkit + RTK Query, wrapped in `redux-persist` (persists only the `auth` slice to localStorage via an SSR-safe storage shim).

- `src/store/store.ts` — store setup with `makeStore()` factory.
- `src/store/StoreProvider.tsx` — wraps the app; must remain a Client Component.
- `src/store/slices/authSlice.ts` — auth state (name, isAuthenticated).
- `src/store/api/authApi.ts` — login/logout mutations.
- `src/store/api/newsApi.ts` — admin news CRUD (`/api/admin/news`).
- `src/store/api/publicNewsApi.ts` — public news reads (`/api/news`).
- `src/store/api/messagesApi.ts` — admin messages CRUD (`/api/admin/messages`).
- `src/store/api/eventsApi.ts` — admin events CRUD (`/api/admin/events`).
- `src/store/api/publicContactApi.ts` — public contact form submission (`/api/contact`).

Use `useAppDispatch` and `useAppSelector` from `src/store/hooks.ts` (typed wrappers).

### Content

Much of the homepage content (events, stats, featured cause) is currently hardcoded in `src/app/page.tsx` rather than fetched from the database. The long-term intent is to manage this data via the admin dashboard.

### "use client" Convention

Server Components are the default. Add `"use client"` at the top of any component that uses hooks, browser APIs, Framer Motion animations, or Redux.
