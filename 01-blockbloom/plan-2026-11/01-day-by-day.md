# Block Bloom — day-by-day plan, Sun 22 Nov – Mon 21 Dec 2026

The main file of the execution plan. Read `00-README.md` first.

- **Ajay** — accounts, money, Google Ads, AdMob, Play Console UI-only items, clips, posts, review replies, every
  budget and gate decision. About 45–60 minutes on weekdays, 2–3 hours on Sundays.
- **Gemini** — all development and changes: code, builds, releases, Remote Config / Firebase changes, scripts,
  reports, `DAILY_ACTIVITY.md` in the app repo and `journal/<date>.md` in this repo, every working day.
- IDs point to the details: `C-xx` = `03-console-runbooks.md`; `V40-x`, `V41-x`, `V42-x` = `02-gemini-dev-specs.md`;
  `M-§n` = section n of `04-measurement-and-gates.md`; `CP-x` = `05-content-pack.md`.
- **Budget** = the Tier-1 campaign's daily budget (US, UK, CA, AU, NZ, IE only). No other paid traffic.

## Budget ladder (changed from v1.1 on 22 Nov)

Google advises changing a campaign budget by at most ~20% at a time (C-05); v1.1's jumps (₹300 → ₹500, +67%)
would restart Google's learning. So:

| Days | Committed path (expected) | Stretch path (only if Gate B passes) |
|---|---|---|
| 1–9 (22–30 Nov) | ₹400 flat. Black Friday: keep ₹400; the target cost per install stops Google overpaying | same |
| 10–12 (1–3 Dec) | ₹480 if Gate A passes; ₹300 if it fails | same |
| 13–17 (4–8 Dec) | ₹500 | same |
| 18–20 (9–11 Dec) | ₹500 | ₹600 |
| 21–23 (12–14 Dec) | ₹500 | ₹720 |
| 24–30 (15–21 Dec) | ₹500 | ₹860, only while cost per opened install ≤ ₹30 (3-day average) |
| **30-day total** | **≈ ₹14k** | **≈ ₹17.5k** |

**Expected path = committed.** By the model, Tier-1 cohorts return ~20–25% of their cost in 7 days by 9 Dec, short
of Gate B's 30% (`04` §0). Stretch happens only if real numbers beat the model.

**Stop-loss (any time after vc41):** Tier-1 day-7 return on spend below 15% → ₹300 the next day.
**Kill switch (same day):** crash-free < 99%, an ANR cluster, any AdMob policy or invalid-traffic notice, or cost per
opened install above ₹35 for 3 days → ₹300 (pause if it repeats).

---

## Week 1 — Stop the leak, start earning (Sun 22 – Sat 28 Nov)

### Day 1 — Sun 22 Nov · Budget ₹400
**Ajay**
1. Pause the `App-1` campaign (C-02).
2. Tier-1 campaign: countries US, UK, CA, AU, NZ, IE only; target ₹25 per install; ₹400/day (C-03). Rename it
   `BlockBloom-Tier1-EN` so reports stop saying "EU".
3. Link Google Ads with Firebase / GA4; import `first_open` and `tutorial_complete` as conversions (C-01).
4. Prepay one week, ~₹2.8k (C-04).
5. Write the first line of `growth/spend-2026-11.csv` (M-§2).
6. Record 7 gameplay clips on the phone (CP clip briefs); 1 hour.

**Gemini**
1. Remote Config: delete the `live_events` parameter — the "Weekend Cascade +50% coins" that runs every day (C-09).
   Do NOT publish `[]` (that turns every event off).
2. Remote Config: confirm `ads_interstitial_enabled` is still published as `false`. Never delete it — the code
   default is ON until vc40 (C-12 warning).
3. Firebase A/B test E1: interstitials ON for 50% (every 4th game, existing guards) vs OFF (C-12). It is a retention
   safety check: at ~100 players a day it will not give a precise revenue number.
4. GA4: mark `first_open` and `tutorial_complete` as key events; register the custom dimensions listed in M-§1
   (including `firebase_exp_<N>` for E1 — if GA4 refuses the name, E1 is read on the Firebase A/B page) (C-25).
5. Cut `release/vc40` from `main`; start V40-1 (onboarding v2) and V40-9 (analytics).
6. Start `tools/growth-kpi.js` (M-§1, build order M-§5).
7. Write `DAILY_ACTIVITY.md` and `journal/2026-11-22.md` entries (this pattern repeats every day).

**Done when:** App-1 spends ₹0; E1 shows "Running"; GA4 shows the link; `live_events` is gone.

### Day 2 — Mon 23 Nov · Budget ₹400
**Ajay**
1. Play Console → Android vitals: 28-day user-perceived ANR below 0.47%? (C-20 shows how; Gemini reads it too.)
2. Play Console → Promotional content: open the 27 Nov event and read what it promises (C-19). The festival in
   Remote Config (Day 4) must match it.
3. Meta: invite a second admin who already has 2FA (the faster verification route).
4. AdMob: review blocking controls (C-21); read the payment threshold page (C-24).

**Gemini**
1. vc40: V40-1 onboarding v2 (≤ 3 steps, pre-set first board, skip after step 1), V40-2 first-session hook.
2. vc40: V40-3 push fix (Firebase Cloud Messaging auto-init is off today, so pushes reach nobody).
3. app-ads.txt check (C-22).
4. First daily KPI output from `tools/growth-kpi.js` (even if partial).

**Done when:** a Monday home screen shows no "Weekend Cascade"; Tier-1 cost per install ≤ ₹25; KPI output exists.

### Day 3 — Tue 24 Nov · Budget ₹400
**Ajay**
1. Play Console: custom store listing for US / UK / CA / AU, using the copy in CP (C-16).
2. Store listing experiment E3: icon, current vs the three designed variants (C-17).
3. Price experiment E2 for `remove_ads` in Tier-1 countries (C-18).
4. Upload creatives to the Tier-1 campaign: videos (from Day-1 clips), images, 5 headlines, 5 descriptions (C-07, CP).

**Gemini**
1. vc40: V40-4 rewarded readiness (preload before game over, buttons only when ready, log fallback grants),
   V40-5 remove-ads offers in context, V40-6 interstitial 150 s gap + code default OFF, V40-7 chest badge,
   V40-8 review rule.
2. V40-10 staged rollout support in `tools/play-rollout.js` (fraction + **keep the live vc39 release in the same
   track update**, or the live release can be dropped — check the Production track screen after the first commit).
3. vc40 internal build; gates 1–3 of `MAJOR_ISSUES_AND_GO_LIVE_CHECKLIST.md`.

**Done when:** vc40 is on the internal track and passes gates 1–3.

### Day 4 — Wed 25 Nov · Budget ₹400
**Ajay**
1. Approve vc40 for production after Gemini's gate report.
2. Reply to every new review (CP reply templates).

**Gemini**
1. vc40 → **20%** of production (C-15, V40-10).
2. Remote Config: publish the Aurora Bloom Festival `live_events` with date conditions, 27 Nov 00:00 – 3 Dec 23:59
   (C-10). Its text must match the Play card.
3. Watch Crashlytics and Play vitals for 24 hours.

**Done when:** vc40 at 20%, crash-free ≥ 99.5%, no new ANR signature; festival value published for its dates.

### Day 5 — Thu 26 Nov (US Thanksgiving) · Budget ₹400
**Ajay**
1. Post clip #1 on YouTube Shorts and Instagram Reels; schedule the next 6 (one a day) (CP captions).

**Gemini**
1. vc40 → **100%** if crash-free ≥ 99.5% and no ANR cluster; else halt (C-15) and fix.
2. Release notes in 13 locales (`tools/release-notes/vc40.json`, CP release notes).
3. Cut `release/vc41`; start V41-1 (mediation adapters) — the longest item.

**Done when:** vc40 at 100%.

### Day 6 — Fri 27 Nov (Black Friday) · Budget ₹400
**Ajay**
1. Reddit post #1 (CP Reddit drafts; follow each community's self-promotion rule).

**Gemini**
1. Check the festival in the app on a phone: title, coins ×2, dates.
2. KPI: first numbers for vc40 players (tutorial completion, rewarded fallback share).

**Done when:** festival visible in the app.

### Day 7 — Sat 28 Nov · Budget ₹400
**Ajay**
1. Weekly review #1, 30 minutes, with the Saturday template (M-§4).

**Gemini**
1. Weekly report into `01-blockbloom/reports/` (M-§1).
2. Gate A pre-read (provisional numbers).

**Week-1 targets:** spend ≤ ₹2.8k; ~90 Tier-1 + ~50 free installs; revenue ≥ ₹450 for the week (AdMob basis);
tutorial completion ≥ 80% for vc40 players; day-1 return ≥ 22% for installs of Days 5–7 (confirmed on Day 9).

---

## Week 2 — Prove Tier-1 value (Sun 29 Nov – Sat 5 Dec)

### Day 8 — Sun 29 Nov · Budget ₹400 · **GATE A**
**Ajay** — decide Gate A from Gemini's report (M-§3):
- vc40 crash-free ≥ 99.5% **and** 28-day ANR < 0.47% **and** tutorial completion ≥ 80% **and** day-1 return
  ≥ 22% (installs of Days 5–7, all players) **and** conversions visible per campaign?
  - **All yes** → ₹480 from Day 10.
  - **Stability fails** → keep ₹400, Gemini hotfixes first.
  - **Anything else fails** → ₹300 from Day 10; fix before spending more.
- The day-1 return of the 28 Nov installs arrives on Day 9: if it changes the answer, change the budget on Day 10.
- Record and schedule 7 clips (1 hour).

**Gemini** — Gate A report (provisional), then the confirmation on Day 9. Continue V41-1.

### Day 9 — Mon 30 Nov (Cyber Monday) · Budget ₹400
**Ajay**
1. Open the mediation network accounts: AppLovin, Liftoff, Pangle, Mintegral — payment and tax details (the
   list of what each needs is in V41-1).

**Gemini**
1. V41-1 adapters (versions that compile under the Kotlin 1.9 pins), V41-2 daily loop on home.
2. Gate A confirmation with the 28 Nov installs' day-1 return.

### Day 10 — Tue 1 Dec · Budget ₹480 (Gate A pass) or ₹300
**Ajay**
1. Set the Day-10 budget.
2. Play Console: submit the **Winter Bloom** promotional content for 14–21 Dec (C-19).

**Gemini**
1. V41-3 reminders v2; V41-4 referral if it fits (else it moves to vc42).
2. vc41 internal build; gates 1–3 with an ANR focus (new SDKs).

**Done when:** vc41 internal build clean; Winter Bloom submitted.

### Day 11 — Wed 2 Dec · Budget as Day 10
**Gemini**
1. vc41 → **10%** (C-15).
2. Watch Crashlytics / vitals; check the first mediation numbers in the AdMob ad inspector.

**Ajay**
1. With Gemini: AdMob mediation groups per format (C-23).

### Day 12 — Thu 3 Dec · Budget as Day 10
**Gemini**
1. vc41 → **50%** if crash-free ≥ 99.5% and no new ANR signature.

**Ajay**
1. Reddit post #2.

### Day 13 — Fri 4 Dec · Budget ₹500 (if Gate A passed) or ₹300
**Ajay**
1. Budget step to ₹500 (the second +~20% step).
2. Bidding: switch the Tier-1 campaign to the in-app action `tutorial_complete` only if it logs ≥ 10 a day (C-08).
   If the campaign type does not allow it, note it and keep cost-per-install bidding.

**Gemini**
1. The festival has ended: remove the festival value from `live_events` so the calendar events come back (C-10).
2. KPI: ad load success by format and country.

### Day 14 — Sat 5 Dec · Budget as Day 13
**Gemini**
1. vc41 → **100%** if clean.
2. Weekly report.

**Ajay**
1. Weekly review #2.
2. E3 (icon): apply the winner if Play shows a clear result; then start E4 (first two screenshots) (C-17).

**Week-2 targets:** revenue ≥ ₹950 for the week; ad load success ≥ 60%; day-1 return ≥ 28% for vc40 installs.

---

## Week 3 — Scale only what pays (Sun 6 – Sat 12 Dec)

### Day 15 — Sun 6 Dec · Budget as Day 13
**Gemini**
1. Read E1 (14 days) with M-§3: revenue per player and day-1 / day-3 return by arm.
2. Roll out the decision (C-13): interstitials ON for all if revenue per player is up ≥ 30% and return holds
   within 2 points; otherwise keep OFF. After stopping the test, confirm the published value.

**Ajay**
1. Approve the E1 decision. Record and schedule 7 clips.

### Day 16 — Mon 7 Dec · Budget as Day 13
**Ajay**
1. Meta verified? If yes, tell Gemini to switch Meta on in the mediation group.

**Gemini**
1. Cut `release/vc42`; V42-1 Winter Bloom content, V42-2 Adventure on home.

### Day 17 — Tue 8 Dec · Budget as Day 13
**Gemini**
1. V42-3 starter pack only if `offer_tap` ≥ 3%; V42-4 Arrow Bloom card.
2. vc42 internal build; gates 1–3.

**Ajay**
1. Reddit post #3; reply to reviews.

### Day 18 — Wed 9 Dec · **GATE B**
**Ajay** — decide Gate B from Gemini's report (M-§3):
- vc41 crash-free ≥ 99.5% **and** ANR < 0.47% **and** day-1 return ≥ 28% (Tier-1) **and** revenue per Tier-1
  active day ≥ ₹3 (AdMob basis, 7-day) **and** Tier-1 day-7 return on spend ≥ 30% (installs of Days 10–11 measured,
  Days 12–13 projected) **and** cost per opened install ≤ ₹30?
  - **All yes** → stretch: ₹600 from today. Confirmation on Day 20 with the full Days 10–13 numbers; if it fails,
    back to ₹500.
  - **Return on spend 15–30%** → committed: hold ₹500.
  - **Below 15%** → stop-loss: ₹300.

**Gemini** — Gate B report.

### Day 19 — Thu 10 Dec · Budget per Gate B
**Gemini**
1. vc42 → **20%**.

### Day 20 — Fri 11 Dec · Budget per Gate B
**Gemini**
1. vc42 → **100%** if clean.
2. Gate B confirmation.

### Day 21 — Sat 12 Dec · Budget ₹500, or ₹720 on the stretch path
**Ajay**
1. Weekly review #3.

**Gemini**
1. Weekly report.
2. Remote Config: Winter Bloom `live_events` with date conditions, 14–21 Dec, matching vc42 (C-11).

**Week-3 targets:** revenue ≥ ₹2k for the week; Tier-1 day-7 return on spend trending to ≥ 25%.

---

## Week 4 — Holiday peak, keep what pays (Sun 13 – Mon 21 Dec)

### Day 22 — Sun 13 Dec · Budget as Day 21
**Ajay**
1. Record winter clips; schedule them.
2. Day-22 rule (stretch path only): ₹860 from Day 24 only if the installs of Days 14–17 show ≥ 30% day-7 return on
   spend and the 3-day cost per opened install is ≤ ₹30 (M-§3).

### Day 23 — Mon 14 Dec · Budget as Day 21
**Gemini**
1. Winter Bloom goes live in the app (Remote Config value starts today).
2. Push to opted-in players (C-14) — possible now because vc40 fixed push.

**Ajay**
1. Check the Play card is live.

### Days 24–29 — Tue 15 – Sun 20 Dec · Budget ₹500 (committed) or ₹860 (stretch, under the cost rule)
**Ajay, every day (5 minutes, M-§4):** yesterday's spend into the log; cost per opened install (3-day average);
yesterday's revenue; reply to reviews.
**Gemini, every day:** KPI output; Crashlytics / vitals check.
- Day 26, Thu 17 Dec: Ajay — Reddit post #4.
- Day 27, Fri 18 Dec: Gemini — vc43 hotfix slot, only if something is broken (no features, no SDKs).
- Day 28, Sat 19 Dec: weekly review #4 (target: revenue ≥ ₹350 a day).
- Day 29, Sun 20 Dec: Gemini — Winter Bloom ends at 23:59 UTC; remove its `live_events` value afterwards (C-11).

### Day 30 — Mon 21 Dec · **Day-30 review**
**Ajay + Gemini**
1. Compare with the targets in `../11-growth-roadmap-30-days.md` §2 using the KPI tool.
2. Decide January: lower ad prices *and* lower eCPMs after the holidays; focus on purchases and day-30 return.
3. Gemini writes the Day-30 report into `reports/` and the next 30-day plan draft.

**Day-30 targets (committed):** revenue ₹375 a day or more (AdMob basis); ~135 daily players; ~40 downloads a day;
day-1 return 30%; spend ≈ ₹14k in total.
