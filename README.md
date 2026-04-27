# Data 360 — LWC starter (Vite + SLDS)

A **Data 360–aligned** app shell for **Lightning Web Components (LWC)** in the browser: vertical nav, data-app patterns, and SLDS 2, with **Vite** for a fast local loop. It exists so UX and product can explore **Data 360–style** flows without the full platform, while the DOM and design language stay close to what ships on Salesforce (synthetic shadow, Lightning base components, SLDS).

**In short:** use this to prototype the **D360** experience, test navigation and pages, and hand patterns to eng when the design is ready.

**Where this comes from** — This repo is based on the same LWC + Vite + SLDS “starter template” used across Salesforce UI tooling, expanded for D360. **Deeper, generic notes** (routing table details, icon pipeline, synthetic shadow, full folder tree) live in [**`docs/technical-reference.md`**](docs/technical-reference.md). A larger product build on the same pattern is the internal **d360-qsl-ux-prototype**; this repo stays a **lean starter** you can copy or clone for new work.

## Who it’s for

- **Data 360** UX, PM, and partner teams that need a realistic shell without a scratch org.  
- **Internal teammates** with access to **git.soma** but not the GitHub EMU.  
- Engineers who want a **vibe-coded** starting point and will align later with the platform’s deployment model.

## Clone this repo (pick one)

| | URL |
|---|-----|
| **Soma (product partners, git.soma only)** | `https://git.soma.salesforce.com/dvora/d360-starter-kit.git` |
| **GitHub EMU (upstream, PRs, open style workflow)** | `https://github.com/salesforce-ux-emu/data360-starter-kit` |

The workflow is the same: Node LTS, then setup below. Pushing to **both** remotes: [**`docs/setup-with-agent.md`**](docs/setup-with-agent.md#where-to-clone-the-repo-mirrors).

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

## More documentation

| Doc | What |
|-----|------|
| [**`docs/technical-reference.md`**](docs/technical-reference.md) | Full LWC/Vite/SLDS project structure, routing, shadow DOM, icons, conventions, upstream links. |
| [**`docs/setup-with-agent.md`**](docs/setup-with-agent.md) | Agent copy-paste prompt, Soma + GitHub remotes. |
| [GitHub: `salesforce-ux-emu/data360-starter-kit`](https://github.com/salesforce-ux-emu/data360-starter-kit) | Browsing, Issues, history, same tree as the EMU remote. |
| [`.cursor/rules/`](.cursor/rules/) (if present) | SLDS / LWC / icons guidance for this workspace. |

---

**Disclaimer:** this template is for **prototyping and handoff**. How you deploy or embed real Data 360 and Salesforce follows your org’s process; that’s not prescribed here.
