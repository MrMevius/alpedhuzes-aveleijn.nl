# Tasks: rebuild-wordpress-phase1

## Phase 0 — Foundation and scaffolding
- [x] Initialize React + TypeScript + Vite frontend structure.
- [x] Initialize Express backend structure in same repository.
- [x] Set up single runtime entrypoint for app + API.
- [x] Add `GET /api/health` baseline endpoint.

## Phase 1 — Content contracts and section shells
- [x] Create `/content/site.json` and `/content/sections/*.json` files.
- [x] Define TypeScript interfaces for all content structures.
- [x] Implement content loading utilities and validation boundaries.
- [x] Build section shells: Hero, Progress, About, Funding, Actions, Gallery, Sponsoring, Sponsors, Contact, Footer.

## Phase 2 — UI modularization and styling
- [x] Implement section components under `/src/sections` with CSS Modules.
- [x] Add global tokens/reset/base/layout styles under `/src/styles`.
- [x] Build shared primitives in `/src/components` only where reusable.
- [x] Ensure no hardcoded section content in JSX.

## Phase 3 — Asset migration
- [x] Inventory all media from source site.
- [x] Copy site-owned assets to `/public/assets` (images/gallery/logos/icons).
- [x] Replace hotlinked references with local paths.
- [x] Add graceful fallbacks for missing assets and record gaps.

## Phase 4 — Progress API and scraper resilience
- [x] Implement fundraiser scraping service for 3 approved URLs.
- [x] Implement progress aggregation service with 1-hour cache.
- [x] Add stale fallback to last-known-good result on scrape failure.
- [x] Expose `GET /api/progress` with structured metadata.

## Phase 5 — Verification and containerization
- [x] Add scraper/parsing tests with fixtures.
- [x] Add cache fallback behavior tests.
- [x] Add multi-stage Docker build and runtime port 8099.
- [x] Validate one-container run behavior and health endpoint.

## Phase 6 — Parity and handoff
- [x] Perform section-by-section parity QA (content/visual/function).
- [x] Perform responsive QA (mobile/tablet/desktop).
- [x] Create text-quirks review file (do not silently rewrite).
- [x] Update README run/build/test instructions and architecture notes.

## Exit criteria
- [x] All acceptance criteria in OPSX change spec are met.
- [x] Verification steps documented with evidence.
- [x] Current status set to Completed.
