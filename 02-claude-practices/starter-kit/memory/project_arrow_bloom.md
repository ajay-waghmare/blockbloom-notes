---
name: project-arrow-bloom
description: "Arrow Bloom (com.aweagle.arrowbloom) — Ajay's second game; 1.0.0 publish-ready on release/2026-10-20 (20 Oct 2026), signed AAB built, NOT yet in Play Console; paths, build dir, publisher scripts, console runbook, what Ajay must do"
metadata:
  node_type: memory
  type: project
  originSessionId: f4795aa1-7942-4344-a6c4-e7b6487ba3f4
  modified: 2026-10-20T03:41:23.735Z
---

**Arrow Bloom** = AW EagleCraft's second game (sister of Block Bloom), a calm arrow-escape logic puzzle,
Kotlin + Compose, zero backend, no INTERNET permission in 1.0.0. Package `com.aweagle.arrowbloom`.

**Where it lives on this laptop (since 20 Oct 2026)**
- Code clone `D:\DevTools\ArrowBloom` (branch `main` = 19 Oct scaffold, dae1664).
- Worktree `D:\DevTools\ArrowBloom-pub` on **`release/2026-10-20`** = 1.0.0 publish-ready
  (1362a78 rebuild → 9757dfb level 1 all free → 33239bb hooks + store kit → 1a0d894 privacy URL + publisher
  scripts → icon RGBA). Pushed. Never merge to `main`; Ajay does.
- Notes clone `D:\abc\ArrowBloom-notes` (repo `arrowbloom-notes`), committed on branch `journal` (pushed):
  `02-PLAY-STORE-LAUNCH-CHECKLIST.md`, `03-COPYRIGHT-AND-DIFFERENTIATION.md`,
  **`04-PLAY-CONSOLE-RUNBOOK-2026-10-20.md`** (browser-Claude runbook, parts 1–8), `journal/2026-10-20.md`.
- Privacy page: `D:\DevTools\app-policy` branch **`arrow-bloom-policy`** (pushed, PR not merged) adds
  `arrow-bloom-privacy.html`; the app's PRIVACY_POLICY_URL already points at
  `https://ajay-waghmare.github.io/app-policy/arrow-bloom-privacy.html` → 404 until Ajay merges to main.
- Build dir `C:\Users\Ajay.Waghmare\.build-arrowbloom\app` (AAB `outputs\bundle\release\app-release.aab`,
  ~2 MB; release APK `outputs\apk\release`). `keystore.properties` + `local.properties` copied from
  `D:\DevTools\BlockBloom-oct20` (gitignored; same upload key as Block Bloom; never print the password).
- Same build env as Block Bloom: JDK 17 + jdkpatch loopback, `dangerouslyDisableSandbox` for Gradle/emulator,
  `./gradlew --stop` if the Kotlin daemon complains about "different roots".

**Publisher scripts** in `ArrowBloom-pub\tools\`: `play-status.js`, `play-upload.js`, `play-listings-set-multi.js`
(brand check "Arrow Bloom"), `play-images-upload.js` (new, --dry-run/--list, validated read-only against the API).
All take the SA key by path (`D:\Downloads\avid-airway-498216-e5-9f357c8e6b11.json`, same SA as Block Bloom).
Research 20 Oct (official pages): the FIRST bundle of a new app must be uploaded in the console UI, API only after
that; the 12-tester/14-day closed test is written per app with no documented exemption for a second app → the
new app's Dashboard decides; Data safety = "No" still needs the privacy URL; Advertising ID = No.

**State (20 Oct 2026):** targetSdk 36, versionCode 1 / 1.0.0, 50 unit tests green, lint 0 errors, debug
walkthrough + release (R8) smoke tests on emulator `bloomtest` clean. Store kit in `store/` (icon 512 RGBA,
feature graphic, 6 framed 1080×1920 screenshots via `tools/store-screenshots.js`, `listing_v1.json` 8 locales).
**Play Console (20 Oct evening):** app EXISTS (developer 8701670281323658688, app 4972007048514376994); listing text (8 locales) + graphics committed via API; versionCode 1 is a DRAFT on Internal testing (uploaded via tools/play-upload.js, so the API does accept a first upload); declarations done except Privacy policy / Target audience / Data safety (blocked on the unmerged privacy PR). Dashboard confirms the 12-tester/14-day closed test applies. Remaining = runbook Part 8 (all Ajay: merge PR, submit Data safety, roll out internal, closed test, send for review, apply for production).

**Test hooks (debug build only):** long-press the score (≈511,241 on the 1080×2400 AVD) auto-taps one
free arrow; long-press the title (≈511,171) jumps to the next garden.

**Why:** Ajay asked for a world-class, unique, publish-ready app with thorough testing while he slept
(20 Oct), then for detailed browser-Claude steps. Uniqueness lives in gardens, long arrows,
stars-by-blocked-taps (no timer), Daily Bloom with streak shield, procedural music, petal blooms.
**How to apply:** next session start from the worktree + notes journal; run Part 3 scripts only after the
first console upload and while nobody edits in the console; before any ad/analytics work give Arrow Bloom its
own Firebase project and AdMob app; keep the listing free of "no ads / no IAP" claims.
Related: [[project-blockbloom-release]], [[feedback-blockbloom-release-process]],
[[feedback-blockbloom-daily-journal]], [[feedback-never-merge-master]].
