# Data 360 — LWC starter (Vite + SLDS)

A **Data 360–aligned** app shell for **Lightning Web Components (LWC)** in the browser: vertical nav, data-app patterns, and SLDS 2, with **Vite** for a fast local loop. It exists so UX and product can explore **Data 360–style** flows without the full platform, while the DOM and design language stay close to what ships on Salesforce (synthetic shadow, Lightning base components, SLDS).

**In short:** use this to prototype the **D360** experience, test navigation and pages, and hand patterns to eng when the design is ready.

## Getting started (fork this repo)

This repository is meant to be **forked**, not used as a template. Forking keeps a link back to the upstream so you can pull shell, nav, theme, and architecture improvements as they land.

| If you are… | What to do |
|-------------|------------|
| **Starting a new prototype** | On GitHub: click **Fork** → choose your org/account → `git clone` your fork. Build your pages there. |
| **Pulling upstream updates** | In your fork on GitHub: click **Sync fork** → **Update branch**. Or locally: `git fetch upstream && git merge upstream/main`. |
| **Using soma only** | Fork from the **soma mirror** URL below, or add it as a second remote on your GitHub EMU fork. |
| **Maintaining the starter** | Push to the **upstream** repos below. |

**Why fork instead of template?** A fork keeps the “Sync fork” button on GitHub, so your team automatically sees when new shell features, lint rules, or architecture improvements are available — and can pull them in with one click. Template-generated repos are fully disconnected copies with no upstream link.

**Where this comes from** — The same LWC + Vite + SLDS “starter” pattern is used across Salesforce UI tooling; this repo is expanded for D360. **Deeper, generic notes** (routing table details, icon pipeline, synthetic shadow, full folder tree) live in [**`docs/technical-reference.md`**](docs/technical-reference.md). A larger app on the same pattern is **d360-qsl-ux-prototype** (internal).

## Who it’s for

- **Data 360** UX, PM, and partner teams that need a realistic shell without a scratch org.  
- **Internal teammates** with access to **git.soma** but not the GitHub EMU.  
- Engineers who want a **vibe-coded** starting point and will align later with the platform’s deployment model.

## Upstream source (fork from here)

| | URL |
|---|-----|
| **GitHub EMU (canonical — fork from here)** | [github.com/salesforce-ux-emu/data360-starter-kit](https://github.com/salesforce-ux-emu/data360-starter-kit) |
| **Soma mirror (partners without GitHub EMU)** | `https://git.soma.salesforce.com/dvora/d360-starter-template.git` |

After you fork and clone, run setup below. You **push only to your fork** (`origin`); the upstream remote is already configured by GitHub. **Maintainers** who publish the mirror to soma: [Maintainers (Soma mirror)](docs/setup-with-agent.md#maintainers-soma-mirror). The same file explains [using an agent after you clone *your* repo](docs/setup-with-agent.md).

## First-time setup

```bash
sh scripts/setup.sh
```

Checks **Node.js**, creates **`.env`** from **`.env.example`** when missing, runs **`npm install`**. Re-run any time.

**Or ask an agent:** copy the **base prompt** in [**`docs/setup-with-agent.md`**](docs/setup-with-agent.md) (Cursor, Claude Code, etc.) and have it run the same path.

> **QSL** (`d360-qsl-ux-prototype`) has a heftier `setup.sh` (Homebrew, `gh` to git.soma, Claude plugins). This starter keeps setup **portable** for anyone with Node.

## Day-to-day

```bash
npm run dev
```

Open **http://localhost:4360**.

```bash
npm run build
npm run preview
```

**Auth for local work** — `.env` (create via setup or from `.env.example`):

- **`VITE_AUTH_MODE=none`** — default: no Google login; a placeholder user in the header.  
- **`VITE_AUTH_MODE=salesforce` + `VITE_FIREBASE_*`** — real Firebase / Google for `@salesforce.com`.  
- **`VITE_REQUIRE_AUTH=false`** — same as `none` (legacy).

Change **`.env`**, then restart the dev server.

## Where the important files are

| Area | Path |
|------|------|
| Route table | `src/routes.config.js` — paths, `navPage` / `navHighlight`, titles |
| Router (navigate, current route) | `src/router.js` |
| App shell, route outlet | `src/modules/shell/app/` |
| Feature pages (add here) | `src/modules/page/` |
| Reusable LWC | `src/modules/ui/` |
| Data / auth / config modules | `src/data/` (e.g. `authMode.js`, `firebaseAuth.js`) |
| Apps / top-level nav (Data 360 apps) | `src/apps.config.js` |
| Vite + LWC | `vite.config.js` |

**Adding a page (high level):** new `src/modules/page/<name>/` → new row in `routes.config.js` → import in `app.js` `ROUTE_COMPONENTS`. Details: [**`docs/technical-reference.md`**](docs/technical-reference.md).

## Quality guardrails

This repo enforces patterns automatically so prototypes stay production-portable.

### Lint hooks (run automatically)

| Hook | What it checks | Blocking? |
|------|----------------|-----------|
| `lint-architecture-rules` | Namespace placement, CSS file responsibility, hardcoded labels, component completeness | Namespace = blocking; others = warnings |
| `lint-import-boundaries` | Namespace dependency rules (e.g., `ui/` can't import from `shell/`) | Blocking |

Both run as **PostToolUse hooks** in Claude Code (after every Write/Edit) and as a **pre-push git hook** (blocks pushes with violations). Install hooks manually if needed: `npm run install-hooks`.

### i18n-ready labels

User-facing strings live in `src/modules/data/labels/<FeatureArea>.js`, not hardcoded in templates. This mirrors core's `@salesforce/label/` — porting is a path swap.

```javascript
import { PageTitle } from 'data/labels/Contacts';
export default class PageContacts extends LightningElement {
    labels = { PageTitle };
}
```

### Claude Code skill gates

When using Claude Code, these skills fire automatically before specific actions:

| Action | Skill |
|--------|-------|
| New component | `lwc-new-component` |
| Edit UI markup/CSS/JS | `lwc-ui-checklist` |
| Edit theme CSS | `/theme-audit` |
| Add page or nav item | `add-nav-item` |

### Available lint commands

```bash
npm run lint:arch        # Architecture rules (namespace, CSS, labels)
npm run lint:boundaries  # Import dependency rules
```

## Theme Playground

A **zero-dependency** HTML/CSS sandbox for iterating on the Cosmos theme without the full LWC/Vite stack lives in its own repo:

**[salesforce-ux-emu/theme-playground](https://github.com/salesforce-ux-emu/theme-playground)**

Open `index.html` in a browser, tweak tokens live, and export the resulting CSS back into this codebase's `public/` override files.

## More documentation

| Doc | What |
|-----|------|
| [**`docs/technical-reference.md`**](docs/technical-reference.md) | Full LWC/Vite/SLDS project structure, routing, shadow DOM, icons, conventions, upstream links. |
| [**`docs/setup-with-agent.md`**](docs/setup-with-agent.md) | Agent copy-paste prompt, Soma + GitHub remotes. |
| [GitHub: `salesforce-ux-emu/data360-starter-kit`](https://github.com/salesforce-ux-emu/data360-starter-kit) | **Fork from here**, Issues, history. |
| [**Theme Playground**](https://github.com/salesforce-ux-emu/theme-playground) | Standalone theme sandbox — iterate on Cosmos tokens without the build pipeline. |
| [`.cursor/rules/`](.cursor/rules/) (if present) | SLDS / LWC / icons guidance for this workspace. |

---

**Disclaimer:** this template is for **prototyping and handoff**. How you deploy or embed real Data 360 and Salesforce follows your org’s process; that’s not prescribed here.
