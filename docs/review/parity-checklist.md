# Phase 6 parity checklist

## Scope
Comparison baseline: `https://alpedhuzes-aveleijn.nl`

Legend:
- ✅ Parity achieved (phase-1 acceptable)
- ⚠️ Partial parity (usable but differs)
- ❌ Not yet parity

## Section-by-section status

1. **Hero** — ⚠️
   - ✅ Local assets wired and rendered (background + logo).
   - ✅ CTA links present (donate/search + email).
   - ⚠️ Copy and composition differ from source block structure.

2. **Progress / Tussenstand** — ⚠️
   - ✅ Dynamic API integration available via `/api/progress`.
   - ✅ Goal sourced from local content (`progress.json`).
   - ⚠️ Visual progress bar/animation parity not yet implemented.

3. **About / Wie zijn wij** — ⚠️
   - ✅ Section and local image present.
   - ⚠️ Current text is not yet a full source-accurate transcript.

4. **Geldbesteding** — ❌
   - ✅ Section shell exists.
   - ❌ Source-accurate copy and link details still missing.

5. **Actions** — ⚠️
   - ✅ Action cards render from local content with local images.
   - ⚠️ Source action copy/details are not fully mirrored yet.

6. **Gallery** — ⚠️
   - ✅ Gallery assets migrated and displayed from local paths.
   - ⚠️ Captions/order parity may differ from source.

7. **Sponsor CTA + sponsorship table** — ⚠️
   - ✅ Table structure and content-driven headers implemented.
   - ⚠️ Full source table text/rows require parity pass.

8. **Sponsor logos grid** — ⚠️
   - ✅ Logos localized and rendered from `/public/assets/logos`.
   - ⚠️ Some sponsor destination URLs are placeholders (`#`).

9. **Contact cards** — ✅
   - ✅ Link-only contact model implemented (`mailto`, `tel`, socials).
   - ✅ No contact form in phase 1.

10. **Footer** — ⚠️
    - ✅ Footer menu and copyright text are content-driven.
    - ⚠️ Minor visual/style differences remain.

## Functional parity summary

- ✅ Health endpoint: `GET /api/health`
- ✅ Dynamic progress endpoint: `GET /api/progress`
- ✅ Server-side 1-hour cache + stale fallback behavior
- ✅ One-container runtime on port `8099`

## Intentional phase-1 deviations captured

1. Content parity is incomplete in several sections (documented above) and requires a focused copy pass.
2. Sponsor outbound links are partially unknown and temporarily set to `#` where source URLs were unavailable.
3. Fine-grained visual parity (spacing/typography animations/theme details) remains for follow-up polish.
