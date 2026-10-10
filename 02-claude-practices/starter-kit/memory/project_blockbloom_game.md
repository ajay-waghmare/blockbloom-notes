# Block Bloom — Play Store revenue game

Personal native-Android **block-puzzle** game (Block Blast / Woodoku style) at
`D:\DevTools\BlockBloom`. Built for Play Store revenue (puzzle = #3 revenue genre;
retention-first design). Created 2026-05-31.

## Stack & build
- Kotlin + Jetpack Compose (Material 3). **Mirrors the QuizMaster build exactly.**
- Gradle 8.7, AGP 8.5.2, Kotlin 1.9.24, Compose BOM 2024.06.00, Compose compiler 1.5.14.
- minSdk 26, target/compileSdk 34, Java 17. Package `com.aweagle.blockbloom`.
- **Build:** `build.bat` (→ `:app:assembleDebug`) or `build.bat installDebug`. It sets
  `JAVA_HOME=D:\DevTools\Android\Jdk17\jdk-17.0.10+7` and injects the loopback patch from
  the project-local `tools\jdkpatch\out` via `JDK_JAVA_OPTIONS` (copied from QuizMaster).
  See `env_android_gradle_loopback_fix.md`. **Builds clean (35s incremental).**
- APK ~16 MB debug (material-icons-extended is the bulk → enable R8/minify for release,
  currently `isMinifyEnabled=false`).

## Architecture (decoupled, testable)
- `game/` — **pure Kotlin** logic, no Android deps: `Models.kt` (Coord/Piece, 8×8 board),
  `Pieces.kt` (weighted polyomino catalog + RNG), `BlockEngine.kt` (place / resolveClears /
  hasAnyMove / revive).
- `cosmetics/Skins.kt` — 6 themes, unlock rules (Free / Coins / Gems / RewardedAd).
- `data/GamePrefs.kt` — SharedPreferences (`block_bloom_prefs`): best, coins, gems, owned
  skins, daily streak, sound/vibrate, adsRemoved.
- `monetize/` — `AdHost` + `BillingHost` **interfaces** with working `FakeAdHost` /
  `FakeBillingHost` stubs (rewarded ads + IAP fully testable now, no real SDKs yet).
- `viewmodel/GameViewModel.kt` (AndroidViewModel + `viewModel()`, same as QuizMaster) —
  all state, scoring, combo, reward economy.
- `ui/` — `Components.kt` (`drawBlock()` candy renderer, pills, buttons), `Feedback.kt`
  (ToneGenerator audio + Vibrator haptics, no asset files), `theme/`, `screens/`
  (Home, Game w/ drag-drop, Shop, Dialogs).

## Monetization (hybrid)
- **Rewarded ads:** Continue/revive on game-over, Double coins, Unlock-skin-with-ad.
- **IAP:** Remove Ads (`remove_ads`), gem packs (`gems_small/medium/large`), premium skin.
- Real money is OFF: swap `FakeAdHost`→`AdMobAdHost`, `FakeBillingHost`→`PlayBillingHost`.
  README.md has the exact steps + Google test ad-unit IDs. Deps are commented in
  `app/build.gradle.kts` (play-services-ads 23.2.0, billing-ktx 7.0.0).

## Status / TODO
- Gameplay complete: **dual-mode placement** — drag-drop (snap preview + floating piece)
  AND tap-a-piece-then-tap-grid. Row/col clears, escalating combos, daily-streak bonus,
  skins shop, game-over revive/double-coins.
- **Bug fixed (was: drag didn't place anything).** Root cause = Compose `pointerInput`
  stale-capture: placement closures captured `cell`=0 from the first frame (before the
  board was measured). Fix = read `boardPx`/`boardOrigin` (State) *inside* gesture handlers
  + `rememberUpdatedState(state)`. If gesture bugs recur, suspect stale-capture in
  `pointerInput` first.
- **13 engine unit tests pass** (`build.bat testDebugUnitTest`) — place/clear/gameOver/
  hasAnyMove all verified. Test file: `app/src/test/.../BlockEngineTest.kt`.
- Ready-to-install APK copied to `D:\DevTools\BlockBloom\BlockBloom-debug.apk` (~15 MB).
- **VERIFIED END-TO-END on an Android-14 emulator (2026-05-31)**: installs, launches,
  daily-bonus dialog, Home→Play, **tap-to-place AND drag-to-place both work**, score
  tracked 0→3→7→11, tray refills after 3 placed, zero logcat crashes. Screenshots in
  `D:\DevTools\BlockBloom\testshots\`.
- **Play Store (2026-06-03):** `applicationId` is now `com.aweagle.blockbloom`; signed release AAB built (R8, 5.18 MB) + uploaded to Play **internal track (draft, versionCode 1)**; full store listing + graphics + privacy policy pushed via API. See **project_play_store_publishing.md**. Remaining to production: App content forms (console-only) + 12-tester/14-day closed test → apply for production. Then wire real AdMob + Play Billing.
  Roadmap in README: Daily Challenge, power-ups, board resume, battle pass.

## Emulator setup (for future UI testing)
- Installed: `emulator` + `system-images;android-34;google_apis;x86_64` via
  `cmdline-tools\latest\bin\sdkmanager.bat`. AVD named **`bloomtest`** (Pixel 6, x86_64).
- WHPX acceleration works (`HypervisorPresent=True`); boots headless in ~40s.
- **All JVM SDK tools (sdkmanager/avdmanager) need the loopback env**: set
  `JAVA_HOME=...Jdk17`, `ANDROID_HOME`/`ANDROID_SDK_ROOT=D:\DevTools\Android\Sdk`,
  `JDK_JAVA_OPTIONS=--patch-module java.base=D:\DevTools\patch\out -Djava.net.preferIPv4Stack=true`.
  The `emulator.exe` and `adb.exe` are native — no patch needed.
- Boot headless: `emulator -avd bloomtest -no-window -no-audio -no-boot-anim -no-snapshot -gpu swiftshader_indirect -accel auto -port 5554`
- Drive/verify: `adb -s emulator-5554 install -r <apk>`; launch
  `com.aweagle.blockbloom.debug/com.aweagle.blockbloom.MainActivity`; disable animations
  via `settings put global *_animation_scale 0`; screenshot with
  `adb shell screencap -p /sdcard/x.png` + `adb pull`; input via `adb shell input tap/swipe`.
  Kill with `adb -s emulator-5554 emu kill`.
