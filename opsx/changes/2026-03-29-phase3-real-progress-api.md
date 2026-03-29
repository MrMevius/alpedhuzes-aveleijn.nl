# Title
Phase 3: implement real donation/progress API contract and frontend integration hardening

# Context
The repository already contains an initial progress API implementation, scraper, cache, and frontend wiring. This change finalizes the phase-3 requirements by aligning the API response contract, strengthening defensive parsing, ensuring goal configuration is content-driven, and improving frontend loading/fallback behavior.

# Goals / Non-goals
## Goals
- Implement/align `GET /api/progress` to the required response shape.
- Aggregate and expose fundraising data from the 3 approved source pages.
- Keep server-side cache TTL at 1 hour.
- Serve last known good cached value if refresh fails.
- Ensure response includes metadata:
  - `totalRaised`
  - `goal`
  - `percentage`
  - `lastUpdated`
  - `sources`
  - `cacheAgeSeconds`
  - `isStale`
- Ensure goal value comes from local content configuration, not hardcoded fundraiser logic.
- Add/update parser unit tests using saved HTML fixtures.
- Improve parser defensiveness against small HTML changes.
- Wire frontend Progress section to endpoint contract and add graceful loading/fallback UI.

## Non-goals
- No new CMS/database functionality.
- No unrelated section redesign.
- No change to fundraiser source list beyond the 3 approved URLs.

# Proposed approach
1. Align server response typings and route output with required field names and metadata.
2. Refine progress service cache metadata handling (`cacheAgeSeconds`) and stale fallback semantics.
3. Harden fundraiser parsing with multiple extraction strategies and robust normalization.
4. Add fixture-based tests for parser variants and cache fallback behavior.
5. Update frontend Progress section to consume the new response shape with loading/fallback UX.

# Implementation steps (ordered)
1. Create this phase-3 change spec and confirm acceptance criteria.
2. Update server progress response types and aggregation service output fields.
3. Update route-level fallback payload shape to match the response contract.
4. Strengthen fundraiser parser extraction strategies.
5. Add/update parser fixtures and tests.
6. Update frontend progress data fetch and loading/stale/error handling UI.
7. Run verification commands (`npm run test`, `npm run typecheck`, `npm run build`).
8. Update this spec sections: What changed, How to verify, Verification evidence, Current status.

# Acceptance criteria
1. `GET /api/progress` exists and returns required fields: `totalRaised`, `goal`, `percentage`, `lastUpdated`, `sources`, `cacheAgeSeconds`, `isStale`.
2. Aggregation uses exactly these sources:
   - `https://inschrijving.opgevenisgeenoptie.nl/fundraisers/Aveleijnsamensterk1`
   - `https://inschrijving.opgevenisgeenoptie.nl/fundraisers/aveleijnsamensterk2`
   - `https://inschrijving.opgevenisgeenoptie.nl/fundraisers/pienkamp`
3. Server-side cache TTL is 1 hour.
4. If refresh fails, endpoint keeps serving last known good value and marks response stale.
5. Goal value is read from local content configuration and is not embedded in scraper logic.
6. Parser unit tests use saved HTML fixtures and cover defensive parsing behavior.
7. Frontend Progress section reads this endpoint and has graceful loading/fallback UI.

# Testing plan
- `npm run test`
- `npm run typecheck`
- `npm run build`
- Optional smoke check: run server and request `GET /api/progress`.

# Risk + rollback plan
## Risks
- Third-party fundraiser markup may change unexpectedly.
- Response contract changes can break frontend if not updated together.

## Rollback
- Revert phase-3 server/frontend files to prior commit if regressions appear.
- Keep fixtures and tests to re-iterate parser logic safely.

# Notes / links
- Fundraiser sources:
  1. https://inschrijving.opgevenisgeenoptie.nl/fundraisers/Aveleijnsamensterk1
  2. https://inschrijving.opgevenisgeenoptie.nl/fundraisers/aveleijnsamensterk2
  3. https://inschrijving.opgevenisgeenoptie.nl/fundraisers/pienkamp

# Current status
Completed

# What changed
- Aligned progress API response contract to required fields in `server/types/progress.ts` and service/route output:
  - `totalRaised`, `goal`, `percentage`, `lastUpdated`, `sources`, `cacheAgeSeconds`, `isStale`.
- Updated progress aggregation and cache behavior in `server/services/progressService.ts`:
  - kept required 3 fundraiser URLs,
  - kept TTL at 1 hour,
  - added dynamic `cacheAgeSeconds` calculation,
  - stale fallback now preserves last known good data timestamp (`lastUpdated`) and marks `isStale: true`.
- Ensured goal configuration is loaded from local content (`content/sections/progress.json`) via service configuration loader, without hardcoded fundraiser target in scraping logic.
- Updated route-level error fallback payload shape in `server/routes/progress.ts` to match the contract.
- Hardened parser defensiveness in `server/services/fundraiserScraper.ts` by adding multi-strategy extraction:
  - `amountRaised` block extraction,
  - `money` + `strong` fallback,
  - label-context matching around “opgehaald/raised”,
  - script key fallback (`amountRaised` variants).
- Added parser fixture and test coverage for defensive variation:
  - `tests/server/fixtures/fundraiser-labelContext.html`
  - `tests/server/fundraiserScraper.test.ts` now includes label-context fallback case.
- Updated service tests for new response shape + cache age semantics:
  - `tests/server/progressService.test.ts`.
- Wired frontend Progress section to the updated API contract and added graceful UX states:
  - `src/sections/Progress/ProgressSection.tsx`
  - `src/sections/Progress/ProgressSection.module.css`
  - Added loading message, stale message, and API-error fallback messaging.

# How to verify
1. Confirm this file exists at `opsx/changes/2026-03-29-phase3-real-progress-api.md`.
2. Run verification commands:
   - `npm run test`
   - `npm run typecheck`
   - `npm run build`
3. Smoke test progress endpoint:
   - `node dist-server/index.js` and request `GET http://127.0.0.1:8099/api/progress`
4. Confirm response includes required fields:
   - `totalRaised`
   - `goal`
   - `percentage`
   - `lastUpdated`
   - `sources`
   - `cacheAgeSeconds`
   - `isStale`
5. Confirm `sources` includes exactly the 3 approved fundraiser URLs.
6. Confirm parser fallback coverage in tests includes label-context variation fixture.

# Verification evidence
- Executed `npm run test` successfully:
  - `tests/server/fundraiserScraper.test.ts` passed (4 tests)
  - `tests/server/progressService.test.ts` passed (3 tests)
  - total: 2 files, 7 tests passed.
- Executed `npm run typecheck` successfully.
- Executed `npm run build` successfully (client + server).
- Smoke-tested `GET /api/progress` from built server; response returned required shape and live aggregated data, including:
  - `totalRaised: 37382.62`
  - `goal: 66666`
  - `percentage: 56`
  - `lastUpdated` (ISO timestamp)
  - `sources` with all 3 required fundraiser URLs
  - `cacheAgeSeconds: 0`
  - `isStale: false`
