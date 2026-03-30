# Title
UI finetune: footer leesbaarheid, professionele tekstblokken, uitgelichte bingo-afbeelding en sponsor-uitlijning

# Context
De gebruiker vraagt om een gerichte visuele verbeteringsronde op de homepage:
1. Footer is slecht leesbaar.
2. Tekstblokken onder "Wie zijn wij" en "Geldbesteding" moeten professioneler en minder opgeknipt.
3. De bingo-afbeelding (`/assets/gallery/gallery-01.webp`) moet ongeveer 4x zo groot worden als andere gallery-items, waarbij tekst op de afbeelding goed leesbaar blijft.
4. Sponsornamen moeten netjes uitgelijnd zijn.

# Goals / Non-goals
## Goals
- Footer-typografie en contrast verbeteren voor duidelijke leesbaarheid.
- About/Funding-teksten als samenhangende, professionele tekstblokken tonen.
- Bingo-afbeelding als uitgelicht gallery-item renderen op ~4x oppervlak t.o.v. standaard kaarten.
- Leesbaarheid van tekst op de bingo-afbeelding behouden door minder agressieve crop.
- Sponsornamen consistent uitlijnen in sponsorcards.

## Non-goals
- Geen inhoudelijke herschrijving van bestaande teksten.
- Geen wijzigingen aan backend/API/scraping.
- Geen wijziging aan sectievolgorde of globale architectuur.

# Proposed approach
1. Verfijn footer CSS met hoger contrast, duidelijkere linkstijlen en robuustere small-screen opmaak.
2. Groepeer About/Funding paragrafen in één tekstcontainer per sectie met rustige alinea-opmaak.
3. Voeg een content-gedreven gallery-vlag toe (`layout: "featured"`) voor een uitgelichte afbeelding.
4. Laat featured gallery-items in de grid 2 kolommen + 2 rijen beslaan (≈4x oppervlak), met aangepaste image-fit voor tekstleesbaarheid.
5. Structureer sponsorcard-layout met vaste logo-zone en naamzone zodat namen visueel uitlijnen.

# Implementation steps (ordered)
1. Maak en activeer deze change spec.
2. Implementeer footer-leesbaarheid in `FooterSection.module.css` (en zo nodig kleine markup-tweak).
3. Implementeer tekstblok-herstructurering in About/Funding componenten en CSS.
4. Breid gallery content type/parser uit met `layout` voor featured item.
5. Implementeer featured gallery-item rendering/styling voor `gallery-01.webp`.
6. Implementeer sponsornaam-uitlijning in Sponsors component/CSS.
7. Voer verificatie uit (`npm run typecheck`, `npm run build`).
8. Werk deze spec bij met What changed / How to verify / Verification evidence / Current status.

# Acceptance criteria
1. Footer-tekst en footer-links zijn duidelijk beter leesbaar (contrast, grootte en regelhoogte).
2. Tekst onder "Wie zijn wij" en "Geldbesteding" staat niet meer als losse, opgeknipte kaartjes maar als professionele, samenhangende tekstblokken.
3. De bingo-afbeelding (`/assets/gallery/gallery-01.webp`) is visueel ~4x zo groot als standaard galerij-items; overige items behouden hun formaat.
4. Tekst op de bingo-afbeelding blijft goed leesbaar (niet onnodig weggesneden).
5. Sponsornamen zijn consistent en netjes uitgelijnd onder de logo’s.

# Testing plan
- `npm run typecheck`
- `npm run build`

# Risk + rollback plan
## Risks
- Grid-aanpassing in Gallery kan op smalle schermen onbedoelde layoutverschuiving geven.
- Nieuwe sponsorcard-rijindeling kan invloed hebben op logo-schaal op kleine schermen.

## Rollback
- Revert alle aangepaste bestanden uit deze change.

# Notes / links
- User request (NL) in chat op 2026-03-30.

# Current status
Completed

# What changed
- Footer leesbaarheid verbeterd in `src/sections/Footer/FooterSection.module.css`:
  - Donkerdere, contrastrijkere achtergrond (gradient + border) met heldere tekstkleur.
  - Duidelijkere menu-link typografie (iets groter, zwaarder, betere underline-offset).
  - Copyrightregel verbeterd met grotere font-size, hogere line-height en betere link-contrast.
  - Small-screen spacing/typografie aangescherpt.
  - Naderhand op verzoek extra contrast-pass uitgevoerd: footertekst en links expliciet donkerder gemaakt op een lichte footer-achtergrond, zodat leesbaarheid ook in de getoonde situatie duidelijk is.
- Tekstblokken onder **Wie zijn wij** en **Geldbesteding** professioneel en samenhangend gemaakt:
  - `src/sections/About/AboutSection.tsx` en `.module.css`:
    - Paragrafen samengebracht in één `textBlock` container.
    - Alinea-ritme met nette verticale spacing; donatielink als aparte afsluitende regel.
  - `src/sections/Funding/FundingSection.tsx` en `.module.css`:
    - Paragrafen samengebracht in één `textBlock` container.
    - Linkregels geordend in een nette linklijst onderaan het tekstblok.
- Bingo-afbeelding uitgelicht en vergroot (content-gedreven):
  - `content/sections/gallery.json`: `gallery-01.webp` gemarkeerd met `"layout": "featured"`.
  - `src/types/content.ts`: `GalleryImage.layout?: 'default' | 'featured'` toegevoegd.
  - `src/lib/contentLoader.ts`: validatie/parsing toegevoegd voor `layout`.
  - `src/sections/Gallery/GallerySection.tsx` + `.module.css`:
    - Featured image krijgt aparte classes.
    - Grid naar 3 kolommen op desktop; featured item spant 2 kolommen (visueel ~4x oppervlak bij gelijkblijvende ratio).
    - Featured image gebruikt `object-fit: contain` voor betere leesbaarheid van tekst in de afbeelding.
- Sponsornamen netjes uitgelijnd:
  - `src/sections/Sponsors/SponsorsSection.tsx`: naam krijgt expliciete class `name`.
  - `src/sections/Sponsors/SponsorsSection.module.css`:
    - Card-layout met vaste logo-zone + naamzone (`grid-template-rows`) voor consistente naamuitlijning.
    - Naamtypografie en line-height afgestemd voor gelijkmatige baseline.

# How to verify
1. Start lokaal:
   - `npm run dev`
2. Controleer visueel:
   - Footer onderaan heeft duidelijk contrast en goed leesbare links/tekst.
   - In **Wie zijn wij** en **Geldbesteding** staat tekst als samenhangend blok (niet losse kaartjes per zin).
   - In **Galerij** is `/assets/gallery/gallery-01.webp` duidelijk groter dan de rest (uitgelicht), terwijl overige items hetzelfde formaat houden.
   - Tekst in de bingo-afbeelding blijft goed leesbaar (geen agressieve crop).
   - In **Onze sponsors** beginnen sponsornamen op consistente hoogte en staan ze netjes uitgelijnd.
3. Run technische checks:
   - `npm run typecheck`
   - `npm run build`

# Verification evidence
- `npm run typecheck` ✅ geslaagd.
- `npm run build` ✅ geslaagd (client + server build succesvol).
- Na extra footer-contrastpass opnieuw uitgevoerd:
  - `npm run typecheck` ✅ geslaagd.
  - `npm run build` ✅ geslaagd (client + server build succesvol).
