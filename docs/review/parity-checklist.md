# Phase 4 visual parity checklist

## Scope
Comparison baseline: `https://alpedhuzes-aveleijn.nl`

Legend:
- ✅ Close parity achieved (phase-4 target)
- ⚠️ Close but intentionally different

## Section-by-section comparison (live site vs new implementation)

1. **Hero** — ✅
   - Live site: photo-led hero mood, centered logo, two pill CTAs, prominent intro text.
   - New implementation: stronger hero image framing, darkened image treatment, centered logo overlap, primary/secondary pill CTA hierarchy, improved responsive stacking.
   - Intentional difference: cleaner cardless composition and less decorative theme noise than WordPress theme defaults.

2. **Progress / Tussenstand** — ✅
   - Live site: highlighted progress area with prominent totals.
   - New implementation: centered progress card with stronger bar contrast, clear metric typography, API-driven totals and stale/error handling.
   - Intentional difference: static clean bar treatment instead of source-theme animation effects.

3. **About / Wie zijn wij** — ✅
   - Live site: image + long-form copy block.
   - New implementation: wider reading measure, improved spacing rhythm, elevated image framing.
   - Intentional difference: cleaner spacing scale and typography cadence for readability.

4. **Geldbesteding** — ✅
   - Live site: explanatory text + links.
   - New implementation: content parity maintained, better reading width and link emphasis.
   - Intentional difference: simplified typography stack and reduced theme ornamentation.

5. **Acties** — ✅
   - Live site: card-like action promos with images and details.
   - New implementation: polished card grid, consistent radii/shadows, stronger title/meta hierarchy, responsive wrapping.
   - Intentional difference: more consistent technical card system across breakpoints.

6. **Galerij** — ✅
   - Live site: gallery image blocks with labels.
   - New implementation: denser but clean grid card framing, balanced captions, responsive spacing.
   - Intentional difference: normalized card dimensions for maintainability and visual consistency.

7. **Word ook sponsor + sponsorship table** — ✅
   - Live site: sponsor intro + package table.
   - New implementation: clearer table hierarchy, striped desktop rows, accessible headers, mobile stacked-label mode, CTA preserved.
   - Intentional difference: mobile-first stacked table on narrow screens for readability.

8. **Onze sponsors (logo grid)** — ✅
   - Live site: logo grid with responsive breakpoints.
   - New implementation: explicit 4→3→2→1 grid behavior, cleaner logo cards, subtle hover elevation.
   - Intentional difference: slightly more uniform card sizing than source.

9. **Contact cards** — ✅
   - Live site: rounded contact cards with direct actions.
   - New implementation: stronger card hierarchy, clear label/value split, hover lift, retained direct links (`mailto`, `tel`, socials).
   - Intentional difference: simplified icon-free card visuals while preserving clear click targets.

10. **Footer** — ✅
    - Live site: dark footer band with basic links and copyright.
    - New implementation: darker neutral footer container, improved readability/contrast, responsive menu wrapping.
    - Intentional difference: cleaner tokenized color system and spacing.

## CTA validation summary

- ✅ Hero primary CTA: external donation search URL
- ✅ Hero secondary CTA: `mailto:alpedhuzes@aveleijn.nl`
- ✅ Sponsoring CTA: `mailto:alpedhuzes@aveleijn.nl`
- ✅ Sponsor cards: outbound URLs per sponsor item
- ✅ Contact cards: `mailto`, `tel`, and social links
- ✅ Footer anchors: in-page section links (`#hero`, `#contact`)

## Remaining visual gaps (intentional)

1. Source WordPress typography/fonts may render slightly differently per client because this rebuild intentionally uses a cleaner tokenized style baseline.
2. Hero does not replicate every source overlay/animation nuance; it keeps a simpler maintainable mood treatment.
3. Contact cards omit source icon circles to keep a cleaner, less theme-coupled implementation.
