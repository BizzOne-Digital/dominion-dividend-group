# Dominion Dividend Group – Website & Admin

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · MongoDB Atlas (Mongoose) · Vercel-ready.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env.local` and fill it in:
   - `MONGODB_URI`: your Atlas connection string. In Atlas, allow access from Vercel (0.0.0.0/0, or use the Vercel integration).
   - `ADMIN_EMAIL`: the admin login email.
   - `ADMIN_PASSWORD_HASH`: run `npm run hash-password -- "StrongPassword123"` and paste the `base64:` value.
   - `SESSION_SECRET`: 32+ random characters (`openssl rand -hex 32`).
   - `NEXT_PUBLIC_SITE_URL`: e.g. `https://dominiondividendgroup.com` (used for canonical URLs, OG tags and the sitemap).
   - SMTP vars (optional): email notifications for new inquiries.
3. `npm run dev`, then open http://localhost:3000. The admin panel is at `/admin`.

The site runs on built-in default content until you save changes in the admin panel.

## Deploy (Vercel)

Import the repo, add the same environment variables, and deploy. No filesystem writes happen at runtime.

## Key architecture

| Concern | Location |
|---|---|
| Public pages | `app/(site)/*` (Home, About, Business Model, Seed Round 1, Contact, Privacy, Terms) |
| Admin pages | `app/admin/(panel)/*`; server-side session check in the layout |
| Auth | `lib/auth.ts`, `lib/session-token.ts`, `middleware.ts` (signed HTTP-only cookie, SameSite=strict, 8h expiry, rate-limited login) |
| Content schemas | `models/content.ts` (one typed singleton per page), `models/BusinessModelSection.ts` |
| Validation | `lib/validation.ts` (zod, server-side, on every write) |
| Uploads | `POST /api/upload` stores the binary in the `StoredUpload` collection. `GET /api/uploads/[folder]/[filename]` serves it. |
| Image cleanup | `lib/uploads.ts`: after a save succeeds, any replaced or removed image that nothing else references is deleted (`deleteStoredUploadByUrl`). |

## Seed Round 1 publication

- Defaults to **Draft / Unpublished**: `/seed-round-1` returns 404, and the page is removed from navigation, the homepage preview and the sitemap.
- Publish from **Admin → Seed Round 1** (asks for confirmation and shows a warning that legal review is required first).
- "Show in navigation" is a separate setting.
