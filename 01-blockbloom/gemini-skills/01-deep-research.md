# Skill 01 — Deep research (facts we do not have in our own data)

Use for: install prices, ad prices (eCPM), retention benchmarks, Google Ads / Play / AdMob / Firebase rules and
limits, seasonality, store policy, what other games do. Output: an answer with numbers, each with a source, a date
and a trust level, plus what it means for Block Bloom.

## Step 1 — Write the question so the answer can be a number

Bad: "How do we get more users?" Good: "What does one opened Tier-1 install of an Android puzzle game cost in
December 2026, at a budget of ₹500 a day?" Also write **what decision the answer feeds** (for example "Burst 2 yes or
no") and **by when**. If the answer would not change a decision, do not research it.

## Step 2 — Look in this order (the source ladder)

1. **Our own data** — always first; it beats every benchmark.
   - GA4 property 555700046, read through `tools/growth-kpi.js` (app repo) or `01-blockbloom/scripts/growth-baseline-pull.js`
     (players, new players, revenue by country / channel / day, cohorts).
   - Play: the GCS bucket `pubsite_prod_8701670281323658688` (installs, ratings), and the Play Developer API (tracks,
     listings, reviews, products). `scripts/play-listing.js <sa.json>` reads the live listing and discards the edit.
   - AdMob reports (exact revenue by country, once Ajay gives the one-time consent).
   - Google Ads (spend, installs) and the spend log `01-blockbloom/growth/spend-2026-11.csv`.
2. **The code and the live config.** What the app really does: read the app repo files. What is really published:
   read Remote Config **raw** — a filtered read on 21 Nov hid the every-day `live_events` value, and a wrong claim
   reached the plan.
3. **Official documentation** — Google Ads Help, Play Console Help, Play policy, AdMob Help, Firebase docs,
   developer.android.com. These are rules: trust high, but menu names change (write UNVERIFIED for click paths you
   did not see).
4. **Industry data with a date** — AppsFlyer, Adjust, Liftoff, GameAnalytics, Sensor Tower, Singular, Unity, Moloco,
   Tenjin / Playio (often via gamedevreports.substack.com). Trust medium; use for ranges and direction.
5. **Vendor blogs and secondary posts** — trust low. Use only as an upper bound or a hint, and say so ("up to 60%" is a
   sales claim).

## Step 3 — Search well

- Use precise words, the year, the platform and the country: `Android puzzle CPI United States Q3 2026`, `Google Ads
  App campaign daily budget 50 times target CPI`, `Play Console promotional content submit days before`.
- Use a cheap, normal search first. Use the deep / extended mode only when results are thin, old, or about prices
  and recent changes.
- Run 3–5 searches **in parallel** on different angles (official rule, benchmark, seasonality, counter-evidence).
- **Open the page** before using a number; a search snippet is not a source. If a page cannot be opened (Reddit
  blocked automated reads on 22 Nov), say so and hand the check to a person with a checklist (CP §5 did this).

## Step 4 — Verify

- A number that moves money needs **two independent sources**, or one official source.
- **Date everything:** the date of the data (for example "Q3 2026") and the date you opened it. Price data older than
  about 18 months is direction only.
- Convert currency with a dated rate and write it (₹93.32 per US$ on 19 Nov 2026).
- Look for the **counter-claim** on purpose: search "… not working", "… dropped", "… myth". Sources disagree on when
  Q5 prices fall (Christmas Day vs mid-December): write the range, not one number.
- Check that the number fits **our** case: country mix, Android, puzzle, ad-funded, our budget size. A US
  hypercasual price ($1.55) is not a puzzle price ($4.81).
- Anything still not confirmed → **UNVERIFIED** in capitals, with what to check and where.

## Step 5 — Record it so the next person can check it

Add each finding to the plan's `evidence/` folder as JSON, in this shape (see
`plan-2026-11/evidence/benchmarks-2026-11-22.json`):

```json
{ "topic": "CPI - Tier-1, puzzle, Android", "claim": "...", "value": "US $4.81 (Rs449) ...",
  "source_url": "https://...", "source_date": "2026-11-05 (Q3 2026 data)", "confidence": "medium",
  "implication": "what this changes for Block Bloom" }
```

Then add the source to `sources.md` (one line: what it supports, date opened, trust).

## Step 6 — Get an independent check of anything big

Before a plan rests on a model or a long calculation, **a second, separate pass recomputes it from the raw inputs**
(a fresh Gemini session that is given only the inputs, not the conclusion). On 22 Nov this found that a "revenue
Day 7" column was cumulative, not daily (`evidence/week1-model-check-2026-11-22.json`).

## Step 7 — Write the answer

```
Question: ...                     Decision it feeds: ...            Date: ...
Answer: the number or range, in one line.
Evidence: 2–5 bullets, each "number — source (date of data; opened <date>; trust)".
What it means for Block Bloom: 1–3 bullets with our numbers.
Unverified: what is still unknown and how to check it.
```

## Worked examples from 21–22 Nov (copy the method)

| Question | What was done | Result |
|---|---|---|
| Can we reach 1k downloads, 500 daily players and ₹10k revenue in a week? | Own data (baseline report) → model (`growth-model-week1.js`) → benchmarks for prices and retention → an independent re-check | 1k downloads yes (₹9.7k); 500 players only with cheap installs that leave; ₹10k revenue not at any budget |
| How big should a burst budget be? | Google Ads Help (official): budget ≥ 50× target CPI; Android learning ≥ 7 days | 7-day bursts at one fixed budget, never 1-day blasts |
| When are ads cheap in December? | Moloco, Unity, Adjust, Playio (several sources; they disagree on the start date) | Christmas week to early January is cheaper; our own ad earnings fall too (model −20%) |
| Is the store page honest? | Read the live listing through the Play API (read-only) | The en-US text said "nothing interrupts your game" while interstitials were on → fix first |
