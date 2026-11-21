# Block Bloom — 30-day growth roadmap

**22 Nov – 21 Dec 2026** · v1.0 · written 21 Nov 2026, 23:55 IST, on the work laptop

**Asked for (Ajay, 21 Nov):** ₹30,000 revenue, 1,000 installs a day, 1,000+ active users.

**Built from:** GA4 property 555700046, the Play bulk reports, the Play Developer API and Firebase Remote Config,
pulled 21 Nov 23:20 IST with `scripts/growth-baseline-pull.js` (raw output: `reports/growth-baseline-2026-11-21.txt`);
the model `scripts/growth-model.js`; the app repo `main` at d0235e0 (v1.15.1, vc39); and the app repo's
`docs/PROJECT_HANDOFF_AND_STRATEGIC_ROADMAP.md` (21 Nov).

**Rules it follows:** the five laws in the app repo's `GEMINI.md` (data first, systemic fixes, brutal realism, the
four release gates, player trust) and the release flow (`release/vcNN` cut from `main`; Ajay merges to `main`).

---

## 1. The answer first

- **Today.** About 90 players a day, 35–90 new installs a day (about three in four of them from ₹700/day of Google
  Ads) and about **₹43 a day** of ad revenue (GA4, average of 18–21 Nov). That is a **₹1,300/month** run-rate.
- **The gap.** ₹30k a month is ₹1,000 a day: **23× today**. 1,000 installs a day is **~16×**. 1,000 daily
  players is **~11×**.
- **Why money spent today mostly disappears.** Only **15%** of new players come back the next day, so an install
  gives ~1.8 active days. Over that time a US player earns ~₹3.5, an Indian ₹0.17, a Pakistani ₹0.04, while a paid
  install costs ₹4–25. More ad spend today buys installs and players, but most of the money does not come back.
- **So the plan fixes the economics first and buys growth only when the data says it pays.** Days 1–10 fix
  measurement, the first session, day-one return and ad fill (vc40, vc41). Spend steps up only through two gates
  (Day 8 and Day 18). Free growth runs the whole month: Play events, store listing, ratings, referral, video.
- **What 30 days can deliver** (model in §5, every input in Appendix A):

  | Path (ad spend over 30 days) | Installs/day, Day 30 | Daily players, Day 30 | Revenue/day, Day 30 | Earned inside the 30 days |
  |---|---|---|---|---|
  | **Value-first, ₹42k** (recommended if both gates pass) | ~160 | ~480 | ₹820, or **₹1,270 if the interstitial test wins** | ₹12–17k |
  | **Full target, ₹77k** | **~1,100** | **~2,170** | **₹1,120–1,730** | ₹14–19k |

  - Only the ₹77k path hits **all three** targets, in the last week. Its 1,000 installs a day come from cheap
    Tier-3 traffic that returns about **8%** of its cost in 90 days.
  - The **₹30k/month run-rate** is reachable on the ₹42k path if the product fixes land and interstitials (OFF
    today) win their test.
  - **More than 1,000 monthly active users** happens on every path, around Day 10–14.
  - **No path earns ₹30,000 inside these 30 days** (best case ~₹19k). ₹30k a month is a Day-30 run-rate target.
- **Decide by Sunday 22 Nov:** the budget ceiling and the loss you accept (§15, D1). Days 1–7 are the same on
  every path.

## 2. The targets, defined so nobody can fool themselves

| Target | Exact definition | Source | 21 Nov | Day 30, value-first | Day 30, full target |
|---|---|---|---|---|---|
| ₹30,000 revenue | AdMob earnings + Play purchase proceeds; run-rate = last 7 days × 30 ÷ 7 | AdMob + Play Console (GA4 `totalAdRevenue` for splits) | ₹43/day | ₹820–1,270/day | ₹1,120–1,730/day |
| 1,000 installs a day | GA4 `first_open` per day, **not** Google Ads "installs" (17 Nov: Play counted 173 installs; GA4 logged 29 and 93 first opens on 17 and 18 Nov) | GA4 | 35–93 | ~160 | ~1,100 |
| 1,000+ active users | Daily active users (GA4 `activeUsers` per day); monthly actives tracked too | GA4 | DAU 63–115, MAU 413 | DAU ~480, MAU ~3,300 | DAU ~2,170, MAU ~12,000 |

**Guardrails that must hold all month:** crash-free users ≥ 99.5% · user-perceived ANR (28 days) < 0.47% ·
Play rating ≥ 4.5 · first-day uninstalls < 25% of installs · no AdMob policy or invalid-traffic notice.

The AdMob console showed $0.8–1.2/day for the same days (handoff doc) while GA4 shows less: use AdMob for the
revenue target and GA4 for the country and channel splits. ₹85 = $1 throughout.

## 3. Where we are — baseline on 21 Nov 2026

### 3.1 The last seven days

| Day (Nov) | 15 | 16 | 17 | 18 | 19 | 20 | 21* |
|---|---|---|---|---|---|---|---|
| Daily active users | 38 | 35 | 43 | 115 | 79 | 95 | 63 |
| New users (`first_open`) | 21 | 21 | 29 | 93 | 49 | 68 | 35 |
| Ad revenue, GA4 ($) | 0.05 | 0.60 | 0.27 | 0.23 | 0.44 | 0.50 | 0.86 |
| Ad impressions | 94 | 214 | 132 | 162 | 312 | 309 | 496 |
| Minutes played | 407 | 537 | 536 | 708 | 698 | 685 | 820 |

\* 21 Nov is partial (pulled 23:20 IST). Google Ads stepped up to ₹700/day on 17–18 Nov.

### 3.2 Day-one return — the biggest problem

| Install day | Installs | Back on day 1 | Day 2 | Day 3 |
|---|---|---|---|---|
| 13 Nov | 10 | 20% | 20% | 10% |
| 15 Nov | 21 | 10% | 5% | 5% |
| 16 Nov | 21 | 10% | 5% | 5% |
| 17 Nov | 29 | 17% | 3% | 3% |
| 18 Nov | 93 | 15% | 4% | 4% |
| 19 Nov | 49 | 18% | 12% | — |
| 20 Nov | 68 | 10% | — | — |

Weighted day-1 return for the installs of 4–20 Nov: **14.6%** (302 installs). Good puzzle games keep 30–40% on
day 1. An install today gives ~1.8 active days in its first month; a good puzzle game gives 3.5–4.

### 3.3 The first session (1–21 Nov, unique players)

| Step | Players | Of first opens |
|---|---|---|
| `first_open` | 376 | 100% |
| `tutorial_begin` | 359 | 95% |
| `tutorial_complete` | 234 | **62%** (65% of those who started) |
| `first_clear` (first line cleared) | 188 | **50%** |
| `first_game_over` | 98 | 26% |
| answered the notification question | 63 | 17% |
| `app_remove` (uninstalled within the period) | 156 | **41%** |

Features most players never reach: daily challenge completed by **12** players, a saga level by **8**, the lucky
chest claimed by **2** (opened by 9; its cooldown is already 2 hours, so the problem is that nobody notices it),
a result shared by **23**.

### 3.4 Where the money comes from (1–21 Nov, GA4 total $3.93)

| Country | Active players | Ad revenue | Share | Per active player |
|---|---|---|---|---|
| United States | 53 | $2.19 | **56%** | ₹3.51 |
| Netherlands | 3 | $0.32 | 8% | ₹9.18 (one heavy player) |
| India | 58 | $0.12 | 3% | ₹0.17 |
| France | 12 | $0.06 | 2% | ₹0.43 |
| Pakistan | 43 | $0.02 | 0.6% | ₹0.04 |
| Bangladesh | 31 | $0.005 | 0.1% | ₹0.01 |
| Kenya | 12 | $0.001 | 0% | ₹0.01 |
| Iran | 8 | $0 | 0% | ₹0 (AdMob serves no ads there) |

A US player earns **~20× an Indian player and ~80× a Pakistani one**. 62 players have no country (`(not set)`,
Direct, 1.7 minutes each) — most likely test devices.

### 3.5 Ads and purchases

- **Only 81 of 413 players (20%) saw any ad.**
- **Ad loads fail more often than they succeed:** 637 loaded against 989 failed (39% success). AdMob is the only
  network: the app has no mediation adapters. Tier-3 countries get little or no fill.
- **A failed rewarded ad still gives the reward.** `GameViewModel.runRewarded(onFailFallback = …)` grants it free
  (player-friendly, on purpose). With ~60% of loads failing, most revive, double-coins and free-lifeline moments
  earn ₹0.
- **Rewarded placements already built:** revive at game over, double coins, a free lifeline when out of coins,
  double daily reward, lucky chest, free coins in the shop. Completed rewarded views in November: 89, by 26
  players.
- **Interstitials are OFF** in live Remote Config (version 5: `ads_interstitial_enabled=false`, interval 4). The
  code already protects new players: none in the first 2 games, none after a rewarded view in the same run, none
  for `remove_ads` buyers.
- Banner ON, 120-second refresh. AdMob eCPM (handoff doc): rewarded **$26.93**, banner $2.50, average $5.53;
  match rate 67%.
- **Purchases:** `remove_ads`, `gems_small`, `gems_medium` and `gems_large` are **ACTIVE** in Play (Play API, 21 Nov)
  and wired in the shop. **No purchase was logged in November.** The shop is the only place they are offered.
- **Live events need no release.** The app reads Remote Config `live_events` (`FirebaseEventConfig`, wired in
  `GameViewModel`): a JSON list of `COIN_BOOST` / `DAILY_DOUBLE` events. It is not set today, so only the built-in
  weekend bonus runs.

### 3.6 Acquisition and attribution

- Google Ads (handoff audit, 20–21 Nov): `BlockBloom-Tier1-US-EU` ₹500/day, 50 installs at ₹19.71; `App-1`
  (global) ₹200/day, 91 installs at ₹2.28. Both limited by budget; prepaid funds low.
- GA4 credits **181** November installs to "Cross-network" (Google's app campaigns): Pakistan 38, India 34,
  Bangladesh 31, Kenya 11, France 10, US 9 and others. They earned **$0.14 — about 3.5% of revenue.**
- GA4 credits **36 US installs to "Direct"**. They earned **$1.46 (37% of all revenue)** and played 25 hours.
  "Direct" installs rose from a few a day to ~15 a day (4–30) from 15 Nov. **The Tier-1 campaign's installs are most
  likely landing in "Direct"**: until that is fixed, nobody can say what each campaign returns.
- Free installs: ~2–8 a day.

### 3.7 Store and stability

- v1.15.1 (vc39) at 100%: crash-free 100%, 0 ANRs (Crashlytics). Play's 28-day ANR rate is 0.85% from one v1.15.0
  incident (19 Nov) and should fall below the 0.47% line from ~23 Nov.
- **Only 10 ratings** (nine 5-star, one 4-star): the Play average stepped 29/6 → 34/7 → 39/8 → 44/9 → 49/10 between
  20 Oct and 3 Nov. The app requested a review 316 times (168 players), but Play shows the dialog only within its
  own quota.
- Listing: six Aurora Glass screenshots, 13 locales, refreshed copy (handoff doc). The Play acquisition report
  (store visitors → installers) is not in the bulk-report bucket, so read it in Play Console → Store performance.

## 4. Six leaks, ranked by what they cost the targets

| # | Leak | Evidence | What it does to the targets | Fixed by |
|---|---|---|---|---|
| 1 | Players leave after day one | D1 14.6%, D3 ~5% | Every daily-player target needs ~2× the installs | W2 (vc40, vc41) |
| 2 | A third quit in the tutorial; half never clear a line | 62% complete; 50% first clear | Day-one return can't rise until this does | W2.1 (vc40) |
| 3 | Ads rarely shown and mostly unfilled; purchases never offered in context | 20% see an ad; 39% load success; reward given free on failure; 0 purchases | Revenue per player stays ~₹0.5 | W3 (vc40, vc41) |
| 4 | Paid traffic aimed at countries that earn nothing | 181 Cross-network installs → 3.5% of revenue | Spend buys installs, not money | W4 |
| 5 | Can't see which campaign works | Tier-1 installs show as "Direct"; Google optimises for installs, not players who stay | Can't scale what works or cut what doesn't | W1 |
| 6 | Almost no free installs | 2–8 a day; 10 ratings; no Play event yet; share has no referral link | Every install has to be bought | W5 |

## 5. The growth model

### 5.1 One equation

```
revenue per day  = daily players × revenue per daily player
daily players    = Σ (past installs × share of them still active that day)  ≈ installs per day × active days per install
installs per day = free installs + Σ (campaign spend ÷ cost per opened install)
```

`scripts/growth-model.js` runs this day by day for Days 1–30 with the inputs in Appendix A.

### 5.2 What ₹1,000 a day needs

2,000 daily players × ₹0.50 (today's mix) · 1,000 × ₹1.00 · 700 × ₹1.43 · 400 × ₹2.50 (Tier-1 heavy, after the
fixes). Two levers move it: more revenue per player (W3) and a richer country mix (W4).

### 5.3 What an install is worth against what it costs (90 days)

| Tier | Countries | Cost per opened install | Worth today | After vc40 + vc41 | + interstitial test wins | 90-day payback |
|---|---|---|---|---|---|---|
| T1 | US, UK, CA, AU, NZ, IE | ₹25 | ₹3.5 | ₹16.6 | ₹26.2 | **105%** |
| T2 | BR, MX, ID, PH, MY, TH, TR, ZA | ₹8 | ₹0.7 | ₹3.1 | ₹4.9 | 61% |
| T3 | IN, PK, BD, KE and similar | ₹4 | ₹0.1 | ₹0.2 | ₹0.3 | **8%** |

T2 revenue per player is an assumption (few T2 players so far): measure it in Weeks 1–2. **Tier-1 can pay back in
~90 days, but only if all three product fixes land. Tier-3 never pays back: it buys installs and daily players,
not money.**

### 5.4 Four budget paths

| Path | Ad spend | Installs/day D30 | DAU D30 | MAU D30 | Revenue/day D30 | Run-rate D30 | Earned in 30 days | Net in 30 days |
|---|---|---|---|---|---|---|---|---|
| A Organic-first | ₹9.9k | 57 | 179 | ~1,340 | ₹223 (₹344*) | ₹6.7k (₹10.3k*) | ₹3.9k (₹5.1k*) | −₹6.0k (−₹4.8k*) |
| B Gated growth | ₹23.9k | 106 | 322 | ~2,420 | ₹420 (₹653*) | ₹12.6k (₹19.6k*) | ₹7.2k (₹9.6k*) | −₹16.7k (−₹14.3k*) |
| **B+ Value-first** | **₹41.9k** | 161 | 479 | ~3,290 | ₹816 (**₹1,274***) | ₹24.5k (**₹38.2k***) | ₹12.0k (₹16.7k*) | −₹29.9k (−₹25.2k*) |
| C Full target | ₹76.9k | **1,106** | **2,167** | ~12,180 | ₹1,116 (₹1,733*) | ₹33.5k (₹52.0k*) | ₹13.7k (₹19.1k*) | −₹63.2k (−₹57.8k*) |

\* if the interstitial test wins (+60% revenue per player from Day 19).
"Net in 30 days" leaves out what these players keep earning after Day 30; for Tier-1 players that is most of their
value.

### 5.5 Recommendation

1. **Run Phase 1 (Days 1–10) whatever the path.** It costs ₹700 a day and every later lever depends on it.
2. **Default to B+ (value-first).** Tier-1-heavy spend is the only spend that can pay itself back, and B+ reaches the
   ₹30k/month run-rate if the fixes and the interstitial test land.
3. **Treat C as a deliberate, capped visibility buy, not a revenue plan.** If 1,000 installs a day matters as a
   milestone (store-chart rank, momentum), run the C burst on Days 24–30 in **India only** (the best-engaged Tier-3
   market: 23 minutes per player), and only after Gate B passes.
4. **Never scale through a failed gate.** Hold spend and fix the product; the money is worth more in next month's
   better funnel.

## 6. Three phases

| Phase | Days | Dates | Goal | Ends when |
|---|---|---|---|---|
| **1 FIX** | 1–10 | Sun 22 Nov – Tue 1 Dec | Measurement fixed, vc40 live, paid traffic re-aimed, Aurora Bloom Festival live | Gate A passed (Day 8) and vc41 in internal testing (Day 10) |
| **2 PROVE** | 11–20 | Wed 2 Dec – Fri 11 Dec | vc41 live (ad fill, daily loop, referral), interstitial test read, Stage-2 spend | Gate B decided (Day 18), vc42 in internal testing |
| **3 SCALE** | 21–30 | Sat 12 Dec – Mon 21 Dec | Winter Bloom event, Stage-3 spend or the India burst, December's high ad prices | Day-30 review and the next 30-day plan |

## 7. Workstreams — what gets done

Owners: **Ajay** = consoles, money, accounts, posts. **Agent** = Claude or Gemini: code, scripts, copy drafts,
reports. "D5" = Day 5.

### W1 Measure (fixes leak 5; first, because every gate depends on it)

| # | Do | Owner | By | Done when |
|---|---|---|---|---|
| W1.1 | Link Google Ads with Firebase / GA4 (Google Ads → Tools → Data manager). Import `first_open`, `tutorial_complete` and `first_clear` as conversions and mark them as key events in GA4, so app-campaign installs stop landing in "Direct" | Ajay | D1 | Each campaign shows its own conversions in Google Ads and GA4 by D3 |
| W1.2 | `tools/growth-kpi.js` in the app repo (built from `scripts/growth-baseline-pull.js`): daily players, first opens by channel × country, D1 / D3 / D7 by tier, revenue per player by tier, ad reach, ad load success, purchases; a weekly report into this repo's `reports/` | Agent | D2 | One command prints the scoreboard in §13 |
| W1.3 | Spend log `growth/spend-2026-11.csv` (date, campaign, spend ₹, Play installs, conversions), 2 minutes a day from Google Ads | Ajay | daily | Gates use real spend |
| W1.4 | New events in vc40: `tutorial_step` (step n), `rewarded_offer` (placement; result shown / no_fill / fallback_grant), `interstitial_shown`, `offer_shown` / `offer_tap` / `purchase` (product), user property `session_number` | Agent | vc40 | Each leak is measurable per step and placement |
| W1.5 | Firebase A/B Testing ready for Remote Config experiments | Agent + Ajay | D4 | E1 can start on D5 |

### W2 Keep players (leaks 1 and 2)

| # | Do | Owner | Release | Target |
|---|---|---|---|---|
| W2.1 | **Onboarding v2.** A pre-set first board so the first piece clears a line within ~10 seconds; at most 3 steps; skip after step 1; no dialog or ad before the first game ends; celebrate the first clear | Agent | vc40 | Tutorial completion ≥ 85% of first opens (from 62%); first clear ≥ 75% (from 50%) |
| W2.2 | **First-session hook.** The first game-over screen shows the personal best, "Daily Challenge unlocked" and tomorrow's streak reward. The notification question comes here, after a good first game, with the reason ("we'll tell you before your streak breaks") | Agent | vc40 | Question shown to ≥ 60% of new players (from 17%) |
| W2.3 | **Daily loop on the home screen.** Daily Challenge card, streak ladder (day 1 / 3 / 7 rewards), a "come back tomorrow" chest | Agent | vc41 | Daily challenge done by ≥ 20% of daily players (from 3%) |
| W2.4 | **Reminders v2.** At most one local reminder a day, at the player's usual play hour, only when the streak is at risk; two texts tested in Remote Config (E3) | Agent | vc41 | ≥ 5% of reminders opened (2 opens so far) |
| W2.5 | **Adventure (saga) next to Classic** on the home screen; levels 1–10 made winnable | Agent | vc42 | `level_complete` by ≥ 25% of new players (8 players so far) |
| W2.6 | Friction-only fixes from the P0 list of the 19 Nov UI/UX PDF (for example the Shop ribbon wrap); no new visual direction inside this plan | Agent | vc41 | — |
| W2.7 | Uninstall watch: `app_remove` by days since install in the KPI script | Agent | D2 | First-day uninstalls < 25% |

### W3 Earn more per player (leak 3)

| # | Do | Owner | Release | Target |
|---|---|---|---|---|
| W3.1 | **Ad fill: mediation.** AdMob bidding with AppLovin, Pangle, Mintegral and Liftoff (Meta joins once its account verification is done). Adapter versions must compile under the Kotlin 1.9 metadata pins noted in `app/build.gradle.kts`. Ajay opens each network account (payment + tax details); Agent adds the adapters and the AdMob mediation groups | Agent + Ajay | vc41 | Ad load success ≥ 70% (from 39%); eCPM +20–40% |
| W3.2 | **Interstitial test (E1).** Live Remote Config has interstitials OFF. Test ON (every 4th game, with the existing guards) against OFF. vc40 adds a 150-second minimum gap between interstitials. Primary metric: revenue per player. Guardrails: day-1 and day-3 return within 2 points, uninstalls not up | Agent + Ajay | gap rule in vc40; test D5 → D18 | Ship the winner on D18 |
| W3.3 | **Rewarded ready on time.** Preload a rewarded ad before game over, retry with backoff, show the "watch" buttons only when an ad is ready, and log every `fallback_grant` (W1.4). The free fallback stays (player trust); mediation is what turns those moments into revenue | Agent | vc40 | Fallback grants < 30% of rewarded moments after vc41 |
| W3.4 | **Purchases in context.** Offer `remove_ads` after the 3rd interstitial or the 5th session (never in session 1), in the pause menu, and at game over for players on day 3+. Play price experiment on `remove_ads` (E6). A starter pack (gems + remove ads) in vc42 if `offer_tap` ≥ 3% | Agent + Ajay | vc40 / vc42 | ≥ 0.5% of day-7 players buy |
| W3.5 | **Lucky chest people notice.** A "ready" badge on the home chest and a nudge after game over when it is ready (9 players opened it in November) | Agent | vc40 | Chest claims by ≥ 15% of daily players |
| W3.6 | **Ride December ad prices.** They rise through the weeks before Christmas and drop in early January: time the Winter event and any burst for 14–21 Dec | Ajay | D23–30 | — |

### W4 Paid acquisition (leak 4)

| # | Do | Owner | By |
|---|---|---|---|
| W4.1 | **Re-aim the campaigns.** Keep `BlockBloom-Tier1-US-EU` but limit it to US, UK, CA, AU, NZ, IE (add FR/DE back later as their own campaign once English Tier-1 pays). Pause `App-1`. Start `BB-T2-Test` (BR, MX, ID, PH, MY, TH, TR, ZA) at a ₹8 target per install. Exclude everywhere the countries where AdMob serves no ads (Iran, Syria, Cuba, North Korea) and those that earned nothing this month (e.g. Somalia) | Ajay | D1 |
| W4.2 | **Creatives:** 5 portrait videos of 15–30 s (a combo cascade, a satisfying full-board clear, the Aurora Glass theme switch, the daily challenge, "no Wi-Fi needed"), 5 landscape, 10 images, 5 headlines, 5 descriptions. Ajay records the phone screen; Agent writes the copy and cuts | Ajay + Agent | D3 |
| W4.3 | **Bidding:** a target cost per install (T1 ₹25, T2 ₹8); move T1 to in-app-action bidding on `tutorial_complete` once it logs ≥ 10 conversions a day; ad-revenue value bidding once ≥ 10 valued conversions a day | Ajay | D8 / D18 |
| W4.4 | **Black Friday week** (26–30 Nov): US prices spike, so hold T1 flat and put any extra into T2 | Ajay | D5–9 |
| W4.5 | **Daily rules:** pause a campaign that runs above 1.5× its target cost per opened install for 3 days, or whose day-1 return is below 15% after 100 installs; raise any budget by at most 30% every 2 days (bigger jumps restart Google's learning) | Ajay | daily |
| W4.6 | **India burst (path C only):** `BB-T3-IN-Burst`, Days 24–30, up to ₹3,000 a day, only after Gate B | Ajay | D24 |

Budgets per stage are in §11.

### W5 Free installs (leak 6)

| # | Do | Owner | By | Target |
|---|---|---|---|---|
| W5.1 | **Store listing words** (en-US, en-IN) with long-tail keywords: "offline block puzzle", "block puzzle no wifi", "zen block puzzle", "relaxing 8x8 block game", "brain puzzle". Agent drafts all 13 locales | Agent → Ajay | D3 | Organic-search installs ×2 by D21 |
| W5.2 | **Store listing experiments:** the icon (the three designed variants in the app repo's `store/`: neon, crown, zen) against the current one (E4); then the first two screenshots (E5) | Ajay | D3, D14 | Store conversion +10–20% |
| W5.3 | **Ratings engine:** ask only after a personal best or on the 3rd+ session, never after a loss, at most once in 30 days; reply to every review within 24 hours; never reward a rating (Play policy) | Agent (vc40) + Ajay | vc40 | 40+ ratings by D30 (from 10) |
| W5.4 | **Aurora Bloom Festival, 27 Nov – 3 Dec, with no release:** set Remote Config `live_events` to a `COIN_BOOST` event with one date condition per day (so "ends in N days" counts down unattended); match it with the Play promotional-content card (confirm it was submitted; if not, submit today and start it when approved); push a message to opted-in players on the first day. **To end it, delete the parameter — an empty list `[]` also switches off the built-in weekend bonus.** The payload replaces the weekend bonus while set, so add it on the Saturday and Sunday | Agent drafts → Ajay publishes | D1–D6 | Installs and returns up in festival week |
| W5.5 | **Winter Bloom, 14 – 21 Dec:** Play card submitted by D10; in-game content in vc42 (theme, limited-time challenge, rewards), plus `live_events` | Ajay + Agent | D10, vc42 | Same |
| W5.6 | **Referral:** a share card with the score image and a link carrying a Play install referrer; both players get gems when the friend finishes a first game | Agent | vc41 | 5% of daily players share; 0.2 installs per share |
| W5.7 | **Short video:** every Sunday, record 7 clips in one sitting and schedule one a day on YouTube Shorts and Instagram Reels (scheduling only, no browsing) | Ajay, 1 h a week | D1, D8, D15, D22 | One clip above 10k views by D30 |
| W5.8 | **Communities:** r/AndroidGaming, r/playmygame, r/IndieDev; ask for feedback and follow each community's self-promotion rules | Ajay, 20 min twice a week | from D3 | 5 posts |
| W5.9 | **Landing page** at ajay-waghmare.github.io/blockbloom: Play badge, screenshots, one video, the keywords | Agent | D5 | Linked from every post |
| W5.10 | **Cross-promotion** with Arrow Bloom (a "More games" card) | Agent | vc42 | Small, free |

## 8. Release train

Every release: feature branches → `release/vcNN` cut from `main` → AAB from the release branch → the four gates in
the app repo's `MAJOR_ISSUES_AND_GO_LIVE_CHECKLIST.md` → staged rollout → Ajay merges the release branch to `main`
once it is at 100%, before the next one is cut.

| Release | Build | Internal | Production | Contents |
|---|---|---|---|---|
| **vc40 · 1.16.0** | D2–3 (23–24 Nov) | D3 | D4 20% → D5 100% (Thu 26 Nov, before the festival) | W1.4 events · W2.1 onboarding v2 · W2.2 first-session hook · W3.2 interstitial gap · W3.3 rewarded preload · W3.4 purchase offers · W3.5 chest badge · W5.3 ratings rule. **No new SDKs.** |
| **vc41 · 1.17.0** | D9–10 (30 Nov – 1 Dec) | D10 | D11 10% → D12 50% → D14 100% (Sat 5 Dec), crash and ANR watch at every step | W3.1 mediation adapters · W2.3 daily loop · W2.4 reminders v2 · W5.6 referral · W2.6 friction fixes |
| **vc42 · 1.18.0** | D17–18 (8–9 Dec) | D18 | D19 20% → D21 100% (Sat 12 Dec) | Winter Bloom content · W2.5 Adventure on home · starter pack (if W3.4 supports it) · W5.10 cross-promotion |
| vc43 | D25–26 | — | D27 | Hotfix slot only: no features, no SDKs |

## 9. Experiments that need no release

| # | Test | Where | Start | Read | Winner rule |
|---|---|---|---|---|---|
| E1 | Interstitials ON (every 4th game, existing guards) vs OFF | Firebase A/B on `ads_interstitial_enabled` | D5 (vc40 at 100%) | D18 | Revenue per player up ≥ 30%, day-1 and day-3 return within 2 points, uninstalls not up |
| E2 | Banner ON vs OFF for new players | Firebase A/B on `ads_banner_enabled`, new players only | D5 | D18 | Keep the banner only if day-1 return does not fall more than 2 points |
| E3 | Reminder text A vs B | Remote Config (vc41) | D14 | D24 | Higher open rate |
| E4 | Icon: current vs neon vs crown vs zen | Play store listing experiment | D3 | ~D14 | Play's 90% confidence |
| E5 | First two screenshots | Play store listing experiment | D14 | ~D25 | Play's 90% confidence |
| E6 | `remove_ads` at ₹149 / ₹199 / ₹249 | Play price experiment | D3 | D24 or later | Revenue per player, not number of purchases |

## 10. Calendar

### Week 1 — fix (Sun 22 – Sat 28 Nov)

| Day | Date | Ajay | Agent |
|---|---|---|---|
| 1 | Sun 22 Nov | **D1 budget + loss cap.** W1.1 link Google Ads ↔ GA4 and import conversions. W4.1 re-aim campaigns, pause App-1, prepay 7 days (~₹4.9k). Confirm the festival card (W5.4). Read store conversion in Play Console. Record 7 clips (W5.7) | Cut `release/vc40`; start W2.1 and W1.4; W1.2 KPI script; draft the festival `live_events` template |
| 2 | Mon 23 Nov | Check the 28-day ANR fell below 0.47%. Decide D3 (interstitial test) and D5 (Meta route) | KPI script's first daily report. vc40: W2.2, W3.3, W3.4, W3.5, W5.3 |
| 3 | Tue 24 Nov | Approve the listing words (W5.1); start E4 and E6; creatives into both campaigns (W4.2) | vc40 internal build; gates 1–3 (R8 release build, a thread-safety review of every new ad call, emulator + phone run) |
| 4 | Wed 25 Nov | vc40 to 20% of production. AdMob: check the blocking controls and app-ads.txt | Watch Crashlytics and ANRs for 24 hours; W5.9 landing page |
| 5 | Thu 26 Nov | vc40 to 100% if crash-free ≥ 99.5% and no ANR cluster. Start E1 and E2 | Release notes in 13 locales; start `release/vc41` (W3.1 adapters first) |
| 6 | Fri 27 Nov | **Aurora Bloom Festival live** (Black Friday): publish `live_events`, push message | Check the in-game event matches the Play card day by day |
| 7 | Sat 28 Nov | Weekly review #1 (30 min) | Weekly report into `reports/`; Gate A pre-read |

### Week 2 — prove (Sun 29 Nov – Sat 5 Dec)

| Day | Date | What |
|---|---|---|
| 8 | Sun 29 Nov | **Gate A** (§12); budget to Stage 2 if it passes. Clips batch #2 |
| 9–10 | 30 Nov – 1 Dec | vc41 build and internal test; mediation network accounts live (Ajay); **Winter Bloom Play card submitted by D10**; delete the festival `live_events` on 4 Dec |
| 11–14 | 2–5 Dec | vc41 10% → 50% → 100%; T1 to in-app-action bidding if ≥ 10 conversions a day; weekly review #2 on Sat 5 Dec; apply the icon winner if E4 is significant; start E5 |

### Week 3 — ramp what works (Sun 6 – Sat 12 Dec)

| Day | Date | What |
|---|---|---|
| 15–17 | 6–8 Dec | vc42 build (Winter Bloom, Adventure on home); clips batch #3 |
| 18 | Wed 9 Dec | **Gate B** (§12) and the E1/E2 reads. Choose: hold, B+ Stage 3, or the C burst |
| 19–21 | 10–12 Dec | vc42 to 100%; Stage-3 budgets; weekly review #3 |

### Week 4 — scale (Sun 13 – Mon 21 Dec)

| Day | Date | What |
|---|---|---|
| 22 | Sun 13 Dec | Clips batch #4 (winter theme) |
| 23 | Mon 14 Dec | **Winter Bloom live** (Play card + in-game event + `live_events`); push message |
| 24–30 | 15–21 Dec | Path C only: the India burst, up to ₹3,000 a day, with daily kill checks. Everyone: vc43 hotfix slot (D27) |
| 30 | Mon 21 Dec | **Day-30 review** against §2; write the next 30 days (holiday peak, then January's lower ad prices) |

## 11. Paid budget by stage (₹ per day)

| Stage | Days | B Gated (₹23.9k) | **B+ Value-first (₹41.9k)** | C Full target (₹76.9k) |
|---|---|---|---|---|
| 1 | 1–7 | T1 400 + T2 200 = **600** | T1 500 + T2 200 = **700** | T1 500 + T2 200 = **700** |
| 2 (after Gate A) | 8–17 | T1 500 + T2 300 = **800** | T1 800 + T2 300 = **1,100** | T1 700 + T2 500 + T3 300 = **1,500** |
| 3 (after Gate B) | 18–30 | T1 500 + T2 400 = **900** | T1 1,500 + T2 500 = **2,000** | D18–23: 900 + 900 + 700 = **2,500**; D24–30: 1,200 + 1,800 + 3,000 = **6,000** |

A failed gate keeps the previous stage. Prepay Google Ads one week at a time.

## 12. Gates and kill switches

**Gate A — Sun 29 Nov (Day 8), on data to Sat 28 Nov.** Passes when all of these hold:
1. vc40 crash-free ≥ 99.5%; 28-day ANR < 0.47%; no new ANR cluster.
2. Tutorial completion ≥ 80% of first opens for vc40 players.
3. Day-1 return ≥ 22% for the installs of D5–D7 (≥ 28% for Tier-1 and free installs).
4. Conversions visible per campaign (W1.1 done).

Pass: Stage 2. Partial: stay on Stage 1 and fix. A stability failure: hold spend and hotfix.

**Gate B — Wed 9 Dec (Day 18), on data to Tue 8 Dec.** Passes when all of these hold:
1. vc41 crash-free ≥ 99.5%; ANR < 0.47% (the new ad SDKs are the risk).
2. Day-1 return ≥ 28% for vc41 installs; day-7 ≥ 8% for vc40 installs.
3. Tier-1 revenue per daily player ≥ ₹2.5 (7-day average); blended ≥ ₹0.9.
4. Day-7 return on ad spend: Tier-1 ≥ 35%, Tier-2 ≥ 20% (a cohort's revenue in its first 7 days ÷ its spend).
5. E1 read (ship the winner either way).

Pass: Stage 3 of B+, or the C burst if chosen (§15, D7). Fail: stay on Stage 2 or step down.

**Kill switches — any day, acted on the same day:** crash-free < 99% · an ANR cluster · any AdMob policy or
invalid-traffic notice (pause Tier-3 first) · a campaign above 1.5× its target cost for 3 days · cumulative net
spend reaching the loss cap (D1).

## 13. Scoreboard — weekly targets

| Check | Date | B+ installs/day | B+ DAU | B+ ₹/day | C installs/day | C DAU | C ₹/day | Spend so far (B+ / C) |
|---|---|---|---|---|---|---|---|---|
| Day 7 | Sat 28 Nov | 57 | 113 | 112 | 57 | 113 | 112 | ₹4.9k / ₹4.9k |
| Day 14 | Sat 5 Dec | 83 | 200 | 332 | 184 | 361 | 356 | ₹12.6k / ₹15.4k |
| Day 21 | Sat 12 Dec | 143 | 348 | 608 | 354 | 705 | 570 | ₹23.9k / ₹29.9k |
| Day 30 | Mon 21 Dec | 161 | 479 | 816 (1,274*) | 1,106 | 2,167 | 1,116 (1,733*) | ₹41.9k / ₹76.9k |

\* if the interstitial test wins.

Product metrics (the same on every path):

| Metric | 21 Nov | Day 7 | Day 14 | Day 21 | Day 30 |
|---|---|---|---|---|---|
| Day-1 return | 14.6% | 22% | 28% | 30% | 30%+ |
| Tutorial completion (of first opens) | 62% | 80% | 85% | 85% | 85% |
| Players who see an ad | 20% | 30% | 40% | 50% | 50% |
| Ad load success | 39% | 39% | 70% | 70% | 70% |
| Ratings in total | 10 | 15 | 22 | 30 | 40 |
| Free installs a day | 5 | 10 | 12 | 15 | 25 |

Cadence: 5 minutes a day (KPI script + spend log), 30 minutes every Saturday (weekly report → journal), the gates
on D8 and D18.

## 14. Risks

| Risk | Signal | Answer |
|---|---|---|
| Black Friday prices (US, 26–30 Nov) | T1 cost above ₹33 | Hold T1 flat, shift to T2 (W4.4) |
| New ad SDKs bring ANRs back (the 19 Nov incident) | Crashlytics ANRs, Play vitals | vc41 staged 10 / 50 / 100% with a watch at every step; any network can be paused in AdMob without a release |
| Interstitials hurt day-one return | E1 guardrails | Ship them only if D1 and D3 hold (Law 5) |
| AdMob invalid traffic from cheap installs | AdMob policy centre | Tier-3 only in the C burst, India only, kill switch |
| Google Ads stops (prepaid funds) | Account alert | Prepay weekly |
| Play policy (rewarded ratings, misleading ads) | Policy email | Never reward ratings; creatives show real gameplay |
| Meta verification stays blocked | Meta account | Mediation without Meta still lifts fill |
| Ajay's time | Daily checks missed | 45–60 minutes on weekdays, 2–3 hours on Sunday (§16); agents do the rest |
| Data lag | Play bulk reports ~9 days behind; GA4 ~1 day | Decide on GA4 + AdMob + Google Ads; Play only for vitals and ratings |
| Money | Net spend against the cap | Loss cap (D1); AdMob pays monthly, only above $100 |

## 15. Decisions Ajay owes

| # | Decision | By | Recommendation |
|---|---|---|---|
| D1 | Budget path and monthly loss cap | Sun 22 Nov | Approve Stage 1 now (₹700/day, ~₹4.9k for the week); choose B or B+ at Gate A; C only at Gate B |
| D2 | Pause App-1 and exclude the no-ad countries | Sun 22 Nov | Yes |
| D3 | Interstitial and banner tests (E1, E2) with the guardrails in §9 | Mon 23 Nov | Yes: tests with a retention guardrail, not a rollout |
| D4 | `remove_ads` price range for E6 | Tue 24 Nov | ₹149 / ₹199 / ₹249 |
| D5 | Meta verification route (invite a second admin, or ID on the new phone) | Mon 23 Nov | Second admin, the faster one |
| D6 | Winter Bloom theme and dates | Sat 28 Nov | 14–21 Dec |
| D7 | Path at Gate B: hold, B+ Stage 3, or the C burst | Wed 9 Dec | Follow the gate |
| D8 | UI direction from the 19 Nov PDF | after Day 30 | Only friction fixes inside this plan |

## 16. Time

- **Ajay:** about 45–60 minutes each weekday (consoles, Google Ads, reviews, approvals) and 2–3 hours on Sunday
  (clips, weekly review, decisions): about 10 hours a week.
- **Agents:** vc40–vc43, the KPI script, copy in 13 locales, the landing page, the weekly reports and journal entries.

---

## Appendix A — model inputs (planning assumptions; replace each with the measured value at the gates)

| Input | Value | Basis |
|---|---|---|
| Day-n return today (R0) | D1 15%, D2 7%, D3 5%, D7 3.5%, then × (7/n)^0.8 | Measured cohorts, 4–20 Nov |
| After vc40 (R1, installs from D5) | D1 24%, D2 14%, D3 11%, D7 7.2%, tail exponent 0.75 | Onboarding and first-session fixes |
| After vc41 (R2, installs from D12) | D1 30%, D2 19%, D3 15%, D7 10%, tail exponent 0.7 | Daily loop, reminders, referral |
| Tier multiplier on return | T1 1.2 · free 1.1 · T2 1.0 · T3 0.6 | Paid Tier-3 traffic returns least |
| Revenue per daily player | T1 ₹1.40 · T2 ₹0.30 · T3 ₹0.03 · free ₹0.40 · players from before 22 Nov ₹0.50 | Measured by country, 1–21 Nov; T2 assumed |
| Revenue multiplier | ×1.6 from D6 (vc40) · ×2.1 from D13 (vc41 mediation) · ×1.6 more from D19 if E1 wins | Assumed |
| Purchases per install (from D6) | T1 ₹0.5 · free ₹0.5 · T2 ₹0.1 · T3 ₹0 | Assumed (no purchase yet) |
| Cost per opened install | T1 ₹25 (×1.3 on D5–9) · T2 ₹8 · T3 ₹4 | Google Ads ₹19.71 and ₹2.28 per Play install ÷ the share that open the app |
| Free installs a day | 5 + 0.6 a day from D6; +8 on D6–12 (festival); +12 from D24 (Winter Bloom); + 5% of paid installs | Assumed |
| Players from before 22 Nov | 32 on D1, falling to ~15 by D30 | Measured returning players |
| Exchange rate | ₹85 = $1 | — |

## Appendix B — refresh the numbers

```
node 01-blockbloom/scripts/growth-baseline-pull.js --end 2026-11-28 > 01-blockbloom/reports/growth-2026-11-28.txt
node 01-blockbloom/scripts/growth-model.js
node 01-blockbloom/scripts/growth-model.js --interstitial-win
```

The pull is read-only and takes the service-account key by path (`--sa`, else `PLAY_SA_FILE`, else the known
paths on the two laptops); it never prints the key. Change the model's inputs at the top of `growth-model.js`.

## Appendix C — words used here

- **DAU / MAU:** players active on a day / in the last 30 days (GA4 `activeUsers`).
- **Day-1 return (D1):** share of a day's installs that play again the next day; D3 and D7 likewise.
- **Revenue per daily player:** a day's revenue ÷ that day's daily players (ARPDAU).
- **Cost per opened install:** ad spend ÷ installs that opened the app (GA4 `first_open`).
- **Return on ad spend (ROAS):** revenue from a cohort ÷ what its installs cost; "day-7 ROAS" counts its first 7 days.
- **Tier-1 / 2 / 3:** country groups by how much an ad view pays (§5.3).
- **Fill / load success:** share of ad requests that return an ad.
- **Fallback grant:** a rewarded moment where the ad failed and the reward was given free.
- **Gate:** a dated check that decides whether spend may step up.
