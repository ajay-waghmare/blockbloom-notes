---
name: project-blockbloom-code-review-2026-10
description: "Block Bloom vc21 release check + whole-project code review done 10 Oct 2026 — verified facts, the ranked findings (two latent ads-path bugs, dead Remote Config events class, no portrait lock, no line numbers in release traces), and what was NOT verified"
metadata:
  type: project
---

Full write-up: `D:\abc\Handover\01-blockbloom\09-code-review-2026-10-10.md`. Ajay asked "check
is that all okay? what do you think?" about the vc21 UI release, then "overall project code
review also". Done inline (no agents), with lint, a rebuilt debug APK and emulator screenshots.

## Verified on 10 Oct 2026
- Google's bundle 21 sha256 `fc274d2e…` == local AAB from `release/2026-10-09` HEAD `76d2e75`
  (app code `c3ba49c`); flags ADS off / ANALYTICS on / BILLING off; 72 tests green after the last UI commit.
- Production: vc21 `inProgress` 0.2 + vc20 `completed`; 8-locale notes live; live es-419 is correct
  Spanish but the COMMITTED `tools/release-notes/vc21.json` still has a Portuguese fragment.
- GA4 1.11.0 first evening: 6 first-opens, 4 Google test farm + 2 Google emulators; no exceptions.
  The 5 Oct `app_exception` was 1.9.0 on `sdk_gphone64_x86_64` in Iran — an emulator, noise.
- Emulator (bloomtest, API 34): Home/Game fine at 412 dp, 360 dp (`wm density 480`), 360 dp +
  font 1.3 (title survives only thanks to Android 14 non-linear font scaling), Home in landscape.

## Findings (ranked; details + fixes in the write-up)
1. **Latent ads bug:** `adLoading` never clears when a rewarded ad is dismissed before the reward
   (`AdMobAdHost.showRewarded` has no dismiss callback to the VM). Dormant until ADS_ENABLED.
2. **Banner IS wired** — `AdBanner(...)` GameScreen.kt:442 gated on `adsActive`. Earlier memory
   ("zero call sites") was WRONG; corrected in [[project-blockbloom-monetization]].
3. **`FirebaseEventConfig` never instantiated** — VM uses `LocalEventConfig`; `live_events` RC is
   fetched and ignored. Memory claim "RC carries live_events payloads" corrected.
4. No `screenOrientation` lock; GameScreen cannot fit landscape (by construction, not observed).
5. No `-keepattributes SourceFile,LineNumberTable` → release Crashlytics traces lack line numbers.
6. `drawBlock` now allocates 2 gradient brushes per block per frame (perf risk on low-end; unmeasured).
7. ~15 hardcoded English strings (toasts, COMBO, Level banner, month names, notification texts).
8. `lintDebug` fails: 3 MissingTranslation (brand words, mark `translatable="false"`) + 1
   MissingPermission (`BloomMessagingService.notify`). 71 warnings, mostly UseKtx.
9. No tests for Wallet/Ledger, saved-game round-trip, reviveBoard, freshTray.
10. GameViewModel 1,703 lines; split only when the next feature lands.

## Technique notes (reusable)
- `wm density 480` on the Pixel-6 AVD = a 360 dp-wide phone; `settings put system font_scale 1.3`;
  `adb emu rotate` rotates the device (the `user_rotation` setting alone did not).
- Pull to Windows-style host paths (`C:/...`) when `MSYS_NO_PATHCONV=1` is set, or adb cannot create the file.
- Scratchpad name collisions: a `fix-claims.js` from 24 Sep blocked a Write; date-suffix new scripts.
- New read-only scripts in the handover `scripts\`: `play-notes-get.js` (live release-note text),
  `ga4-version.js` (one version's daily/events/countries/devices), `ga4-event.js` (one event by
  version/device/country), `lint-summary.js`.

Related: [[project-blockbloom-release]], [[project-blockbloom-handover-2026-10]].
