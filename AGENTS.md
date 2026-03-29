# AGENTS.md

Repository guidance for agentic coding agents operating in this repo.

## 1) Current repository reality
- Repository currently appears minimal (`README.md` only, plus git metadata).
- No app runtime, package manager manifest, test framework, linter config, or formatter config was found.
- No Cursor rules were found in `.cursor/rules/` and no `.cursorrules` file was found.
- No Copilot rules were found in `.github/copilot-instructions.md`.
- Therefore, all command guidance below is **discovery-first** and ecosystem-specific fallback guidance.

## 2) Operating mode: plan first, then build
- Always begin with a brief plan.
- Before implementing, ask clarifying questions when requirements are ambiguous.
- **When planning, ask multiple multiple-choice (MC) questions** to reduce ambiguity.
- Ask the most decision-shaping questions first (scope, constraints, acceptance criteria, risk tolerance).
- Confirm assumptions explicitly before coding.

### Recommended MC-question pattern
Use at least 2-4 MC questions when requests are underspecified.

Example MC topics:
1. Scope: `Minimal fix` / `Full feature` / `Refactor + feature`.
2. Risk preference: `Safe incremental` / `Balanced` / `Fastest delivery`.
3. Validation depth: `Changed files only` / `Targeted suite` / `Full suite`.
4. Backward compatibility: `Strict` / `Best effort` / `Not required`.

## 3) Command discovery workflow (mandatory)
Before running build/lint/test commands:
1. Detect project type via manifests/configs.
2. Prefer repository-defined scripts over framework defaults.
3. Use targeted/single-test commands before full-suite commands.
4. If multiple frameworks are present, ask user which one is authoritative.

Common manifest detection checklist:
- Node: `package.json`, `pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`
- Python: `pyproject.toml`, `poetry.lock`, `requirements.txt`, `pytest.ini`
- PHP: `composer.json`, `phpunit.xml*`
- Go: `go.mod`
- Rust: `Cargo.toml`
- Java/Kotlin: `pom.xml`, `build.gradle*`
- .NET: `*.sln`, `*.csproj`

## 4) Build / lint / test command guidance
Because this repo has no detected toolchain yet, use this fallback matrix only after checking manifests.

### Node.js (npm/pnpm/yarn)
- Install deps:
  - `npm ci` | `pnpm install --frozen-lockfile` | `yarn install --frozen-lockfile`
- Build:
  - `npm run build`
- Lint:
  - `npm run lint`
- Test (all):
  - `npm test` or `npm run test`
- Single test:
  - Jest: `npx jest path/to/file.test.ts -t "test name"`
  - Vitest: `npx vitest run path/to/file.test.ts -t "test name"`
  - Via npm script passthrough: `npm test -- path/to/file.test.ts -t "test name"`

### Python
- Install deps (examples):
  - `pip install -r requirements.txt`
  - `poetry install`
- Lint:
  - `ruff check .` or `flake8`
- Format check:
  - `black --check .`
- Test (all):
  - `pytest`
- Single test:
  - File: `pytest tests/test_module.py`
  - Test case: `pytest tests/test_module.py::TestClass::test_name`
  - Pattern: `pytest -k "name_fragment"`

### PHP
- Install deps: `composer install`
- Lint (if configured): `composer run lint`
- Test (all): `vendor/bin/phpunit`
- Single test:
  - File: `vendor/bin/phpunit tests/Feature/ExampleTest.php`
  - Filter: `vendor/bin/phpunit --filter testMethodName`

### Go
- Build: `go build ./...`
- Lint: `golangci-lint run` (if configured)
- Test (all): `go test ./...`
- Single test:
  - Package: `go test ./path/to/package`
  - Single test name: `go test ./... -run TestName`

### Rust
- Build: `cargo build`
- Lint: `cargo clippy --all-targets --all-features -D warnings`
- Test (all): `cargo test`
- Single test:
  - Name filter: `cargo test test_name_fragment`
  - Specific test target: `cargo test --test integration_test_name`

### Java/Kotlin
- Gradle build/test: `./gradlew build`, `./gradlew test`
- Single test (Gradle): `./gradlew test --tests "com.example.ClassName.testMethod"`
- Maven build/test: `mvn -q verify`, `mvn -q test`
- Single test (Maven): `mvn -Dtest=ClassName#testMethod test`

### .NET
- Build: `dotnet build`
- Test (all): `dotnet test`
- Single test:
  - `dotnet test --filter "FullyQualifiedName~Namespace.Class.Method"`

## 5) Code style guidelines (default when repo-specific rules are absent)

### Imports and dependencies
- Prefer absolute/aliased imports if already established; otherwise stay consistent with local file patterns.
- Keep imports grouped: standard library, third-party, internal.
- Remove unused imports.
- Avoid introducing new dependencies unless justified in the change spec.

### Formatting
- Respect existing formatter/linter config if present.
- Do not reformat unrelated files.
- Keep diffs minimal and scoped to requested changes.
- Preserve line endings and encoding already used by the repository.

### Types and interfaces
- Prefer explicit types at module boundaries (public functions, APIs, exported members).
- Avoid `any`/untyped fallbacks unless unavoidable; document why if used.
- Model nullable/optional states explicitly.
- Keep data contracts centralized and reused.

### Naming conventions
- Use descriptive, intention-revealing names.
- Follow language conventions (e.g., `camelCase` variables/functions in JS/TS, `PascalCase` types/classes, `snake_case` in Python).
- Suffix test doubles and fixtures clearly (`Mock`, `Stub`, `Fixture`).
- Avoid abbreviations unless domain-standard.

### Error handling and logging
- Fail fast on invalid input at boundaries.
- Do not swallow exceptions/errors silently.
- Return/raise typed or structured errors where possible.
- Log actionable context; never log secrets/tokens/PII.
- Keep user-facing messages clear; keep internal diagnostics detailed.

### Testing expectations
- Add or update tests for behavior changes when a test framework exists.
- Prefer deterministic tests (no time/network randomness without controls).
- Start with the narrowest relevant tests, then broaden as needed.
- For bug fixes, include a test that fails before and passes after when feasible.

## 6) Cursor and Copilot rules integration status
- `.cursor/rules/`: not found
- `.cursorrules`: not found
- `.github/copilot-instructions.md`: not found

If any of these files are added later, update this AGENTS.md to incorporate their rules and precedence.

## 7) PR/change hygiene for agents
- Keep commits focused and atomic.
- Summarize the "why" in commit messages and PR descriptions.
- Document verification commands and outcomes.
- Call out risks, assumptions, and follow-ups explicitly.

## 8) Quick-start checklist for future agents
1. Read this `AGENTS.md`.
2. Identify manifests/toolchain.
3. Ask MC clarifying questions if ambiguity remains.
4. Confirm acceptance criteria.
5. Implement minimal scoped changes.
6. Run targeted tests/lint.
7. Report what changed + how to verify.
