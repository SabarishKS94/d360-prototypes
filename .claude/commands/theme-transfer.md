---
name: theme-transfer
description: Transfer Cosmos theme from playground to target repo — export, generate, validate
---

# Theme Transfer Pipeline

Orchestrate the full theme transfer: export from playground → generate for target → validate.

## Arguments

- No args: full pipeline (export → generate → validate Tier 1 + 2)
- `--validate-only`: skip export/generate, just validate current state
- `--visual`: include Tier 3 visual regression
- `--profile=<name>`: override auto-detected target profile

## Hard Rules

1. Every CSS value written MUST trace to tokens.json or components.json — NEVER invent a value
2. Every selector MUST come from the target profile — NEVER invent a selector
3. NEVER modify files in the playground repo (theme.css, components.css, index.html, app.js)
4. On ANY ambiguity: STOP and ask the user, do not guess
5. On validation failure: REPORT the failure clearly, do not silently fix

## Pipeline Steps

### Step 1: Locate Playground

Check for the playground in this order:
1. `../theme-playground` (sister directory)
2. If not found, ask the user for the path

Verify it contains: `theme.css`, `components.css`, `scripts/export.mjs`, `package.json`

### Step 2: Run Export

```bash
cd <playground-path> && npm run export
```

Verify `dist/` contains:
- `tokens.json` — report token counts (shared, dark, light)
- `components.json` — report component count
- `ambient.css`

If export fails, STOP and report the error.

### Step 3: Detect Target Profile

Auto-detect based on current working directory:
- Has `vite.config.js` + `src/modules/` → use `lwc-slds`
- Has `package.json` with `react` dependency → use `react-generic`
- Otherwise → ask user which profile to use

### Step 4: Run Generate

```bash
cd <playground-path> && node scripts/generate.mjs --profile=<detected> --output=<target-delivery-path>
```

The output path comes from `profile.delivery.file` resolved against the target repo root.

Report:
- Generated file path and size
- Number of tokens and components included
- Any unmapped components (list them and ask user what to do):
  - "Create component" → invoke `lwc-new-component` skill
  - "Add mapping" → ask for the SLDS selector, update target profile
  - "Skip" → continue without this component

### Step 5: Run Validation

**Tier 1 (always):**
```bash
cd <target-repo> && node scripts/validate-tokens.mjs --tokens=<playground>/dist/tokens.json --css=<generated-file>
```

Report pass/fail. On failure, show exactly which tokens are missing or mismatched.

**Tier 2 (always, requires dev server):**
Check if dev server is running at the expected URL. If not, start it:
```bash
cd <target-repo> && npm run dev &
```
Wait for it to be ready, then run:
```bash
node scripts/validate-selectors.mjs --profile=<playground>/target-profiles/<profile>.json
```

Report coverage percentage and any misses. On misses:
- If optional: note as warning
- If required: ask user what to do:
  - "Create component with lwc-new-component" → invoke skill
  - "Skip for now"
  - "Investigate" → check what classes the target element actually has

**Tier 3 (only with --visual flag):**
```bash
node scripts/validate-visual.mjs --references=<playground>/dist/screenshots/ --routes=visual-test-routes.json
```

Show diffs for any failures. Ask user to accept or investigate.

### Step 6: Write Version File

After successful validation, write `.cosmos-theme-version` in the target repo:
```
<version from tokens.json>
```

### Step 7: Summary Report

```
Theme Transfer Complete
═══════════════════════
Source: <playground-path> (version X.Y.Z)
Target: <target-repo> (<profile-name>)
Output: <delivery-file>

Tokens:     XX/XX ✓
Selectors:  XX/XX (Y skipped)
Visual:     XX/XX ✓ (or "skipped")

Version written: .cosmos-theme-version = X.Y.Z
```
