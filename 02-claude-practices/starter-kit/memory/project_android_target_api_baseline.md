---
name: android-target-api-baseline
description: "AW EagleCraft portfolio — shared Android toolchain baseline, annual target-API gate, and the sync/preflight scripts (personal games, not QiSpine)"
metadata: 
  node_type: memory
  type: project
  originSessionId: 09883e8f-7241-4001-9e36-679aedb6e045
  modified: 2026-07-26T16:48:11.948Z
---

# Android target-API baseline — READ before touching any AW EagleCraft build config

Personal games portfolio (BlockBloom, Sortopia, QuizMaster, Cricket). Not QiSpine.

**Single source of truth: `D:\DevTools\_shared\aweagle-baseline.toml`** — SDK levels +
AGP/Gradle/Kotlin/JDK/compose-compiler for every app. Do NOT hand-edit an app's build files;
change the baseline and run the sync.

```
node D:\DevTools\_shared\tools\sync-baseline.js           # stamp baseline into all apps
node D:\DevTools\_shared\tools\sync-baseline.js --check   # report drift, write nothing, exit 1 if drifted
node D:\DevTools\_shared\tools\play-preflight.js          # portfolio compliance report, exit 1 if any app blocked
```
Node 16, zero deps (mini TOML parser inline). Both exit codes verified working as gates.
`sync-baseline.js` deliberately does NOT touch versionCode/versionName.

## The annual gate (why this exists)
Google ships a new Android each **June**, mandatory for updates **Aug 31 of the following year**.
On 2026-07-26 the API 36 warning arrived with **36 days left** and landed on the revenue build.
**Rule: do the bump every FEBRUARY (~6 months slack). A Play warning email must never be the trigger.**
Before the baseline existed the apps had already drifted: BlockBloom 35, Sortopia 35, QuizMaster 34.

## Version chain — these three move TOGETHER or not at all
- **compileSdk 36 requires AGP >= 8.9.1; AGP 8.9+ requires Gradle >= 8.11.1.** (verified at
  developer.android.com/build/releases/about-agp, 2026-07-26)
- Chose **AGP 8.13.0 + Gradle 8.13** (last of the 8.x line) over the 8.9.1 floor, so the next
  move is ONE deliberate migration, not another forced hop.
- **Kotlin stays 1.9.24 on purpose.** AGP 9.0 brings built-in Kotlin support + forces the
  Compose-compiler migration + needs Gradle 9.x. Kotlin 1.9.x is ALSO what pins
  `play-services-ads` to 23.x (24+ needs kotlin-stdlib 2.1.x metadata a 1.9 compiler can't read).
  So AGP 9 + Kotlin 2.x + ads-SDK 24.x is one combined February job.
- composeCompilerExtension must match Kotlin: 1.9.24 -> 1.5.14.
- JDK 17 at `D:\DevTools\Android\Jdk17\jdk-17.0.10+7`. SDK platform 36 installed 2026-07-26.

## Gotchas
- **Vitals return ZERO rows for BlockBloom** (28d and 90d, 2026-09-20): ~60 active devices is below Play's
  minimum-daily-users privacy threshold, so no crash/ANR rate is computed at all. Dashboard "–" is
  EXPECTED, not a bug. It populates automatically once DAU crosses the floor. Until then the only
  crash visibility would be Crashlytics — which is crash-data collection → same Data-Safety /
  "no data collected" update-all-locales-first constraint as Firebase Analytics.
  slowStartRateMetricSet query needs `dimensions:["startType"]` (400 otherwise) — irrelevant at this scale.
- **✅ Play Developer Reporting API ENABLED by Ajay 2026-09-20** on project 694223742398. Vitals readable via
  `scratchpad/play-vitals.js <sa> <pkg> [days]`. ⚠️ DAILY queries REQUIRE `timeZone.id="America/Los_Angeles"`
  — UTC → 400 "Unsupported timezone". Data lags ~3 days. Thresholds: perceived crash ≥1.09%, ANR ≥0.47%.
- **SA has NO GCP project IAM role** (verified 2026-09-20): cloud-platform token mints fine, but Service
  Usage `services.get`/`:enable` on project 694223742398 → 403 PERMISSION_DENIED. So enabling any Google
  API (Play Developer Reporting API for vitals, etc.) is ALWAYS Ajay's click in the Cloud Console —
  don't retry from the SA. Link: console.developers.google.com/apis/api/playdeveloperreporting.googleapis.com/overview?project=694223742398
- **✅ 2026-09-20 API-35 TRACKS CLEARED.** Ajay said "Go"; promoted the already-uploaded vc14 to
  alpha (edit 07566830038145051764) and internal (edit 01117367381679816953) via play-rollout.js,
  both committed, verified: production/alpha/internal all = "1.7.1 (14) - Android 16" targetSdk 36.
  vc10/vc12 no longer active anywhere. **Play ACCEPTED compliant commits despite the expired Aug-31
  flag** — the block only refuses non-compliant releases. Console policy-center flag should clear
  once Google's review processes (hours–2 days); only the console UI shows that. Release notes reused
  verbatim ("Updated for Android 16…") — correct for vc14, but MUST be edited for vc15.
  Update block is lifted → the retention fixes (Shuffle bug, D5 notifications, streak freeze,
  Firebase) are now shippable. NEXT console-side item: localized listings (ja-JP first; users
  ja 10%, pt_BR 7%, id 5%, uk 5%) — needs Ajay's go, not yet done.
- **2026-09-13 REVERSAL — app now RANKS for its own name.** Play search (server HTML, gl=IN):
  "block bloom" → position 11/30, "block bloom puzzle" → 18/29; absent for "block puzzle" and
  "block puzzle no ads". Two weeks earlier it was nowhere. Ajay did NOTHING in that window → the
  5× growth is ORGANIC, likely triggered by crossing the public "100+" install bucket + first rating.
  Earlier claim "you cannot rank for your own brand name" was WRONG at this scale. **RENAME IS
  SHELVED** — renaming would reset the very signals that just started working. Acquisition-source
  breakdown (bucket, still 403) is now the #1 unknown.
- **2026-09-13 dashboard (28d):** installs 58 (was 12 on Aug 23), device acquisitions 120 (was 27),
  first opens 58 (was 2), MAU 70 (was 14), **rating 5.00★ now DISPLAYED** (was none). ~5× in 2 weeks
  with no release — Ajay seeded something (unattributed; no analytics). First-opens/acquisitions
  ratio 7%→48%: the "vc14 crashes on API 36" hypothesis is RULED OUT (58 first opens all on vc14).
  SA access re-granted by Ajay 2026-09-13; stats bucket = gs://pubsite_prod_8701670281323658688
  (exists; needs ACCOUNT-level "download bulk reports" for the SA). Aug-31 target-API flag STILL up.
- **🔴 2026-09-13: service account LOST Play API access.** `play-publisher@avid-airway-498216-e5`
  (key …9f357c8e6b11) still gets an OAuth token but every androidpublisher call on
  com.aweagle.blockbloom returns HTTP 403 PERMISSION_DENIED (edits.insert, reviews.list). It worked
  on 2026-08-30. App itself is still LIVE (public listing HTTP 200, listed on the AW EagleCraft dev
  page). Not "API disabled" (that error names the project) → the SA was removed/downgraded under
  Play Console → Users and permissions, or an account-level restriction landed. Only the console UI
  can show which. All play-*.js scripts are dead until Ajay re-grants the SA. quizmaster/sortopia
  return 404 = never published under this account (not a useful control).
- **Claude never had Play Console UI access** — only read-only Publisher API via the SA. Dashboard
  numbers (installs/MAU/first-opens) were always screenshot-only.
- Aug 31 target-API deadline passed with alpha=vc10 / internal=vc12 still on targetSdk 35 as of
  2026-08-30 00:33 IST; whether Ajay cleared them before the cutoff is UNKNOWN (403 since). Repo shows
  zero commits since 2026-08-29, app_name still "Block Bloom", versionCode 14, no new AAB.
- In-app dev cross-promo link `SettingsScreen.kt:61` (`dev?id=8701670281323658688`) returns HTTP 404;
  the name-based `developer?id=AW+EagleCraft` returns 200. Dead link in production.
- **The target-API warning counts EVERY track, not just production** (proven 2026-08-23). Play
  Console kept flagging "highest non-compliant target API level is Android 15 (API 35)" for
  BlockBloom while production was already vc14/targetSdk 36 and `completed`. Cause: two stale
  testing-track releases still active — **alpha** on vc10 (git-confirmed targetSdk 35) and
  **internal** on vc12 (AGP 8.5.2 in its AAB metadata, so it cannot be 36; built 6 days before
  the bump). Fix = promote the ALREADY-UPLOADED vc14 to internal+alpha, or deactivate those
  releases. No rebuild: versionCode 14 is already in Google's hands.
  **So the February bump is not done until every active track is on the new target**, and
  `play-preflight.js` cannot see this — it reads local build files, not live track state. Use
  `node tools/play-status.js D:/Downloads/avid-airway-498216-e5-9f357c8e6b11.json com.aweagle.blockbloom`
  to read the real per-track truth.
- **Never rebuild just to clear a track warning** while the vc15 billing work is uncommitted in
  the tree — a rebuild would ship unfinished `PlayBillingHost` into a testing track. Reuse the
  last shipped AAB.
- Diagnose an AAB's toolchain without bundletool:
  `unzip -p <aab> BUNDLE-METADATA/com.android.tools.build.gradle/app-metadata.properties`
  gives `androidGradlePluginVersion` — and since compileSdk 36 needs AGP >= 8.9.1, anything on
  AGP 8.5.2 is provably pre-API-36. (`strings` is NOT on this machine's Bash.)
- `android.suppressUnsupportedCompileSdk` was REMOVED from BlockBloom's gradle.properties
  (was =35 under AGP 8.5.2). Never reintroduce it to force an untested compileSdk — bump AGP.
- **Building from the Bash tool:** `cmd //c` + MSYS arg-conversion fight each other and
  `build.bat` silently "succeeds" with exit 0 while doing nothing (`'build.bat' is not
  recognized`). Use the Unix `gradlew` script with env vars instead:
  `cd D:/DevTools/BlockBloom && JAVA_HOME=... ANDROID_HOME=... JDK_JAVA_OPTIONS="--patch-module java.base=D:/DevTools/BlockBloom/tools/jdkpatch/out" ./gradlew <tasks> --console=plain`
  (the JDK_JAVA_OPTIONS bit is [[env_android_gradle_loopback_fix]]). **Always verify the AAB
  mtime — exit 0 alone is not proof a build ran.**
- Cricket/Godot: `gradle_build/target_sdk` in `export_presets.cfg` is EMPTY = inherits engine
  default. Left alone deliberately (spike uses `use_gradle_build=false`, prebuilt templates);
  set explicitly at M3. Preflight flags it until then.

## vc14 shipped (2026-07-26)
- **vc14 "1.7.1 (14) - Android 16" SUBMITTED TO PRODUCTION status=completed** (in Google review;
  vc13 serves users until approval). AAB `releases\BlockBloom-v1.7.1-vc14-api36-release.aab`,
  sha256 901e7f1b68ee751e…, uploaded via play-upload.js + play-rollout.js two-step.
- **vc13 confirmed LIVE in production** before the vc14 submit (Google approved ~2026-07-21) —
  the in-app review prompt has been running on real users since then.
- **Play credential:** active SA key = `D:\Downloads\avid-airway-498216-e5-9f357c8e6b11.json`
  (the `…d71576f4a504.json` sibling is REVOKED — "Invalid JWT Signature"). play-status.js takes
  the path as argv[2]; upload/rollout take PLAY_SA_FILE env var.
- **play-rollout.js has HARDCODED release notes** — updated them for vc14; must update for EVERY release.
- Test record for vc14 (toolchain-only change, zero game-logic diff vs live vc13): unit tests +
  lintVitalRelease green; targetSdk 36/vc14 verified in merged manifest AND aapt2 badging; apksigner
  cert verified; release APK launch smoke test on emulator PASSED (installed, rendered, no app
  crashes, ads kill-switch intact through R8); 0 native .so → 16 KB page-size trivially satisfied;
  edge-to-edge enforced since API 35 and app never used the opt-out (live under it since vc10/June).
  NOT tested: full gameplay on API 36 hardware — this host kills emulators (commit limit, twice);
  Ajay's real phone remains the gameplay check.

## Revenue track — vc15 prep (2026-07-26, Ajay approved full scope: ads + IAP + retention)
- **Source backlog COMMITTED**: everything vc11→vc14 was uncommitted since vc10 — now `d127a76`
  on `main` (branch is main NOT master), pushed to github.com/ajay-waghmare/BlockBloom.
- **PlayBillingHost written + wired** (`monetize/PlayBillingHost.kt`, billing-ktx 7.0.0 — pinned
  7.x for the same Kotlin-1.9 metadata reason as ads-SDK 23.x): remove_ads (acknowledge,
  restore-on-reinstall) + gem packs (consume-BEFORE-grant), dormant until console products exist.
  Shop UI now renders per-product from `state.gemPacks`/`state.removeAdsPrice` = Play's real
  formatted prices; hardcoded $0.99/$2.99 placeholders REMOVED (were wrong for Indian users).
- **`docs/GO_LIVE_VC15.md` = the vc15 runbook**: 4 AdMob ID paste points, ADS_ENABLED=true+real
  IDs same commit rule, declarations Phase-2 pointer, listing copy, IAP product table
  (remove_ads ₹120-190 managed, gems consumables), post-launch watch. **Blocked on 2 Ajay signups:
  AdMob (revenue gate) + Payments merchant profile (IAP gate, can lag — billing lights up without
  a release).**
- **Retention decision** (in `docs/ROADMAP.md` status delta): next = D5 win-back local
  notifications (streak-guard + challenge reminder); leaderboards deferred. **E2 economy unit
  tests now BLOCKING before IAP products go live** (real money → Wallet/Ledger, 1 test file total).
- Sortopia + QuizMaster stamped to API-36 baseline via sync script (release builds NOT yet
  verified; their themes.xml statusBarColor hazards still flagged by preflight).
- Revenue expectation set with Ajay: ads on tiny install base = single-digit $/month; AdMob payout
  threshold ~₹8k. Distribution (Engine B WhatsApp seed — still not done) is the multiplier.

Related: [[project_blockbloom_release]], [[env_android_gradle_loopback_fix]].
Cricket plan governance section: `D:\DevTools\CricketGame\PLAN.md`.

## Former index hook (moved from MEMORY.md 2026-09-28)

- [Project: Android target-API baseline](project_android_target_api_baseline.md) — AW EagleCraft: baseline toml + scripts; Feb bump gate; ✅API-35 tracks cleared 2026-09-20 (Play warning counts EVERY track — play-status.js); ⚠️build.bat fake-succeeds
