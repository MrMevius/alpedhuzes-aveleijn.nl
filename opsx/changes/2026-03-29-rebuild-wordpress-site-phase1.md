# Title
Rebuild WordPress site as a code-first single-container phase-1 landing page

# Context
The current repository is greenfield and only contains project guidance documents. The target website currently runs on WordPress at `https://alpedhuzes-aveleijn.nl`. The project needs a maintainable code-first replacement that preserves visible content and structure in phase 1 while improving internal architecture.

# Goals / Non-goals
## Goals
- Rebuild the website as a modular single-page React + TypeScript + Vite frontend with an Express backend in the same repo/container.
- Keep architecture content-driven with editable files under `/content`.
- Preserve phase-1 visible copy and structure (including current quirks/typos).
- Implement a dynamic progress API in the same container, aggregating totals from the 3 approved fundraiser pages.
- Add server-side cache (1 hour) and stale fallback to last known good value on scrape failure.
- Run in exactly one Docker container on port `8099`.

## Non-goals
- No WordPress runtime/dependencies.
- No contact form in phase 1 (contact links only).
- No database in phase 1.
- No broad feature expansion beyond parity-focused phase-1 sections.

# Proposed approach
1. Define OpenSpec artifacts first (proposal/design/tasks/specs) as implementation contract.
2. Scaffold project structure for frontend, backend, content, assets, and tests.
3. Implement section-by-section rendering from typed local content files.
4. Implement robust fundraiser scraping service + progress API with cache and stale fallback.
5. Migrate media to local assets and complete parity/responsive verification.

# Implementation steps (ordered)
1. Create OpenSpec artifacts for proposal, design, tasks, and capability specs.
2. Scaffold React + TypeScript + Vite + Express monorepo-style app layout in one runtime container.
3. Add content schema/types and JSON files for all sections.
4. Implement homepage sections with CSS Modules and shared design tokens.
5. Add `/api/health` and `/api/progress` with scrape + cache + fallback behavior.
6. Add tests for scraper/parser and cache fallback behavior.
7. Add Docker multi-stage build and runtime configuration on port `8099`.
8. Perform parity and responsive QA and record deviations/quirks review.

# Acceptance criteria
1. OpenSpec artifacts exist for this change: proposal, design, tasks, and specs.
2. Architecture is documented with exact folder layout and phased implementation order.
3. Risks and mitigations are documented for scraping fragility, asset migration, visual parity, and responsive behavior.
4. Planned solution preserves content-driven modular section architecture and single-container constraint.
5. Progress API design includes the 3 required fundraiser sources, 1-hour cache, and last-known-good fallback.

# Testing plan
- Planning artifact validation only for this step:
  - Confirm all required OpenSpec files exist.
  - Verify each artifact includes required scope, phases, decisions, and risk treatment.

# Risk + rollback plan
## Risks
- Scope drift from parity into new feature work.
- Ambiguity in exact source-site section/content mapping.
- Upstream fundraiser markup changes affecting scraper stability.

## Rollback
- Revert planning artifacts and re-scope in a new proposal revision.
- Keep implementation gated until specs are approved.

# Notes / links
- Source site: https://alpedhuzes-aveleijn.nl
- Fundraiser pages:
  1. https://inschrijving.opgevenisgeenoptie.nl/fundraisers/Aveleijnsamensterk1
  2. https://inschrijving.opgevenisgeenoptie.nl/fundraisers/aveleijnsamensterk2
  3. https://inschrijving.opgevenisgeenoptie.nl/fundraisers/pienkamp

# Current status
Completed

# What changed
- Created a new active OPSX change spec for the WordPress-to-code-first phase-1 rebuild.
- Captured scope boundaries, goals/non-goals, implementation order, acceptance criteria, and risk strategy.
- Created OpenSpec change artifacts under `openspec/changes/rebuild-wordpress-phase1/`:
  - `proposal.md`
  - `design.md`
  - `tasks.md`
  - `specs/landing-page/spec.md`
  - `specs/progress-api/spec.md`
  - `specs/content-model/spec.md`
- Documented exact target folder structure, phased implementation sequence, technical decisions, and risk mitigations.
- Implemented Phase 0 scaffold for application runtime:
  - Added React + TypeScript + Vite frontend bootstrap (`src/`, `index.html`, `vite.config.ts`).
  - Added Express backend bootstrap with baseline routes (`server/index.ts`, `server/routes/health.ts`, `server/routes/progress.ts`).
  - Added unified project scripts for dev/build/typecheck/start in `package.json`.
  - Added baseline content and directory structure (`content/`, `public/assets/`, `tests/`).
  - Added Docker multi-stage runtime baseline on port `8099` (`Dockerfile`, `.dockerignore`).
  - Updated `README.md` with stack, run/build, endpoints, and Docker commands.
- Implemented Phase 1 content-contract and section-shell foundation:
  - Added typed content contracts in `src/types/content.ts`.
  - Added runtime content parsing/validation at load boundary in `src/lib/contentLoader.ts` and `src/lib/validators.ts`.
  - Wired `AppShell` to load and render content-driven section modules in order.
  - Added section shell components for Hero, Progress, About, Funding, Actions, Gallery, Sponsoring, Sponsors, Contact, and Footer under `src/sections/*`.
  - Added shared section layout primitive in `src/components/layout/SectionBlock.tsx`.
  - Extended content files with `sectionId` fields and basic site footer structure.
  - Updated `openspec/changes/rebuild-wordpress-phase1/tasks.md` to mark Phase 0 and Phase 1 tasks complete.
- Fixed server static-serving behavior to serve built frontend whenever `dist/` exists (not gated only by `NODE_ENV`).
- Implemented Phase 2 UI modularization and styling:
  - Added CSS Modules for shared layout primitive and each section component:
    - `src/components/layout/SectionBlock.module.css`
    - `src/sections/*/*.module.css`
  - Updated all section components to use module-scoped class names instead of global section classes.
  - Kept global style layer minimal (`reset.css`, `tokens.css`, `base.css`, `layout.css`) and removed section-specific global rules from `layout.css`.
  - Kept reusable section wrapper primitive in `/src/components/layout/SectionBlock.tsx`.
  - Moved remaining hardcoded sponsorship table header labels into content:
    - `content/sections/sponsoring.json` now includes `tableHeaders`.
    - `src/types/content.ts` and `src/lib/contentLoader.ts` updated accordingly.
  - Moved footer navigation aria label into content (`content/site.json`) and wired through typed loader.
  - Updated `openspec/changes/rebuild-wordpress-phase1/tasks.md` to mark Phase 2 tasks complete.
- Implemented Phase 3 asset migration:
  - Downloaded source-site media into local assets under `/public/assets/images`, `/public/assets/gallery`, and `/public/assets/logos`.
  - Added local placeholder fallback asset at `/public/assets/images/placeholder-image.svg`.
  - Added reusable image fallback component `src/components/ui/ImageWithFallback.tsx` and wired it into Hero, About, Actions, Gallery, and Sponsors sections.
  - Replaced remote image references with local paths in content files:
    - `content/sections/hero.json`
    - `content/sections/about.json`
    - `content/sections/actions.json`
    - `content/sections/gallery.json`
    - `content/sections/sponsors.json`
  - Added contact link content in `content/sections/contact.json` and footer copyright quirk in `content/site.json`.
  - Added asset migration review document with mapping and known gaps:
    - `docs/review/asset-migration-audit.md`
  - Updated content typing/loading to support migrated image fields (`src/types/content.ts`, `src/lib/contentLoader.ts`).
  - Updated `openspec/changes/rebuild-wordpress-phase1/tasks.md` to mark Phase 3 tasks complete.
- Implemented Phase 4 progress API and scraper resilience:
  - Added fundraiser HTML parsing and scraping service with timeout and defensive extraction fallbacks:
    - `server/services/fundraiserScraper.ts`
    - `server/lib/numberParser.ts`
  - Added in-memory TTL cache utility:
    - `server/services/cacheStore.ts`
  - Added progress aggregation service with:
    - required 3 fundraiser URLs,
    - 1-hour cache,
    - last-known-good fallback when refresh fails,
    - goal loaded from local content (`content/sections/progress.json`),
    - structured response metadata (`isStale`, `updatedAt`, `lastSuccessAt`, per-source results):
      - `server/services/progressService.ts`
      - `server/types/progress.ts`
  - Replaced scaffold `/api/progress` route with live service-backed route:
    - `server/routes/progress.ts`
  - Updated `openspec/changes/rebuild-wordpress-phase1/tasks.md` to mark Phase 4 tasks complete.
- Implemented Phase 5 verification and containerization evidence:
  - Added server test runner support via Vitest:
    - `package.json` (`test` script)
    - `vitest` dev dependency
  - Added scraper parsing fixtures and tests:
    - `tests/server/fixtures/fundraiser-amountRaised.html`
    - `tests/server/fixtures/fundraiser-moneyStrong.html`
    - `tests/server/fundraiserScraper.test.ts`
  - Added cache/fallback behavior tests:
    - `tests/server/progressService.test.ts`
  - Refactored progress service for testability with dependency injection while preserving runtime behavior:
    - `server/services/progressService.ts` (`createProgressService`, TTL constants, default service exports)
  - Marked Phase 5 tasks complete in:
    - `openspec/changes/rebuild-wordpress-phase1/tasks.md`
- Implemented Phase 6 parity and handoff artifacts:
  - Added section-by-section parity checklist with achieved/partial gaps:
    - `docs/review/parity-checklist.md`
  - Added responsive QA report (mobile/tablet/desktop audit + risks):
    - `docs/review/responsive-qa.md`
  - Added text quirks review file to track copy quirks without silent rewrites:
    - `docs/review/text-quirks-review.md`
  - Updated README with current phase status, test command, architecture notes, and updated `/api/progress` behavior.
  - Marked Phase 6 and OpenSpec exit criteria complete in:
    - `openspec/changes/rebuild-wordpress-phase1/tasks.md`

# How to verify
1. Confirm this file exists at `opsx/changes/2026-03-29-rebuild-wordpress-site-phase1.md`.
2. Confirm acceptance criteria and implementation steps align with the requested phase-1 architecture plan.
3. Confirm OpenSpec artifacts exist in `openspec/changes/rebuild-wordpress-phase1/` with proposal/design/tasks/spec files.
4. Run install and validation commands:
   - `npm install`
   - `npm run typecheck`
   - `npm run build`
5. Smoke test server health endpoint from built output:
   - `node dist-server/index.js` (or background process) and request `GET http://127.0.0.1:8099/api/health`.
6. Smoke test root static serving from built output:
   - `node dist-server/index.js` (or background process) and request `GET http://127.0.0.1:8099/`.
7. Confirm Phase 2 task checklist in OpenSpec:
   - `openspec/changes/rebuild-wordpress-phase1/tasks.md` shows Phase 2 checkboxes marked complete.
8. Confirm Phase 3 task checklist in OpenSpec:
   - `openspec/changes/rebuild-wordpress-phase1/tasks.md` shows Phase 3 checkboxes marked complete.
9. Confirm local asset serving from built server:
   - Request `GET http://127.0.0.1:8099/assets/images/hero-bg-willem-kiers.jpg` and expect HTTP 200.
10. Verify progress API behavior:
   - Request `GET http://127.0.0.1:8099/api/progress` and confirm response includes:
     - `totalEur`, `goalEur`, `percentage`
     - `isStale`, `updatedAt`, `lastSuccessAt`, `cacheTtlSeconds`
     - `sources` array with the 3 required fundraiser URLs.
11. Verify cache stability:
   - Call `GET /api/progress` twice quickly and confirm `updatedAt` remains the same during TTL window.
12. Run automated tests:
   - `npm run test`
13. Validate Docker image and single-container runtime on port 8099:
   - `docker build -t alpedhuzes-aveleijn:phase5 .`
   - `docker run -d -p 8099:8099 alpedhuzes-aveleijn:phase5`
   - request `GET http://127.0.0.1:8099/api/health`
14. Confirm Phase 5 task checklist in OpenSpec:
   - `openspec/changes/rebuild-wordpress-phase1/tasks.md` shows Phase 5 checkboxes marked complete.
15. Confirm Phase 6 review outputs exist:
   - `docs/review/parity-checklist.md`
   - `docs/review/responsive-qa.md`
   - `docs/review/text-quirks-review.md`
16. Confirm OpenSpec close-out status:
   - `openspec/changes/rebuild-wordpress-phase1/tasks.md` shows Phase 6 + Exit criteria checked.

# Verification evidence
- File created and populated with required OPSX sections.
- Verified OpenSpec artifact files exist via glob listing:
  - `openspec/changes/rebuild-wordpress-phase1/proposal.md`
  - `openspec/changes/rebuild-wordpress-phase1/design.md`
  - `openspec/changes/rebuild-wordpress-phase1/tasks.md`
  - `openspec/changes/rebuild-wordpress-phase1/specs/landing-page/spec.md`
  - `openspec/changes/rebuild-wordpress-phase1/specs/progress-api/spec.md`
  - `openspec/changes/rebuild-wordpress-phase1/specs/content-model/spec.md`
- No runtime tests/lint executed for this increment because it only adds planning/specification artifacts and no application runtime code.
- Executed `npm install` successfully (dependencies installed).
- Executed `npm run typecheck` successfully.
- Executed `npm run build` successfully:
  - Vite produced frontend output in `dist/`.
  - TypeScript compiled backend output to `dist-server/`.
- Smoke-tested built server:
  - Started `node dist-server/index.js`.
  - Requested `GET /api/health` and received JSON with `status: "ok"`.
- Executed `npm run typecheck` after Phase 1 changes successfully.
- Executed `npm run build` after Phase 1 changes successfully.
- Executed `npm run build:server` after static-serving fix successfully.
- Smoke-tested built server after static-serving fix:
  - `GET /api/health` returned `status: "ok"`.
  - `GET /` returned built `index.html` with `<title>Alpe d'HuZes Aveleijn</title>`.
- Executed `npm run typecheck` after Phase 2 CSS/content wiring changes successfully.
- Executed `npm run build` after Phase 2 changes successfully (frontend + server).
- Smoke-tested built server after Phase 2 changes:
  - `GET /api/health` returned `status: "ok"`.
  - `GET /` returned built `index.html` with `<title>Alpe d'HuZes Aveleijn</title>`.
- Verified OpenSpec tasks document has Phase 2 items checked.
- Executed `npm run typecheck` after Phase 3 asset/content updates successfully.
- Executed `npm run build` after Phase 3 updates successfully (frontend + server).
- Smoke-tested built server after Phase 3 changes:
  - `GET /api/health` returned `status: "ok"`.
  - `GET /assets/images/hero-bg-willem-kiers.jpg` returned HTTP 200 with `Content-Type: image/jpeg`.
  - `GET /` returned built `index.html` with `<title>Alpe d'HuZes Aveleijn</title>`.
- Verified OpenSpec tasks document has Phase 3 items checked.
- Executed `npm run typecheck` after Phase 4 progress API implementation successfully.
- Executed `npm run build` after Phase 4 changes successfully (frontend + server).
- Smoke-tested built server after Phase 4 changes:
  - `GET /api/health` returned `status: "ok"`.
  - `GET /api/progress` returned live aggregated totals and metadata:
    - `totalEur: 37382.62`
    - `goalEur: 66666`
    - `percentage: 56`
    - `isStale: false`
    - `sources` contains all 3 required fundraiser URLs with `status: "ok"`.
- Verified cache behavior by calling `GET /api/progress` twice:
  - both responses returned same `updatedAt`, indicating cached response served within TTL.
- Verified OpenSpec tasks document has Phase 4 items checked.
- Installed updated dependencies with `npm install` (including Vitest).
- Executed `npm run test` successfully:
  - `tests/server/fundraiserScraper.test.ts` passed (3 tests)
  - `tests/server/progressService.test.ts` passed (3 tests)
- Executed `npm run typecheck` successfully after Phase 5 updates.
- Executed `npm run build` successfully after Phase 5 updates.
- Built Docker image successfully:
  - `docker build -t alpedhuzes-aveleijn:phase5 .`
- Validated single-container runtime and port 8099:
  - started container with `docker run -d -p 8099:8099 alpedhuzes-aveleijn:phase5`
  - `GET /api/health` returned `status: "ok"`
  - `GET /api/progress` returned live aggregated payload with required metadata.
- Verified OpenSpec tasks document has Phase 5 items checked.
- Added parity QA report at `docs/review/parity-checklist.md` with section-level status and known deviations.
- Added responsive QA report at `docs/review/responsive-qa.md` with mobile/tablet/desktop findings and risks.
- Added text quirks review at `docs/review/text-quirks-review.md` preserving known source quirks policy.
- Updated `README.md` to reflect current API behavior, test command, architecture notes, and phase status.
- Re-ran verification after Phase 6 documentation updates:
  - `npm run test` passed (2 files, 6 tests).
  - `npm run typecheck` passed.
  - `npm run build` passed.
  - smoke test: `GET /api/health` and `GET /api/progress` returned expected payloads.
- Verified OpenSpec tasks document has Phase 6 and exit criteria checked.
