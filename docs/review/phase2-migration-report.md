# Phase 2 migration report

## Migrated content files

- `content/site.json`
- `content/sections/hero.json`
- `content/sections/progress.json`
- `content/sections/about.json`
- `content/sections/funding.json`
- `content/sections/actions.json`
- `content/sections/gallery.json`
- `content/sections/sponsoring.json`
- `content/sections/sponsors.json`
- `content/sections/contact.json`

## Asset inventory

### `/public/assets/images`
- `hero-bg-willem-kiers.jpg`
- `about-team-ejb2683.jpg`
- `parcours-lopers-divider.jpg`
- `actions-loempia.jpg`
- `actions-tiramisu.jpg`
- `actions-bingo.jpg`
- `placeholder-image.svg`

### `/public/assets/gallery`
- `gallery-01.jpg`
- `gallery-02.jpg`
- `gallery-03.jpg`
- `gallery-04.jpg`
- `gallery-05.jpg`

### `/public/assets/logos`
- `logo-aveleijn-samen-sterk.png`
- `logo-aveleijn-org.png`
- `logo-nm-consultancy.png`
- `sponsor-brookhuis.png`
- `sponsor-download.png`
- `sponsor-tsbv.jpg`
- `sponsor-bluey.png`
- `sponsor-itypical.png`
- `sponsor-fabri.png`
- `sponsor-visionair.jpg`

## Assets not migrated automatically

1. WordPress favicon derivatives referenced in source `<head>` (`...-150x150.png`, `...-300x300.png`) were not copied because the rebuild serves app-controlled metadata and uses local section assets.
2. WordPress theme/plugin CSS/JS/font assets were not migrated because phase-2 scope is content/media migration into the new architecture (not WP runtime asset parity).

## Remaining gaps vs live site

1. Contact copy still mentions a form (`"Laat een bericht achter via het formulier..."`) while this rebuild intentionally remains link-only in phase 1/2.
2. Fine visual parity (spacing, typographic scale, and card/table styling) is approximate and intentionally not over-optimized in this pass.
3. Footer navigation in rebuild uses anchor links (`#hero`, `#contact`) instead of source `#` placeholders.
