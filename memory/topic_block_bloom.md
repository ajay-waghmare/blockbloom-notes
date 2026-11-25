# Topic Memory: Block Bloom (App & Operations)

> **Domain:** Mobile Game Development, Monetization, ASO, Release Engineering  
> **App Title:** Block Bloom: Block Puzzle Game  
> **Package Name:** `com.aweagle.blockbloom`  
> **Play Console App ID:** `4976030358371797626`  
> **Repository:** `https://github.com/ajay-waghmare/BlockBloom.git` (`main`)  
> **Latest Updated:** 2026-11-25  

---

## 1. Current Live Production State
* **Latest Production Version:** `v1.17.0` (`versionCode = 41`).
* **Rollout Track:** Google Play Store `production` at **100% Full Rollout** (Edit `06316255482718347774`).
* **Internal Testing Track:** Also committed at 100% (`versionCode = 41`).
* **Stability:** 100% crash-free sessions across `vc41`, 0 ANRs.
* **Release Artifact:** `releases/BlockBloom-v1.17.0-vc41-release.aab` (21.58 MB, signed with production keystore, R8 minification & resource shrinking enabled).

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
* **Short #2 (Staged):** `BlockBloom/scratch/shorts/short_lineclear.mp4` (8s line clear save).
* **Short #3 (Staged):** `BlockBloom/scratch/shorts/short_daily_challenge.mp4` (12s daily streak challenge).

---

## 6. Daily Analytics Baseline (Nov 24, 2026)
* **DAU:** 31 active users.
* **New Installs:** 9 (100% organic, ₹0 ad spend).
* **Total Sessions:** 47.
* **Total Playtime:** 402.7 minutes (~13.0 min / user).
* **Ad Revenue:** **$0.46 (~₹39.10)** with **100% profit margin**.
* **Tier-1 Contribution:** US generated 3 organic installs and 5 active users today; Tier-1 accounts for ~78% of ad revenue despite being ~15% of players ($0.06 / active user).
