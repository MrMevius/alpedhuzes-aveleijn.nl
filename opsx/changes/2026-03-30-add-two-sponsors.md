# Title
Add two new sponsors to sponsors section

# Context
User requested two additional sponsors to be shown in the sponsors section, each with a local logo file and website link.

# Goals / Non-goals
## Goals
- Add sponsor entry for **De Bruin Lichttechniek en Decorbouw**.
- Add sponsor entry for **Robert Muntel**.
- Use the provided local image assets from `public/assets/images`.
- Keep existing sponsors and layout behavior unchanged.

## Non-goals
- No styling changes.
- No component or type model refactor.
- No changes to other content sections.

# Proposed approach
1. Update `content/sections/sponsors.json` by appending two sponsor objects in `items`.
2. Verify paths and required fields align with current `SponsorsContent` parser.
3. Run repository verification commands suitable for this content change.

# Implementation steps (ordered)
1. Create this change spec.
2. Add two sponsor items in `content/sections/sponsors.json` using provided links and image paths.
3. Run verification command(s).
4. Update this spec sections: What changed, How to verify, Verification evidence, Current status.

# Acceptance criteria
1. `content/sections/sponsors.json` contains 2 new sponsors: De Bruin Lichttechniek en Decorbouw and Robert Muntel.
2. New sponsors include valid `name`, `href`, `logoSrc`, and `logoAlt` fields.
3. New `logoSrc` values are:
   - `/assets/images/De Bruin lichttechniek.png`
   - `/assets/images/RM-logo.png`
4. Existing sponsors section rendering behavior remains unchanged.
5. Change spec is updated with verification steps/evidence and marked completed.

# Testing plan
- `npm run typecheck`

# Risk + rollback plan
## Risks
- Invalid JSON or missing required sponsor fields could break content loading.

## Rollback
- Revert `content/sections/sponsors.json` to previous state.

# Notes / links
- User-provided sponsor links:
  - `https://www.debruinlichttechniek.nl/`
  - `https://www.robertmuntel.nl/`

# Current status
Completed

# What changed
- Updated `content/sections/sponsors.json` and added 2 sponsor entries in `items`:
  - **De Bruin Lichttechniek en Decorbouw**
    - `href`: `https://www.debruinlichttechniek.nl/`
    - `logoSrc`: `/assets/images/De Bruin lichttechniek.png`
    - `logoAlt`: `De Bruin Lichttechniek en Decorbouw`
  - **Robert Muntel**
    - `href`: `https://www.robertmuntel.nl/`
    - `logoSrc`: `/assets/images/RM-logo.png`
    - `logoAlt`: `Robert Muntel`
- Kept existing sponsors content and sponsors section component behavior unchanged.

# How to verify
1. Confirm `content/sections/sponsors.json` contains both new entries.
2. Verify both image assets exist:
   - `public/assets/images/De Bruin lichttechniek.png`
   - `public/assets/images/RM-logo.png`
3. Run `npm run typecheck`.

# Verification evidence
- Executed `npm run typecheck` successfully.
