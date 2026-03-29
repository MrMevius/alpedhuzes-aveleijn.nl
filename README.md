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

Detached sample command:

```bash
docker run -d --name alpedhuzes-aveleijn -p 8099:8099 alpedhuzes-aveleijn
```

Port mapping:

- Container port is fixed at `8099`.
- `-p 8099:8099` maps host `8099` to container `8099`.
- If host port `8099` is already in use, map another host port (example: `-p 8100:8099`).

Runtime environment (minimal):

- `NODE_ENV=production`
- `PORT=8099`

Container verification quick checks:

```bash
curl -i http://127.0.0.1:8099/
curl -i http://127.0.0.1:8099/api/health
curl -i http://127.0.0.1:8099/api/progress
```

Troubleshooting:

- **Container won't start**: run `docker logs alpedhuzes-aveleijn` to inspect startup errors.
- **Port conflict on 8099**: use a different host mapping (for example `-p 8100:8099`).
- **Healthcheck shows unhealthy**: verify `GET /api/health` responds locally in the container logs and that startup completed.
- **Progress endpoint looks stale/slow**: first request can be slower due to upstream scraping; stale fallback is expected if upstream fundraiser pages are temporarily unavailable.
- **Need to re-run cleanly**: `docker rm -f alpedhuzes-aveleijn` and start again.

## Architecture notes

- Homepage is section-modular under `src/sections/*`.
- Section content is loaded from typed local files in `content/sections/*.json`.
- Site-owned assets are local under `public/assets/*`.
- Progress scraping and caching logic is server-side under `server/services/*`.
- Contact in phase 1 is link-based only (no form).
