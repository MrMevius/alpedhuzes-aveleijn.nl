# Title
UX + performance + betrouwbaarheid verbeterpass (3 visueel, 2 technisch)

# Context
De huidige site werkt functioneel, maar kan duidelijker converteren in de hero, consistenter ogen tussen secties, sterker vertrouwen opbouwen via impact/social proof, sneller laden op mobiel, en robuuster omgaan met progress-scrape storingen in de frontend-weergave.

# Goals / Non-goals
## Goals
1. Hero visueel sterker en CTA-hiërarchie duidelijker maken.
2. Secties visueel consistent maken (spacing, typografie, kaart-/knopgedrag).
3. Impact/social proof zichtbaarder presenteren.
4. Mobiele performance verbeteren met image-optimalisaties en lazy loading gedrag.
5. Progress-weergave robuuster maken met stale/fallback metadata in UI.

## Non-goals
1. Geen nieuwe backend services buiten bestaande Express scope.
2. Geen database-introductie.
3. Geen inhoudelijke herschrijving van kernteksten zonder expliciete vraag.
4. Geen opsplitsing naar meerdere containers.

# Proposed approach
- Content-driven uitbreiden: nieuwe/extra velden in `/content` met TypeScript-validatie in laadgrens.
- Visuele harmonisatie via tokens + bestaande `SectionBlock` patronen.
- Hergebruik bestaande progress API contractvelden (`lastUpdated`, `cacheAgeSeconds`, `isStale`) in frontend.
- Afbeeldingsoptimalisatie met lokale assets, geen hotlinks.
- Kleine, omkeerbare stappen per sectie/component.

# Implementation steps (ordered)
1. Baseline + scope check
   - Inventariseer huidige hero/progress/sponsors rendering en image usage.
   - Definieer minimale design-aanpassingen zonder grote refactor.

2. Visueel: Hero versterken
   - Voeg contentvelden toe voor impactregel/CTA-klemtoon indien nodig.
   - Update `HeroSection` markup en CSS voor sterkere headline, duidelijkere CTA-hiërarchie, betere overlay/leesbaarheid.
   - Behoud content in `/content/sections/hero.json`.

3. Visueel: Consistente sectiestijl
   - Harmoniseer tokens (spacing/radius/shadow/typografische schaal).
   - Standaardiseer section ritme via `SectionBlock` + gerichte CSS module updates.
   - Controleer mobile/desktop consistentie.

4. Visueel: Impact/social proof
   - Breid progress-presentatie uit met compacte impactblokken.
   - Neem als KPI naast totaal en doel minimaal op: **aantal actieve fundraisers** (afgeleid van `sources` in progress payload).
   - Versterk sponsorpresentatie (grid/labels/duidelijkheid) zonder content hardcoding.
   - Houd wijzigingen content-driven waar relevant.

5. Technisch: Performance optimalisatie
   - Breid `ImageWithFallback` uit met `loading`, `decoding`, en optioneel `fetchPriority`.
   - Zet zware afbeeldingen om naar WebP/AVIF waar zinvol; update paden in content.
   - Verifieer dat hero/galerij mobiel sneller renderen.

6. Technisch: Robuuste progress fallback in UI
   - Verwerk API metadata (`lastUpdated`, `cacheAgeSeconds`, `isStale`, `error`) in `ProgressSection`.
   - Toon duidelijke statusregel bij stale/fout met laatste bekende update.
   - Houd backend fallback-gedrag intact; alleen aanscherpen als tests gat tonen.

7. Verificatie + afronding
   - Draai typecheck/tests/build.
   - Handmatige QA op responsive, CTA-zichtbaarheid, toegankelijkheid en fallback states.
   - Werk spec-secties bij met bewijs en status.

# Acceptance criteria
1. Hero toont duidelijke primaire actie en verbeterde visuele hiërarchie op desktop en mobiel.
2. Secties hebben consistente spacing/typografie/kaartgevoel zonder regressies.
3. Impact/social proof is zichtbaarder in de pagina-opbouw, inclusief KPI “aantal actieve fundraisers”.
4. Afbeeldingen laden efficiënter (lazy/decoding) en grote assets zijn geoptimaliseerd waar toegepast.
5. Progress UI toont bruikbare fallback/stale informatie inclusief update-context.
6. `npm run typecheck`, `npm run test`, en `npm run build` slagen.

# Testing plan
- `npm run typecheck`
- `npm run test`
- `npm run build`
- Handmatig:
  - Hero + CTA op 320px, 768px, 1280px.
  - Progress-status in normale/stale/error situatie.
  - Sponsor/impact weergave, contrast en focus states.

# Risk + rollback plan
## Risks
- Visuele drift t.o.v. huidige stijl.
- Beeldkwaliteit/gewicht trade-off bij assetconversie.
- Regressie in progress messaging.

## Rollback
- Revert per stap (hero, style pass, image pass, progress UI) om impact te isoleren.

# Notes / links
- Relevante code:
  - `src/sections/Hero/HeroSection.tsx`
  - `src/sections/Hero/HeroSection.module.css`
  - `src/components/layout/SectionBlock.module.css`
  - `src/sections/Progress/ProgressSection.tsx`
  - `src/sections/Progress/ProgressSection.module.css`
  - `src/components/ui/ImageWithFallback.tsx`
  - `server/services/progressService.ts`
  - `tests/server/progressService.test.ts`
  - `content/sections/hero.json`
  - `content/sections/progress.json`

# Current status
Completed

# What changed
- **Hero visueel versterkt**
  - `content/sections/hero.json`: nieuw optioneel contentveld `impactHighlight` toegevoegd.
  - `src/types/content.ts` + `src/lib/contentLoader.ts`: type/parse support toegevoegd voor `hero.impactHighlight`.
  - `src/sections/Hero/HeroSection.tsx` + `.module.css`: hero herschikt met duidelijke overlay, prominente CTA-hiërarchie, verbeterde leesbaarheid en mobile layout.
- **Consistente sectiestijl verbeterd**
  - `src/components/layout/SectionBlock.module.css`: consistenter spacing/ritme tussen secties en uniforme card shadow.
  - `src/styles/tokens.css`: extra radius-token toegevoegd.
  - `src/styles/base.css`: duidelijke focus-visible outline toegevoegd voor toegankelijkheid.
- **Impact/social proof zichtbaarder gemaakt**
  - `content/sections/progress.json`: labels uitgebreid met `activeFundraisers` en `lastUpdated`.
  - `src/types/content.ts` + `src/lib/contentLoader.ts`: parse/type support voor nieuwe progress labels.
  - `src/sections/Progress/ProgressSection.tsx` + `.module.css`:
    - metric cards toegevoegd,
    - KPI **actieve fundraisers** toegevoegd (afgeleid van `sources.length`),
    - “laatst bijgewerkt” zichtbaar gemaakt.
  - `src/sections/Sponsors/SponsorsSection.tsx` + `.module.css`: social-proof badge toegevoegd met sponsor-aantal.
- **Technisch: image loading geoptimaliseerd**
  - `src/components/ui/ImageWithFallback.tsx`: ondersteuning toegevoegd voor `loading`, `decoding`, `fetchPriority`, `sizes`.
  - Hero image/logo op `eager` + high priority gezet; overige sectiebeelden voorzien van `sizes` hints:
    - `src/sections/About/AboutSection.tsx`
    - `src/sections/Actions/ActionsSection.tsx`
    - `src/sections/Gallery/GallerySection.tsx`
    - `src/sections/Sponsors/SponsorsSection.tsx`
- **Technisch: progress fallback context verbeterd in UI**
  - `src/sections/Progress/ProgressSection.tsx`: verwerking toegevoegd voor `lastUpdated` en `cacheAgeSeconds`.
  - Stale/fallback messaging verduidelijkt met leeftijd in minuten.

# How to verify
1. Draai automatische checks:
   - `npm run typecheck`
   - `npm run test`
   - `npm run build`
2. Handmatig in browser:
   - Controleer Hero op 320px / 768px / 1280px: duidelijke primaire CTA en leesbare overlay.
   - Controleer Progress-sectie:
     - metric cards zichtbaar,
     - label “Actieve fundraisers” zichtbaar,
     - “Laatst bijgewerkt” zichtbaar,
     - stale/error tekst blijft bruikbaar.
   - Controleer Sponsors-sectie: badge met totaal aantal sponsors zichtbaar.
   - Controleer tab/focus op links/knoppen: zichtbare focus-ring.

# Verification evidence
- `npm run typecheck` ✅ geslaagd.
- `npm run test` ✅ geslaagd.
  - `tests/server/fundraiserScraper.test.ts` (4 tests) geslaagd
  - `tests/server/progressService.test.ts` (4 tests) geslaagd
- `npm run build` ✅ geslaagd.
  - Client build succesvol (`vite build`)
  - Server build succesvol (`tsc -p tsconfig.server.json`)
