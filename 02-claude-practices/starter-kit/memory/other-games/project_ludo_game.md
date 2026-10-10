# Ludo Game (personal side project, not QI Spine work)

Built by Claude on 2026-05-31. Separate from QI Spine; lives alongside the Unity `RacingGame`.

## Location & stack
- Path: `D:\DevTools\Projects\LudoGame` (sibling to `D:\DevTools\Projects\RacingGame`).
- Unity **6000.4.8f1** (editor at `D:\DevTools\Unity\Unity\Hub\Editor\6000.4.8f1\Editor\Unity.exe`).
- Cloned RacingGame's `ProjectSettings` + the 2 URP global-settings assets (with their `.meta` GUIDs) so it opens identically. `activeInputHandler: 2` (Both) → classic `StandaloneInputModule` for UI.
- Namespaces `LudoGame.*` (mirrors RacingGame's `RacingGame.*` convention, XML docs, `Singleton<T>`).

## How it runs
- **Code-first / procedural**: no imported art/audio, no hand-wired scene. `UI/LudoBootstrap.cs` builds the whole game at runtime via `[RuntimeInitializeOnLoadMethod]`. `Editor/LudoProjectSetup.cs` (`[InitializeOnLoad]`) auto-creates `Assets/Scenes/Ludo.unity` + registers it in Build Settings. Just open & press Play.
- All UI lives in a fixed **1080×1920 design frame** that auto-scales (letterbox) → looks right portrait & landscape.

## Architecture (Assets/Scripts)
- `Core/` — pure rules. **BoardLayout**: 52-ring = 4 rotations of a 13-cell quadrant about centre (`R(x,y)=(y,14-x)`); starts 13 apart; has `Validate()`. `GameState` (JSON-serializable, indexed by colour 0-3), `LudoRules`, `LudoMatch` (authoritative engine + events).
- `AI/LudoAI.cs` — Easy/Normal/Hard heuristics (capture/escape/advance/finish).
- `Net/` — dependency-free TCP (`TcpHost`, `TcpClientLink`, `NetProtocol` length-prefixed JSON envelopes, `OnlineSession`). Authoritative host + thin clients; lobby; AI-fills empty seats. Port **7777**, LAN/direct-IP.
- `Game/` — `IMatchDriver` (LocalDriver / ClientDriver) unifies local+online; `GameController` (turn flow, AI pacing, single animation queue, in-game HUD).
- `View/` — `SpriteFactory` (runtime textures), `BoardView`, `TokenView` (hop anim), `DiceView`, `ColorPalette`.

## Rules
6 to leave yard; exact roll to finish; capture on non-safe ring cells; 8 safe cells (4 starts + 4 stars); extra turn on 6/capture/finish; three 6s forfeits; first to get 4 tokens home wins. No block/barricade rule (kept off for smoothness).

## Validation status
- CI self-test PASSES: `Unity -batchmode -nographics -projectPath . -executeMethod LudoGame.EditorTools.LudoCI.CI -quit` (also menu **Ludo ▸ Run Self-Test**). Verifies board geometry + GameState JSON round-trip + a full 4-AI match to completion. **0 compile errors, 0 warnings.**
- **Runtime-untested** (no GUI in headless): the live UI/animations and real TCP client↔host handshake. Logic, geometry, serialization, AI, full match flow are proven.

## Unity batchmode gotcha (important)
On a FRESH project the first `Unity -batchmode` launch only imports packages then the wrapper returns while Unity **relaunches a child** that keeps the project lock — a second immediate run aborts with "return code 1". Fix: kill `Unity`/`Unity.ILPP.Runner`/`UnityAutoQuitter`/`UnityPackageManager`, delete `Temp/UnityLockfile`, then run once and **poll the logfile** for a result marker (don't trust the wrapper's early exit).

## Android APK (BUILT & verified)
- `Assets/Editor/LudoBuild.cs` → menu **Ludo ▸ Build Android APK**, or batch `-executeMethod LudoGame.EditorTools.LudoBuild.BuildApk -buildTarget Android`. Output: `Builds/Ludo.apk` (~26 MB).
- Settings: Mono2x + ARMv7, portrait, `forceInternetPermission`, `applicationEntry = Activity`, `optimizedFramePacing = false` (the last two avoid the GameActivity/Swappy prefab native step — see env_android_gradle_loopback_fix.md). Debug-signed (v2 scheme `Verifies`), `com.qispine.ludo` v1.0.0, minSdk 25 / target 34.
- **Build requires** `JDK_JAVA_OPTIONS=--patch-module java.base=D:\DevTools\patch\out` AND sandbox disabled (Gradle loopback). See the env memory.
- Caveat: ARMv7 (32-bit) — runs on ~all phones; rare 64-bit-only devices would need an IL2CPP/ARM64 build.
