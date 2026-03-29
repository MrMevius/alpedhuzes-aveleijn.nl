# Title
Phase 5: containerize and finalize deployment

# Context
The project already has a working React + Express architecture and a baseline Docker setup. Phase 5 finalizes production containerization so the application is shipped and run as one production-ready container on port 8099, with clear runtime documentation and verifiable health behavior.

# Goals / Non-goals
## Goals
- Provide a production-ready multi-stage Docker build.
- Run frontend + backend in one runtime container/process setup.
- Expose and serve on port `8099`.
- Keep environment handling minimal and explicit.
- Include local content/assets required by production runtime.
- Add/maintain container healthcheck support.
- Add a clean `.dockerignore`.
- Verify container serves:
  - homepage (`/`)
  - `GET /api/health`
  - `GET /api/progress`
- Update README with docker usage, port mapping, sample run command, and troubleshooting.

## Non-goals
- No multi-container orchestration.
- No deployment platform-specific manifests (Kubernetes, Compose stacks, etc.).
- No changes to product content or section behavior unrelated to container runtime.

# Proposed approach
1. Align Dockerfile with a clean multi-stage flow (dependencies/build/runtime).
2. Ensure runtime image contains only production deps + compiled output + required local content/assets.
3. Keep runtime process simple and production-safe (`node dist-server/index.js`).
4. Harden `.dockerignore` to reduce context size and avoid dev artifacts.
5. Update README with exact docker build/run instructions, port mapping, and troubleshooting.
6. Run container smoke checks for `/`, `/api/health`, and `/api/progress`.

# Implementation steps (ordered)
1. Create and activate this Phase 5 change spec.
2. Update Dockerfile for finalized multi-stage production flow.
3. Update `.dockerignore`.
4. Update README Docker/deployment docs.
5. Build container image and run it locally.
6. Verify homepage and API endpoints from container.
7. Update this spec with What changed / How to verify / Verification evidence / Current status.

# Acceptance criteria
1. Dockerfile is multi-stage and produces a single runtime container image.
2. Runtime container exposes and serves on port `8099`.
3. Frontend and backend are served together from one production-safe process setup.
4. `.dockerignore` exists and excludes unnecessary local/dev artifacts.
5. Runtime environment variables are minimal and clearly documented (`NODE_ENV`, `PORT`).
6. Healthcheck support is present for container runtime.
7. Local content/assets required at runtime are included in image.
8. Verified container responses:
   - `/` returns homepage HTML
   - `/api/health` returns healthy JSON
   - `/api/progress` returns expected JSON payload
9. README includes:
   - docker build command
   - docker run command
   - explicit port mapping guidance
   - troubleshooting notes
   - sample detached run command:
     `docker run -d --name alpedhuzes-aveleijn -p 8099:8099 <image>`

# Testing plan
- Build image: `docker build -t alpedhuzes-aveleijn .`
- Run container: `docker run -d --name alpedhuzes-aveleijn -p 8099:8099 alpedhuzes-aveleijn`
- Verify endpoints:
  - `curl -i http://127.0.0.1:8099/`
  - `curl -i http://127.0.0.1:8099/api/health`
  - `curl -i http://127.0.0.1:8099/api/progress`
- Optional inspect:
  - `docker ps`
  - `docker logs alpedhuzes-aveleijn`

# Risk + rollback plan
## Risks
- Host machine may not have Docker daemon available during verification.
- Third-party fundraiser source instability can affect `/api/progress` freshness.

## Rollback
- Revert Dockerfile/README/.dockerignore changes to previous revision.
- Keep this spec’s verification notes for follow-up iteration.

# Notes / links
- Runtime target port: `8099`
- Required API endpoints: `GET /api/health`, `GET /api/progress`

# Current status
Completed

# What changed
- Finalized Docker multi-stage build in `Dockerfile` with explicit stages:
  - `deps`: installs dependencies with `npm ci`
  - `build`: compiles frontend + server (`npm run build`)
  - `runtime`: installs production-only dependencies with `npm ci --omit=dev`, copies build output/content/assets, and runs the Node server
- Kept runtime process model as a single production-safe process:
  - `CMD ["node", "dist-server/index.js"]`
- Confirmed clean/minimal runtime env handling in image:
  - `NODE_ENV=production`
  - `PORT=8099`
- Preserved and validated container healthcheck support:
  - probes `http://127.0.0.1:8099/api/health`
- Ensured local runtime files are included in image:
  - `/dist` (frontend build)
  - `/dist-server` (backend build)
  - `/content` (editable content)
  - `/public` (local assets source directory)
- Expanded `.dockerignore` to reduce context/dev noise and avoid shipping local-only files:
  - added ignores for editor/system artifacts, env files, coverage/tmp, and ops/spec docs directories.
- Updated Docker docs in `README.md` to include:
  - docker build command
  - docker run command
  - sample detached run command
  - explicit port mapping explanation
  - minimal runtime env notes
  - troubleshooting guidance

# How to verify
1. Build image:
   - `docker build -t alpedhuzes-aveleijn .`
2. Run container (detached):
   - `docker run -d --name alpedhuzes-aveleijn -p 8099:8099 alpedhuzes-aveleijn`
3. Verify homepage serves:
   - `curl -i http://127.0.0.1:8099/`
   - expect `HTTP/1.1 200 OK` and HTML content.
4. Verify health endpoint serves:
   - `curl -i http://127.0.0.1:8099/api/health`
   - expect `HTTP/1.1 200 OK` and JSON with `status: "ok"`.
5. Verify progress endpoint serves:
   - `curl -i http://127.0.0.1:8099/api/progress`
   - expect `HTTP/1.1 200 OK` and JSON payload with `totalRaised`, `goal`, `percentage`, `lastUpdated`, `sources`, `cacheAgeSeconds`, `isStale`.
6. Verify healthcheck/port mapping state:
   - `docker ps --filter "name=alpedhuzes-aveleijn" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"`

# Verification evidence
- `docker build -t alpedhuzes-aveleijn .` succeeded.
- `docker run -d --name alpedhuzes-aveleijn -p 8099:8099 alpedhuzes-aveleijn` succeeded.
- `curl -i http://127.0.0.1:8099/` returned `HTTP/1.1 200 OK` and homepage HTML.
- `curl -i http://127.0.0.1:8099/api/health` returned `HTTP/1.1 200 OK` with:
  - `{"status":"ok","service":"alpedhuzes-aveleijn.nl",...}`
- `curl -i http://127.0.0.1:8099/api/progress` returned `HTTP/1.1 200 OK` with required fields, including:
  - `totalRaised: 37382.62`
  - `goal: 66666`
  - `percentage: 56`
  - `sources` (3 fundraiser URLs)
  - `cacheAgeSeconds: 0`
  - `isStale: false`
- `docker ps ...` showed container healthy and mapped:
  - `alpedhuzes-aveleijn   Up (healthy)   0.0.0.0:8099->8099/tcp`
- `docker logs alpedhuzes-aveleijn` showed clean startup:
  - `Server listening on http://localhost:8099`
