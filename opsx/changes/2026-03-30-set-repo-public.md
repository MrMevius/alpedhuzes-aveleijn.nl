# Title
Set GitHub repository visibility to public

# Context
User requested to proceed with making this repository public after a risk check.

# Goals / Non-goals
## Goals
- Change repository visibility from private to public on GitHub.
- Verify resulting visibility state via GitHub CLI.
- Document exact command and evidence.

## Non-goals
- No source code changes.
- No infrastructure/runtime changes.
- No branch protection or permissions policy redesign.

# Proposed approach
1. Use `gh repo edit` with visibility flags to switch to public.
2. Verify with `gh repo view --json visibility,isPrivate,url,nameWithOwner`.
3. Record outcomes in this change spec.

# Implementation steps (ordered)
1. Create this change spec.
2. Run repository visibility update command.
3. Verify visibility via GitHub CLI.
4. Update this spec with What changed, How to verify, Verification evidence, and Current status.

# Acceptance criteria
1. Repo `MrMevius/alpedhuzes-aveleijn.nl` visibility is `PUBLIC`.
2. Verification output confirms `isPrivate: false`.
3. Spec includes verification commands/evidence and is marked completed.

# Testing plan
- Operational change; verify via GitHub API/CLI output.

# Risk + rollback plan
## Risks
- Repository content becomes publicly visible immediately.

## Rollback
- Set visibility back to private using GitHub settings or `gh repo edit --visibility private`.

# Notes / links
- Repo URL: `https://github.com/MrMevius/alpedhuzes-aveleijn.nl`

# Current status
Completed

# What changed
- Executed GitHub CLI command to change visibility:
  - `gh repo edit MrMevius/alpedhuzes-aveleijn.nl --visibility public`
- Verified resulting state with:
  - `gh repo view MrMevius/alpedhuzes-aveleijn.nl --json visibility,isPrivate,url,nameWithOwner`

# How to verify
1. Run:
   - `gh repo view MrMevius/alpedhuzes-aveleijn.nl --json visibility,isPrivate,url,nameWithOwner`
2. Confirm:
   - `visibility` is `PUBLIC`
   - `isPrivate` is `false`

# Verification evidence
- `gh repo edit MrMevius/alpedhuzes-aveleijn.nl --visibility public` executed successfully (no error output).
- Verification output:
  - `{"isPrivate":false,"nameWithOwner":"MrMevius/alpedhuzes-aveleijn.nl","url":"https://github.com/MrMevius/alpedhuzes-aveleijn.nl","visibility":"PUBLIC"}`
