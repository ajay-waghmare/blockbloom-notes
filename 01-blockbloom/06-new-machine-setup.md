# New machine setup for Block Bloom

## Install

| Tool | Version used here | Notes |
|---|---|---|
| Git | any | GitHub account `ajay-waghmare`; log in via browser or a PAT with `repo` scope. `gh` was never installed |
| JDK 17 | Temurin 17.0.10+7 at `D:\DevTools\Android\Jdk17\jdk-17.0.10+7` | any 17.x works for AGP 8.13 |
| Android SDK | `D:\DevTools\Android\Sdk`: platforms 34/35/36, build-tools, platform-tools, emulator, cmdline-tools, system image `android-34;google_apis;x86_64` | Android Studio's SDK Manager is the easy route; no Android Studio was installed on the work laptop (IntelliJ + CLI only) |
| Emulator AVD | `bloomtest`, Pixel 6, API 34, x86_64 | recreate; AVDs do not travel. Launch with `-gpu host`, never swiftshader (System UI ANRs and input freezes) |
| Node | v16.20.2 at `C:\nvm4w\nodejs` | scripts use only built-in `https`/`crypto`/`fs`/`zlib`; Node 18/20 is fine too |
| Gradle | wrapper 8.13 (downloads itself) | nothing global needed |
| Chrome | for HTML-to-PDF and page screenshots | `--headless --print-to-pdf`, absolute forward-slash paths |
| Python | optional (3.14 was on the work laptop; only reportlab) | nothing in Block Bloom needs it |

## Paths the repo and scripts expect

Either recreate these paths exactly, or edit the files in the right-hand column.

| Expected path | Used by |
|---|---|
| `D:\DevTools\Android\Jdk17\jdk-17.0.10+7` | `build.bat` (JAVA_HOME) |
| `D:\DevTools\Android\Sdk` | `build.bat` (ANDROID_HOME), `local.properties` (`sdk.dir`), `Launch-BlockBloom.bat` |
| `D:\DevTools\keystores\aw-eagle-upload.jks` | `keystore.properties` -> `storeFile` |
| `D:\Downloads\avid-airway-498216-e5-9f357c8e6b11.json` | default in `tools\pull-metrics.js`; everything else takes the path as an argument or `PLAY_SA_FILE` |
| `D:\DevTools\BlockBloom-oct9\app\build\outputs\apk\debug\app-debug.apk` | `Launch-BlockBloom.bat` (installs the debug APK on the emulator) |
| `D:\DevTools\_shared\aweagle-baseline.toml` + `_shared\tools\*.js` | portfolio toolchain baseline (`sync-baseline.js --check`, `play-preflight.js`); copy from `scripts\_shared\` |

## After cloning

1. Copy `keystore.properties` into the repo root (and into every worktree you create). Fix
   `storeFile` if the keystore path differs.
2. Write `local.properties` with `sdk.dir=<your SDK path>` (use `\\` or `/`).
3. Decide on the loopback patch. `build.bat` and the memory files inject
   `JDK_JAVA_OPTIONS=--patch-module java.base=tools\jdkpatch\out` because the work laptop's
   AF_UNIX loopback is broken (JDK 16+ `PipeImpl` fails on `Selector.open()`). A normal machine
   does not need it. Keeping it is harmless (it forces the pre-JDK-16 TCP loopback path), but do
   not also put `--patch-module` in `org.gradle.jvmargs` or the JVM refuses to start. Simplest:
   run `gradlew` directly with `JAVA_HOME` set and forget the patch unless the symptom appears.
4. Verify:
   ```
   gradlew :app:testDebugUnitTest --console=plain          (72 tests)
   gradlew :app:lintVitalRelease :app:bundleRelease --console=plain
   node tools\play-status.js <sa.json> com.aweagle.blockbloom     (read-only)
   ```
5. Put the scripts from `scripts\` somewhere permanent (the long-standing TODO was
   `D:\DevTools\play-tools\`) and tell Claude where in memory.

## Worktrees

21 worktrees exist on the work laptop (`D:\DevTools\BlockBloom-<name>`), one per feature. They
are just checkouts; all branches are on GitHub. On the new machine create them on demand:
`git worktree add D:\DevTools\BlockBloom-<name> <branch>` and copy the two gitignored files in.

## Gotchas that are specific to tooling, not to the app

- Node cannot read MSYS paths (`/c/...`, `/tmp/...`): pass `C:/...` style paths to node.
- Git Bash rewrites device paths in `adb shell` commands: prefix with
  `MSYS_NO_PATHCONV=1 MSYS2_ARG_CONV_EXCL='*'`.
- A Bash heredoc on Windows eats regex escapes (`\b` became a backspace and a cleanup script
  gutted a file): write scripts with an editor, not a heredoc.
- `python - <<EOF` blocks on stdin forever in this harness.
- `build.bat` through the Bash tool can exit 0 having done nothing; use `./gradlew` with env
  vars and check the AAB timestamp.
- Emulator: wait for `sys.boot_completed=1` AND `pm path android` AND ~10 s; launch with
  `monkey -p com.aweagle.blockbloom.debug -c android.intent.category.LAUNCHER 1`; screenshots via
  `screencap -p /data/local/tmp/x.png` then `adb pull`; `uiautomator dump` for tap targets.
- To see analytics events leave the app: `setprop log.tag.FA VERBOSE`, `log.tag.FA-SVC VERBOSE`,
  `debug.firebase.analytics.app com.aweagle.blockbloom.debug` before the process starts, then
  read `Logging event: origin=app,name=...` from logcat.
- Only AAB metadata tells you the AGP of an old bundle:
  `unzip -p x.aab BUNDLE-METADATA/com.android.tools.build.gradle/app-metadata.properties`.
