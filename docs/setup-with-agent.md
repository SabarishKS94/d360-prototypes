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

## Create your repo (normal path) vs clone upstream

**Most people** should not clone the URL below for day-to-day work. On **GitHub**, open the **canonical** repo and click **Use this template** to create a **new** repository (your name, your org), then `git clone` **your** repo’s URL. Run `scripts/setup.sh` there.

The table below is the **maintained source** (for mirroring, staying in sync, or internal git.soma access). The same `scripts/setup.sh` and agent prompt apply after you have a working tree from either a **templated** copy or a **direct** clone of these.

| Location | Use case |
|----------|----------|
| **git.soma** — `https://git.soma.salesforce.com/dvora/d360-starter-kit.git` | **Salesforce partners and teammates** who do not have access to the GitHub EMU org; or maintainers pushing the mirror. |
| **GitHub EMU** — `https://github.com/salesforce-ux-emu/data360-starter-kit` | **“Use this template”** (preferred), browsing **Issues** / **history**, or direct clone in edge cases. |

### Push to Soma with `gh` (recommended)

Soma is a GitHub Enterprise host. The **GitHub CLI** (`gh`) is the most reliable way to get HTTPS `git` operations working without a browser password loop.

1. **Install** `gh` if needed (e.g. on macOS: `brew install gh`).

2. **Log in to git.soma** (one-time per machine):

   ```bash
   gh auth login
   ```

   - **GitHub hostname:** choose **Other** and enter `git.soma.salesforce.com`.
   - Prefer **HTTPS** and complete the device/browser flow, or use **SSH** if you already use a soma SSH key.

3. **Wire `git` to your `gh` credentials** (enables `git push` to pick up the right token):

   ```bash
   gh auth setup-git
   ```

4. **Add the Soma remote and push** (repo on Soma must already exist, and you need access):

   ```bash
   # Already cloned; `origin` may point at GitHub EMU
   git remote add soma https://git.soma.salesforce.com/dvora/d360-starter-kit.git
   # if `soma` is already set, skip the line above
   git push -u soma main
   ```

5. **Check** you’re on the right host: `gh auth status --hostname git.soma.salesforce.com` should be logged in.

### Without `gh` (SSH only)

If you use soma’s SSH key with git (no `gh`):

```bash
git remote add soma git@git.soma.salesforce.com:dvora/d360-starter-kit.git
git push -u soma main
```
