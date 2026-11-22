# Block Bloom — day-by-day plan v2: organic first, ads in bursts (Mon 23 Nov – Thu 31 Dec 2026)

**v2, written 22 Nov 2026 (evening).** Replaces v1 (Sun 22 Nov – Mon 21 Dec, ≈ ₹14k of every-day ads; in git history at
commit `721fdb8`). Why:
- v1's own model lost money: about −₹7.4k by Day 30, and the ad money did not come back within 90 days.
- Ajay, 22 Nov: *"focus more on organic users gain, majorly in Tier-1 countries; then paid campaigns, smartly done, so
  we get more users on that campaign day."*
- v2 spends ₹3,500 for sure (₹10,500 at most) and makes a profit in the model: **+₹1.6k by 31 Dec, +₹9.5k by 20 Feb.**

**Who owns what.** Ajay, 22 Nov: *"All the things have to be owned by Gemini."*
- **Gemini owns the plan and everything in it:** code, builds, releases, Remote Config, store listing and review
  replies through the Play API, KPI tool, reports, research, and updates to this plan (`../gemini-skills/`).
- **Ajay:** payments, approvals (each release to 100%, each burst), posts from his own accounts, clips on his phone,
  creator emails from his address, and Play Console screens the API cannot reach.
- **Claude:** guides when asked (reviews Gemini's weekly strategy note); no tasks.

IDs: `C-xx` = `03-console-runbooks.md`; `V40-x`, `V41-0x`, `V42-0x` = `02-gemini-dev-specs.md`; `M-§n` =
`04-measurement-and-gates.md`; `CP` = `05-content-pack.md`; `O-x` = `06-organic-tier1.md`; bursts = `07-ad-bursts.md`.

**Already done on Sun 22 Nov (Gemini, see `journal/2026-11-22.md`):**
- App-1 paused.
- Tier-1 campaign renamed `BlockBloom-Tier1-EN`, set to 6 countries, ₹400/day and target CPI ₹25. It is still running
  and is paused on Day 1 below.
- E1 interstitial test running at 50/50.
- GA4 key events and links done; Google Ads conversions imported.
- `live_events` deleted (Remote Config v6).
- `release/vc40` cut; V40-5 (honest Shop banner) and V40-6 (interstitial gap, code default OFF) done.
- First `tools/growth-kpi.js` built.

## Money to 31 Dec (details and rules: `07-ad-bursts.md`)

| | Dates | Daily | Total |
|---|---|---|---|
| Ads off | Mon 23 Nov – Fri 11 Dec | ₹0 | ₹0 |
| **Burst 1 — Winter Bloom launch (test)** | Sat 12 – Fri 18 Dec | ₹500 | **₹3,500** |
| Ads off | Sat 19 – Thu 24 Dec | ₹0 | ₹0 |
| Burst 2 — Christmas week, only if Burst 1's day-7 return ≥ 40% | Fri 25 – Thu 31 Dec | ₹1,000 | ₹7,000 |
| **Total** | | | **₹3,500 committed · ₹10,500 at most** |

The ₹1,310 left in Google Ads on 22 Nov stays there for Burst 1: no payment until Wed 9 Dec.

## Daily targets (committed path; model `../scripts/growth-model-v2.js`)

| Day | Date | What happens | Ads ₹ | Tier-1 free downloads | Paid installs | All downloads | Daily players | Tier-1 players | Revenue ₹ | Profit so far ₹ |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Mon 23 Nov | Tier-1 campaign paused; listing fixed | 0 | 2 | – | 6 | 38 | 2 | 30 | 30 |
| 2 | Tue 24 Nov |  | 0 | 2 | – | 6 | 37 | 2 | 30 | 61 |
| 3 | Wed 25 Nov | vc40 20% | 0 | 2 | – | 6 | 36 | 3 | 30 | 91 |
| 4 | Thu 26 Nov | vc40 100% (US Thanksgiving) | 0 | 2 | – | 6 | 35 | 3 | 29 | 120 |
| 5 | Fri 27 Nov | Festival starts (Black Friday) | 0 | 3 | – | 7 | 36 | 4 | 40 | 160 |
| 6 | Sat 28 Nov | Winter Bloom card submitted | 0 | 3 | – | 7 | 36 | 4 | 41 | 202 |
| 7 | Sun 29 Nov |  | 0 | 3 | – | 7 | 36 | 5 | 45 | 247 |
| 8 | Mon 30 Nov | Check A | 0 | 3 | – | 7 | 35 | 5 | 45 | 292 |
| 9 | Tue 01 Dec |  | 0 | 3 | – | 7 | 35 | 6 | 46 | 338 |
| 10 | Wed 02 Dec | vc41 10% | 0 | 3 | – | 7 | 35 | 6 | 46 | 384 |
| 11 | Thu 03 Dec | vc41 50%; festival ends | 0 | 3 | – | 7 | 35 | 6 | 47 | 431 |
| 12 | Fri 04 Dec |  | 0 | 4 | – | 8 | 36 | 7 | 50 | 480 |
| 13 | Sat 05 Dec | vc41 100% | 0 | 4 | – | 8 | 36 | 8 | 51 | 531 |
| 14 | Sun 06 Dec | E1 read | 0 | 4 | – | 8 | 36 | 8 | 66 | 597 |
| 15 | Mon 07 Dec |  | 0 | 4 | – | 8 | 37 | 9 | 83 | 680 |
| 16 | Tue 08 Dec |  | 0 | 4 | – | 8 | 37 | 9 | 85 | 765 |
| 17 | Wed 09 Dec | Holiday Bloom card submitted | 0 | 4 | – | 8 | 38 | 10 | 87 | 852 |
| 18 | Thu 10 Dec | Burst-ready check; vc42 20% | 0 | 4 | – | 8 | 38 | 10 | 89 | 941 |
| 19 | Fri 11 Dec | vc42 100% | 0 | 4 | – | 8 | 39 | 11 | 90 | 1,031 |
| 20 | Sat 12 Dec | **Burst 1** day 1 | 500 | 5 | 17 | 26 | 56 | 29 | 168 | 699 |
| 21 | Sun 13 Dec | **Burst 1** day 2 | 500 | 5 | 16 | 25 | 62 | 34 | 192 | 391 |
| 22 | Mon 14 Dec | **Burst 1** day 3; Winter Bloom starts | 500 | 7 | 17 | 28 | 69 | 41 | 234 | 126 |
| 23 | Tue 15 Dec | **Burst 1** day 4 | 500 | 7 | 17 | 28 | 74 | 46 | 253 | −121 |
| 24 | Wed 16 Dec | **Burst 1** day 5 | 500 | 7 | 17 | 28 | 78 | 49 | 271 | −351 |
| 25 | Thu 17 Dec | **Burst 1** day 6 | 500 | 7 | 17 | 28 | 81 | 53 | 284 | −566 |
| 26 | Fri 18 Dec | **Burst 1** day 7 (last) | 500 | 7 | 17 | 28 | 84 | 55 | 297 | −770 |
| 27 | Sat 19 Dec | Burst 1 first read | 0 | 6 | – | 10 | 68 | 40 | 229 | −541 |
| 28 | Sun 20 Dec |  | 0 | 6 | – | 10 | 64 | 36 | 212 | −329 |
| 29 | Mon 21 Dec | Winter Bloom last day | 0 | 6 | – | 10 | 63 | 34 | 194 | −135 |
| 30 | Tue 22 Dec | Day-30 review | 0 | 5 | – | 9 | 61 | 32 | 185 | 50 |
| 31 | Wed 23 Dec | **Burst 2 decision** | 0 | 5 | – | 9 | 60 | 31 | 181 | 231 |
| 32 | Thu 24 Dec | Holiday Bloom starts | 0 | 8 | – | 12 | 62 | 33 | 190 | 421 |
| 33 | Fri 25 Dec | Christmas (Burst 2 day 1 only if it passed) | 0 | 8 | – | 12 | 63 | 34 | 192 | 613 |
| 34 | Sat 26 Dec |  | 0 | 8 | – | 12 | 63 | 34 | 157 | 769 |
| 35 | Sun 27 Dec |  | 0 | 8 | – | 12 | 63 | 34 | 157 | 926 |
| 36 | Mon 28 Dec |  | 0 | 8 | – | 12 | 63 | 34 | 158 | 1,084 |
| 37 | Tue 29 Dec |  | 0 | 8 | – | 12 | 63 | 34 | 158 | 1,242 |
| 38 | Wed 30 Dec |  | 0 | 8 | – | 12 | 64 | 34 | 159 | 1,401 |
| 39 | Thu 31 Dec | December review | 0 | 8 | – | 12 | 64 | 35 | 160 | 1,560 |

How to read it:
- **"Tier-1 free downloads" is the number that matters most.** It is a 7-day-average target: a single day can be 0 or
  15.
- **Daily players drop to ~36 for two weeks.** The cheap November players leave and no paid players replace them.
  This is expected and costs nothing.
- **Revenue steps up on 6–7 Dec only if vc41 lands and interstitials win E1.** If E1 loses, revenue to 31 Dec is
  ≈ ₹3.5k instead of ₹5.1k, and profit is about ₹0.
- **"Profit so far" = revenue (AdMob basis) − ad spend in this plan.** The ₹3,689 spent before 23 Nov is not counted
  (sunk). During a burst it dips, because the spend comes before the revenue.

| Week | Dates | Ad spend | Tier-1 free | Paid | Avg daily players | Revenue | Profit |
|---|---|---|---|---|---|---|---|
| 1 | 23–29 Nov | ₹0 | ~17 | 0 | ~36 | ~₹250 | +₹250 |
| 2 | 30 Nov – 6 Dec | ₹0 | ~24 | 0 | ~36 | ~₹350 | +₹350 |
| 3 | 7–13 Dec | ₹1,000 | ~30 | ~32 | ~44 | ~₹790 | −₹210 |
| 4 | 14–20 Dec | ₹2,500 | ~46 | ~87 | ~74 | ~₹1,780 | −₹720 |
| 5 | 21–27 Dec | ₹0 | ~48 | 0 | ~62 | ~₹1,250 | +₹1,250 |
| 6 | 28–31 Dec (4 days) | ₹0 | ~32 | 0 | ~64 | ~₹630 | +₹630 |
| **To 31 Dec** | | **₹3,500** | **~190** | **~119** | | **~₹5.1k** | **+₹1.6k** |

## Checks (Gemini reports, Ajay decides)

| When | Check | Pass | If it fails |
|---|---|---|---|
| Mon 30 Nov | **Check A** — vc40 health | crash-free ≥ 99.5%, ANR < 0.47%, tutorial completion ≥ 80% (vc40 players), no wave of ad complaints in reviews | vc40 hotfix before vc41; vc41 slips; Burst 1 moves to Christmas week |
| Sun 6 Dec | **E1 read** (M-§3.8) | the M-§3.8 rule; with few players Firebase may say "not enough data": then use the rule on all 14 days | — |
| Thu 10 Dec | **Burst-ready check** (`07`) | all 6 checks | Burst 1 moves to Fri 25 – Thu 31 Dec at ₹500; no Burst 2 |
| Wed 23 Dec | **Burst 2 decision** (`07`) | day-7 return on spend ≥ 40%, cost per opened install ≤ ₹30, day-1 return ≥ 28% | no Burst 2; January test or organic only |
| any day | **Kill switch** | — | crash-free < 99%, an ANR cluster or an AdMob policy notice → Gemini halts the rollout and pauses ads the same day |

## Every day

- **Gemini (about 20 minutes):**
  - the KPI screen, including the organic line (`06` §6);
  - Crashlytics and vitals;
  - replies to new reviews through the API (CP §7);
  - `DAILY_ACTIVITY.md` in the app repo and `journal/<date>.md` here;
  - tomorrow's clip caption.
- **Ajay (about 10 minutes):** post the clip of the day (from Wed 25 Nov, 06:30 IST); read the KPI screen; answer what
  Gemini asks.

---

## Week 1 — Stop paying, fix the shop window (Mon 23 – Sun 29 Nov)

### Day 1 — Mon 23 Nov · Ads ₹0
**Ajay**
1. Google Ads: **pause `BlockBloom-Tier1-EN`** (same steps as C-02). Do not remove it, do not add money: the balance
   stays for Burst 1. Spend-log line: `paused, plan v2`.
2. Play Console → Promotional content: is the Aurora Bloom Festival card (27 Nov) "Approved"? The start is 4 days away,
   which is the minimum (C-19). If it is missing or rejected, fix it today.
3. Answer the 5 Day-1 decisions in `00-README.md`.

**Gemini**
1. **O-1:** fix the store listing claims (en-US and every locale) through the Play API; read back. Interstitials are
   on for half the players since 22 Nov, so this is the first job of the day.
2. vc40 code day (`02` checklist "Mon 23 Nov"): V40-1, V40-2, V40-3, V40-4, V40-7, V40-8, V40-9, V40-11.
3. `tools/growth-kpi.js`: add the organic split (`06` §6) and the burst cohort (`07`).
4. Draft the week's 7 clip captions (CP §6) and Reddit post #1 with its UTM link.

**Done when:** the Tier-1 campaign shows "Paused" and spends ₹0 from today; listing read-back clean; festival card
approved or fixed.

### Day 2 — Tue 24 Nov
**Ajay**
1. Custom store listing for US/UK/CA/AU (O-2, C-16), with Gemini's text from CP §3.
2. Icon test E3 on the default listing, all countries (O-4, C-17). (Price test E2 is dropped: no buyers to read yet.)
3. Android vitals ANR check (C-20).
4. Meta: invite a second admin with 2FA (Meta mediation in vc41).

**Gemini**
1. vc40 internal build; Gates 1–3 (`02` "Tue 24 Nov"); V40-10 staged rollout support.
2. app-ads.txt check (C-22).
3. One test install from a UTM link: does the source reach GA4? (CP §10)

**Done when:** vc40 on internal and through Gates 1–3; custom listing published.

### Day 3 — Wed 25 Nov
**Ajay**
1. Approve vc40 for production after Gemini's gate report.
2. First clip on Shorts, Reels and TikTok at 06:30 IST (O-7); schedule the next 6.
3. AdMob blocking controls (C-21); payment threshold page (C-24).

**Gemini**
1. vc40 → **20%** (C-15).
2. Remote Config: Aurora Bloom Festival `live_events`, dated 27 Nov 00:00 – 3 Dec 23:59 (C-10). The text must match
   the Play card.
3. Watch Crashlytics and vitals.

### Day 4 — Thu 26 Nov (US Thanksgiving)
**Ajay** — upload the 30 s store video to YouTube (O-3).

**Gemini**
1. vc40 → **100%** if crash-free ≥ 99.5% and there is no ANR cluster; otherwise halt (C-15) and fix.
2. Release notes in 13 locales.
3. Add the store video to the listing (API).
4. Cut `release/vc41`; start V41-01.
5. Winter Bloom Play card: square image, tagline and description ready for Ajay (O-6).

### Day 5 — Fri 27 Nov (Black Friday · festival starts)
**Ajay** — Reddit #1, r/playmygame (CP §5; rules checklist first; UTM link).

**Gemini**
1. Check the festival on a phone: title, coins ×2, dates.
2. First vc40 numbers: tutorial completion, rewarded fallback share.

### Day 6 — Sat 28 Nov
**Ajay**
1. **Submit the Winter Bloom Play card** (14–21 Dec): 15 days ahead, so it can be featured (O-6, C-19).
2. Weekly review #1: 30 minutes, M-§4.2 plus `06` §7.

**Gemini**
1. Weekly report, with the organic page.
2. V41-04 phase A starts.

### Day 7 — Sun 29 Nov
**Ajay**
1. Record 7 clips (1 hour).
2. Send creator emails 1–10 (O-9), from Gemini's list and the filled template.

**Gemini**
1. Check A pre-read.
2. V41-01 / V41-02.

**Week-1 targets:**
- ₹0 on ads.
- Tier-1 free downloads ≥ 2 a day (~17 in the week).
- ~36 daily players; revenue ≈ ₹250, all of it profit.
- vc40 at 100%; the listing is honest.
- 1 Reddit post and 5 clips posted.

---

## Week 2 — vc41 and the free engine (Mon 30 Nov – Sun 6 Dec)

### Day 8 — Mon 30 Nov · Check A
**Ajay**
1. Decide Check A from Gemini's report.
2. Mediation network accounts: AppLovin, Liftoff, Pangle, Mintegral. About 3 hours; V41-01 lists what each one needs.

**Gemini**
1. Check A report.
2. vc41 build preparation (R41 "Before the build").

### Day 9 — Tue 1 Dec
**Gemini** — vc41 internal build; Gates 1–3 with an ANR focus (R41).

### Day 10 — Wed 2 Dec
**Gemini**
1. vc41 → **10%** (C-15).
2. First mediation numbers in the AdMob ad inspector.

**Ajay with Gemini** — AdMob mediation groups per format (C-23).

### Day 11 — Thu 3 Dec
**Ajay** — Reddit #2, r/IndieGaming.

**Gemini** — vc41 → **50%** if clean. The festival ends tonight.

### Day 12 — Fri 4 Dec
**Gemini**
1. Remove the festival value from `live_events` (C-10).
2. Holiday Bloom Play card: image and text ready for Ajay (O-6, `06` §4).

### Day 13 — Sat 5 Dec
**Gemini**
1. vc41 → **100%** if clean.
2. Weekly report.

**Ajay** — weekly review #2.

### Day 14 — Sun 6 Dec · E1 read
**Gemini** — E1 read (14 days, M-§3.8) with the recommendation.

**Ajay**
1. Approve the E1 decision.
2. Record 7 clips.
3. Send creator emails 11–20.

**Week-2 targets:**
- ₹0 on ads.
- Tier-1 free downloads ≥ 3 a day (~24 in the week).
- Revenue ≈ ₹350.
- vc41 at 100%.
- 2 Reddit posts in total; all 20 creators emailed.

---

## Week 3 — Winter Bloom ready, Burst 1 opens (Mon 7 – Sun 13 Dec)

### Day 15 — Mon 7 Dec
**Gemini**
1. Roll out the E1 decision (C-13).
2. Cut `release/vc42`; V42-01 Winter Bloom, V42-02 Adventure.
3. List the Burst 1 assets.

**Ajay** — Meta verified? If yes, Gemini switches Meta on in mediation.

### Day 16 — Tue 8 Dec
**Gemini**
1. V42-03 (only if `offer_tap` ≥ 3%), V42-04.
2. vc42 internal build; Gates 1–3.
3. Upload the Burst 1 assets to the paused campaign (`07` set-up step 1).

### Day 17 — Wed 9 Dec
**Ajay**
1. **Submit the Holiday Bloom Play card** (24 Dec – 3 Jan; 15 days ahead).
2. Approve the Burst 1 set-up; pay ₹3,500 minus the balance (`07` set-up step 3).

**Gemini**
1. Burst 1 settings and on/off rules (`07` set-up steps 2 and 4).
2. Burst cohort view in the KPI tool.

### Day 18 — Thu 10 Dec · Burst-ready check
**Gemini**
1. Burst-ready report at 10:00 IST (`07`).
2. vc42 → **20%**.

**Ajay** — decide: Burst 1 on 12 Dec, or moved to 25 Dec.

### Day 19 — Fri 11 Dec
**Gemini**
1. vc42 → **100%** if clean. If it is not clean, halt vc42 (players stay on vc41); Burst 1 still runs on vc41.
2. Set the campaign to Enabled with its ad group paused (`07`).

### Day 20 — Sat 12 Dec · Burst 1 day 1 (₹500)
**Gemini**
1. At 10:30 IST, check that the rule fired and ads are serving.
2. Remote Config: Winter Bloom `live_events` dated 14–21 Dec (C-11).
3. Weekly report.

**Ajay**
1. Weekly review #3.
2. Clip: "Winter Bloom is coming".

### Day 21 — Sun 13 Dec · Burst 1 day 2
**Ajay** — record winter clips (1 hour).

**Gemini** — burst day check (`07` rule 7).

**Week-3 targets:**
- ₹1,000 on ads (Burst 1 days 1–2).
- Tier-1 free downloads ≥ 4 a day; ~16 paid Tier-1 installs on each burst day.
- Revenue ≈ ₹790.

---

## Week 4 — Winter Bloom and Burst 1 (Mon 14 – Sun 20 Dec)

### Day 22 — Mon 14 Dec · Winter Bloom starts · Burst 1 day 3
**Gemini**
1. Winter Bloom is live in the app.
2. Push to opted-in players (C-14): the first push since the fix.

**Ajay**
1. Reddit #3, r/AndroidGaming. Moved to today: event launch and a burst day.
2. Check that the Play card is live.

### Day 23 — Tue 15 Dec · Burst 1 day 4
**Gemini** — first day-1 return of the burst installs (12–13 Dec).

### Days 24–25 — Wed 16 – Thu 17 Dec · Burst 1 days 5–6
Every-day routine plus the burst day check.

### Day 26 — Fri 18 Dec · Burst 1 day 7 (last)
**Gemini** — vc43 hotfix slot, only if something is broken (no features, no SDKs).

### Day 27 — Sat 19 Dec
**Gemini**
1. Burst 1 stops at 10:30 IST (rule). Check that it stopped and the total is about ₹3,500.
2. First read: day-7 return of the 12 Dec installs.
3. Weekly report.

**Ajay** — weekly review #4.

### Day 28 — Sun 20 Dec
**Gemini** — upload holiday assets to the paused campaign. Burst 2 may need them, and uploading costs nothing.

**Ajay** — record holiday clips.

**Week-4 targets:**
- ₹2,500 on ads (Burst 1 days 3–7).
- Tier-1 free downloads ≥ 6 a day.
- Daily players 69 → 84.
- Revenue ≈ ₹1,780.

---

## Week 5 — Christmas (Mon 21 – Sun 27 Dec)

### Day 29 — Mon 21 Dec
**Gemini**
1. Remote Config: Holiday Bloom `live_events` dated 24 Dec – 3 Jan (`06` §4).
2. Check that the Holiday Bloom card is approved.

Winter Bloom's last day.

### Day 30 — Tue 22 Dec · Day-30 review
**Gemini**
1. Remove the Winter Bloom value (C-11).
2. Day-30 report into `reports/`: targets vs actuals, and model inputs replaced with measured values.
3. Burst 1 day-7 return of the 12–15 Dec installs (complete today).

**Ajay** — read the report.

### Day 31 — Wed 23 Dec · Burst 2 decision
**Gemini** — Burst 2 report (`07`).

**Ajay** — decide. If yes:
1. Pay ₹7,000 minus the balance.
2. Gemini sets the budget to ₹1,000 and the rules "B2 on" (Fri 25 Dec 10:30 IST) and "B2 off" (Fri 1 Jan 10:30 IST).

### Day 32 — Thu 24 Dec · Holiday Bloom starts
**Gemini** — Holiday Bloom is live; push to opted-in players (`06` §4).

**Ajay** — clip: "Holiday Bloom".

### Day 33 — Fri 25 Dec (Christmas)
Burst 2 day 1, only if it passed. Gemini checks that the rule fired.

### Day 34 — Sat 26 Dec
**Ajay**
1. Reddit #4, r/playmygame (update post). Moved to today: new phones and Holiday Bloom.
2. Weekly review #5.

**Gemini** — weekly report.

### Day 35 — Sun 27 Dec
**Ajay** — record clips.

**Week-5 targets:**
- ₹0 on ads (₹3,000 if Burst 2 runs, 25–27 Dec).
- Tier-1 free downloads ≥ 8 a day from 24 Dec.
- Revenue ≈ ₹1,250.

---

## New Year's week (Mon 28 – Thu 31 Dec)

### Days 36–38 — Mon 28 – Wed 30 Dec
Every-day routine only.

### Day 39 — Thu 31 Dec · December review
**Gemini** — the December report:
1. Every target against the actual result, and the profit.
2. What worked, by source.
3. `growth-model-v2.js` inputs replaced with measured values.
4. The January plan draft: one more 7-day test at ₹500 in the first week of January if Burst 1 came in at 25–40%;
   keep Burst 2's settings if it ran and its numbers hold; the organic plan continues either way.

**Ajay** — approve the January plan.

**Targets to 31 Dec (committed):**
- Money: ad spend ₹3,500; revenue ≈ ₹5.1k; profit ≈ +₹1.6k.
- Downloads: ~190 Tier-1 free downloads in total, 8 a day at the end.
- Players: ~64 daily players, ~35 of them Tier-1.
- Ratings: 40.
