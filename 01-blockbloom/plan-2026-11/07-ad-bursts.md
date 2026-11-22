# Paid ads in bursts — plan v2 (22 Nov 2026)

**Ajay, 22 Nov:** "Focus more on organic users, majorly in Tier-1 countries. Then paid ad campaigns as well, done
smartly: run them so we get more and more users on that campaign day. How much should I spend till December?"

Owner of everything in this file: **Gemini** (analysis, set-up clicks on Ajay's go, measurement, reports).
**Ajay** approves each burst and makes every payment.

## The answer: ₹3,500 for sure, ₹10,500 at most, to 31 Dec

| | Dates (US days) | Daily budget | Total | Runs only if |
|---|---|---|---|---|
| Ads off | Mon 23 Nov – Fri 11 Dec | ₹0 | ₹0 | — both campaigns paused, not removed |
| **Burst 1 — Winter Bloom launch (the test)** | Sat 12 – Fri 18 Dec (7 days) | ₹500 | **₹3,500** | the burst-ready check passes on Thu 10 Dec |
| Ads off | Sat 19 – Thu 24 Dec | ₹0 | ₹0 | — |
| Burst 2 — Christmas week | Fri 25 – Thu 31 Dec (7 days) | ₹1,000 | ₹7,000 | Burst 1 earns back **≥ 40%** of its cost in 7 days (decided Wed 23 Dec) |
| **Total to 31 Dec** | | | **₹3,500 committed · ₹10,500 at most** | |

- **Cash.** On 22 Nov the Google Ads balance was ₹1,310.82 (₹5,000 deposited, ₹3,689 spent; Gemini's billing check).
  Pausing the Tier-1 campaign on Mon 23 Nov keeps what is left for Burst 1, so Burst 1 needs only about ₹2,200 more,
  paid on Wed 9 Dec (₹3,500 minus the balance shown that day). **Do not add the ₹3–5k** the 22 Nov billing note asked
  for.
- **Expected spend: ₹3,500.** The model (`../scripts/growth-model-v2.js`) puts Burst 1 at ~119 Tier-1 installs for
  ~₹29 each and a day-7 return of ~34%, under the 40% pass mark, so Burst 2 most likely does not run. It runs only if
  the real numbers beat the model.
- **Why 40%.** After the fixes, a Tier-1 player's first 90 days earn about 2.4× their first 7 days (model, Day-30
  conditions: ~₹8.6 in 7 days, ~₹20.3 in 90 days). 40% in 7 days ≈ 95–100% in 90 days: the ad money comes back within
  about 3 months. Below that, ads lose money and the free channels (`06-organic-tier1.md`) are the better use of effort.

## Why bursts, and not a little every day

1. **Every-day ads lost money.** The old path (₹400–500 a day, ≈ ₹14k a month) returned about ₹64 for every ₹100
   within 3 months even after all fixes, and −₹7.4k by Day 30 (model, 22 Nov). Paid installs must be the exception,
   bought only where they earn more.
2. **Google wants bigger daily budgets than ₹400.** Google's guidance for install campaigns: a daily budget of at least
   50× the target cost per install [G1] — ₹1,250 at ₹25. ₹400 every day is 16×. Fewer days at a fixed, higher budget is
   closer to what the system needs; ₹500 is also the setting that already bought Tier-1 installs at ~₹20–25 in November.
3. **Players who arrive at an event start stay longer.** Burst 1 opens 2 days before Winter Bloom (Mon 14 Dec): the new
   players get the event, the Play event card and the first push in their first week. Burst 2 runs with Holiday Bloom
   (24 Dec – 3 Jan) and New Year's week, when game installs and play time peak and ad prices fall [Q1–Q4].
4. **Every burst is a clean test:** one cohort, one cost, one number, and a yes/no for the next burst.

**What "smart" does not mean: a one-day blast.** Google says cost per install is inflated in a campaign's first days
[G1], and Android App campaigns learn for at least 7 days (C-03). A burst is therefore 7 days at one fixed budget,
never edited while it runs. "More users on the campaign day" comes from stacking every channel on the burst's first
days (rule 4), not from a bigger one-day budget.

## Rules for every burst

1. No paid traffic outside a burst. `BlockBloom-Tier1-EN` and `App-1` stay **paused, not removed** (the Tier-1 campaign
   keeps its history and assets). App-1 is never switched on again.
2. Tier-1 only: US, UK, CA, AU, NZ, IE (set on 22 Nov, C-03).
3. A burst starts only on a stable release: crash-free ≥ 99.5% and no ANR cluster in the last 3 days.
4. **Stack the day.** A burst opens 0–2 days before an in-game event and its Play event card, and the free channels
   fire on its first days: clip of the day, a Reddit post (with its UTM link), creator posts if any, push to existing
   players. Every channel keeps its own UTM source so the burst is still measured cleanly.
5. Budget, target cost per install and assets are fixed before the burst and not edited during it (C-05: an edit
   restarts learning).
6. **Cap.** The account is prepay (C-04): ads stop when the balance is used up. Pay only the burst's amount minus the
   balance. Google can spend up to 2× the daily budget on one day (C-04); that is fine inside the burst total.
7. **Kill switch (pause the same day):** crash-free < 99%, an ANR cluster, any AdMob policy or invalid-traffic notice,
   or cost per opened install above ₹45 on burst day 3 or later (3-day average).
8. Decisions use the KPI tool's numbers (M-§3.5). The Google Ads screen counts Play installs, not opened installs, and
   shows no revenue.

## Burst 1 — Winter Bloom launch, Sat 12 – Fri 18 Dec, ₹500 a day (₹3,500)

### Burst-ready check — Thu 10 Dec (Gemini reports at 10:00 IST, Ajay decides)

| Check | Pass mark | Source |
|---|---|---|
| vc41 stability | crash-free ≥ 99.5% (7 days); user-perceived ANR < 0.47% | Crashlytics; Play vitals (C-20) |
| vc42 rollout | at 20% since Thu 10 Dec with no new crash or ANR signature (100% on Fri 11 Dec) | Crashlytics |
| First session | tutorial completion ≥ 80%, all new players since 27 Nov | KPI tool |
| Day-1 return | ≥ 25%, all new players 27 Nov – 8 Dec (at least 60 installs) | KPI tool |
| Ads work | ad load success ≥ 60% (rewarded and banner) | KPI tool |
| Measurement | GA4 shows Google Ads as the first-user source of paid `first_open` (link active since 22 Nov) | GA4 |

- **All pass →** Burst 1 runs as below.
- **Anything fails →** no burst on 12 Dec. Gemini fixes first (vc43 slot, Fri 18 Dec). Burst 1 moves to Fri 25 – Thu 31
  Dec at ₹500 a day (₹3,500, Christmas-week prices) and is the only burst in December.

### Set-up (Gemini prepares; Ajay approves and pays)

1. **Tue 8 Dec — assets** (C-07, CP §1): 2 Winter Bloom portrait videos (9:16) and 1 landscape (16:9) from Ajay's
   clips; 5 headlines and 5 descriptions from CP §1. Google reviews new assets before they serve (time UNVERIFIED;
   allow 2 days).
2. **Wed 9 Dec — settings** (campaign still paused): 6 countries, English, bidding for installs with target cost per
   install ₹25, budget ₹500 a day. All edits happen now, before the burst.
3. **Wed 9 Dec — money (Ajay):** Billing → balance; pay ₹3,500 minus the balance (C-04). Spend-log line (M-§2).
4. **Wed 9 Dec — on/off times.** App campaigns cannot use ad schedules [G2]. Use automated rules for App campaigns
   (ad group rules: Ad groups tab → select the ad group → Edit → "Create an automated rule") [G3]:
   - set the campaign to *Enabled* with its ad group *Paused* on Fri 11 Dec evening;
   - rule "B1 on": enable the ad group, once, **Sat 12 Dec 10:30 IST** (= Sat 00:00 US Eastern);
   - rule "B1 off": pause the ad group, once, **Sat 19 Dec 10:30 IST** (= end of Fri 18 Dec US Eastern);
   - UNVERIFIED that these exact options show for this campaign. If they do not, Ajay switches the campaign on and off
     by hand at those times (the Google Ads phone app can do it). Ajay's phone alarm is the backup either way.
5. **Every burst day, 5 minutes:** yesterday's spend, Play installs, Google's cost per install, then the KPI line (cost
   per opened install, day-1 return of the first burst days). Spend-log line.

## Measuring a burst (Gemini, KPI tool; formulas M-§3.5)

- **Burst cohort** = Tier-1 `first_open` on the burst days whose first-user source is the Google Ads campaign
  (`BlockBloom-Tier1-EN`).
- **Cost per opened install** = burst spend ÷ cohort size. Target ≤ ₹30; kill switch > ₹45.
- **Day-1 return** of the cohort. Target ≥ 28%.
- **Day-7 return on spend** = cohort revenue in its first 7 days (AdMob basis, M-§1.3) ÷ spend. **Pass mark 40%.**
- **Halo** = Tier-1 free downloads a day during the burst minus the 7 days before. Reported, not a pass mark.
- **Read dates for Burst 1:** day-1 return from Mon 14 Dec. Day-7 return of the 12 Dec installs on Sat 19 Dec; of the
  12–15 Dec installs on Tue 22 Dec (complete). The 16–18 Dec installs are projected from their days so far.

## Burst 2 decision — Wed 23 Dec (Gemini reports, Ajay decides)

| Burst 1 result (installs of 12–15 Dec) | Then |
|---|---|
| Day-7 return on spend ≥ 40% **and** cost per opened install ≤ ₹30 **and** day-1 return ≥ 28% | **Burst 2:** ₹1,000 a day, Fri 25 Dec 10:30 IST → Fri 1 Jan 10:30 IST (₹7,000). Holiday assets were uploaded on Sun 20 Dec; pay ₹7,000 minus the balance on Wed 23 Dec; rules "B2 on" / "B2 off" as above |
| 25–40% | No Burst 2. In the December review, plan one more 7-day test at ₹500 in the first week of January (ad prices are still low then [Q1, Q4]) |
| Under 25% | No paid ads until something big changes (purchases, the starter pack, the interstitial result). Organic only |

## What the model expects (`../scripts/growth-model-v2.js`)

| | Burst 1 | Burst 2 (only if it passes) |
|---|---|---|
| Spend | ₹3,500 | ₹7,000 |
| Tier-1 installs | ~119 (~₹29 each; mid-December prices) | ~293 (~₹24 each; post-Christmas prices) |
| Daily players during the burst | 56 → 84 (≈ 10 a day without ads) | ~90 → 160 |
| Day-7 return on spend | ~34% | ~34% |
| Whole plan, profit to 31 Dec | **+₹1.6k** | −₹3.5k |
| Whole plan, profit to 20 Feb | **+₹9.5k** | +₹7.5k |

In the model Burst 2 costs about ₹2k of profit by February. That is why it needs the 40% pass mark: it runs only if
the real numbers are better than the model. The same post-Christmas price fall also lowers what our own ads earn; the
model takes −20% from 26 Dec.

## Sources (opened 22 Nov 2026)

- [G1] Google Ads Help — App campaign set-up and best practices (budget at least 50× the target cost per install for
  install campaigns; 10× the target CPA for in-app actions; cost per install may be inflated in the first days):
  https://support.google.com/google-ads/answer/9176652 · https://support.google.com/google-ads/answer/14104492
- [G2] Google Ads Help — About ad scheduling (App campaigns are listed as not compatible):
  https://support.google.com/google-ads/answer/2404244
- [G3] Google Ads Help — Set up automated rules (section for App campaigns: ad group rules):
  https://support.google.com/google-ads/answer/2472779 . Google Ads scripts do not support App campaigns (Google Ads
  scripts forum).
- [Q1] Moloco — What is Q5: https://www.moloco.com/blog/what-is-q5-and-why-is-it-the-best-time-of-year-for-ua-dsp
  (prices fall from Christmas Day until the 1st–2nd week of January; "up to 60%" is a vendor claim).
- [Q2] Unity — Q5 strategies for mobile user acquisition: https://unity.com/blog/q5-strategies-mobile-user-acquisition
- [Q3] Adjust — 2025 holiday app trends: https://www.adjust.com/blog/2025-holiday-app-trends/ (gaming installs +7% on
  Christmas Day; installs and sessions peak on New Year's Day).
- [Q4] Playio, citing Liftoff data — https://blog.playio.co/q4-holiday-advertising-mobile-games (Android game prices
  fall from mid-December; lowest cost per install in New Year's week). Sources disagree on the exact start; treat as
  direction, not numbers.
