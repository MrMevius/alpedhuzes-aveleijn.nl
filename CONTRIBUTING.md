# Contributing

Thanks for contributing to this repository.

## Core principles

- Keep changes small, focused, and reviewable.
- Preserve the phase-1 architecture (single-page app + single Express runtime).
- Keep editable content in `content/` and avoid hardcoding copy in components.
- Keep site-owned assets local in `public/assets/`.

## Project constraints

- No WordPress runtime or plugin dependencies.
- No database introduction unless explicitly requested.
- No multi-container production split (single container on port `8099`).

## Preferred workflow

1. Create or use one active change spec in `opsx/changes/`.
2. Implement only agreed scope.
3. Run verification commands for changed areas.
4. Update the change spec with:
   - What changed
   - How to verify
   - Verification evidence
   - Current status

## Validation commands

Run before opening a PR:

```bash
npm run typecheck
npm run test
npm run build
```

## Coding conventions

- Frontend: React + TypeScript + CSS Modules
- Backend: Express + focused service modules
- Prefer explicit, readable code over abstractions
- Avoid broad refactors unless they unlock a concrete requirement

## Pull requests

- Explain the why (not only what changed).
- Include verification output (commands + outcome).
- Keep PR scope aligned with one change spec.
