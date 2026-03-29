# Design: Code-first architecture for alpedhuzes-aveleijn.nl phase 1

## Architecture overview

Single deployable container hosting:
1. **Express server** for API + static asset delivery
2. **Vite-built React SPA** served by Express

### Runtime flow
1. Browser requests `/` → Express serves frontend build.
2. Frontend renders modular sections from typed local JSON content.
3. Progress section requests `GET /api/progress`.
4. Server uses scraper service with 1-hour cache.
5. On scrape failure, server returns last-known-good payload.

## Structural design

```text
/
├─ content/
│  ├─ site.json
│  └─ sections/
│     ├─ hero.json
│     ├─ progress.json
│     ├─ about.json
│     ├─ funding.json
│     ├─ actions.json
│     ├─ gallery.json
│     ├─ sponsoring.json
│     ├─ sponsors.json
│     └─ contact.json
├─ public/assets/{images,gallery,logos,icons}/
├─ src/{app,components,sections,lib,types,styles}/
├─ server/{routes,services,lib,types}/
├─ tests/{server,content}/
└─ Dockerfile
```

## Section modularity model
- Each section lives in its own folder under `/src/sections/<SectionName>/`.
- Each section has:
  - dedicated component,
  - dedicated CSS module for non-trivial styles,
  - explicit typed content interface.
- Sections render shared primitives only; no cross-section state coupling.

## Content model strategy
- Source of truth: local JSON under `/content`.
- Strong TypeScript interfaces in `/src/types/content.ts`.
- Content validation at load boundaries (startup or loader layer).
- No duplication of content strings in JSX.

## Progress API design

Endpoint contract:
- `GET /api/health` → service health metadata.
- `GET /api/progress` → aggregated fundraiser totals and metadata.

Sources (required):
1. `https://inschrijving.opgevenisgeenoptie.nl/fundraisers/Aveleijnsamensterk1`
2. `https://inschrijving.opgevenisgeenoptie.nl/fundraisers/aveleijnsamensterk2`
3. `https://inschrijving.opgevenisgeenoptie.nl/fundraisers/pienkamp`

Resilience strategy:
- Scrape server-side only.
- Cache TTL: 1 hour.
- If refresh fails, keep serving last known good data.
- Return metadata fields (e.g., `updatedAt`, `lastSuccessAt`, `isStale`, `sources`).

## Styling strategy
- CSS Modules for section/component-level styles.
- Minimal global styles only for reset/tokens/base/layout.
- Responsive behavior across mobile/tablet/desktop using shared tokens.

## Docker strategy
- Multi-stage build:
  1. build frontend/backend artifacts,
  2. produce slim runtime image.
- Exactly one container.
- Expose and run on port `8099`.

## Key technical decisions
1. **Single-container Express + static frontend** to satisfy deployment constraint.
2. **Content-driven JSON architecture** to optimize maintainability.
3. **Dedicated scraper service isolation** to keep routes thin and testable.
4. **Stale fallback behavior** to prevent homepage breakage on scrape errors.
5. **Local-first asset policy** to remove hotlink dependencies.

## Risk register and mitigations

### 1) Scraping fragility
- Risk: upstream HTML changes break extraction.
- Mitigation: defensive parsing selectors, currency normalization, fixture tests, stale fallback.

### 2) Asset migration
- Risk: missing files/quality mismatches or external-hosted logos.
- Mitigation: asset inventory, local copy workflow, placeholders + audit notes for unresolved items.

### 3) Visual parity
- Risk: non-trivial drift from source styling.
- Mitigation: section-by-section parity pass, snapshot comparisons, deliberate token tuning.

### 4) Responsive behavior
- Risk: table/gallery/contact layouts degrade on small screens.
- Mitigation: mobile-first CSS, breakpoint checks per section, overflow-safe sponsorship table design.

## Open questions
1. Final approach for missing/unavailable source assets (placeholder vs deferred release gate).
2. Exact progress number formatting parity (rounded whole euros vs precise decimals) after implementation checks.

## Status
Drafted
