# Live Demo Script — Thursday Showcase

**Total time: ~5 minutes**

## Pre-demo setup (do before the call)

```bash
cd ~/Code/data360/data360-starter-kit
npm run dev
```

Open http://localhost:4360 in a browser. Have Claude Code open in a terminal side-by-side.

---

## Demo Flow

### 1. Show the running app (30 sec)

- Show the Home page — point out Lightning Base Components rendering
- Click through a couple nav items to show routing works

### 2. Theme switching (30 sec)

- Open theme switcher
- Switch: Standard light → Standard dark → Cosmos glass light → Cosmos glass dark
- Point out: "same components, four visual modes, zero code change"

### 3. Create a new page live (2 min)

In Claude Code, type:

> "Create a new page called data-sources that shows a datatable of sample data sources with columns: Name, Type, Status, Last Synced. Wire it up as the first item under Connect & Unify in the vertical nav."

**What the audience sees:**
- `lwc-new-component` skill fires (show the gate triggering)
- `lwc-ui-checklist` fires when writing markup
- `add-nav-item` fires when adding the route
- Labels get created in `data/labels/DataSources.js` automatically
- Navigate to it in the browser — it works

### 4. Catch a lint violation (1 min)

In Claude Code, type:

> "In the data-sources page, change the alternative-text on the lightning-icon to a hardcoded string: alternative-text="Data Sources""

**What the audience sees:**
- The PostToolUse hook fires
- Error blocks: `❌ [LabelEnforcement] ... alternative-text="Data Sources" — import from data/labels/`
- **The edit is automatically reverted** — the bad pattern never lands in the file
- Say: "It wouldn't even let me do it. The label pattern is enforced automatically — hardcoded strings can't get past the guardrail."

### 5. Show pre-push (30 sec)

Say: "And if I try to push with a namespace violation, it blocks:"

```bash
# Don't actually do this live — just describe it or show the output from earlier
npm run lint:arch
npm run lint:boundaries
```

Point out: "These run automatically before every push. Violations can't reach remote."

---

## Key talking points to weave in

- **"Path swap to production"** — labels use `data/labels/X`, on core it's `@salesforce/label/c.X`. Same pattern.
- **"Mixed team friendly"** — designers using Claude Code get the same quality as senior engineers because skills and hooks enforce patterns.
- **"No throwaway code"** — synthetic shadow, LBCs, SLDS classes all match the real platform.

## If something goes wrong

- Dev server died: `npm run dev` again (fast restart)
- Claude Code skill doesn't fire: it's informational — just say "normally the skill triggers here" and continue
- Component doesn't render: `Ctrl+Shift+R` hard refresh — Vite HMR sometimes needs it for new route registration

## Fallback: no live demo

If you'd rather not live-code, screenshare the running app and narrate over the slides. The speaker notes in the deck have all the key points.
