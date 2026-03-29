# alpedhuzes-aveleijn.nl

Code-first rebuild of the Alpe d'HuZes Aveleijn website.

## Stack

- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express
- Styling: CSS Modules + minimal global styles
- Runtime: single Docker container on port `8099`

## Current phase status

- ✅ Phase 0–5 foundations implemented (scaffold, content model, styling modules, assets, progress API, tests, container validation)
- ⚠️ Phase 6 parity review completed with documented deviations in `docs/review/`

## Project layout

- `src/` frontend app
- `server/` backend API and services
- `content/` editable content files
- `public/assets/` local site media
- `tests/` test fixtures and test files
- `docs/review/` migration/parity/responsive/text-quirk review outputs
- `openspec/` change artifacts
- `opsx/` change specs and verification notes

## Development

```bash
npm install
npm run dev
```

- Vite frontend: `http://localhost:5173`
- Express API: `http://localhost:8099`

## Build + run

```bash
npm run build
npm start
```

Production app listens on `http://localhost:8099`.

## Tests

```bash
npm run test
```

Current tests cover scraper parsing and progress cache/fallback behavior.

## API endpoints

- `GET /api/health`
- `GET /api/progress` (live server-side aggregation from 3 fundraiser pages, 1-hour cache, stale fallback)

## Docker

```bash
docker build -t alpedhuzes-aveleijn .
docker run --rm -p 8099:8099 alpedhuzes-aveleijn
```

## Architecture notes

- Homepage is section-modular under `src/sections/*`.
- Section content is loaded from typed local files in `content/sections/*.json`.
- Site-owned assets are local under `public/assets/*`.
- Progress scraping and caching logic is server-side under `server/services/*`.
- Contact in phase 1 is link-based only (no form).
