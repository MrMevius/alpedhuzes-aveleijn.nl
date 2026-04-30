# Title
Iteratie: 4 nieuwe sponsors + arretjescake-actie met bingo-achtige zoom

# Context
De landingspagina gebruikt content-gedreven secties via JSON-bestanden in `/content/sections`.
De gebruiker wil in deze iteratie vier sponsors toevoegen en een nieuwe actiekaart met flyer toevoegen in de sectie Acties.

Bevestigde keuzes:
- Arretjescake komt in **Actions**.
- Nieuwe sponsors en actie worden **onderaan** toegevoegd.
- Voor Stukadoorsbedrijf Martijn Akse is er **geen website**; kaart moet **niet klikbaar** zijn.
- Logo-schalen: standaard starten en alleen finetunen indien nodig.

# Goals / Non-goals
## Goals
1. Voeg deze sponsors onderaan toe:
   - Leemans (`/assets/logos/Leemans.png`, `https://leemansgroep.nl/`)
   - Expert (`/assets/logos/Expert.png`, `https://www.expert.nl/`)
   - Stukadoorsbedrijf Martijn Akse (`/assets/logos/Stukadoorsbedrijf Akse.png`, zonder website)
   - Velco (`/assets/logos/Logo Velco Grijs-3.png`, `https://www.velco.nl/`)
2. Voeg de arretjescake-actie onderaan toe in `content/sections/actions.json` met lokaal beeldmateriaal en zoom/lightbox zoals bingo.
3. Maak sponsors zonder `href` technisch en visueel ondersteund zonder regressie.

## Non-goals
- Geen redesign van sponsors- of actionssectie.
- Geen backend/API-wijzigingen.
- Geen wijziging aan bestaande sponsorvolgorde (behalve de vier toevoegingen onderaan).

# Proposed approach
1. Gebruik bestaande lokale assets in `/public/assets`.
2. Breid sponsortypen en parser uit zodat `href` optioneel is.
3. Render sponsor als klikbare `<a>` met externe link als `href` bestaat; anders als niet-klikbare `<div>` met dezelfde kaartstijl.
4. Voeg vier sponsors toe in contentbestand onderaan.
5. Voeg arretjescake-item toe in actionscontent onderaan met `enableLightbox: true`, `imageFit: "contain"`, `imageSize: "large"`.
6. Verifieer met typecheck/build.

# Implementation steps (ordered)
1. Maak deze change spec aan in `opsx/changes`.
2. Update `src/types/content.ts` voor optionele sponsor-link.
3. Update `src/lib/contentLoader.ts` parsing voor optionele sponsor-link.
4. Update `src/sections/Sponsors/SponsorsSection.tsx` voor conditioneel klikbare sponsorcards.
5. Voeg vier sponsors onderaan toe in `content/sections/sponsors.json`.
6. Voeg arretjescake-actie onderaan toe in `content/sections/actions.json` met flyertekst gebaseerd op de afbeelding.
7. Run verificatiecommando’s.
8. Werk deze spec bij met resultaten en status.

# Acceptance criteria
1. Sponsorssectie toont 4 nieuwe sponsors onderaan.
2. Leemans, Expert en Velco openen in nieuw tabblad met correcte URL.
3. Stukadoorsbedrijf Martijn Akse is zichtbaar maar niet klikbaar.
4. Arretjescake-actie staat onderaan in Actions.
5. Arretjescake-afbeelding opent in lightbox-zoom zoals bingo.
6. Bestaande sponsor- en action-weergave blijft werken.
7. `npm run typecheck` en `npm run build` slagen.

# Testing plan
- `npm run typecheck`
- `npm run build`
- Handmatige check in browser:
  - sponsorvolgorde + klikgedrag
  - arretjescake zichtbaar en klikbaar voor zoom
  - lightbox sluit met klik buiten, sluitknop en Escape

# Risk + rollback plan
## Risks
- Parsingfout als `href` nog als verplicht behandeld wordt.
- Padfouten door spaties/hoofdletters in assetnamen.

## Rollback
- Revert wijzigingen in:
  - `content/sections/sponsors.json`
  - `content/sections/actions.json`
  - `src/types/content.ts`
  - `src/lib/contentLoader.ts`
  - `src/sections/Sponsors/SponsorsSection.tsx`

# Notes / links
- Gebruikerskeuzes expliciet verwerkt: Actions-plaatsing, onderaan toevoegen, Akse zonder website niet klikbaar.

# Current status
Completed

# What changed
- `content/sections/sponsors.json`
  - 4 sponsors onderaan toegevoegd:
    - Leemans (`https://leemansgroep.nl/`, `/assets/logos/Leemans.png`)
    - Expert (`https://www.expert.nl/`, `/assets/logos/Expert.png`)
    - Stukadoorsbedrijf Martijn Akse (zonder `href`, `/assets/logos/Stukadoorsbedrijf Akse.png`)
    - Velco (`https://www.velco.nl/`, `/assets/logos/Logo Velco Grijs-3.png`)
  - Nieuwe items starten op `logoScale: 1.0`.
- `src/types/content.ts`
  - `SponsorItem.href` gewijzigd van verplicht naar optioneel (`href?: string`).
- `src/lib/contentLoader.ts`
  - Sponsors parser ondersteunt nu optionele `href` via `optionalString(item.href)`.
- `src/sections/Sponsors/SponsorsSection.tsx`
  - Conditionele rendering toegevoegd:
    - met `href` => klikbare `<a>` (extern, nieuw tabblad)
    - zonder `href` => niet-klikbare `<div>` met dezelfde kaartweergave
- `content/sections/actions.json`
  - Arretjescake-actie onderaan toegevoegd met:
    - `image.src: "/assets/images/arretjescake actie.jpg"`
    - `imageFit: "contain"`
    - `imageSize: "large"`
    - `enableLightbox: true`
    - titel/beschrijving/meta op basis van flyertekst (smaken + prijs €11).

# How to verify
1. Start de app lokaal.
2. Controleer in de sponsorssectie dat de vier nieuwe sponsors onderaan staan.
3. Controleer klikgedrag:
   - Leemans/Expert/Velco openen externe pagina in nieuw tabblad.
   - Akse is niet klikbaar.
4. Controleer in de actiessectie dat arretjescake onderaan staat.
5. Klik op de arretjescake-flyer en controleer lightbox-zoom en sluitgedrag.
6. Draai `npm run typecheck` en `npm run build`.

# Verification evidence
- Assetpaden geverifieerd aanwezig:
  - `/public/assets/logos/Leemans.png`
  - `/public/assets/logos/Expert.png`
  - `/public/assets/logos/Stukadoorsbedrijf Akse.png`
  - `/public/assets/logos/Logo Velco Grijs-3.png`
  - `/public/assets/images/arretjescake actie.jpg`
- Uitgevoerd: `npm run typecheck` ✅ geslaagd.
- Uitgevoerd: `npm run build` ✅ geslaagd (client + server).
- Codecontrole:
  - sponsors zonder `href` renderen niet-klikbaar.
  - actions-item voor arretjescake heeft dezelfde lightbox-flagstructuur als bingo (`enableLightbox: true`, `imageSize: "large"`, `imageFit: "contain"`).
