# Sienna Mercato

Marketing site for Sienna Mercato, a three-floor Italian restaurant at 942 Penn Avenue, Pittsburgh.

Vite, React 19, React Router, Tailwind v4. Icons come from the Phosphor web font loaded in `index.html`.

## Commands

```sh
bun install
bun run dev         # site only, no backend needed
bun run dev:convex  # Convex backend + Vite together
bun run build       # typecheck + production build to dist/
bun run check       # typecheck, lint, format check
bun run format
```

## Layout

```
src/
  main.tsx, router.tsx   entry and routes
  index.css              theme tokens and the few effects Tailwind can't express
  lib/site.ts            URLs, phone, floors, unsplash() helper
  content/               menus, events, catering data (edit copy here)
  hooks/                 parallax, scroll reveal, viewport height
  components/            shared UI (hero, fade-in, floor intro, happy hour, ...)
  components/layout/     nav, footer, scroll progress, route layout
  pages/                 one file per route, split into section components
convex/                  Convex backend with Password auth (not yet wired into the frontend)
```

Connecting the frontend to Convex needs a `ConvexAuthProvider` in `main.tsx` and `VITE_CONVEX_URL` set.
