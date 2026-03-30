# Title
Optimaliseer lokale afbeeldingen met WebP/AVIF en behoud visuele kwaliteit

# Context
De site gebruikt lokale assets onder `/public/assets`, maar meerdere afbeeldingen staan nog als zwaardere JPG/PNG bestanden in productie. Dat beïnvloedt laadtijd op mobiel en Core Web Vitals. De eerdere UX-pass heeft loading hints toegevoegd in componenten; de ontbrekende stap is daadwerkelijke asset-optimalisatie en gecontroleerde padmigratie.

# Goals / Non-goals
## Goals
1. Inventariseer zware afbeeldingen in `public/assets/images` en `public/assets/gallery`.
2. Converteer geselecteerde assets naar moderne formaten (WebP en waar zinvol AVIF).
3. Update contentpaden zodat productiecode de geoptimaliseerde varianten gebruikt.
4. Behoud bestaande visuele kwaliteit (geen zichtbare kwaliteitsval in hero/galerij).
5. Documenteer verificatie en groottewinst in deze spec.

## Non-goals
1. Geen redesign van secties of nieuwe visuele componenten.
2. Geen externe image CDN of remote hotlinking.
3. Geen backend-architectuurwijzigingen.

# Proposed approach
1. Meet huidige bestandsgroottes van relevante hero/about/actions/gallery/sponsor-afbeeldingen.
2. Converteer per afbeelding naar `.webp` (en optioneel `.avif`) met behoud van redelijke kwaliteit.
3. Vervang in contentbestanden alleen paden die zeker bestaan en visueel akkoord zijn.
4. Laat originele bronbestanden voorlopig staan voor rollback-veiligheid.
5. Draai build en smoke checks op pagina rendering.

# Implementation steps (ordered)
1. Bepaal actieve assetset die boven de fold of vaak zichtbaar is:
   - hero, about, acties, galerij en sponsorlogo’s met hoogste impact.
2. Converteer geselecteerde assets naar WebP (en AVIF waar efficiënt) met CLI/tooling in repo-context.
3. Update content JSON paden in `/content/sections/*` naar nieuwe extensies.
4. Controleer dat alle aangepaste paden bestaan en fallback niet onnodig triggert.
5. Draai verificatie (`typecheck`, `test`, `build`) en noteer resultaten.
6. Werk deze spec bij: What changed, How to verify, Verification evidence, Current status.

# Acceptance criteria
1. Minimaal hero-achtergrond en galerij-afbeeldingen gebruiken geoptimaliseerde extensies (`.webp` of `.avif`).
2. Alle aangepaste image-paden in content verwijzen naar bestaande lokale bestanden.
3. Site buildt succesvol en blijft renderen zonder ontbrekende assets.
4. Er is aantoonbare groottewinst gedocumenteerd voor de geconverteerde bestanden.
5. `npm run typecheck`, `npm run test`, en `npm run build` slagen.

# Testing plan
- `npm run typecheck`
- `npm run test`
- `npm run build`
- Handmatig:
  - Open homepage en controleer hero, about, actions, gallery, sponsors op zichtbare afbeeldingen.
  - Controleer browser network panel op nieuwe extensies en correcte HTTP 200.

# Risk + rollback plan
## Risks
- Te sterke compressie kan zichtbare artefacten geven.
- Verkeerde padwijziging kan placeholder-fallback activeren.

## Rollback
- Herstel contentpaden naar originele extensies.
- Verwijder geoptimaliseerde varianten indien nodig.

# Notes / links
- Doel: technische performanceverbetering binnen fase 1, zonder functionele scope-uitbreiding.

# Current status
Completed

# What changed
- Geoptimaliseerde WebP-varianten toegevoegd voor kernbeelden:
  - `public/assets/images/hero-bg-willem-kiers.webp`
  - `public/assets/images/about-team-ejb2683.webp`
  - `public/assets/images/actions-loempia.webp`
  - `public/assets/gallery/gallery-01.webp` t/m `gallery-05.webp`
- Contentpaden bijgewerkt naar WebP voor actieve secties:
  - `content/sections/hero.json`
  - `content/sections/about.json`
  - `content/sections/actions.json`
  - `content/sections/gallery.json`
- Originele JPG-bestanden bewust behouden als rollbackoptie.

# How to verify
1. Controleer dat geoptimaliseerde bestanden bestaan:
   - `ls public/assets/images/*.webp`
   - `ls public/assets/gallery/*.webp`
2. Controleer dat content naar WebP verwijst in:
   - `content/sections/hero.json`
   - `content/sections/about.json`
   - `content/sections/actions.json`
   - `content/sections/gallery.json`
3. Draai checks:
   - `npm run typecheck`
   - `npm run test`
   - `npm run build`
4. Handmatige smoke check:
   - Open homepage en verifieer hero/about/actions/gallery afbeeldingen.

# Verification evidence
- Bestandsgroottevergelijking (voor/na):
  - hero: `hero-bg-willem-kiers.jpg` 96K → `hero-bg-willem-kiers.webp` 56K
  - about: `about-team-ejb2683.jpg` 436K → `about-team-ejb2683.webp` 192K
  - actions: `actions-loempia.jpg` 116K → `actions-loempia.webp` 64K
  - gallery-01: 152K → 96K
  - gallery-02: 100K → 44K
  - gallery-03: 100K → 40K
  - gallery-04: 112K → 40K
  - gallery-05: 60K → 28K
- `npm run typecheck` ✅ geslaagd.
- `npm run test` ✅ geslaagd (2 files, 8 tests passed).
- `npm run build` ✅ geslaagd (client + server).
