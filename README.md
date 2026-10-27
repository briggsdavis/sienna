# Sienna

Run `bun install` and `bun run dev` to start the site locally.
Run `bun run build` for a production build; the output is in `dist`.

The website runs without Convex or any environment variables. On Vercel,
use the Vite preset with `bun run build` as the build command and `dist`
as the output directory.

The Convex backend files and dependencies are retained for future features,
but the website does not initialize a Convex client or authentication provider.
If backend work is needed later, `bun run dev:convex` starts the Convex setup
and Vite together. Connecting the frontend will require adding a provider and
configuring `VITE_CONVEX_URL` at that time.
