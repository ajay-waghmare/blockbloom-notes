# Pre-Flight Readiness (P1–P12), `P7` Campaign Filter Proof & `E-1` Interstitial Audit

> **Status (`2026-11-27 23:22 IST`):** Engineering & telemetry deliverables executed after `6a43942` (`12-10k-month-plan.md`, `06-work-like-claude.md`, `/bb-*`) without touching `release/vc44` Android runtime code, Play Console rollouts, or Google Ads spend.

---

## 1. Pre-Flight Checklist (`P1–P12`, Due Thu 3 Dec Before Stage 0 Top-Up)

Reference: [`12-10k-month-plan.md` §3](12-10k-month-plan.md).

| # | Item | Status (`27 Nov 23:22 IST`) | Verified Live Proof / Blocker | Next Owner Action |
|---|---|---|---|---|
| **P1** | **`vc44` at 100%** (crash ≥ 99.5%, ANR < 0.47%, no new sig) | 🟡 **LIVE at `20%`** | Published `Nov 27 10:41 PM` IST (`vc41` retained `Available`, `vc42` superseded, Managed Publishing `0` pending). Crashlytics `Last 24h` = `100%` crash-free (`0` issues). | Watch `24–48h` telemetry (`first_session_hook > 0`, crash/ANR gates) -> Ajay `go` for `100%` & merge to `main`. |
| **P2** | **Google Ads verification submitted** (hard due `Dec 26`) | 🔴 **Not started** | Google Ads `684-480-0945` shows `Action required / Not started` (`Dec 26` pause deadline; up to 7 business days SLA). | Ajay opens Billing & Payments -> Advertiser Verification -> starts Org + EU political tasks. |
| **P3** | **Campaign settings** (`6` Tier-1, **Presence**, English, ₹25 tCPI, ₹400/day, paused) | 🔴 **Pending audit** | `BlockBloom-Tier1-EN` is `Paused` (`₹0` spend). New `P7` filter proves **72.7% (`16/22` new users) leaked to RoW** in `Nov 21–27` (likely "Presence or interest" setting). | Before Dec 4 start, switch location option to **"Presence: People in or regularly in your excluded/targeted locations"** and verify ₹25 tCPI / ₹400/day. |
| **P4** | **Creatives approved** (`≥2` videos portrait+landscape, `5` headlines, `5` descriptions, honest) | 🟡 **Partial** | Aurora Glass static ads (`1200x628`, `1200x1200`, `1080x1920`) and copy pack ready; gameplay videos (`≥2`) + Canva/recorded `O-3` still needed inside Ads asset group. | Produce portrait + landscape honest gameplay videos (Canva / phone capture), upload to Ads & `O-3`. |
| **P5** | **Attribution (`GA4 <-> Ads`, `first_open` primary, `google/cpc` visible)** | ✅ **Done** | Verified via Analytics Admin API (`link 16353580980 -> 6844800945`) + Firebase Integrations (`Linked on Nov 16, 2026`) + live `google/cpc` rows in GA4 (`25u` `BlockBloom-Tier1-EN`, `80u` `App-1` in 7d). | Verify `first_open` primary conversion bidding flag in Ads Conversions during `P2/P3` click-through. |
| **P6** | **`AdMob <-> GA4` linked** | ✅ **Done** | Verified in Firebase Integrations (`1 linked app`) + live GA4 `totalAdRevenue` populated across `google/cpc`, `google-play/organic`, `(direct)/(none)` (`Nov 21–27`). | — |
| **P7** | **KPI tools clean + `--source` per-campaign cohort filter** | ✅ **Done** | `BlockBloom/tools/growth-kpi.js` and `tools/ga4-new-user-devices.js` upgraded on `release/vc44` with `--source=<substr>` (`firstUser` / campaign match) + Section 7 campaign breakdown & Paid `medium=cpc` cohorts. Verified live below (`§2`). | Run `--source=BlockBloom-Tier1-EN` daily during Stage 0 (`4–10 Dec`). |
| **P8** | **Prepay only, auto top-up off, balance = stage cap** | 🟡 **Prepay OK / Needs top-up on Dec 3** | Prepay balance **`₹1,308.45`** (`Funds running low`; last payment `Nov 18 ₹3,000`). Stage 0 (`₹400/day × 7d = ₹2,800`) needs `₹1,500` top-up on Thu `Dec 3` after `P1–P12` green. | Confirm auto top-up OFF; hold `₹1,500` UPI top-up until Thu `Dec 3` gate. |
| **P9** | **Kill-switch rules set** (pause if CPA `> ₹45` 3d + daily alarm) | ⚪ **Pending (`Dec 3`)** | Not yet created in Google Ads Automated Rules. | Create automated rule in Google Ads on Ajay's `go` when prepping `P3`. |
| **P10** | **`E1` interstitial test decided or kept 50/50** | 🟡 **Running (`n=94`, `P=0.123`)** | Firebase A/B Test `Running` (`85d` left): `Baseline` `49u $0.0017/u` (`4–7d` ret `3/49 = 6.1%`) vs `Variant A` `45u $0.043/u` (`4–7d` ret `2/45 = 4.4%`, `P=0.641`). Keep 50/50 or finalize before Dec 4. | Ajay decides on Dec 3 (`0` extra risk vs revenue lift on paid Tier-1). |
| **P11** | **Store readiness (`O-3` video live, honest `Tier1-EN` listing, icon test clean)** | 🟡 **Listing OK / Video missing** | Live `13`-locale listing audit confirmed `badClaims = false` and `video = NONE`. | Record & upload `15–30s` gameplay video (`O-3`) before Stage 0 `Dec 4`; check icon test significance before applying. |
| **P12** | **Spend log + GST answer in journal** | 🟡 **Balance math verified / Invoice pending** | Nov Payments (`₹5,000.00`: `₹2,000` + `Nov 18 ₹3,000`) minus Nov Net Cost (`₹3,691.55`) = **`₹1,308.45`** exact remaining prepay balance. Need Nov monthly GST tax invoice in Ads Documents to confirm whether GST is added outside/inside `18%` on monthly invoice. | Check Ads -> Billing -> Documents on Nov statement close (`early Dec`). |

---

## 2. `P7` Live Verification Outputs (`2026-11-27 23:20 IST`, `release/vc44`)

1. **`node tools/growth-kpi.js` (`2026-11-21 .. 2026-11-27`, Real-Geo ex-debug/emulators):**
   - Total: `174` Real-Geo DAU (`108` new + `15` `(not set)` excluded), `536` sessions, `4,728.8` mins, GA4 Ad = `₹324.31` (`$3.49`), Est. AdMob (`K=1.15`) = `₹372.95` (`₹53.28/day`), `SM-S928U = ₹220.55` (`68.0%`).
   - Check A & Offer gates: Real-Geo onboarding `78/107` (`72.9%`, `n=107`); `vc40+` `tutorial_complete` `11/14` (`78.6%`, `n=14`), `app_exception = 6`, `ad_shown = 235`; `V42-03` `offer_tap 4u / offer_shown 10u` (`40.0%`, `n=10`, `purchase_result = 3` — contaminated on non-`google/cpc` by test devices, see `--source=google` below).
   - **Section 7 Campaign / Source Breakdown (`7d` Real-Geo):**
     - `google/cpc | camp=App-1`: `57` new, `80` active, `221` sess, `AdRev = ₹3.52`
     - `google/cpc | camp=BlockBloom-Tier1-EN`: `22` new, `25` active, `43` sess, `AdRev = ₹40.08`
     - `(direct)/(none) | camp=(direct)`: `20` new, `42` active, `145` sess, `AdRev = ₹208.71`
     - `google-play/organic | camp=(not set)`: `9` new, `24` active, `74` sess, `AdRev = ₹28.27`
     - `(not set)/(not set) | camp=(not set)`: `0` new, `21` active, `37` sess, `AdRev = ₹43.72`
     - `google/organic | camp=(not set)`: `0` new, `1` active, `2` sess, `AdRev = ₹0.00`
   - **Paid (`medium=cpc`) Real-Geo Retention Cohorts (`Nov 19–25`):**
     - `Nov 19`: `D0=43`, `D1=8 (19%)`, `D2=7 (16%)`, `D3=5 (12%)`, `D7=2 (5%)`
     - `Nov 20`: `D0=36`, `D1=6 (17%)`, `D2=5 (14%)`, `D3=2 (6%)`
     - `Nov 21`: `D0=43`, `D1=8 (19%)`, `D2=7 (16%)`, `D3=4 (9%)`
     - `Nov 22`: `D0=24`, `D1=2 (8%)`, `D2=1 (4%)`, `D3=2 (8%)`
     - `Nov 23`: `D0=3` (`D1=0`), `Nov 24`: `D0=2` (`D1=0`), `Nov 25`: `D0=4`, `D1=1 (25%)`

2. **`node tools/growth-kpi.js --source=google`:**
   - `130` Real-Geo DAU (`88` new), `352` sess, `2,709.8` mins, GA4 Ad = `₹71.87` (`$0.77`), Est. AdMob = `₹82.66` (`₹11.81/day`), Tier-1 `9u / 8 new / ₹58.13 (80.9%)`, top US device `B160V = ₹36.99` (`51.5%`).
   - `V42-03` Offer Gate (`--source=google`): `offer_tap 0u / offer_shown 5u` (`0.0%`, `n=5`), `purchase_result = 0`.

3. **`node tools/growth-kpi.js --source=BlockBloom-Tier1-EN`:**
   - `25` Real-Geo DAU (`22` new), `45` sess, `152.3` mins, GA4 Ad = `₹40.08` (`$0.43`), Est. AdMob = `₹46.09` (`₹6.58/day`), top US device `B160V = ₹36.99` (`92.3%`, `n=25`).
   - **Proves `P3` targeting leak:** Tier-1 `6u / 6 new / ₹38.56 (96.2% of rev)` vs Rest of World `21u / 16 new / ₹1.52 (3.8% of rev)` — **`16/22` (`72.7%`, `n=22`)** of new `BlockBloom-Tier1-EN` installs landed outside Tier-1.
   - Campaign cohorts (`Nov 19–24`): `Nov 19` `D0=8` (`D1=0`); `Nov 20` `D0=13`, `D1=2 (15%, n=13)`, `D2=1 (8%)`; `Nov 21` `D0=13`, `D1=2 (15%, n=13)`, `D2=1 (8%)`, `D3=1 (8%)`; `Nov 22` `D0=7`, `D1=0`, `D2=1 (14%)`, `D3=1 (14%)`; `Nov 23` `D0=1`; `Nov 24` `D0=1`. Combined `Nov 19–22` `D1 = 4/41` (`9.8%`, `n=41`).

4. **`node tools/ga4-new-user-devices.js --start 2026-11-20 --source=google/cpc`:**
   - `first_open: 114 total | 114 human | 0 robot / no-geo` (`10` Tier-1 device rows); `first clear = 75/109 (68.8%, n=109)`, `tutorial = 82/109 (75.2%, n=109)`, `game over = 45`, `first-session hook = 0`, `offer tap = 0`, `purchase_result = 0`.

---

## 3. `E-1` Interstitial Pacing & `TestLab` Audit (Report-Only; `release/vc44` Runtime Unchanged)

### A. Code Trace (`BlockBloom/.../viewmodel/GameViewModel.kt` & `TestLab.kt`)
1. **False `interstitial_skipped(reason = "rewarded_run")` on Adventure exit (`L799` + `L1715` + `L1056`):**
   - `startLevel()` (`L799`) sets `canRevive = false` (`// levels are pass/fail — no ad-revive`).
   - `maybeInterstitialThen()` (`L1715`) checks `val rewardedWatchedInRun = !_state.value.canRevive || _state.value.doubledThisGame`.
   - When a player exits Adventure via `goHome()` (`L1056`), `!canRevive` evaluates `true`, so `maybeInterstitialThen()` suppresses the ad and logs `interstitial_skipped(reason = "rewarded_run")` **even when zero rewarded ads were watched**.
2. **`rewardedWatchedThisRun` already exists (`L334`, `L705`, `L775`, `L1657`, `L1681`) but is ignored at `L1715`:**
   - `rewardedWatchedThisRun` tracks all rewarded ad placements (`revive`, `double_coins`, `out_of_coins`, `free_coins`), yet `L1715` tests `!canRevive || doubledThisGame` instead of `rewardedWatchedThisRun`.
   - Consequence: both false skips in Adventure (`canRevive == false`) AND an inverted leak in Classic where an `out_of_coins` rewarded ad still allows a post-game exit interstitial in the same run.
3. **Zero interstitial transitions between Adventure levels (`L897–928`):**
   - `retryLevel()` (`L897–901`), `nextLevel()` (`L904–910`), and `exitLevel()` (`L913–928`) never invoke `maybeInterstitialThen()`.
4. **Unlogged early returns & countdown tuning (`L331`, `L1722–1725`, `L1736`):**
   - `interstitialCountdown` starts at `2` (`L331`), resets to `adsConfig.interstitialInterval()` (`4` in Remote Config) only after an interstitial shows (`L1736`), and early returns for `gamesPlayed <= 2` or `countdown > 0` (`L1722–1725`) do not emit `interstitial_skipped` telemetry.
5. **Physical Play Crawler / Lab Device Not Filtered by `TestLab.kt` (`1.19.0` Live Proof):**
   - `TestLab.kt` checks `Settings.System` `"firebase.test.lab" == "true"`.
   - In live `vc44` (`1.19.0`) telemetry on `2026-11-27`, `OnePlus8Pro` (`countryId = ""`, Play crawler/lab phone) still reported to GA4 (`firebase.test.lab` unset on this physical crawler) and logged **`7` `interstitial_skipped` events: `4` `not_loaded` + `3` `reason = "rewarded_run"`**, directly proving bug `#1` above (`L799 + L1715`) in live `1.19.0` production.

### B. Clean Human Telemetry (`Nov 22–27`, Debug & Lab Devices Excluded)
- `ad_requested` (interstitial): **`23`** (`6 + 5` users)
- `ad_loaded` (interstitial): **`21`** (`91.3%`, `n=23`; `2` failed to load)
- `interstitial_shown`: **`12`** across **`3–4` users** (`57.1%` of loaded, `n=21`; `1.17.0`: `7` across `3` users [`SM-S928U: 4`, `SM-A045F: 2`, `SM-A346N: 1`]; `1.16.0`: `5` on `SM-S928U`)
- Denominator: `105` human `1.16.0 + 1.17.0` `game_over`s (`66 + 39`) + `1` `level_complete` (`n=106` run ends) -> `12/106` (`11.3%`, `n=106`) interstitial rate overall because `E1` splits traffic `50/50` and RC `interstitialInterval = 4`.
- Human `interstitial_skipped` events: **`0`** observed (`n=106`). *(Explained by humans mostly playing Classic on `1.16.0/1.17.0` where silent early-returns `L1722–1725` don't emit `interstitial_skipped`.)*

### C. Recommendation Queued for `vc45` (`18 Dec` Slot / January — NOT Applied to `vc44`)
1. Replace `val rewardedWatchedInRun = !_state.value.canRevive || _state.value.doubledThisGame` at `GameViewModel.kt:1715` with `rewardedWatchedThisRun` (eliminate false `rewarded_run` skip on Adventure `goHome()` AND honor `out_of_coins` rewarded opt-ins).
2. Decide `E1` winner on Dec 3 (`12-10k-month-plan.md` `P10`); only after `vc44` retention & `E1` read are settled, decide whether `nextLevel()` / `retryLevel()` transitions should step `interstitialCountdown` with a generous cap (e.g., never on level 1–3 onboarding or after any rewarded ad).
3. Keep GA4 geo/device filters (`growth-kpi.js`, `ga4-new-user-devices.js`) active permanently as defense-in-depth alongside `TestLab.kt` because physical Play crawler devices (`OnePlus8Pro` `countryId=""`) do not set `firebase.test.lab = "true"`.
