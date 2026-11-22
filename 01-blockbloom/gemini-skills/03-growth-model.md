# Skill 03 — The growth model (`01-blockbloom/scripts/growth-model-v2.js`)

Pure arithmetic, no network, runs in under a second with Node. It turns a budget plan plus assumptions into daily
targets, profit and burst returns. It is only as good as its inputs: **replace assumptions with measured values every
Saturday**.

## Run it

```
node growth-model-v2.js                       # committed plan v2: Burst 1 only
node growth-model-v2.js --burst2              # with Burst 2 (25-31 Dec)
node growth-model-v2.js --interstitial-loses  # worst realistic case: interstitials stay OFF after E1
node growth-model-v2.js --csv                 # the 39-day table as CSV (this made the table in 01-day-by-day.md)
```

The output has: a daily table (Day 1 = Mon 23 Nov … Day 39 = Thu 31 Dec), a weekly summary, profit to 31 Dec and to
20 Feb (Day 90), and each burst's spend, installs, cost and day-7 return on spend.

## Inputs: what each is, its value on 22 Nov, and where the measured value comes from

| Input (in the code) | 22 Nov value | Basis | Replace with (weekly) |
|---|---|---|---|
| `cpi` base | ₹25 per opened Tier-1 install | Nov campaign: ₹19.71 per Play install ÷ open rate | burst spend ÷ burst `first_open` (KPI tool) |
| budget effect | +15% per doubling above ₹500/day | assumption (benchmarks show steep rise at scale) | compare bursts at different budgets |
| season | ×1.15 on 13–24 Dec; ×0.8 from 25 Dec | benchmarks (Q4 competition; Q5 fall) | Google Ads cost per install by day |
| learning | ×1.2 burst day 1, ×1.1 day 2 | Google: cost inflated in the first days | the burst's daily cost per install |
| `R0`, `R1`, `R2` (return by day after install) | vc39 measured: D1 15%, D3 5%, D7 3.5%; vc40 / vc41 assumed (D1 24% / 30%) | baseline report; plan targets | KPI tool cohort return by install date and version |
| `Q` (retention multiplier) | Tier-1 paid 1.2, Tier-1 free 1.3, other 1.1 | assumption | return by source and country |
| `ARP` (₹ per active day, GA4 basis) | Tier-1 1.4, other 0.4, older players 0.5 | measured 1–21 Nov | KPI tool revenue per active day by country group |
| AdMob basis | GA4 × 1.15 | measured gap | AdMob report ÷ GA4 for the same days |
| `IAP` (purchases per install) | ₹0.5 Tier-1, ₹0.3 other, from vc40 | assumption (0 purchases so far) | Play orders ÷ installs |
| `mult` | ×1.3 from 27 Nov (vc40), ×1.3 from 6 Dec (vc41), interstitials ×1.6 for players who get them, ×0.8 from 26 Dec | assumptions + benchmarks | revenue per active day before vs after each release; the E1 result |
| `keep` | interstitials cost 5% of later-day return | benchmark range 0% to −33% | the E1 result by arm |
| `t1Free` | 2 → 3 → 4 → 6 → 8 a day by week | plan v2 targets (`06` §2) | KPI organic line (7-day average) |
| `otherFree` | 4 a day | before-ads baseline | KPI tool, non-Tier-1 free installs |
| `legacy` | players from before 23 Nov, 32 → 15 | fitted decay | KPI tool, active players installed before 23 Nov |
| `BURSTS` | B1 12–18 Dec ₹500; B2 25–31 Dec ₹1,000 | plan v2 | the real burst dates and budgets |

## Recalibrate (every Saturday, 15 minutes)

1. Take the 7-day averages from the KPI tool for each input you can measure.
2. Change **one input at a time**; rerun; write in the weekly report what moved and by how much.
3. If a line (downloads, players, revenue) is off by more than 30% for two weeks, find which input is wrong before
   changing targets.
4. When the plan changes version, copy the model to a new file (`growth-model-v3.js`) and keep the old one as it was:
   past decisions must stay reproducible.

## Sanity checks (every time the code changes)

- Weekly totals = the sum of their days; profit = revenue − spend; spend = the budget table.
- Recompute two rows by hand (one burst day, one normal day).
- Daily columns are daily, cumulative columns say "to date". (A cumulative column labelled as daily misled the
  week-1 answer on 22 Nov.)
- A lift applies only to the players who get it (not to install-day players before the release).
- Run all three scenarios: the order must make sense (with Burst 2 ≥ committed in players; interstitials-lose ≤
  committed in revenue).

## Older models (kept for history)

`growth-model.js` (v1.0, volume paths), `growth-model-t1.js` (v1.1, Tier-1 every-day budget),
`growth-model-week1.js` (the week-1 question). Do not use them for new decisions.
