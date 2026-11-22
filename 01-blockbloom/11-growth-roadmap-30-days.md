# Block Bloom — 30-day growth roadmap (v1.1: Tier-1 first, revenue first)

**22 Nov – 21 Dec 2026** · v1.1 written 22 Nov 2026 · replaces v1.0 of 21 Nov

**What changed in v1.1 (Ajay, 22 Nov):** "target Tier-1 users more, not much for cheap users", "keep practical
targets only", and "I have already invested 5k but haven't got any revenue from that yet. I don't have budget, but I
am ready to invest — revenue has to come from that." So this version spends on **Tier-1 English countries only**,
sets targets the data supports, and lets spend grow **only when the money is shown to come back**. v1.0's volume
paths (₹42k / ₹77k) are kept in Appendix D for the record.

**22 Nov update:** Gemini does all development and changes (Ajay's decision); wherever this file says "Agent",
read "Gemini". The step-by-step execution plan is in `plan-2026-11/` (start with `00-README.md` and
`01-day-by-day.md`); where the two differ — budget steps of about 20%, the first push only after vc40, and Gate B
expected to hold the budget (≈ ₹14k for the month) — `plan-2026-11/` wins.

**22 Nov evening — plan v2 replaces this file's money sections (§1–§4 targets and budget, §7 daily budgets, §11
gates).** Organic first in Tier-1; paid ads only in 7-day bursts: ₹3,500 committed, ₹10,500 at most to 31 Dec; profit
+₹1.6k by 31 Dec in the model (`scripts/growth-model-v2.js`). The every-day budget below lost about ₹7.4k by Day 30 in
its own model. Read `plan-2026-11/00-README.md`, `06-organic-tier1.md` and `07-ad-bursts.md`.

**Built from:** the 21 Nov baseline (`reports/growth-baseline-2026-11-21.txt`, pulled with
`scripts/growth-baseline-pull.js`), the Tier-1 model `scripts/growth-model-t1.js`, the app repo `main` at d0235e0
(v1.15.1, vc39), and the app repo's `DAILY_ACTIVITY.md`, `MAJOR_ISSUES_AND_GO_LIVE_CHECKLIST.md` and
`docs/PROJECT_HANDOFF_AND_STRATEGIC_ROADMAP.md`.

---

## 1. The answer first

- **Where the ₹5k went.** About ₹5k of Google Ads since mid-November bought roughly 400–600 installs (Play count).
  About two-thirds came from the cheap `App-1` campaign (Pakistan, India, Bangladesh, Kenya), and those players earn
  ₹0.01–0.04 each. Revenue for
  15–21 Nov was ~$3–3.5 (₹250–300), so the ₹5k returned about **5–6%**. And none of it has reached you yet: AdMob
  holds earnings until the balance passes its payment threshold (AdMob → Payments), then pays around the 21st of the
  next month.
- **Why.** Three things, all fixable: cheap traffic; only **15%** of new players come back the next day; and **80%**
  of players never see an ad (ad loads fail 61% of the time, and a failed rewarded ad gives the reward free).
- **The honest economics of Tier-1.** A Tier-1 install (US, UK, CA, AU, NZ, IE) costs **~₹25** and today earns
  **~₹3.5 in 90 days (14%)**. After the fixes in this plan it should earn **~₹20 in 90 days: about 80% of its cost
  at ₹25, about 64% at Christmas prices**, and pay back fully only after ~4–6 months, or sooner if `remove_ads`
  sells. **Ads will not pay for themselves inside these 30 days.** So the plan:
  1. makes every player worth about **3×** more first (no ad spend needed),
  2. buys **Tier-1 players only**, at a small "learning" budget (₹300–500 a day),
  3. grows **free Tier-1 installs** (store listing, ratings, Reddit, Shorts, Play events),
  4. raises spend **only** when Tier-1 cohorts show at least 30% of their cost back within 7 days.
- **Practical Day-30 targets** (§2): revenue **₹375–500 a day** (₹11–15k/month run-rate, up from ~₹50–100 a day
  today), **135–165 daily players** (mostly Tier-1), **40–50 downloads a day**, day-1 return **30%**. Ad spend
  **₹13.6k committed, ₹18k at most**; revenue over the 30 days ₹6.5–7.6k.
- **Expect daily players to fall first** (~90 → ~55 this week) when the cheap installs stop. That is fine: those
  players earned almost nothing.
- **Three money moves this week that cost nothing:** start the interstitial test (Firebase, today), stop the
  "Weekend Cascade +50% coins" boost that runs every day (§5), ship vc40 (rewarded ads ready on time + remove-ads offers).

## 2. Practical targets

"Committed" holds Tier-1 at ₹500 a day after Day 9; "stretch" adds spend at Gate B (Day 18) only if Tier-1 day-7
return on spend is ≥ 30%. Revenue is the AdMob estimate (GA4 × 1.15). Model: `scripts/growth-model-t1.js`
(`--gate-b-fails` for committed).

| | Today (21 Nov) | Day 7 · Sat 28 Nov | Day 14 · Sat 5 Dec | Day 21 · Sat 12 Dec | Day 30 · Mon 21 Dec |
|---|---|---|---|---|---|
| Revenue a day | ~₹50–100 | ₹80 | ₹200 | ₹315 (stretch ₹365) | **₹375 (₹500)** |
| Daily players | ~90 (half cheap) | ~57 | ~80 | ~100 (~115) | **~135 (~165)** |
| Downloads a day | 35–90 | ~20 | ~30 | ~32 (~39) | **~41 (~52)** |
| Day-1 return | 15% | 22% | 28% | 30% | 30% |
| Tier-1 day-7 return on spend | ~8% | 15% | 22% | ≥ 30% | ≥ 30% |
| Ad spend so far (this plan) | — | ₹2.5k | ₹5.6k | ₹9.1k (₹9.9k) | **₹13.6k (₹18k)** |

| Week | Dates | Ad spend | Tier-1 installs | Free installs | Avg daily players | Revenue (AdMob est.) |
|---|---|---|---|---|---|---|
| 1 | 22–28 Nov | ₹2.5k | ~90 | ~50 | ~55 | ~₹465 |
| 2 | 29 Nov – 5 Dec | ₹3.1k | ~120 | ~85 | ~73 | ~₹965 |
| 3 | 6–12 Dec | ₹3.5k (₹4.3k) | ~140 (~165) | ~80 | ~93 (~98) | ~₹2.0k (₹2.2k) |
| 4 | 13–21 Dec (9 days) | ₹4.5k (₹8.1k) | ~155 (~250) | ~195 | ~122 (~145) | ~₹3.1k (₹4.0k) |
| **30 days** | | **₹13.6k (₹18k)** | **~505 (~625)** | **~410** | | **~₹6.5k (₹7.6k)** |

If the interstitial test loses (they stay OFF), Day-30 revenue is ~₹310 a day and the 30-day total ~₹5.5k — still
4–5× today.

## 3. Unit economics: when does a Tier-1 rupee come back?

| One Tier-1 install (cost ₹25 per opened install; ~₹32 in Black Friday week and the Christmas run-up) | Today | After vc40 (Day 5) | After vc41 (Day 14) | + interstitials win (Day 15) |
|---|---|---|---|---|
| Revenue per active day | ₹1.40 | ₹1.82 | ₹2.37 | ₹3.79 |
| Active days in 90 days | 2.5 | 4.1 | 5.5 | 5.2 |
| Revenue in 7 days (share of ₹25) | ₹2.1 (8%) | ₹4.0 (16%) | ₹5.7 (23%) | ₹8.6 (**34%**) |
| Revenue in 90 days (share of ₹25 / ₹32) | ₹3.5 (14% / 11%) | ₹8.0 (32% / 25%) | ₹13.4 (54% / 42%) | **₹20.3 (81% / 64%)** |

Purchases count from vc40 (₹0.5 per Tier-1 install). Computed with the curves in `scripts/growth-model-t1.js`.

**Spend is allowed to grow only when all four of these hold for Tier-1 cohorts:**
1. day-1 return ≥ 28%;
2. revenue per Tier-1 active day ≥ ₹3 (AdMob basis);
3. day-7 return on spend ≥ 30% (the trajectory to ~100% in 4–6 months);
4. cost per opened install ≤ ₹30.

What turns "slow payback" into "fast payback" (watch these): `remove_ads` selling to ≥ 2% of Tier-1 players at a
Tier-1 price (~$2.99) adds ~₹5 per install; ad mediation competition lifting eCPM; and day-30 return above 6%.

## 4. Budget and money rules (Tier-1 only)

- **Countries:** US, UK, CA, AU, NZ, IE. Everything else: ₹0 paid. India stays the home market for *free* growth.
- **Ladder:** ₹400/day Days 1–4 → ₹300/day Days 5–9 (Black Friday to Cyber Monday: US prices jump ~30%) → ₹500/day
  from Day 10 if Gate A passes (else ₹300) → from Day 18 only if Gate B passes: ₹700/day, then ₹900/day from Day 22
  if the Days 14–17 cohorts still show ≥ 30% and the cost per opened install stays ≤ ₹30.
- **Raise budgets by at most 30% at a time, every 3+ days** — bigger jumps restart Google's learning and cost more.
- **Stop-loss:** if Tier-1 cohorts after vc41 show < 15% day-7 return on spend, drop to ₹300/day and fix the product
  before spending more.
- **Hard cap:** ₹13.6k for the 30 days; ₹18k only with Gate B passed. Prepay Google Ads one week at a time.
- **Cash flow:** ad money leaves now; AdMob revenue arrives the month after the balance passes the payment threshold.
  Plan for the first payout around **21 January** at the earliest.

## 5. Issues found on GitHub and in the live config (22 Nov)

From the app repo's `DAILY_ACTIVITY.md` (20–21 Nov), `MAJOR_ISSUES_AND_GO_LIVE_CHECKLIST.md`, the build files and
live Remote Config. No GitHub Issues: `blockbloom-notes` has none; the app repo is private and was not checked
(no `gh` on the work laptop).

| # | Issue | Evidence | Fix | When |
|---|---|---|---|---|
| I1 | **"Weekend Cascade +50% coins" runs every day, always "ends today"** | Live Remote Config `live_events` = one `COIN_BOOST` 1.5×, `endsInDays` 0, no date condition; it replaces the app's own weekend and midweek events | Delete the `live_events` parameter (not `[]`, which turns all events off) so the calendar events run as designed; use `live_events` only for dated events with date conditions | Day 1 |
| I2 | Releases go straight to 100% | vc37, vc38, vc39 all 100% within 2 days; vc38 shipped the ANR; checklist Gate 4 says "100% completed" | Staged: 20% → 100% after 24 h clean (new SDKs: 10% → 50% → 100%); change Gate 4 | vc40 on |
| I3 | Meta bidding cannot fill even after the account checks | No mediation adapter anywhere in the build (app + version catalog) | Add the adapters in vc41 (AppLovin, Liftoff, Pangle, Mintegral; Meta when verified) | vc41 |
| I4 | Docs say interstitials run; they don't | Handoff: "Banner, Interstitial, Rewarded"; live Remote Config `ads_interstitial_enabled=false` | Interstitial test from Day 1 (§10, E1) | Day 1 |
| I5 | Tier-1 installs counted as "Direct" | 36 US "Direct" installs earned 37% of revenue; Cross-network US only 9 | Link Google Ads with Firebase / GA4 and import conversions | Day 1 |
| I6 | Two revenue numbers | Handoff $0.8–1.2/day; GA4 ~$0.5/day lately (month totals $4.50 vs $3.93) | AdMob for the targets, GA4 for country and channel splits | — |
| I7 | Store short description already rewritten (20 Nov) | `DAILY_ACTIVITY.md` | Test the listing (icon, screenshots, US custom listing) instead of rewriting | Day 3 |
| I8 | `blockbloom-notes` is a public GitHub repo | Unauthenticated API: public, since at least 11 Oct with account ids and revenue figures | Ajay's call: make it private (Settings → Danger zone → Change visibility) | Ajay |

## 6. Week by week

| Week | Dates | Goal | Tier-1 budget | Must be true by the end |
|---|---|---|---|---|
| **1 — Stop the leak, start earning** | Sun 22 – Sat 28 Nov | Cheap installs off; measurement fixed; interstitial test running; I1 fixed; vc40 live; festival live | ₹400 → ₹300/day (₹2.5k) | Tier-1 is ≥ 50% of paid installs; vc40 at 100%; tutorial completion ≥ 80%; day-1 return ≥ 22% for vc40 installs; revenue ≥ ₹450 for the week |
| **2 — Prove Tier-1 value** | Sun 29 Nov – Sat 5 Dec | Gate A; vc41 (mediation, daily loop, reminders) staged to 100%; Tier-1 bidding on `tutorial_complete`; Winter Bloom submitted | ₹300 → ₹500/day (₹3.1k) | Ad load success ≥ 60%; day-1 return ≥ 28%; Tier-1 day-7 return on spend ≥ 20%; revenue ≥ ₹950 for the week |
| **3 — Scale only what pays** | Sun 6 – Sat 12 Dec | Interstitial winner shipped; Gate B; vc42 (Winter Bloom, Adventure on home, starter pack if supported) | ₹500/day, ₹700 if Gate B (₹3.5–4.3k) | Tier-1 day-7 return on spend ≥ 30%; revenue ≥ ₹2k for the week |
| **4 — Holiday peak, keep what pays** | Sun 13 – Mon 21 Dec | Winter Bloom event; December's high ad prices; hold or grow Tier-1 by the rules | ₹500, or ₹900 if the rules allow (₹4.5–8.1k) | Revenue ₹375–500 a day by Day 30; the next 30-day plan written |

## 7. Day by day

**Ajay** ≈ 45–60 min on weekdays, 2–3 h on Sundays. **Agent** = Claude or Gemini (code, scripts, drafts, reports).
"Budget" = the Tier-1 Google Ads daily budget that day. "Pass mark" = what must be true before tomorrow.

### Week 1 — Stop the leak, start earning (22–28 Nov)

| Day | Date | Ajay | Agent | Budget | Pass mark |
|---|---|---|---|---|---|
| 1 | Sun 22 Nov | Pause `App-1`. Tier-1 campaign: countries US, UK, CA, AU, NZ, IE only, ₹400/day, target ₹25 per install. Link Google Ads ↔ Firebase / GA4; import `first_open` and `tutorial_complete`. Firebase A/B: interstitials ON for 50% (every 4th game). Remote Config: delete `live_events` (I1). Prepay ~₹2.5k | Cut `release/vc40`; build `tools/growth-kpi.js`; draft the festival `live_events` with date conditions; create the spend log | ₹400 | App-1 ₹0; A/B "Running"; GA4 "Linked" |
| 2 | Mon 23 Nov | Play Console: 28-day ANR < 0.47%? Check what the 27 Nov promotional event promises (must match the in-game festival). Meta: invite a second admin | vc40: onboarding v2 (≤ 3 steps, pre-set first board, skip after step 1), `tutorial_step` events, rewarded preload + "watch" buttons only when an ad is ready | ₹400 | First KPI report; Tier-1 cost per install ≤ ₹25; no "Weekend Cascade" strip on a Monday (I1 fixed) |
| 3 | Tue 24 Nov | `remove_ads` Tier-1 prices (US $2.99, UK £2.49, CA $3.99, AU $4.49) or a Play price experiment; Play custom store listing for US/UK/CA/AU (English copy, best screenshots); record 7 gameplay clips | vc40: remove-ads offers (after the 3rd interstitial or 5th session; pause menu; game over from day 3), review rule, chest "ready" badge, 150 s interstitial gap; internal build; gates 1–3 | ₹400 | Internal build passes gates 1–3 |
| 4 | Wed 25 Nov | vc40 → **20%** of production. AdMob: blocking controls sane, app-ads.txt 200 | Watch Crashlytics and ANRs for 24 h; landing page with US-focused copy; English ad copy for the campaign | ₹400 | vc40 crash-free ≥ 99.5% at 20% |
| 5 | Thu 26 Nov (US Thanksgiving) | vc40 → **100%** if clean. Budget → ₹300. Upload 5 videos + 10 images + 5 headlines to the Tier-1 campaign. Post clip #1 (Shorts + Reels, scheduled) | Release notes in 13 locales; cut `release/vc41`, start the mediation adapters | ₹300 | vc40 100%, no ANR cluster |
| 6 | Fri 27 Nov (Black Friday) | Publish the festival `live_events` (Aurora Bloom Festival, coins ×2, 27 Nov – 3 Dec, date conditions); push message to opted-in players; Reddit post #1 (ask for feedback) | Check the festival day by day in the app; KPI | ₹300 | Festival visible; push sent |
| 7 | Sat 28 Nov | Weekly review #1 (30 min); reply to every review | Weekly report into `reports/`; Gate A pre-read | ₹300 | Week 1: spend ≤ ₹2.5k; revenue ≥ ₹450; tutorial completion ≥ 80% |

### Week 2 — Prove Tier-1 value (29 Nov – 5 Dec)

| Day | Date | Ajay | Agent | Budget | Pass mark |
|---|---|---|---|---|---|
| 8 | Sun 29 Nov | **Gate A** (§11): decide the Day-10 budget. Record and schedule 7 clips | Gate A report | ₹300 | Gate A written down |
| 9 | Mon 30 Nov (Cyber Monday) | Open the mediation networks (AppLovin, Liftoff, Pangle, Mintegral): payment and tax details | vc41: adapters (versions that compile under the Kotlin 1.9 pins), AdMob mediation groups, daily loop on home (Daily Challenge card, streak ladder) | ₹300 | Network accounts live |
| 10 | Tue 1 Dec | Budget → ₹500 if Gate A passed. Submit the **Winter Bloom** Play promotional content (14–21 Dec) | vc41: reminders v2 (one a day at the player's usual hour, only if the streak is at risk); internal build; gates 1–3 with an ANR focus | ₹500 | vc41 internal build clean |
| 11 | Wed 2 Dec | vc41 → **10%** | Watch Crashlytics / ANRs; first mediation fill numbers | ₹500 | No new ANR signature |
| 12 | Thu 3 Dec | vc41 → **50%** if clean. Tier-1 bidding → in-app action `tutorial_complete` if ≥ 10 a day. Reddit post #2 | Referral share link (if it fits; else vc42) | ₹500 | Crash-free ≥ 99.5% at 50% |
| 13 | Fri 4 Dec | Festival over: delete the festival `live_events` (calendar events resume) | KPI; ad load success by country | ₹500 | `live_events` removed |
| 14 | Sat 5 Dec | vc41 → **100%** if clean. Weekly review #2. Apply the store-listing test winner if significant; start the screenshot test | Weekly report | ₹500 | Week 2: revenue ≥ ₹950; ad load success ≥ 60%; day-1 return ≥ 28% |

### Week 3 — Scale only what pays (6–12 Dec)

| Day | Date | Ajay | Agent | Budget | Pass mark |
|---|---|---|---|---|---|
| 15 | Sun 6 Dec | Read the interstitial test (14 days): ship the winner to 100% (or keep OFF). Record clips batch #3 | Test analysis: revenue per player, day-1 / day-3 return, uninstalls by arm | ₹500 | Decision written down |
| 16 | Mon 7 Dec | Meta verified? Turn Meta on in the mediation group | vc42: Winter Bloom content (theme, limited-time challenge, rewards), Adventure next to Classic on home | ₹500 | — |
| 17 | Tue 8 Dec | Reply to reviews; Reddit post #3 | vc42: starter pack if `offer_tap` ≥ 3%; internal build; gates 1–3 | ₹500 | vc42 internal build clean |
| 18 | Wed 9 Dec | **Gate B** (§11): ₹700/day if it passes, else hold ₹500 (₹300 if below the stop-loss) | Gate B report: cohort day-7 return on spend, revenue per Tier-1 active day | ₹500 → ₹700 | Gate B written down |
| 19 | Thu 10 Dec | vc42 → **20%** | Watch | ₹700 / ₹500 | Crash-free ≥ 99.5% |
| 20 | Fri 11 Dec | vc42 → **100%** if clean | Release notes; KPI | ₹700 / ₹500 | vc42 100% |
| 21 | Sat 12 Dec | Weekly review #3 | Weekly report | ₹700 / ₹500 | Week 3: revenue ≥ ₹2k; Tier-1 day-7 return on spend ≥ 30% |

### Week 4 — Holiday peak, keep what pays (13–21 Dec)

| Day | Date | Ajay | Agent | Budget | Pass mark |
|---|---|---|---|---|---|
| 22 | Sun 13 Dec | ₹900/day only if Days 14–17 cohorts ≥ 30% and cost ≤ ₹30 per install. Record winter clips | Winter Bloom `live_events` with date conditions (14–21 Dec); push draft | ₹900 / ₹500 | Rule checked |
| 23 | Mon 14 Dec | **Winter Bloom live**: Play card + in-game event + push | Check the event in the app | ₹900 / ₹500 | Event visible |
| 24 | Tue 15 Dec | Daily 5-minute check: cost per install (cut 30% if > ₹33), yesterday's revenue | KPI | as rule | — |
| 25 | Wed 16 Dec | Reply to reviews | KPI | as rule | — |
| 26 | Thu 17 Dec | Reddit post #4 | KPI | as rule | — |
| 27 | Fri 18 Dec | Hotfix slot (vc43) only if needed — no features | vc43 if needed | as rule | — |
| 28 | Sat 19 Dec | Weekly review #4 | Weekly report | as rule | Revenue ≥ ₹350 a day |
| 29 | Sun 20 Dec | Winter Bloom ends: delete its `live_events` | Draft the next 30 days | as rule | — |
| 30 | Mon 21 Dec | **Day-30 review** against §2; decide January (lower ad prices *and* lower eCPMs after the holidays; focus on purchases and day-30 return) | Day-30 report | as rule | Next plan written |

## 8. What gets built and done (workstreams, Tier-1 versions)

**Measure** — Google Ads ↔ GA4 link and conversions (Day 1); `tools/growth-kpi.js` with a Tier-1 view: cohort
day-1 / day-7 return, revenue per Tier-1 active day, day-7 return on spend per campaign (Day 2); spend log
`growth/spend-2026-11.csv` (daily); vc40 events `tutorial_step`, `rewarded_offer` (shown / no_fill / fallback_grant),
`interstitial_shown`, `offer_shown` / `offer_tap` / `purchase`.

**Keep players (vc40, vc41, vc42)** — onboarding v2 (target ≥ 85% complete, first clear ≥ 75%); first-session hook
with the notification ask after a good first game; daily loop on home (Daily Challenge card, streak ladder);
reminders at the player's own hour (Tier-1 time zones); Adventure next to Classic.

**Earn more per player** — interstitial test from Day 1 (existing guards: none in the first 2 games, none after a
rewarded view in the same run, none for `remove_ads` buyers; vc40 adds a 150 s gap); rewarded preload and "ready"
buttons (vc40); mediation (vc41); `remove_ads` offers in context and Tier-1 prices; starter pack (vc42, if offers
show interest); I1 fix so coins are not inflated every day.

**Tier-1 paid** — one campaign, six countries; target ₹25 per install, then in-app action `tutorial_complete`;
English creatives (5 portrait videos, 5 landscape, 10 images: combo cascade, a satisfying full clear, the Aurora Glass
theme switch, the daily challenge, "no Wi-Fi needed"); budget by §4.

**Free Tier-1 installs** — Play custom store listing for US/UK/CA/AU; icon and screenshot tests (the three designed
icons in the app repo's `store/`); ratings at positive moments only (10 → 40+ by Day 30); Reddit (r/AndroidGaming,
r/playmygame, r/IndieGaming — feedback, not ads; follow each community's rules); 7 short clips a week on YouTube
Shorts and Instagram Reels (record once on Sunday, schedule); landing page at ajay-waghmare.github.io/blockbloom;
Play events (Aurora Bloom Festival 27 Nov – 3 Dec, Winter Bloom 14–21 Dec).

## 9. Releases

Every release: feature branches → `release/vcNN` from `main` → AAB → the four gates in
`MAJOR_ISSUES_AND_GO_LIVE_CHECKLIST.md` → **staged** rollout → Ajay merges to `main` at 100%.

| Release | Internal | Production | Contents |
|---|---|---|---|
| **vc40 · 1.16.0** | Tue 24 Nov | 20% Wed 25 → 100% Thu 26 Nov | Onboarding v2, first-session hook, rewarded preload + ready buttons, remove-ads offers, review rule, chest badge, 150 s interstitial gap, new events. No new SDKs |
| **vc41 · 1.17.0** | Tue 1 Dec | 10% Wed 2 → 50% Thu 3 → 100% Sat 5 Dec | Mediation adapters, daily loop on home, reminders v2, referral link (if ready) |
| **vc42 · 1.18.0** | Tue 8 Dec | 20% Thu 10 → 100% Fri 11 Dec | Winter Bloom content, Adventure on home, starter pack (if supported) |
| vc43 | — | Fri 18 Dec, only if needed | Hotfixes only |

## 10. Experiments

| # | Test | Where | Start | Read | Ship when |
|---|---|---|---|---|---|
| E1 | Interstitials ON (every 4th game, existing guards) vs OFF, 50/50 | Firebase A/B on `ads_interstitial_enabled` | Day 1 | Day 15 | Revenue per player +30% or more, day-1 and day-3 return within 2 points, uninstalls not up |
| E2 | `remove_ads` price in Tier-1 countries | Play price experiment | Day 3 | Day 24+ | Revenue per player, not number of sales |
| E3 | Icon: current vs neon / crown / zen | Play store listing experiment (US/UK listing) | Day 3 | ~Day 14 | Play's 90% confidence |
| E4 | First two screenshots | Play store listing experiment | Day 14 | ~Day 25 | Play's 90% confidence |
| E5 | Reminder text A vs B | Remote Config (vc41) | Day 14 | Day 24 | Higher open rate |

## 11. Gates and kill switches

**Gate A — Sun 29 Nov (Day 8), data to Sat 28 Nov.** All of: vc40 crash-free ≥ 99.5% and 28-day ANR < 0.47%;
tutorial completion ≥ 80%; day-1 return ≥ 22% for installs of Days 5–7; conversions visible per campaign.
Pass → ₹500/day from Day 10. Otherwise → stay at ₹300 and fix first.

**Gate B — Wed 9 Dec (Day 18), data to Tue 8 Dec.** All of: vc41 crash-free ≥ 99.5%, ANR < 0.47%; day-1 return ≥ 28%;
revenue per Tier-1 active day ≥ ₹3 (AdMob basis, 7-day average); **Tier-1 day-7 return on spend ≥ 30%** for the
installs of Days 10–13; cost per opened install ≤ ₹30. Pass → ₹700/day (₹900 from Day 22 by §4). Otherwise → hold
₹500; below 15% → ₹300.

**Kill switches (same day):** crash-free < 99%; an ANR cluster; any AdMob policy or invalid-traffic notice; cost per
opened install > ₹35 for 3 days; spend reaching the cap in §4.

## 12. Risks

| Risk | Answer |
|---|---|
| Black Friday and Christmas push US prices up | Lower budget Days 5–9; ₹900 only under the cost rule; cut 30% if > ₹33 |
| Interstitials hurt day-one return | They ship only if E1 shows return holds (Law 5) |
| New ad SDKs bring ANRs back | vc41 staged 10/50/100% with watches; each network can be paused in AdMob without a release |
| Too few Tier-1 installs to read tests | E1 runs on all players; Tier-1 reads use 7-day cohorts and weekly sums |
| Meta stays blocked | The other four networks still compete for every ad |
| Money | Hard cap and stop-loss (§4); first AdMob payout ~21 Jan at the earliest |
| Ajay's time | ~10 h a week, planned day by day (§7); agents do the rest |

## 13. Decisions Ajay owes

| # | Decision | By | Recommendation |
|---|---|---|---|
| D1 | Monthly cap: ₹13.6k, or up to ₹18k with Gate B | Sun 22 Nov | ₹13.6k now; the extra only through Gate B |
| D2 | Pause `App-1`; Tier-1 six countries only | Sun 22 Nov | Yes |
| D3 | Interstitial test from today (E1) | Sun 22 Nov | Yes — a test with a retention guardrail |
| D4 | Delete the every-day "Weekend Cascade" (I1) | Sun 22 Nov | Yes |
| D5 | `remove_ads` Tier-1 prices or a price test (E2) | Tue 24 Nov | Price test |
| D6 | Meta route (second admin, or ID on the new phone) | Mon 23 Nov | Second admin |
| D7 | `blockbloom-notes` public or private (I8) | any time | Private, unless you want it public |

---

## Appendix A — baseline (21 Nov 2026)

| Measure | Value |
|---|---|
| Daily active players (18–21 Nov) | 115 / 79 / 95 / 63 (21st partial) |
| New installs (first opens) | 93 / 49 / 68 / 35 |
| Revenue | GA4 $3.93 for 1–21 Nov, ~$0.51 a day lately; AdMob ~$4.50 for the month |
| Day-1 / day-3 return | 14.6% / ~5% (302 installs, 4–20 Nov) |
| First session | tutorial completed by 62% of first opens; first line clear 50%; 41% uninstalled in the period |
| Ads | 20% of players saw an ad; loads 637 OK vs 989 failed; 89 rewarded views by 26 players; interstitials OFF; banner 120 s |
| eCPM (handoff) | rewarded $26.93, banner $2.50, average $5.53 |
| Purchases | `remove_ads`, `gems_small/medium/large` ACTIVE; none sold in November |
| Revenue by country | US 56% (₹3.51 per active player); India 3% (₹0.17); Pakistan 0.6% (₹0.04) |
| Paid traffic | Tier-1 campaign ₹500/day at ₹19.71 per Play install; App-1 ₹200/day at ₹2.28; 181 Cross-network installs earned 3.5% of revenue |
| Store | 10 ratings (4.9); 28-day ANR 0.85% from one 19 Nov incident, falling below 0.47% from ~23 Nov |
| Remote Config v5 | `ads_interstitial_enabled=false`, interval 4, `ads_banner_enabled=true`, `live_events` = Weekend Cascade +50% coins every day (I1) |

Full tables: `reports/growth-baseline-2026-11-21.txt`; v1.0 of this file (git history, commit 3d49bf7) §3.

## Appendix B — Tier-1 model inputs (planning assumptions; replace with measured values at each gate)

| Input | Value |
|---|---|
| Tier-1 budget | §4 ladder (`spendT1` in `growth-model-t1.js`) |
| Cost per opened Tier-1 install | ₹25; ×1.3 Days 5–9; ×1.15 Days 22–30; +15% per doubling of budget above ₹500 |
| Free installs a day | 5; +0.4 a day from Day 6; +5 on Days 6–12 (festival); +8 from Day 23 (Winter Bloom); +5% of paid |
| Day-n return | today: D1 15%, D3 5%, D7 3.5%; vc40 (installs from Day 5): D1 24%, D7 7.2%; vc41 (from Day 14): D1 30%, D7 10%; Tier-1 ×1.2, free ×1.1; −5% for players with interstitials ON |
| Revenue per active day | Tier-1 ₹1.40, free ₹0.40, players from before 22 Nov ₹0.50 (GA4 basis); ×1.3 from Day 6 (vc40), ×1.3 from Day 14 (vc41 mediation), ×1.6 for players with interstitials ON (50% from Day 2, all from Day 15 if E1 wins) |
| Purchases per install (from Day 6) | Tier-1 ₹0.5, free ₹0.3 |
| AdMob estimate | GA4 × 1.15 |

## Appendix C — refresh the numbers

```
node 01-blockbloom/scripts/growth-baseline-pull.js --end 2026-11-28 > 01-blockbloom/reports/growth-2026-11-28.txt
node 01-blockbloom/scripts/growth-model-t1.js                         # stretch (both gates pass, interstitials win)
node 01-blockbloom/scripts/growth-model-t1.js --gate-b-fails          # committed
node 01-blockbloom/scripts/growth-model-t1.js --interstitial-loses
```

## Appendix D — why not the volume paths (v1.0, for the record)

v1.0 modelled four paths with Tier-2/3 traffic (`scripts/growth-model.js`). The 1,000-installs-a-day path cost
~₹77k for ~₹14–19k of revenue inside 30 days, and its Tier-3 installs return ~8% of their cost in 90 days. The
₹10k-in-one-week question (22 Nov) was modelled in the same way: not reachable at any budget (₹97k of ads gave
~₹5–6k), because players earn ~₹0.5 a day and most leave after day one. Those numbers are why v1.1 buys Tier-1 only
and fixes the product before it scales.
