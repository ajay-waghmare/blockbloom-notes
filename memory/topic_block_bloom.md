# Topic Memory: Block Bloom (App & Operations)

> **Domain:** Mobile Game Development, Monetization, ASO, Release Engineering  
> **App Title:** Block Bloom: Block Puzzle Game  
> **Package Name:** `com.aweagle.blockbloom`  
> **Play Console App ID:** `4976030358371797626`  
> **Repository:** `https://github.com/ajay-waghmare/BlockBloom.git` (`main`)  
> **Latest Updated:** 2026-11-28 (`23:23 IST` — **`vc45` (`1.19.1`, `release/vc45`) UPLOADED & STAGED ON PLAY: `internal` `completed` (`100%`) & `production` `inProgress` (`20%`, retaining `vc44` `1.19.0` `completed`!)** — `0` `.so` libs = `100%` 16 KB + older-NDK clean, `15.02` MB `−6.66 MB`, `+50%%` fixed; `Winter Bloom 2026` SUBMITTED; `P3` + `P12` `18%` GST synced (`₹2,000` Dec 3 top-up); `O-9` expanded; 5-card `1080×1920` Play Showcase built in `content/play-showcase/`; remaining: publish/promote `vc45` → `100%` (`P1`), `P2` Ads Verification (`Dec 26`), `P4` static swap + `P9` CPA rule, `O-3`/Landscape video)  

---

## 0. ➡ Gemini Task (27 Nov 10:06 IST)
* [`11-gemini-task-handoff.md`](../01-blockbloom/plan-2026-11/11-gemini-task-handoff.md):
  * **`G-1` Console Pulls DONE (`09:50 IST`, logged in [`journal/2026-11-27.md`](../journal/2026-11-27.md)):** AdMob 14d `Nov 13–26` = `$5.06` (`US $3.87 = 76.5%`, `$87.67` Rewarded / `$66.18` Interstitial eCPM vs `TR $0.00` Banner at `$0.06` eCPM on `1,054` req); Firebase `E1 interstitial on vs off` (`n = 94`: Baseline `49u $0.0017` vs Variant A `45u $0.043`, `P = 0.123` not sig.); Play 28d Default listing `1,861` visitors / `23.8%` conv (`Tier1-EN` `Live`, `-` data), `4.909` avg (`11` total), Icon Test `182` vs `230` (`More data needed`), Pre-launch `Google Medium Phone (16K page size) Android 16`; Google Ads verification **`Not started` (`Dec 26` deadline)**, balance **`₹1,308.45`**.
  * **`G-2` Progress (`#1–7` DONE, `22:45 IST`):** `release/vc44` (`2f69e54`) `238/238` tests, `lintVital` `0`, `jar verified` `21,680,580` B AAB, `5 OK / 26 4KB`, R8 keeps `5/5` adapters + `WinBackReceiver` + `TestLab`. Uploaded (`Edit 04976604612761865576`), `internal` `completed` (`Edit 14292776545235269941`), staged `production 20%` (`Edit 13722057481271952370`), and **PUBLISHED LIVE (`Nov 27 10:41 PM` IST)** — `/tracks/production` shows **`1.19.0 (44)` `Available to 20% of users on Google Play`** alongside **`1.17.0 (41)` `Available on Google Play`** (`vc42` `Superseded`; `/publishing` `0` pending changes). **Next (`G-2 #8` → `#9`):** `24–48h` telemetry watch on `1.19.0 (44)` (`first_session_hook > 0`, `0` Test Lab noise on `1.19.0`, crash-free `>= 99.5%`, ANR `< 0.47%`) → Ajay `go` for `100%` & merge to `main` (Pre-flight `P1` due Thu Dec 3). Also verified **Promotional Content:** `Autumn Bloom Challenge` (`4831564366696552013`, `Nov 30–Dec 7`) is `In preview`; `Winter Bloom` (`Dec 14–21`) ready for Sat Nov 28 submit.
  * **Count humans only:** `growth-kpi.js` & `ga4-new-user-devices.js` (`20–27 Nov` on `release/vc44`) show `138` human vs `60` robot/no-geo `first_open`, **`0` human `first-session hook` / `0` human `offer tap` / `0` human `purchase_result`**, `11` Tier-1 human rows (`1.19.0+` turns off analytics & real ads on Test Lab via `TestLab.kt`).
* **₹10k/month + ads (`27 Nov 23:22 IST` — `P7` & `E-1` DONE):** [`12-10k-month-plan.md`](../01-blockbloom/plan-2026-11/12-10k-month-plan.md) + [`13-preflight-and-e1-audit.md`](../01-blockbloom/plan-2026-11/13-preflight-and-e1-audit.md) + [`06-work-like-claude.md`](../01-blockbloom/gemini-skills/06-work-like-claude.md) + `/bb-start /bb-humans /bb-release /bb-wrapup`. **`P7` verified live** (`growth-kpi.js` Section 7 campaign breakdown + `--source=` filter on `growth-kpi.js` & `ga4-new-user-devices.js`: `BlockBloom-Tier1-EN` `22` new = `6` Tier-1 + `16` RoW `72.7%` leak, `D1 4/41 = 9.8%`, `₹40.08`; `google/cpc` `0/5` offer tap). **`E-1` audited (report-only, `vc44` code untouched):** `GameViewModel.kt:799+1715` false `"rewarded_run"` skip on Adventure exit proved live by `1.19.0` `OnePlus8Pro` crawler (`7` skipped = `4` `not_loaded` + `3` `rewarded_run`); human `Nov 22–27` `23` req -> `21` loaded (`91.3%`) -> `12` shown (`106` ends); fix queued for `vc45`. Next: `24–48h` `vc44` watch -> `P1` `100%` (`Dec 3` top-up `₹1,500` after `P1–P12` green, Stage 0 `₹400/day` `Dec 4–10`).
---

## 1. Current Live & Staged Production State (Plus `vc43` Handoff)
* **Live Serving Production Version:** `v1.17.0` (`versionCode = 41`, `completed`) — still serving `100%` of users because `Managed publishing` is ON.
* **Staged Rollout Version (`release/vc42` `19191e2`):** **`v1.18.0` (`versionCode = 42`)** — `internal` **`completed` 100%** (Edit `18103405302514738223`); `production` **`inProgress` 20%** retaining `vc41` (Edit `05796451548276068436`, queued in Play Managed Publishing). **HOLD `Publish changes` on `vc42`** — Ajay's phone test (`23:15 IST`, `Screenshot_20261126_231514.jpg`) found real UI defects to fix first in **`vc43` (`1.18.1`)**:
  1. **`CONTI...` truncation (`HomeScreen.kt:283-367`):** Narrow `0.5f` teal button crams `PlayArrow` + uppercase `CONTINUE` + `28.dp` `Refresh` circle -> restore full-width primary Classic/Continue bar + external `54.dp` `↻` button and sleek full-width `50.dp` Frosted Violet **`Adventure · Level N >`** strip underneath (with responsive `HeroBlocks` scaling on `available < 670.dp`).
  2. **`DAILY CHAL...` truncation + squashed 7th streak pip `0` + height mismatch (`HomeScreen.kt:1211-1482, 1929-1965`):** Daily header and `StreakLadderRow(compact=true)` were squeezed into `~90dp` next to `44.dp` progress ring, and cards were `126.dp` vs `116.dp`. Fix: lock BOTH `AuroraDailyChallengeCard` & `AuroraLuckyChestCard` to **`136.dp` height**, span Header + Streak Ladder + Timer across **full card width**, keep `40.dp` ring next to ONLY objective/rewards, replace `"📅"` with `Icons.Filled.CalendarMonth`, localize `AuroraSegmentedDifficulty`, and remove unused `onPlay` warning (`HomeScreen.kt:1601`).
  3. **Ship `vc43` (`1.18.1`):** Cut `release/vc43` from `release/vc42`, bump `versionCode = 43` / `versionName = "1.18.1"`, copy `tools/release-notes/vc43.json`, pass `:app:testReleaseUnitTest :app:bundleRelease :app:lintVitalRelease` + R8/manifest checks, replace `vc42` on `internal` (`100%`) & `production` (`20%` `inProgress` retaining `vc41` via fixed `tools/play-rollout.js`), then Ajay approves Managed Publishing.
* **`vc43` (`1.18.1`) — Built & Gate-Verified, NOT Uploaded (27 Nov `00:55 IST`, Claude):** `release/vc43` `0ee3348` + tests `78a4d11` (cut from `release/vc42` `3a6f931`, pushed; 216 unit tests green incl. 33 for vc43). Fixes all three handoff items + localised Home (difficulty labels, BEST badge only with a real best, chest countdown, bottom-nav labels, 13 strings × 6 locales) and height-aware hero board (`HomeLayout.heroScale`). Gate: `testReleaseUnitTest` `189/189`, `bundleRelease` OK (R8, signed, `21,672,591` bytes), `lintVitalRelease` 0, `check-16kb` unchanged (`5` OK / `26` third-party 4 KB `.so`), R8 keeps 5 adapters + `WinBackReceiver`. Release notes `tools/release-notes/vc43.json`. **Next (needs Ajay's go):** upload `vc43` → `internal` 100% + `production` 20% replacing `vc42`, keep `vc41` completed, verify with `play-status.js`, then Publish changes. Details: [`journal/2026-11-27.md`](../journal/2026-11-27.md).
* **Latest Live Telemetry & AdMob Audit (`2026-11-27 07:43–07:44 IST`):** `Nov 27` `9` Real-Geo DAU (`₹30.58`; `SM-S928U` `₹0.33` / `US`); `7d` = `178` Real-Geo DAU (`114` new), `₹311.20` (`$3.35` GA4) / Est. AdMob `₹357.88` (`₹51.13/day`), `SM-S928U = 68.4%`, Tier-1 D1 = `0%`, `V42-03` = `4/5` users (`44.4%`), Play Vitals latest (`2026-11-21`) = `0.00%` crash/ANR. **AdMob `56.96%` Match Rate (`79` req / `45` matched / `32` imp / `$0.32` / `$10.11` eCPM) NOT a bug:** all `34` misses explained by `TR` (`25/28` Banner `120s` refresh exhaustion on 1 `M2101K6G` device with `Personalization disabled`), `RU` (`8/8` blocked), and `IN2025` `(not set)` (`1/1` Rewarded `error_code=3`); `US` (`24/24`, `$182.07` Interstitial eCPM), `BR` (`14/14`), `GT` (`2/2`), `ES` (`1/1`), `IN` (`1/1`) all `100.00%` match rate; `0` Policy Center issues; Mediation groups healthy (AdMob Network only until Mintegral approves).
* **Firebase RC & Non-Code Deliverables Completed (`2026-11-27`):** All `5` new `vc42` RC keys verified LIVE (`HTTP 200` via `read-remote-config.js`: `daily_loop_enabled`, `home_adventure_button`, `referral_enabled`, `reminder_mode`, `reminder_variant`) alongside all `11` prior keys. Shipped live landing page `https://ajay-waghmare.github.io/blockbloom/` (`HTTP 200`, `9b58663`), `Holiday Bloom` (`Dec 24 – Jan 3`) Play card + zero-text `1080x1080` & `1920x1080` PNGs, refreshed Burst 1 Aurora Glass ad creatives (`1200x628`, `1200x1200`, `1080x1920`), `O-9` mini-review/influencer outreach pack + `Reddit #2/#3` drafts, `Day 9` caption/UTM fix, and `13`-locale live Play listing (`badClaims=false`, `video=NONE`) + review (`{}`) audit.
* **Pending Non-Code / Compliance & Next-30-Day `$1–3/Day` Handoff:**
  * **Master GitHub Handoff + `Claude Task` Spec:** [`01-blockbloom/plan-2026-11/09-30day-1to3-dollar-handoff.md`](../01-blockbloom/plan-2026-11/09-30day-1to3-dollar-handoff.md) (`08:30 IST`) — holds full all-time/28d/7d region revenue tables (`US` `$4.42/$6.39 = 69.2%` all-time & `$2.92/$3.36 = 86.9%` 7d; `TR` `$0.05` 28d -> `<1c/day` even at `100%` fill; `RU` `$0.00` suspended; `(not set)` `74/74` = `IN2025` QA bots), why non-US Tier-1 (`GB:10, CA:2, AU:1, NZ:0, IE:0`) stalled (misconfigured paused UAC + `~10` ratings + `0` `O-3` video + `0%` D1), clean Tier-1 28d funnel (`30 -> 17 (56.7%) -> 15 -> 6 (20% game over)`, `60%` uninstall, `offer_tap 3/3 -> purchase_result 2u -> $0`), P0–P3 code improvements (`FirstSession`/onboarding friction, `rewardedWatchedInRun`/`E1` interstitial cadence, `$0.99 starter_pack`, `53` strings, `16 KB` AGP 9), and explicit **`## Claude Task`** checklist.
  1. **Google Ads (`684-480-0945`) Advertiser Verification — DUE Dec 26, 2026 (Start ASAP):** Account pauses Dec 26 if incomplete; up to 7 business days review SLA — complete before Dec 12 Burst 1.
  2. **Google Play 16 KB Memory Page Sizes — STAGED IN `vc45 (1.19.1)` (`23:23 IST`):** Play `1.19.0 (44)` Release Dashboard flagged all `9` `.so` libraries (`libEncryptorP`, `libapminsighta/b`, `libbuffer_pg`, `libfile_lock_pg`, `libnms`, `libpglarmor`, `libtobEmbedPagEncrypt` from `pangle:6.1.0.7.0`, plus `libapplovin-native-crash-reporter` from `applovin:12.6.0.0`) as `< NDK r28` / `4 KB`. Because both networks are dead (`Pangle` blocks individual devs; `AppLovin` closed to new publishers; `0` AdMob mappings), `vc45` drops `pangle` & `applovin`, yielding **`0` native `.so` libraries (`100%` 16 KB compliant)** and cutting AAB size by `6.66 MB` (`15.02` MB). `vc45` is now `internal` `completed` (`100%`) and `production` `inProgress` (`20%`, retaining `vc44` `completed`); once `vc45` hits `100%` live, merge to `main` and prune `AppLovin`/`Pangle` from `store/privacy-policy.html`. `AGP 9 / Kotlin 2.x / GMA 24+` moves cleanly to Jan 2027 without 16 KB blocker pressure.
  3. **Open Growth / Ops Actions:** Ajay to give go for `vc43` Play upload/rollout replacing `vc42` (`vc42` remains `HOLD` on Managed Publishing), decide on ending `E1` early (`ads_interstitial_enabled = true` `100%`), post Day 5 `short_daily_challenge.mp4`, upload `O-3` `15–30s` Play Store video, watch Gmail for Mintegral staff approval (currently OTP-only on Nov 25), and submit `Winter Bloom` Promotional Content card Sat Nov 28.
* **Release Artifact (`vc42`):** `releases/BlockBloom-v1.18.0-vc42-release.aab` (`21,643,784` bytes, `jarsigner` verified, `183/183` tests, `lintVitalRelease` `No issues found.`).

---

## 2. AdMob Bidding Mediation Architecture (`V41-01`)
* **Problem Solved:** Standalone AdMob inventory exhaustion in emerging markets (Turkey, Pakistan, Tunisia) caused match rates to fall to ~58.54% ("Error 3: No Fill").
* **Implementation:** Integrated 5 bidding mediation adapters strictly pinned to GMA 23.2.0 (Kotlin 1.9.24 toolchain compatibility):
  1. **AppLovin:** `com.google.ads.mediation:applovin:12.6.0.0`
  2. **Liftoff Monetize (Vungle):** `com.google.ads.mediation:vungle:7.4.0.1`
  3. **ByteDance Pangle:** `com.google.ads.mediation:pangle:6.1.0.7.0`
  4. **Mintegral:** `com.google.ads.mediation:mintegral:16.8.11.0` (excluding `org.jacoco`)
  5. **Meta Audience Network:** `com.google.ads.mediation:facebook:6.17.0.0`
* **Architectural Decoupling (Law 2):**
  - Added `OPTIMIZE_INITIALIZATION = true` and `OPTIMIZE_AD_LOADING = true` in `AndroidManifest.xml` to keep all ad parsing and SDK loading off the main UI thread.
  - Added `network_security_config.xml` permitting `127.0.0.1` cleartext for Meta Audience Network caching.
  - Fail-Open Remote Config Killswitch: `ads_mediation_enabled` (default `true`) allowing remote fallback to standalone AdMob via `MobileAds.disableMediationAdapterInitialization(appContext)` if an adapter misbehaves.
  - ProGuard/R8 Rules: Custom keep rules in `proguard-rules.pro` protecting adapter class discovery.
  - Merged Manifest Audit: 0 dangerous permissions (no storage, camera, microphone, or location permissions).

---

## 3. Google Play Console Policy: 16 KB Memory Page Size
* **Background:** Google Play mandated that from Nov 1, 2025, apps targeting Android 15+ must support 16 KB page sizes.
* **Diagnostics (`tools/check-16kb.js`):** Block Bloom Kotlin code has 0 `.so` native libraries. 4 KB native `.so` files originated inside third-party SDKs (Pangle and AppLovin crash reporter).
* **Official Extension Approved:** Requested extension under *"Waiting on a new SDK version from an SDK provider"*. Google Play officially approved the extension to **February 1, 2027**. Red warning banner cleared.
* **Long-Term Plan:** Migration to Kotlin 2.0 + GMA 24 scheduled for February 2027 toolchain milestone will natively bring 16 KB-aligned adapters.

---

## 3B. Firebase Remote Config (Version 8 — Nov 25, 2026)
* **`ads_interstitial_enabled`:** Experiment `BlockBloom Android E1` (`abt_1`, 50% `false` / 50% `true`), interval `"4"`.
* **`ads_banner_enabled`:** `true` (locked to 120s refresh in AdMob).
* **`ads_mediation_enabled`:** `true` (explicit fail-open killswitch for `vc41` adapters).
* **`live_events`:** `autumn_bloom_challenge` (`Nov 30 – Dec 8 UTC` condition) serves `Autumn Bloom Challenge` (`DAILY_DOUBLE`, `2.0x` streak bonus, `startsAt: 2026-11-30`, `endsAt: 2026-12-07`); default falls back to `LocalEventConfig`.
* **Mediation Account Status (Nov 25):**
  - AdMob Console Mediation Groups (`Block Bloom - Interstitial` `5755580874` & `Block Bloom - Rewarded` `7054059749`) currently hold `AdMob Network` only (`0` third-party mappings) across `All countries and territories`. US State Privacy (`Published`) already includes `Mobvista/Mintegral` and `Pangle DSP`.
  - **Mintegral (`dev.mintegral.com`):** Registered (`Personal`, `India`, `AW EagleCraft`, `ajaywaghmare00a@gmail.com`) at `2:49 PM IST`; pending Mintegral staff review email. AdMob already shows `Direct relationship ∙ Active partnership`. Only `vc41`-bundled bidder that accepts `Personal` accounts without corporate docs.
  - **Pangle (`ID:5047219` — Closed/Blocked for Individual):** Verified & logged in (`pangleglobal.com`), permanently blocked for individual accounts (`/publisher/companyInfo`: *"Pangle currently does not support individual developers/sole proprietorships..."*; `+ Add` locks `App Status` to disabled `Test` and `App URL` to `-`). Ajay confirmed individual developer status (`4:45 PM IST`); integration dropped until corporate entity exists.
  - **AppLovin / Liftoff / Meta:** AppLovin closed to new publishers (`9:36 AM IST` email); Liftoff paused; Meta deferred (2FA pending).
  - **Hosted `app-ads.txt`:** `https://ajay-waghmare.github.io/app-ads.txt` verified `HTTP 200` (`google.com, pub-1693732810683011, DIRECT, f08c47fec0942fa0`).

---

## 4. Store Presence, Listings & Promotional Content
* **Active Icon Experiment (`Default store listing`):**
  - `Global App Icon Test - Neon Jewel Blast` (ID: `5861519280044674347`), started Nov 18, `Running` (`50%/50%`, `Variant 1` leading `228` vs `181` clicks = `+26%`, `"More data needed"`).
  - Full-bleed `512x512` backup E3 icon variants fixed in `BlockBloom/store/icon-variant-{a-neon,b-crown,c-zen}.png`.
* **Custom Store Listing (`Tier1-EN`):**
  - Status: **`Live`** (verified in Play Console on Nov 24, 2026).
  - Target Audience: 4 countries (United States, United Kingdom, Canada, Australia).
  - Honest copy compliant with Google Play metadata policies (no "no ads" claims, no fake awards).
* **Promotional Content (LiveOps):**
  - Event Name: **`Autumn Bloom Challenge`** (ID: `4831564366696552013`).
  - Schedule: **Nov 30, 2026 – Dec 7, 2026 (UTC)** (now synced 1:1 with Firebase Remote Config `live_events`).
  - Status: **`Not started`** (Approved & Scheduled to trigger automatically).
  - Target: 177 countries (Everyone).

---

## 5. Organic Social Media Growth (Lever O-7)
* **YouTube Channel:** `@ajaywaghmare7034` (Ajay Waghmare).
* **Short #1 (Live):** [`https://youtube.com/shorts/Cc5TRVKpt7c`](https://youtube.com/shorts/Cc5TRVKpt7c).
  - Title: `One piece. Two clears. 😌 #shorts #blockpuzzle #satisfying #relaxing`
  - Tracked Referrer Link: `https://play.google.com/store/apps/details?id=com.aweagle.blockbloom&referrer=utm_source%3Dshorts%26utm_medium%3Dsocial%26utm_campaign%3Dclips_nov26`
* **Short #2 (Live Nov 26):** [`https://youtube.com/shorts/peMbAxgeJpI`](https://youtube.com/shorts/peMbAxgeJpI) (`short_lineclear.mp4`, `0:09` vertical, Public).
  - Title: `Satisfying 8x8 Line Clear Save 🧩😌 #shorts #blockpuzzle #androidgames #satisfying`
* **Reddit Post #1 (`r/playmygame`, Live Nov 26):** [`https://www.reddit.com/r/playmygame/comments/1y5ru1o/android_block_bloom_relaxing_88_block_puzzle_id/`](https://www.reddit.com/r/playmygame/comments/1y5ru1o/android_block_bloom_relaxing_88_block_puzzle_id/) (`u/Spirited-Air-916`, `[Mobile] (Android)`, verified top of `/new`, `Rule 7: 1 post/month`).
* **Short #3 (Staged):** `BlockBloom/scratch/shorts/short_daily_challenge.mp4` (12s daily streak challenge).

---

## 6. Daily Analytics & EOD Ground Truth (Nov 25, 2026 · 17:11 IST)
* **DAU:** `16` active users today (organic only; paid ads paused Nov 22 per Plan v2).
* **New Installs Today:** `4` — **all `4` from United States** (100% Tier-1).
* **Sessions / Playtime Today:** `54` sessions (`3.4/user`), `212.5` min total (`13.3` min/user).
* **Ad Revenue Today:** **`$0.52`** (~₹44, on track vs Plan Day 3 target `₹30`); 7-day total `$3.71` (₹316, Tier-1 share `$2.74` = `74%`).
* **7-Day Funnel & Vitals:** `tutorial_complete` 7d = `68.9%` (mostly pre-`vc40`; `v1.17.0` today `2/3`), `0.00%` crashes, `0.44%` Play vitals ANR. `OnePlus8Pro` US bot fired `56` `app_clear_data` events causing inflated `ad_failed_to_load` (`44/43`).
* **Play Reviews:** `0` unanswered/recent reviews (`play-reviews.js` HTTP 200 `{}`).
* **Content Staged Today:** `01-blockbloom/plan-2026-11/content/clip-captions-week1.md` (Days 3–9 captions + UTM links) and `reddit-post-1-playmygame.md` (Fri Nov 27).

---

## 7. Nov 25 Deep 4-Console Audit & Phase-1/2 Fixes Applied (Full Detail: [`topic_console_audit_2026_11_25.md`](topic_console_audit_2026_11_25.md))
* **Play Console (`8701670281323658688` / `4976030358371797626`):**
  - **Fixed (`O-1` All 13 Locales):** Updated all 12 non-English locales (`ja-JP`, `es-419`, `es-ES`, `pt-BR`, `de-DE`, `tr-TR`, `ko-KR`, `uk`, `id`, `ar`, `zh-TW`, `vi`) to honest ad- + IAP-disclosing copy via Play API (`Validate: 200`, `Commit: 200`).
  - **Fixed Account & Integrity & Data Safety (`21:50–22:47 IST`):** Saved Account Website (`https://ajay-waghmare.github.io/`); linked **Play Integrity API** to Cloud project `620724418792` (`On` for Licensing/App/Device); updated **Data Safety** (`Purchase history` Collected + `Device or other IDs` `App functionality` for FCM — published live Nov 25); approved **Google Ads (`684-480-0945`) Linked Services**; turned **`Managed publishing on`** for Block Bloom (`22:40 IST`); created & enabled owner-only **`Owner QA`** License Testing list (`ajaywaghmare00a@gmail.com` only, `22:47 IST`) keeping `34`-email `Block Bloom Testers` **UNCHECKED** (`RESPOND_NORMALLY`). Website (`bca6309`) & Privacy Policy (`faa8483` -> `14 months`) also pushed live.
  - **Remaining Play Gaps:** Missing 30s Promo Video (`O-3`); Deep Links `none`; `16 KB` deadline **Feb 1, 2027**.
* **Firebase & GA4 (`block-bloom-31b39` / `555700046`):**
  - **Fixed (`20:40–23:06 IST`):** Added all Release (`Play App Signing` + `Upload`) & Debug SHA-1/SHA-256 fingerprints; **linked Google Play** in Firebase Integrations; published **Remote Config `v9`** (`11` keys, all 5 `vc40` defaults added cleanly, `E1` + `autumn_bloom_challenge` untouched); registered **`17` GA4 Custom Dimensions** (`15` Event incl. `ad_format`, `ad_source`, `adapter`, `placement`, `trigger`, `reason`, `error_code`, `via`, `step`, `offer`, `action`, `result`, `event_id`, `mode`, `product_id` + `2` User `first_vc`, `notif_perm`, verified `CD status: 200`); unmarked `10` noisy Key Events leaving **`6` clean Key Events** (`first_open`, `tutorial_complete`, `in_app_purchase`, `purchase`, `app_store_subscription_convert`, `app_store_subscription_renew`, verified `KE status: 200`).
  - **Remaining GA4/Perf Gaps:** Perf Monitoring `No data`; **`Google Signals DISABLED`** (requires user click/policy acknowledgment in Data Collection UI).
* **AdMob (`pub-1693732810683011`):**
  - **Fixed:** Created **`Block Bloom - Banner`** mediation group (`8407768586`, `AdMob Network` Active) -> Banner now shows `1 active`. Applied Ajay Q2 decision: Max Ad Content Rating **`MA` → `T` (`Teens`)** and **`References to Sex` = `Blocked`** (`Sexual & Reproductive Health` untouched at `Allowed`); enabled GDPR **`Automatically add ad sources as ad partners`**, **`Enable consent mode for advertising purposes`**, and **`Enable consent mode for analytics purposes`**.
  - **Remaining:** Mintegral awaiting staff approval; verify India/W-8BEN tax inside AdMob Payments.
* **Google Ads (`684-480-0945`):**
  - **Fixed (`21:50 IST`):** Confirmed both campaigns `Paused` (`₹0/day`), TZ IST. Verified `BlockBloom-Tier1-EN` **`Presence`**, **`English`**, **`5/5` clean Descriptions**, **`1/20` Short #1 Video**, `App-1` clean Headline 5, **Rule `62682154` (`Pause Tier1 at 3000 spend`) `Paused`**, BOTH YouTube conversion actions **`Secondary`**, and **Google Play (`8701670281323658688`) Linked**. (`first_open` not selectable in GA4 App import search; Play `installs` remains Primary.)
  - **Remaining (Ajay Action):** Submit `India tax info` alert in Google Ads Billing; decide on optional Advertiser Verification / `in_app_purchase` import.
