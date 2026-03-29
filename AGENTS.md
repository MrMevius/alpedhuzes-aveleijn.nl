# AGENTS.md
## Purpose
This repository contains the code-first rebuild of the Alpe d'HuZes Aveleijn website. The objective is to replace the current WordPress site with a maintainable, modular, single-container application. Agents must optimize for clarity, maintainability, safe iteration, and clean handoff. Visual similarity matters, but architecture quality comes first. Prefer small, reversible changes over large speculative rewrites.

## Product goals
Deliver a full working replacement of the current website.
Keep the site as a single-page landing page in phase 1.
Preserve current content and structure unless explicitly asked to change it.
Keep content easy to edit through files rather than scattered code changes.
Make each major section independently understandable and independently editable.
Run the entire application in exactly one Docker container on port 8099.

## Mandatory stack
Frontend: React + TypeScript + Vite.
Backend: Node.js + Express.
Styling: CSS Modules per section or component.
Global styling: minimal reset, tokens, layout primitives only.
Content source: local files under `/content`.
Assets: local files under `/public/assets`.
Runtime: single container.
No WordPress runtime, theme logic, or plugin dependencies.

## Hard rules
Do not introduce WordPress as a dependency.
Do not split the application into multiple deployable containers.
Do not add a database in phase 1 unless explicitly requested.
Do not hotlink site-owned images, logos, or media.
Do not silently rewrite user-facing content.
Do not invent missing content unless explicitly asked.
Do not create hidden coupling between sections.
Do not hardcode structured content into JSX when it belongs in `/content`.
Do not mix backend scraping logic into frontend components.
Do not use over-abstracted architecture for a small website.

## Working style
Make small, reviewable changes.
Keep diffs easy to understand.
Prefer explicit code over clever code.
Prefer boring technology over novel technology.
Choose the simplest valid approach that preserves flexibility.
Avoid broad refactors unless they unlock a concrete requirement.
Do not rename files or folders without a strong reason.
Preserve working behavior while iterating.

## Planning
For non-trivial tasks, think in phases before editing files.
When OpenSpec is available, keep proposal, design, specs, and tasks aligned with implementation.
Before a large change, identify which files will likely be touched.
Prefer section-by-section implementation over app-wide rewrites.
Call out risks early if scraping, asset migration, or visual parity may break.
If a request conflicts with these rules, choose the safest compliant path and explain the tradeoff.

## Repository structure
Use a content-driven architecture and keep source code and content clearly separated.
Default structure:
`/src/app`
`/src/components`
`/src/sections`
`/src/lib`
`/src/types`
`/src/styles`
`/server`
`/content`
`/public/assets`
`/tests`
Do not create deep nesting without clear benefit.
Keep section code under `/src/sections`, reusable UI under `/src/components`, and server-only code under `/server`.

## Section modularity
Treat each homepage section as an isolated module.
Each section should have a dedicated component, a dedicated CSS Module when styling is non-trivial, a typed content shape, and minimal knowledge of other sections.
Phase 1 sections: Hero, Progress, About, Funding, Actions, Gallery, Sponsoring, Sponsors, Contact, Footer.
A section may render shared primitives, but must not depend on internal state from another section.
Avoid cross-section imports unless they are simple shared presentational components.
Do not let one section read another section's raw content file directly.

## Content rules
Store editable content in `/content`.
Prefer one content file per logical section.
Recommended files:
`/content/site.json`
`/content/sections/hero.json`
`/content/sections/progress.json`
`/content/sections/about.json`
`/content/sections/actions.json`
`/content/sections/gallery.json`
`/content/sections/sponsoring.json`
`/content/sections/sponsors.json`
`/content/sections/contact.json`
Content files must be human-readable.
Keep schemas simple and stable.
Prefer explicit fields over generic arrays of unknown shape.
Add TypeScript types for every content structure.
Validate content at load boundaries where practical.
Do not duplicate the same text in both content files and components.

## Asset rules
All site-owned assets must be local.
Store assets under `/public/assets`, preferably in `/images`, `/gallery`, and `/logos`.
Use descriptive filenames when possible.
Do not leave production code depending on remote WordPress media URLs.
Remote third-party URLs are acceptable only if explicitly approved and clearly intentional.
When migrating assets, preserve quality and verify paths.
If an asset is missing, fail gracefully and note it in the audit output.

## Styling rules
Prefer CSS Modules for section-level styling.
Keep global CSS minimal.
Use global styles only for reset, tokens, base typography, layout helpers, and truly generic utilities.
Do not dump page-specific CSS into a single global stylesheet.
Do not use inline styles unless there is a strong reason.
Keep spacing, radius, colors, shadows, and typography driven by shared tokens where reasonable.
Aim for clean responsive behavior on desktop, tablet, and mobile.
Favor maintainable CSS over pixel-perfect hacks.

## Backend and API rules
The backend exists to serve the frontend, provide health checks, and expose the progress API.
Required endpoints: `GET /api/health` and `GET /api/progress`.
Keep backend responsibilities narrow.
Do not turn the Express server into a general CMS.
Keep scraper logic isolated from route handlers.
Prefer service modules such as `/server/services/progressService.ts` and `/server/services/fundraiserScraper.ts`.

## Progress API rules
The progress section must aggregate fundraising totals from the approved source pages.
Scraping must happen server-side.
Cache results for one hour.
If refresh fails, keep serving the last known good value.
Never let a scrape failure break the homepage.
Return structured metadata with the progress response.
Keep the fundraising goal in local content or config, not embedded in scraper logic.
Write parsing defensively because third-party HTML can change.

## Testing rules
Add tests when behavior is fragile, repetitive, or easy to regress.
At minimum, cover scraping and parsing logic with fixtures.
Prefer small unit tests over heavy end-to-end setups in phase 1.
If you fix a bug in parsing or formatting, add or update a test for it.

## Docker and runtime rules
The application must run in one container.
Port 8099 is mandatory.
Use a multi-stage Docker build.
The final image should include everything needed to run the site.
Do not require extra sidecars or local services in production.
Keep environment configuration minimal and documented.
Add a healthcheck when practical.

## Performance, accessibility, and resilience
This is a small content site. Prefer simple performance wins over complex optimization. Optimize images sensibly. Avoid unnecessary client-side state. Prefer server caching over repeated third-party fetches. Load the page fast even if the progress API is stale. Graceful degradation is better than failure.
Use semantic HTML wherever practical. Use real headings in a logical order. Ensure images have meaningful alt text when appropriate. Buttons and links must be clearly distinguishable. Keep tables accessible and responsive. Do not sacrifice readability for visual effects.

## Change control
When implementing a feature, state what phase or goal it belongs to.
When a request is out of scope for phase 1, implement only the safe foundation unless asked otherwise.
Record intentional deviations from the source site in an audit or parity checklist.
Keep README current when commands, structure, or runtime behavior changes.
Do not leave half-migrated patterns in the codebase.

## Definition of done
A task is not done unless the code remains modular, readable, and easy to extend.
A feature is not done if content is still scattered across components.
A section is not done if it cannot be edited without hunting through unrelated files.
A scraping task is not done if stale fallback is missing.
A migration task is not done if remote site-owned assets remain in active use without approval.

## Mindset
Think like a careful maintainer, not a one-shot generator.
Preserve momentum, but do not rush architecture decisions.
Choose the clearest path that an engineer can understand a month later and build the website so future changes feel local, safe, and predictable.
