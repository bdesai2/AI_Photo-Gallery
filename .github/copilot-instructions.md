# Copilot Instructions for AI Coding Agents

Purpose: give an AI agent the minimal, actionable knowledge to be productive in this React photo-gallery repository.

**Big Picture:**
- **App type:** Single-page React app (Create React App / `react-scripts`) that serves a photography portfolio.
- **Major areas:** `src/components/` (UI components), `src/data` or `src/data.js` (image/album data), `public/` (static assets).
- **Why structured this way:** images and collections are driven by a central JSON/data file and composed by small presentational components (hero, gallery, modal). Keep UI logic in `src/components/*` and data in `src/data`.

**How to run / build / test**
- Install: `npm install` (repo uses `react-scripts`; `bun` is optional if present).
- Dev: `npm start` (runs `react-scripts start`, serves at `http://localhost:3000`).
- Build: `npm run build` (produces production bundle via `react-scripts build`).
- Test: `npm test` (runs `react-scripts test`).

**Key files to inspect when changing behavior**
- `src/App.js` — app composition, top-level state and handlers.
- `src/components/*` — look here for `HeroCarousel`/`HeroSlider`, `AlbumsGrid`, `AlbumView`, `ImageModal`, `ContactForm`.
- `src/data/images.json` or `src/data.js` — central source of hero and album images; editing this updates content.
- `public/` — static images and manifest; use for assets served at runtime.
- `package.json` — scripts and dependencies (`react-scripts`, Tailwind/PostCSS devDeps).

**Project-specific conventions**
- Components are small, presentational, and composed in `App.js`. Prefer adding small helper hooks in `src/lib/` if logic is reusable.
- Image collections are authored as static JSON imported at build time. If you add runtime fetching, update import usage and code that assumes synchronous imports.
- Tailwind is used; look for `tailwind.config.*` and PostCSS config when changing styles.

**Styling & assets**
- Tailwind + PostCSS are configured in the repo; editing CSS may require updating `tailwind.config.js` and re-building.
- Large images should be optimized and placed in `public/images/*` or referenced from `src/assets` and imported where necessary.

**Integrations & environment**
- Contact form currently uses a local alert by default. To integrate with email/API, replace `ContactForm`'s onSubmit with an async handler and store credentials in environment variables (do not commit secrets).

**PR / Change checklist for AI agents**
- Run `npm start` locally and confirm no runtime errors for your change.
- If you modify image data, update `src/data` and confirm gallery renders new items.
- Keep component changes minimal and add a small test or manual check steps in PR description.

**Notes discovered in repo**
- This repo uses `react-scripts` (Create React App) — prefer existing scripts over introducing new build tools.
- README contains leftover merge conflict markers; do not assume it is authoritative for every detail. Validate commands by reading `package.json`.

If anything is unclear or you want the agent to follow stricter rules (formatting, branching, tests), tell me which area to expand and I'll iterate.
