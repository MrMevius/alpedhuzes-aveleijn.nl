# Title
Configure progress sources via content JSON and add Gertjan fundraiser to total

# Context
The progress aggregation currently uses a hardcoded source URL list in server code with 3 fundraiser pages. The requested update is to include Gertjan in the total and make source management editable through content files.

# Goals / Non-goals
## Goals
- Add a dedicated JSON content file listing progress sources with team/individual metadata.
- Include these fundraiser sources in the total:
  1. `https://inschrijving.opgevenisgeenoptie.nl/fundraisers/Aveleijnsamensterk1`
  2. `https://inschrijving.opgevenisgeenoptie.nl/fundraisers/aveleijnsamensterk2`
  3. `https://inschrijving.opgevenisgeenoptie.nl/fundraisers/pienkamp`
  4. `https://inschrijving.opgevenisgeenoptie.nl/fundraisers/GertjanvandeWeerdhof`
- Keep `GET /api/progress` total aggregation based on all configured sources.
- Expose source metadata (`id`, `name`, `type`) in API `sources` payload alongside amount/status.
- Preserve existing cache behavior and top-level API fields.

## Non-goals
- No frontend redesign of the progress section.
- No database/CMS introduction.
- No change to cache TTL or scraping strategy beyond source configuration wiring.

# Proposed approach
1. Add `content/sections/progress-sources.json` with readable source definitions.
2. Update progress service to load source config from content and aggregate by configured list.
3. Extend progress API source result typing to include metadata fields.
4. Update tests to cover default configured source list and aggregation behavior.

# Implementation steps (ordered)
1. Create this change spec and confirm acceptance criteria.
2. Add new content JSON file for progress sources.
3. Update `server/types/progress.ts` for source metadata fields.
4. Update `server/services/progressService.ts` to load sources from content config and include metadata in `sources` output.
5. Update server tests for source list coverage and totals.
6. Run verification commands.
7. Update this spec sections: What changed, How to verify, Verification evidence, Current status.

# Acceptance criteria
1. Repository contains a source config file at `content/sections/progress-sources.json` with team/individual source definitions.
2. Source config includes all four requested fundraiser URLs, including Gertjan.
3. `GET /api/progress` still returns existing top-level fields (`totalRaised`, `goal`, `percentage`, `lastUpdated`, `sources`, `cacheAgeSeconds`, `isStale`) and calculates total from all configured sources.
4. `GET /api/progress` `sources[]` entries include `id`, `name`, `type`, `url`, `amountRaised`, and `status` (with optional `error`).
5. Server tests cover configured source list and aggregation behavior with the updated source model.

# Testing plan
- `npm run test`
- `npm run typecheck`

# Risk + rollback plan
## Risks
- Invalid content JSON shape could break source loading.
- API source field expansion could affect consumers expecting only URL/amount/status.

## Rollback
- Revert this change’s content and service/type updates.
- Restore previous hardcoded source list if needed.

# Notes / links
- Requested by user to include Gertjan in total and provide JSON-managed team/individual source breakdown.

# Current status
Completed

# What changed
- Added `content/sections/progress-sources.json` as editable source configuration with 4 fundraiser entries:
  - Aveleijn Samen Sterk 1 (team)
  - Aveleijn Samen Sterk 2 (team)
  - Pien Kamp (individual)
  - Gertjan van de Weerdhof (individual)
- Updated progress source typing in `server/types/progress.ts`:
  - Added `ProgressFundraiserSource` (`id`, `name`, `type`, `url`)
  - Expanded `ProgressSourceResult` to include `id`, `name`, and `type`
- Updated `server/services/progressService.ts`:
  - Replaced hardcoded URL list with content-driven source loading from `content/sections/progress-sources.json`
  - Added defensive source parsing with fallback to default source set when file is unavailable/invalid
  - Included source metadata in scraped `sources` results
  - Added default source set including requested Gertjan fundraiser URL
  - Preserved existing cache TTL and stale fallback behavior
- Updated route fallback payload in `server/routes/progress.ts` to include source metadata (`id`, `name`, `type`) for error responses.
- Updated tests in `tests/server/progressService.test.ts`:
  - Added coverage that default configured sources include Gertjan and total source count is 4
  - Updated service dependency setup to use `fundraiserSources` model
  - Added assertions for metadata presence in fallback sources.

# How to verify
1. Ensure source config file exists:
   - `content/sections/progress-sources.json`
2. Run automated verification:
   - `npm run test`
   - `npm run typecheck`
3. Optional runtime smoke check:
   - Start app and call `GET /api/progress`
   - Confirm top-level response fields remain present (`totalRaised`, `goal`, `percentage`, `lastUpdated`, `sources`, `cacheAgeSeconds`, `isStale`)
   - Confirm `sources` entries include `id`, `name`, `type`, `url`, `amountRaised`, `status`
   - Confirm one source URL equals `https://inschrijving.opgevenisgeenoptie.nl/fundraisers/GertjanvandeWeerdhof`

# Verification evidence
- Executed `npm run test` successfully:
  - `tests/server/fundraiserScraper.test.ts` passed (4 tests)
  - `tests/server/progressService.test.ts` passed (4 tests)
  - Total: 2 test files, 8 tests passed.
- Executed `npm run typecheck` successfully (`tsconfig.app.json` and `tsconfig.server.json`).
