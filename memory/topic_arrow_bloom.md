# Topic Memory: Arrow Bloom (App & Operations)

> **Domain:** Mobile Game Development, Testing & Publishing  
> **App Title:** Arrow Bloom – Tap Logic Puzzle  
> **Package Name:** `com.aweagle.arrowbloom`  
> **Play Console App ID:** `4972007048514376994`  
> **Play Console Dashboard:** `https://play.google.com/console/u/0/developers/8701670281323658688/app/4972007048514376994/app-dashboard`  
> **Repository:** `https://github.com/ajay-waghmare/ArrowBloom.git` (`release/2026-10-20-line-arrows`)  
> **Notes Repository:** `https://github.com/ajay-waghmare/arrowbloom-notes.git` (`journal`)  
> **Latest Updated:** 2026-11-25  

---

## 1. Google Play Console Status (Live Ground Truth)
* **Production Track:** `(no releases)` (`Inactive`) — **NOT published to production.** `Apply for production` button is disabled until Closed Testing criteria pass.
* **Open Testing (Beta Track):** `(no releases)` (`Inactive`).
* **Closed Testing (Alpha Track — `Closed testing - Alpha`):**
  - Release `1.0.0 (4)`: **`In review` / `Full rollout`** across 178 countries (committed Nov 25, 2026 via Edit `05758245235302111230`; replaces draft!).
  - Release `1.0.0 (1)`: **Completed / Available to selected testers** (remains live until `1.0.0 (4)` review clears; released Oct 20, 2026).
  - Tester List: "Block Bloom Testers" (34 emails listed).
  - **Currently Opted-In Testers:** **`10` testers opted-in** (`2` shy of the `12`-tester minimum!).
  - Opt-in URL: [`https://play.google.com/apps/testing/com.aweagle.arrowbloom`](https://play.google.com/apps/testing/com.aweagle.arrowbloom)
* **Internal Testing Track:**
  - Release `1.0.0 (4)`: **Available to internal testers / Full rollout** (live Nov 25, 2026 1:34 PM IST via Edit `05758245235302111230`).
  - Tester List: `"Block Bloom Testers"` (34 users, checked — includes `ajaywaghmare00a@gmail.com`, `ajaywaghmare11a@gmail.com`, `ajay.qispine@gmail.com`).
  - Internal Opt-in URL: [`https://play.google.com/apps/internaltest/4701488149397707358`](https://play.google.com/apps/internaltest/4701488149397707358)
* **Publishing Overview & Policy:**
  - `Managed publishing`: **Off** (`Changes in review`: `Closed testing - Alpha` `1.0.0 (4)` `Start full rollout`; auto-publishes upon review).
  - `Policy status`: **No issues found**.
  - `App content`: **10/10 declarations complete** (Data safety, Target audience 13+, Privacy policy, Ads=No, Advertising ID=No, Content rating, etc.).
  - Non-blocking UX advisories on `1.0.0 (1)`: 3 standard Android 15/16 advisories (edge-to-edge & resizability/orientation).

---

## 2. Uploaded App Bundles (AABs in Console Library)
The Google Play Console app bundle explorer has received 4 bundles:
1. `versionCode 1` (`1.0.0`): Active on Closed Testing (pending `vc4` review completion), Inactive in latest bundle table.
2. `versionCode 2` (`1.0.0`): Inactive / Burnt.
3. `versionCode 3` (`1.0.0`): Inactive / Burnt.
4. `versionCode 4` (`1.0.0`): **`Active`** (`Target SDK 36`, `Supports 16 KB` page size — live on Internal, In review on Closed Alpha).

---

## 3. Product Architecture & Gameplay Design
* **Genre:** Line-arrow logic puzzle (calm, satisfying, zero timer).
* **Core Mechanic:** Winding arrows on a dot grid slide out along their own path. An arrow can leave if and only if the path from its head to the board edge is unobstructed.
* **Failure State:** Wrong tap = bump back + lose 1 heart (3 hearts total per level).
* **Star Rating System:** Up to 5 stars per level; lost hearts and used hints deduct stars (clean solve = 5★).
* **Progression Structure:**
  - 100 levels across 5 themed gardens (Meadow 4×4, Orchard 5×5, Lagoon 6×6, Dusk 6×6, Aurora 7×7), followed by infinite procedural Bloom from level 101+.
  - Special shapes (heart, flower, diamond, circle) featured every 5th level.
  - Daily Bloom: Deterministic daily seed challenge with streak tracking and shareable text.
* **Tech Stack:**
  - Kotlin 1.9.24 + Jetpack Compose BOM 2024.06.00 + AGP 8.13.
  - `compileSdk = 36`, `targetSdk = 36`, `minSdk = 26`.
  - 100% offline, zero backend, no INTERNET permission, no third-party ads/analytics SDKs in 1.0.0.
  - Unit tests: 50/50 passing.

---

## 4. Store Listing & Metadata Assets
* **Default Language:** `en-US`
* **Contact Email:** `ajaywaghmare00a@gmail.com`
* **Developer Website:** `https://ajay-waghmare.github.io`
* **Privacy Policy:** `https://ajay-waghmare.github.io/app-policy/arrow-bloom-privacy.html`
* **Short Description:** `"Tap arrows to set them free. A calm logic puzzle with no timer. Plays offline."`
* **Localized Listings:** Full multi-language store listings already configured in Console across 8 languages (`en-US`, `de-DE`, `es-ES`, `ja-JP`, `ko-KR`, `pt-BR`, `tr-TR`).

---

## 5. Path to Production & Graduation Requirements
Under Google Play's personal developer account testing policy (verified verbatim on Arrow Bloom Dashboard Nov 25, 2026):
1. **12-Tester Opt-In Gate (2 More Needed):** Have at least **12 testers** opted into Closed Testing (`10` currently opted in — need **2 more** from the 34-person email list to click the opt-in link).
2. **14-Day Continuous Clock:** Run the closed test with at least **12 testers continuously opted in for 14 days**.
3. **Roll Out Build 4 (`1.0.0 (4)`):** Publish the staged `1.0.0 (4)` draft (slimmer line arrows, 5-star scoring, 100 levels) onto `internal` and `alpha` (Closed Testing) so testers experience the real version during the 14 days.
4. **Apply for Production Access:** Once the 12 testers × 14 days checkmarks turn green, click `Apply for production` and answer the closed-test questionnaire.
5. **Production Rollout Approval:** After Google approves production access, launch onto the public `Production` track.
