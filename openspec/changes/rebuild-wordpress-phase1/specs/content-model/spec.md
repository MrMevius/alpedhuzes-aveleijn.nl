# Capability Spec: Content model and editable structure

## Objective
Define the editable content architecture for maintainable section-by-section updates without invasive code edits.

## Requirements

### R1. Required content files
The repository SHALL contain:
- `/content/site.json`
- `/content/sections/hero.json`
- `/content/sections/progress.json`
- `/content/sections/about.json`
- `/content/sections/actions.json`
- `/content/sections/gallery.json`
- `/content/sections/sponsoring.json`
- `/content/sections/sponsors.json`
- `/content/sections/contact.json`

Additionally, the implementation MAY include `/content/sections/funding.json` for Geldbesteding.

### R2. Human-readable structure
Content files SHALL remain human-readable, explicit, and stable (avoid opaque generic structures).

### R3. Type safety
Each content file shape SHALL have a corresponding TypeScript type/interface.

### R4. Load-boundary validation
Content SHOULD be validated at load boundaries to fail fast on malformed content.

### R5. No duplicate truth sources
The same user-facing text SHALL NOT be duplicated across content files and component internals.

### R6. Section ownership
Each section SHALL only consume its own typed content contract (or shared site-level content where appropriate).

### R7. Change friendliness
Common editorial changes (text, links, image refs, sponsor entries, contact links) SHALL require content-file edits rather than component rewrites.

## Validation checklist
- [ ] Required content files exist.
- [ ] Types map to each content file structure.
- [ ] Validation hooks exist at loader boundaries.
- [ ] Component code does not hardcode section copy.
- [ ] Editor-facing updates are localized to `/content`.
