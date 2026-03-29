# Capability Spec: Landing page architecture and section parity

## Objective
Define the requirements for a modular single-page landing page replacement that is visually/functionally close to the current source site while prioritizing maintainability.

## Requirements

### R1. Single-page section composition
The site SHALL render as one landing page composed of these phase-1 sections in order:
1. Hero
2. Progress / Tussenstand
3. About / Wie zijn wij
4. Geldbesteding
5. Actions
6. Gallery
7. Sponsor CTA + sponsorship table
8. Sponsor logos grid
9. Contact cards
10. Footer

### R2. Section modularity
Each section SHALL be implemented as an isolated module under `/src/sections` with minimal coupling to other sections.

### R3. Content-driven rendering
User-visible text/content SHALL come from local content files under `/content` and SHALL NOT be duplicated in random component code.

### R4. Copy preservation
Phase-1 visible copy SHALL remain as-is (including current typos/quirks) unless explicitly requested otherwise.

### R5. Contact mode
Contact area SHALL be link-based only (`mailto`, `tel`, social URLs). No contact form is included in phase 1.

### R6. Asset locality
All site-owned images/logos/media used by the page SHALL be served from local project assets under `/public/assets`.

### R7. Accessibility/responsiveness baseline
The page SHALL use semantic headings/landmarks where practical and remain usable on mobile, tablet, and desktop layouts.

## Validation checklist
- [ ] Section order and presence match required list.
- [ ] Each section maps to dedicated module and content file.
- [ ] No contact form present in phase 1.
- [ ] Local asset paths are used for site-owned media.
- [ ] Content quirks preserved; textual issues tracked separately.
