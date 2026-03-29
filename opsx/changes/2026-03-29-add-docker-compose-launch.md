## Title

Add Docker Compose production launch workflow

## Context

The repository currently documents Docker usage via `docker build` + `docker run`. The user wants a simpler, repeatable launch flow using `docker compose build --no-cache && docker compose up -d` while keeping the phase-1 runtime constraints (single container, port 8099).

## Goals / Non-goals

### Goals
- Add a production-oriented `docker-compose.yml` for one service.
- Support launch using `docker compose build --no-cache && docker compose up -d`.
- Keep host-to-container port mapping as `8099:8099` by default.
- Include fixed container name and restart policy.
- Include minimal environment variables (`NODE_ENV=production`, `PORT=8099`).
- Include a healthcheck against `GET /api/health`.
- Update README with Docker Compose usage commands.
- Add `.env.example` so compose defaults can be overridden without editing YAML.

### Non-goals
- No multi-container setup.
- No development/hot-reload compose profile.
- No app architecture changes.
- No change to required container runtime port (still `8099`).

## Proposed approach

Create a root-level `docker-compose.yml` with a single `app` service that builds from the existing Dockerfile. Configure ports, environment, restart behavior, and healthcheck. Parameterize selected compose values with environment-variable defaults so behavior remains unchanged without a `.env` file. Add `.env.example` documenting optional overrides. Update README with concise compose build/up/down/logs commands and env usage.

## Implementation steps (ordered)

1. Review `Dockerfile` to confirm production runtime command and port assumptions.
2. Add `docker-compose.yml` with one `app` service:
   - `build: .`
   - `container_name: alpedhuzes-aveleijn`
   - `restart: unless-stopped`
   - `ports: ["8099:8099"]`
   - `environment`: `NODE_ENV=production`, `PORT=8099`
   - `healthcheck` for `http://127.0.0.1:8099/api/health`
3. Update README with Docker Compose commands:
   - `docker compose build --no-cache`
   - `docker compose up -d`
   - `docker compose ps`
   - `docker compose logs`
   - `docker compose down`
4. Verify locally with compose commands and API checks.
5. Record verification results and finalize status.
6. Add `.env.example` and wire optional compose overrides with safe defaults.

## Acceptance criteria

- `docker compose build --no-cache && docker compose up -d` starts the app successfully.
- Website is reachable at `http://localhost:8099`.
- `GET /api/health` returns a successful response.
- Compose shows service running (and healthy if health status is available).
- README includes accurate Docker Compose usage.
- `.env.example` exists and compose remains valid with and without external env values.

## Testing plan

Run:

1. `docker compose build --no-cache`
2. `docker compose up -d`
3. `docker compose ps`
4. `curl -i http://127.0.0.1:8099/`
5. `curl -i http://127.0.0.1:8099/api/health`
6. `docker compose logs --no-color --tail=100 app`
7. `docker compose down`
8. `docker compose config`
9. `docker compose --env-file .env.example config`

## Risk + rollback plan

### Risks
- Healthcheck command may fail if required tooling is unavailable in the runtime image.
- Host port `8099` may already be in use.

### Rollback
- Revert `docker-compose.yml` and README changes.
- Continue using existing documented commands:
  - `docker build -t alpedhuzes-aveleijn .`
  - `docker run --rm -p 8099:8099 alpedhuzes-aveleijn`

## Notes / links

- Must comply with single-container deployment requirement and mandatory port 8099.
- Related README section: Docker.

## Current status

Completed

## What changed

- Added `docker-compose.yml` with a single production `app` service that:
  - builds from local `Dockerfile`
  - uses defaulted env interpolation for container/runtime controls:
    - `container_name: ${COMPOSE_CONTAINER_NAME:-alpedhuzes-aveleijn}`
    - `restart: ${RESTART_POLICY:-unless-stopped}`
    - `ports: "${HOST_PORT:-8099}:8099"`
    - `NODE_ENV: ${NODE_ENV:-production}`
    - `PORT: "8099"`
  - defines a healthcheck to `http://127.0.0.1:8099/api/health` via Node fetch
- Updated `README.md` with a new **Docker Compose** section containing build/up/ps/logs/down commands.
- Added `.env.example` with optional Compose overrides (`HOST_PORT`, `COMPOSE_CONTAINER_NAME`, `RESTART_POLICY`, `NODE_ENV`).
- Updated README compose section with `.env.example` usage and variable descriptions.
- Updated `.gitignore` to ignore local env override files (`.env`, `.env.local`, `.env.*.local`) while keeping `.env.example` trackable.

## How to verify

Run from repository root:

1. `docker compose build --no-cache`
2. `docker compose up -d`
3. `docker compose ps`
4. `curl --retry 20 --retry-delay 1 --retry-all-errors -i http://127.0.0.1:8099/`
5. `curl --retry 20 --retry-delay 1 --retry-all-errors -i http://127.0.0.1:8099/api/health`
6. `docker compose logs --no-color --tail=100 app`
7. `docker compose down`
8. `docker compose config`
9. `docker compose --env-file .env.example config`
10. `HOST_PORT=8100 COMPOSE_CONTAINER_NAME=alpedhuzes-aveleijn-custom RESTART_POLICY=always docker compose config`
11. `git check-ignore -v .env .env.local .env.development.local .env.example`

## Verification evidence

- `docker compose build --no-cache` succeeded and built image `alpedhuzes-aveleijnnl-app`.
- `docker compose up -d` succeeded and started service `app` on `0.0.0.0:8099->8099/tcp`.
- `curl -i http://127.0.0.1:8099/` returned `HTTP/1.1 200 OK` with `index.html`.
- `curl -i http://127.0.0.1:8099/api/health` returned `HTTP/1.1 200 OK` with JSON status payload.
- `docker compose ps` showed container status `healthy`.
- `docker compose logs --no-color --tail=100 app` included `Server listening on http://localhost:8099`.
- `docker compose down` succeeded and removed container/network cleanly.
- `docker compose config` succeeded without requiring `.env` and rendered defaults (`alpedhuzes-aveleijn`, `8099`, `unless-stopped`, `production`).
- `docker compose --env-file .env.example config` succeeded using example env defaults.
- `HOST_PORT=8100 COMPOSE_CONTAINER_NAME=alpedhuzes-aveleijn-custom RESTART_POLICY=always docker compose config` rendered overridden values (`published: "8100"`, custom container name, `restart: always`).
- `git check-ignore -v .env .env.local .env.development.local .env.example` showed ignore matches for local env files and no ignore match for `.env.example`.
