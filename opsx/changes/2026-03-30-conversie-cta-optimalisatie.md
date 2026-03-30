# Title
Conversie-CTA optimalisatie op hero en progresssectie

# Context
De site heeft al duidelijke CTA’s in de hero, maar voor hogere conversie is herhaling met consistente primaire/secondaire acties nodig op strategische plekken. Met name direct na de voortgangsinformatie is een logisch moment om een bezoeker te laten doneren of contact op te nemen voor sponsoring.

# Goals / Non-goals
## Goals
1. Maak CTA-copy consistenter en conversiegerichter (primair: doneren).
2. Voeg CTA-herhaling toe in de progresssectie zonder extra backendlogica.
3. Houd CTA-configuratie content-driven via `/content`.
4. Behoud bestaande layoutstructuur en section-modulariteit.

## Non-goals
1. Geen nieuwe pagina’s of routering.
2. Geen A/B-test infrastructuur.
3. Geen wijzigingen aan progress API of scraping.

# Proposed approach
1. Update hero CTA-copy met expliciete primaire actie.
2. Breid progress contentmodel uit met primaire en secundaire CTA.
3. Render CTA-knoppen in progresssectie onder de kernmetrics.
4. Gebruik bestaande stylingpatronen (pill buttons) voor visuele consistentie.

# Implementation steps (ordered)
1. Update `content/sections/hero.json` CTA-labels voor betere actiegerichtheid.
2. Voeg CTA-velden toe aan `content/sections/progress.json`.
3. Breid types en content parsing uit (`src/types/content.ts`, `src/lib/contentLoader.ts`).
4. Voeg CTA-rendering toe aan `src/sections/Progress/ProgressSection.tsx`.
5. Voeg bijbehorende CSS toe in `src/sections/Progress/ProgressSection.module.css`.
6. Draai verificatie (`typecheck`, `test`, `build`) en update specstatus.

# Acceptance criteria
1. Hero primaire CTA gebruikt expliciete donatiecopy.
2. Progresssectie toont zowel primaire als secundaire CTA wanneer geconfigureerd.
3. CTA-teksten/links in progress komen volledig uit content JSON.
4. `npm run typecheck`, `npm run test`, en `npm run build` slagen.

# Testing plan
- `npm run typecheck`
- `npm run test`
- `npm run build`
- Handmatig:
  - Controleer hero CTA-copy.
  - Controleer progress CTA-knoppen en links op desktop + mobiel.

# Risk + rollback plan
## Risks
- Te agressieve CTA-copy kan toon van pagina verstoren.
- Onjuiste contentvelden kunnen renderfouten geven.

## Rollback
- Revert CTA-copy en progress CTA-velden + componentwijzigingen.

# Notes / links
- Dit is een gerichte UX/conversie-iteratie binnen fase 1 scope.

# Current status
Completed

# What changed
- Hero primaire CTA-copy aangescherpt:
  - `content/sections/hero.json`: `primaryCta.label` gewijzigd naar **"Doneer nu"**.
- Progress CTA’s content-driven toegevoegd:
  - `content/sections/progress.json`: `primaryCta` en `secondaryCta` toegevoegd.
- Contentmodel uitgebreid voor progress CTA’s:
  - `src/types/content.ts`: `ProgressContent` uitgebreid met optionele `primaryCta` en `secondaryCta`.
  - `src/lib/contentLoader.ts`: parsing toegevoegd voor `progress.primaryCta` en `progress.secondaryCta`.
- Progress UI uitgebreid met CTA-herhaling:
  - `src/sections/Progress/ProgressSection.tsx`: CTA-knoppen renderen onder metrics wanneer geconfigureerd.
  - `src/sections/Progress/ProgressSection.module.css`: styling toegevoegd voor primaire/secundaire CTA en mobiele weergave.

# How to verify
1. Draai:
   - `npm run typecheck`
   - `npm run test`
   - `npm run build`
2. Handmatig:
   - Controleer in hero dat de primaire knoptekst **Doneer nu** is.
   - Controleer in progresssectie dat zowel **Doneer nu** als **Word sponsor** zichtbaar zijn.
   - Controleer op mobiel dat CTA-knoppen netjes onder elkaar en klikbaar zijn.

# Verification evidence
- `npm run typecheck` ✅ geslaagd.
- `npm run test` ✅ geslaagd (2 test files, 8 tests passed).
- `npm run build` ✅ geslaagd (client + server build succesvol).
