# alpedhuzes-aveleijn.nl

Code-first rebuild of the Alpe d'HuZes Aveleijn website.

## Tech stack

- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express
- Styling: CSS Modules + minimal global styles
- Runtime: single Docker container on port `8099`

## Repository structure

- `src/` frontend app
- `server/` backend API + services
- `content/` editable section content
- `public/assets/` local media files
- `tests/` unit tests + fixtures
- `docs/review/` migration/parity review notes
- `opsx/` active change specs and verification logs
- `openspec/` original phase-1 artifact history

## Local development

```bash
npm install
npm run dev
```

- Frontend (Vite): `http://localhost:5173`
- Backend (Express): `http://localhost:8099`

## Build and run

```bash
npm run build
npm start
```

Production server listens on `http://localhost:8099`.

## Tests and type checks

```bash
npm run typecheck
npm run test
```

Current test focus: fundraiser scraping and progress cache/fallback behavior.

## API endpoints

- `GET /api/health`
- `GET /api/progress`

`/api/progress` performs server-side aggregation from configured fundraiser pages, uses a 1-hour cache, and returns stale fallback data when refresh fails.

## Docker

### Docker run

```bash
docker build -t alpedhuzes-aveleijn .
docker run --rm -p 8099:8099 alpedhuzes-aveleijn
```

### Docker Compose

```bash
docker compose build --no-cache
docker compose up -d
```

Optional `.env` overrides:

```bash
cp .env.example .env
```

Supported variables:

- `HOST_PORT` (default `8099`)
- `COMPOSE_CONTAINER_NAME` (default `alpedhuzes-aveleijn`)
- `RESTART_POLICY` (default `unless-stopped`)
- `NODE_ENV` (default `production`)

Useful commands:

```bash
docker compose ps
docker compose logs --no-color --tail=100 app
docker compose down
```

## Public deployment

- The production container is published via **SWAG** (reverse proxy).
- Public URL: `https://alpedhuzes-aveleijn.nl`

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for contribution guidelines and workflow expectations.
