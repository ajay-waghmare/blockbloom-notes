---
name: project-arrow-bloom
description: "Arrow Bloom (com.aweagle.arrowbloom) — Ajay's second game; 1.0.0 publish-ready on release/2026-10-20 (20 Oct 2026), signed AAB built, NOT yet in Play Console; paths, build dir, test hooks, what Ajay must do"
metadata:
  type: project
---

**Arrow Bloom** = AW EagleCraft's second game (sister of Block Bloom), a calm arrow-escape logic puzzle,
Kotlin + Compose, zero backend, no INTERNET permission in 1.0.0. Package `com.aweagle.arrowbloom`.

**Where it lives on this laptop (since 20 Oct 2026)**
- Code clone `D:\DevTools\ArrowBloom` (branch `main` = 19 Oct scaffold, dae1664).
- Worktree `D:\DevTools\ArrowBloom-pub` on **`release/2026-10-20`** = 1.0.0 publish-ready
  (1362a78 rebuild → 9757dfb level 1 all free → 33239bb hooks + store kit). Never merge to `main`; Ajay does.
- Notes clone `D:\abc\ArrowBloom-notes` (repo `arrowbloom-notes`), work committed on branch `journal`;
  read `02-PLAY-STORE-LAUNCH-CHECKLIST.md`, `03-COPYRIGHT-AND-DIFFERENTIATION.md`, `journal/2026-10-20.md`.
- Build dir `C:\Users\Ajay.Waghmare\.build-arrowbloom\app` (AAB at `outputs\bundle\release\app-release.aab`,
  ~2 MB; release APK under `outputs\apk\release`). `keystore.properties` + `local.properties` copied from
  `D:\DevTools\BlockBloom-oct20` (gitignored; same upload key as Block Bloom; never print the password).
- Same build env as Block Bloom: JDK 17 + jdkpatch loopback, `dangerouslyDisableSandbox` for Gradle/emulator,
  `./gradlew --stop` if the Kotlin daemon complains about "different roots".

**State (20 Oct 2026):** targetSdk 36, versionCode 1 / 1.0.0, 50 unit tests green, lint 0 errors, debug
walkthrough + release (R8) smoke test on emulator `bloomtest` clean. Store kit in `store/` (icon, feature
graphic, 6 framed 1080×1920 screenshots via `tools/store-screenshots.js`, `listing_v1.json` 8 locales).
**No Play Console app yet** — the first release of a new app must be created in the console UI by Ajay
(internal → closed 12 testers/14 days → production). Ads = No, Data safety = no collection are TRUE for 1.0.0.

**Test hooks (debug build only):** long-press the score (≈511,241 on the 1080×2400 AVD) auto-taps one
free arrow; long-press the title (≈511,171) jumps to the next garden. Walkthrough script was
`ab-emu-walk.sh` in the 20 Oct session scratchpad (recreate from the journal if needed).

**Why:** Ajay asked for a world-class, unique, publish-ready app with thorough testing while he slept
(20 Oct). Uniqueness lives in gardens, long arrows, stars-by-blocked-taps (no timer), Daily Bloom with
streak shield, procedural music, petal blooms — never in copied art or names.
**How to apply:** next session start from the worktree + notes journal; before any ad/analytics work give
Arrow Bloom its own Firebase project and AdMob app (never reuse Block Bloom's); keep the listing free of
"no ads / no IAP" claims. Related: [[project-blockbloom-release]], [[feedback-blockbloom-release-process]],
[[feedback-blockbloom-daily-journal]], [[feedback-never-merge-master]].
