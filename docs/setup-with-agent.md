# Set up with an AI agent (Cursor, Claude Code, etc.)

The agent’s job is **local setup only** inside a folder that is **already a clone of *your* repository** — the same as running `sh scripts/setup.sh` yourself. It is **not** the right place to teach “add a soma remote” or other maintainer steps; you also **cannot push to the upstream template** without maintainer access.

**What the agent will do:** confirm `package.json` and `scripts/setup.sh` exist, run the setup script (Node check, `.env` from `.env.example`, `npm install`), optionally `npm run build`, and tell you how to start `npm run dev`. It should not echo secrets from `.env`.

---

## First: get *your* copy of the project (on GitHub — you do this once)

“Forking locally” is not a thing: **git** only sees a normal folder. You first create **your** repo on the host, **then** clone to your machine.

| Approach | When to use |
|----------|-------------|
| [**Use this template**](https://github.com/salesforce-ux-emu/data360-starter-kit) (green button on the canonical repo) | **Preferred** for a new prototype: creates a **new** repo (your name/org), no `soma` or upstream push involved. |
| **Fork** on GitHub | If you want a **fork** relationship to upstream (e.g. you might open pull requests *to* the starter later). You still only **push to your fork** `origin`. |

Then:

1. Open **your** new repository on GitHub (the one the template or fork created).
2. Click the green **Code** button and copy the **clone URL** (HTTPS or SSH). It will look like `https://github.com/YOUR-ORG/YOUR-REPO.git` (or your company’s host) — that string is **different for every person**; the docs can’t hardcode it.
3. In a terminal (outside the agent, or tell the agent your URL):

   ```bash
   git clone <PASTE-YOUR-CLONE-URL-HERE>
   cd YOUR-REPO-FOLDER
   ```

4. Open that folder in your editor and **then** use the base prompt below (or run `sh scripts/setup.sh` yourself).

You do **not** need to add a `soma` remote to work on your app. `origin` should point at **your** repo, where you **can** push. The maintained template URLs in this doc are only for **finding** the starter and for **maintainers** who update mirrors.

**Canonical template (read-only for most people):** [github.com/salesforce-ux-emu/data360-starter-kit](https://github.com/salesforce-ux-emu/data360-starter-kit).  
**Soma mirror (read/clone for some partners; push = maintainers only):** `https://git.soma.salesforce.com/dvora/d360-starter-template.git` — see [Maintainers (Soma)](#maintainers-soma-mirror).

---

## Base prompt (after you are inside your clone)

Copy the block, optionally filling in your path or confirming you used **Use this template** / a **fork** already.

````
You are helping me set up a local working copy of my Data 360 LWC/Vite app.

Context:
- I created this project from the GitHub template (or a fork) and cloned MY repository — not the upstream salesforce-ux-emu template directly, unless I say otherwise.
- This is a Vite + LWC project with `scripts/setup.sh` in the repo root.
- I need Node.js (LTS). The script creates `.env` from `.env.example` if missing, then runs `npm install`. Default auth is VITE_AUTH_MODE=none.
- Do not read aloud or log secrets from `.env`.

Please:
1. Confirm we are in the project root (`package.json` and `scripts/setup.sh` should exist). If I’m in the wrong directory, say what path I should `cd` to, or that I need to `git clone` my repo’s URL from GitHub (Code button) first.
2. Run `sh scripts/setup.sh` from the repo root. If it fails, give the exact fix (e.g. install Node, wrong folder).
3. If setup succeeded, run `npm run build` once. Report pass/fail.
4. Tell me to run `npm run dev` and open http://localhost:3000.

If you cannot run shell commands, give a short manual checklist: clone my repo (URL from the GitHub “Code” button) → `cd` → `sh scripts/setup.sh` → `npm run dev`.
````

---

## Shorter follow-up (if setup already ran)

````
Confirm `npm run dev` works at http://localhost:3000. If the dev server fails, show the error and the minimal fix.
````

---

## fork vs template (quick)

- **Use this template** → new repo, clean history as of the template snapshot; you’re not tied to a “fork” graph. Great for a product with its own name.
- **Fork** → your repo **depends on** the upstream in GitHub’s model; you **push to the fork** (`git push origin`). You do **not** need special remotes to push your work; `origin` is your fork.
- In both cases you only clone **one** URL (your repo). Pushing means `git push` to `origin` on **your** repo.

---

## Pulling future updates from upstream (optional, later)

If the maintainers change the **starter** and you want those fixes in *your* repo, use normal Git (fetch upstream, merge or cherry-pick). The exact `remote` names are up to you; this is not required for first-time setup. See the root [README](../README.md) and [technical reference](technical-reference.md).

---

## Maintainers (Soma mirror)

**Only** people who **publish the maintained starter** to the internal mirror need this. Cloners and template users can ignore it.

Pushing the **source** repo to **Soma** over HTTPS is easiest with the **GitHub CLI** (`gh`) because `git.soma` is a GitHub Enterprise host.

1. `brew install gh` (or install from [cli.github.com](https://cli.github.com)) if needed.
2. `gh auth login` → **GitHub hostname** → **Other** → `git.soma.salesforce.com` → complete login (HTTPS or SSH per your org).
3. `gh auth setup-git` so `git` uses your `gh` credentials.
4. From a clone that has the commits you want on the mirror:

   ```bash
   git remote add soma https://git.soma.salesforce.com/dvora/d360-starter-template.git
   # or: git remote set-url soma https://git.soma.salesforce.com/dvora/d360-starter-template.git
   git push -u soma main
   ```

5. `gh auth status --hostname git.soma.salesforce.com` should show you’re logged in.

**SSH (no `gh`):** `git remote add soma git@git.soma.salesforce.com:dvora/d360-starter-template.git` then `git push -u soma main`.

The empty repo on Soma must already exist, and you need access.
