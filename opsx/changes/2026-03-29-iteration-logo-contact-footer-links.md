# Title
Iteratie: hero-logo positie, subtiel sectie-onderscheid, contact-iconen en footer-links

# Context
De homepage is functioneel afgerond, maar er is een gerichte iteratie gevraagd op visuele verfijning en footer/contact-details: logo-positionering, lichte sectiescheiding, iconen bij contactkanalen en expliciete link-attributie in de footer.

# Goals / Non-goals
## Goals
- Plaats het bestaande logo `logo-aveleijn-samen-sterk.png` in de rechterbovenhoek van de hero.
- Breng een subtiel visueel onderscheid aan tussen secties.
- Voeg iconen toe bij contact-items: e-mail, telefoon, Facebook, Instagram en LinkedIn.
- Verwijder de footer-menu tekstlink "Contact".
- Maak Tivius en N&M Consultancy klikbaar in de footer-attributie.

## Non-goals
- Geen architectuurwijziging of sectie-herstructurering.
- Geen contentherschrijving buiten gevraagde punten.
- Geen API/backend/runtime wijziging.

# Proposed approach
1. Hero-opbouw licht aanpassen zodat logo in een gepositioneerde overlay rechtsboven op de hero-afbeelding staat.
2. Subtiel sectieonderscheid in `SectionBlock`-styling toevoegen (achtergrond/border/radius), zonder donkere footerstijl te breken.
3. Contact-kaarten uitbreiden met icon rendering op basis van `label`.
4. Footer-content uitbreiden met optionele linkvelden voor agency/sponsor-attributie en menu-item verwijderen in content.
5. Typecheck/tests/build draaien en spec bijwerken met bewijs.

# Implementation steps (ordered)
1. Maak en activeer deze change spec.
2. Update hero JSX/CSS voor logo rechtsboven.
3. Update section block CSS voor subtiel sectieonderscheid.
4. Voeg contact-iconen toe in Contact component + CSS.
5. Update content/types/parser/footer-rendering voor klikbare Tivius + N&M links.
6. Verwijder footer-menu item "Contact" in `content/site.json`.
7. Draai `npm run typecheck`, `npm run test`, `npm run build`.
8. Werk deze spec bij met What changed / How to verify / Verification evidence / Current status.

# Acceptance criteria
1. Hero toont `logo-aveleijn-samen-sterk.png` in de rechterbovenhoek met correcte responsive positionering.
2. Secties hebben subtiel visueel onderscheid zonder leesbaarheid of bestaande sectiestijlen te schaden.
3. Contact-kaarten voor e-mail, telefoon, Facebook, Instagram en LinkedIn tonen elk een passend icoon.
4. Footer bevat geen "Contact" menu-item meer.
5. Footer-attributie bevat klikbare links naar Tivius en N&M Consultancy.
6. `npm run typecheck`, `npm run test` en `npm run build` slagen.

# Testing plan
- `npm run typecheck`
- `npm run test`
- `npm run build`
- Handmatige controle in browser (desktop + mobiel):
  - hero logo rechtsboven
  - sectieonderscheid zichtbaar maar subtiel
  - contact-iconen zichtbaar en uitgelijnd
  - footer menu zonder Contact
  - footer links klikbaar naar Tivius en N&M

# Risk + rollback plan
## Risks
- Hero overlay kan op kleine schermen met CTA/tekst concurreren.
- Generieke sectiestijl kan visueel botsen met sections met eigen achtergrond.

## Rollback
- Revert op bestandniveau van:
  - `src/sections/Hero/HeroSection.tsx`
  - `src/sections/Hero/HeroSection.module.css`
  - `src/components/layout/SectionBlock.module.css`
  - `src/sections/Contact/ContactSection.tsx`
  - `src/sections/Contact/ContactSection.module.css`
  - `src/types/content.ts`
  - `src/lib/contentLoader.ts`
  - `src/sections/Footer/FooterSection.tsx`
  - `content/site.json`

# Notes / links
- Gebruikersiteratie (NL): logo rechtsboven, subtiel sectieonderscheid, contact-iconen, contacttekst onderaan weg, links naar Tivius en N&M.

# Current status
Completed

# What changed
- Hero logo in rechterbovenhoek geplaatst door de hero-media te groeperen en het logo als overlay te positioneren:
  - `src/sections/Hero/HeroSection.tsx`
  - `src/sections/Hero/HeroSection.module.css`
- Subtiel visueel onderscheid tussen secties toegevoegd via `SectionBlock`:
  - `src/components/layout/SectionBlock.module.css`
  - Niet-footer secties hebben nu een lichte card-achtergrond, border/radius en subtiele afwisseling per sectie.
- Contact-kaarten uitgebreid met iconen voor e-mail, telefoon, Facebook, Instagram (incl. typo-variant `Instragram`) en LinkedIn:
  - `src/sections/Contact/ContactSection.tsx`
  - `src/sections/Contact/ContactSection.module.css`
- Footer uitgebreid met klikbare attributielinks naar Tivius en N&M Consultancy, content-driven en type-safe:
  - `content/site.json`
  - `src/types/content.ts`
  - `src/lib/contentLoader.ts`
  - `src/sections/Footer/FooterSection.tsx`
  - `src/sections/Footer/FooterSection.module.css`
- Footer menu-item "Contact" verwijderd in content:
  - `content/site.json`

# How to verify
1. Draai kwaliteitschecks:
   - `npm run typecheck`
   - `npm run test`
   - `npm run build`
2. Start lokaal (`npm run dev`) en controleer visueel:
   - Hero: `logo-aveleijn-samen-sterk.png` staat rechtsboven op de hero-afbeelding (desktop + mobiel).
   - Secties: subtiel onderscheid zichtbaar tussen opeenvolgende delen.
   - Contact: iconen zichtbaar bij e-mail, telefoon, Facebook, Instagram en LinkedIn.
   - Footer: menu bevat geen "Contact" meer.
   - Footer-attributie: links naar `https://tivius.nl` en `https://n-m-consultancy.nl` zijn klikbaar.

# Verification evidence
- `npm run typecheck` succesvol afgerond.
- `npm run test` succesvol afgerond: 2 testbestanden, 7 tests geslaagd.
- `npm run build` succesvol afgerond (Vite client build + server TypeScript build).
