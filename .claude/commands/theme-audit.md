# Theme Audit & Fix

Audit the current working tree for theme/styling violations and fix them automatically.

## Context: Theme Architecture

This project has a dual-shell architecture with a strict CSS responsibility split.

### Shell Modes

Two app shells exist, selected via `localStorage.getItem('shell-mode')`:
- `shell/app` — Standard SLDS shell (no glass effects)
- `shell/cosmosApp` — Glass theme shell (frosted glass, aurora background, glow buttons)

### Theme Switching

Theme is stored in `localStorage` key `slds-ui-theme`. Valid values:
- `light` — Standard light (used with shell/app)
- `dark` — Standard dark (used with shell/app)
- `cosmos-light` — Glass light (used with shell/cosmosApp)
- `cosmos-dark` — Glass dark (used with shell/cosmosApp)

Body classes applied:
- `light` → no class
- `dark` → `slds-color-scheme_dark`
- `cosmos-light` → `cosmos-light` (on body AND host element)
- `cosmos-dark` → `slds-color-scheme_dark cosmos-dark` (on body AND host element)

### CSS File Responsibilities

| File | Owns | Never Put Here |
|------|------|----------------|
| `public/cosmos-theme.css` | ALL visual styling: backgrounds, borders, backdrop-filter, gradients, colors, button treatments, card/panel glass | Layout, positioning, z-index, dimensions |
| `src/modules/shell/cosmosApp/cosmosApp.css` | Layout ONLY: fixed positioning, z-index, dimensions, padding, transforms, transitions, CSS custom properties (`--cosmos-*`) | background, backdrop-filter, border (visual), color values |
| `public/cosmos-brand-*.css` | Brand-specific overrides (colors, gradients) scoped under `body.brand-*` | Base theme styles |

### Button Contract

Cosmos buttons use translucent glass with glow-on-hover. They must NEVER be flat solid colors.

Pattern (dark):
```css
body.cosmos-dark .slds-button.slds-button_brand {
    background-color: rgba(R, G, B, 0.15-0.25);
    border: 1px solid rgba(R, G, B, 0.25-0.35);
    border-radius: 24px;
    backdrop-filter: blur(20px);
    box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.20), 0 4px 16px -2px rgba(0,0,0,0.20);
}
/* Hover adds glow: */
body.cosmos-dark .slds-button.slds-button_brand:hover {
    box-shadow: ..., 0 0 35px 0 rgba(R, G, B, 0.50);
}
```

### Brand System

- Config: `src/modules/data/brands/brands.js`
- Brands apply via body class (`brand-burgerking`) + dynamic CSS file load
- Brand CSS files live at `public/cosmos-brand-*.css`
- Adding a brand: add entry to `brands.js`, create matching CSS file

### Aurora Background

- Component: `src/modules/ui/auroraBackground/`
- Rendered in `cosmosApp.html` with `is-active="true"` — always on in cosmos mode
- Accepts `brand` property for brand-aware colors
- Has a voice toggle button (user can deactivate)
- This is NOT a separate theme variant — it's part of base cosmos

## Audit Steps

Run these checks on the current diff/working tree. For each violation found, explain it and fix it.

### 1. Visual styles in wrong file

Search `src/modules/shell/cosmosApp/cosmosApp.css` for:
- `background` (except `transparent`)
- `backdrop-filter`
- `border-color`, `border:` with color values
- Color values (hex, rgb, rgba, hsl)
- `box-shadow` with color values

These belong in `public/cosmos-theme.css` instead.

### 2. Layout in theme file

Search `public/cosmos-theme.css` for:
- `position: fixed/absolute/relative`
- `z-index`
- `width:`, `height:`, `top:`, `left:`, `right:`, `bottom:`
- `margin:`, `padding:` (layout-related)
- `transform:` (for positioning, not visual effects)

Exception: `border-radius` is visual and belongs here.

### 3. Flat solid buttons in cosmos

Search for cosmos button rules that use solid backgrounds:
```
grep -n "cosmos.*slds-button.*background:\s*#" public/cosmos-theme.css
```
These should be translucent rgba() with backdrop-filter and glow box-shadow on hover.

### 4. Inline styles in index.html

Check `index.html` for any `<style>` blocks with cosmos-specific overrides:
```
grep -n "cosmos-light\|cosmos-dark" index.html
```
All cosmos visuals must live in `public/cosmos-theme.css`, not inline.

### 5. Theme class manipulation outside shell components

Only `shell/app/app.js` and `shell/cosmosApp/cosmosApp.js` should modify body classes for theming. Search for:
```
grep -rn "classList.*cosmos\|classList.*slds-color-scheme" src/modules/ --include="*.js"
```
Flag anything outside the two shell app files.

### 6. Brand CSS scoping

Check `public/cosmos-brand-*.css` files — all rules must be scoped under `body.brand-*`:
```
grep -n "^[^/]" public/cosmos-brand-*.css | grep -v "body\.brand"
```

### 7. Missing dark/light pairing

For any new cosmos style, check that both `cosmos-dark` and `cosmos-light` variants exist:
```
grep -c "cosmos-dark" public/cosmos-theme.css
grep -c "cosmos-light" public/cosmos-theme.css
```
If counts differ significantly, identify the missing rules.

### 8. Shell-mode awareness in new components

If new page or UI components have been added, verify they don't hard-code backgrounds that would conflict with the glass theme. Components should use `transparent` or SLDS tokens, not solid colors.

## Output

After running all checks:
1. List violations found (if any)
2. Apply fixes automatically
3. Summarize what was changed

If no violations found, report "Theme audit passed — no issues found."
