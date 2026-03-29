# Title
Create repository AGENTS.md with build/test/lint commands and coding conventions

# Context
The repository currently contains only a minimal `README.md` and no local `AGENTS.md` guidance file.
Agentic coding tools need a project-local instruction file to operate safely and consistently.

# Goals / Non-goals
## Goals
- Add a root-level `AGENTS.md` tailored to this repository state.
- Document practical build/lint/test command guidance, especially single-test execution patterns.
- Document coding style conventions (imports, formatting, types, naming, error handling, etc.).
- Check for Cursor and Copilot rule files and include their guidance if present.

## Non-goals
- Add application code or project tooling not currently present.
- Invent repository-specific commands that are not discoverable from the repo.
- Configure CI/CD, linters, or test frameworks.

# Proposed approach
1. Inspect repository files to identify existing tooling and instruction files.
2. Draft `AGENTS.md` with:
   - Command discovery workflow and safe fallback command matrix by ecosystem.
   - Single-test command examples for common frameworks.
   - Language-agnostic style standards usable by agents.
   - Explicit section on Cursor/Copilot rules status.
3. Keep the document approximately 150 lines and actionable for agent workflows.

# Implementation steps (ordered)
1. Discover existing guidance/tooling files (`AGENTS.md`, Cursor, Copilot, manifests).
2. Create new `AGENTS.md` in repository root.
3. Verify document length and clarity.
4. Update this spec with final status and verification evidence.

# Acceptance criteria
1. A root-level `AGENTS.md` exists in `/home/mevius/alpedhuzes-aveleijn.nl`.
2. The file includes build/lint/test command guidance, with explicit single-test patterns.
3. The file includes code style guidelines covering imports, formatting, types, naming, and error handling.
4. If Cursor/Copilot rules exist, their guidance is captured; if absent, this is clearly stated.
5. The document is about 150 lines long.

# Testing plan
- Structural validation only:
  - Confirm file exists.
  - Confirm required sections exist by reading file contents.
  - Confirm approximate line count.

# Risk + rollback plan
## Risks
- Overly prescriptive guidance could conflict with future tooling.
- Generic commands may be misapplied if agents do not verify project manifests first.

## Rollback
- Revert `AGENTS.md` if guidance is unsuitable.
- Replace with repo-specific rules once tooling is introduced.

# Notes / links
- User request: create/improve `/home/mevius/alpedhuzes-aveleijn.nl/AGENTS.md` for agentic coding agents.

# Current status
Completed

# What changed
- Created root-level `AGENTS.md` tailored to the current minimal repository state.
- Added a mandatory plan-first workflow section that explicitly requires asking multiple MC clarifying questions during planning.
- Added command discovery instructions and fallback build/lint/test matrices across common ecosystems.
- Included explicit single-test command examples for Jest, Vitest, pytest, PHPUnit, Go, Rust, Gradle/Maven, and .NET.
- Added code style guidance sections for imports/dependencies, formatting, types/interfaces, naming, error handling/logging, and testing expectations.
- Added Cursor/Copilot integration status with explicit "not found" entries for `.cursor/rules/`, `.cursorrules`, and `.github/copilot-instructions.md`.

# How to verify
1. Confirm `AGENTS.md` exists at repository root.
2. Read `AGENTS.md` and check required sections.
3. Count lines to ensure approximately 150 lines.

# Verification evidence
- Verified repository contents: only `README.md` + `.git` metadata, no manifests/toolchain files detected.
- Verified rule-file discovery:
  - `**/.cursor/rules/**` → no files found
  - `**/.cursorrules` → no files found
  - `**/.github/copilot-instructions.md` → no files found
- Verified `AGENTS.md` exists at `/home/mevius/alpedhuzes-aveleijn.nl/AGENTS.md`.
- Verified `AGENTS.md` content includes:
  - build/lint/test command guidance,
  - single-test command examples,
  - code style guidelines,
  - Cursor/Copilot status section,
  - planning guidance requiring multiple MC questions.
- Verified line count from file read output: total `171` lines (within "about 150 lines").
- No runtime tests/lint executed because this is a documentation-only change and no project toolchain is present.
