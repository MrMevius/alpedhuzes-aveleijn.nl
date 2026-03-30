# Title
Backend + repository opschoning voor public repo

# Context
De repository is nu public. Er is behoefte aan een nettere "achterkant": backend-structuur verduidelijken, gerelateerde zaken bundelen, overbodige bestanden opruimen en instructies algemener/duidelijker maken voor externe lezers en bijdragers.

# Goals / Non-goals
## Goals
- Backend progress-configuratie logisch bundelen en los trekken van aggregatie/scrape-flow.
- Overbodige placeholder-bestanden verwijderen waar mappen al echte inhoud hebben.
- Repository-documentatie/instructies vereenvoudigen en verduidelijken voor public gebruik.
- Bestaand runtime-gedrag behouden (API-contract, caching en fallback).

## Non-goals
- Geen nieuwe features of endpoint-uitbreidingen.
- Geen wijziging aan deploymentmodel (single container, port 8099).
- Geen hernoeming/migratie van historische change-artifacts buiten noodzakelijke verduidelijking.

# Proposed approach
1. Introduceer een server-config module voor progress-doel en fundraiser-bronnen.
2. Laat route + service dezelfde configbron gebruiken om duplicatie te verminderen.
3. Verwijder overbodige `.gitkeep` bestanden in mappen die al bestanden bevatten.
4. Werk `README.md` bij met heldere, generieke structuur voor public repo gebruik.
5. Voeg compacte `CONTRIBUTING.md` toe met bijdragenrichtlijnen.

# Implementation steps (ordered)
1. Maak deze change spec en bevestig scope.
2. Refactor server progress-configuratie naar een aparte module.
3. Verwijder redundante `.gitkeep` placeholders in niet-lege mappen.
4. Update README (helderder, algemener) en voeg CONTRIBUTING toe.
5. Voer verificatie uit (`typecheck`, `test`, `build`).
6. Werk deze spec bij met What changed, How to verify, Verification evidence, Current status.

# Acceptance criteria
1. Progress-config (goal + sources) staat op één logische plek en wordt hergebruikt door service/route.
2. Bestaand gedrag blijft intact:
   - `GET /api/progress` retourneert hetzelfde contract met cache/fallback.
   - Server build en tests blijven slagen.
3. Overbodige `.gitkeep` bestanden in niet-lege mappen zijn verwijderd.
4. README is duidelijker/generieker voor public repo lezers.
5. `CONTRIBUTING.md` bestaat met praktische bijdrage-instructies.

# Testing plan
- `npm run typecheck`
- `npm run test`
- `npm run build`

# Risk + rollback plan
## Risks
- Refactor van progress-config kan regressie geven in fallbackpad als importen/dependency-initialisatie onjuist zijn.
- Te agressieve cleanup kan onbedoeld structurele placeholders verwijderen.

## Rollback
- Revert de betrokken server-, docs- en cleanup-bestanden.
- Herstel vorige `progressService`/route-implementatie als API-contract afwijkt.

# Notes / links
- Scope valt onder fase-1 maintainability/public-repo hygiene.

# Current status
Completed

# What changed
- Backend progress-config opgeschoond en gebundeld:
  - Nieuw: `server/config/progressConfig.ts`
  - Bevat nu centrale content/default-config voor:
    - fundraiser sources (`readFundraiserSourcesFromContent`)
    - progress doel (`readGoalEurFromContent`)
- `server/services/progressService.ts` vereenvoudigd door config-readers uit de service te halen en vanuit `server/config/progressConfig.ts` te importeren.
- `server/routes/progress.ts` fallback-pad gebruikt nu dezelfde centrale config-reader functies in plaats van route-lokale afleiding via service-exports.
- Overbodige `.gitkeep` bestanden verwijderd in niet-lege mappen:
  - `src/components/.gitkeep`
  - `src/lib/.gitkeep`
  - `src/sections/.gitkeep`
  - `src/types/.gitkeep`
  - `server/lib/.gitkeep`
  - `server/services/.gitkeep`
  - `server/types/.gitkeep`
  - `tests/server/fixtures/.gitkeep`
  - `public/assets/images/.gitkeep`
  - `public/assets/gallery/.gitkeep`
  - `public/assets/logos/.gitkeep`
- Repository-instructies verduidelijkt:
  - `README.md` herschikt en compacter/generieker gemaakt voor public repo gebruik.
  - Nieuw `CONTRIBUTING.md` toegevoegd met workflow, constraints en verificatiestappen.

# How to verify
1. Run `npm run typecheck`
2. Run `npm run test`
3. Run `npm run build`
4. Controleer dat `server/config/progressConfig.ts` bestaat en gebruikt wordt in progress route/service.
5. Controleer dat `CONTRIBUTING.md` aanwezig is.

# Verification evidence
- `npm run typecheck` ✅ geslaagd.
- `npm run test` ✅ geslaagd.
  - `tests/server/fundraiserScraper.test.ts` (4 tests) geslaagd
  - `tests/server/progressService.test.ts` (4 tests) geslaagd
- `npm run build` ✅ geslaagd.
  - Client build via Vite geslaagd
  - Server build via `tsc -p tsconfig.server.json` geslaagd
- Handmatige verificatie uitgevoerd:
  - `server/config/progressConfig.ts` aanwezig en gebruikt door:
    - `server/services/progressService.ts`
    - `server/routes/progress.ts`
  - `CONTRIBUTING.md` aanwezig in repository root.
