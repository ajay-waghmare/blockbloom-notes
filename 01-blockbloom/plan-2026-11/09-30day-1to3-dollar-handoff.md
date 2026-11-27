# Block Bloom — 30-Day `$1.00–$3.00/Day` Ground-Truth Handoff & `Claude Task`

> **Generated:** 2026-11-27 `08:30 IST` · **Purpose:** Single complete GitHub truth file for Ajay + Claude to (1) build the **30-day (`Nov 27 – Dec 27, 2026`) plan to reach `$1.00–$3.00/day` (`₹93–₹279/day`) ad + IAP revenue**, and (2) execute all **required App improvements (`vc43` → `vc44`/`vc45`)**.  
> **Governing Rules:** `GEMINI.md` Laws 1–6 (zero fake projections, raw data proof only, systemic fixes, 4-gate verification, clean UTF-8 + GitHub sync).

---

## 1. Verified Ground-Truth Baseline (`2026-11-27 08:30 IST`)

### A. Revenue & Region Reality (`GA4 555700046`, Debug Excluded, `USD`)

| Window | Active Users (`u`) | New Users (`nu`) | Sessions | Total Ad Rev | IAP Rev | Avg/Day | Top Driver |
|---|---:|---:|---:|---:|---:|---:|---|
| **All-Time (`2026-01-01..11-27`, `95` regions)** | `795` | `771` | `2,546` | **`$6.39`** | `$0.00` | — | **`US` `$4.42` (`69.17%`)** |
| **Last 28d (`2026-10-31..11-27`, `79` regions)** | `534` | `474` | `1,468` | **`$6.39`** | `$0.00` | `$0.23/day` | **`US` `$4.42` (`69.17%`)** |
| **Last 7d (`2026-11-21..11-27`, `54` regions)** | `197` | `130` | `526` | **`$3.36`** | `$0.00` | **`$0.48/day`** *(AdMob `~₹51.13/day`)* | **`US` `$2.92` (`86.90%`)** |

* **Whale Concentration Risk (`growth-kpi.js` `Nov 21–27`):** `1` returning US device (**`SM-S928U`**) generated **`₹212.83 / ₹311.20` (`68.4%`)** in 7d (`$2.797 + $0.739` in 28d across `(direct)`/`(not set)` attribution). Without `SM-S928U`, the entire app currently earns **under `₹15/day` (`~$0.16/day`)**.
* **Why Low-Fill Regions (`TR`, `RU`, `(not set)`) Are NOT the Problem:**
  * **Türkiye (`TR`):** `3` users in 28d (`0` new, `87` sessions, `1,849.2` min — mostly `2` returning Xiaomi devices `M2101K6G` & `Redmi Note 8 Pro`), `160` imp / `385` fail → **`$0.05` total in 28d** (`$0.02` in 7d). Even `100%` fill on all `385` missed `TR` requests would add only **`+$0.04 to +$0.12/month`**.
  * **Russia (`RU`):** `4` users in 28d (`81` fails, `0` imp, **`$0.00`**) — AdMob + Play Billing are suspended in Russia.
  * **Unknown (`(not set)`):** `74/74` sessions in 28d (`100%`) are Google Play test-lab device **`IN2025`** (`$0.00` real revenue; `115` all-time sessions, `281` fails).
* **Today's AdMob Snapshot (`Nov 27 07:43 IST` — No Bug):** `79` req → `45` matched (`56.96%`) → `32` imp (`71.11%` show) → **`$0.32`** (`$10.11` eCPM; **`US` `$182.07` Interstitial eCPM**, `100.00%` match rate across `US 24/24`, `BR 14/14`, `GT 2/2`, `ES 1/1`, `IN 1/1`). All `34` unmatched requests = `TR 25` (`M2101K6G` night banner refresh exhaustion + `Personalization disabled`) + `RU 8` + `IN2025 1`. Policy Center **`0` issues**; Mediation active (`AdMob Network` only — Mintegral still pending approval).

### B. Clean Tier-1 Acquisition & Funnel Truth (`US, GB, CA, AU, NZ, IE`, Ex-Bots & Ex-`debug`)

* **Why Non-US Tier-1 (`GB/CA/AU/NZ/IE`) Has Almost Zero Users (`All-Time`):**
  * `US`: `91` new (`10` `google-play/organic`, `11` paid `google/cpc`, **`69` `(direct)` of which `40` in 28d were `(not set)` / `""` / `IN2025` bots**)
  * `GB`: `10` new (`5` Play organic, `4` direct, `1` Google search, **`0` paid**)
  * `CA`: `2` new (`1` paid, `1` direct, `0` new Play organic)
  * `AU`: `1` new (`1` paid, `0` Play organic) · `NZ`: **`0`** · `IE`: **`0`**
  * Earlier misconfigured `BlockBloom-Tier1-EN` (`Presence or interest` + `All languages` + `Poor` `0/20` videos before Nov 25 fix) spent `₹1,791.60` leaking to `FR: 13`, `DE: 6`, `NL: 4` vs `US: 10`, `CA: 1`, `AU: 1`, `GB: 0`. Now **Paused (`₹0/day`)** since Nov 22.
  * Store ASO weakness: `~10` ratings, **`0` Play Store video (`O-3` missing)**, crowded category, no separate `en-GB`/`en-CA`/`en-AU` listings, and **`0%` Tier-1 D1 retention (`0/41`)**.
* **Clean Tier-1 28-Day Funnel (`Oct 31 – Nov 27`, Ex-Bots `IN2025` / `(not set)` / `""`):**
  * **`first_open`: `30` users** → **`tutorial_begin`: `29` (`96.7%`)**
  * **`tutorial_complete`: `17` users (`56.7%`)** — **`43.3%` quit before completing step 3**
  * **`first_clear`: `15` users (`50.0%`)**
  * **`first_game_over`: `6` users (`20.0%`)** — **`80.0%` quit before finishing even Run 1** (so `FirstSessionHook`, `ReviewPrompter`, `maybeInterstitialThen`, and `OfferRules` never fire for `80%` of Tier-1 installs!)
  * **`daily_challenge_done`: `0` users (`0` events)** · **`level_complete`: `1` user (`1` event)** · **`app_remove`: `18` users (`60%`)**
  * **`offer_shown`: `3` users (`13` views)** → **`offer_tap`: `3` users (`100%` of exposed users tapped!)** → **`purchase_result`: `2` users (`3` attempts → `$0.00` completed)**

### C. Current Release, Config & Compliance State
* **Play Store (`4976030358371797626`):** `vc41` (`1.17.0`) **`completed` 100%** live; `vc42` (`1.18.0`) staged `20%` **HELD in Managed Publishing**; **`vc43` (`1.18.1`) built & gate-verified by Claude on `release/vc43` (`0ee3348`)** (`189/189` tests, `21,672,591` byte AAB), **awaiting Ajay's go to upload/replace `vc42` and publish**.
* **Firebase Remote Config (`HTTP 200` Verified):** All `5` new `vc42` keys are **LIVE** (`daily_loop_enabled: true`, `home_adventure_button: true`, `referral_enabled: true`, `reminder_mode: "streak_only"`, `reminder_variant: "A"`) alongside all `11` prior keys (`E1` `BlockBloom Android E1` 50/50 split on `ads_interstitial_enabled`; `autumn_bloom_challenge` Nov 30 – Dec 7 UTC).
* **Mandatory External Compliance Deadlines:**
  1. **🔴 Google Ads (`684-480-0945`) Advertiser Verification — DUE Dec 26, 2026** (up to 7 business days SLA; account pauses if incomplete — must complete ahead of Dec 12 Burst 1).
  2. **🟡 Google Play 16 KB Memory Page Sizes — DUE Feb 1, 2027 (`Extension granted`)** (Play blocks updates after Feb 1, 2027; `check-16kb`: `5` OK / `26` third-party 4 KB `.so`).

---

## 2. Unit Economics Math for `$1.00–$3.00/Day` Over Next 30 Days (`Nov 27 – Dec 27`)

Assuming observed FX `₹93 / $1` (`$1–$3/day = ₹93–₹279/day`) and removing dependency on single whale `SM-S928U`:

| Revenue Target | Required Mix (No Single-Whale Dependence) | Required Metrics |
|---|---|---|
| **`$1.00/day`** (`₹93/day`, baseline milestone) | **Ad Rev `$0.75/day` + IAP `~$0.25/day`** | **`25–30` non-whale Tier-1 DAU/day** at `~$0.025–$0.030` Ad ARPDAU (`~2–3` Interstitials/Rewarded per active user/day once `E1 = 100%` + Mintegral live) + **`~1` `$1.99–$2.99` IAP/week** + RoW baseline (`~$0.10–$0.15/day`). |
| **`$2.00/day`** (`₹186/day`, target zone) | **Ad Rev `$1.40/day` + IAP `~$0.60/day`** | **`45–55` Tier-1 DAU/day** (requires **Tier-1 D1 `>= 18–22%`** + `3–5` new Tier-1 installs/day organic + Burst 1/2 ROAS >= 40%) + **`~2` IAPs/week** (`Remove Ads` / `$0.99 Starter Pack`). |
| **`$3.00/day`** (`₹279/day`, stretch by Dec 27) | **Ad Rev `$2.10/day` + IAP `~$0.90/day`** | **`70–85` Tier-1 DAU/day** + Mintegral + 1 more active bidder (Liftoff/Meta) lifting US eCPM + **`~3` IAPs/week** (`Starter Pack`, `Remove Ads`, Gem packs in Adventure/Daily) + seasonal `Winter Bloom` + `Holiday Bloom` Play featuring lifts. |

> **Honest Law 3 Constraint:** Paid acquisition (`Burst 1` `₹3,500`, `Burst 2` `₹7,000`) will **burn money** unless `vc43+` lifts clean Tier-1 **tutorial completion (`56.7% -> >=85%`)**, **Run 1 completion (`20% -> >=55%`)**, and **Tier-1 D1 (`0% -> >=15–18%`)** FIRST. Fix product retention + store conversion (`O-3` video + ratings) before scaling ad spend!

---

## 3. Required App Improvements (Code & Architecture — Law 1 & Law 2)

### Priority 0 — Immediate Ship (Already Built, Waiting Go)
1. **Upload & Publish `vc43 (1.18.1)` (`release/vc43` `0ee3348`):** Gets `V41-02` Daily Loop, `V42-02` Adventure Home strip, `V41-03` Reminders, `V41-04` Referral Share, `vc42` interstitial pacing fix, and Claude's `HomeScreen` truncation/localization fixes live to 100% of users (replacing `vc42` HELD in Play).

### Priority 1 — Fix Day-0 Tier-1 Churn (`43.3%` Quit Before Tutorial Complete · `80%` Before First Game Over · `0%` D1)
2. **Streamline First-Run Onboarding (`GameViewModel.kt:1259-1305`, `2476-2539`, `FirstSession.kt`):**
   * Inspect why `13/30` clean Tier-1 users exit before `coachStep == 3` (`rotation_rule`) finishes and why `80%` never reach `first_game_over` (`HookRules` at `1449` never fires!).
   * Simplify coaching from 3 sequential steps down to **1 ultra-crisp interactive domino clear (`FirstSession`) + immediate unblocked play** (fire `TUTORIAL_COMPLETE` cleanly after the guided first line clear instead of holding users through step 3 `"rotation_rule"`).
   * Add faster **Run 1 engagement hooks**: trigger a joyful first milestone / Mode discovery (`Daily Challenge` / `Adventure Level 1`) early even if Run 1 lasts > 5 minutes, OR surface Adventure Level 1 directly on new-user progression so players feel fast 60-second level wins instead of dragging until an endless deadlock.
3. **`360x640dp` Small-Screen Home Fit:** Ensure Daily Challenge + Lucky Chest sit clearly visible without awkward cutoffs on `16:9` `360x640dp` phones (flagged by Claude in `2026-11-27.md`).

### Priority 2 — Maximize ARPDAU (`Ad + IAP` Revenue per Tier-1 User)
4. **Fix Full-Screen Interstitial Pacing & Cross-Mode Coverage (`GameViewModel.kt:1691-1752`, `AdsConfig.kt:37-40`):**
   * **Verify & unify rewarded-suppression flag:** `GameViewModel.kt:1699` uses `!_state.value.canRevive || _state.value.doubledThisGame`, while `rewardedWatchedThisRun` (`L321, 1641, 1665`) also tracks rewarded lifelines (`Hammer`/`Shuffle`/`Undo`). Align flag semantics cleanly AND confirm whether `startNextLevel()` / Adventure retries route through `maybeInterstitialThen` cleanly without harming level flow.
   * **Support faster post-`E1` Remote Config tuning:** Ensure `DEFAULT_INTERSTITIAL` stays safe fail-closed in code, while RC dials (`ads_interstitial_enabled`, `ads_interstitial_interval` e.g. `2` or `3`, `ads_interstitial_min_gap_s` e.g. `90–120s`, and optionally `ads_first_interstitial_after_games`) allow no-release tuning once `E1` decides (`Dec 6` or earlier).
5. **High-Converting IAP Funnel & `$0.99` `starter_pack` SKU (`BillingHost.kt:11-18`, `PlayBillingHost.kt`, `OfferRules.kt:13-60`):**
   * Code currently defines only `remove_ads` + `gems_small/medium/large`; **`starter_pack` (`V42-03`) does not exist in `Products` (`BillingHost.kt:11-18`) yet**.
   * Tier-1 `offer_tap` hit **`3/3` (`100%`)** of exposed users (`2` reached Play billing `purchase_result` with `₹0`). Add a compelling **`starter_pack`** SKU (e.g., `$0.99` / `$1.99` = `No Forced Interstitials (or Gems + Coin + Lifeline boost)`) paired with Play Console SKU creation, log exact Billing `BillingResponseCode` in `purchase_result` telemetry (`cancel` vs `error` vs `pending`), and relax `OfferRules` (`L28, 33, 59`) so warm players (e.g., Day 1 after 2+ games or after using first lifeline) can discover both `Remove Ads` and `Starter Pack` cleanly.

### Priority 3 — Global Polish, Compliance & Future-Proofing
6. **Localize Remaining `53` In-Game English Strings (`6` Locales):** Second-chance dialog, combo callouts, pause menu, `Cancel`/`Close` buttons noted by Claude in `vc43` (important before scaling `de`, `ja`, `pt-BR`, `es`, `tr`, `ko`).
7. **16 KB Memory Page Sizes + GMA 24+ / Kotlin 2.x Upgrade (`app/build.gradle.kts:206-254`, `tools/check-16kb.js`):** Currently `26` third-party `.so` libs are `4 KB`-aligned (GMA pinned `23.2.0` on Kotlin `1.9.24`, Play `BILLING`/`ads` 16 KB deadline **Feb 1, 2027 (`Extension granted`)**). Plan clean AGP 9 + Kotlin 2.x + GMA 24+ + Billing 8+ adapter migration in **early Jan 2027** (verified with `check-16kb.js` + full R8/Play test).
8. **Optional Banner Auto-Refresh Telemetry Cleanup (`PersistentBannerManager.kt`):** Hook `onAdLoaded` / `onAdFailedToLoad` clearly (already logs fail/load) and distinguish initial create vs SDK auto-refresh if ever debugging `TR`-style banner loops (zero urgency — do not touch ad behavior).

---

## 4. Non-Code / Store / Console Actions (Status on `2026-11-27`)
* **Done & Live in GitHub / Web:**
  * Live Landing Page (`O-12`): `https://ajay-waghmare.github.io/blockbloom/` (`HTTP 200`, `ajay-waghmare.github.io` `9b58663`)
  * `Holiday Bloom` (`Dec 24 – Jan 3`) Play card + PNGs: [`holiday-bloom-play-card.md`](content/holiday-bloom-play-card.md) (submit **Wed Dec 9**)
  * Refreshed Burst 1 Aurora Glass creatives: [`content/ads-burst1/`](content/ads-burst1/)
  * Review & Creator Outreach Pack (`O-9`): [`outreach-review-channels.md`](content/outreach-review-channels.md) (MiniReview, Pocket Gamer, AppUnwrapper + `10`-slot tracker)
  * `Reddit #2/#3` (`r/IndieGaming` Dec 3, `r/AndroidGaming` Dec 14): [`reddit-post-2-3-drafts.md`](content/reddit-post-2-3-drafts.md)
* **Pending Human Actions (Ajay / Console):**
  1. Give Claude **GO** to upload **`vc43 (1.18.1)`** + click **Publish changes** in Play Managed Publishing.
  2. Upload **`O-3` `15–30s` Play Store landscape video** (`en-US` listing still has `video = NONE`).
  3. Submit **`Winter Bloom` (`Dec 14–21`)** Promotional Content card **Sat Nov 28** ([`winter-bloom-play-card.md`](content/winter-bloom-play-card.md)).
  4. **Start Google Ads (`684-480-0945`) Advertiser Verification ASAP — HARD DEADLINE Dec 26, 2026** (up to 7 business days SLA).
  5. Watch Gmail for **Mintegral staff approval** → add Mintegral Bidding to Banner/Interstitial/Rewarded mediation groups; submit Ads/AdMob tax forms (`India Tax` + `W-8BEN`).
  6. Decide on ending **`E1` early** (`ads_interstitial_enabled = true` `100%`) vs waiting until **Dec 6**; send `MiniReview` / `Pocket Gamer` / Batch 1 creator emails; continue `3` more testers for **Arrow Bloom** (`9/12 → 12/12`).

---

## Claude Task

> **Action Checklist for Claude (Pick Up Directly From Here + [`topic_block_bloom.md`](../../memory/topic_block_bloom.md)):**

### Track A — Build the Next-30-Day `$1.00–$3.00/Day` Master Plan (`Nov 27 – Dec 27`)
1. Using Section 1 & Section 2 ground-truth baselines above (never invented projections per `GEMINI.md` Law 3), generate a **day-by-day & week-by-week 30-day execution plan (`Nov 27 – Dec 27`)** targeting realistic progressive checkpoints (`$0.50/day -> $1.00/day -> $2.00–$3.00/day`) tied strictly to measurable gates:
   * **Milestone 1 (Nov 27–Dec 2):** `vc43` live 100% + `O-3` Video live + `Winter Bloom` approved + Mintegral / Outreach live + `E1` decision.
   * **Milestone 2 (Dec 3–Dec 10):** `vc44` Day-0 retention + IAP `starter_pack` live; verify Tier-1 `tutorial_complete >= 80%`, Run-1 `first_game_over >= 50%`, Tier-1 D1 `>= 15–18%` BEFORE unlocking Burst 1 (`₹3,500`) on **Dec 12**.
   * **Milestone 3 (Dec 12–Dec 27):** Execute **Winter Bloom (`Dec 14–21`) + Tier-1 Burst 1 (`Dec 12–18`)**, evaluate 7d ROAS (`Dec 19–22`), enforce Google Ads Advertiser Verification completion well before **Dec 26**, launch **Holiday Bloom (`Dec 24 – Jan 3`) + conditional Burst 2 (`Dec 25–31`)** to hit `$1–3/day` sustainably.

### Track B — App Engineering & Play Release Tasks (`BlockBloom`)
1. **Task 1 (`vc43` Ship — Waiting Ajay's Go):** Run `node tools/play-upload.js` + `node tools/play-rollout.js` (`internal 100%` + `production 20%` replacing staged `vc42`, retaining `vc41` `completed`) from `release/vc43` (`0ee3348`), verify with `node tools/play-status.js`, and hand off to Ajay for Managed Publishing **Publish changes** -> monitor Crashlytics/Play Vitals (Law 4 Gate 4 = `100%` crash-free / `0` ANRs) before expanding `20% -> 100%`.
2. **Task 2 (`vc44` — Fix `43.3%` Onboarding Drop & `80%` Pre-Game-Over Churn):**
   * Audit `GameViewModel.kt:1259-1305`, `2476-2539`, `FirstSession.kt`, and `HomeScreen.kt` (`360x640dp`): remove step-3 onboarding friction (`rotation_rule`), fire `tutorial_complete` reliably on real first-board clear + add an earlier Run-1 engagement/hook & clearer `Daily Challenge` / `Adventure` visibility on Day 0 so Tier-1 D1 lifts off `0%`.
   * Log full `BillingResponseCode` + `offer` + `product_id` cleanly on `purchase_result` in `GameViewModel.kt` / `PlayBillingHost.kt`.
3. **Task 3 (`vc44` — Revenue Multiplier: Interstitial Pacing & `$0.99` `starter_pack` SKU):**
   * Audit `GameViewModel.kt:1691-1752` (`rewardedWatchedInRun` vs `rewardedWatchedThisRun`, Adventure level transitions, `min_gap_s` / `interval` RC responsiveness) so once `E1` flips `100%`, full-screen ad delivery scales cleanly without hurting D1.
   * Implement `starter_pack` SKU in `BillingHost.kt` / `PlayBillingHost.kt` / `ShopScreen.kt` / `OfferRules.kt` (`V42-03` — create Play product via `play-create-product.js` once Ajay approves pricing, e.g. `$0.99` / `₹89`) and add unit tests covering purchase restore, offer eligibility, and interstitial pacing.
4. **Task 4 (`vc44`/`vc45` — Localization & Post-Holiday 16 KB Prep):**
   * Localize the remaining `53` in-game English strings across `de`, `ja`, `tr`, `pt-BR`, `ko`, `es` (zero untranslated UI on Play featured pushes).
   * Prepare branch/plan for **AGP 9 + Kotlin 2.x + GMA 24+ + Billing 8+** to make all `26` third-party `.so` libs **16 KB aligned (`node tools/check-16kb.js`)** cleanly in **Jan 2027** ahead of Google Play's **Feb 1, 2027** enforcement deadline.
5. **Gate Mandate (Law 4 & Law 6):** Every release bump must pass `:app:testReleaseUnitTest`, `:app:bundleRelease` (R8 enabled), `:app:lintVitalRelease`, `read-remote-config.js` / R8 keep checks, and update `blockbloom-notes/journal/YYYY-MM-DD.md` + `memory/topic_block_bloom.md` + `BlockBloom/DAILY_ACTIVITY.md` cleanly on GitHub.
