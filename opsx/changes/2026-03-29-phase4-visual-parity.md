# Title
Phase 4: visual parity polish against the current live site

# Context
The rebuild already has modular section architecture, local content/assets, and working backend progress integration. This phase focuses on making the new homepage visually close to `https://alpedhuzes-aveleijn.nl` while keeping the cleaner code-first architecture (React + TypeScript + CSS Modules + content files).

# Goals / Non-goals
## Goals
- Refine spacing, typography, section widths, cards, buttons, gallery layout, sponsor logo grid, and contact cards.
- Improve hero visual treatment to match the current site mood.
- Recreate the sponsorship table cleanly and responsively.
- Preserve section isolation with CSS Modules.
- Ensure layout quality on desktop, tablet, and mobile.
- Verify all CTA links are functional.
- Produce a section-by-section parity checklist with intentional differences.

## Non-goals
- No WordPress runtime/theme/plugin dependencies.
- No WordPress markup/classname reintroduction.
- No broad content rewriting or feature expansion beyond visual parity polish.
- No architecture regression away from content-driven section modules.

# Proposed approach
1. Tune global visual tokens and baseline layout rhythm (typography/spacing/container) while keeping globals minimal.
2. Update each section CSS Module for parity-oriented presentation: hero, progress, informational sections, cards, gallery, sponsorship table, sponsor grid, contact cards, footer.
3. Keep section rendering content-driven and modular.
4. Verify CTA hrefs and interactive states.
5. Run typecheck/tests/build and document parity outcomes and intentional deviations.

# Implementation steps (ordered)
1. Create and activate this change spec.
2. Adjust global style foundation files (`tokens`, `base`, `layout`, shared section block).
3. Refine hero styling to better match source mood and CTA hierarchy.
4. Refine Progress/About/Funding spacing and readability.
5. Refine Actions/Gallery/Sponsors/Contact card and grid treatments.
6. Rebuild sponsorship table styling for clarity and mobile responsiveness.
7. Polish footer visual parity while keeping content-driven nav.
8. Verify CTA links and accessibility basics for links/buttons/tables.
9. Run `npm run typecheck`, `npm run test`, `npm run build`.
10. Update parity checklist and this spec (What changed / How to verify / Verification evidence / Current status).

# Acceptance criteria
1. Homepage styling is visually closer to the live site in spacing, typography, section width rhythm, cards, buttons, gallery, sponsor grid, and contact cards.
2. Hero section has an updated visual treatment that matches live-site mood while remaining content-driven.
3. Sponsorship table is clearly styled and responsive on mobile/tablet/desktop (with safe horizontal overflow when needed).
4. Section isolation is maintained through CSS Modules (no cross-section coupling and no WP class reintroduction).
5. Responsive behavior is validated for desktop, tablet, and mobile.
6. CTA links in Hero/Sponsoring/Footer/Contact/Sponsors resolve to valid href targets and remain usable.
7. A parity checklist exists with section-by-section comparison and clearly identified intentional differences.
8. Final output includes remaining visual gaps and exact files changed.

# Testing plan
- `npm run typecheck`
- `npm run test`
- `npm run build`
- Manual review at representative widths (~1280, ~768, ~360):
  - hero composition and CTA stacking
  - card/grid wrapping
  - sponsorship table readability/overflow
  - sponsor/contact card behavior
  - footer readability
- Verify CTA href values from content render as actionable links.

# Risk + rollback plan
## Risks
- Over-tuning styles could reduce readability on small screens.
- Global token changes could unintentionally affect multiple sections.

## Rollback
- Revert Phase 4 style/module edits while preserving content and API layers.
- Keep parity checklist notes to guide incremental re-polish.

# Notes / links
- Live source baseline: `https://alpedhuzes-aveleijn.nl`
- Parity report file: `docs/review/parity-checklist.md`

# Current status
Completed

# What changed
- Added a dedicated phase-4 change spec and implemented parity-focused visual polish without changing architecture patterns.
- Tuned global visual foundations:
  - `src/styles/tokens.css`
  - `src/styles/base.css`
  - `src/styles/layout.css`
  - `src/components/layout/SectionBlock.module.css`
  - Updated color tokens, spacing rhythm, typography hierarchy, container width, border/radius/shadow tokens, and section heading scale.
- Refined hero treatment to better match source mood while keeping content-driven rendering:
  - `src/sections/Hero/HeroSection.tsx`
  - `src/sections/Hero/HeroSection.module.css`
  - Added primary/secondary CTA class differentiation, improved image framing and dimming, stronger logo lockup, and mobile CTA stacking.
- Improved progress card presentation and readability:
  - `src/sections/Progress/ProgressSection.module.css`
  - Enhanced card framing, progress bar contrast, metric hierarchy, and mobile spacing.
- Refined content-section readability and spacing:
  - `src/sections/About/AboutSection.module.css`
  - `src/sections/Funding/FundingSection.module.css`
- Refined cards and grids for closer live-site feel:
  - `src/sections/Actions/ActionsSection.module.css`
  - `src/sections/Gallery/GallerySection.module.css`
  - `src/sections/Sponsors/SponsorsSection.module.css`
  - `src/sections/Contact/ContactSection.module.css`
- Rebuilt sponsorship table presentation and responsive behavior:
  - `src/sections/Sponsoring/SponsoringSection.tsx`
  - `src/sections/Sponsoring/SponsoringSection.module.css`
  - Added semantic `scope="col"`, responsive `data-label` support, striped desktop rows, and mobile stacked row layout.
- Polished footer parity and readability:
  - `src/sections/Footer/FooterSection.module.css`
- Updated parity documentation with section-by-section live-vs-new comparison and intentional differences:
  - `docs/review/parity-checklist.md`
- Validated CTA targets are actionable (no empty/placeholder `href` values found in content or section link renderers).

# How to verify
1. Run quality checks:
   - `npm run typecheck`
   - `npm run test`
   - `npm run build`
2. Start the app (`npm run dev`) and compare to `https://alpedhuzes-aveleijn.nl` at:
   - desktop (~1280px)
   - tablet (~768px)
   - mobile (~360px)
3. Verify visual parity areas:
   - hero mood, CTA hierarchy, and logo treatment
   - section spacing/typography rhythm
   - actions/gallery/sponsors/contact cards and grids
   - sponsorship table desktop readability and mobile stacked mode
4. Verify CTA link usability:
   - Hero primary/secondary CTAs
   - Sponsoring CTA
   - Sponsor logo links
   - Contact links (`mailto`, `tel`, socials)
   - Footer anchor links
5. Review parity report:
   - `docs/review/parity-checklist.md`

# Verification evidence
- Executed `npm run typecheck` successfully.
- Executed `npm run test` successfully (2 files, 7 tests passed).
- Executed `npm run build` successfully (frontend + server builds succeeded).
- Verified no empty or placeholder CTA href values via repo search:
  - no matches for `"href": ""` or `"href": "#"` in `content/**/*.json`
  - no matches for empty JSX `href` assignments in `src/**/*.tsx`
- Updated parity checklist with live-site comparison, current implementation status, and intentional differences.
