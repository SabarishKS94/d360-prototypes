# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Project Is

A Salesforce Lightning Web Components (LWC) starter kit for prototyping and developing Salesforce UIs locally. It uses Vite as the build tool, SLDS (Salesforce Lightning Design System) v1 and v2, and Lightning Base Components. Synthetic Shadow DOM is enabled to match Salesforce platform behavior.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at http://localhost:4360 (auto-runs icon prebuild)
npm run build        # Production build to dist/
npm run preview      # Preview production bundle locally
npm run clean        # Remove dist, .vite, node_modules
npm run lint:arch    # Check architecture rules (namespace, CSS, labels)
```

## Architecture

### Component Namespaces

All LWC components live under `src/modules/` organized by namespace:

| Namespace | Tag Prefix | Purpose |
|-----------|------------|---------|
| `shell/`  | `shell-*`  | App chrome: header, nav, theme switcher |
| `page/`   | `page-*`   | Route-level views — one component per URL |
| `ui/`     | `ui-*`     | Reusable building blocks |
| `data/`   | (import)   | Plain JS modules (fixtures, helpers) — not LWC tags |

### Routing

- `src/routes.config.js` — single source of truth for all routes; add new routes here
- `src/router.js` — client-side History API router with path param support (`:id`)
- `shell/app` reads routes and dynamically renders the matching `page-*` component

### SLDS Theme System

- `src/build/slds-loader.js` handles stylesheet injection; SLDS 2 (Cosmos) is default, SLDS 1 loaded lazily
- Theme preferences (SLDS version, dark mode) stored in `localStorage`
- `shell/themeSwitcher` provides the UI toggle

### Cosmos Glass Theme — CSS Split

Two app shells exist: `shell/app` (standard) and `shell/cosmosApp` (glass). The glass theme CSS is split by responsibility:

| File | Owns | Reason |
|------|------|--------|
| `public/cosmos-theme.css` | **Semantic tokens** (`--cos-*`) + **SLDS/Lightning base component overrides** — targets `.slds-card`, `.slds-button_brand`, `.slds-modal__*`, etc. | Global CSS must cross synthetic shadow to reach child Lightning base component internals |
| `src/modules/shell/cosmosApp/cosmosApp.css` | **Layout + visual for `.cosmos-shell-*` elements** owned by this component | Component owns its own DOM; consumes `var(--cos-*)` tokens |
| Component CSS (`ui/glassToast`, `ui/planBuilder`, etc.) | **Visual + layout for classes they own** | Components consume `var(--cos-*)` tokens; no `body.cosmos-*` prefix needed |

**Rules:**
- SLDS/Lightning base component overrides go in `cosmos-theme.css` (global reach needed)
- Custom component classes go in their own CSS file, consuming `var(--cos-*)` tokens
- Never put layout/positioning rules in `cosmos-theme.css` — those are component-scoped concerns
- When comparing against the `cosmos-glass-theme` branch, `cosmos-theme.css` is the file to diff — it's the single source of truth for all glass visuals and token definitions

### Icon System

- `scripts/prebuild-icons.mjs` compiles 1,600+ SVGs into 4 pre-built JS modules at `src/build/generated/`
- This runs automatically before `dev` and `build`; do not edit generated files
- Four icon sets: `utility`, `standard`, `doctype`, `action`

### Entry Point

`src/index.js` must import `@lwc/synthetic-shadow` **before** any LWC imports. It then initializes SLDS and mounts `shell-app` to `#app`.

### Build Output

Production builds go to `dist/`.

## Key Conventions

**Component hierarchy (prefer in this order):**
1. Lightning Base Components (`lightning-button`, `lightning-card`, etc.)
2. SLDS utility classes
3. SLDS styling hooks (CSS custom properties)
4. Custom CSS as last resort

**Styling:**
- No `!important`
- No inline styles
- Do not add CSS that bleeds across component boundaries
- Use `lightning-layout` / `lightning-layout-item` for layout instead of custom flex/grid where possible

**Adding a new page:**
1. Create `src/modules/page/myPage/myPage.{html,js}`
2. Add an entry to `src/routes.config.js`
3. Add a nav entry in `shell/globalNav` if needed

## Theme System Reference

For detailed theme architecture rules (glass buttons, aurora background, brand system, CSS file responsibilities), see `.claude/commands/theme-audit.md`.

**Run `/theme-audit` before committing any changes that touch:**
- `public/cosmos-theme.css`
- `public/cosmos-brand-*.css`
- `src/modules/shell/cosmosApp/`
- `src/modules/shell/themeSwitcher/`
- `src/modules/ui/auroraBackground/`
- Any component that sets `background`, `backdrop-filter`, or body classes

## Synthetic Shadow DOM

Synthetic shadow is enabled in `vite.config.js` to mirror the Salesforce platform. This means:
- Global SLDS styles penetrate components (by design)
- To switch to native shadow: set `disableSyntheticShadowSupport: true` in `vite.config.js`

## Mandatory Skill Gates for LWC Work

These skills MUST be invoked before taking the associated action. Do not skip them or act first and check later.

| Trigger | Skill to invoke | When |
|---------|----------------|------|
| Creating any new component under `src/modules/` | `lwc-new-component:lwc-new-component` | Before creating any files |
| Writing or editing `.html`, `.css`, `.js` in `src/modules/` | `lwc-ui-checklist:lwc-ui-checklist` | Before writing any markup, styling, or logic |
| Editing `cosmos-theme.css`, `cosmosApp.css`, or brand CSS | `/theme-audit` | Before writing any change |
| Adding a new page or nav item | `add-nav-item:add-nav-item` | Before creating route or nav entry |

These gates exist to ensure SLDS compliance, correct LWC patterns, and theme architecture rules are applied from the start, not retrofitted after the fact.

## Responding to Hook Failures

When a PostToolUse hook exits non-zero (e.g., the lint architecture hook flags a violation):

1. **Do not ignore it.** The edit persisted but violates project rules.
2. **Ask the user** if they would like you to fix the violations the correct way. Present the specific violation and explain how to fix it (e.g., "Move this string to `data/labels/X.js` and use a binding").
3. **Do not silently re-attempt the same edit.** The user explicitly asked for the change — respect that intent while surfacing the conflict.
4. If the user says to proceed anyway, leave the violation in place — they own the decision.

## i18n-Ready Label Pattern

No hardcoded user-facing strings in component templates. All user-visible text must be imported from `src/modules/data/labels/<FeatureArea>.js`.

**Label module pattern:**
```javascript
// src/modules/data/labels/Contacts.js
export const PageTitle = 'Contacts';
export const SearchPlaceholder = 'Search contacts...';
```

**Component usage:**
```javascript
import { PageTitle, SearchPlaceholder } from 'data/labels/Contacts';
export default class PageContacts extends LightningElement {
    labels = { PageTitle, SearchPlaceholder };
}
```

**Template binding:**
```html
<h1>{labels.PageTitle}</h1>
<lightning-input label={labels.SearchPlaceholder}></lightning-input>
```

**Rules:**
- One file per page or feature area (`Home.js`, `Contacts.js`, `ChurnRateSegment.js`)
- Shared labels ("Cancel", "Save", "Close") go in `Common.js`
- Template binds via `{labels.MyLabel}`, never inline text
- Mirrors core's `@salesforce/label/` pattern — porting is a path swap
- The lint hook (`scripts/lint-architecture-rules.mjs`) warns on hardcoded strings in `title`, `label`, `placeholder`, `alternative-text`, `aria-label` attributes
