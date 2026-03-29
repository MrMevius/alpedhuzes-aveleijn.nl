# Capability Spec: Progress API aggregation and resilience

## Objective
Define backend behavior for fundraising progress aggregation used by the landing page Tussenstand section.

## Requirements

### R1. Endpoints
Backend SHALL expose:
- `GET /api/health`
- `GET /api/progress`

### R2. Source aggregation
`GET /api/progress` SHALL aggregate fundraising totals from exactly these source pages:
1. `https://inschrijving.opgevenisgeenoptie.nl/fundraisers/Aveleijnsamensterk1`
2. `https://inschrijving.opgevenisgeenoptie.nl/fundraisers/aveleijnsamensterk2`
3. `https://inschrijving.opgevenisgeenoptie.nl/fundraisers/pienkamp`

### R3. Scraping location
Scraping SHALL execute server-side only and SHALL NOT run in frontend components.

### R4. Caching
Progress results SHALL be cached server-side for one hour.

### R5. Failure behavior
If a scrape refresh fails, API SHALL return the last known good value instead of failing the homepage path.

### R6. Response metadata
API response SHALL include structured metadata suitable for UI state and observability, including freshness indicators (e.g., `updatedAt`, `lastSuccessAt`, `isStale`) and source traceability.

### R7. Goal configuration
Fundraising goal SHALL be maintained in local content/config and SHALL NOT be embedded inside scraper parsing logic.

### R8. Defensive parsing
Parser SHALL handle currency format variations and minor markup shifts defensively.

## Validation checklist
- [ ] Endpoint routes are present and documented.
- [ ] Aggregation includes all 3 required sources.
- [ ] 1-hour cache confirmed.
- [ ] Stale fallback behavior verified under scrape failure scenario.
- [ ] Metadata fields present in response.
- [ ] Goal value sourced from content/config.
