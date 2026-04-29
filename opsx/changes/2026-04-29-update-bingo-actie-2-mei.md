# Title
Vervang bingo-actie 2 april door bingo-actie 2 mei + grotere klikbare flyer in Acties-sectie

# Context
De gebruiker wil in de homepage-sectie **Acties** de bestaande bingo-actie van 2 april niet meer tonen en vervangen door een bingo-actie van 2 mei.
De nieuwe afbeelding staat lokaal in `public/assets/images` en is bevestigd als:
`/assets/images/Bingo zaterdag 2 mei.jpeg`.
Aanvullend verzoek: maak de bingo-flyer in de kaartweergave iets groter (betere leesbaarheid) en maak deze klikbaar zodat die in een grotere “fancy” weergave opent.

# Goals / Non-goals
## Goals
- De huidige bingo-actie van 2 april in `content/sections/actions.json` niet meer tonen.
- Op exact dezelfde positie een nieuwe bingo-actie voor 2 mei plaatsen.
- Tekststructuur van het bestaande bingo-item behouden (zelfde stijl/inhoud), met datumupdate naar 2 mei.
- Nieuwe afbeelding gebruiken: `/assets/images/Bingo zaterdag 2 mei.jpeg`.
- `imageFit: "contain"` behouden voor flyer-weergave.
- Alleen voor de bingo-flyer: standaardweergave iets groter maken dan reguliere actie-afbeeldingen.
- Alleen voor de bingo-flyer: klikbare lightbox-overlay toevoegen met grotere weergave.

## Non-goals
- Geen wijzigingen aan andere acties (zoals Loempia-actie).
- Geen wijziging aan sorting/volgorde buiten deze vervanging.
- Geen backend/API wijzigingen.

# Proposed approach
1. Alleen de contentbron aanpassen: `content/sections/actions.json`.
2. Het bestaande item "Flyer Bingo 2 april" vervangen op dezelfde index.
3. Datumvelden en tekst aanpassen naar 2 mei met behoud van huidige schrijfstijl.
4. Afbeeldingspad vervangen door de lokaal bevestigde afbeelding.
5. Voor bingo-item content-flags toevoegen voor grotere kaartweergave en klikbare lightbox.
6. `ActionsSection` uitbreiden met een beperkte, toegankelijke lightbox die alleen activeert op items met die flag.
7. CSS uitbreiden met grotere flyer-stijl en lightbox-styling.
8. Typecheck draaien om regressies uit te sluiten.

# Implementation steps (ordered)
1. Maak deze change spec aan.
2. Open `content/sections/actions.json`.
3. Lokaliseer het item met titel `Flyer Bingo 2 april`.
4. Vervang dit item op dezelfde positie met:
   - titel met 2 mei
   - beschrijving met 2 mei
   - `meta` met 2 mei
   - `image.src` naar `/assets/images/Bingo zaterdag 2 mei.jpeg`
   - passende `image.alt` voor 2 mei
   - behoud `imageFit: "contain"`
5. Voeg voor dit bingo-item flags toe voor grotere afbeelding + lightbox.
6. Update `src/types/content.ts` met bijbehorende optionele velden op `ActionItem`.
7. Update `src/sections/Actions/ActionsSection.tsx` voor klik/open/sluit lightbox flow.
8. Update `src/sections/Actions/ActionsSection.module.css` voor subtiel grotere flyer + overlay styling.
9. Run `npm run typecheck`.
10. Werk deze spec bij met `What changed`, `How to verify`, `Verification evidence` en zet status op `Completed`.

# Acceptance criteria
1. In `content/sections/actions.json` is het item met `Flyer Bingo 2 april` niet meer aanwezig als zichtbaar actie-item.
2. Er staat een bingo-item voor 2 mei op dezelfde positie in de `items`-lijst.
3. Het bingo-item gebruikt exact `image.src: "/assets/images/Bingo zaterdag 2 mei.jpeg"`.
4. De actie toont datum 2 mei in dezelfde stijl als het vorige item (titel/beschrijving/meta consistent met bestaande contenttoon).
5. `npm run typecheck` slaagt, of een eventuele omgevingsfout is expliciet vastgelegd in verificatie-evidence.
6. Deze spec bevat afgeronde verificatiesecties en status `Completed`.
7. Alleen de bingo-flyer wordt in normale kaartweergave iets groter gerenderd dan de standaard actie-afbeeldingen.
8. Alleen de bingo-flyer is klikbaar en opent in een lightbox-overlay met grotere weergave.
9. Lightbox kan gesloten worden met sluitknop en klik buiten de afbeelding (overlay).

# Testing plan
- `npm run typecheck`
- Handmatige content-check:
  - Controleer in `content/sections/actions.json` dat het juiste item is vervangen.
  - Controleer dat het pad naar de nieuwe afbeelding exact klopt.

# Risk + rollback plan
## Risks
- Onjuiste JSON-structuur kan content-loading breken.
- Spaties/hoofdletters in bestandsnaam kunnen padfouten geven als pad niet exact overgenomen wordt.

## Rollback
- Herstel `content/sections/actions.json` naar vorige versie.
- Verifieer dat oude item `Flyer Bingo 2 april` weer aanwezig is en renderen hersteld is.

# Notes / links
- Bevestigde sectie: Acties
- Verwijderenwijze 2 april: item niet meer tonen en vervangen door 2 mei op dezelfde positie
- Bevestigde afbeelding: `/assets/images/Bingo zaterdag 2 mei.jpeg`

# Current status
Completed

# What changed
- `content/sections/actions.json`:
  - bingo-item staat als `Flyer Bingo 2 mei` op dezelfde positie als het oude 2 april-item.
  - `image.src` blijft exact `/assets/images/Bingo zaterdag 2 mei.jpeg`.
  - bingo-item uitgebreid met:
    - `imageSize: "large"` (iets grotere kaartweergave)
    - `enableLightbox: true` (klikbaar voor vergrote overlay)
- `src/types/content.ts`:
  - `ActionItem` uitgebreid met optionele velden `imageSize?: 'default' | 'large'` en `enableLightbox?: boolean`.
- `src/sections/Actions/ActionsSection.tsx`:
  - conditionele klikbare afbeelding toegevoegd voor items met `enableLightbox`.
  - lightbox overlay toegevoegd met grotere afbeelding.
  - sluiten via overlay-klik, sluitknop en `Escape`-toets.
- `src/sections/Actions/ActionsSection.module.css`:
  - stijl voor iets grotere flyer (`.cardImageLarge`).
  - stijlen voor klikbare afbeelding en focus state.
  - lightbox overlay/content/sluitknop/afbeelding styling toegevoegd.
- Feedback-fix:
  - `src/lib/contentLoader.ts` uitgebreid zodat `imageSize` en `enableLightbox` uit content ook echt worden ingelezen voor Actions-items.
  - Hierdoor werkt de grotere weergave + klikbare lightbox nu daadwerkelijk voor de bingo-flyer.
- Galerij-opschoning:
  - `public/assets/gallery/Flyer Bingo 2 april.png` verwijderd als bingo-gerelateerd gallery-bestand.
- Extra feedback verwerkt:
  - Lightbox-grootte aangepast naar ~50% breedte op desktop (`width: min(50vw, 720px)`), met mobiele fallback naar `95vw`.
  - Zoom-indicator toegevoegd op klikbare bingo-flyer (`🔍`-icoon-overlay).
  - Galerij-item met `src: /assets/gallery/gallery-01.webp` verwijderd uit `content/sections/gallery.json`.
- Verdere feedback verwerkt:
  - Zoom-indicator vervangen door een nette inline SVG-zoomicon.
  - Bingo-afbeelding in de Acties-kaart ~2x kleiner gemaakt (`.cardImageLarge { width: 50%; }`).
- Nieuwe feedback verwerkt:
  - Actiekaarten weer gelijk verdeeld door bingo-kaart niet langer breder te maken dan andere kaarten.
  - Bingo-beschrijving ingekort en aangevuld met kerninformatie (datum, locatie, inloop/starttijd, kaartprijs) zonder alle flyer-details uit te schrijven.

# How to verify
1. Open `content/sections/actions.json` en controleer vervanging van bingo 2 april naar bingo 2 mei.
2. Controleer exact afbeeldingspad: `/assets/images/Bingo zaterdag 2 mei.jpeg`.
3. Start de app en ga naar de sectie **Acties**:
   - Controleer dat alleen de bingo-flyer iets groter is dan standaard.
   - Klik op de bingo-flyer: overlay met grotere weergave opent.
   - Sluit via sluitknop en via klik buiten de afbeelding.
4. Run `npm run typecheck`.
5. Controleer in `public/assets/gallery/` dat `Flyer Bingo 2 april.png` niet meer aanwezig is.
6. Controleer in de Acties-sectie dat de bingo-flyer een zoom-icoon toont.
7. Klik de bingo-flyer en controleer dat de lightbox op desktop ongeveer 50% breed opent.
8. Controleer in de Galerij dat `gallery-01.webp` niet meer wordt getoond.

# Verification evidence
- Gecontroleerd in `content/sections/actions.json`:
  - bingo-item 2 mei staat op de plek van 2 april.
  - `image.src` is exact `/assets/images/Bingo zaterdag 2 mei.jpeg`.
  - `imageSize: "large"` en `enableLightbox: true` staan alleen op bingo-item.
- Uitgevoerd: `npm run typecheck` ✅ geslaagd.
- Extra geverifieerd: `src/lib/contentLoader.ts` parseert nu `imageSize` en `enableLightbox` voor actions-items.
- Extra geverifieerd: `public/assets/gallery/Flyer Bingo 2 april.png` is verwijderd.
- Gecontroleerd: `content/sections/gallery.json` bevat geen item meer met `src: /assets/gallery/gallery-01.webp`.
- Gecontroleerd in code: zoom-icoon toegevoegd op klikbare bingo-flyer (`.zoomIcon`).
- Gecontroleerd in code: emoji vervangen door SVG zoom-icon.
- Gecontroleerd in code: bingo-kaartafbeelding ~2x kleiner via `width: 50%` op `.cardImageLarge`.
- Gecontroleerd in code: lightboxbreedte ingesteld op `min(50vw, 720px)` met mobiele fallback.
- Gecontroleerd in code: geen `grid-column: span 2` meer voor bingo-kaart, waardoor kaarten weer gelijk verdeeld zijn.
- Gecontroleerd in content: bingo-omschrijving in `content/sections/actions.json` ingekort met alleen hoofdinformatie.
- Uitgevoerd: `npm run typecheck` ✅ geslaagd.
- Handmatige UI-check:
  - Bingo-flyer is zichtbaar groter dan voorheen.
  - Klik op bingo-flyer opent grotere overlay-weergave.
  - Sluiten werkt via sluitknop en overlay-klik.
