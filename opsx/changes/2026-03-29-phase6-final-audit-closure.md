# Title
Phase 6: final audit closure and safe consistency fixes

# Context
The phase-1 rebuild is functionally complete and already validated for architecture, progress API behavior, and container runtime. A final audit identified a short list of small inconsistencies that are safe to resolve without refactoring: minor copy quality issues, one content completeness gap, and one documentation drift item.

# Goals / Non-goals
## Goals
- Apply only small, low-risk fixes discovered during final audit.
- Improve content consistency without changing architecture or section contracts.
- Close obvious docs drift in responsive QA notes.
- Keep all changes reversible and easy to review.

## Non-goals
- No section architecture refactor.
- No redesign pass.
- No scraper/API contract changes.
- No Docker/runtime behavior changes.

# Proposed approach
1. Update small copy/content mismatches directly in section content JSON files.
2. Fill one missing gallery content reference using already-migrated local asset.
3. Update responsive QA note to match current implemented container sizing values.
4. Run typecheck/tests to confirm no regressions.

# Implementation steps (ordered)
1. Create and activate this Phase 6 spec.
2. Fix hero CTA typo in content.
3. Fix contact intro text to remove non-existent form reference.
4. Add the missing migrated gallery image reference to gallery content.
5. Update responsive QA documentation drift for container width values.
6. Run verification commands.
7. Update this spec with What changed, How to verify, Verification evidence, and Current status.

# Acceptance criteria
1. Hero secondary CTA label typo is corrected in local content.
2. Contact intro no longer mentions a form that does not exist in this phase.
3. Gallery content includes the previously migrated but unused `gallery-01.jpg` asset.
4. Responsive QA report no longer contains stale container-width values.
5. No architecture/runtime/API behavior changes are introduced.
6. Validation commands for changed areas complete successfully.

# Testing plan
- `npm run typecheck`
- `npm run test`

# Risk + rollback plan
## Risks
- Minor content edits could unintentionally alter parity wording tone.
- Adding one gallery item may slightly change visual density.

## Rollback
- Revert the touched files to previous revision:
  - `content/sections/hero.json`
  - `content/sections/contact.json`
  - `content/sections/gallery.json`
  - `docs/review/responsive-qa.md`

# Notes / links
- Final audit request from user: section-by-section parity + closure.
- Scope intentionally restricted to safe, local fixes only.

# Current status
Completed

# What changed
- Updated hero CTA copy typo in local content:
  - `content/sections/hero.json`
  - changed secondary CTA label from `Word sponor` to `Word sponsor`.
- Updated contact intro text to align with phase-1 link-only contact behavior:
  - `content/sections/contact.json`
  - removed form reference and replaced with direct-contact wording.
- Added missing migrated gallery asset into rendered content:
  - `content/sections/gallery.json`
  - inserted `/assets/gallery/gallery-01.jpg` into `images` list.
- Fixed responsive QA documentation drift:
  - `docs/review/responsive-qa.md`
  - updated container width formula to `min(100% - 2.25rem, var(--container-width))`
  - documented `max-width: 900px` variant `min(100% - 1.75rem, var(--container-width))`.
- Kept scope limited to safe content/docs adjustments only (no architecture, API, scraper, or runtime changes).

# How to verify
1. Inspect updated content and docs files:
   - `content/sections/hero.json`
   - `content/sections/contact.json`
   - `content/sections/gallery.json`
   - `docs/review/responsive-qa.md`
2. Run validation commands:
   - `npm run typecheck`
   - `npm run test`
3. Optional manual smoke check (`npm run dev`):
   - Hero secondary CTA reads **Word sponsor**.
   - Contact intro no longer mentions a form.
   - Gallery shows one additional image from `gallery-01.jpg`.
   - Responsive QA doc values match `src/styles/layout.css`.

# Verification evidence
- `npm run typecheck` completed successfully.
- `npm run test` completed successfully:
  - `tests/server/progressService.test.ts` (3 tests)
  - `tests/server/fundraiserScraper.test.ts` (4 tests)
  - total: 2 files, 7 tests passed.
