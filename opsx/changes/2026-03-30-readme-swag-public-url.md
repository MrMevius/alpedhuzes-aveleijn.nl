# Title
Document SWAG reverse proxy deployment URL in README

# Context
User requested a README update to explicitly document that the site is published through SWAG (reverse proxy) and publicly available at `https://alpedhuzes-aveleijn.nl`.

# Goals / Non-goals
## Goals
- Add a clear deployment note in `README.md` describing SWAG reverse proxy publishing.
- Add the exact public URL: `https://alpedhuzes-aveleijn.nl`.
- Keep the change documentation-only and minimal.

## Non-goals
- No runtime, infrastructure, Docker, or nginx config changes.
- No frontend/backend code changes.
- No behavior changes to the application.

# Proposed approach
1. Add a short **Public deployment** section to `README.md`.
2. Keep language consistent with existing README tone.
3. Record completion and verification notes in this change spec.

# Implementation steps (ordered)
1. Create this change spec.
2. Update `README.md` with SWAG reverse proxy publication note and public URL.
3. Verify the README section content is present and correct.
4. Update this spec with What changed, How to verify, Verification evidence, and Current status.

# Acceptance criteria
1. `README.md` includes a deployment note that the site is published via SWAG (reverse proxy).
2. `README.md` includes `https://alpedhuzes-aveleijn.nl` as the public URL.
3. Change is documentation-only (no app behavior/config changes).
4. This spec includes verification details and is marked completed.

# Testing plan
- Documentation-only change; no code-path impact expected.
- Verification is done by reviewing `README.md` content updates.

# Risk + rollback plan
## Risks
- Minimal: inaccurate deployment wording could cause operator confusion.

## Rollback
- Revert `README.md` to previous version.

# Notes / links
- Existing nginx/SWAG setup already routes traffic to the app on container port `8099`.

# Current status
Completed

# What changed
- Updated `README.md` by adding a new **Public deployment** section.
- Added two bullets:
  - Production container is published via **SWAG** (reverse proxy).
  - Public URL is `https://alpedhuzes-aveleijn.nl`.

# How to verify
1. Open `README.md`.
2. Confirm section `## Public deployment` exists.
3. Confirm it includes:
   - `SWAG` and `reverse proxy` wording.
   - `https://alpedhuzes-aveleijn.nl` URL.

# Verification evidence
- Reviewed `README.md` after edit and confirmed the new `## Public deployment` section contains SWAG reverse proxy wording and the exact public URL.
- No tests executed because this is a docs-only change with no runtime/code impact.
