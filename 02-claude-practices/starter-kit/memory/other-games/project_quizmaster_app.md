# QuizMaster — General Knowledge Android Game

Personal side project (not QI Spine work). Built 2026-05.

- **Location:** `D:\DevTools\QuizMaster`
- **Stack:** Kotlin 1.9.24 + Jetpack Compose (BOM 2024.06.00) + Material 3, single-Activity + `QuizViewModel`/`StateFlow`. AGP 8.5.2, Gradle 8.7, JDK 17. `compileSdk 34`, `minSdk 26`. Package `com.aweagle.quizmaster`.
- **Content:** 120 curated offline questions across 8 categories (`data/QuestionBank.kt`) + optional online mode from Open Trivia DB (`data/OpenTriviaApi.kt`, `HttpURLConnection` + built-in `org.json`, no extra deps).
- **Gameplay:** per-question countdown timer, difficulty-based scoring + speed bonus + streak multiplier, 50:50 & Skip lifelines, high-score/best-streak persistence (`QuizPrefs`/SharedPreferences), ToneGenerator SFX, animated Home/Quiz/Result screens, adaptive launcher icon.

## Building
- **Use `build.bat`** (in project root). It sets `JAVA_HOME`=JDK17, `ANDROID_HOME`=Sdk, and applies the JDK loopback patch via `JDK_JAVA_OPTIONS` (project-relative `tools\jdkpatch\out`). `build.bat installDebug` to install on a connected device.
- This machine REQUIRES the loopback patch or Gradle won't run — see `env_android_gradle_loopback_fix.md`.
- Output APK: `app\build\outputs\apk\debug\app-debug.apk`. Verified building (exit 0, warning-free). Not yet run on a device/emulator (none installed/connected).
- Add questions via the `q(cat, diff, text, correct, w1, w2, w3, info)` helper in `QuestionBank.kt` — first option is the correct one; engine reshuffles at runtime.

## Play Store (2026-06-03)
- Package renamed `com.qispine.quizmaster` → `com.aweagle.quizmaster` across all sources, folder (`com/qispine`→`com/aweagle`), proguard and README. Release signing config + gitignored `keystore.properties` added (shared AW Eagle upload key); signed release AAB builds (9.44 MB, minify off — can enable R8 later).
- ⛔ Not yet created in Play Console — the app entry must be created there manually before it can be uploaded (the API can't create apps). Then upload via the scripts. See **project_play_store_publishing.md**.
