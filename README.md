# Sienna Mercato

Website and admin dashboard for Sienna Mercato, a three-floor Italian restaurant at 942 Penn Avenue, Pittsburgh: Emporio (I), Mezzo (II) and Il Tetto rooftop (III).

Vite, React 19, React Router, Tailwind v4, Convex (database, auth, file storage, email, scheduled jobs). Icons come from the Phosphor web font loaded in `index.html`.

## Commands

```sh
bun install
bun run dev                     # Convex + Vite together
bun x convex run seed:run       # fill an empty deployment with menus, specials, events
bun run build                   # typecheck + production build to dist/
bun run check                   # typecheck, lint, format check
bun run format
```

## Layout

```
src/
  main.tsx, router.tsx   entry and routes (admin routes are lazy-loaded)
  index.css              theme tokens and the few effects Tailwind can't express
  lib/                   site constants, page SEO defaults, cart, analytics, upload, utils
  content/               static copy that isn't managed in the dashboard
  components/            shared UI: inline editing, menus, specials, calendar, cart, forms, SEO
  components/layout/     nav, footer, scroll progress, route layout
  pages/                 one file per public route
  admin/                 dashboard screens and admin UI kit
convex/
  schema.ts              all tables
  lib.ts                 auth guard, validation, rate limits, notification email
  menus, specials, events, pageContent, seo, inquiries, marketing, analytics, settings, admins
  seed.ts, seedData.ts   starting content
public/                  logos, robots.txt, sitemap.xml
vercel.json              build, SPA rewrites, redirects from the old site, headers
.github/workflows/       nightly Convex backup
```

## Environment

Frontend (`.env.local`, set automatically by `convex dev`):

- `VITE_CONVEX_URL`
- `VITE_SITE_URL` (optional, defaults to https://www.siennamercato.com, used for canonical URLs)

Convex (`bun x convex env set NAME value`):

| Name                      | Purpose                                                         |
| ------------------------- | --------------------------------------------------------------- |
| `JWT_PRIVATE_KEY`, `JWKS` | Convex Auth signing keys                                        |
| `SITE_URL`                | Public site URL, used for auth and links in emails              |
| `ADMIN_EMAILS`            | Comma-separated owner emails that always have dashboard access  |
| `RESEND_API_KEY`          | Enables notification emails                                     |
| `EMAIL_FROM`              | Sender, e.g. `Sienna Mercato <notifications@siennamercato.com>` |
| `NOTIFY_EMAIL`            | Fallback recipient if none is set in dashboard Settings         |

See `docs/handoff.md` for launch, backups and the admin guide.
