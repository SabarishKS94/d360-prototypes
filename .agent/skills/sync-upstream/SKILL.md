---
name: sync-upstream
version: "1.0.0"
description: "Check the upstream design-system-2-starter-kit repo for new commits and guide the user through incorporating them. Use when the user asks about syncing with upstream, checking for new upstream changes, or wants to pull in improvements from the starter kit."
---

# Sync Upstream

Compare our codebase against the upstream design-system-2-starter-kit and guide incorporation of new changes.

## Tone

**Important:** The user may not be technical. Always use the correct technical term but immediately follow it with a plain-language explanation in parentheses, e.g. "cherry-pick (copy a specific commit into our branch)" or "merge base (the point where our code and upstream last matched)". Do this every time, not just the first mention.

## Steps

### 1. Verify the upstream remote exists

```bash
git remote get-url upstream
```

If it doesn't exist, add it:
```bash
git remote add upstream https://git.soma.salesforce.com/a-guevara/design-system-2-starter-kit.git
```

### 2. Run the upstream check script

```bash
node scripts/check-upstream.mjs
```

This fetches the latest upstream commits and compares them against `.upstream-synced.json` (a tracked file listing commit hashes we've already reviewed/incorporated). It reports:
- How many new commits exist upstream
- Which ones we've already synced
- Which ones are pending review

After incorporating a commit, mark it as synced:
```bash
node scripts/check-upstream.mjs --mark <hash>
```

Or after a bulk sync session, mark all current commits:
```bash
node scripts/check-upstream.mjs --mark-all
```

### 3. Categorize pending commits

For each pending commit, categorize it:

| Category | Action |
|----------|--------|
| **Direct apply** | Change is additive, no conflicts expected — cherry-pick directly |
| **Adapt** | Change touches files we've modified — needs manual adaptation |
| **Skip** | Change is irrelevant or superseded by our own work |
| **Investigate** | Not sure — need to inspect the diff |

Show the user a table with your categorization and reasoning.

### 4. Create branches and PRs

For each commit (or group of related commits) worth incorporating:

1. Create a branch from main: `git checkout -b upstream/<short-description> main`
2. Cherry-pick or manually apply the change
3. Verify it builds: `npm run build`
4. Push to soma: `git push soma upstream/<short-description>`
5. Create a PR: `GH_HOST=git.soma.salesforce.com gh pr create --repo dvora/d360-starter-template ...`

### 5. Report

Summarize what was done:
- PRs created (with links)
- Commits skipped (with reasons)
- Any conflicts that need manual resolution

## Automation

For periodic checks without manual intervention, the user can run:
```bash
node scripts/check-upstream.mjs --json
```

This outputs machine-readable JSON suitable for a CI job or GitHub Action that posts new-commit notifications.
