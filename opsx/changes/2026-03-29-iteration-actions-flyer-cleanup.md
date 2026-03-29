# Title
Iteratie: acties bijwerken met flyer en opruimen verouderde actie-items/media

# Context
De gebruiker vraagt om een gerichte iteratie in de sectie Acties: een nieuwe flyer-afbeelding toevoegen, twee bestaande actie-items verwijderen (Tiramisu en Bingo) en oude bingo/tiramisu-afbeeldingen opruimen.

# Goals / Non-goals
## Goals
- Voeg `\public\assets\gallery\Flyer Bingo 2 april.png` toe aan de content van de Acties-sectie.
- Verwijder de actie-items "Tiramisu-actie voor de feestdagen" en "Bingo" uit de Acties-sectie.
- Verwijder niet-meer-gebruikte actie-afbeeldingen die bij deze verwijderde items horen.
- Controleer of de drie doorgegeven WordPress-bestandsnamen nog bestaan/refereren en ruim op waar van toepassing.

## Non-goals
- Geen wijziging aan backend/API-routes.
- Geen visuele redesign buiten noodzakelijke content/media update.
- Geen aanpassing aan andere secties dan nodig voor consistente referenties/documentatie.

# Proposed approach
1. Werk `content/sections/actions.json` bij: verwijder Tiramisu/Bingo-items en voeg een nieuw item toe met de flyer-afbeelding.
2. Verwijder ongebruikte lokale mediabestanden van de verwijderde acties in `public/assets/images`.
3. Controleer referenties naar de opgegeven WordPress-bestandsnamen en verifieer dat die niet meer actief gebruikt worden.
4. Draai typecheck en build om te valideren dat content parsing en app-build intact blijven.
5. Werk deze spec bij met uitgevoerde wijzigingen en verificatiebewijs.

# Implementation steps (ordered)
1. Activeer deze change spec.
2. Update `content/sections/actions.json` volgens gevraagde actie-mutaties.
3. Verwijder ongebruikte actie-imagebestanden uit `public/assets/images`.
4. Verifieer en documenteer status van de drie opgegeven bestandsnamen.
5. Draai `npm run typecheck` en `npm run build`.
6. Update deze spec met What changed / How to verify / Verification evidence / Current status.

# Acceptance criteria
1. De Acties-sectie bevat geen "Tiramisu-actie voor de feestdagen" meer.
2. De Acties-sectie bevat geen oude "Bingo"-actie meer.
3. De afbeelding `Flyer Bingo 2 april.png` wordt gebruikt in de Acties-sectie.
4. Niet-meer-gebruikte lokale actie-afbeeldingen voor verwijderde items zijn verwijderd.
5. De drie opgegeven WordPress-bestandsnamen zijn niet meer aanwezig in actieve content-referenties.
6. `npm run typecheck` en `npm run build` slagen na de wijziging.

# Testing plan
- `npm run typecheck`
- `npm run build`
- Handmatige controle van de Acties-sectie in de browser.

# Risk + rollback plan
## Risks
- Onvoldoende aangeleverde tekst voor nieuw flyer-item kan tot minder duidelijke actiekaart leiden.
- Verwijderen van afbeeldingen kan fout gaan als er onverwachte verwijzingen buiten Actions bestaan.

## Rollback
- Revert van:
  - `content/sections/actions.json`
  - verwijderde assets onder `public/assets/images`
  - eventuele documentatie-updates in `opsx/changes/...`

# Notes / links
- Gebruikersverzoek (NL): flyer toevoegen aan Acties, drie oude bestandsnamen verwijderen, Tiramisu-actie en Bingo-actie verwijderen.

# Current status
Completed

# What changed
- `content/sections/actions.json` bijgewerkt:
  - Actie-item **"Tiramisu-actie voor de feestdagen"** verwijderd.
  - Actie-item **"Bingo"** (oude versie) verwijderd.
  - Nieuw actie-item **"Flyer Bingo 2 april"** toegevoegd met afbeelding:
    - `"/assets/gallery/Flyer Bingo 2 april.png"`
- Ongebruikte lokale actie-afbeeldingen verwijderd uit `public/assets/images`:
  - `actions-tiramisu.jpg`
  - `actions-bingo.jpg`
- Gecontroleerd dat de doorgegeven oude WordPress-bestandsnamen niet voorkomen in actieve JSON-contentreferenties:
  - `db875e79-383d-447a-9c11-2038375ce7bc-683x1024.jpg`
  - `9c03a9bd-5cc6-499c-a92e-5dbcddac9f51-683x1024.jpg`
  - `cc068447-431f-421b-98c4-191e07207c5d.jpg`

# How to verify
1. Controleer actie-content:
   - Open `content/sections/actions.json` en bevestig:
     - geen item met titel `Tiramisu-actie voor de feestdagen`
     - geen oude `Bingo`-actie
     - wel item `Flyer Bingo 2 april` met `"/assets/gallery/Flyer Bingo 2 april.png"`
2. Controleer verwijderde assets:
   - `public/assets/images/actions-tiramisu.jpg` bestaat niet meer.
   - `public/assets/images/actions-bingo.jpg` bestaat niet meer.
3. Draai checks:
   - `npm run typecheck`
   - `npm run build`
4. (Optioneel) Start `npm run dev` en controleer dat de Acties-sectie de loempia-kaart plus de nieuwe flyer-kaart toont.

# Verification evidence
- `npm run typecheck` succesvol afgerond.
- `npm run build` succesvol afgerond (Vite client build + server TypeScript build).
- Repo-search bevestigd:
  - `Flyer Bingo 2 april.png` staat in `content/sections/actions.json`.
  - Geen actieve JSON-contentreferenties gevonden naar:
    - `actions-tiramisu.jpg`
    - `actions-bingo.jpg`
    - de drie opgegeven WordPress-bestandsnamen.
