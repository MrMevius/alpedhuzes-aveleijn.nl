# Title
Toegankelijkheidspass: heading-structuur, alt-teksten en linklabels

# Context
Na de UX- en performance-updates is de basis beter, maar er zijn nog toegankelijkheidsverbeteringen nodig: de pagina heeft nog geen expliciete H1 in de hoofdsectie, meerdere content-afbeeldingen hebben lege alt-teksten, en sommige links kunnen explicieter worden benoemd voor screenreaders.

# Goals / Non-goals
## Goals
1. Zorg voor een duidelijke heading-hiërarchie met een H1 in de hero.
2. Vul betekenisvolle alt-teksten in voor niet-decoratieve contentafbeeldingen.
3. Maak linkdoelen explicieter via aria-labels waar context onduidelijk kan zijn.
4. Houd bestaande stijl en content-architectuur intact.

## Non-goals
1. Geen visuele redesign.
2. Geen grote contentherschrijvingen.
3. Geen nieuwe backendfunctionaliteit.

# Proposed approach
1. Maak headingniveau configureerbaar in `SectionBlock` en stel Hero in op H1.
2. Werk alt-teksten bij in relevante content JSON-bestanden.
3. Voeg aria-labels toe op contact- en sponsorlinks met duidelijke beschrijving.
4. Controleer op regressie met typecheck/test/build.

# Implementation steps (ordered)
1. Voeg `headingLevel` prop toe aan `SectionBlock` met default H2.
2. Stel HeroSection in op `headingLevel={1}`.
3. Werk alt-teksten bij in `about.json`, `actions.json`, `gallery.json`.
4. Voeg expliciete aria-labels toe in `ContactSection` en `SponsorsSection` links.
5. Draai verificatiecommando’s.
6. Update deze spec met status en evidence.

# Acceptance criteria
1. Hero titel rendert als H1, overige secties blijven H2.
2. About/Actions/Gallery contentafbeeldingen hebben niet-lege, betekenisvolle alt-teksten.
3. Contact- en sponsorlinks bevatten expliciete aria-labels.
4. `npm run typecheck`, `npm run test`, en `npm run build` slagen.

# Testing plan
- `npm run typecheck`
- `npm run test`
- `npm run build`
- Handmatig:
  - Inspecteer heading-structuur in browser devtools.
  - Test screenreader-labels op sponsor/contact links.

# Risk + rollback plan
## Risks
- Onjuiste alt-teksten kunnen verwarrend zijn.
- Headingniveau-aanpassing kan styling onverwacht beïnvloeden.

## Rollback
- Revert wijzigingen in `SectionBlock`, sectiecomponenten en content JSON alt-velden.

# Notes / links
- Toegankelijkheidsverbetering binnen fase 1 zonder functionele scope-uitbreiding.

# Current status
Completed

# What changed
- Heading-structuur verbeterd:
  - `src/components/layout/SectionBlock.tsx`: nieuwe prop `headingLevel` toegevoegd met default `2`.
  - `src/sections/Hero/HeroSection.tsx`: hero gebruikt nu `headingLevel={1}` en rendert daarmee als H1.
- Alt-teksten aangevuld voor betekenisvolle contentafbeeldingen:
  - `content/sections/about.json`
  - `content/sections/actions.json`
  - `content/sections/gallery.json`
- Expliciete linklabels toegevoegd voor betere screenreader-context:
  - `src/sections/Contact/ContactSection.tsx`: `aria-label` op contactkaarten (`<label>: <value>`).
  - `src/sections/Sponsors/SponsorsSection.tsx`: `aria-label` op sponsorlinks met vermelding dat deze in nieuw tabblad openen.

# How to verify
1. Run:
   - `npm run typecheck`
   - `npm run test`
   - `npm run build`
2. Handmatig in browser:
   - Inspecteer heading-structuur: Hero-titel is H1, overige secties H2.
   - Controleer About/Actions/Gallery JSON op niet-lege alt-teksten.
   - Controleer sponsor- en contactlinks op aanwezige `aria-label` attributen.

# Verification evidence
- `npm run typecheck` ✅ geslaagd.
- `npm run test` ✅ geslaagd (2 test files, 8 tests passed).
- `npm run build` ✅ geslaagd (client + server build succesvol).
