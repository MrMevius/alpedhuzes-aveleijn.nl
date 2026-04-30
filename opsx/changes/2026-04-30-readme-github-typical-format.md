# Title
Restructure README to a typical compact GitHub format

# Context
The user requested a full README refactor into a typical GitHub `README.md` format. Scope was clarified through step-by-step questions: English language, businesslike tone, compact essentials, Docker-only run flow, no badges, no Contributing/Contact section, include API endpoints briefly, and no visual/demo section.

# Goals / Non-goals
## Goals
- Reformat `README.md` into a compact, standard GitHub structure.
- Keep existing repository information where practical, but improve layout and clarity.
- Present Docker as the only documented run path.
- Briefly document `GET /api/health` and `GET /api/progress`.

## Non-goals
- No frontend/backend code changes.
- No runtime behavior changes.
- No infrastructure or Docker behavior changes.
- No addition of badges, contribution guide section, or visual gallery/demo content.

# Proposed approach
1. Create a new change spec for this documentation update.
2. Rewrite `README.md` sections into a compact GitHub-style format.
3. Keep content factual and aligned with existing project setup.
4. Verify content presence and scope boundaries.

# Implementation steps (ordered)
1. Create this change spec file.
2. Update `README.md` structure and wording according to approved choices.
3. Verify required sections and constraints are met.
4. Update this change spec with What changed, How to verify, Verification evidence, and Current status.

# Acceptance criteria
1. README is written in English.
2. README uses a clean, businesslike, compact structure.
3. Existing information is primarily restructured rather than fully reinvented.
4. Runtime instructions are Docker-only.
5. No badges are added.
6. No Contributing or Contact section is present.
7. API endpoints `GET /api/health` and `GET /api/progress` are included briefly.
8. No visual/screenshot/demo section is included.
9. This change spec is completed with verification details.

# Testing plan
- Docs-only change; no code-path changes expected.
- Verify by reviewing `README.md` for required sections and exclusions.

# Risk + rollback plan
## Risks
- Minor: unintentionally dropping important operational details while compacting content.

## Rollback
- Revert `README.md` and this spec file to previous commit state.

# Notes / links
- Project runtime requirement remains a single Docker container on port `8099`.

# Current status
Completed

# What changed
- Reworked `README.md` into a compact, typical GitHub structure with clear sectioning:
  - `Overview`
  - `Tech Stack`
  - `Run with Docker`
  - `API`
  - `Project Structure`
  - `Public Deployment`
- Kept the content documentation-focused and aligned with existing project facts.
- Removed non-requested sections from the README output (no badges, no Contributing/Contact, no visual/demo section).
- Ensured run instructions are Docker-centric and include both `docker run` and optional `docker compose` flow.
- Performed a follow-up polish pass to tighten wording and readability:
  - Simplified overview runtime sentence.
  - Added a one-line Docker requirements note.
  - Tightened `/api/progress` fallback phrasing for clarity.

# How to verify
1. Open `README.md`.
2. Confirm language is English.
3. Confirm sections are compact and GitHub-typical.
4. Confirm Docker-only run instructions are present.
5. Confirm no badges, no Contributing/Contact section, and no visual/demo section.
6. Confirm API section includes `GET /api/health` and `GET /api/progress`.

# Verification evidence
- Verified `README.md` now uses an English, clean, compact layout.
- Verified Docker is the documented run path (`docker build/run`, optional compose).
- Verified API section includes both required endpoints:
  - `GET /api/health`
  - `GET /api/progress`
- Verified no badges, no Contributing/Contact, and no visual/demo section are present.
- Re-verified after polish pass that all acceptance constraints still hold.
- No tests executed: this is a docs-only change with no runtime or code-path impact.
