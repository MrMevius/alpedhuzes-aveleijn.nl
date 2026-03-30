# Title
UI-afwerking: fundraisers KPI verwijderen, tekstblokken verbeteren, galerij-caption positie, sponsorlogo-schaling en footer leesbaarheid

# Context
De gebruiker vroeg om vijf concrete visuele aanpassingen op de homepage:
1) verwijder de KPI "Actieve fundraisers";
2) geef grote tekstblokken meer opmaak;
3) plaats galerij-subtekst (zoals BDF) rechtsonder op de afbeelding;
4) maak logo van N&M Consultancy groter;
5) maak logo van De Visionair groter;
6) maak footer-tekst beter leesbaar.

# Goals / Non-goals
## Goals
- Verwijder de zichtbare KPI "Actieve fundraisers" uit de Progress-sectie.
- Verbeter de leesbare opmaak van grote tekstblokken zonder inhoud te herschrijven.
- Positioneer galerij-captions als overlay rechtsonder op de afbeelding.
- Maak N&M Consultancy en De Visionair logo’s groter op een content-gedreven manier.
- Verbeter leesbaarheid van footer-tekst en links.

## Non-goals
- Geen wijzigingen aan scraping/API-functionaliteit.
- Geen inhoudelijke herformulering van bestaande teksten.
- Geen herstructurering van section-volgorde of globale architectuur.

# Proposed approach
1. Verwijder de derde KPI-card uit `ProgressSection` en ruim bijbehorende content-typing/parsing op.
2. Geef About/Funding (en waar passend intro-teksten) een subtiele "text block" opmaak via CSS Modules.
3. Pas Gallery markup/styling aan zodat caption als overlay in de rechteronderhoek staat.
4. Voeg optionele sponsor-contentattribuut toe voor logogrootte (bv. `logoScale: "large"`) en gebruik dit voor N&M en De Visionair.
5. Verhoog footer-contrast en typografische leesbaarheid.

# Implementation steps (ordered)
1. Maak en activeer deze change spec.
2. Implementeer Progress/KPI wijziging inclusief type/content parser updates.
3. Implementeer text block opmaak in relevante secties.
4. Implementeer galerij caption-overlay rechtsonder.
5. Implementeer content-gedreven sponsorlogo vergroting voor 2 sponsors.
6. Implementeer footer leesbaarheidsverbeteringen.
7. Run verificatiecommando’s.
8. Werk deze spec bij met What changed / How to verify / Verification evidence / Current status.

# Acceptance criteria
1. De metric/card met label "Actieve fundraisers" wordt niet meer gerenderd in de Progress-sectie.
2. Grote tekstblokken (minimaal About en Funding) hebben zichtbaar verbeterde opmaak voor leesbaarheid, zonder inhoudswijziging.
3. Galerij-caption (bijv. BDF) staat rechtsonder op de afbeelding als overlay.
4. Logo van N&M Consultancy wordt zichtbaar groter weergegeven dan standaardlogo’s.
5. Logo van De Visionair wordt zichtbaar groter weergegeven dan standaardlogo’s.
6. Footer-tekst en footer-links zijn duidelijk beter leesbaar door styling (contrast/typografie).

# Testing plan
- `npm run typecheck`
- `npm run build`

# Risk + rollback plan
## Risks
- Type/content parser mismatch kan runtime content loading breken.
- CSS-aanpassingen kunnen onbedoeld mobiele layout beïnvloeden.

## Rollback
- Revert alle aangepaste bestanden in deze change.

# Notes / links
- User request (NL) in chat op 2026-03-30.

# Current status
Completed

# What changed
- Progress-sectie opgeschoond:
  - KPI/card “Actieve fundraisers” verwijderd uit `src/sections/Progress/ProgressSection.tsx`.
  - `activeFundraisers` label verwijderd uit `content/sections/progress.json`.
  - Parsing/types aangepast zodat `ProgressContent.labels` alleen `totalRaised`, `teamGoal` en `lastUpdated` bevat.
  - Metrics-grid aangepast naar 2 kolommen in `src/sections/Progress/ProgressSection.module.css`.
- Grote tekstblokken beter opgemaakt:
  - In `src/sections/About/AboutSection.module.css` kregen paragrafen een subtiele kaart-opmaak (achtergrond, border-left, padding, hogere line-height).
  - In `src/sections/Funding/FundingSection.module.css` idem voor inhoudelijke paragrafen; linkregels apart gehouden via nieuwe class `linkParagraph`.
  - `src/sections/Funding/FundingSection.tsx` geüpdatet om linkregels met `linkParagraph` te renderen.
- Galerij-caption rechtsonder op afbeeldingen:
  - `src/sections/Gallery/GallerySection.tsx` voorzien van `.media` wrapper.
  - `src/sections/Gallery/GallerySection.module.css` caption gewijzigd naar absolute overlay rechtsonder met contrasterende achtergrond.
- Sponsorlogo’s N&M Consultancy en De Visionair vergroot, content-gedreven:
  - Nieuw optioneel veld `logoSize?: 'default' | 'large'` toegevoegd in `src/types/content.ts`.
  - Parser in `src/lib/contentLoader.ts` uitgebreid met validatie voor `logoSize`.
  - `content/sections/sponsors.json` bijgewerkt met `"logoSize": "large"` voor N&M Consultancy en De Visionair.
  - `src/sections/Sponsors/SponsorsSection.tsx` en `.module.css` geüpdatet met conditionele class `.logoLarge`.
- Footer-tekst leesbaarder gemaakt in `src/sections/Footer/FooterSection.module.css`:
  - hoger contrast, iets grotere/duidelijkere menu-links, verbeterde regelhoogte en kleur voor copyright.
- Mobiele finetune toegepast (extra iteratie):
  - `src/sections/About/AboutSection.module.css`: op mobiel compactere padding/radius, subtielere border-left en geoptimaliseerde line-height.
  - `src/sections/Funding/FundingSection.module.css`: idem als About, plus iets betere leesbaarheid van linkregels op mobiel.
  - `src/sections/Gallery/GallerySection.module.css`: caption-overlay op mobiel verfijnd met kleinere inset/font/padding voor nettere positionering.
- Small-mobile polish (±375–420px) toegepast:
  - `src/sections/About/AboutSection.module.css`: extra compacte paragraph-typografie en spacing voor smalle schermen.
  - `src/sections/Funding/FundingSection.module.css`: extra compacte text blocks en betere linkregel-line-height op smalle schermen.
  - `src/sections/Gallery/GallerySection.module.css`: kleinere figure-padding, subtielere caption-badge en compactere positionering op smalle schermen.
  - `src/sections/Sponsors/SponsorsSection.module.css`: card/hoogte/logo-schaal op small-mobile verfijnd, waarbij `logoLarge` nog steeds duidelijk groter blijft dan standaard.
  - `src/sections/Footer/FooterSection.module.css`: compactere footer spacing, betere tekstmaat en separator op nieuwe regel voor duidelijkere leesflow.

# How to verify
1. Start lokaal (`npm run dev`) en controleer visueel:
   - In Tussenstand zijn nog 2 KPI-cards zichtbaar (Totaal opgehaald, Teamdoel), geen “Actieve fundraisers”.
   - About en Geldbesteding tonen langere tekstblokken met duidelijke, rustiger leesopmaak.
   - In Galerij staat captiontekst (zoals “BDF”) rechtsonder op de afbeelding als overlay.
   - In Sponsors zijn N&M Consultancy en De Visionair zichtbaar groter dan de overige logo’s.
   - Footer-tekst en footer-links zijn beter leesbaar (contrast/typografie).
2. Run:
   - `npm run typecheck`
   - `npm run build`
3. Controleer op mobiel (of in responsive mode):
   - About/Funding tekstblokken ogen rustiger en minder "zwaar" door compactere spacing.
   - Gallery-captions blijven rechtsonder zichtbaar zonder de foto te domineren.
4. Controleer op small-mobile (ca. 375px):
   - Footer-regel met attributie breekt netjes en blijft leesbaar.
   - Sponsor cards behouden hiërarchie; grote logo’s zijn groter maar niet dominant.

# Verification evidence
- `npm run typecheck` ✅ geslaagd.
- `npm run build` ✅ geslaagd (client + server build succesvol).
- Na mobiele finetune opnieuw uitgevoerd:
  - `npm run typecheck` ✅ geslaagd.
  - `npm run build` ✅ geslaagd (client + server build succesvol).
- Na small-mobile polish opnieuw uitgevoerd:
  - `npm run typecheck` ✅ geslaagd.
  - `npm run build` ✅ geslaagd (client + server build succesvol).
