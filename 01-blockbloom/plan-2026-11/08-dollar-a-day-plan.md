# Block Bloom — Roadmap to Sustainable $1.00/Day (`₹93/Day`)

**Created:** Thu 26 Nov 2026 (22:00 IST) · **Baseline Measured (`Nov 20–26`):** `₹42.50/day` GA4 (`$0.457/day` on complete organic Days 1–3 `Nov 23–25`, `~₹49/day` AdMob basis at `K = 1.15`).
**Target:** **Sustainable `$1.00+/day` (`≥ ₹93/day` GA4 / AdMob basis) WITHOUT depending on a single whale.**

---

## 1. Mathematical Truth: Why We Are Not At `$1.00/Day` Today

At current observed FX (`₹93.01 / $1.00` in GA4 `Nov 20–26`), **`$1.00/day = ₹93.01/day`** (currently missing **`+₹43–₹50/day`** vs `Nov 23–25`). Raw code + GA4/AdMob audit proves 5 exact blockers:

| Blocker | Verified Raw Ground Truth (`Nov 20–26`) | Revenue Impact |
|---|---|---|
| **1. `0%` Tier-1 D1 + Extreme Whale Fragility** | **`0/41` D0 Tier-1 installs (`Nov 18–25` cohorts) returned on D1.** Non-Tier-1 (`IN+RoW`, `189` users) earned just **`₹0.32/user/week` (`₹8.66/day`)**. Meanwhile **`1` returning `SM-S928U` US user generated `₹204.84` (`62.7%` of all app rev / `76.9%` of US rev)**; the other `33` Tier-1 users earned `₹1.86/user/week`. | Real `$1/day` needs **`24–32` active Tier-1 DAU/day** at `₹3–₹4/user/day` (currently `~2–4` real Tier-1 DAU). |
| **2. Interstitial Under-Delivery (`1/11` Shown)** | `E1` disables interstitials for **`50%`**. For the remaining `50%`, [`GameViewModel.kt`](../../../BlockBloom/app/src/main/java/com/aweagle/blockbloom/viewmodel/GameViewModel.kt#L1665-L1695) requires `gamesPlayed > 2`, **resets countdown to `4` AND skips whenever ANY rewarded ad was watched that run**, waits `4` exits (`interval=4`), and enforces `150s` min gap (`Nov 26`: `SM-S928U` played `93.2m`, loaded `6` interstitials, showed **`1`**). | Cuts high-eCPM full-screen impressions by `>75%` even for engaged players. |
| **3. `0` Active Mediation Bidders + Legacy Retries** | `vc41` shipped adapters, but **`0` third-party networks are active in AdMob** (`AppLovin` closed to new devs, `Pangle` blocked for individuals, `Mintegral` awaiting approval, `Liftoff`/`Meta` unconfigured). Old `1.12.11` (`1,302`) + `1.15.0` (`956`) caused **`79.9%`** of 7d `ad_failed_to_load`. | Emerging-market banner fill drops (`TR 10%`), and Tier-1 auctions lack competitive bids. |
| **4. `₹0.00` IAP & Invisible Retention Mode/Offers** | `0` purchases (`3` canceled `purchase_result`, `3` `offer_tap` users vs `V42-03` `5`-user floor). [`OfferRules.kt`](../../../BlockBloom/app/src/main/java/com/aweagle/blockbloom/monetize/OfferRules.kt#L33-L59) locks Remove Ads modal until `interstitialsShown >= 3` or `session >= 5`, and GameOver row until `Day 3+`. `AuroraDailyChallengeCard` still renders hardcoded `"15h 22m"` ([`HomeScreen.kt`](../../../BlockBloom/app/src/main/java/com/aweagle/blockbloom/ui/screens/HomeScreen.kt#L1116)); `daily_challenge_done = 3u/wk`, `level_complete = 3u/wk`. | Almost no player lives long enough to see an IAP offer or engage Daily/Adventure retention loops. |
| **5. Organic Tier-1 Funnel = `~0.75/day` Human Installs** | Plan Days 1–4 targeted `2/day` (`8` Tier-1 free). Real human Tier-1 organic installs (`Nov 23–26`) were **`3` (`Pixel 6`×3)** (`~0.75/day`); `5` others were automated bots (`IN2025`, US `(not set)`). **`O-3` (`30s` Store Video) is still missing** on live `en-US` Play Store. `Reddit`/`Shorts` UTMs = `0` GA4 installs so far. | Top-of-funnel volume too small to compound cohorts even after fixes. |

> **Law 3 Honesty Check:** With `₹0` ad spend AND `0%` Tier-1 D1 retention, **$1.00/day cannot be sustained sustainably**—it requires **BOTH** product/monetization repairs (Lifting ARPDAU + Tier-1 D1 to `≥ 18%`) **AND** Tier-1 volume (`O-3`, Play Event featuring, Clips/Creators, plus `Burst 1` ONLY after retention passes Gate).

---

## 2. Two-Engine Math Model to Cross `$1.00/Day` (`₹93+/Day`)

| Engine | Target Contribution | How It Happens |
|---|---:|---|
| **Engine A: Revenue per Existing DAU** (`$0.46 → $0.70–$0.85/day` on `~35–40` DAU) | **+$0.25 to +$0.40/day** (`+₹23–₹37/day`) | Turn `E1` interstitials `100% ON` after `Dec 6` (if D1 guardrail holds) + stop full countdown reset on rewarded ads (`vc42`) + `Mintegral` live in AdMob mediation + `V41-02` `daily_double` rewarded engagement + `Remove Ads` / `$1.99 Starter Pack` `~1` purchase every `4–7` days (`~$0.20–$0.35/day` net amortized). |
| **Engine B: Real Tier-1 DAU Scaling (`~3 → 25+` real Tier-1 DAU)** | **+$0.35 to +$0.65/day** (`+₹33–₹60/day`) | Fix Tier-1 D1 (`0% → 18–20%`) via `vc42` (`V41-02` Daily Loop + `V42-02` Adventure Home hero + `V41-03` Streak Reminders), convert store traffic (`O-3` Video, `O-6` Winter Bloom featured Dec 14, `O-7`/`O-8`/`O-9` Clips/Reddit/Creators), then run **Burst 1 (`₹3,500`, `Dec 12–18`)** *if & only if* Dec 10 Retention Gate passes. |
| **Combined Target (`Mid-to-Late Dec`)** | **`$1.00–$1.50/day`** (`₹93–₹140/day`) | Balanced across `25+` Tier-1 DAU + RoW mediated fill + occasional IAP (survives without `SM-S928U`). |

---

## 3. Phased Execution Plan (`Fri 27 Nov – Thu 31 Dec`)

### Phase 1: Fix Measurement, Store Video & Mediation (`Fri 27 Nov – Mon 30 Nov`, Spend: ₹0)
**Goal:** Close every missed Day 1–4 deliverable, unlock `O-3` + `O-6`, activate Mintegral if approved, clean KPI visibility for **Check A (`Mon 30 Nov`)**.

1. **Ajay (`Fri 27 – Sat 28 Nov`, ~25 min total):**
   - **Fri 27 Nov (`URGENT — Missed Day 4`):** Record & upload `15–30s` landscape gameplay video to `@ajaywaghmare7034` (`O-3`, ads OFF, no text overlays) -> share YouTube URL so we attach it to Play `en-US` via API.
   - **Fri 27 Nov:** Verify `Aurora Bloom Challenge` / local event strip check + 2-minute Airplane Mode `Check 0.4` on real phone; post Day 4 clip to **Reels + TikTok + YouTube Shorts** with `utm_source=shorts` bio link; check comments on Reddit `1y5ru1o`; try recruiting `3` more **Arrow Bloom** testers (`9/12 → 12/12`).
   - **Sat 28 Nov (`Hard Deadline`):** Submit staged **Winter Bloom (`Dec 14–21`) Play Promotional Content card** ([`winter-bloom-play-card.md`](content/winter-bloom-play-card.md)) (`16` days ahead, required for Play Featuring boost).
   - **Account Checks (5 min):** Watch Gmail for **Mintegral staff approval** (`->` immediately configure AdMob mediation `C-23`), submit **Google Ads India Tax**, check **AdMob India / `W-8BEN` Tax**.
2. **Engineering / Ops (`Fri 27 – Sun 29 Nov`):**
   - Upgrade [`growth-kpi.js`](../../../BlockBloom/tools/growth-kpi.js) (`M-§1` overdue from Day 1): enforce `F_NODEBUG`, exclude `countryId = (not set)`, stop querying collided `publisherAdImpressions`, add Tier-1 free vs paid organic split + whale concentration line (`top US device share`).
   - Prepare Creator Outreach Batch #1 (`O-9`, 10 puzzle creators + custom UTM links ready for Ajay `Sun 29 Nov`).
   - Run **Check A (`Mon 30 Nov`)**: separate clean real-device `vc40`/`vc41` onboarding & crash rates from `IN2025` / US `(not set)` bot noise; decide go-forward on **`vc42` (`1.18.0`)**.

---

### Phase 2: Build the Retention, Loop & Monetization Engine — `vc42` (`Tue 1 Dec – Fri 11 Dec`, Spend: ₹0)
**Goal:** Raise ARPDAU (`~$0.46 → ~$0.75/day`) and fix Tier-1 D1 (`0% → ≥ 18%`) **BEFORE spending ₹3,500 on Burst 1**.

1. **`vc42` (`1.18.0`) Engineering Scope (**COMPLETED & STAGED EARLY `Thu 26 Nov 22:36 IST`** on `release/vc42` -> Play `internal 100%` + `production 20%` awaiting Managed Publishing; 100% target `~Nov 28–29` after 24h watch):**
   - **`V41-02` Daily Loop + Day-Rollover Fix + Come-Back Chest:** Replace hardcoded `"15h 22m"` in `AuroraDailyChallengeCard`, show real goal types, add 7-day Streak Ladder (Day 3 `+2` gems, Day 7 `+5` gems + `1` Hammer) and Come-Back Chest (`150` coins + `1` lifeline). Directly creates a D1/D2/D3 open hook + more `daily_double` Rewarded views (`$4–$8` eCPM).
   - **`V42-02` Adventure Hero Tile + `V41-03` Smart Streak Reminders:** Surface Adventure Levels next to Classic on Home (`level_complete` is currently `3u/wk`) and schedule streak-at-risk reminder at the player's active hour.
   - **`V41-04` Share Score Card + Referral Link (`O-10`):** Viral organic loop (`utm_source=referral` tracked).
   - **`V42-01` Winter Bloom Theme & Challenge (`Dec 14–21`)**: Synced with Play Featured card (`O-6`).
   - **Monetization Pacing Fix (RC-guarded):**
     - `GameViewModel.kt:1673-1678`: when player watches a rewarded ad in a run, **skip that exit's interstitial WITHOUT resetting `interstitialCountdown` back to `4`** (the `150s` `min_gap_s` already protects player comfort).
     - [`OfferRules.kt`](../../../BlockBloom/app/src/main/java/com/aweagle/blockbloom/monetize/OfferRules.kt#L33-L59): relax `modalAllowed` to `interstitialsShown >= 2 || sessionCount >= 3`, and `gameOverRowAllowed` from `Day 3+` to `Day 2+` (`installDayDiff >= 1`) so real players actually discover `remove_ads`.
     - **Telemetry cleanup:** Log real `error_code` / `reason` on every `ad_failed_to_load` callback and integer `step` on `tutorial_step`.
   - **Conditional `V42-03` (`$1.99 Starter Pack`) Gate (`Mon 7 Dec`):** Keep building ONLY if `offer_tap / offer_shown >= 3%` AND **`>= 5` unique users** (currently `3/5` users). Create `starter_pack` SKU via `play-create-product.js` if gate passes.
2. **Mid-Phase Console & Organic Milestones:**
   - **Thu 3 Dec:** **Reddit #2 (`r/IndieGaming`)** (`Ajay`).
   - **Sun 6 Dec (`E1` Decision):** Read 14-day `BlockBloom Android E1` results (`M-§3.8`). If Variant A (`true`) shows net revenue lift without harming real-user D1, push `ads_interstitial_enabled = true` to **100%** via Remote Config (instant zero-release interstitial doubling), then test `ads_interstitial_interval = 3` cleanly while monitoring D1/D3.
   - **Sun 6 Dec:** Creator Outreach Batch #2 (10 more creators, `O-9`); verify **Mintegral** (and **Liftoff** / **Meta 2FA** if feasible) live in AdMob Mediation Groups for US/RoW.
   - **Wed 9 Dec:** Prepare & submit **Holiday Bloom Play Card** (`Dec 24 – Jan 3`, `15` days early, `O-6`).

---

### Phase 3: Conditional Scaled Acquisition (`Sat 12 Dec – Thu 31 Dec`, Target: `$1.00–$1.50+/Day`)
**HARD STOP-LOSS GATE (`Thu 10 Dec` Burst-Ready Check — Strict Law 3):**
Run **Burst 1 (`Sat 12 – Fri 18 Dec`, `₹500/day = ₹3,500`, top-up `₹2,227` over `₹1,273.66` existing Ads balance)** **ONLY IF ALL 4 PASS:**
1. `vc42` (`1.18.0`) at **`100%` production**, crash-free `≥ 99.5%`, ANR `< 0.47%` (no new signatures).
2. **Real human Tier-1 D1 retention (`Nov 30 – Dec 9`, ex-bots) `≥ 15–18%`** (up from `0%` today). *(If Tier-1 D1 is still `< 12%`, **HOLD Burst 1 cash** — fix first-session churn before buying traffic!)*
3. **`E1` decision applied** & at least **`1` extra bidding source** active OR Tier-1 ARPDAU `≥ ₹3.50/day` across non-whale US devices.
4. **Winter Bloom Play Card approved** (`Dec 14–21`).

- **Dec 12–18 (If Gate Passes):** Run `BlockBloom-Tier1-EN` at `₹500/day` landing into **Winter Bloom (`Dec 14–21`)** + **Reddit #3 (`r/AndroidGaming`, Mon 14 Dec)** + daily Shorts/Reels.
- **Wed 23 Dec (Burst 2 Decision):** Only spend Christmas Burst 2 (`₹7,000`, `Dec 25–31`) if Burst 1 Day-7 ROAS `≥ 40%` (`≥ ₹1,400` in 7 days on those cohorts) AND daily app revenue stays **`≥ $1.00/day` (`₹93+/day`)** cleanly across multiple Tier-1 devices.
- **Target by Dec 21:** `25–40` non-whale Tier-1 DAU + `~30–40` RoW DAU + mediated fill + occasional `$1.99` Remove Ads / Starter Pack buyer -> **sustainable `$1.00–$1.50+/day`**.

---

## 4. Weekly Checkpoints Toward `$1.00/Day`

| Checkpoint | Date | Realistic Revenue Target (Ex-Anomaly) | Pass Gate Required |
|---|---|---|---|
| **Baseline Today** | Thu 26 Nov | `$0.46/day` (`₹42.5/day`, `1` whale) | Honest baseline locked |
| **Check A + O-3/O-6** | Mon 30 Nov | `$0.50–$0.60/day` (`₹46–₹56/day`) | `O-3` Video + `Winter Bloom` submitted; `vc40+` ≥ 80% ex-bots |
| **`E1` Read + `vc42` Prep** | Sun 6 Dec | `$0.65–$0.80/day` (`₹60–₹74/day`) | `E1` `100% ON` decision; `Mintegral` live; Reddit #2 & Creator emails sent |
| **Burst-Ready Gate** | Thu 10 Dec | `$0.75–$0.90/day` (`₹70–₹84/day`) | `vc42` `100%`; **Real Tier-1 D1 `≥ 15–18%`** -> Unlock Burst 1 |
| **Burst 1 + Winter Bloom** | Dec 14–21 | **`$1.00–$1.50+/day` (`₹93–₹140+/day`)** | Multi-user Tier-1 DAU `≥ 25`; no single device `> 40%` of revenue |
| **Post-Burst / Holiday Bloom** | Dec 24–31 | **Sustained `$1.00+/day`** (`₹93+/day`) | Burst 2 only if Burst 1 D7 return `≥ 40%` |
