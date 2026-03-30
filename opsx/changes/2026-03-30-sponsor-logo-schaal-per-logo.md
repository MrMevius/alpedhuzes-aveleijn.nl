# Title
Sponsorlogo’s per merk fijnmazig schalen

# Context
Gebruiker wil de sponsorlogo’s in de Sponsors-sectie per bedrijf gericht groter/kleiner maken met vaste percentages t.o.v. de huidige standaardgrootte.

# Goals / Non-goals
## Goals
- Ondersteun per sponsor een content-gedreven schaalfactor voor logoformaat.
- Pas de schaalfactoren toe volgens de aangeleverde lijst.
- Behoud bestaande, stabiele Sponsors-layout op desktop en mobiel.

## Non-goals
- Geen wijzigingen aan sponsor-volgorde, links of tekstinhoud.
- Geen wijzigingen buiten de Sponsors-implementatie, behalve type/parser die hiervoor nodig zijn.
- Geen wijziging aan scraping/API/backend.

# Proposed approach
1. Voeg een optioneel numeriek attribuut `logoScale` toe aan sponsorcontent.
2. Valideer `logoScale` in de content-loader.
3. Geef per logo een CSS custom property door vanuit de Sponsors-component.
4. Gebruik in de CSS schaalbare max-height op basis van `logoScale`.
5. Werk `content/sections/sponsors.json` bij met de gevraagde percentages.

# Implementation steps (ordered)
1. Maak en activeer deze change spec.
2. Voeg `logoScale?: number` toe aan `SponsorItem` type.
3. Breid parservalidatie in `contentLoader` uit voor `logoScale`.
4. Pas `SponsorsSection` rendering aan voor per-item schaal (fallback `1`).
5. Pas Sponsors CSS aan naar schaalbare logohoogte (desktop + mobiel).
6. Werk `content/sections/sponsors.json` bij met gevraagde schaalfactoren.
7. Run verificatiecommando’s.
8. Werk deze spec bij met What changed / How to verify / Verification evidence / Current status.

# Acceptance criteria
1. Sponsorcontent ondersteunt een optioneel numeriek veld `logoScale` per item.
2. In de Sponsors-sectie worden logo’s visueel geschaald volgens `logoScale` met default `1`.
3. De volgende schaalfactoren zijn toegepast:
   - Aveleijn = goed (1.0)
   - N&M = +40% (1.4)
   - Brookhuis = +30% (1.3)
   - Broekhuis = goed (1.0)
   - Ter Steege = goed (1.0)
   - Blue-y = -20% (0.8)
   - iTypical = -20% (0.8)
   - Fabri.nl = -40% (0.6)
   - De visionair = +40% (1.4)
   - De Bruin = +20% (1.2)
   - Robert Muntel = goed (1.0)
4. Typecheck en build slagen na de wijziging.

# Testing plan
- `npm run typecheck`
- `npm run build`

# Risk + rollback plan
## Risks
- Onjuiste contentwaarde voor `logoScale` kan content parsing laten falen.
- Te agressieve schaal kan visuele balans van de grid verstoren op mobiel.

## Rollback
- Revert wijzigingen in types/parser/Sponsors component/CSS/content en deze spec.

# Notes / links
- User request (NL) in chat op 2026-03-30.

# Current status
Completed

# What changed
- `src/types/content.ts`:
  - `SponsorItem` uitgebreid met optioneel veld `logoScale?: number`.
- `src/lib/contentLoader.ts`:
  - Parser voor `sponsors.items` uitgebreid met `logoScale` parsing/validatie.
  - Validatie toegevoegd dat `logoScale` (indien gezet) een geldig getal groter dan `0` moet zijn.
  - Bestaande `logoSize` ondersteuning behouden voor backward compatibility.
- `src/sections/Sponsors/SponsorsSection.tsx`:
  - Rendering aangepast zodat per sponsor een CSS custom property `--logo-scale` wordt meegegeven.
  - Schaal wordt bepaald via `logoScale` met fallback op legacy `logoSize === "large"` (1.2) en anders `1`.
- `src/sections/Sponsors/SponsorsSection.module.css`:
  - Logohoogte content-gedreven gemaakt via `max-height: calc(var(--logo-base-height) * var(--logo-scale, 1))`.
  - Desktop en mobiele basishoogte behouden via `--logo-base-height`.
- `content/sections/sponsors.json`:
  - Sponsoren voorzien van gevraagde schaalfactoren:
    - Aveleijn `1.0`
    - N&M Consultancy `1.4`
    - Brookhuisgroep `1.3`
    - Broekhuis Almelo `1.0`
    - Ter Steege Bouw Vastgoed `1.0`
    - Blue-Y `0.8`
    - iTypical `0.8`
    - Fabri `0.6`
    - De Visionair `1.4`
    - De Bruin Lichttechniek en Decorbouw `1.2`
    - Robert Muntel `1.0`

# How to verify
1. Start lokaal (`npm run dev`) en ga naar sectie “Onze sponsors”.
2. Controleer visueel dat logoformaten overeenkomen met de ingestelde percentages.
3. Run:
   - `npm run typecheck`
   - `npm run build`

# Verification evidence
- `npm run typecheck` ✅ geslaagd.
- `npm run build` ✅ geslaagd (client + server build succesvol).
