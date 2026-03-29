# Asset migration audit (Phase 3)

## Scope
Migrated visible homepage media from `https://alpedhuzes-aveleijn.nl` into local project assets under `/public/assets`.

## Source → local mapping

### Core imagery
- `.../Willem-Kiers-1024x683.jpg` → `/public/assets/images/hero-bg-willem-kiers.jpg`
- `.../Logo-Aveleijn-samen-sterk-transparant-1.png` → `/public/assets/logos/logo-aveleijn-samen-sterk.png`
- `.../EJB2683.jpg` → `/public/assets/images/about-team-ejb2683.jpg`
- `.../Parcours-lopers-007-1600x900-JPA.jpg` → `/public/assets/images/parcours-lopers-divider.jpg`

### Action imagery
- `.../fd071c92-...-768x1024.jpg` → `/public/assets/images/actions-loempia.jpg`
- `.../cc068447-...jpg` → `/public/assets/images/actions-tiramisu.jpg`
- `.../db875e79-...-683x1024.jpg` → `/public/assets/images/actions-bingo.jpg`

### Gallery imagery
- `.../9c03a9bd-...-683x1024.jpg` → `/public/assets/gallery/gallery-01.jpg`
- `.../BDF_8237-1024x684.jpg` → `/public/assets/gallery/gallery-02.jpg`
- `.../BDF_6638-1-1024x684.jpg` → `/public/assets/gallery/gallery-03.jpg`
- `.../Koersdag-finish-lopers-emotie-002-...-1024x576.jpg` → `/public/assets/gallery/gallery-04.jpg`
- `.../Header-finish-fietser-emotie-021-...-1024x256.jpg` → `/public/assets/gallery/gallery-05.jpg`

### Sponsor and partner logos
- `.../brookhuis_5Flogo1.png` → `/public/assets/logos/sponsor-brookhuis.png`
- `.../download.png` → `/public/assets/logos/sponsor-download.png`
- `.../TSBV-logo_FC.jpg` → `/public/assets/logos/sponsor-tsbv.jpg`
- `.../Blue-Y-logo.png` → `/public/assets/logos/sponsor-bluey.png`
- `.../iTypical-logo.png` → `/public/assets/logos/sponsor-itypical.png`
- `.../Fabri-logo.png` → `/public/assets/logos/sponsor-fabri.png`
- `.../Logo-de-Visionair.jpg` → `/public/assets/logos/sponsor-visionair.jpg`
- `www.aveleijn.nl/.../tile.png?...` → `/public/assets/logos/logo-aveleijn-org.png`
- `bizzy.ams3.digitaloceanspaces.com/...png` → `/public/assets/logos/logo-nm-consultancy.png`

## Fallback behavior
- Added reusable frontend image fallback component: `src/components/ui/ImageWithFallback.tsx`.
- Added local placeholder asset: `/public/assets/images/placeholder-image.svg`.
- Sections rendering local images now degrade gracefully to placeholder on load failure.

## Known gaps / follow-up
1. Some sponsor destination URLs were not discoverable from current source markup and are temporarily set to `#`.
2. The `parcours-lopers-divider.jpg` asset is migrated but not yet rendered in section UI; it remains available for parity pass in later phase.
