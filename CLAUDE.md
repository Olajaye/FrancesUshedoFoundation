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

## Architecture

**Next.js 14 App Router** website for a charity/foundation with a public-facing site and an admin dashboard.

### Key Directories

- `src/app/` — All pages using App Router conventions. Public routes at the top level; admin at `admin/`.
- `src/components/` — Reusable UI components, each in their own folder (e.g., `Navbar/`, `Footer/`, `Hero/`).
- `src/hooks/` — Custom animation hooks (typewriter effects, fading text).
- `src/constant/constant.ts` — Static data: sponsor list, blog posts, and other hardcoded content.
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge).
- `src/app/Font/font.tsx` — Google Font definitions (Roboto, Poppins, Montserrat, Edu_QLD) imported in the root layout.
- `prisma/schema.prisma` — Database schema (PostgreSQL). Prisma client is generated to `src/generated/prisma`.

### Routing Structure

```
/                         → Home (hero, cards, events, stats)
/about                    → About page
/donate                   → Donation page (Paystack/Stripe)
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

Prisma with PostgreSQL. The `DATABASE_URL` must be set in `.env`. The schema at `prisma/schema.prisma` is minimal and expects models to be added. After any schema change, run `npx prisma generate` to update the client in `src/generated/prisma`.

### "use client" Convention

Server Components are the default. Add `"use client"` at the top of any component that uses hooks, browser APIs, or Framer Motion animations.
