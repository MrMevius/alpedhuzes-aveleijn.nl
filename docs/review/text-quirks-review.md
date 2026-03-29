# Text quirks review (do not silently rewrite)

This file tracks textual quirks observed on the source website that should be preserved in phase 1 unless explicitly approved to change.

## Confirmed quirks from source

1. **"Word sponor"** (hero CTA typo) — preserved in content.
2. Mixed currency formatting styles (e.g. `€ 1,50`, `€ 10,-`, `€500`, `< € 500`).
3. Sponsoring table contains repeated bullet content in one package row.
4. Inconsistent punctuation/spacing in several text blocks.
5. Footer line: **"Website door Tivius sponsored by N&M Consultancy"**.

## Current implementation notes

- The typo **"Word sponor"** is intentionally kept.
- Footer wording quirk is intentionally kept.
- Additional section copy still needs a full source-accurate content import pass; do not normalize wording during that pass unless explicitly requested.

## Change policy

When fixing any textual issue in future:
1. Record proposed correction in this file first.
2. Get explicit user approval.
3. Apply updates in content files only (not scattered JSX).
