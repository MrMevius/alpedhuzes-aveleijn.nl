# Title
Phase 2: migrate live website content and media into the content-driven architecture

# Context
Phase-1 architecture, sections, and local assets are in place, but parity is incomplete in several sections. This change finalizes migration of visible homepage content and media from `https://alpedhuzes-aveleijn.nl` into `/content` and `/public/assets`, preserving wording quirks exactly and keeping a single-page landing structure.

Follow-up increment: perform a targeted visual parity polish pass (layout/spacing/responsive/card/table treatment) without changing migrated wording or introducing broad redesign.

# Goals / Non-goals
## Goals
- Convert current live homepage content into content files under `/content/sections` for: Hero, Progress, About, Geldbesteding, Actions, Gallery, Sponsoring, Sponsors, Contact, Footer.
- Preserve current wording exactly (including visible typos/text quirks).
- Ensure site-owned media is local under `/public/assets/images`, `/public/assets/gallery`, `/public/assets/logos`.
- Replace remote image references used by the app with local asset paths.
- Keep one landing page with anchor navigation where useful.
- Keep responsive section layouts close to the current site without over-polishing.
- Add a content review file listing suspected typos, questionable labels, and copied WordPress artifacts.
- Apply a focused visual polish pass to improve parity for hero/progress/cards/table/footer while preserving current architecture.

## Non-goals
- No CMS, no database, no WordPress runtime dependencies.
- No new major feature work outside parity migration (e.g., contact form backend, advanced animations).
- No broad style redesign beyond parity-oriented structure updates.
- No wording/content rewrite in this polish increment.

# Proposed approach
1. Capture authoritative live-site copy/media references section-by-section from homepage markup.
2. Update section content JSON files to match live wording and labels exactly.
3. Extend content types/loaders minimally where needed for parity fields (e.g., section intro text/subtitles/notes).
4. Update section renderers to remain content-driven while displaying migrated copy and links.
5. Ensure progress section reads from `/api/progress` with graceful fallback.
6. Produce migration review and inventory outputs.
7. Apply targeted CSS/component presentation refinements for closer visual parity.

# Implementation steps (ordered)
1. Extract live homepage content snippets and media/link references.
2. Populate `/content/sections/*.json` and `/content/site.json` with source-accurate text/labels.
3. Add/adjust typing + content loader validation for any newly required fields.
4. Update section components to render migrated fields content-first.
5. Verify image references in content are local `/assets/...` paths.
6. Add content review document covering typos/labels/WordPress artifacts.
7. Run `npm run typecheck`, `npm run test`, and `npm run build`.
8. Update this change spec with what changed, verification commands, evidence, and status.
9. Re-run quality checks after polish and capture evidence.

# Acceptance criteria
1. All requested sections are rendered from content files and include live-site wording parity for visible copy.
2. Live text quirks are preserved (including known typo `Word sponor` and other copied quirks).
3. Section content files exist and are populated under `/content/sections` for all requested sections.
4. Site-owned media used by the app is local and organized under:
   - `/public/assets/images`
   - `/public/assets/gallery`
   - `/public/assets/logos`
5. App content contains no active remote image URLs for site-owned media.
6. Progress section displays API-based fundraising values from `/api/progress` with safe fallback behavior.
7. A dedicated content review file exists listing suspected typos, questionable labels, and copied WordPress artifacts.
8. Final migration report includes:
   - migrated content files
   - asset inventory
   - assets that could not be migrated automatically
   - remaining gaps versus live site
9. Visual polish increment improves section presentation (hero, progress, sponsoring table, sponsor/contact cards, footer) while keeping content-driven rendering and responsive behavior.

# Testing plan
- `npm run typecheck`
- `npm run test`
- `npm run build`
- Content checks:
  - Verify `/content/sections/*.json` completeness and required fields.
  - Verify section renderers consume content (no hardcoded migrated copy in JSX).
- Verify no site-owned remote image URLs remain in active content.
- Visual checks:
  - confirm no new hardcoded migrated copy in JSX,
  - confirm responsive layout behavior remains stable for cards/table/hero.

# Risk + rollback plan
## Risks
- Minor mismatch in special characters or punctuation when copying WordPress-rendered text.
- Hidden/conditional live content not present in static markup snapshot.
- Accidental schema drift causing loader/type breaks.

## Rollback
- Revert changed content and section renderer files to prior phase-1 baseline.
- Keep review/audit docs to track unresolved parity for follow-up.

# Notes / links
- Live source: `https://alpedhuzes-aveleijn.nl`
- Existing parity docs:
  - `docs/review/parity-checklist.md`
  - `docs/review/asset-migration-audit.md`
  - `docs/review/text-quirks-review.md`

# Current status
Completed

# What changed
- Migrated live homepage copy into content files with section-by-section parity pass:
  - `content/sections/hero.json`
  - `content/sections/progress.json`
  - `content/sections/about.json`
  - `content/sections/funding.json`
  - `content/sections/actions.json`
  - `content/sections/gallery.json`
  - `content/sections/sponsoring.json`
  - `content/sections/sponsors.json`
  - `content/sections/contact.json`
  - `content/site.json` (footer/site parity updates)
- Preserved visible copy quirks from source (including `Word sponor`, duplicated sponsoring row bullets, and legacy wording artifacts).
- Filled previously incomplete/empty sections with live content (notably Geldbesteding + Sponsoring tiers).
- Updated sponsor entries to source links and local logo paths.
- Replaced placeholder sponsor links (`#`) with source destination URLs.
- Extended content contracts and loader parsing for migrated parity fields:
  - optional section intro/subtitle/notice text
  - optional section links/CTA fields
  - contact intro paragraphs
  - about donation link
- Updated section renderers to remain content-driven while rendering new migrated fields:
  - `src/sections/About/AboutSection.tsx`
  - `src/sections/Funding/FundingSection.tsx`
  - `src/sections/Actions/ActionsSection.tsx`
  - `src/sections/Gallery/GallerySection.tsx`
  - `src/sections/Sponsoring/SponsoringSection.tsx`
  - `src/sections/Sponsors/SponsorsSection.tsx`
  - `src/sections/Contact/ContactSection.tsx`
- Implemented API-driven Progress UI in frontend:
  - `src/sections/Progress/ProgressSection.tsx`
  - `src/sections/Progress/ProgressSection.module.css`
  - fetches `/api/progress`, renders bar + totals, and shows stale fallback message.
- Added dedicated phase-2 content review file:
  - `docs/review/content-review-phase2.md`
- Confirmed active content has no remote image URLs (site-owned image references are local `/assets/...` paths).
- Implemented follow-up visual parity polish (layout/styling only, no content rewrites):
  - Updated shared section spacing and presentation tokens.
  - Refined Hero visual treatment (image framing, centered logo, CTA styling, responsive behavior).
  - Added grid/card polish for Actions, Sponsors, and Contact sections.
  - Improved Progress card presentation while keeping API-driven data behavior.
  - Improved Sponsoring table readability/responsiveness with horizontal wrapper and styled headers.
  - Polished Footer dark presentation to better match source style.
  - Kept all section rendering content-driven with no migration copy hardcoded in JSX.

# How to verify
1. Confirm this file exists at `opsx/changes/2026-03-29-phase2-content-media-migration.md`.
2. Run project validations:
   - `npm run typecheck`
   - `npm run test`
   - `npm run build`
3. Confirm section content files are populated under `content/sections/*.json` and footer content in `content/site.json`.
4. Confirm progress section fetch behavior in frontend code:
   - `src/sections/Progress/ProgressSection.tsx` requests `/api/progress` and renders totals/progress bar.
5. Confirm no remote image URLs remain in active content:
   - search `content/**/*.json` for `https://...(.jpg|.jpeg|.png|.webp|.svg)` and expect no matches.
6. Confirm dedicated review file exists:
   - `docs/review/content-review-phase2.md`

# Verification evidence
- Executed `npm run typecheck` successfully.
- Executed `npm run test` successfully (2 files, 6 tests passed).
- Executed `npm run build` successfully (client + server builds succeeded).
- Verified content section files present:
  - hero, progress, about, funding, actions, gallery, sponsoring, sponsors, contact.
- Verified asset directories populated:
  - `/public/assets/images`
  - `/public/assets/gallery`
  - `/public/assets/logos`
- Searched `content/**/*.json` for remote image URLs and got no matches.
- Confirmed no placeholder sponsor links (`#`) remain in `content/sections/sponsors.json`.
- Added review output `docs/review/content-review-phase2.md` with required categories.
- Re-ran verification after visual polish:
  - `npm run typecheck` passed.
  - `npm run test` passed (2 files, 6 tests).
  - `npm run build` passed (client + server).
