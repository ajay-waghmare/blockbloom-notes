# Block Bloom — 30-Day Plan to `$1–3/day` (Fri 27 Nov – Sun 27 Dec 2026) · Claude, Track A

> **Written:** Fri 27 Nov 2026, 09:30 IST, by Claude, for the **Claude Task** in [`09-30day-1to3-dollar-handoff.md`](09-30day-1to3-dollar-handoff.md).
> **Inputs:** that handoff (Gemini, 08:30 IST) + a fresh run of `BlockBloom/tools/growth-kpi.js` on the work laptop (GA4 `555700046`, 21–27 Nov, debug builds excluded) + the plan-v2 files `00`–`08` (still the base; this file is the 30-day execution view).
> **Rules:** `GEMINI.md` Laws 1–6; profit by a date, "spend nothing" always shown, Ajay decides all money.

---

## 1. The honest answer first

| | Today (21–27 Nov) | What it takes |
|---|---|---|
| **Revenue** | **₹51/day** (AdMob basis) ≈ **$0.55/day** | `$1/day` = ₹93 · `$2/day` = ₹186 · `$3/day` = ₹279 |
| **Whale share** | one US device (`SM-S928U`) = **68%** of revenue; without it **~₹15/day** | the plan must not depend on one player |
| **Active Tier-1 players a day** | **~3–4 real** (25 Tier-1 users in 7 days) | **$1/day: 26** with the whale, **42** without it (at ₹1.8 per player-day); **18 / 30** if ARPDAU reaches ₹2.5 |
| **Value of one Tier-1 install** (ads only, AdMob basis) | **₹4.2 in 30 days, ₹5.1 in 90 days** (day-1 return 17%, ₹1.8/day) | after the vc43/vc44 fixes + E1 + mediation (D1 24%, ₹2.5/day): **₹7.4 in 30 days, ₹9.8 in 90 days** |
| **Cost of one paid Tier-1 install** | ~**₹29** (plan-v2 model, mid-December) | → a paid install earns back **18–34% in 90 days** |

**So, honestly:**
1. **`$1/day` is reachable on the Burst 1 + Winter Bloom days (13–21 Dec)** — about ₹90–140/day at the burst peak.
2. **`$1/day` sustained after the burst needs ~7–10 free Tier-1 installs a day** (today ~2, some of them bots). That depends on the store video (O-3), Winter/Holiday Bloom featuring and creators — not on code alone. It is **possible, not likely, by 27 Dec**.
3. **`$2–3/day` by 27 Dec cannot be reached profitably.** Buying it would take ~₹1,500–3,000/day of ads at a 66–80% loss. It becomes possible when a Tier-1 install is worth ≥ ₹29 — that needs purchases (starter pack / Remove Ads) **and** day-1 return ≥ 30%. That is the January–February goal, built on what this month proves.

**Every paid burst loses money on its own at today's numbers.** A burst's value is (a) the first clean Tier-1 retention and revenue sample, (b) store-ranking lift during Winter Bloom, (c) learning the true cost per install. Plan v2 already treats Burst 1 as a gated test; the numbers above say keep it that way.

---

## 2. Profit by date — the options

Revenue = AdMob basis (GA4 × 1.15). "Whale stays" = `SM-S928U` keeps earning ~₹30/day; "whale leaves" = it stops on 1 Dec. Burst cohorts use the §1 per-install values (low end: today's retention and ₹1.8/day; high end: after the fixes, ₹2.5/day) plus a 5% free-install halo; cost per install as in plan v2 (~₹29 in mid-December, ~₹24 after Christmas, revenue × 0.8 after Christmas).

| Option | Ad spend | What the paid players earn back | **Profit to 27 Dec** (whale stays · leaves) | Profit to 20 Feb (stays · leaves) | Downside |
|---|---:|---|---:|---:|---|
| **A. Spend nothing.** Ship vc43 + vc44, E1 decision, organic (video, featuring, creators, Reddit) | ₹0 | — (revenue ₹1,700–2,100 · ₹500–800) | **₹1,700–2,100 · ₹500–800** | ₹4,500–6,500 · ₹1,800–3,000 | Tier-1 stays tiny; `$1/day` only if featuring brings volume |
| **B. A + Burst 1** (₹3,500, 12–18 Dec, ~119 Tier-1 installs) **only if the 10 Dec gate passes** — the current plan v2 | ₹3,500 | ₹400–700 by 27 Dec · ₹600–1,100 by 20 Feb | **−₹1,350 to −₹700 · −₹2,550 to −₹2,000** | ₹1,600–4,150 · −₹1,100 to +₹650 | the burst never earns back its cost (17–31% by Feb); the rest is the price of data + ranking |
| **B-lite. A + a ₹1,500 test** (₹300/day × 5 days, ~52 installs, same gate) | ₹1,500 | ₹200–300 by 27 Dec · ₹250–500 by 20 Feb | **₹400–900 · −₹800 to −₹400** | ₹3,250–5,500 · ₹550–2,000 | ~50 Tier-1 installs measure day-1 return within ±12 points; less ranking lift |
| **C. B + Burst 2** (₹7,000, 25–31 Dec, ~293 installs) | ₹10,500 | Burst 2: ₹650–1,000 by 31 Dec · ₹1,100–2,000 by 20 Feb | **−₹7,400 to −₹6,300 · −₹8,800 to −₹7,800** (to 31 Dec) | −₹4,250 to −₹750 · −₹6,950 to −₹4,250 | runs only if Burst 1 earns ≥ 40% in 7 days — the math says it will not, so C should stay off |

**Recommendation (Claude):** **A now; at the Thu 10 Dec gate choose B-lite or B.** B-lite buys the same answer (does a Tier-1 player come back and pay?) for about ₹1,500 less than B by 20 Feb. B is only worth its extra cost if the Winter Bloom card is approved for featuring, because then the ranking lift has something to land on. **Ajay decides** (plan v2 committed ₹3,500; this is new evidence, offered once). The calculation is reproducible: per-install values × installs, method in this section; replace the inputs with measured numbers at each weekly review.

---

## 3. Gates — corrected for sample size

**Problem.** Tier-1 organic installs are ~2/day (15 in 21–27 Nov, mostly `(direct)`; some are Google test devices). By 9 Dec that is ~20 installs → a day-1 return measured on 20 people swings ±18 points. Today's Tier-1 **0/36** day-1 return is probably part real churn, part bots and pre-launch devices that never return (they open once, 0 tutorial). A Tier-1-only gate on 10 Dec would be noise.

**Fix.** Measure **product health on all real new users** (any country, ex-bots, ex-debug) on the new build, and measure **Tier-1 on the burst's own cohort**. The plan files disagree today (`07-ad-bursts.md`: day-1 ≥ 25% on ≥ 60 installs; `08`/`09`: ≥ 15–18%). Proposed single rule, **Ajay decides**:

| Thu 10 Dec burst-ready gate (Gemini reports 10:00 IST) | Pass mark | Sample |
|---|---|---|
| Build | vc44 at 100%, crash-free ≥ 99.5% (7d), user-perceived ANR < 0.47%, no new signature | Crashlytics, Play vitals |
| First session | tutorial complete **≥ 80%** of real new users on vc44 | n ≥ 40 |
| Day-1 return | **≥ 22%** of real new users on vc44 (all countries); Tier-1 reported, not gated | n ≥ 40 |
| Ads | ad load success ≥ 60% (rewarded + banner); E1 decision applied | KPI tool |
| Money & account | Google Ads advertiser verification **complete**; balance topped up only after Ajay's go | Google Ads |
| Featuring | Winter Bloom card approved (needed for full B, not for B-lite) | Play Console |

**All pass → B (or B-lite).** **Any fail →** no burst on 12 Dec; fix first; the burst moves to **Fri 25 – Thu 31 Dec** (the documented plan-v2 fallback: Christmas-week prices are ~20% lower, Holiday Bloom is live).

---

## 4. Calendar — day by day (A = Ajay · G = Gemini · C = Claude)

### Week 1 · Fri 27 Nov – Thu 3 Dec · *Ship cleanly, measure cleanly* (Milestone 1)
| Date | Who | Do | Done when |
|---|---|---|---|
| **Fri 27 Nov** | A | Phone-test vc43 (Adventure strip, Daily card, share ring, Lucky Chest dialog, nav tabs) → one-line **go** | go given |
| | C | On go: `play-upload.js` vc43 → internal 100%; `play-rollout.js` production 20% replacing the held vc42, vc41 kept `completed`; `play-status.js` read-back | read-back shows vc41 completed + vc43 inProgress |
| | A | **Publish changes** in Managed Publishing · **start Google Ads advertiser verification now** (deadline 26 Dec, up to 7 business days) · record + upload the O-3 15–30 s store video | verification submitted; video URL shared |
| | G | Pull the browser-only data in §7 and push to GitHub | §7 file in `journal/` |
| | C | `release/vc44` branch; Law-1 audit of the first session (code + GA4: where new players stop, how long Run 1 lasts) | audit in the journal |
| **Sat 28 Nov** | A | Submit the **Winter Bloom (14–21 Dec) Play card** — hard deadline | submitted |
| | C | Watch vc43 at 20% (Crashlytics + vitals). Clean 24 h → ask A for the 100% go | crash-free ≥ 99.5%, no new ANR |
| | C | vc44 build: onboarding fix + Run-1 hook + purchase telemetry (scope in §5) | unit tests green |
| **Sun 29 Nov** | A | Creator outreach batch 1 (O-9) | sent |
| | C | vc44: 53 in-game strings × 6 languages; 360×640 fit; release gate | gate green, pushed |
| **Mon 30 Nov** | G | **Check A:** clean onboarding + day-1 return for vc41/vc43, bots excluded with the §7 device list | numbers in journal |
| | A/C | vc43 → 100% (go) · vc44 → internal 100% | vc44 on internal |
| **Tue 1 Dec** | A/C | vc44 → production 20% (go) | read-back OK |
| **Wed 2 Dec** | G | E1 interim + Mintegral status | in journal |
| **Thu 3 Dec** | A | Reddit #2 (`r/IndieGaming`) | posted |
| | A/C | vc44 → 100% if 48 h clean (go) | 100% |
| | G | **Weekly review:** revenue/day, whale share, D1 all-geo, tutorial % | **Milestone 1:** vc43 100% · vc44 ≥ 20% · O-3 live · Winter Bloom submitted · verification submitted |

### Week 2 · Fri 4 – Thu 10 Dec · *Prove the product* (Milestone 2)
| Date | Who | Do | Done when |
|---|---|---|---|
| Fri 4 Dec | C | Starter-pack code behind a Remote Config flag (off); unit tests for offer rules + restore | merged to `release/vc44` follow-up, flag off |
| Sat 5 Dec | G | KPI: vc44 tutorial % and day-1 return so far (n, not just %) | in journal |
| **Sun 6 Dec** | G → A | **E1 decision:** interstitials to 100% only if revenue per user is up **and** day-1 return is not down | RC changed or not |
| | A | Creator batch 2; Mintegral → mediation groups if approved | done |
| **Mon 7 Dec** | A | **Starter-pack gate:** offer_tap ≥ 5 unique users (4/5 today) → approve price ($0.99 or $1.99) | price decided |
| | C/G | Create the Play product (`play-create-product.js`), flip the RC flag | product active |
| Tue 8 Dec | G → A | Burst assets (2 portrait + 1 landscape Winter Bloom videos, 5 headlines) | approved |
| Wed 9 Dec | A | Holiday Bloom Play card · Google Ads settings (paused) · money only after verification is complete | done |
| **Thu 10 Dec** | G → A | **Burst-ready gate (§3)** → B, B-lite or move to 25 Dec | decision logged |

### Week 3 · Fri 11 – Thu 17 Dec · *Winter Bloom + Burst 1* (Milestone 3a)
| Date | Who | Do | Done when |
|---|---|---|---|
| Fri 11 Dec | A | Campaign enabled with ad group paused; on/off rules (Sat 12 Dec 10:30 IST → Sat 19 Dec 10:30 IST) | rules set |
| **Sat 12 Dec** | — | **Burst 1 starts** (if passed) | spending |
| **Mon 14 Dec** | A | Winter Bloom live · Reddit #3 (`r/AndroidGaming`) · first burst day-1 read | posted |
| daily | A + G | 5-minute burst check; **kill switch** the same day: crash-free < 99%, ANR cluster, any AdMob policy / invalid-traffic notice, cost per opened install > ₹45 (3-day avg) | logged |

### Week 4 · Fri 18 – Thu 24 Dec · *Read the burst, decide Christmas*
| Date | Who | Do | Done when |
|---|---|---|---|
| Fri 18 Dec | C | Hotfix slot only (vc45) · **code freeze from Sat 19 Dec to Sun 3 Jan** | frozen |
| Sat 19 Dec | G | Burst ends 10:30 IST · day-7 return of the 12 Dec installs | in journal |
| Tue 22 Dec | G | Complete day-7 return of 12–15 Dec installs | in journal |
| **Wed 23 Dec** | G → A | **Burst 2 decision:** day-7 return ≥ 40% **and** cost per opened install ≤ ₹30 **and** day-1 ≥ 28% → B2; 25–40% → one ₹500/day test in early January; < 25% → organic only until purchases exist | decision logged |
| Thu 24 Dec | — | Holiday Bloom live | live |

### Fri 25 – Sun 27 Dec · *Holiday Bloom + the 30-day review*
| Date | Who | Do | Done when |
|---|---|---|---|
| Fri 25 Dec | — | Burst 2 only if approved | — |
| Sat 26 Dec | A | Google Ads verification deadline (should be long done) | done |
| **Sun 27 Dec** | G + C → A | **30-day review:** 7-day revenue/day, whale share, Tier-1 players/day, day-1 return, profit to date vs §2 → January plan (16 KB migration, purchases, any burst) | review in journal |

---

## 5. Track B — engineering calendar (Claude)

| Build | When | Scope (ordered by revenue impact) |
|---|---|---|
| **vc43 (1.18.1)** | built (`release/vc43` `78a4d11`); upload on Ajay's go today; 100% Mon 30 Nov | Home UI fix + Home translations (done) |
| **vc44 (1.19.0)** | internal Mon 30 Nov → 20% Tue 1 Dec → 100% Thu 3 Dec | 1. **First session:** fire `tutorial_complete` on the real first-board clear; remove the step-3 friction — only after the Law-1 audit shows where players stop. 2. **Run-1 hook:** a Day-0 path to a fast win (Daily Challenge / Adventure Level 1). 3. **Purchase telemetry:** full `BillingResponseCode` + `offer` + `product_id` on `purchase_result`. 4. **Interstitial pacing:** audit `rewardedWatchedInRun` vs `rewardedWatchedThisRun` and Adventure transitions; RC dials stay fail-closed; no behaviour change without evidence. 5. **Starter pack** code behind an RC flag (no Play product until the 7 Dec gate + price). 6. **53 in-game strings** × 6 languages (same translation test as vc43). 7. **360×640:** hide the hero board below ~560 dp of height so the cards fit without scrolling. |
| vc45 | Fri 18 Dec hotfix slot only | — |
| January | branch Mon 4 Jan → internal 15 Jan → production by 25 Jan | AGP 9 + Kotlin 2 + GMA 24 + Billing 8 → all 26 third-party `.so` 16 KB-aligned before the **1 Feb 2027** Play deadline |

Every build: `:app:testReleaseUnitTest`, `:app:bundleRelease` (R8), `:app:lintVitalRelease`, `check-16kb`, R8 keep check; journal + topic + `DAILY_ACTIVITY.md` the same day; every Play step on Ajay's one-line go.

---

## 6. Revenue checkpoints (7-day average, AdMob basis — ranges, not promises)

| Checkpoint | Range | Read it as |
|---|---|---|
| Thu 3 Dec | ₹45–60/day ($0.50–0.65) | builds just shipping; still whale-led |
| Thu 10 Dec | ₹50–70/day ($0.55–0.75) | E1 at 100% + Mintegral would add ~₹10–15 |
| Sun 20 Dec | **with Burst 1: ₹90–130/day ($0.95–1.40)** · without: ₹55–75 | the `$1/day` week |
| Sun 27 Dec | ₹60–90/day ($0.65–0.95) | sustained `$1/day` only if free Tier-1 installs ≥ 7/day |

**Whale guardrail:** report the share every week; the plan counts as working only if no single device is > 40% of revenue by 27 Dec.

---

## 7. Data Gemini should pull (browser-only; push to `journal/` — this laptop already gets GA4 + Play vitals)

1. **AdMob, last 14 days:** impressions, eCPM and match rate by format × country (US, GB, CA, AU, BR, IN, TR, rest) → calibrates revenue per player-day.
2. **Firebase A/B `E1`, interim:** revenue per user and day-1 return per variant, with sample sizes.
3. **Play Console, last 28 days:** store-listing visitors → installers for the default en-US listing and the `Tier1-EN` custom listing; ratings count and average; the icon test interim.
4. **Bot list:** device models from the Play pre-launch report and Firebase Test Lab that open the app (e.g. `IN2025`, US `(not set)`) → Claude adds them to the `growth-kpi.js` exclusions so Tier-1 day-1 return stops counting test devices.
5. **Google Ads:** advertiser-verification status and the account balance.

## 8. Decisions for Ajay
1. **Go for the vc43 upload** (after your phone test).
2. **Start Google Ads advertiser verification today.**
3. **Day-1 pass mark for 10 Dec:** ≥ 22% on all real new users (n ≥ 40) — or keep 25% on ≥ 60 (likely unreachable by 10 Dec at ~7 real installs a day).
4. **Burst size at the gate:** B (₹3,500) or B-lite (₹1,500).
5. **Starter-pack price** at the 7 Dec gate: $0.99 or $1.99.
6. **E1:** end early or wait for 6 Dec.
