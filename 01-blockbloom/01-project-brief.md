# Block Bloom: Block Puzzle — project brief

Personal Android game by Ajay Waghmare, published as **AW EagleCraft**. Not related to QI Spine.
Kotlin + Jetpack Compose, 8x8 block puzzle (Block Blast / Woodoku genre). First commit 31 May 2026,
on Play since June 2026, in 177 countries, store listing in 13 languages.

## Accounts and identifiers

| What | Value |
|---|---|
| Package / applicationId | `com.aweagle.blockbloom` (debug build: `com.aweagle.blockbloom.debug`) |
| Store title | Block Bloom: Block Puzzle |
| Play developer | AW EagleCraft, personal account, id `8701670281323658688` |
| Console login | **ajaywaghmare00a@gmail.com** (personal Gmail, never the qispine address) |
| Console URL | https://play.google.com/console/u/1/developers/8701670281323658688/ |
| Store page | https://play.google.com/store/apps/details?id=com.aweagle.blockbloom |
| GitHub | https://github.com/ajay-waghmare/BlockBloom (private), default branch `main` |
| Privacy policy | https://ajay-waghmare.github.io/app-policy/privacy-policy.html (repo `ajay-waghmare/app-policy`, GitHub Pages) |
| Play API service account | `play-publisher@avid-airway-498216-e5.iam.gserviceaccount.com`, GCP project `avid-airway-498216-e5` (number 694223742398) |
| Service-account key file | `D:\Downloads\avid-airway-498216-e5-9f357c8e6b11.json` (key id 9f357c8e...; the older d71576f4... key is revoked) |
| Play reports bucket | `gs://pubsite_prod_8701670281323658688` (CSV, UTF-16LE, lags ~9 days) |
| Firebase project | `block-bloom-31b39` (number 620724418792), Analytics + Crashlytics + Remote Config + Perf |
| GA4 property | `555700046` (the same service account has read access) |
| Payments profile | AJAY DATTATRY WAGHMARE, Individual, profile id 3947-8216-3189; BillDesk application id 2609205439 (KYC stuck) |
| Upload keystore | `D:\DevTools\keystores\aw-eagle-upload.jks`, alias `aw-eagle`, cert SHA-256 `36:03:61:51:86:DE:F4:77:8F:1C:99:76:90:FA:9B:CD:24:50:B8:51:55:DB:D5:A9:64:85:15:79:27:C2:05:DA` |

One service-account key reads three things: the Play Developer API, the GCS reports bucket and
GA4. It is always passed **by path** (`PLAY_SA_FILE=<path>` or as the first script argument),
never inlined, never copied into the repo. `.gitignore` already excludes `avid-airway-*.json`.

## Stack (verified on `release/2026-10-09`, 10 Oct 2026)

- Kotlin **1.9.24**, Compose compiler extension 1.5.14, Compose BOM 2024.06.00, Material 3
- AGP **8.13.0**, Gradle **8.13** (wrapper), JDK 17
- compileSdk / targetSdk **36**, minSdk **26**
- Firebase BoM 33.7.0, play-services-ads 23.2.0, Play Billing **8.0.0 (plain, not ktx)**,
  androidx.fragment pinned to 1.8.9 through a Gradle `constraints {}` block
- `androidResources { generateLocaleConfig = true }`, six in-app languages + English
- 72 unit tests (`:app:testDebugUnitTest`)

**The Kotlin 1.9.24 wall.** Three libraries are pinned because newer versions carry Kotlin 2.x
metadata the 1.9 compiler cannot read: ads 24+, Firebase BoM 34+, billing-ktx 8. Upgrading any of
them means the AGP 9 + Kotlin 2.x + Compose-compiler migration, one combined job. Do it in
February (see the annual target-API gate in `project_android_target_api_baseline.md`).

## Build flags (app/build.gradle.kts, `defaultConfig`)

| Flag | vc21 value | Meaning |
|---|---|---|
| `ADS_ENABLED` | false | AdMob never initialises; every ad surface hides |
| `ANALYTICS_ENABLED` | true | Firebase Analytics/Crashlytics on (since vc16) |
| `BILLING_ENABLED` | false | `NoOpBillingHost`; purchase buttons hidden |
| AdMob app id + 3 unit ids | **Google TEST values** | must be swapped in the same commit that sets `ADS_ENABLED=true` |

## Repo map (what lives where)

```
app/src/main/java/com/aweagle/blockbloom/
  game/            pure-Kotlin engine: Models, Pieces, BlockEngine (traySolvable DFS, linesIfPlaced)
  viewmodel/       GameViewModel.kt (~1200+ lines) — all state, scoring, economy, analytics calls
  monetize/        AdHost/BillingHost seams; AdMobAdHost (UMP consent), PlayBillingHost, BannerAd (mounted in GameScreen when adsActive)
  engagement/      ReviewPrompter (in-app review), WinBack (daily reminder alarms), DailyChallenge
  level/           24 Adventure levels;  lifeline/  Undo/Hammer/Shuffle/Revive;  achievement/
  cosmetics/       Skins.kt — themes, unlock rules (Galaxy = Unlock.Gems(50) is the premium skin)
  data/            GamePrefs (SharedPreferences), Ledger/Wallet (single write path for currency)
  ui/              Components, Feedback (SoundPool SFX), MusicEngine (generative music), Juice, screens/
  analytics/       Analytics seam; AnalyticsTest fails the build if an event constant has no call site
tools/
  play-status.js   read-only: bundles + every track's releases (opens and discards an edit)
  play-upload.js   upload an AAB and stage a draft on a track
  play-rollout.js  make an uploaded versionCode live on a track (staged or full)
  pull-metrics.js  GA4 daily/version/country/events + vitals in one run (committed 10 Oct on the vc21 branch)
  release-notes/   vcNN.json, one per release, 8 locales
  jdkpatch/        the JDK loopback patch (needed only on the work laptop)
  gen-sfx.js       generates the res/raw/sfx_*.wav files
docs/
  GO_LIVE_REVENUE.md, PLAY_CONSOLE_ADS_DECLARATIONS.md, MONETIZATION_AND_ENGAGEMENT_DESIGN.md
store/ marketing/  listing copy + graphics sources (tracked)
build.bat          sets JAVA_HOME/ANDROID_HOME + the loopback patch, then runs gradlew
```

Not in git and therefore in this handover: the Play/GA4/listing scripts that were written in
session scratchpads (`scripts\`), the player workbooks (`reports\`), the shared portfolio baseline
`D:\DevTools\_shared` (`scripts\_shared\`), the emulator launcher, and the memory files.

## Other personal games in the same portfolio

QuizMaster (`com.aweagle.quizmaster`, built, never created in Play Console), Sortopia
(`com.aweagle.sortopia`, ball-sort, ship-prep done, not in Play), Mergeocalypse (parked),
Cricket (Godot 4 plan), Ludo (Unity). Their memory files are in
`02-claude-practices\starter-kit\memory\other-games\`. They share the `aw-eagle` upload key and
the `_shared\aweagle-baseline.toml` toolchain baseline.
