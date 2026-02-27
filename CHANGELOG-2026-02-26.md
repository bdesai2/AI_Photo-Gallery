# Changelog — 2026-02-26

Summary of changes made on 2026-02-26.

## Version

- Bumped project version to `1.0.1` (`package.json`).

## Files added

- `src/components/masonry.css` — Shared masonry layout styles for album and project galleries.

## Files updated

- `src/components/AlbumPage.js` — Removed inline masonry styles and imported shared `masonry.css`.
- `src/components/ProjectPage.js` —
  - Removed inline masonry styles and imported shared `masonry.css`.
  - Render project galleries using the shared masonry classes.
  - Added a photo-count badge next to each gallery title (e.g., “(12 photos)”).
- `src/App.js` — Forwarded `onOpenImage` handler into `ProjectRoute` so project thumbnails can open the global gallery modal.
- `package.json` — Version bumped to `1.0.1`.

## Why

- Centralized the masonry styles to ensure consistent gallery layout between album pages and project pages and simplify maintenance.
- Added photo counts to provide users quick context about gallery sizes.
