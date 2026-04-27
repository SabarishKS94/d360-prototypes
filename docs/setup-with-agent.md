# Set up this repo with an AI agent (Cursor, Claude Code, etc.)

If you use an AI coding agent, you can paste the **prompt below** and let it run the same steps as `scripts/setup.sh`, with checks and clear errors if something is wrong on your machine.

**What the agent will do:** verify the repo root, ensure Node.js is available, run `sh scripts/setup.sh` (or equivalent steps: `.env` from `.env.example`, `npm install`), and optionally run `npm run build` to confirm the project compiles. It should not commit or paste contents of your private `.env` into the chat.

---

## Base prompt (copy everything in the box)

```
You are helping me set up the d360 / Salesforce UI starter kit repository on my machine.

Context:
- This is a Vite + LWC project. The repo includes `scripts/setup.sh` for first-time setup.
- I need Node.js (LTS recommended). The script creates `.env` from `.env.example` if `.env` is missing, then runs `npm install`.
- Do not read aloud or commit secrets from `.env` if it already exists; only confirm that a `.env` file is present or was created.
- The default local auth mode is VITE_AUTH_MODE=none (no Google login) — that is expected for local work.

Please:
1. Confirm we are in the project root (there should be a `package.json` and `scripts/setup.sh`).
2. Run: `sh scripts/setup.sh` from the repo root. If the script fails, diagnose (e.g. Node missing, wrong directory) and tell me the exact fix.
3. If setup succeeded, run `npm run build` once to verify the project compiles. Report pass/fail.
4. Tell me the exact command to start the dev server (`npm run dev`) and the URL (http://localhost:3000).

If this environment cannot run shell commands, give me a concise numbered checklist to do by hand, matching the script.
```

---

## Shorter follow-up (if you already ran the script)

```
Confirm `npm run dev` works and the app loads at http://localhost:3000. If the dev server fails, show the error and the minimal fix.
```

---

## Where to clone the repo (mirrors)

| Location | Use case |
|----------|----------|
| **git.soma** — `https://git.soma.salesforce.com/dvora/d360-starter-kit.git` | **Salesforce partners and teammates** who do not have access to the GitHub EMU org. |
| **GitHub EMU** — `https://github.com/salesforce-ux-emu/data360-starter-kit` | Public/open workflow for teams using the EMU account. |

The same `scripts/setup.sh` and agent prompt apply after you clone from either place.

To **push to both** from a single clone, add a second remote (example names):

```bash
# Already cloned; origin points at GitHub EMU
git remote add soma https://git.soma.salesforce.com/dvora/d360-starter-kit.git
git push -u soma main
```

SSH (if you use it on git.soma):

```bash
git remote add soma git@git.soma.salesforce.com:dvora/d360-starter-kit.git
git push -u soma main
```

You need credentials with access to the Soma project (and the empty repo must exist on Soma before the first push).
