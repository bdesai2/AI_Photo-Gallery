# Changelog

All notable changes to this project.

## [0.1.0] - 2026-02-14
- Split `src/App.js` into components: `Header`, `HeroCarousel`, `AlbumsGrid`, `ContactForm`, `GalleryModal`.
- Added component files under `src/components/`.
- Introduced `src/data/images.json` as the central image manifest and updated `src/App.js` to import it.
- Created `public/images/` folders (hero + albums subfolders) and updated JSON to use relative `/images/...` URLs.
- Added `src/lib/utils.js` with `useLazyLoadImages` hook and replaced inline IntersectionObserver logic.
- Added comments throughout components and `App.js` to improve readability.
- Updated `README.md` with run instructions and image-edit guidance.

## [0.0.1] - 2026-02-13
- Initial single-file app (prior to component extraction and reorganization).
