## Title
Replace iTypical sponsor logo with new local asset

## Context
The current iTypical sponsor logo is served at:
- `https://alpedhuzes-aveleijn.nl/assets/logos/sponsor-itypical.png`

There is a newly provided local logo file at:
- `/home/mevius/alpedhuzes-aveleijn.nl/public/assets/logos/Logo ITypical.png`

We need a safe, minimal change that updates only the iTypical logo while preserving existing sponsor section behavior and avoiding unrelated sponsor/content/layout changes.

## Goals / Non-goals
### Goals
- Identify where `sponsor-itypical.png` is referenced in the code/content.
- Replace iTypical logo usage with the new local logo file.
- Slightly increase the iTypical logo display scale so the text remains readable.
- Preserve existing sponsor section behavior and public path compatibility where practical.
- Update this spec with clear verification steps and evidence.

### Non-goals
- No broad layout/styling changes in sponsor or other sections.
- No edits to sponsor copy/content (except what is strictly needed for iTypical asset/scale configuration).
- No changes to other sponsor logos or unrelated assets.

## Proposed approach
1. Locate all references to `sponsor-itypical.png` in source/content/public paths.
2. Prefer preserving the existing public URL/path (`/assets/logos/sponsor-itypical.png`) by replacing/copying the new logo file into that canonical filename, if this can be done without side effects.
3. If direct replacement is not appropriate, update only the iTypical asset reference(s) to use a local path to the new file while keeping behavior unchanged.
4. Confirm no unintended changes to other sponsor entries, assets, or rendering behavior.

## Implementation steps (ordered)
1. Audit current references to `sponsor-itypical.png` across:
   - `/content`
   - `/src`
   - `/public/assets/logos`
2. Decide replacement strategy:
   - Strategy A (preferred): keep `sponsor-itypical.png` public path and replace/copy file contents from `Logo ITypical.png`.
   - Strategy B (fallback): adjust only iTypical reference(s) to `Logo ITypical.png` path if Strategy A is not viable.
3. Apply only the minimal file/reference changes needed for chosen strategy.
4. Validate sponsor section still renders and iTypical logo resolves correctly.
5. Adjust only the iTypical `logoScale` if the new logo text appears too small.
6. Record verification outputs and touched files in this spec.

## Acceptance criteria
1. iTypical sponsor uses the newly provided local logo file as the active rendered logo.
2. iTypical sponsor logo is displayed slightly larger so the logo text is easier to read.
3. Sponsor section behavior remains unchanged (renders normally; no broken sponsor tiles due to this change).
4. No unintended edits to:
    - other sponsor logos
    - non-iTypical sponsor content
    - unrelated assets/files
5. Spec includes executable verification steps and populated verification evidence.

## Testing plan
- Path/reference verification:
  - Search for `sponsor-itypical.png` and confirm expected final usage.
  - Confirm new source file exists at `/public/assets/logos/Logo ITypical.png`.
  - Confirm final served iTypical logo path resolves via local assets.
- Runtime sanity:
  - Run project checks relevant to static asset/reference integrity (targeted checks first).
  - Perform a local render sanity check of sponsor section in the running app.
- Scale sanity:
  - Confirm only the iTypical sponsor entry scale is adjusted.
- Documentation impact:
  - No docs updates expected beyond this change spec.

## Risk + rollback plan
### Risks
- Filename/path sensitivity: `Logo ITypical.png` includes spaces and mixed casing, which may cause brittle references depending on usage patterns.
- Potential accidental breakage if references are changed broadly instead of minimally.

### Mitigations
- Prefer stable canonical filename/path (`sponsor-itypical.png`) when feasible.
- Restrict edits to iTypical-only references and related asset file operations.

### Rollback
- Revert modified asset/reference files to previous commit state.
- Re-verify sponsor section to ensure original logo behavior is restored.

## Notes / links
- Old logo URL: `https://alpedhuzes-aveleijn.nl/assets/logos/sponsor-itypical.png`
- New provided local file: `/home/mevius/alpedhuzes-aveleijn.nl/public/assets/logos/Logo ITypical.png`
- Scope guardrails: no layout/content changes, no other logo replacements.

## Current status
Completed

## What changed
- Created initial OPSX change spec for iTypical logo replacement.
- Replaced the contents of `public/assets/logos/sponsor-itypical.png` with the newly provided iTypical logo asset.
- Preserved the existing public asset path `/assets/logos/sponsor-itypical.png`, so no content/config changes were required.
- Used `public/assets/logos/Logo ITypical_new.png` as the source file because the originally provided path `public/assets/logos/Logo ITypical.png` did not exist.
- Increased only the iTypical sponsor `logoScale` in `content/sections/sponsors.json` from `0.8` to `1.0` so the new logo text is more readable.

## How to verify
1. Locate all iTypical logo references and confirm final intended path.
2. Confirm the new local logo file is present in `/public/assets/logos`.
3. Verify sponsor section still renders as before with updated iTypical logo.
4. Confirm no unrelated sponsor or asset changes are included.

## Verification evidence
- Confirmed `content/sections/sponsors.json` still references iTypical via `/assets/logos/sponsor-itypical.png`.
- Confirmed final canonical logo file now has the new image dimensions:
  - `public/assets/logos/sponsor-itypical.png: PNG image data, 4489 x 1536, 8-bit/color RGBA, non-interlaced`
- Confirmed copied file contents match the source file:
  - `MATCH: sponsor-itypical.png matches Logo ITypical_new.png`
- Confirmed the sponsor JSON diff only changes iTypical `logoScale` from `0.8` to `1.0`.
- Ran `npm run typecheck` successfully after the scale adjustment:
  - `tsc --noEmit -p tsconfig.app.json && tsc --noEmit -p tsconfig.server.json`

---
Status: completed
Owner: 
Date: 2026-05-27
