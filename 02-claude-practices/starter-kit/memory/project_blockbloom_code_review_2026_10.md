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
- Production: vc21 `inProgress` 0.2 + vc20 `completed`; 8-locale notes live and correct. The
  Portuguese fragment in es-419 is in the UNTRACKED `vc21.json` on `main` only (I first reported
  this backwards; corrected 11 Oct) — the committed release-branch file is right; drop main's copy.
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

## Update 11 Oct 2026 — every finding fixed on `release/2026-10-11` (vc22 1.11.1)
(Shipped the same afternoon from the personal laptop: vc22 to internal + production 20%, 100% by 14 Oct;
superseded by vc23 1.12.0 on 18/19 Oct from `release/2026-10-17`. See [[project-blockbloom-release]].)
Ajay: "create new release branch dated today and do all fixes there … coding standards, user
interaction, user engagement, UI". Worktree `D:\DevTools\BlockBloom-oct11`, cut from
`release/2026-10-09` @ 76d2e75, five commits (17b0e39, 32a476b, ba057fb, 310060e, e65524c). Findings
1,3,4,5,6,7,8,9 fixed; 2 was a memory correction; 10 (VM split) deliberately left. Extras: New Game
confirm dialog, Daily Challenge card under Play, dp logotype, reduce-motion hero float, RC dials
`ads_banner_enabled`/`ads_interstitial_enabled` (default OFF), `SavedGameCodec` v2 (reads old blobs),
86 unit tests green. Emulator-verified incl. German via `cmd locale set-app-locales <pkg> --user 0
--locales de-DE`. Full day log: `D:\abc\Handover\journal\2026-10-11.md`.

Emulator lessons: snapshot boot can come up with no activity service → cold boot
(`-no-snapshot-load`); first screen may be "System UI isn't responding" → tap Wait; set
`MSYS_NO_PATHCONV=1` for EVERY adb call with a `/sdcard` path (screencap printed its usage otherwise).

## 19 Oct 2026 — review of the vc23 code written on the personal laptop
Write-up: `D:\abc\Handover\01-blockbloom\10-code-review-2026-10-19.md` (in the notes repo). Headline: the
product's problem is the FIRST SESSION (half of installs uninstall, 47% never clear a line), not revenue or
performance (0 crashes). Code findings, none fixed: out-of-coins "Watch Video" gated on `BuildConfig.ADS_ENABLED`
instead of `adsActive` (dead end without consent); lifeline bundles priced ~50% worse than converting coins;
gem→coin exchange logged as LIFELINE_BUY/IAP_PURCHASE and inflates `totalCoinsEarned`; "get gem packs below"
toast with no products; near-miss window fires on bad runs; 2 of 3 new tests don't touch production code;
VM ~1,800 lines; debug builds report to the same GA4 property; remote commits authored as swati.waghmare2905.
**Same evening, on Ajay's "do the changes ASAP":** everything except the VM split and the author identity
was fixed on `release/2026-10-20` (vc24 1.12.1, pushed, not uploaded), plus the seeded first board
(`game/FirstSession.kt`). Details in [[project-blockbloom-release]] and the 19 Oct journal.

Related: [[project-blockbloom-release]], [[project-blockbloom-handover-2026-10]].
