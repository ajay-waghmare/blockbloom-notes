# Topic Memory: Arrow Bloom (App & Operations)

> **Domain:** Mobile Game Development, Testing & Publishing  
> **App Title:** Arrow Bloom – Tap Logic Puzzle  
> **Package Name:** `com.aweagle.arrowbloom`  
> **Play Console App ID:** `4972007048514376994`  
> **Play Console Dashboard:** `https://play.google.com/console/u/0/developers/8701670281323658688/app/4972007048514376994/app-dashboard`  
> **Repository:** `https://github.com/ajay-waghmare/ArrowBloom.git` (`release/2026-10-20-line-arrows`)  
> **Notes Repository:** `https://github.com/ajay-waghmare/arrowbloom-notes.git` (`journal`)  
> **Latest Updated:** 2026-11-25 (20:30 IST)

---

## 1. Google Play Console Status (Verified Live Nov 25, 2026)
* **Production Track:** `(no releases)` (`Inactive`) — **NOT published to production.** `Apply for production` disabled until Closed Testing gate clears.
* **Open Testing (Beta Track):** `(no releases)` (`Inactive`).
* **Closed Testing (`Closed testing - Alpha`):**
  - Release `1.0.0 (4)` (`vc4`): **`Available to testers on Google Play` / `Full rollout`** across `178 of 178` countries (live since Nov 25, 2026, 1:50 PM IST).
  - Tester List: `"Block Bloom Testers"` (34 emails).
  - **Currently Opted-In Testers:** **`9/12` testers opted-in** (**3 more needed** before the mandatory **14-day continuous clock** starts!).
  - Opt-in URL: [`https://play.google.com/apps/testing/com.aweagle.arrowbloom`](https://play.google.com/apps/testing/com.aweagle.arrowbloom)
* **Internal Testing Track:**
  - Release `1.0.0 (4)` (`vc4`): **`Available to internal testers` / `Full rollout`** (live Nov 25, 2026, 1:34 PM IST).
  - Internal Opt-in URL: [`https://play.google.com/apps/internaltest/4701488149397707358`](https://play.google.com/apps/internaltest/4701488149397707358)
* **App Content & Integrity:**
  - `Managed publishing`: **Off**; `Policy status`: No issues found; `App content`: `10/10` complete for offline/no-ads `1.0.0`.
  - **Play Integrity API:** `0/7` (**no Cloud project linked**). Pre-launch report: none generated yet.
  - Non-blocking Android 15/16 advisories (`3`): Edge-to-edge (x2), resizability/orientation.

---

## 2. Store Listing & Console Audit Findings (Nov 25, 2026)
* **Default Language:** `en-US` + 7 localized listings (`de-DE`, `es-ES`, `es-419`, `ja-JP`, `ko-KR`, `pt-BR`, `tr-TR`).
* **Short Description Warning (FIX NEEDED):** `"Tap arrows to set them free. A calm logic puzzle with no timer. Plays offline."` triggers Play Console warning *"Should not use keywords that indicate price or promotion"* (flagged by `"free"`). Replace `"set them free"` with safe phrasing (e.g. `"Tap arrows to clear the path. A calm logic puzzle with no timer. Plays offline."`).
* **Missing Assets:** `0` 7-inch tablet screenshots, `0` 10-inch tablet screenshots, `0` promo video.
* **Studio Website (`https://ajay-waghmare.github.io`):** Live link points to a Block Bloom-only homepage; needs update to showcase **Arrow Bloom** + link `arrow-bloom-privacy.html`.
* **Privacy Policy:** `https://ajay-waghmare.github.io/app-policy/arrow-bloom-privacy.html` (accurate for offline `1.0.0`).

---

## 3. Product Architecture & Multi-App Production Roadmap
* **Current `1.0.0 (4)` Tech Stack:** Kotlin 1.9.24 + Jetpack Compose BOM 2024.06.00, `compileSdk = 36`, `targetSdk = 36`, `minSdk = 26`, `Supports 16 KB` page size, **0 third-party ads/analytics SDKs**, **`VIBRATE` permission only (zero `INTERNET`)**.
* **Multi-App Ecosystem Gaps (Verified Nov 25):**
  - **Firebase / GA4:** **Not registered** in `block-bloom-31b39`, no dedicated project exists yet. **Recommended Architecture:** Keep `Arrow Bloom 1.0.0` dark/offline to pass the 12-tester × 14-day Production review cleanly; then for **`1.1.0`** create a **dedicated Firebase project (`arrow-bloom`)** linked under the shared GA4 Account (`409217568`), AdMob (`pub-1693732810683011`), Play (`8701670281323658688`), and Google Ads (`684-480-0945`) — isolating Remote Config/FCM/A/B tests from Block Bloom.
  - **AdMob:** **NOT added in AdMob yet** (no ad units, no GDPR/US messaging). Will add + declare Data Safety / Ads / `AD_ID` / updated `arrow-bloom-privacy.html` before any `1.1.0` monetized build.
  - **Google Ads:** `0` campaigns/conversions yet.

---

## 4. Path to Production & Immediate Next Steps
1. **Unblock 14-Day Clock (`9/12` → `12/12`):** Share `https://play.google.com/apps/testing/com.aweagle.arrowbloom` with **3+ more testers** immediately.
2. **Fix Short Description Warning:** Remove `"free"` from `en-US` short description (Play API / Console) and add tablet screenshots when ready.
3. **Update Studio Homepage (`ajay-waghmare.github.io`):** Add Arrow Bloom card + privacy link.
4. **Await 14 Continuous Days (`12+` testers):** Then click `Apply for production` and answer Play Console questionnaire.
