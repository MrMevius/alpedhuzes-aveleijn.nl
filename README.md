# Alpe d'HuZes Aveleijn

Code-first rebuild of the Alpe d'HuZes Aveleijn website.

## Overview

This repository replaces the previous WordPress-based site with a maintainable, content-driven application.
It runs as a single Docker container exposed on port `8099`.

## Tech Stack

- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express
- Styling: CSS Modules + minimal global styles
- Runtime: Single Docker container on port `8099`

## Run with Docker

Requirements: Docker (with Compose support if you use the compose flow).

```bash
docker build -t alpedhuzes-aveleijn .
docker run --rm -p 8099:8099 alpedhuzes-aveleijn
```

App URL: `http://localhost:8099`

### Docker Compose (optional)

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

## API

- `GET /api/health`
- `GET /api/progress`

`/api/progress` aggregates fundraiser totals server-side, caches data for 1 hour, and falls back to the last known good value if refresh fails.

## Project Structure

- `src/` frontend application
- `server/` backend API and services
- `content/` editable section content
- `public/assets/` local media assets
- `tests/` unit tests and fixtures

## Public Deployment

- Published through **SWAG** (reverse proxy)
- Public URL: `https://alpedhuzes-aveleijn.nl`
