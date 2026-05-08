# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Project Is

A Salesforce Lightning Web Components (LWC) starter kit for prototyping and developing Salesforce UIs locally. It uses Vite as the build tool, SLDS (Salesforce Lightning Design System) v1 and v2, and Lightning Base Components. Synthetic Shadow DOM is enabled to match Salesforce platform behavior.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at http://localhost:3000 (auto-runs icon prebuild)
npm run build        # Production build to dist/
npm run preview      # Preview production bundle locally
npm run clean        # Remove dist, .vite, node_modules
```

There are no lint or test commands configured.

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
| `public/cosmos-theme.css` | **All visual styling** — backgrounds, borders, backdrop-filter, gradients, transparency overrides, light/dark color values, button/card/panel/datatable glass treatments | Global CSS can cross synthetic shadow boundaries to reach child component internals (`.global-header`, `.vertical-nav`, `.slds-card`, etc.) |
| `src/modules/shell/cosmosApp/cosmosApp.css` | **Layout only** — fixed positioning, z-index, dimensions, padding, transforms, transitions, CSS custom properties (`--cosmos-*`) | Scoped to the host component; never put visual glass properties here |

**Rules:**
- Never put `background`, `backdrop-filter`, `border` (visual), or color values in `cosmosApp.css` — they won't reach child components and will silently fail
- Never put layout/positioning rules in `cosmos-theme.css` — those are component-scoped concerns
- When comparing against the `cosmos-glass-theme` branch, `cosmos-theme.css` is the file to diff — it's the single source of truth for all glass visuals

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
