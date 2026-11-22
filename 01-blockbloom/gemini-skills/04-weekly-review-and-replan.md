# Skill 04 — Daily check, weekly review, month report and re-plan

The plan is only owned if it is checked and corrected on a rhythm. Gemini runs this; Ajay reads it and decides.

## Every day (Gemini, about 20 minutes; Ajay reads 2 lines)

1. `node tools/growth-kpi.js` (app repo; spec M-§1 plus the v2 lines): yesterday's players, Tier-1 free downloads vs
   the day's target in `plan-2026-11/01-day-by-day.md`, revenue, crash-free, ANR, ad load success. During a burst:
   spend, cost per opened install, day-1 return of the first burst days.
2. Kill switches (any one → act the same day, then tell Ajay): crash-free < 99%, an ANR cluster, an AdMob policy or
   invalid-traffic notice, burst cost per opened install > ₹45 on day 3+.
3. New reviews answered through the Play API (CP §7).
4. Today's steps in `01-day-by-day.md`.
5. `DAILY_ACTIVITY.md` (app repo) and `journal/<date>.md` (here): what changed, numbers, what is next.

## Every Saturday (Gemini 60 minutes; Ajay reads 15 minutes)

Write `01-blockbloom/reports/week-<n>-<yyyy-mm-dd>.md`:

```
# Week <n> review — <dates>
## Numbers vs targets (from 01-day-by-day.md)
| | Target | Actual | Note |   (Tier-1 free downloads/day, all downloads, daily players, Tier-1 players,
                                  revenue, ad spend, profit to date, ratings, crash-free, ANR)
## Organic (06 §7): best and worst source, clips, store page, ratings
## Ads: burst read if any (07), spend log matches Google Ads?
## Releases: what shipped, what is late, risks for next week
## Model: inputs replaced this week (old -> new), what moved (skill 03)
## Decisions for Ajay (at most 3, each with a recommendation in brackets)
## Next week: the 3 things that matter most
## Review wanted from Claude? yes/no — why (README rule)
```

Then:
- Update the targets only through a plan change (below), never silently.
- Commit and push the report and the journal the same day.

## Decision days (Check A, E1 read, burst-ready check, Burst 2 decision)

Write the report before the meeting with Ajay, using the pass marks already written in the plan (skill 02, step 6).
Provisional when the cohort is incomplete; say when it will be confirmed.

## Month report (Day 30 · Tue 22 Dec; December review · Thu 31 Dec)

1. Every target vs actual, profit to date, cash spent vs plan.
2. What worked, by source; what did not, and why (with data).
3. Model recalibrated with the month's measured values (skill 03).
4. **The next plan, drafted with skill 02:** goal as profit by a date, three options including "spend nothing",
   modelled, pass marks first, day-by-day steps. Save it as a new plan folder (for example `plan-2027-01/`) with the
   same file layout as `plan-2026-11/`.
5. Ajay approves; Claude reviews if the README rule says so.

## How to change the plan (any day, when the data says so)

1. Write the reason in the journal with the numbers (for example "Tier-1 free downloads 1.2 a day for 2 weeks against
   a target of 3").
2. Change the plan files. At the top of each changed file, add a dated note saying what changed and why. Bump the
   plan version in `00-README.md`.
3. Rerun the model with the change and update the daily table if the targets moved.
4. Commit with a clear message and push the same day. Tell Ajay what changed and what he must decide.
