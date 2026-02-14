# AI Photo Gallery (Lens & Light)

React photo gallery demo (split into components).

## Project overview

- `src/App.js` — app composition, state and handlers
- `src/components/` — `Header`, `HeroCarousel`, `AlbumsGrid`, `ContactForm`, `GalleryModal`
- `src/data/images.json` — central JSON for hero and album images (edit this file to update content)

## How to run

Install dependencies and start the dev server:

```powershell
cd "Photo-Gallery/AI_Photo-Gallery"
npm install
npm start
```

If using `bun`:

```powershell
bun install
bun dev
```

## Updating images

Edit `src/data/images.json` to change hero images or albums. The file is imported at build time. For runtime-updatable images, host the JSON remotely and fetch it on startup (add a small loader in `src/lib/utils.js`).

## Versioning

- Project version: 0.1.0
- Last updated: 2026-02-14

## Notes & next steps

- The contact form currently uses a local `alert`. Pass an `onSubmit` handler to `ContactForm` to integrate with your backend.
- Consider moving the lazy-load logic to a small utility hook in `src/lib/utils.js` if you plan to reuse it.

---

Author: Lens & Light

License: MIT
