# Block Bloom: Block Puzzle — repo contract

Personal Android game, package `com.aweagle.blockbloom`, Play developer AW EagleCraft
(login ajaywaghmare00a@gmail.com). Kotlin 1.9.24 + Jetpack Compose, minSdk 26, target/compileSdk 36,
AGP 8.13 / Gradle 8.13 wrapper, JDK 17. Memory: `project_blockbloom_release.md` first.

## Hard constraints
- **Kotlin stays 1.9.24 until the planned AGP 9 / Kotlin 2.x migration.** Therefore: play-services-ads 23.x, Firebase BoM 33.x, `com.android.billingclient:billing` (plain, not ktx) 8.x. Transitive bumps go through a Gradle `constraints {}` block, never `implementation`.
- Flags in `app/build.gradle.kts` defaultConfig: `ADS_ENABLED`, `BILLING_ENABLED`, `ANALYTICS_ENABLED`. AdMob ids are Google TEST values; real ids and `ADS_ENABLED=true` land in the **same commit**, never separately.
- Play Billing >= 8.0.0 is enforced by Play's bundle scan regardless of flags.
- Every Play commit goes through review; a rejected **commit** burns the versionCode. Verify first.

## Build and test
```
gradlew :app:testDebugUnitTest --console=plain                       # 72 tests must stay green
gradlew :app:lintVitalRelease :app:bundleRelease --console=plain     # AAB -> app/build/outputs/bundle/release/app-release.aab
```
`keystore.properties` and `local.properties` are gitignored: copy them into every worktree.
Verify before upload: merged manifest versionCode/versionName/targetSdk, `BuildConfig` flags, AAB mtime.

## Release flow (feedback_blockbloom_release_process)
`release/vcNN` cut from `main` → features on their own branches/worktrees merged INTO it → bump on
the release branch → build from it → `tools/play-upload.js` once → `tools/play-rollout.js` per track
(internal, then production `inProgress 0.2`, then widen) → merge the release branch into `main`
once in production (only when Ajay says so). Release notes: `tools/release-notes/vcNN.json`, 8
locales, each <= 500 chars, only locales that have a store listing; release name <= 50 chars.
Never pipe a committing script. Read the track back with `tools/play-status.js` after every commit.

## Credentials
Service-account key by path only: `PLAY_SA_FILE=<path>` or first script argument. Never inline,
never copy into the repo (`avid-airway-*.json` is gitignored). Same key reads GA4 property 555700046
and the reports bucket `pubsite_prod_8701670281323658688`.

## Analytics
`tools/pull-metrics.js [sa.json]` for the routine pull. Split any spike by `appVersion`; Play
reports lag ~9 days; vitals `0 rows` = no data, not zero crashes. `/blockbloom-analytics` has the rest.

## Code conventions
- Engine in `game/` is pure Kotlin and unit-tested; keep it Android-free.
- Currency changes only through `Wallet.earn/spend` (single write path, ledger).
- Analytics events fire from the ViewModel, never from composables (composition repeats).
  `AnalyticsTest` fails the build if an event constant has no call site; keep it that way.
- Store-listing text and release notes are written via Node (UTF-8), never PowerShell `Set-Content`.
