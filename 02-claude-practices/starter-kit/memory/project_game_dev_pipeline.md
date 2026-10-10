# Personal Android Games — build pipeline + Mergeocalypse & Sortopia

How new personal Android games are scaffolded fast by cloning BlockBloom's proven build, plus
the two games built 2026-06-20. **CHECK before starting a new game or running emulator E2E.**

## Reusable "new game" pipeline (clone BlockBloom)
1. `robocopy D:\DevTools\BlockBloom D:\DevTools\<NewGame> /E` excluding dirs `app\src build app\build .gradle .idea .git testshots store releases docs tools\ads-disabled` and files `*.jks keystore.properties *.apk build_log.txt play-*.js gen-sfx.js README.md`. (robocopy rc 0-7 = success.) Keeps gradle wrapper + **`tools\jdkpatch\out`** (loopback patch — verify `...\out\sun\nio\ch\PipeImpl.class` exists).
2. Retarget: `settings.gradle.kts` rootProject.name; `app/build.gradle.kts` namespace + applicationId `com.aweagle.<game>`, versionCode 1 / versionName "1.0".
3. Write fresh `app/src/main/`: AndroidManifest (`@style/Theme.<Game>`, `.MainActivity`), res (strings/colors/themes), adaptive icon as **vectors** (`mipmap-anydpi-v26/ic_launcher*.xml` + `drawable/ic_launcher_foreground.xml`; minSdk 26 → no PNG fallback needed), + Kotlin source.
4. Build: `build.bat :app:assembleDebug` (loopback-patched). Inherited stack: Kotlin 1.9.24, Compose BOM 2024.06.00 (compiler 1.5.14), compileSdk 35, minSdk 26, JVM 17, ads commented out.
- For `viewModelScope`/coroutines add `androidx.lifecycle:lifecycle-viewmodel-ktx`.
- Compose gotcha: `AnimatedVisibility` inside a `Column` grabs the `ColumnScope` overload and won't compile — extract it into its own composable so the top-level overload resolves.

## Sortopia — `com.aweagle.sortopia` (ACTIVE / chosen)
- `D:\DevTools\Sortopia`. **Ball/Water-sort puzzle** — picked via market research (casual puzzle = $8.7B IAP, solo-feasible; simple + retention beats complexity).
- `game/SortEngine.kt` (pour/undo/win) + `game/LevelGenerator.kt` (random deal + **DFS solver** verifies every level solvable; seeded by level → stable campaign). Level-gen runs async on `Dispatchers.Default` w/ loading spinner. Pour juice: tubes lift on select, balls drop/scale in & out.
- **Built + 5/5 unit tests + E2E VERIFIED on emulator (2026-06-20):** launch/render OK, a real pour moved balls + incremented Moves + enabled Undo, no crash. `Sortopia-debug.apk` at root (~14.9 MB).
- NOT on Play yet — must **create the app in Play Console first** (API can't create apps), then upload via the play-* scripts (see [[project_play_store_publishing]]).
- **Ship-prep DONE 2026-07-19:** privacy page LIVE at https://ajay-waghmare.github.io/app-policy/sortopia-privacy.html (pushed to github.com/ajay-waghmare/app-policy);
  store graphics generated → `store\icon-512.png` + `store\feature-1024x500.png` (generator `tools\SortopiaGraphics.java`: javac + `java "-Djava.awt.headless=true" SortopiaGraphics <outDir>`);
  screenshots = pick from `testshots\e2e_*.png` (1080x2400, June E2E). **Remaining = Ajay in console:** Create app → App content (Ads=No, no data collected, Everyone, 13+, Games›Puzzle) →
  first release via console UI uploading `releases\Sortopia-v1.0-vc1-release.aab` → closed track + reuse BlockBloom tester list → opt-ins start the 14-day clock.
- **BlockBloom-parity batch (2026-06-20):** release signing (`keystore.properties` → shared `aw-eagle` keystore) + **signed release AAB built** (R8, 2.15 MB → `releases\Sortopia-v1.0-vc1-release.aab`); **sound + haptics** (`game/Feedback.kt` SoundPool + `res/raw/sfx_pour|win.wav` from `tools/gen-sfx.js` + VIBRATE perm); **Settings dialog** (sound/vibration toggles persisted in prefs, Version, Privacy link). proguard keep fixed to `com.aweagle.sortopia.**`. ⚠️ Privacy URL is a PLACEHOLDER (`.../app-policy/sortopia-privacy.html`) — host a real page before Play submission.
- **Daily Challenge + Wordle share ✅ (2026-06-20):** `game/DailyChallenge.kt` (date-seeded daily puzzle, 6 colors, scored by MOVES, star rating, spoiler-free share string + Play link) wired into VM (`inDaily`/`startDaily`/`exitDaily` + daily-vs-campaign branch on solve) and UI (Daily entry button, daily header, win-overlay Share via `ACTION_SEND`). 3 share-logic unit tests pass. Both Sortopia + BlockBloom **E2E-verified on emulator (`-gpu host`) 2026-06-20** (launch/render/interact, no crash).
- **Achievements + resume-in-progress ✅ (2026-06-21):** `game/Achievements.kt` (8 display-only achievements — no currency economy) + lifetime stat tracking in prefs + a trophy dialog (header 🏆). **Resume:** board serialized to prefs on each pour, restored on launch / after a daily detour — **E2E-verified to survive `am force-stop`** (Moves + exact board restored). All unit tests pass.
- Remaining BlockBloom features to port (roadmap): onboarding, accessibility (TalkBack/high-contrast), monetization (AdMob + IAP — deliberate post-launch). Also: targetSdk 36 before Aug 31 2026; host the Sortopia privacy page; create the app in Play Console (first release = console UI).
- ⚠️ Play gotchas (from BlockBloom): a new app's **first release must be created via the console UI** (API can't); use a **closed** track for the 12-tester/14-day clock; **targetSdk 36 deadline Aug 31 2026**; play-upload must NOT send `changesNotSentForReview=true` (this account rejects it with HTTP 400).

## Mergeocalypse — `com.aweagle.mergeocalypse` (PARKED)
- `D:\DevTools\Mergeocalypse`. Merge-evolution (2048-style, emoji tiers). Builds + tests pass. **User didn't like it** → parked for Sortopia. Safe to delete when cleaning up.

## Emulator E2E recipe + GOTCHAS (learned 2026-06-20)
- AVD **bloomtest** (Pixel 6, 1080x2400). `adb`/`emulator` under `D:\DevTools\Android\Sdk\` are native (no loopback patch).
- **Use `-gpu host`, NOT `-gpu swiftshader_indirect`** headless: software GPU is so slow that `com.android.systemui` ANRs ("System UI isn't responding") and **freezes input** → taps don't register. Boot (bg): `emulator -avd bloomtest -no-window -no-audio -no-boot-anim -gpu host -accel auto -port 5554`.
- **Boot readiness:** `sys.boot_completed=1` fires before services are up. Wait for boot_completed **AND** `until pm path android` **AND** ~10s more (ActivityManager + `/sdcard` lag the package manager). Early `am start` → "Activity does not exist".
- **Launch:** `adb shell monkey -p com.aweagle.<game>.debug -c android.intent.category.LAUNCHER 1` (robust).
- **Screenshots:** `screencap -p /data/local/tmp/x.png` then `adb pull` (`/sdcard` may not be writable early).
- Debug component = `com.aweagle.<game>.debug/com.aweagle.<game>.MainActivity` (appId has `.debug` suffix; activity class uses the namespace).
- Device-side `sleep` only (inside single-quoted `adb shell '...'`); host-side `sleep` is blocked by the harness.

## Market findings (2026, brief)
Top grossers (Royal Match, MONOPOLY GO, gacha RPGs) are studio-scale — don't clone. Solo-feasible lucrative lanes = **sort / word / block puzzle**. Win via polish + retention (daily challenge, meta-progression) + one twist (Balatro proves a solo dev can break out). India is a Tier-3 ad market (~8–15x lower eCPM than US) → design English/global and use ASO to pull Tier-1 installs.
