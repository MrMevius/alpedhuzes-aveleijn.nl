# Proposal: Rebuild WordPress site as a code-first phase-1 landing page

## Summary
Replace the current WordPress implementation of `alpedhuzes-aveleijn.nl` with a maintainable, modular, code-first application that preserves phase-1 visual/content parity while improving architecture quality and long-term editability.

## Context
- Current site is WordPress-based and difficult to maintain for iterative vibecoding.
- Phase 1 requires a single-page landing page with modular sections.
- Runtime must be exactly one Docker container on port `8099`.
- Content must be stored in local files and not scattered through components.

## Goals
1. Build a full phase-1 replacement using React + TypeScript + Vite (frontend) and Express (backend) in one repo/container.
2. Keep section content editable via `/content` JSON files.
3. Preserve visible copy and structure (including current textual quirks) unless explicitly requested otherwise.
4. Implement dynamic donation/progress through internal API with server-side scrape aggregation.
5. Cache progress data for one hour and serve last known good value if scraping fails.
6. Keep all site-owned media local in `/public/assets`.

## Non-goals
- No WordPress runtime/theme/plugin logic.
- No contact form in phase 1.
- No database in phase 1.
- No speculative feature expansion beyond parity-oriented scope.

## Scope boundaries
In scope:
- Architecture, folder layout, content contracts, section modularization.
- Progress API behavior and resilience contract.
- Asset localization strategy.
- Docker single-container runtime strategy.

Out of scope for this change:
- Full implementation details of every section UI.
- Post-phase-1 feature additions.

## Acceptance mapping
- Architecture/folder structure and phased implementation: defined in `design.md` and `tasks.md`.
- Risk treatment: documented in `design.md`.
- Progress API constraints: documented in `specs/progress-api/spec.md`.
- Content and modularity constraints: documented in `specs/content-model/spec.md` and `specs/landing-page/spec.md`.

## Status
Proposed
