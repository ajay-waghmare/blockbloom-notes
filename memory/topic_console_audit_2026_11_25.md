# Topic Memory: 4-Platform & Website Live Audit (`2026-11-25`)

> **Audit Scope:** Google Play Console (`8701670281323658688`), Firebase + GA4 (`block-bloom-31b39` / `555700046`), Google AdMob (`pub-1693732810683011`), Google Ads (`684-480-0945`), and hosted web assets (`ajay-waghmare.github.io`, `app-policy`).
> **Verification Mode:** Strictly read-only browser UI inspections + live Play Publisher API + GA4 Admin/Data APIs + local file inspection. Zero unverified assumptions.
> **Latest Updated:** 2026-11-25 (23:08 IST — ALL automated & Q1–Q4 console/GA4/site optimizations completed & API-verified!)

---

## ✅ Fixed Live After Audit (Verified `2026-11-25 22:04 IST`)
1. **Studio Website ([`ajay-waghmare.github.io`](https://ajay-waghmare.github.io)):** Commit `bca6309` (`main`) — now showcases **Arrow Bloom** alongside **Block Bloom** + both Privacy Policies + `app-ads.txt`.
2. **Block Bloom Privacy Policy (`app-policy/privacy-policy.html`):** Commit `faa8483` (`main`) — retention updated **`2 months` → `14 months`** (matches GA4 `FOURTEEN_MONTHS`), identifier disclosures expanded (`Advertising ID` + `FCM push token`), advertising consent wording aligned.
3. **Play Store Listings (`Block Bloom` 12 non-English locales + `id` polish):** Committed (`Validate: 200`, `Commit: 200`) honest ad- + IAP-disclosing copy across `ja-JP`, `es-419`, `es-ES`, `pt-BR`, `de-DE`, `tr-TR`, `ko-KR`, `uk`, `id`, `ar`, `zh-TW`, `vi`, eliminating stale `"no ads / no data / <1 MB / nothing interrupts"` claims and `\uFFFD` mojibake.
4. **Play Store Listings (`Arrow Bloom` `en-US` + `ja-JP` + `ko-KR`):** Committed (`200 OK`) new `en-US` short description (`"Tap arrows to clear the path. A calm logic puzzle with no timer. Plays offline."`, removing `"free"` warning) and cleaned `ja-JP`/`ko-KR` `\uFFFD` mojibake (`fffd left: false`).
5. **Firebase `block-bloom-31b39`:**
   - Added **4 Release SHA fingerprints** (`Play App Signing` SHA-1 `E9:E1:8C:75:2F:CA:66:97:68:FE:BB:6E:3A:17:82:CD:0F:AE:10:CB` & SHA-256 `BE:51:65:B1:17:B0:2E:FD:68:BE:B8:67:4E:80:04:EE:2E:8F:96:F0:C2:B6:86:7C:23:7A:57:42:4D:C1:90:EB` + Upload Key SHA-1/SHA-256) to `com.aweagle.blockbloom` and **2 Debug SHA fingerprints** to `.debug`.
   - **Linked Google Play integration** (`App Distribution`, `Crashlytics`, `Google Analytics` `1/2` apps).
   - **Published Remote Config `v9`** (`2026-11-25T15:48:16Z`) adding all 5 missing `vc40` defaults (`ads_interstitial_min_gap_s=150`, `ads_rewarded_ready_only=true`, `ads_rewarded_fallback_grant=true`, `remove_ads_offer_enabled=true`, `review_prompt_enabled=true`) alongside existing 6 keys (`E1` & `autumn_bloom_challenge` untouched).
6. **AdMob (`pub-1693732810683011`):**
   - Created & verified **`Block Bloom - Banner`** mediation group (`8407768586`, `Android`, `Banner`, `All countries`, `AdMob Network` Active) -> `Block Bloom Banner` now shows `1 active`.
   - **Q2 Applied & Verified (`2026-11-25 22:27 IST`):** Account-level & Block Bloom (`~8657812038`, `Match account-level setting = ON`) Max Ad Content Rating changed **`MA` → `T` (`Teens` / `MA ads are blocked`)**; Block Bloom Sensitive Categories **`References to Sex` → `Blocked`** (`Sexual & Reproductive Health` untouched at `Allowed`; `Dating`/`Social Casino`/`Alcohol`/`Gambling 18+` untouched at `Blocked`).
   - **GDPR Settings Verified (`2026-11-25 22:30 IST`):** Enabled **`Automatically add ad sources as ad partners`**, **`Enable consent mode for advertising purposes`**, and **`Enable consent mode for analytics purposes`** (`Save` persisted with zero message overwrite warnings).
7. **Google Play Console (`8701670281323658688` / `4976030358371797626`) — Completed & Verified:**
   - **Account Website:** Saved `https://ajay-waghmare.github.io/` (optional Google Search Console verify button remains available).
   - **Play Integrity API:** Linked Cloud project **`Block Bloom`** (`620724418792` / `block-bloom-31b39`); App licensing, Application integrity, and Device integrity all **`On`**.
   - **Data Safety:** Checked **`Purchase history`** (`Collected`, non-ephemeral, Required -> App functionality & Analytics) and checked **`App functionality`** under **`Device or other IDs`** (for FCM push tokens), submitted and **published live** (`Last published on November 25, 2026`, no pending `Changes in review`).
   - **Account Linked Services:** Approved Google Ads (`684-480-0945`) link (`Accounts linked`).
   - **Q3 Applied & Verified (`2026-11-25 22:40 IST`):** Enabled **`Managed publishing on`** on Block Bloom (`4976030358371797626`, verified after page reload); created owner-only **`Owner QA`** License Testing email list (`ajaywaghmare00a@gmail.com` only, `1` user) and enabled ONLY **`Owner QA`** while keeping **`Block Bloom Testers`** (`34` emails) **UNCHECKED** (`RESPOND_NORMALLY`, verified after reload `22:47 IST`).
8. **Google Ads (`684-480-0945`) — Completed & Verified (Both Campaigns Strictly `Paused`, `₹0/day`):**
   - **`BlockBloom-Tier1-EN` Settings:** Verified Location options = **`Presence: People in or regularly in your included locations`**, Languages = **`English`**, Locations = 6 Tier-1 countries, Budget = `₹400/day`.
   - **`BlockBloom-Tier1-EN` Creatives:** Upgraded to **`Descriptions 5/5`** (all policy-safe from `05-content-pack.md`) and **`Videos 1/20`** (`https://youtube.com/shorts/Cc5TRVKpt7c`). `App-1` Headline 5 replaced (`"Zero Mid-Game Popups"` → `"Free 8x8 Block Puzzle Fun"`).
   - **Automated Rules:** Paused **`Pause Tier1 at 3000 spend`** (`62682154`) — verified Status = **`Paused` (`aw-status paused`)**.
   - **Conversions (`Goals -> Conversions -> Summary`):** Verified **`YouTube follow-on views`** AND **`YouTube channel subscriptions`** are BOTH **`Secondary`** (`com.aweagle.blockbloom (Android) installs` stays `Primary` `577.00`; `tutorial_complete` `Secondary` `6.00`). *(Note: `first_open` returns 0 results in Google Ads' GA4 import search; `purchase` shows 5 rows incl. 1 Active row.)*
   - **Connected Products:** **Google Play (`8701670281323658688`) Linked & Approved.**
9. **GA4 Property `555700046` (`block-bloom-31b39`, Account `409217568`) — Completed & API-Verified (`2026-11-25 23:06 IST`):**
   - **Root Cause Solved:** GA4 Admin UI routes cleanly with `?authuser=ajaywaghmare00a@gmail.com`, and real Property Access Management route is `#/.../admin/suiteusermanagement/property` (though `/v1/usermanagement` & `/v1/access` return `401` in embedded webview; `Custom definitions` and `Key events` work directly).
   - **Custom Dimensions (`0` → `17` registered, `CD status: 200`):** Registered **`15` Event-scoped** (`ad_format`, `ad_source`, `adapter`, `placement`, `trigger`, `reason`, `error_code`, `via`, `step`, `offer`, `action`, `result`, `event_id`, `mode`, `product_id`) and **`2` User-scoped** (`first_vc`, `notif_perm`).
   - **Key Events (`16` → `6`, `KE status: 200`):** Unmarked all `10` noisy events (`session_start`, `add_to_cart`, `add_to_wishlist`, `begin_checkout`, `view_item`, `view_item_list`, `view_search_results`, `daily_challenge_done`, `ad_reward`, `first_clear`); retained exact `6` conversion events (`first_open`, `tutorial_complete`, `in_app_purchase`, `purchase`, `app_store_subscription_convert`, `app_store_subscription_renew`).

## ⏳ Remaining Ajay-Only Account / Growth Checklist
- **Ajay One-by-One Decisions Progress (`4/4` Completed & Verified Live):**
  - **[DECIDED Q1 — 2026-11-25]:** **Arrow Bloom (`com.aweagle.arrowbloom`)** keeps `1.0.0` dark/offline until it passes Play's 12-tester × 14-day Production review; then create a **dedicated `arrow-bloom` Firebase project** and add Firebase + AdMob in `1.1.0` under the same GA4 account (`409217568`).
  - **[DECIDED & APPLIED Q2 — 2026-11-25]:** AdMob Max Ad Content Rating set to **`T` (Teens)** AND **`References to Sex` blocked** (plus GDPR Consent Mode + Auto-add ad sources enabled).
  - **[DECIDED & APPLIED Q3 — 2026-11-25]:** Play Console **`Managed publishing on`** enabled on Block Bloom, **`Owner QA`** (`ajaywaghmare00a@gmail.com` only) created & enabled for free QA IAP tests, and **`Block Bloom Testers`** (`34` emails) kept **UNCHECKED** (`RESPOND_NORMALLY`).
  - **[EXECUTED Q4 — 2026-11-25]:** Bypassed GA4 IAM `401` directly via authenticated GA4 Admin UI + verified via GA4 Admin API (`17` custom dimensions created, `10` noisy Key Events unmarked, `6` Key Events retained).
- **Ajay Manual Account Items (Browser / Real-World Only):**
  1. **Arrow Bloom (`9/12` → `12/12` testers):** Get 3 more people opted in at `https://play.google.com/apps/testing/com.aweagle.arrowbloom` to start the 14-day Production clock.
  2. **URGENT — Google Ads Advertiser Verification (`684-480-0945`, Hard Deadline: Dec 26, 2026):** Nov 26 `2:18 PM` email `[Action required] Complete advertiser verification by December 26, 2026` warns account will pause if incomplete (`takes up to 7 business days` — start before **Dec 12 Burst 1**!).
  3. **Tax & Billing Compliance:** Submit **India tax info** in Google Ads (`684-480-0945`), verify **India Tax & US `W-8BEN`** in AdMob Payments, check Firebase Remote Config Blaze notice, and optionally turn ON **`Google Signals`** at `https://analytics.google.com/analytics/web/?authuser=ajaywaghmare00a@gmail.com#/a409217568p555700046/admin/datapolicies/datacollection` (and optionally add `play-publisher@avid-airway-498216-e5.iam.gserviceaccount.com` as `Editor` at `#/a409217568p555700046/admin/suiteusermanagement/property` if API writes are needed later).

---

## 1. Firebase & GA4 Deep Audit (`block-bloom-31b39` · Project `#620724418792`)

### Project & App Setup
- **Single Project Only:** Only `block-bloom-31b39` (**Spark** no-cost plan) exists under `ajaywaghmare00a@gmail.com`. **No Firebase project or app exists for Arrow Bloom (`com.aweagle.arrowbloom`).**
- **Registered Apps (`2`):** `com.aweagle.blockbloom` (`1:620724418792:android:a7b375000072c50ff6f15d`) and `com.aweagle.blockbloom.debug` (`1:620724418792:android:7d259bd308ca559ef6f15d`). (`google-services.json` also maps legacy `.aurora`/`.royal` flavor names to that second ID.)
- **CRITICAL — `0` SHA-1 / SHA-256 Fingerprints:** Neither Android app has release (Play App Signing) or debug SHA-1/SHA-256 added. Blocks Play Integrity/App Check, App Links verification, and Google Sign-In/PGS if ever needed.
- **Integrations:**
  - Linked: Google Analytics (`555700046`), AdMob (`com.aweagle.blockbloom` only), Google Ads (`684-480-0945`, linked `Nov 16, 2026`).
  - **UNLINKED:** **Google Play** (unlinked!), BigQuery, Display & Video 360, Cloud Logging.
- **Cloud Messaging:** FCM API (V1) enabled (`Sender ID 620724418792`); 0 Messaging campaigns sent/created.
- **Remote Config (`v8`, `146` fetches / `122` users in 24h):**
  - Only **6** keys visible in Console (`ads_banner_enabled`, `ads_interstitial_enabled`, `ads_interstitial_interval`, `ads_mediation_enabled`, `live_events`, `min_supported_version_code`).
  - Code (`BlockBloomApp.kt:58-76`) registers **15** defaults (`ads_interstitial_min_gap_s`, `ads_rewarded_ready_only`, `ads_rewarded_fallback_grant`, `remove_ads_offer_enabled`, `review_prompt_enabled`, `lucky_chest_*`) — `vc40` kill switches are not yet surfaced in Console.
  - Console displays Blaze upgrade pricing notice (`"upgrade to Blaze by Nov 15, 2026 for usage-based pricing starting Sept 1, 2026"`).
- **A/B Testing (`E1 interstitial on vs off`):** 87d remaining; Baseline `32` users `$0.06` (`$0.0018/user`) vs Variant A `32` users `$0.90` (`$0.028/user`), `+1,503%`, `p = 0.097` (not yet statistically significant).
- **Crashlytics:** `99.15%` crash-free users, `99.76%` crash-free sessions (`6` crashes / `2` users in 7d, `4` open issues including obfuscated `SourceFile` AppLovin crawler traces).
- **Performance Monitoring:** SDK + Gradle plugin enabled (`build.gradle.kts:8,248`, `BlockBloomApp.kt:34`) yet Console reports **`No data`**.
- **App Check / Test Lab / App Distribution:** Unconfigured (`Test Lab` shows deprecation notice `Sept 30, 2027`).

### GA4 Property `555700046` (Account `409217568` · TZ `Asia/Calcutta` · `USD`)
- **Streams:** `15836064648` (`com.aweagle.blockbloom`), `15837881470` (`com.aweagle.blockbloom.debug`).
- **CRITICAL — `customDimensions` = `{}` (`0` custom dimensions):** Code logs `ad_format`, `placement`, `trigger`, `reason`, `via`, `step`, `offer`, `action`, `result`, `event_id`, etc., but NONE are registered in GA4, making format/placement breakdown impossible in GA4 reports.
- **CRITICAL — `keyEvents` = `16` (Bloated):** Contains `first_open`, `tutorial_complete`, `in_app_purchase`, `purchase`, `app_store_subscription_convert`, `app_store_subscription_renew` PLUS noisy **`session_start`**, `add_to_cart`, `add_to_wishlist`, `begin_checkout`, `view_item`, `view_item_list`, `view_search_results`, `daily_challenge_done`, `ad_reward`, `first_clear`.
- **Retention:** `FOURTEEN_MONTHS` (`resetUserDataOnNewActivity: true`) — **contradicts `privacy-policy.html` which still states `2 months`**!
- **Google Signals:** **`GOOGLE_SIGNALS_DISABLED`**.
- **Attribution:** `PAID_AND_ORGANIC_CHANNELS_DATA_DRIVEN` (`30d` acquisition, `90d` other, `GOOGLE_PAID_CHANNELS`).
- **Audiences:** Default `All Users` and `Purchasers` (`540d`) only.

### Recommended Long-Term Multi-App Firebase Architecture
- Create **one dedicated Firebase project per game** (`block-bloom-31b39` stays dedicated to Block Bloom; create `arrow-bloom` when Arrow Bloom adds telemetry/ads), and link **all projects under the same GA4 Account (`409217568`)**, **AdMob (`pub-1693732810683011`)**, **Play Developer (`8701670281323658688`)**, and **Google Ads (`684-480-0945`)**.
- Why separate Firebase projects: Remote Config keys (`live_events`, `min_supported_version_code`, `ads_*`), A/B experiments, FCM push campaigns, and Crashlytics quotas are project-scoped and risk cross-app contamination if shared without a unified backend.

---

## 2. Google Play Console Audit (`AW EagleCraft` · `8701670281323658688`)

### Account-Level
- **Account:** Personal / `Non-trader` (`Declare your trader status by Feb 1, 2027`). Owner: `ajaywaghmare00a@gmail.com`; Console contact email: `ajaywaghmare11a@gmail.com` (store support: `ajaywaghmare00a@gmail.com`); **Account Website: `-` (blank)**.
- **Payments Profiles:** `0527-7459-1552-0300 - Cross border` and `7007-0018-9201-7637 - India only` (INR).
- **License Testing:** `Block Bloom Testers` (`34` emails) is **UNCHECKED**; license response `RESPOND_NORMALLY`.
- **Google Play Games Services:** None.

### Block Bloom (`4976030358371797626`)
- **Rollout & Vitals:** `1.17.0 (41)` (`Bidding Mediation`) at 100%, `0` pre-launch errors, `0.00%` crashes, `0.44%` ANR.
- **16 KB Policy Extension:** Approved until **Feb 1, 2027** (`vc41` flags 10 RELRO-incompatible adapter libs + 2 Edge-to-edge + R8 warnings for next release).
- **Managed Publishing:** **OFF**.
- **HIGH RISK — Store Listings (`13` locales):** `en-US` updated Nov 23, **all 12 non-English locales** (`pt-BR`, `es-419`, `es-ES`, `ja-JP`, `de-DE`, `ko-KR`, `zh-TW`, `tr-TR`, `uk`, `id`, `ar`, `vi`) STILL contain pre-ads claims (`"reward videos ONLY when you choose"`, and `pt-BR` still says `"nada interrompe a partida"`). **Promo Video (`O-3`):** empty.
- **Custom Listing & Experiments:** `Tier1-EN` Live (`6` countries, 100%, no conversion data yet); `Global App Icon Test` running (Variant 1 `230` vs Current `181`, `"More data needed"`); `Autumn Bloom Challenge` (`Nov 30 – Dec 7 UTC`) `Not started` (Approved).
- **Data Safety Gaps:** **`Purchase history: 0/4`** despite 4 active SKUs (`remove_ads`, `gems_small`, `gems_medium`, `gems_large`); **`App functionality`** unchecked under `Device or other IDs` for FCM tokens.
- **App Integrity & Setup:** `Play Integrity API` `0/7` (**no Cloud project linked**); **Deep Links: none**; Play Billing protection `3/4` (offer usage limits off).
- **Legacy API Note:** `/inappproducts` returns HTTP 403 (`Please migrate to the new publishing API`); `/oneTimeProducts` is active and works.

### Arrow Bloom (`4972007048514376994`)
- **Tracks:** `Closed testing - Alpha` `vc4` (`1.0.0`) **Live / Available to testers on Google Play** (`Full rollout`, `178` countries, Nov 25 1:50 PM); `Internal testing` `vc4` live (Nov 25 1:34 PM).
- **PRODUCTION BLOCKER:** Only **`9/12` testers opted-in** (needs **3 more** before the mandatory **14-day continuous clock** even starts!).
- **Store Listing Warning:** Short description `"Tap arrows to set them free..."` triggers Play warning *"Should not use keywords that indicate price or promotion"* (flagged by `"free"`).
- **Missing Store Assets & Integrity:** **0 tablet screenshots** (`7-inch` & `10-inch`), **0 promo video**, **0 pre-launch reports**, **`Play Integrity API` `0/7`** (no Cloud project linked), `3` Android 15/16 advisories (`Edge-to-edge x2`, resizability/orientation).
- **App Content (`10/10`):** Clean for offline `1.0.0` (`Ads=No`, `Ad ID=No`, `Data safety = no data collected`). Must update before adding any analytics/ads SDKs.

---

## 3. Google AdMob Audit (`pub-1693732810683011`)

- **Account:** `Open`, `No current issues`, `sellers.json = Transparent`, `IST` TZ, `USD` payout, `User metrics = ON`, `app-ads.txt` (`https://ajay-waghmare.github.io/app-ads.txt`) verified 100% authorized (crawled 2h ago).
- **HIGH RISK — Blocking Controls (`C-21`):**
  - Max Ad Content Rating = **`MA` (Mature Audiences — `"No ads are blocked"`)** while Block Bloom Play Store rating is **Everyone / PEGI 3 / Target 13+**.
  - Sensitive categories allowed include **`References to Sex` (`11.9%` impr / `7.2%` rev)** and **`Sexual & Reproductive Health` (`11.9%` impr / `7.2%` rev)**. (`Dating`, `Social Casino Games`, `Alcohol`, `Gambling 18+` are blocked.)
- **CRITICAL REVENUE LEAK — Mediation Groups:**
  - `Block Bloom Banner` (`~3081693900`, `120s` refresh ✅, eCPM floor `Disabled`) has **`0` active mediation groups** (falls back to `AdMob (default)`).
  - `Block Bloom Interstitial` (`~5516285554`, `Google optimized (All prices)` floor, `No cap`) & `Rewarded` (`~7020938918`, `Disabled` floor, `No cap`) have **only `AdMob Network`** (`0` third-party bidders mapped yet; awaiting **Mintegral** staff approval; Pangle dropped corporate-only; AppLovin closed to new pubs; Liftoff paused; Meta deferred pending 2FA).
- **Privacy & Messaging:**
  - GDPR (`67%` consent, `57` shown, `199` partners, English only, Block Bloom only): **`Consent mode` = UNCHECKED**, **`Automatically add ad sources as ad partners` = UNCHECKED**, `0` purposes selected.
  - US states (`0` shown, `349` partners, `en-US` only, Block Bloom only).
- **Payments Frame:** Embedded AdSense/Payments frame blocked by `X-Frame-Options: sameorigin` (verify India Tax & US `W-8BEN` manually to prevent 24–30% US withholding).
- **Arrow Bloom:** Confirmed **NOT added in AdMob yet**. Hidden `(Windows PC) Block Bloom` (`~7355057391`) sits in `Requires review / Limited ad serving`.

---

## 4. Google Ads Audit (`684-480-0945`)

- **Account:** Active, `Paused` (`₹0.00` spend Nov 25), TZ `(GMT+05:30) India Standard Time`, Currency `INR`, Auto-tagging `Yes`, Auto-apply recommendations `OFF` ✅, Balance **`₹1,308.45`** (`Funds running low`).
- **CRITICAL LEAKS & TRAPS IN `BlockBloom-Tier1-EN`:**
  1. **Location options = `Presence or interest`** instead of **`Presence`** (leaks budget outside US/UK/CA/AU/NZ/IE).
  2. **Languages = `All languages`** instead of **`English`**.
  3. **Automated Rule Trap (`Pause Tier1 at 3000 spend`, ID `62682154`):** Evaluates **all-time** cost `>= ₹3,000`. Campaign already spent **`₹1,791.60`**, so **Burst 1 (`₹3,500` on Dec 12) will auto-pause after only `₹1,208.40`!** (Rule `62682241` also exists for `App-1` at `₹2,000`.)
  4. **Creatives (`Ad strength: Poor`):** **`0/20` Videos** (even though `@ajaywaghmare7034` is linked), **`3/5` Descriptions**, **`3/20` Images**, and stale/inaccurate copy (`"Easy, Classic, and Master Hard modes"`, `"explosive jewel cascades"`, plus `App-1` still says **`"Zero Mid-Game Popups"`**).
- **Broken Account-Level Conversions & Links:**
  - **Google Play (`8701670281323658688`) = NOT LINKED** in `Data manager`.
  - **`first_open` NOT imported** (`C-01` incomplete).
  - **`YouTube follow-on views`** + **`YouTube channel subscriptions`** set as **`Primary`** (pollutes optimization!), while `tutorial_complete` is `Secondary`. Zero IAP/ad-revenue conversions.
- **Compliance Warnings:** Active alert **`Submit your India tax info`**, **`Advertiser Verification`** & `EU political ads` unstarted, `Data protection contacts = None`.
- **Arrow Bloom:** `0` campaigns/conversions.

---

## 5. Website & Policies (`ajay-waghmare.github.io` & `app-policy`)

- `ajay-waghmare.github.io/index.html` links only Block Bloom (missing Arrow Bloom + link to `arrow-bloom-privacy.html`).
- `app-policy/privacy-policy.html` says Firebase retains data for **`2 months`**, contradicting GA4 Property `555700046` (`14 months` / `FOURTEEN_MONTHS`) and claims data isn't used for ad profiles while `adsPersonalizationEnabled = true` on GA4 Google Ads link + audiences.

---

## 6. Pending Ajay Decisions & Execution Queue

### Decisions Needed From Ajay
1. **[DECIDED 2026-11-25 — Q1 Approved]:** Keep `block-bloom-31b39` dedicated to Block Bloom only, keep Arrow Bloom `1.0.0` dark/offline through the 12-tester × 14-day Production review, and create a **dedicated `arrow-bloom` Firebase project** under GA4 Account `409217568` when adding Firebase + AdMob in `1.1.0`.
2. **[DECIDED & APPLIED 2026-11-25 — Q2 Approved]:** AdMob Max Ad Content Rating set to **`T` (Teens)** and **`References to Sex`** blocked (verified after reload), plus GDPR **`Automatically add ad sources as ad partners`**, **`Enable consent mode for advertising purposes`**, and **`Enable consent mode for analytics purposes`** saved cleanly.
3. **[DECIDED & APPLIED 2026-11-25 — Q3 Approved]:** Block Bloom **`Managed publishing on`** verified after reload; created & enabled **`Owner QA`** (`ajaywaghmare00a@gmail.com` only) while keeping **`Block Bloom Testers`** (`34` emails) **UNCHECKED** (`RESPOND_NORMALLY`).
4. **[COMPLETED & VERIFIED 2026-11-25 — Q4 Done]:** Created `Owner QA` License Testing list (`ajaywaghmare00a@gmail.com`) AND completed GA4 Property `555700046` schema cleanup directly via authenticated UI + GA4 Admin API readback (`17` custom dimensions registered, `10` noisy Key Events unmarked leaving `6` clean conversion events). Offline/manual-only items left for Ajay: `9/12` -> `12/12` Arrow Bloom testers, Google Ads India Tax, AdMob India/`W-8BEN` Tax, Firebase Blaze check, optional GA4 `Google Signals` toggle.
5. **Ajay Manual Actions:**
   - **URGENT (`Due Dec 26, allow 7 business days`):** Start **Google Ads Advertiser Verification** (`684-480-0945`) ASAP so Burst 1 (`Dec 12`) and account do not pause.
   - Get **3 more testers** opted into Arrow Bloom (`9/12` → `12/12`) at `https://play.google.com/apps/testing/com.aweagle.arrowbloom`.
   - Submit **India Tax** in Google Ads (`684-480-0945`) + verify **India Tax & US `W-8BEN`** in AdMob Payments + check Firebase Remote Config Blaze notice.
   - Sign in on the open Firebase Analytics frame if UI Analytics tabs need visual inspection.
   - **🔴 Play Policy — 16 KB Memory Page Sizes (`com.aweagle.blockbloom` / `Extension granted`, Action by `Feb 1, 2027`):** Google Play warns current latest production release does **not** support **16 KB memory page sizes**; starting **Feb 1, 2027**, app updates will be blocked until a 16 KB-aligned production bundle ships (schedule AGP 9 / Kotlin 2.x / GMA 24+ native `.so` alignment upgrade + Play bundle explorer check in **Jan 2027**).
