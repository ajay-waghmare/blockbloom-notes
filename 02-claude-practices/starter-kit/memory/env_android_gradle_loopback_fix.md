# Android / Gradle "Unable to establish loopback connection" — machine-wide fix

**CHECK THIS BEFORE ANY Gradle/Android CLI build on this machine.** Without the fix,
**every** Gradle build (and anything using a Java NIO `Selector`) fails immediately.

## Symptom
```
java.io.IOException: Unable to establish loopback connection
  at sun.nio.ch.PipeImpl$Initializer$LoopbackConnector.run
Caused by: java.net.SocketException: Invalid argument: connect
  at sun.nio.ch.UnixDomainSockets.connect0(Native Method)
```
Reproduce in isolation: a tiny program calling `java.nio.channels.Selector.open()` fails
5/5 on **every** JDK here (Temurin 17, Temurin/Oracle 21, and IntelliJ JBR 21).

## Root cause (confirmed by reading JDK src.zip)
Since JDK 16, `sun.nio.ch.PipeImpl` builds the selector's internal self-pipe over an
**AF_UNIX (Unix-domain) socket** on Windows. `createListener()` only falls back to TCP
loopback if the AF_UNIX **bind** fails. On this host the bind succeeds but the **connect**
throws `EINVAL` (the Windows AF_UNIX provider is broken/blocked — likely security policy).
There's no fallback for a failed connect, so Gradle (which opens selectors for all socket
I/O) can't even start. Plain TCP loopback (127.0.0.1) works fine; only AF_UNIX is broken.
`-Djava.net.preferIPv4Stack`, clean `java.io.tmpdir`, etc. do NOT help. No JDK property
disables AF_UNIX pipes, so the only fix is patching the class.

## The fix
A one-line patch to `sun.nio.ch.PipeImpl` that forces the (working) TCP-loopback branch
(`DISABLE_AF_UNIX_PIPE = true`), injected via `--patch-module`. It MUST be delivered
through the **`JDK_JAVA_OPTIONS`** env var (NOT `JAVA_TOOL_OPTIONS`, which rejects
`--patch-module`). As an env var it propagates to every Gradle JVM (launcher, daemon,
workers, Kotlin daemon).

Canonical reusable patch dir (project-independent), compiled against JDK 17.0.10 (also
verified loading on JDK 21):
```
D:\DevTools\patch\out\sun\nio\ch\PipeImpl*.class
D:\DevTools\patch\src\sun\nio\ch\PipeImpl.java   (the edited source)
```
(QuizMaster also bundles its own copy at `D:\DevTools\QuizMaster\tools\jdkpatch\out`.)

### Apply to ANY build (CLI)
```bat
set "JDK_JAVA_OPTIONS=--patch-module java.base=D:\DevTools\patch\out"
gradlew.bat <tasks>
```
Do NOT also put `--patch-module` in `org.gradle.jvmargs` — specifying it twice for
`java.base` makes the JVM refuse to start. Env var only.

### Apply in Android Studio / IntelliJ
Set the SAME `JDK_JAVA_OPTIONS` as a Windows **user environment variable** (or launch the
IDE from a shell that has it set), else Gradle sync hits the same error. Forcing TCP
loopback is harmless on healthy machines (it's pre-JDK-16 behavior), so leaving it set
globally is safe.

### Regenerate the patch (only if switching JDKs / editing it)
Extract `sun/nio/ch/PipeImpl.java` from `<jdk>/lib/src.zip`, change the line
`if (preferUnixDomain && UnixDomainSockets.isSupported())` to be guarded by a
`DISABLE_AF_UNIX_PIPE = true` flag (always-false), then:
```bat
"<jdk>\bin\javac.exe" --patch-module "java.base=<srcdir>" -d "<outdir>" "<srcdir>\sun\nio\ch\PipeImpl.java"
```
Run `D:\DevTools\QuizMaster\tools\jdkpatch\compile-patch.bat` for a ready-made example.

## Local Android toolchain facts (no env vars were set globally)
- Android SDK: `D:\DevTools\Android\Sdk` — platform **android-34**, build-tools 34.0.0 & 36.0.0, platform-tools/adb present. `ANDROID_HOME` is NOT set globally → pass it or use `local.properties` `sdk.dir`.
- JDK 17 (best for AGP): `D:\DevTools\Android\Jdk17\jdk-17.0.10+7`
- JDK 21 = default `java` on PATH: `C:\Program Files\Java\jdk-21`
- Gradle 8.7 extracted at `D:\DevTools\Android\gradle-8.7` (no global `gradle` on PATH; use the wrapper).
- IntelliJ IDEA Community 2024.3.1.1 (JBR 21) at `C:\Program Files\JetBrains\IntelliJ IDEA Community Edition 2024.3.1.1`. No Android Studio installed. No emulator/system-images installed.
- `localhost` resolves to IPv6 `::1` first; hosts file only has `127.0.0.1 kubernetes.docker.internal` (Docker Desktop / Hyper-V present).
- Sandboxed Bash/PowerShell also block loopback — run Gradle with the sandbox disabled.

## Unity 6 batchmode Android builds — extra gotcha (learned building LudoGame APK)
Two issues beyond the loopback patch, when building an APK via `-executeMethod ... -buildTarget Android`:
1. **First launch on a fresh project only imports packages, then relaunches a child** that keeps the project lock; a second immediate run aborts "return code 1". Kill `Unity`/`Unity.ILPP.Runner`/`UnityAutoQuitter`/`UnityPackageManager`, delete `Temp/UnityLockfile`, run once, and **poll the logfile** for the result marker.
2. **The JDK loopback patch's `NOTE: Picked up JDK_JAVA_OPTIONS` stderr line breaks AGP's `prefab` step** (`:unityLibrary:configureCMakeRelWithDebInfo[<abi>]` FAILED even though prefab itself exits 0 — AGP fails the task because the external process wrote to stderr). The prefab/CMake/NDK step only exists because of **GameActivity** + **Swappy frame pacing**. Fix in the build script:
   ```csharp
   PlayerSettings.Android.applicationEntry = AndroidApplicationEntry.Activity; // not GameActivity
   PlayerSettings.Android.optimizedFramePacing = false;                        // no Swappy AAR
   ```
   → no AAR prefab, no native CMake task, build succeeds with the loopback patch still set. (Clear `Library/Bee/Android` to force clean gradle regen.)
- **Signing**: with `useCustomKeystore = false` Unity debug-signs the release APK (verified: APK Signature Scheme v2 `Verifies`) → installs by sideload. No keystore needed for personal builds.
- **Backend**: Mono2x + `AndroidArchitecture.ARMv7` builds fast, no NDK/IL2CPP, installs on ~all phones. (ARM64/Play-Store needs IL2CPP.) A clean APK build is ~3 min once assets are imported.
- Working example: `D:\DevTools\Projects\LudoGame\Assets\Editor\LudoBuild.cs` (menu **Ludo ▸ Build Android APK**) → `Builds\Ludo.apk` (~26 MB).
