# Cosmos Theme Playground

Zero-dependency, single-folder theme sandbox. No LWC, no Vite, no shadow DOM.
Mirrors the actual branch styles — dark (flat solid buttons) and light (raised indigo buttons).

## Usage

```bash
npx serve .
# or
python3 -m http.server 8080
# or just open index.html directly in a browser
```

## What's included

All components from the actual codebase theme:

- **Global Shell** — fixed header with search, context bar
- **Vertical Nav** — sidebar with group headers, footer
- **Buttons** — brand, success, destructive, neutral (dark=flat, light=raised 3D)
- **Cards** — glass surface with header/body
- **Badges** — success, warning, error, default
- **Toast Notifications** — all 4 variants with glass treatment
- **Inputs** — text, pill/search, select
- **Dropdown** — glass menu with hover states
- **Datepicker** — calendar grid with today/selected states
- **Data Table** — header/row glass layering
- **Modal** — header/content/footer per-section glass

## Workflow

1. Open in browser
2. Click 🎨 to open the token editor panel
3. Click ◐ to toggle dark/light
4. Tweak any token → changes apply instantly
5. Press `⌘E` to export current tokens to clipboard
6. Paste into the override CSS files in the main repo

## Files

| File | Purpose |
|------|---------|
| `theme.css` | All design tokens (dark + light) + ambient background |
| `components.css` | Every component style, consuming tokens |
| `app.js` | Interactions + live token editor |
| `index.html` | Full component showcase |

## Spinning off as its own repo

```bash
cp -r theme-playground/ ../cosmos-theme-playground
cd ../cosmos-theme-playground
git init && git add . && git commit -m "init: cosmos theme playground"
```
