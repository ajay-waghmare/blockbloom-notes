# Skill 02 — Strategy and decisions (what to do next with money and effort)

Use for: any plan, budget, channel, release priority or test. Output: a recommendation with numbers, the options it
beat, pass marks fixed in advance, and the plan steps (owner, date, done when).

## Step 1 — State the goal as money, with a date

"Profit by 31 Dec ≥ 0 and growing", not "1,000 installs a day". Installs and players are only means. Write the
constraint too: on 22 Nov Ajay had ₹5k spent with no revenue back, little budget, and wanted "practical targets" and
"revenue has to come from what is invested".

## Step 2 — Build the unit economics (one install, from cost to payback)

```
cost per opened install  = ad spend / installs that opened the app (first_open)       today ~₹25 (Tier-1, ₹400-500/day)
active days in N days     = 1 + sum of day-n return for n = 1..N-1                   from the retention curve (cohorts)
revenue per active day    = AdMob revenue / active players (per country group)       Tier-1 ₹1.4 GA4-basis today, x1.15 AdMob
purchases per install     = Play orders / installs                                    ~₹0 today; ₹0.5 assumed from vc40
value of one install (N)  = active days(N) x revenue per active day + purchases
payback(N)                = value(N) / cost per opened install                        14% today -> 81% after all fixes (90 days)
day-7 return on spend     = value(7) / cost; 90-day value is ~2.4x the 7-day value at Day-30 conditions
```

**Rule of thumb that follows:** paid ads are worth it only when **day-7 return on spend ≥ 40%** (≈ 95–100% in 90 days).
Below that, every rupee of ads loses money, and the free channels are the better use of effort.

## Step 3 — Always list at least three options, one of them "spend nothing"

Example, 22 Nov:
- A — the every-day ads plan, ₹14k: −₹7.4k by Day 30.
- B — stop all ads: +₹1.7k in 30 days, +₹8.0k in 90 days, but fewer players.
- C — organic first plus one 7-day test burst: +₹1.6k by 31 Dec, +₹9.5k by 20 Feb. **Chosen (plan v2).**

Also check "fix the product first": the vc40/vc41 fixes multiply what every player earns and cost no cash.

## Step 4 — Model every option the same way

Run `../scripts/growth-model-v2.js` (skill `03`) with each option's budget and flags. Compare:
- profit by the plan's end date and at 90 days;
- the worst realistic case (`--interstitial-loses`);
- the cash needed and when;
- players and Tier-1 players (Ajay cares; they are not the goal).

If two options are within ~₹1k, choose the cheaper, more reversible one.

## Step 5 — Filter every idea for honesty and Play policy

Kill any idea that needs: false store claims, rewarded or bought ratings, incentivised installs, review swaps,
competitor names in the listing, misleading screenshots, or ads that break AdMob rules. Store claims must match the
live app on every version that is live.

## Step 6 — Turn the choice into a plan with pass marks written first

For each step: date, owner (Gemini, or Ajay for money / approvals / his accounts), what "done" looks like.
For each decision point: **the pass mark, written before the data arrives**, and what happens on pass and on fail
(see the checks table in `plan-2026-11/01-day-by-day.md`). Never move a pass mark after seeing the number. If a pass
mark was wrong, say so in the journal and change it for the **next** decision only.

Always add:
- **kill switches** (crash-free < 99%, an ANR cluster, an AdMob policy notice → stop the same day);
- **minimum data before reading a number**: about 60 installs for a day-1 return (20 installs is ±18 points), 7 days
  for a Google Ads campaign (Android learning), 14 days for a Firebase A/B test;
- **calendar effects**: US Black Friday (installs ~+13% dearer for about a month), Q4 ad prices up, Christmas week /
  early January cheaper ads (Q5), January ad earnings −10–30%.

## Step 7 — Present it to Ajay

```
Recommendation (one line, with ₹ and dates).
Why (3 bullets, with our numbers).
Options it beat (one line each, with profit by date).
What it costs and when the cash is needed.
Pass marks and what happens on fail.
Honest downside (what could go wrong, what we give up).
Decisions needed from Ajay (each with my recommendation in brackets).
```

## Lessons from 21–22 Nov (do not repeat these)

1. **Targets in installs or players lose money.** "1k installs a day" needed cheap traffic that leaves the next day.
   India earns about ₹0.17 per player against ₹3.51 for the US.
2. **Small every-day budgets are the worst of both:** below Google's 50× guidance, always learning, and still losing
   money.
3. **Read live config raw.** A filtered read hid a live value.
4. **Check models by hand on two rows.** A cumulative column was labelled as daily; a lift was applied to the wrong
   players.
5. **Thin data lies.** Say "provisional" and confirm when the full cohort is in.
6. **The store page is part of the product.** A claim that was true in October ("no ads") became false when ads went
   in.
7. **Sunk money is sunk.** The ₹5k spent before 22 Nov is not a reason to spend more; only future returns count.
8. **Ajay decides money.** Give a clear recommendation and the honest downside; do not hide the loss case.
