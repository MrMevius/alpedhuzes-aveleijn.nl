# Title
Add sponsors Stroef and Kersten

# Context
User requested two new sponsors to be added to the sponsors section, using existing local logo files and provided website URLs.

# Goals / Non-goals
## Goals
- Add sponsor entry for **Stroef De Theatergroep van Vriezenveen | Theatergroep STROEF**.
- Add sponsor entry for **Kersten Kersten Hulpmiddelen - Het draait om mensen**.
- Use local assets already present in `public/assets/logos`.
- Keep existing sponsor section rendering behavior unchanged.

## Non-goals
- No changes to sponsors component logic or styling.
- No reordering or removal of existing sponsors.
- No changes outside the sponsors content + this spec.

# Proposed approach
1. Update `content/sections/sponsors.json` and append two sponsor items.
2. Keep item schema aligned with existing parser requirements (`name`, `href`, `logoSrc`, `logoAlt`; optional logo scaling untouched).
3. Run a targeted verification command for type safety.

# Implementation steps (ordered)
1. Create this change spec.
2. Add two sponsor items to `content/sections/sponsors.json`.
3. Run `npm run typecheck`.
4. Update this spec with What changed, How to verify, Verification evidence, and status.

# Acceptance criteria
1. `content/sections/sponsors.json` contains two new sponsors with names:
   - Stroef De Theatergroep van Vriezenveen | Theatergroep STROEF
   - Kersten Kersten Hulpmiddelen - Het draait om mensen
2. Both new entries include valid `name`, `href`, `logoSrc`, and `logoAlt` fields.
3. `logoSrc` values are exactly:
   - `/assets/logos/Stroef.jpg`
   - `/assets/logos/kersten-logo-300x116.png`
4. Existing sponsors section behavior remains unchanged.
5. This spec is updated with verification steps/evidence and marked completed.

# Testing plan
- `npm run typecheck`

# Risk + rollback plan
## Risks
- Invalid JSON or missing required fields can break content loading.

## Rollback
- Revert `content/sections/sponsors.json` and this spec file.

# Notes / links
- `https://www.theatergroepstroef.nl/`
- `https://kerstenhulpmiddelen.nl/`

# Current status
Completed

# What changed
- Updated `content/sections/sponsors.json` and appended 2 sponsor entries in `items`:
  - **Stroef De Theatergroep van Vriezenveen | Theatergroep STROEF**
    - `href`: `https://www.theatergroepstroef.nl/`
    - `logoSrc`: `/assets/logos/Stroef.jpg`
    - `logoAlt`: `Stroef De Theatergroep van Vriezenveen | Theatergroep STROEF`
  - **Kersten Kersten Hulpmiddelen - Het draait om mensen**
    - `href`: `https://kerstenhulpmiddelen.nl/`
    - `logoSrc`: `/assets/logos/kersten-logo-300x116.png`
    - `logoAlt`: `Kersten Kersten Hulpmiddelen - Het draait om mensen`
- Existing sponsors section component/style behavior was not changed.

# How to verify
1. Confirm both new sponsors exist in `content/sections/sponsors.json`.
2. Confirm both logo paths are present in entries:
   - `/assets/logos/Stroef.jpg`
   - `/assets/logos/kersten-logo-300x116.png`
3. Run `npm run typecheck`.

# Verification evidence
- Verified both new sponsor entries are present in `content/sections/sponsors.json` with required fields and exact `logoSrc` paths.
- Attempted: `npm run typecheck` → failed in this environment because `npm` is not installed (`/bin/bash: npm: command not found`).
