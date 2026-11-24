# Topic Memory: Arrow Bloom (App & Operations)

> **Domain:** Mobile Game Development, Testing & Publishing  
> **App Title:** Arrow Bloom – Tap Logic Puzzle  
> **Package Name:** `com.aweagle.arrowbloom`  
> **Play Console App ID:** `4972007048514376994`  
> **Play Console Dashboard:** `https://play.google.com/console/u/0/developers/8701670281323658688/app/4972007048514376994/app-dashboard`  
> **Repository:** `https://github.com/ajay-waghmare/ArrowBloom.git` (`release/2026-10-20-line-arrows`)  
> **Notes Repository:** `https://github.com/ajay-waghmare/arrowbloom-notes.git` (`journal`)  
> **Latest Updated:** 2026-11-24  

---

## 1. Google Play Console Status (Live Ground Truth)
* **Production Track:** `(no releases)` — **NOT published to production.** The game is not visible to public users on Google Play.
* **Open Testing (Beta Track):** `(no releases)`.
* **Closed Testing (Alpha Track):**
  - Release `1.0.0 (1)`: **Completed / Active** in closed testing.
  - Release `1.0.0 (4)`: **Draft** (staged draft release).
  - Tester List: "Block Bloom Testers" (34 users configured).
  - Opt-in URL: [`https://play.google.com/apps/testing/com.aweagle.arrowbloom`](https://play.google.com/apps/testing/com.aweagle.arrowbloom)
* **Internal Testing Track:**
  - Release `1.0.0 (1)`: **Completed / Active**.
  - Release `1.0.0 (4)`: **Draft**.
* **Last Console Update:** **October 20, 2026**.
* **Monthly Active Devices:** 1 device.

---

## 2. Uploaded App Bundles (AABs in Console Library)
The Google Play Console app bundle explorer has received 4 bundles:
1. `versionCode 1` (`1.0.0`): Active on Closed Testing.
2. `versionCode 2` (`1.0.0`): Archived / Burnt.
3. `versionCode 3` (`1.0.0`): Archived / Burnt.
4. `versionCode 4` (`1.0.0`): Staged in Draft on Closed & Internal tracks.

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
Under Google Play's policy for personal developer accounts:
1. **14-Day Closed Testing Requirement:** The app must run on the Closed Testing track with at least **20 testers opted in for a minimum of 14 continuous days**.
2. **Promote Build 4:** Roll out `versionCode 4` (slimmer arrows, 5-star scoring, 100 levels) to the active closed testing track.
3. **Apply for Production Access:** After meeting the 14-day threshold, Ajay must complete the Play Console Production Access questionnaire detailing testing feedback, bug fixes, and release readiness.
4. **Rollout Approval:** Once Google grants production access, the app can be rolled out to the public Production track.
