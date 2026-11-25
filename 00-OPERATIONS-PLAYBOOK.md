# AW EagleCraft — Master Developer Websites, Console & Growth Operations Playbook

> **Studio / Entity:** AW EagleCraft (`Non-trader` personal account — declare trader status by **Feb 1, 2027**)  
> **Primary Owner Login & Support Email:** `ajaywaghmare00a@gmail.com` (`Console contact email: ajaywaghmare11a@gmail.com`)  
> **Live Products:** **Block Bloom: Block Puzzle Game** (`com.aweagle.blockbloom` — Production `1.17.0 vc41`) & **Arrow Bloom – Tap Logic Puzzle** (`com.aweagle.arrowbloom` — Closed Alpha `1.0.0 vc4`)  
> **Last Verified Against Live Consoles & APIs:** November 25, 2026 (`23:10 IST`)

---

## Table of Contents
1. [Studio Ecosystem Map & Master IDs Reference](#1-studio-ecosystem-map--master-ids-reference)
2. [The 6 Non-Negotiable Engineering & Growth Laws](#2-the-6-non-negotiable-engineering--growth-laws)
3. [Day-to-Day, Weekly & Release Operating Cadence](#3-day-to-day-weekly--release-operating-cadence)
4. [Platform 1 — Studio Websites, Privacy Policies & `app-ads.txt`](#4-platform-1--studio-websites-privacy-policies--app-adstxt)
5. [Platform 2 — Google Play Console (`Block Bloom` & `Arrow Bloom`)](#5-platform-2--google-play-console-block-bloom--arrow-bloom)
6. [Platform 3 — Firebase Console (`block-bloom-31b39` & Multi-App Rules)](#6-platform-3--firebase-console-block-bloom-31b39--multi-app-rules)
7. [Platform 4 — Google Analytics 4 (`GA4` · `555700046`)](#7-platform-4--google-analytics-4-ga4--555700046)
8. [Platform 5 — Google AdMob (`pub-1693732810683011`) & Mediation](#8-platform-5--google-admob-pub-1693732810683011--mediation)
9. [Platform 6 — Google Ads (`684-480-0945`), YouTube & 7-Day Burst Playbook](#9-platform-6--google-ads-684-480-0945-youtube--7-day-burst-playbook)
10. [Local Tooling, GitHub Repositories & Multi-AI Continuity (`Law 6`)](#10-local-tooling-github-repositories--multi-ai-continuity-law-6)
11. [Troubleshooting Runbooks & Emergency Kill Switches](#11-troubleshooting-runbooks--emergency-kill-switches)
12. [Immediate Action Checklist & Schedule (Nov 26 – Dec 31, 2026)](#12-immediate-action-checklist--schedule-nov-26--dec-31-2026)

---

## 1. Studio Ecosystem Map & Master IDs Reference

Think of all 6 web platforms as one connected pipeline — **every player, click, crash, ad impression, and rupee spent flows between them**:

- **GitHub Pages Websites (`ajay-waghmare.github.io` & `app-policy`)** provide Play Store identity, legally accurate privacy policies, and AdMob's `app-ads.txt` seller verification.
- **Google Play Console (`8701670281323658688`)** distributes builds, protects APKs/billing with **Play Integrity API**, enforces store honesty & Data Safety, runs icon/listing experiments, and schedules Promotional Content cards.
- **Firebase (`block-bloom-31b39`)** controls runtime app behavior without app updates (**Remote Config `v9`**, **A/B Testing `E1`**, **FCM Push**), monitors crashes (**Crashlytics**), and bridges Play/Billing/Ads into Analytics.
- **Google Analytics 4 (`555700046`)** records every raw gameplay, onboarding, IAP, and ad-mediation event (`17` custom dimensions, `6` clean conversion Key Events) so you can judge cohorts on real profit rather than vanity installs.
- **Google AdMob (`pub-1693732810683011`)** fills Banner, Interstitial, and Rewarded ad slots while enforcing Teen (`T`) safety filters, GDPR Consent Mode, and US privacy compliance.
- **Google Ads (`684-480-0945`)** buys paid Tier-1 installs **only during approved 7-day bursts** stacked alongside LiveOps events and organic clips.

### Master IDs & Working Direct URLs (Bookmark These)

| Platform / Resource | Verified ID / Identifier | Exact Bookmark URL (Signed In As `ajaywaghmare00a@gmail.com`) |
|---|---|---|
| **Play Console Account** | `8701670281323658688` (`AW EagleCraft`) | `https://play.google.com/console/u/0/developers/8701670281323658688` |
| **Play — Block Bloom** | `4976030358371797626` (`com.aweagle.blockbloom`) | `https://play.google.com/console/u/0/developers/8701670281323658688/app/4976030358371797626/app-dashboard` |
| **Play — Block Bloom Publishing** | `Managed publishing on` | `https://play.google.com/console/u/0/developers/8701670281323658688/app/4976030358371797626/publishing` |
| **Play — License Testing** | `Owner QA` (`1` user) ON; `Block Bloom Testers` (`34`) OFF | `https://play.google.com/console/u/0/developers/8701670281323658688/license-tester` |
| **Play — Arrow Bloom** | `4972007048514376994` (`com.aweagle.arrowbloom`) | `https://play.google.com/console/u/0/developers/8701670281323658688/app/4972007048514376994/app-dashboard` |
| **Arrow Bloom Closed Test URL** | Currently `9/12` opted-in (`12` required for 14d clock) | `https://play.google.com/apps/testing/com.aweagle.arrowbloom` |
| **Arrow Bloom Internal Test URL** | Live `1.0.0 (4)` build | `https://play.google.com/apps/internaltest/4701488149397707358` |
| **Firebase Project** | `block-bloom-31b39` (`#620724418792`, Spark plan) | `https://console.firebase.google.com/u/0/project/block-bloom-31b39/overview` |
| **Firebase Remote Config** | `v9` (`11` console keys; `E1` + `autumn_bloom_challenge`) | `https://console.firebase.google.com/u/0/project/block-bloom-31b39/config` |
| **Firebase Crashlytics** | Real crashes vs crawler traces | `https://console.firebase.google.com/u/0/project/block-bloom-31b39/crashlytics` |
| **GA4 Property (Home)** | Account `409217568` · Property `555700046` (`USD`, `IST`) | `https://analytics.google.com/analytics/web/?authuser=ajaywaghmare00a@gmail.com#/a409217568p555700046/reports/intelligenthome` |
| **GA4 Custom Definitions** | `17` active (`15` Event + `2` User) | `https://analytics.google.com/analytics/web/?authuser=ajaywaghmare00a@gmail.com#/a409217568p555700046/admin/customdefinitions/hub` |
| **GA4 Key Events** | `6` active (`first_open`, `tutorial_complete`, `purchase`, etc.) | `https://analytics.google.com/analytics/web/?authuser=ajaywaghmare00a@gmail.com#/a409217568p555700046/admin/events/hub` |
| **GA4 Data Collection / Signals** | Signals currently `OFF`; Retention `14 months` | `https://analytics.google.com/analytics/web/?authuser=ajaywaghmare00a@gmail.com#/a409217568p555700046/admin/datapolicies/datacollection` |
| **GA4 Access Management (IAM)** | Real GA4 Admin IAM route | `https://analytics.google.com/analytics/web/?authuser=ajaywaghmare00a@gmail.com#/a409217568p555700046/admin/suiteusermanagement/property` |
| **Google AdMob** | `pub-1693732810683011` (`T` rating; `References to Sex` blocked) | `https://admob.google.com/v2/home` |
| **AdMob Privacy (GDPR Settings)** | Consent Mode + Auto-add ad partners `ON` | `https://admob.google.com/v2/privacymessaging/gdpr/settings` |
| **Mintegral Monetization** | Pending staff review email (`ajaywaghmare00a@gmail.com`) | `https://dev.mintegral.com/` |
| **Google Ads** | `684-480-0945` (`INR`, `IST`, both campaigns `Paused`) | `https://ads.google.com/aw/overview?ocid=6844800945` |
| **Studio Homepage & `app-ads.txt`** | `ajay-waghmare.github.io` (`main`) | `https://ajay-waghmare.github.io/` and `/app-ads.txt` |
| **Privacy Policies** | `app-policy` (`main`) | `https://ajay-waghmare.github.io/app-policy/privacy-policy.html` & `arrow-bloom-privacy.html` |
| **YouTube Channel** | `@ajaywaghmare7034` (`UCBZUj4KPehpaCozGzVB01eg`) | `https://youtube.com/@ajaywaghmare7034` |

> **Critical Chrome Login Rule:** Always sign in with `ajaywaghmare00a@gmail.com` (`/u/0/`). For **Google Analytics (`GA4`)**, ALWAYS use `?authuser=ajaywaghmare00a@gmail.com` in the URL — otherwise multi-account browser sessions redirect or fail with `"link not found"` / HTTP `401`.

---

## 2. The 6 Non-Negotiable Engineering & Growth Laws

Before clicking any toggle or shipping any build, obey the studio constitution (`GEMINI.md`):

1. **Law 1 — Absolute Diagnostic Truth:** Never guess why crashes, ANRs, or ad fill drops happened. Inspect raw Crashlytics stack traces, Play Vitals, GA4 dimensions (`ad_source`, `error_code`, `ad_format`), or CLI script output first.
2. **Law 2 — Systemic Architecture Over Band-Aids:** Main UI thread never does disk I/O, network waits, or locks; async SDKs (`AdMob`, `Firebase`, `Billing`) decouple `in-flight` from `completed`; everything uses `applicationContext` and **fails open** so gameplay never breaks offline or on 5xx responses.
3. **Law 3 — Brutal Realism (Zero Vanity Numbers):** Track **Daily Active Users (`DAU`)**, **Day-1 / Day-7 Retention**, **Real Tier-1 eCPM**, and **Net Profit (`Revenue - Ad Spend`)** — never celebrate cumulative downloads or cheap low-LTV installs.
4. **Law 4 — 4-Gate Verification Before Declaring Done:**
   - *Gate 1:* Release `.aab` compiles cleanly with R8 minification & resource shrinking (`isMinifyEnabled = true`, `isShrinkResources = true`).
   - *Gate 2:* Thread safety & merged manifest audit (`0` dangerous permissions).
   - *Gate 3:* Production rollout committed cleanly with localized notes in all `13` languages.
   - *Gate 4:* Post-release Crashlytics & Play Vitals check confirms stability (`>= 99.5%` target, `0` new crashes, ANR `< 0.47%`).
5. **Law 5 — Player Retention & Trust Preservation:**
   - **Never** raise `min_supported_version_code` until the new version is verified live across Google Play's regional CDN edge servers (prevents "Open vs Update" trap).
   - Opt-in rewarded ads take priority over forced ads; **Banner refresh stays locked at `120s`**.
   - Store listings, shop banners, and posts must be 100% honest about ads & IAPs.
6. **Law 6 — Mandatory Session Continuity & Multi-AI Memory Sync:**
   - **Start of any session:** Read `blockbloom-notes/memory/MEMORY.md`, domain topic files, latest `journal/YYYY-MM-DD.md`, and `BlockBloom/DAILY_ACTIVITY.md`.
   - **End of any session:** Update the affected markdown files in clean **UTF-8**, commit, and push all changed repos (`blockbloom-notes -> journal`, `arrowbloom-notes -> journal`, `BlockBloom -> main`, `ArrowBloom -> release/2026-10-20-line-arrows`) with clean `git status` and `0 0` ahead/behind before stopping.

---

## 3. Day-to-Day, Weekly & Release Operating Cadence

### A. Daily 10–15 Minute Check (Every Morning / Evening IST)
Run this exact sequence — outside ad bursts it takes 10 minutes:

1. **Pull Local CLI Summary (Read-Only):**
   From `BlockBloom/`:
   - `node tools/growth-kpi.js` (check Tier-1 vs Rest-of-World `first_open`, DAU, `tutorial_complete`, AdMob-adjusted INR revenue).
   - `node tools/play-reviews.js <sa-key.json>` (reply promptly to any new Play Store review; zero spam/robotic templates).
   - `node tools/monitor-release.js` (during staged rollouts).
2. **Firebase Crashlytics (`block-bloom-31b39`):**
   - Check crash-free sessions (healthy bar **`>= 99.5%`**; currently **`100.0%`** real-player crashes on `vc41`).
   - Distinguish real player issues from **automated test-farm / crawler noise** (e.g., `Pixel 8 Pro` Android 13 hitting obfuscated `SourceFile` AppLovin activities, or `OnePlus8Pro` US bot firing repeated `app_clear_data`).
3. **Play Console -> Android Vitals (`Block Bloom`):**
   - Check **User-perceived ANR rate** (Google Play bad behavior threshold = **`0.47%`**; `vc41` sits at **`0.44%`**) and **Publishing overview** (`Managed publishing on` -> check if anything awaits your `Publish changes` click).
   - **Arrow Bloom check (until 14-day clock starts):** Open Dashboard and verify `Closed testing` opted-in count (`9/12` -> waiting for `12/12` to start the 14 continuous days).
4. **AdMob Home (`pub-1693732810683011`):**
   - Check **Estimated earnings (USD)**, **Match rate** per ad unit (Banner `~3081693900`, Interstitial `~5516285554`, Rewarded `~7020938918`), and any **Policy Center / app-ads.txt** alert (`No current issues`).
   - Check Gmail (`ajaywaghmare00a@gmail.com`) periodically for **Mintegral** approval (`dev.mintegral.com`).
5. **Google Ads (`684-480-0945`):**
   - Outside burst windows (`Nov 23 – Dec 11`, `Dec 19 – Dec 24`), verify **`BlockBloom-Tier1-EN` = `Paused` (`₹0/day`)** and **`App-1` = `Paused`**.
   - **During a live burst (`Dec 12 – Dec 18`):** Check Spend, Balance, Play Installs, and KPI tool's **Cost per Opened Install** (`<= ₹30` target; **`> ₹45` 3-day avg on Burst Day 3+ triggers same-day Kill Switch!**).
6. **Publish Daily Organic Content & Log:**
   - Post the scheduled short video clip + update `BlockBloom/DAILY_ACTIVITY.md` and `blockbloom-notes/journal/YYYY-MM-DD.md`.

### B. Weekly Saturday Review (30 Minutes)
1. **Retention & Funnel Audit:** Check `tutorial_complete` (`>= 80%` target on `vc40+` cohorts), Day-1 Retention (`>= 25%` organic / `>= 28%` burst), and Ad Load Success (`>= 60%` for Banner + Rewarded).
2. **Experiments Check (`Don't Peak Too Early`):**
   - **Firebase A/B Test `E1` (Interstitial ON vs OFF):** Wait until the planned sample / **Dec 6** review window — never stop an A/B test at `p = 0.097` or `32` users/arm.
   - **Play Console `Global App Icon Test` (`5861519280044674347`):** Check statistical confidence badge; only apply winner once Google Play declares statistically significant winner (currently `"More data needed"`).
3. **Promotional Content Lead-Time Check:** Play Promotional Content cards MUST be submitted **>= 15 days before start date** to remain eligible for Play Store featuring (`Winter Bloom` Dec 14 -> submit **Sat Nov 28**; `Holiday Bloom` Dec 24 -> submit **Wed Dec 9**).

---

## 4. Platform 1 — Studio Websites, Privacy Policies & `app-ads.txt`

### Repositories & Live Responsibilities
1. **`ajay-waghmare.github.io` (`main`) -> `https://ajay-waghmare.github.io/`**
   - `index.html`: Studio landing page showcasing **both** Block Bloom and Arrow Bloom, support contact (`ajaywaghmare00a@gmail.com`), and direct links to both privacy policies and `/app-ads.txt`. Must match Play Console **Account Details -> Website**.
   - `app-ads.txt`: Currently authorizes Google AdMob publisher **`google.com, pub-1693732810683011, DIRECT, f08c47fec0942fa0`**. Must be publicly reachable with `HTTP 200` and plain-text formatting.
2. **`app-policy` (`main`) -> `https://ajay-waghmare.github.io/app-policy/...`**
   - `privacy-policy.html` (**Block Bloom**): Accurately declares **`14 months`** GA4/Firebase data retention (matching `FOURTEEN_MONTHS`), Google Advertising ID (`AD_ID`), Firebase Cloud Messaging (`FCM`) push tokens, UMP EEA/UK/CH consent choices, and Google Play Billing IAPs.
   - `arrow-bloom-privacy.html` (**Arrow Bloom**): Clean offline/zero-data-collection statement matching `1.0.0`.

### Day-to-Day Rules & Update Workflow
- **Whenever you add ANY new ad SDK / bidder in AdMob (e.g., Mintegral once approved):** Copy their official `app-ads.txt` seller line into `ajay-waghmare.github.io/app-ads.txt`, commit + push to `main`, wait ~2 minutes for GitHub Pages deploy, verify via `curl` / browser, and verify inside AdMob `All apps -> View all apps -> app-ads.txt` (`Authorized` 100%).
- **Whenever you change data collection or retention (e.g., Arrow Bloom `1.1.0` adding Firebase + AdMob):** Update `arrow-bloom-privacy.html` **FIRST**, push to `app-policy main`, verify live HTTP 200 URL, and **ONLY THEN** update Play Console Data Safety & upload the `1.1.0` `.aab`.

---

## 5. Platform 2 — Google Play Console (`Block Bloom` & `Arrow Bloom`)

**Account ID:** `8701670281323658688` (`AW EagleCraft`, Personal `Non-trader` — declare trader status before **Feb 1, 2027**).

### Key Account-Wide Screens & How to Use Them
1. **Managed Publishing (`Block Bloom -> Publishing overview`):**
   - Currently **`Managed publishing on`**.
   - **How it works:** When you or an API script (`play-listings-set-multi.js`, `play-rollout.js`, Data Safety) submits changes, Google still reviews them normally, then holds the approved changes under **Changes ready to publish**. Nothing reaches live Play users until you inspect the summary and click **Publish changes**.
   - **Why keep ON for Block Bloom:** Prevents half-finished store text, Data Safety changes, and AAB rollouts from hitting users out of sync. *(Arrow Bloom keeps `Managed publishing off` in Closed Alpha so testers auto-receive test updates immediately.)*
2. **License Testing (`Setup / Play apps settings -> License testing`):**
   - Exact URL: `https://play.google.com/console/u/0/developers/8701670281323658688/license-tester`.
   - **Current configuration:** **`Owner QA`** (`1` email: `ajaywaghmare00a@gmail.com`) = **CHECKED**; **`Block Bloom Testers`** (`34` emails) = **UNCHECKED**; **`License response = RESPOND_NORMALLY`**.
   - **Golden Rule:** NEVER check your 34-person Closed Alpha tester list here! Anyone checked in License Testing sees Google Play's **"Test card, always approves"** option on **Production** IAPs (`remove_ads`, `gems_*`) too. Keep only **`Owner QA`** checked so only you can QA purchases without paying real money.
3. **Play Integrity API (`Block Bloom -> App integrity`):**
   - Linked to Cloud Project **`620724418792` (`Block Bloom` / `block-bloom-31b39`)**; **App licensing**, **Application integrity**, and **Device integrity** all **`On`**. Ensures Play Billing & backend protections recognize genuine Play-installed builds.
4. **16 KB Page Size Compliance:**
   - Block Bloom (`vc41`) holds an approved **Extension until February 1, 2027** (covering third-party `.so` binaries in AppLovin crash reporter & Pangle). Scheduled **Kotlin 2.0 + GMA 24** upgrade removes 4 KB native libs well before Feb 2027. Always verify bundles with `node BlockBloom/tools/check-16kb.js`.
5. **Promotional Content (`Grow users -> Store presence -> Promotional content`):**
   - **`Autumn Bloom Challenge` (`4831564366696552013`):** Approved for **Nov 30 – Dec 7, 2026 UTC** (`177` countries) and synced 1:1 with Firebase Remote Config `live_events`.
   - **Mandatory Timing Rule:** Submit every Promotional Content event **>= 15 days before start** (`Winter Bloom` Dec 14 -> **Nov 28**; `Holiday Bloom` Dec 24 -> **Dec 9**). Match exact title, dates, and multiplier (`2.0x`) inside Firebase Remote Config `live_events`.
6. **Store Listings, Custom Listings (`Tier1-EN`) & Experiments (`E3 Icon`):**
   - Use **`BlockBloom/tools/play-listings-set-multi.js`** for bulk multi-locale (`13` languages) edits rather than hand-editing UI boxes (`en-US`, `ja-JP`, `es-419`, `es-ES`, `pt-BR`, `de-DE`, `tr-TR`, `ko-KR`, `uk`, `id`, `ar`, `zh-TW`, `vi`). Never promise `"no ads"`, `"< 1 MB"`, or `"rewarded videos only"` anywhere.
   - **WARNING while running API scripts:** Never make edits inside the Play Console web UI while a Play Developer API `edits` script is running, or Google Play discards the pending API edit!
7. **Play Developer API Gotchas:**
   - **Track Rollout Rule:** When promoting or updating `production` via API (`play-rollout.js`), ALWAYS keep any active/halted live release in the same `tracks.update` payload; omitting a live release fails or drops it (`play-stage-draft.js` enforces this on Arrow Bloom).
   - **IAP API Endpoint:** `/inappproducts` returns HTTP `403` (*"migrate to the new publishing API"*). Use **`/oneTimeProducts`** (`remove_ads`, `gems_small`, `gems_medium`, `gems_large`).

### Arrow Bloom (`4972007048514376994`) — Specific Workflow to Reach Production
- **Current Track State:** `Internal testing` `1.0.0 (4)` & `Closed testing - Alpha` `1.0.0 (4)` (`178` countries) are both **Live / Available to testers**.
- **Production Blocker (`9/12` -> `12/12`):** Google Play requires **at least 12 opted-in testers** continuously for **14 full days** before enabling **Apply for production**. As of Nov 25 (`22:40 IST`), **9/12** are opted in — you need **3 more real Google accounts** to accept `https://play.google.com/apps/testing/com.aweagle.arrowbloom` (and ideally install & open once).
- **Pre-Production Polish Queue:** Add `7-inch` and `10-inch` tablet screenshots + a short Promo Video (`0` currently uploaded). Do NOT touch Data Safety / Ads (`No` / `no data collected`) during `1.0.0`!

---

## 6. Platform 3 — Firebase Console (`block-bloom-31b39` & Multi-App Rules)

**Project:** `block-bloom-31b39` (Project `#620724418792`, Spark plan).  
**Apps Registered:** `com.aweagle.blockbloom` (`1:620724418792:android:a7b375000072c50ff6f15d`) and `com.aweagle.blockbloom.debug` (`1:620724418792:android:7d259bd308ca559ef6f15d`).

### Locked Multi-App Architecture (`Ajay Q1 Decision`)
- **Rule:** **One dedicated Firebase project per game.**
  - `block-bloom-31b39` stays strictly for **Block Bloom**.
  - **Arrow Bloom (`com.aweagle.arrowbloom`)** stays completely offline/Firebase-free through `1.0.0` Closed Testing -> Production approval; in **`1.1.0`**, create a dedicated Firebase project (`arrow-bloom`) and link it under the **same GA4 Account (`409217568`)**, **AdMob (`pub-1693732810683011`)**, **Play (`8701670281323658688`)**, and **Google Ads (`684-480-0945`)**.
  - *Why:* Remote Config keys (`live_events`, `min_supported_version_code`, `ads_*`), A/B experiments, FCM push campaigns, and Crashlytics quotas are project-scoped; mixing apps invites accidental push blasts or killswitch collisions.

### How to Operate Each Firebase Module Safely
1. **Remote Config (`v9` — 11 Parameters Published):**
   - **Kill Switches & Safety Flags:**
     - `ads_banner_enabled` (`true`)
     - `ads_interstitial_enabled` (`false` default / controlled by **Experiment `E1` `abt_1` 50/50 condition** — **NEVER delete or overwrite this condition!**)
     - `ads_interstitial_interval` (`4`)
     - `ads_interstitial_min_gap_s` (`150` seconds minimum between fullscreen ads)
     - `ads_mediation_enabled` (`true` — remote killswitch calling `MobileAds.disableMediationAdapterInitialization()` if an adapter causes crashes/ANRs)
     - `ads_rewarded_ready_only` (`true`) & `ads_rewarded_fallback_grant` (`true`)
     - `remove_ads_offer_enabled` (`true`) & `review_prompt_enabled` (`true`)
   - **LiveOps (`live_events`):**
     - Conditional parameter `autumn_bloom_challenge`: matches `app.id == '1:620724418792:android:a7b375000072c50ff6f15d'` AND `dateTime >= 2026-11-30T00:00:00` AND `< 2026-12-08T00:00:00` -> serves `Autumn Bloom Challenge` (`DAILY_DOUBLE`, `2.0x`). Default uses `{ useInAppDefault: true }` (`LocalEventConfig`).
     - Next LiveOps scheduled rule: **Winter Bloom** (`Dec 14 – Dec 21`).
   - **Force-Update Gate (`min_supported_version_code`):** **Law 5 rule:** ONLY bump above current threshold after `play-status.js` + live Play Store check confirm regional Play CDNs are serving the new version globally!
   - **Spark/Blaze Billing Check:** Review the Remote Config **Blaze pricing banner** directly in Console (`upgrade to Blaze...`) to avoid any unexpected limit.
2. **A/B Testing (`E1` Interstitial Test):**
   - View under **Engage -> A/B Testing**. Track **`Estimate Daily Ad Revenue / User`** + **Retention**, not guesses. Keep running untouched until **Sun Dec 6** (minimum 14 days of `vc40+` / `vc41` traffic).
3. **Crashlytics & Project Settings -> SHA Fingerprints:**
   - **SHAs Installed:** `com.aweagle.blockbloom` already has both **Play App Signing** (`E9:E1:...` / `BE:51:...`) and **Upload Key** (`7A:0A:...` / `36:03:...`) SHA-1 & SHA-256 registered; `.debug` has debug SHAs (`F0:DB:...` / `3E:4B:...`). Add `.release` SHA-1/256 immediately if you ever enable App Check / Google Sign-In / Dynamic Links on a new Firebase project (`arrow-bloom`).
   - **Integrations Active:** Google Play (`App Distribution`, `Crashlytics`, `Google Analytics`), Google Analytics (`555700046`), AdMob, Google Ads (`684-480-0945`).
4. **Cloud Messaging (`FCM v1`, Sender ID `620724418792`):**
   - Client auto-init fixed in `vc40`. First planned push campaign: **Winter Bloom (`Mon Dec 14`)** targeting opted-in players with clear, helpful event copy (`05-content-pack.md`).

---

## 7. Platform 4 — Google Analytics 4 (`GA4` · `555700046`)

**Account:** `409217568` · **Property:** `555700046` (`block-bloom-31b39`, Time Zone `Asia/Calcutta`, Currency `USD`, Data Retention **`14 months`**, Attribution `Data-driven` `30d`/`90d`).  
**Streams:** `15836064648` (`com.aweagle.blockbloom`) and `15837881470` (`com.aweagle.blockbloom.debug`).

### Solving GA4 Login / URL Issues
Always bookmark and open GA4 using **`?authuser=ajaywaghmare00a@gmail.com`**:
- Reports Home: `https://analytics.google.com/analytics/web/?authuser=ajaywaghmare00a@gmail.com#/a409217568p555700046/reports/intelligenthome`
- Property Access (IAM): `https://analytics.google.com/analytics/web/?authuser=ajaywaghmare00a@gmail.com#/a409217568p555700046/admin/suiteusermanagement/property`
- Data Collection (`Google Signals`): `https://analytics.google.com/analytics/web/?authuser=ajaywaghmare00a@gmail.com#/a409217568p555700046/admin/datapolicies/datacollection`

### Active Schema (`17` Custom Dimensions + `6` Clean Key Events)
All `17` dimensions below are registered as of Nov 25 (`24–48h` warm-up window for newly incoming values):

| Scope | Parameter / Property Key | Display Name | What It Lets You Measure in GA4 |
|---|---|---|---|
| **Event (1–5)** | `ad_format`, `ad_source`, `adapter`, `error_code`, `placement` | `Ad Format`, `Ad Source`, `Ad Adapter`, `Ad Error Code`, `Placement` | Breakdown fill/failures per banner/interstitial/rewarded AND by bidding SDK (`ad_source` / `adapter`)! |
| **Event (6–10)** | `trigger`, `reason`, `via`, `step`, `offer` | `Trigger`, `Reason`, `Tutorial Via`, `Tutorial Step`, `Offer ID` | Why ads were skipped (`gap`, `not_loaded`), onboarding step drop-offs, contextual IAP offer impressions! |
| **Event (11–15)** | `action`, `result`, `event_id`, `mode`, `product_id` | `User Action`, `Result`, `LiveOps Event ID`, `Game Mode`, `Product ID` | LiveOps engagement (`Autumn Bloom`), `remove_ads` vs `gems_*` taps, Classic vs Adventure vs Daily! |
| **User (16–17)** | `first_vc`, `notif_perm` | `First Version Code`, `Notification Permission` | Cohort comparison (`vc40`/`vc41` vs old versions) & opt-in push reachability! |

- **Key Events Kept (`6` Only):** `first_open`, `tutorial_complete`, `in_app_purchase`, `purchase`, `app_store_subscription_convert`, `app_store_subscription_renew`. (`10` noisy events like `session_start`, `view_item`, `add_to_cart`, `ad_reward`, `first_clear` were unmarked so Google Ads / attribution models never train on junk!)

### Mandatory GA4 Analytics Traps to Watch Out For
1. **Debug Traffic Pollutes Property:** Debug builds report into stream `15837881470`. Every report or script MUST apply `appVersion does not contain debug` (`F_NODEBUG`).
2. **Pre-Launch Test Bots (`(not set)` & `OnePlus8Pro`):** Exclude `countryId = (not set)` / empty (Play pre-launch bots skew Day-1 retention downward) and check anomalous `app_clear_data` spikes (`OnePlus8Pro` US bot fired `56` resets causing `44` synthetic `ad_failed_to_load` events).
3. **Never Use `publisherAdImpressions` as Your Ad Count:** The app also fires its own ad impression/shown event; rely on **`totalAdRevenue`** for GA4 money and **AdMob UI / `K` ratio** (`AdMob INR / GA4 INR`, ~`1.15` baseline) for true payout estimates.
4. **`DebugView` Verification on Real Phone:** Before releasing any analytics change:
   `adb shell setprop debug.firebase.analytics.app com.aweagle.blockbloom.debug` -> play -> watch live events in **GA4 Admin -> Data display -> DebugView**.

---

## 8. Platform 5 — Google AdMob (`pub-1693732810683011`) & Mediation

**App:** `Block Bloom: Block Puzzle Game` (`ca-app-pub-1693732810683011~8657812038`, TZ `IST`, payout `USD`, `sellers.json = Transparent`, `app-ads.txt` `100%` authorized).  
*(Ignore hidden `(Windows PC) Block Bloom` `~7355057391`; DO NOT create Arrow Bloom in AdMob until `1.1.0` adds monetization.)*

### Ad Units & Active Mediation Groups
| Format | Ad Unit ID | Floor / Refresh Config | Active Mediation Group (`All countries`) | Third-Party SDK Status (`vc41` APK Bundles 5) |
|---|---|---|---|---|
| **Banner** | `ca-app-pub-1693732810683011/3081693900` | Refresh **locked `120s`** (Law 5); Floor `Disabled` | `Block Bloom - Banner` (`8407768586`) | `AdMob Network` Active (+ Mintegral pending mapping) |
| **Interstitial** | `ca-app-pub-1693732810683011/5516285554` | `Google optimized (All prices)`; No cap (code caps 150s) | `Block Bloom - Interstitial` (`5755580874`) | `AdMob Network` Active (+ Mintegral pending mapping) |
| **Rewarded** | `ca-app-pub-1693732810683011/7020938918` | `Disabled`; No cap | `Block Bloom - Rewarded` (`7054059749`) | `AdMob Network` Active (+ Mintegral pending mapping) |

- **Mediation Network Ground Truth (`Nov 25`):**
  - **Mintegral (`dev.mintegral.com`):** Registered (`Personal`, `India`, `ajaywaghmare00a@gmail.com`). Once staff approval arrives, create placements in Mintegral and map `App Key`, `App ID`, `Placement ID`, `Ad Unit ID` into the 3 AdMob mediation groups above. *(Note: exclude the 30 EEA countries + UK + CH if third-party bidders need non-EEA isolation so EEA falls back to `AdMob default`.)*
  - **Pangle (`ID:5047219`):** Permanently closed to individual accounts (`corporate docs` required). Leave disabled in console; adapter stays dormant in `vc41` until future corporate status.
  - **AppLovin / Liftoff / Meta:** AppLovin closed to new publishers; Liftoff paused; Meta deferred (needs 2FA).

### Brand Safety & Privacy Rules (Verified Live)
- **Blocking Controls (`Q2` Locked):** Max Ad Content Rating = **`T` (`Teens`)** (`MA ads are blocked`, matching Play's `13+` target audience) and Sensitive Category **`References to Sex` = `Blocked`** (`Dating`, `Social Casino Games`, `Alcohol`, `Gambling & Betting 18+` also `Blocked`). Do NOT accidentally relax back to `MA`.
- **Privacy & Messaging (GDPR & US States):** Keep **`Automatically add ad sources as ad partners`**, **`Enable consent mode for advertising purposes`**, and **`Enable consent mode for analytics purposes`** **ON** (`199` GDPR partners; `349` US partners already include Mobvista/Mintegral).
- **Payments & Tax (`Human-Only Frame`):** AdMob payouts arrive monthly around the **21st** once balance crosses `$100 USD`. Verify **India Tax + US `W-8BEN`** directly in `https://admob.google.com/v2/payments` (embedded webviews block Google Payments iframes via `X-Frame-Options: sameorigin`).

---

## 9. Platform 6 — Google Ads (`684-480-0945`), YouTube & 7-Day Burst Playbook

**Account:** `684-480-0945` (`INR`, `IST`, Auto-tagging `Yes`, Auto-apply recommendations **`OFF`**, Prepay balance **`₹1,308.45`**, Linked to Google Play `8701670281323658688`, YouTube `@ajaywaghmare7034`, and Firebase `block-bloom-31b39`).

### Active Campaigns & Hard Guardrails
- **`App-1` (`Paused` FOREVER):** Historical global/India campaign (`₹2.28`/Play install vs `₹0.17` Tier-3 LTV). Keep **Paused, do NOT delete** (preserves history) and never turn on again.
- **`BlockBloom-Tier1-EN` (Burst Campaign — Currently `Paused` `₹0/day`):**
  - **Locations:** Strictly 6 English Tier-1 countries (`United States`, `United Kingdom`, `Canada`, `Australia`, `New Zealand`, `Ireland`), Location Options = **`Presence: People in or regularly in your included locations`**.
  - **Language:** Strictly **`English`**.
  - **Creatives:** `Descriptions 5/5` (all policy-safe) + `Videos 1/20` (`Short #1` `https://youtube.com/shorts/Cc5TRVKpt7c`). Add **Winter Bloom** 9:16 portrait & 16:9 landscape videos + fresh headlines **at least 2 days before a burst (`Tue Dec 8`)** so ad review finishes before launch!
  - **Conversions (`Goals -> Summary`):** `com.aweagle.blockbloom (Android) installs` = **`Primary`**; `tutorial_complete`, `YouTube follow-on views`, and `YouTube channel subscriptions` = **`Secondary`** (keeps bidding focused strictly on app installs, not cheap video clicks!).
  - **Automated Rule Safety:** Old all-time rule **`62682154` (`Pause Tier1 at 3000 spend`)** is **`Paused`** (it would have killed Burst 1 after `₹1,208` because prior spend was `₹1,791.60`!). Leave **`62682154` Paused**.

### How to Execute a 7-Day Burst Safely (`Plan v2`)
1. **Why Bursts (`₹3,500` Burst 1 Dec 12–18 -> `₹7,000` Burst 2 Dec 25–31 conditional):** Continuous daily Tier-1 ads lost ~`₹36` per `₹100` spent. Concentrating spend into **7 fixed days stacked with a LiveOps event + push + Reddit + daily Shorts** feeds the App Campaign algorithm (`~₹500/day`) and measures clean cohort ROAS.
2. **Pre-Burst 6-Check Gate (`Thu Dec 10`):** Burst 1 runs ONLY if ALL 6 pass:
   - Crash-free `>= 99.5%` (7 days) & ANR `< 0.47%`
   - `vc42` safely rolled out (`20%` -> `100%`) with `0` new crash/ANR signatures
   - `tutorial_complete >= 80%` (new players since Nov 27)
   - Day-1 Retention `>= 25%` (`60+` installs sample Nov 27 – Dec 8)
   - Ad load success `>= 60%` (Rewarded + Banner)
   - GA4 shows Google Ads as `firstUserGoogleAdsCampaignName` (`First-user source`)
3. **Rule of Iron — ZERO Edits Mid-Burst:** Set assets (`Tue Dec 8`), budget `₹500/day` + `tCPI ₹25`, and prepay top-up (`₹3,500 - balance` on `Wed Dec 9`) **while Paused**. Never edit budget, targets, or assets once live (resets 7-day learning). Use ad-group start/stop rules (`Sat Dec 12 10:30 IST` -> `Sat Dec 19 10:30 IST`) + phone alarm backup.
4. **Live Kill Switch:** Pause immediately same day if crash-free `< 99%`, ANR cluster appears, AdMob policy/invalid-traffic notice triggers, or 3-day avg cost per opened install hits **`> ₹45`** (from Burst Day 3+).
5. **Burst 2 Gate (`Wed Dec 23`):** Unlock Burst 2 (`₹1,000/day` Dec 25–31) ONLY if Burst 1 achieves **Day-7 ROAS `>= 40%` AND Cost/Opened Install `<= ₹30` AND Day-1 Retention `>= 28%`**.

---

## 10. Local Tooling, GitHub Repositories & Multi-AI Continuity (`Law 6`)

### Complete 6-Repository Map
| Repository | Active Branch | Purpose & Strict Merge Rules |
|---|---|---|
| `BlockBloom` | `main` | Android app code, `tools/*.js`, `releases/`, `DAILY_ACTIVITY.md` |
| `ArrowBloom` | `release/2026-10-20-line-arrows` | Arrow Bloom `1.0.0` offline code & `tools/*.js` (**Ajay merges to `main`, never AI**) |
| `blockbloom-notes` | `journal` | Strategy (`plan-2026-11/`), `memory/*.md`, `journal/YYYY-MM-DD.md`, Playbook |
| `arrowbloom-notes` | `journal` | Arrow Bloom runbook, checklist, `claude-memory/`, `journal/YYYY-MM-DD.md` |
| `ajay-waghmare.github.io` | `main` | Studio landing page & `/app-ads.txt` |
| `app-policy` | `main` | Hosted Privacy Policies (`privacy-policy.html`, `arrow-bloom-privacy.html`) |

### Essential CLI Scripts (`Run Inside BlockBloom/` or `ArrowBloom/`)
- `node tools/growth-kpi.js` — Master daily KPI table (Tier-1 vs RoW `first_open`, funnel, AdMob INR basis).
- `node tools/play-status.js <sa-key.json> <packageName>` — Read-only live track/versionCode check (`com.aweagle.blockbloom` or `com.aweagle.arrowbloom`).
- `node tools/play-reviews.js <sa-key.json>` — Check & reply to Play reviews cleanly.
- `node tools/monitor-release.js` & `node tools/check-v41-events.js` — Release vitals & GA4 event verification.
- `node tools/play-rollout.js` / `ArrowBloom/tools/play-stage-draft.js` — Safe staged track updates with localized notes & active-release preservation.
- `node tools/check-16kb.js` — Audit ELF 16 KB alignment inside `.aab`.

> **Security & Encoding Discipline:** NEVER commit `*.jks`, `*.keystore`, `keystore.properties`, `local.properties`, or `*service-account*.json`, and NEVER edit UTF-8 markdown files with PowerShell `Add-Content` containing `$` strings (causes mojibake / variable expansion). Always verify `git status` clean and `0 0` ahead/behind at end of every work session (**Law 6**).

---

## 11. Troubleshooting Runbooks & Emergency Kill Switches

| Emergency Symptom | Immediate Triage (< 5 Minutes) | Root Fix & Permanent Verification |
|---|---|---|
| **Crash Spike or ANR `>= 0.47%` After Rollout** | 1. Halt rollout (`play-rollout.js` / Play Console).<br>2. If inside Google Ads burst -> **Pause campaign**.<br>3. If crash sits in an ad adapter -> set **`ads_mediation_enabled = false`** (or `ads_interstitial_enabled = false`) in Firebase Remote Config. | Inspect **Crashlytics** stack trace + device model (`Test Lab crawler` vs real player), fix root thread lock/race (`Law 2`), pass Gates 1–4 in hotfix build. |
| **Ad Fill / Match Rate Drops Suddenly** | 1. Open GA4 (`Explore`) using **`ad_format`**, **`ad_source`**, and **`error_code`**.<br>2. Check **`https://ajay-waghmare.github.io/app-ads.txt`** returns `HTTP 200` + AdMob Policy Center. | Check AdMob mediation group countries/floors; verify Mintegral placement IDs & GDPR/US partner consent toggles. |
| **Users Trapped in "Open vs Update" Loop** | Lower `min_supported_version_code` in Firebase Remote Config immediately (**fail-open**) or pause update gate. | Wait until `play-status.js` + live Play Store show full regional CDN propagation before raising `min_supported_version_code` (`Law 5`). |
| **GA4 Shows `"link not found"` or HTTP `401`** | Append **`?authuser=ajaywaghmare00a@gmail.com`** before the `#/...` fragment and verify `#/a409217568p555700046/admin/suiteusermanagement/property`. | Never share bare `#/a.../p...` links without `?authuser=ajaywaghmare00a@gmail.com` when signed into multiple Google accounts. |
| **Google Ads Cost Exceeds Budget / High CPI** | Verify account is **prepay**; check paused rule wasn't accidentally enabled; if 3-day avg cost per opened install **`> ₹45`**, pause same day. | Review Locations report (strictly 6 Tier-1 countries), verify `Presence` option, check `first_open` vs `Play installs` divergence in KPI tool. |

---

## 12. Immediate Action Checklist & Schedule (Nov 26 – Dec 31, 2026)

### A. Your 4 Remaining Human-Only Browser Actions
1. **Arrow Bloom (`9/12` → `12/12` Testers — Priority #1):** Get **3 more testers** opted in at `https://play.google.com/apps/testing/com.aweagle.arrowbloom` so Google Play starts the mandatory 14-day Production countdown.
2. **Google Ads Billing Tax (`684-480-0945`):** Clear **`Submit your India tax info`** banner under Billing -> Settings (and plan `₹3,500 - balance` top-up on **Wed Dec 9** if Dec 10 checks pass).
3. **AdMob Payments & Mintegral Email (`pub-1693732810683011`):** Verify **India Tax & US `W-8BEN`** directly in `https://admob.google.com/v2/payments` to protect against 24–30% US withholding, and watch `ajaywaghmare00a@gmail.com` for Mintegral approval.
4. **GA4 & Firebase Optional Browser Checks:** Optionally toggle **`Google Signals` ON** at `https://analytics.google.com/analytics/web/?authuser=ajaywaghmare00a@gmail.com#/a409217568p555700046/admin/datapolicies/datacollection`, and inspect the Firebase Remote Config **Blaze billing banner**.

### B. Day-by-Day Immediate Execution Schedule
* **Thu Nov 26 (US Thanksgiving):** Record & upload **30-second Store Promo Video (`O-3`)** to YouTube & link it on Google Play; publish **Short #2 (`BlockBloom/scratch/shorts/short_lineclear.mp4`)** across YouTube Shorts, Instagram Reels, and TikTok with tracked UTM links.
* **Fri Nov 27 (Black Friday):** Publish **Reddit Post #1 (`r/playmygame`)** from `blockbloom-notes/01-blockbloom/plan-2026-11/content/reddit-post-1-playmygame.md` (strictly obey subreddit rules; include UTM link).
* **Sat Nov 28:** Submit **Winter Bloom** Play Promotional Content card (`Dec 14 – Dec 21` window — **15 days ahead**); run Weekly Review #1.
* **Mon Nov 30:** **`Autumn Bloom Challenge`** LiveOps launches automatically (`Nov 30 – Dec 7 UTC`, `2.0x` streak bonus); run Health Check A on recent rollout.
* **Sun Dec 6:** Official **E1 (`Interstitial ON vs OFF`)** read date (revenue/user + retention).
* **Tue Dec 8 – Thu Dec 10:** Upload Winter Bloom video/text assets to Google Ads (`Tue Dec 8`), top up prepay (`Wed Dec 9`), evaluate **6-Check Burst-Ready Gate (`Thu Dec 10`)**.
* **Sat Dec 12 – Fri Dec 18:** **Burst 1 (`₹500/day`, `₹3,500` max)** — only if all 6 Dec 10 checks pass! Measure **Dec 23** before any Burst 2 decision.

### C. Arrow Bloom `1.0.0` -> `1.1.0` Graduation & Monetization Checklist
1. **Unblock 14-Day Clock (`9/12` -> `12/12`):** Confirm `12` opted-in testers stay active for 14 continuous days at `https://play.google.com/apps/testing/com.aweagle.arrowbloom`.
2. **Apply for Production (`vc4`):** Upload missing 7-inch / 10-inch tablet screenshots + promo video, click **Apply for production**, and complete Play questionnaire.
3. **Prepare `1.1.0` Backend & Legal (`Pre-Code`):** Update `app-policy/arrow-bloom-privacy.html` (push to `main`); create dedicated **`arrow-bloom`** Firebase project linked under GA4 Account `409217568`; add Arrow Bloom app + ad units in AdMob (`pub-1693732810683011`).
4. **Update Play Declarations Before `1.1.0` Submit:** Declare `Ads = Yes`, `AD_ID = Yes`, update Play **Data Safety**, add `Owner QA` IAP tests if IAPs launch, then promote staged rollout (`20% -> 100%`).
