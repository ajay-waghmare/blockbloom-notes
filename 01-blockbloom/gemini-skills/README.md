# Gemini skills — Block Bloom growth (research, strategy, model, weekly review)

**Why this folder exists.** Ajay, 22 Nov 2026: *"Make sure your research strategies, sources and skills are on GitHub,
so Gemini also knows how to do the deep research and make strategies on its own. All the things have to be owned by
Gemini; you just need to guide him all along until we are making the profit."*

So: **Gemini owns the growth work end to end** — research, strategy, the model, the plan, the releases, the
measurement, the weekly review. **Ajay** makes every money decision and approval. **Claude** reviews when asked and
otherwise stays out. These files are how Claude worked on 21–22 Nov, written down so Gemini can do the same without
Claude.

## The skills

| File | Use it when |
|---|---|
| `01-deep-research.md` | Any question that needs facts from outside our own data: prices, benchmarks, Google / Play / AdMob rules, seasonality, policy |
| `02-strategy-and-decisions.md` | Choosing what to do next with money or effort: build options, model them, pick by profit, write the plan with pass marks |
| `03-growth-model.md` | Running or updating `../scripts/growth-model-v2.js`: inputs, where each measured value comes from, sanity checks |
| `04-weekly-review-and-replan.md` | Every day (5 minutes), every Saturday (the review), Day 30 / Day 39 (the month report and the next plan) |
| `05-organic-and-aso-research.md` | Organic growth work: store keywords, listing tests, Play event cards, short video, Reddit, creators |
| `06-work-like-claude.md` | **How Claude works, for Gemini (27 Nov):** the 7-step loop, memory layers + writing rules, skills, agents / parallel work, verification habits (break numbers down, read code paths, n next to every %), git + release hygiene, safety lines, how to talk to Ajay, the toolbox |
| `sources.md` | Every outside source used so far, what it supports, when it was opened, how far to trust it |
| `commands/` | Optional Gemini CLI custom commands that load these skills (`/bb-research`, `/bb-strategy`, `/bb-weekly`) |
| `commands/bb-start.toml`, `bb-humans.toml`, `bb-release.toml`, `bb-wrapup.toml` | **New (27 Nov):** session bootstrap · human-only KPI check · one release step with gate + go + read-back · end-of-task persistence |

## How Gemini loads them

1. In the app repo (`ajay-waghmare/BlockBloom`), add one line to `GEMINI.md` under the laws:
   `Growth, money, store or marketing work: first read blockbloom-notes 01-blockbloom/gemini-skills/README.md and the
   skill it points to; the current plan is 01-blockbloom/plan-2026-11/00-README.md.`
2. Optional: copy `commands/*.toml` to `~/.gemini/commands/` (all projects) or to the app repo's `.gemini/commands/`.
   Replace `<NOTES>` in each file with the notes-repo path on Gemini's machine. (Gemini CLI custom-command format:
   `description` + `prompt`, `{{args}}` for what is typed after the command; check the Gemini CLI docs for your
   version.)

## The operating loop (what "owning it" means)

| Cadence | Gemini does | Output |
|---|---|---|
| Every day | KPI screen, crash / vitals check, reviews answered, the day's plan steps | `DAILY_ACTIVITY.md` (app repo), `journal/<date>.md` (here) |
| Every Saturday | Weekly review (`04`): targets vs actual, organic page, burst read, model recalibration, 1–3 decisions for Ajay | `01-blockbloom/reports/week-<n>-<date>.md` |
| Each gate or decision day | Report with the pass marks fixed in advance (`02`) | in the weekly report or `reports/` |
| Day 30 / Day 39 / month end | Month report; next plan drafted with `02` and `01`; model inputs replaced with measured values | `reports/`, a new plan version |
| Any new question | Research with `01`; add new sources to `sources.md` | an evidence file in the plan's `evidence/` |

## Five rules that do not change

1. **Profit is the goal.** Every plan states profit by a date (revenue − ad spend). Installs and players are means, not
   targets on their own. Ajay: "revenue has to come from what is invested."
2. **Own data first, then official docs, then industry numbers** (`01`). Every number that moves money has a source and
   a date; anything not confirmed is written UNVERIFIED.
3. **Pass marks are written before the data arrives** and never moved after (`02`).
4. **Small, reversible tests:** staged rollouts, A/B tests, 7-day ad bursts. One change at a time where possible.
5. **Honest and policy-safe:** the store page, ads and posts say what the game really does; no bought or rewarded
   ratings, no fake installs, no competitor names (`05`).

## When to ask Claude (guidance) and when to ask Ajay (decision)

- **Ajay decides:** any payment; any budget; release to 100%; each burst; anything public from his accounts.
- **Ask Claude for a review** (Ajay pastes the request, or Gemini writes it into the journal under "Review wanted"):
  - a gate or check fails;
  - the model is off by more than 30% for two weeks running on any line (players, downloads, revenue);
  - a money decision above ₹5,000;
  - a new channel, a new country group, a price change;
  - a strategy change that rewrites more than one plan file.
  Claude's answer goes into the journal, and Gemini acts on it.
