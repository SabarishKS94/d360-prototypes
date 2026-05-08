# Data 360 — LWC starter (Vite + SLDS)

A **Data 360–aligned** app shell for **Lightning Web Components (LWC)** in the browser: vertical nav, data-app patterns, and SLDS 2, with **Vite** for a fast local loop. It exists so UX and product can explore **Data 360–style** flows without the full platform, while the DOM and design language stay close to what ships on Salesforce (synthetic shadow, Lightning base components, SLDS).

**In short:** use this to prototype the **D360** experience, test navigation and pages, and hand patterns to eng when the design is ready.

## GitHub template (how you’re expected to use this)

This repository is a **source template** on GitHub. For a real project, use **Use this template** to create *your* repository, then build there. **Changes to the starter itself** are made by the maintainers in the upstream repo; most people **do not** push app work here — they work in their own repo and can **pull** or cherry-pick from upstream when they want updates.

| If you are… | What to do |
|-------------|------------|
| **Starting a new prototype** | On GitHub: **Use this template** → create *your* repo (your org, your name) → `git clone` **that** URL. Rename and customize inside your copy. |
| **Using soma only** | Create the repo from the template on **GitHub EMU** first (or get a copy from the soma mirror), then work from your own remote on soma if your team standardizes on that. |
| **Maintaining the starter** | Commit and push to the **upstream** repos below; keep **Template repository** enabled in GitHub repo **Settings → General** so the green **Use this template** button stays available. |

**Where this comes from** — The same LWC + Vite + SLDS “starter” pattern is used across Salesforce UI tooling; this repo is expanded for D360. **Deeper, generic notes** (routing table details, icon pipeline, synthetic shadow, full folder tree) live in [**`docs/technical-reference.md`**](docs/technical-reference.md). A larger app on the same pattern is **d360-qsl-ux-prototype** (internal).

## Who it’s for

- **Data 360** UX, PM, and partner teams that need a realistic shell without a scratch org.  
- **Internal teammates** with access to **git.soma** but not the GitHub EMU.  
- Engineers who want a **vibe-coded** starting point and will align later with the platform’s deployment model.

## Upstream source (for “Use this template” and soma)

These URLs point at the **maintained** starter, not at your project after you template it.

| | URL |
|---|-----|
| **GitHub EMU (canonical: create new repos with “Use this template”)** | [github.com/salesforce-ux-emu/data360-starter-kit](https://github.com/salesforce-ux-emu/data360-starter-kit) |
| **Soma mirror (partners without GitHub EMU; maintainer push)** | `https://git.soma.salesforce.com/dvora/d360-starter-template.git` |

After you **Use this template** and name your app, clone **your** repository’s URL, then run setup below. You **push only to your repo** (`origin`); you do not need a `soma` remote for normal work. To **merge improvements from upstream** later, add a `remote` and `pull` / cherry-pick as you prefer. **Maintainers** who publish the mirror to soma: [Maintainers (Soma mirror)](docs/setup-with-agent.md#maintainers-soma-mirror). The same file explains [using an agent after you clone *your* repo](docs/setup-with-agent.md).

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

Open **http://localhost:3000**.

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

## Theme Playground

A **zero-dependency** HTML/CSS sandbox for iterating on the Cosmos theme without the full LWC/Vite stack lives in its own repo:

**[salesforce-ux-emu/theme-playground](https://github.com/salesforce-ux-emu/theme-playground)**

Open `index.html` in a browser, tweak tokens live, and export the resulting CSS back into this codebase's `public/` override files.

## More documentation

| Doc | What |
|-----|------|
| [**`docs/technical-reference.md`**](docs/technical-reference.md) | Full LWC/Vite/SLDS project structure, routing, shadow DOM, icons, conventions, upstream links. |
| [**`docs/setup-with-agent.md`**](docs/setup-with-agent.md) | Agent copy-paste prompt, Soma + GitHub remotes. |
| [GitHub: `salesforce-ux-emu/data360-starter-kit`](https://github.com/salesforce-ux-emu/data360-starter-kit) | **Use this template**, Issues, history. |
| [**Theme Playground**](https://github.com/salesforce-ux-emu/theme-playground) | Standalone theme sandbox — iterate on Cosmos tokens without the build pipeline. |
| [`.cursor/rules/`](.cursor/rules/) (if present) | SLDS / LWC / icons guidance for this workspace. |

---

**Disclaimer:** this template is for **prototyping and handoff**. How you deploy or embed real Data 360 and Salesforce follows your org’s process; that’s not prescribed here.
