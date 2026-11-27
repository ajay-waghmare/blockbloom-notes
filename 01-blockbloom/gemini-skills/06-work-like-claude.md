# 06 — Work like Claude: the operating system behind the Claude Task (for Gemini)

> **Written:** 27 Nov 2026 by Claude, at Ajay's request: *"Add some tips to Gemini — how overall you work as Claude, all the skills, memory, agents — so Gemini can work accordingly."*
> **Companion:** `02-claude-practices/` (Claude's own set-up, Oct 2026). This file translates it into how **Gemini** should run Block Bloom work day to day. It applies on top of `GEMINI.md` Laws 1–6.

---

## 1. The loop — every task, every time

| Step | What Claude does | Block Bloom example (27 Nov) |
|---|---|---|
| **1. Frame** | Write the outcome in one line and how "done" will be proven | "Ship the Home fix; done = 238 tests green + signed AAB + read-back" |
| **2. Gather** | Memory first, then raw data, then code — never from recollection | Read MEMORY.md → topic → journal → task file; pull GA4 by device; read `GameViewModel` |
| **3. Plan** | Just in time, smallest step that moves the outcome; say what is deliberately *not* done | "No onboarding redesign — the data does not support it" |
| **4. Act** | Cheapest right tool: a script over a browser, an API over a screenshot, an edit over a rewrite | `play-status.js` instead of clicking through Play Console |
| **5. Verify** | Evidence, not belief: command output, counts, read-backs, screenshots | "lintVital 0, 238/238, `production = vc41 completed + vc44 inProgress 0.2`" |
| **6. Persist** | Journal + topic + `DAILY_ACTIVITY.md` + push, same session, `git status` clean | every section in `journal/2026-11-27.md` |
| **7. Automate** | A chore done twice becomes a script or a command; a mistake made twice becomes a rule | `ga4-new-user-devices.js`, the `/bb-*` commands below |

**Answer first, then the work.** Every reply to Ajay starts with the result (one or two lines), then evidence, then decisions he owes.

---

## 2. Memory — three layers, strict rules

**Bootstrap order (start of every session or task):**
1. `memory/MEMORY.md` (index + the banner of what is next) → 2. the topic file(s) → 3. the latest `journal/YYYY-MM-DD.md` → 4. the active task file (`plan-2026-11/1x-*.md`) → 5. `BlockBloom/DAILY_ACTIVITY.md` on the active release branch.
Then `git fetch` both repos and check what moved since the journal was written (`git log <last-known>..origin/<branch>`). The other AI may have acted in between — on 27 Nov Gemini shipped vc44 to internal while Claude was writing.

**What goes where:**

| Layer | Holds | Rule |
|---|---|---|
| `memory/topic_*.md` | the *current state* of a domain (live tracks, branches, open decisions) | overwrite stale lines; keep the "Latest Updated" line true |
| `journal/YYYY-MM-DD.md` | what happened today, with times, IDs, numbers and evidence | append-only; one section per task |
| `plan-2026-11/*.md` | plans, decisions, gates, handoffs | a new file per major plan; README row for each |
| `DAILY_ACTIVITY.md` (app repo) | app-side log, on the **release branch** | newest first; merge conflicts → keep both, order by time |
| `GEMINI.md` (app repo) | the laws + a pointer to the notes | keep short; never copy state into it |

**Writing rules (each one cost Claude a fix):**
- **Exact identifiers:** versionCode, commit hash, Play edit id, GA4 property, sample size `n` next to every %.
- **Times from the clock**, never estimated — run `date` (or `node -e "console.log(new Date(Date.now()+5.5*3600e3).toISOString())"` for IST). Claude wrote guessed times on 27 Nov and had to correct them.
- **Label data quality:** "humans only" / "robots included" / "sample too small".
- **Never** put keys, passwords, local paths, emails or personal data in the notes repo — **it is public**.
- Gemini CLI equivalents: `GEMINI.md` files are loaded as context; `/memory show`, `/memory refresh` and `/memory add` manage them (check `/help` in your CLI version). Use the notes repo as the shared memory between machines and between AIs; use `/memory add` only for durable facts about how Ajay wants to work.

---

## 3. Skills — repeatable procedures, not one-off chats

A **skill** is a written procedure (+ scripts) for a job that recurs: when to use it, the steps, the gotchas learned the hard way, and what "done" looks like. Claude has skills for releases, emulator testing, analytics, prod data, flows; Block Bloom's live set for Gemini is this folder:

| Skill / command | Use |
|---|---|
| `01-deep-research.md` → `/bb-research` | outside facts: prices, policy, benchmarks |
| `02-strategy-and-decisions.md` → `/bb-strategy` | options with profit by date |
| `03-growth-model.md` | running the models (`scripts/growth-model-v2.js`, `scripts/revenue-10k-model.js`) |
| `04-weekly-review-and-replan.md` → `/bb-weekly` | daily 5-min check, Saturday review |
| `05-organic-and-aso-research.md` | store, events, video, creators |
| **`/bb-start`** (new) | session bootstrap: read memory, fetch both repos, report state + next step |
| **`/bb-humans`** (new) | human-only KPI check before any gate or claim |
| **`/bb-release`** (new) | one release step with gate, dry-run, go, read-back, log |
| **`/bb-wrapup`** (new) | end of task: journal + topic + DAILY_ACTIVITY + push + verify clean |

**When to write a new skill:** the second time you do the same multi-step chore, or the second time the same mistake happens. Put the steps, the exact commands, the pass marks, and a "gotchas" list (each with the date it bit).

---

## 4. Agents and parallel work

- **Delegate only independent work** (a broad search across many files, a second opinion on a plan, a long data pull while you build). **Do not delegate** a lookup or a small code check — do it inline; Ajay's rule after a 662k-token waste.
- **Brief like a peer:** the goal, what is already ruled out, the exact files and IDs, the scope, the format to return. The helper knows nothing else.
- **Verify what comes back** — a helper's confident claim is still a claim. Re-run the key number yourself.
- **Gemini CLI:** parallel work = separate terminals / sessions on **separate worktrees** (one per release branch: `git worktree add ../BlockBloom-vcNN release/vcNN`). Never let two sessions edit the same branch at once.

---

## 5. Verification habits (Law 1 + Law 4 made concrete)

1. **Break every number down before believing it** — by device model, app version, country, date. On 27 Nov this showed **12 of 19 "new users" on vc40+ were Google's Test Lab robots**, and all 3 "purchase attempts" were a lab Pixel 6. The headline numbers were wrong.
2. **Check the definition behind the metric.** `tutorial_complete` meant "1 placement" up to vc39 and "3 placements" from vc40 — the "drop" was partly a definition change. Prefer definition-proof events (`first_clear`).
3. **Read the code path, not the name.** `firstGameOverSeen` looked fine; its *default* (`gamesPlayed > 0`) turned true when the first game started, so the first-session hook never showed. Found only by reading the getter and where `gamesPlayed` is bumped.
4. **Sample size next to every rate.** 0/36 and 47% looked like collapses; with robots removed they were noise.
5. **Release evidence (every build):** `:app:testReleaseUnitTest` count, `:app:bundleRelease` (R8) + `jarsigner -verify`, `:app:lintVitalRelease` return value, `check-16kb` result, R8 mapping keeps the 5 mediation adapters + `WinBackReceiver`, merged-manifest versionCode + permissions, then `play-status.js` read-back after every Play step.
6. **UI changes need eyes:** emulator screenshots at 360×640, 360×780 and 411×914 dp, font scale 1.3, and at least 4 languages (en/de/ja/tr). Seed the app state through SharedPreferences (`run-as`), set `wm size` / `wm density`, `cmd locale set-app-locales`, wait for the UI tree (`uiautomator dump`) before `screencap`.
7. **Compute with scripts, not by hand.** Claude's hand-estimated burst profits were wrong until a script recomputed them. Every money number in a plan should be reproducible by a script in `scripts/`.

---

## 6. Git and release hygiene

- One **worktree per release branch**; `release/vcNN` is cut from the previous release branch until that one is merged; **only Ajay merges to `main`**, after 100% in production.
- **Before you build or push:** `git fetch`, and check whether the base moved (on 27 Nov `release/vc42` gained 2 docs commits after vc44 was cut — they were merged into vc44 so the final merge brings everything).
- **Conflicts:** keep both sides, order by time, `grep '^<<<<<<<\|^=======\|^>>>>>>>'` must return nothing before `git commit`.
- **After every commit:** push the same session; `git rev-list --left-right --count @{u}...HEAD` = `0 0`; `git status` clean.
- **Edits:** never blanket search-and-replace (Claude replaced a commit hash in lines that needed the old one); write multi-line or regex-heavy scripts to a file instead of inline shell quoting; keep the file's line endings (the app repo uses CRLF in the working tree).
- **Builds on Windows:** if the Kotlin compile daemon fails, pass `-Pkotlin.compiler.execution.strategy=in-process`; if `gradle.properties` pins a JDK path from the other laptop, override it with `-Dorg.gradle.java.home=<your JDK 17>` rather than editing the shared file.

---

## 7. Safety lines that never move
- **Every Play step and all money: Ajay's one-line go.** Never press Publish; never top up ads; never accept a policy declaration on his behalf.
- No real purchases, no clicking own ads, no synthetic events at vendors. Test Lab / emulator traffic stays out of analytics (vc44 does this in-app).
- The notes repo is **public**: no secrets, paths, emails, personal data. (Ajay: consider making it private — `memory/topic_personal_life.md` is there.)

---

## 8. Talking to Ajay
- Lead with the result; then evidence; then at most a short list of one-line decisions.
- **Money:** profit by a date, the options it beat (**always including "spend nothing"**), the honest downside, ranges not promises.
- Don't ask him micro-questions you can settle from data or code; push back once with evidence when a decision looks wrong, then do what he decides.

---

## 9. Quick reference — the toolbox

| Tool (app repo `tools/`) | Does |
|---|---|
| `growth-kpi.js` | daily KPI report (debug + emulators excluded) |
| `ga4-new-user-devices.js` | new users by device, robots flagged — use for every human-only gate |
| `play-upload.js` / `play-rollout.js` / `play-status.js` | upload, stage / complete / halt, read back |
| `check-16kb.js` | native-library page-size check on an AAB |
| `read-remote-config.js`, `monitor-release.js` | Remote Config read-back, live release watch |
| notes `scripts/growth-model-v2.js`, `scripts/revenue-10k-model.js` | money models (inputs labelled measured / assumed) |
