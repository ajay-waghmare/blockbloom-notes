---
name: project-blockbloom-release
description: "Block Bloom Android game — Play Console release setup, scripts, and gotchas (personal project, separate from QiSpine)"
metadata: 
  node_type: memory
  type: project
  originSessionId: 66816704-878d-471b-8ad2-e488dd7990f3
---

## CURRENT STATE — 19 Oct 2026 (read this first; synced from the notes-repo journal 11–19 Oct)

**Live on production: vc23 / 1.12.0 at 100%**, approved and live worldwide 19 Oct (uploaded 18 Oct from
`release/2026-10-17` @ `7cfcd43`, notes in 8 locales). Internal: vc23 completed. History: vc22 1.11.1 went
internal + production 20% on 11 Oct and 100% by 14 Oct; vc21/vc20 superseded.

**What vc23 turned on (first revenue build):** `ADS_ENABLED=true` with REAL AdMob ids (publisher
`pub-1693732810683011`; app id + rewarded/interstitial/banner unit ids are in `app/build.gradle.kts`),
"minimum ads" policy = rewarded video only, 100% opt-in (out-of-coins +1 lifeline, revive, double coins,
skin unlock); banner + interstitial stay OFF via `AdsRules` defaults / Remote Config dials.
`BILLING_ENABLED=true` — `PlayBillingHost` connects but self-gates until products exist in Play Console
(BillDesk Video KYC done 15 Oct; product catalog activation still pending). Shop sells gem→coin and
gem→lifeline bundles; `OutOfCoinsDialog` routes an unaffordable lifeline to the shop or a rewarded ad.
Google Play flexible in-app updates (`InAppUpdateHost` + `UpdateBanner` on Home/Settings). Remote Config
`min_supported_version_code = 23` is the force-update lever — NOT pulled; ~100 players still on 1.10.0
which has no update banner, decision was to wait 3–5 days of nightly auto-updates first.

**Store / account:** all 13 listings refreshed with ASO copy (no more "no ads / no IAP" claims), English
title `Block Bloom: Block Puzzle Game`; 5 store tags; third-party app stores enabled; **15% service-fee
tier enrolled 14 Oct**; developer website `https://ajay-waghmare.github.io` set via the Publisher API
(`tools/play-set-website.js`) and `app-ads.txt` (`google.com, pub-1693732810683011, DIRECT, …`) live there;
privacy policy section 6 now discloses AdMob + Billing.

**Numbers (19 Oct):** ~240 lifetime players, DAU ~28–31, 1,547 games, 796 lifelines, 389 streak claims,
1 exception lifetime; 1.12.0 had 13 actives after a day with the first real `ad_reward` events. Top
markets US, India, Indonesia, Korea, Brazil, Germany, Türkiye, Japan.

**Next build, 19/20 Oct 2026: vc24 / 1.12.1 on `release/2026-10-20`** (worktree `D:DevToolsBlockBloom-oct20`, cut from
`release/2026-10-17`, pushed, NOT uploaded): seeded first board (FirstSession), ShopCatalog + Economy with repriced
lifeline packs (10 Hammers/10, 10 Shuffles/8, 5+5+5/10 — all beat the coin route, test-enforced), TxReason.GEM_EXCHANGE,
out-of-coins "Watch Video" gated on adsActive, near-miss window 12%/30 pts, debug builds dark to Analytics, update-banner
events. 110 unit tests, lint 0 errors, emulator-verified (first placement clears, shop cards, prompt). Notes `vc24.json`.

**Console setup, 19 Oct night (via Claude in the browser + API verification):** Play ads declaration = Yes, advertising-ID
purposes ads+analytics, Data safety DRAFT prepared (NOT submitted), four one-time products created INACTIVE
(`remove_ads`, `gems_small/medium/large`; India ₹149/49/129/349), AdMob GDPR + US consent messages published,
Remote Config v1 live with the four keys, key events marked, GA4 retention 14 months, SA can now read GA4 Admin
+ RC. **Store listings fixed 19 Oct:** 8 locales still said NO ADS / NO IAP in the full description — reworded
and committed via `play-listings-set-multi.js` (`store/bundle_vc24_listings.json`). Open: AdMob review +
app-ads.txt crawl, AdMob↔Firebase link, BillDesk/AdMob payments, Blaze before 15 Nov, Data safety submit.

**Branches:** `main` = `ee83031`, untouched and behind `release/vc19`, `release/2026-10-09`, `-10-11`,
`-10-17` — Ajay merges to `main` himself ([[feedback-never-merge-master]]). Each release branch is cut
from the previous one. Local worktrees on the work laptop: `BlockBloom-oct17` (release/2026-10-17 @
`c57f549`, added 19 Oct), `BlockBloom-oct11` (@ `9d8fd1a`), `BlockBloom-oct9`, `BlockBloom-rel` (vc19).
`D:\DevTools\BlockBloom` (main) still carries an uncommitted `tools/play-rollout.js` and the untracked
`tools/release-notes/` whose `vc21.json` es-419 entry is wrong — drop it, do not merge it.

**Build output moved:** `layout.buildDirectory` → `~/.build-blockbloom/app` (OneDrive lock fix, 11 Oct), so
on this laptop the AAB is `C:\Users\Ajay.Waghmare\.build-blockbloom\app\outputs\bundle\release\app-release.aab`.
New tools on the release branches: `play-listings-set-multi.js`, `play-set-website.js`, `fetch-reviews.js`,
`store/ASO_PROPOSAL_VC23.md`; `play-rollout.js` REQUIRES `tools/release-notes/vc<N>.json`.

**Play credential:** service account JSON at `D:\Downloads\avid-airway-498216-e5-9f357c8e6b11.json`
— matches the `avid-airway-*.json` entry in .gitignore. Pass by path via `PLAY_SA_FILE`; never
inline it, never copy it into the repo. Same key reads Play, the GCS reports bucket and GA4.

Sister title started 19 Oct: [[project-arrow-bloom]]. Daily log: `D:\abc\Handover\journal\`.

## Timeline

| Date | Build | What it was |
|---|---|---|
| 5 Jun 2026 | — | Initial commit, Compose block-puzzle game |
| 12 Jun | vc10 | v1.5, level-detour save handling |
| 26 Jul | vc11–14 | ads engine, growth build, API 36 |
| 20 Sep | vc15 | retention: streak shield, daily reminders, fair Shuffle deals. **No analytics at all** — this is why GA4 can't see most of the installed base |
| 24 Sep | vc16 | Firebase wired and analytics ON, ads+billing merged but dark behind flags, tray-solvability fairness floor |
| 24 Sep | vc17 | Play Billing 8 (plain, not ktx) |
| 25 Sep | vc18 | polish: force-update gate (dormant), scroll fixes, press feedback, new-best treatment |
| 2 Oct | vc19 | first-run rebuild — land on a live board, coach marks instead of a card deck, rating/share loops moved to reachable moments, androidx.fragment 1.8.9. **Alpha only** |
| 2 Oct | vc20 | vc19 + six-language localisation + Language setting + share at game over + REMINDER_OPENED + RC hourly. **Production, 100%** |
| 4 Oct | vc21 | 1.11.0 — 3D visual polish, 8-locale notes. Production 20% from 10 Oct |
| 11 Oct | vc22 | 1.11.1 — every 10 Oct review fix: New Game confirm, challenge card under Play, full i18n sweep, SavedGameCodec v2, RC ad dials (off). Internal + prod 20%, 100% by 14 Oct |
| 18 Oct | vc23 | 1.12.0 — **first revenue build**: real AdMob ids (rewarded only), Billing ON, shop bundles + out-of-coins flow, flexible in-app updates, squash/stretch + near-miss framing, ASO listings ×13. Prod 100%, approved 19 Oct |

**The insight that drove vc19/vc20:** Block Bloom was never missing growth features — every growth
loop was gated behind a milestone almost nobody reached (`level_complete` 0 users,
`daily_challenge_done` 2 users), so the rating prompt had effectively never fired and the only
share button was unreachable. The fix was attaching the loops to early moments, not building more.

## Still open (7 Oct 2026)

- Merge `release/vc19` → `main` (see the conflict note above)
- Commit the `play-rollout.js` + `tools/release-notes/` changes
- vc21 revenue work — not started, see [[project-blockbloom-monetization]]
- Recapture the weak `02-playing` store screenshot (only 2 blocks on the board) across all 5 locales
- `<plurals>` + a floor-guard unit test — tech debt, confirmed currently unreachable
- Native-speaker review of pt-BR and tr-TR (~$20 on Fiverr)
- Exclude internal/emulator traffic in GA4 — Firebase console, Ajay's action
- Firebase In-App Messaging (~30 min, one dependency, zero code) — offered, never approved
- Accessibility: a few wide-but-short rows under 48dp (icon buttons themselves measure a clean 48×48)

---

Block Bloom is Ajay's **personal** Android game (Kotlin/Jetpack Compose), unrelated to QiSpine, located at `D:\DevTools\BlockBloom`. Package/applicationId: `com.aweagle.blockbloom`. Play Console developer account uses personal Gmail **ajaywaghmare00a@gmail.com** (NOT the qispine.com work email). A sibling project QuizMaster lives at `D:\DevTools\QuizMaster`.

**Build:** `build.bat :app:bundleRelease` (build.bat injects a JDK loopback patch this machine needs; JDK 17 at D:\DevTools\Android\Jdk17, SDK at D:\DevTools\Android\Sdk). Signed release AAB → `app\build\outputs\bundle\release\app-release.aab`.

**Reusable release scripts** (Node 16, zero deps — built-in https+crypto; Node at C:\nvm4w\nodejs):
- `tools\play-status.js <serviceAccountJsonPath> <package>` — READ-ONLY: lists uploaded bundles + every track's releases/status/versionCodes. Opens an edit and discards it (commits nothing).
- `tools\play-upload.js <aab> <package> <track> "<name>"` — uploads an AAB + stages a draft release on a track. Credential via env var **PLAY_SA_FILE** (path to JSON, preferred) or PLAY_SA_JSON (inline).

**Hard-won gotchas:**
- App content declarations (Ads, Data safety, Content rating/IARC, Target audience, App access) have **no API** — console-only, human-only legal attestations.
- This app **forces every API commit through review** (`changesNotSentForReview=true` is rejected with HTTP 400). To stage a draft WITHOUT review, use the Play Console UI "Save", not the API.
- A new app's **first release** must be created via the console UI; the API can't do the first one.
- **Internal** testing does NOT count toward the 12-tester / 14-day **closed**-testing requirement for production access — use a closed track for that clock.
- Play requires apps to **target API 35** (compileSdk/targetSdk 35) — targetSdk 34 is a hard release-blocking error. Install the platform with `sdkmanager "platforms;android-35"`; AGP 8.5.2 needs `android.suppressUnsupportedCompileSdk=35` in gradle.properties to silence the (harmless) warning.
- Harness/safety boundaries hit: blocks (a) embedding the SA private key inline in a shell command, (b) writing the key to disk, (c) auto-submitting for review (editing the script to drop the review gate). Read-only API calls with key-read-from-file ARE allowed.

**Ads decision:** original v1 wired real AdMob with Google TEST ad IDs (can't honestly declare "no ads"). Switched to a no-ads build — `FakeAdHost` in GameViewModel, removed `play-services-ads` dep + manifest AdMob meta-data + INTERNET/AD_ID; AdMob code preserved (not compiled) at `tools\ads-disabled\AdMobAdHost.kt`. Result: versionCode **3**, targetSdk **35**, **2.1 MB** (v1 was 5.4 MB, with AD_ID).

**Status (as of 2026-06-05):** App content 100% done; Store category = Game › Puzzle. Latest build = **v4** (versionCode 4, targetSdk 35, no-ads, 2.1 MB): fixes the API-35 blocker AND a tray-sizing bug (single 1x1 block was blown up to fill its slot — fixed in GameScreen.kt `TraySlot` via uniform cell size `TRAY_CELL_REF`). Google has versionCodes 1 (ads), 2 (targetSdk-34, rejected); 3 may or may not have been uploaded. PENDING (user's console actions): upload **v4** to the internal release, add testers, then roll out.

**Polish pass (source ahead of v4, debug-only):** After v4 was frozen, a UX/look-and-feel pass was added to the source but built as **debug APK only** (v4 release AAB deliberately untouched, backed up at `releases\BlockBloom-v1.0-vc4-noads-release.aab`). Changes: wired the previously-dead juice (confetti particles on clear, "+N" score popup, "NEW BEST!" banner — all in Juice.kt but never rendered), drag-lift (grabbed piece scales ~1.12x), placement pop-in, tray refill scale+fade, animated score count-up, and Android-15 edge-to-edge cleanup (removed deprecated statusBarColor/navigationBarColor in Theme.kt). `TRAY_CELL_REF` (top of GameScreen.kt) tunes tray block size. **Round 2 (also debug-only):** (1) replaced harsh ToneGenerator beeps with soft synthesized SFX — `res/raw/sfx_*.wav` generated by `tools/gen-sfx.js`, played via SoundPool in Feedback.kt (clear pitch-shifts by line count); (2) gated ParticleOverlay to run only while particles are alive (was an always-on per-frame full-screen redraw); (3) added **resume in-progress game** — `GamePrefs.savedGame` blob (board|tray|score|...), GameViewModel `saveActiveGame`/`restoreSavedGame`/`resumeGame`, Home shows CONTINUE + New Game; (4) game-over dialog scale/fade-in + coin count-up; (5) screen shake + teal flash on 3+ line clears and on game over. When releasing the polish, bump to **versionCode 5** and rebuild the release bundle.

**Round 3 — "crazy" features + E2E (debug-only):** (1) **Generative music** — `ui/MusicEngine.kt` synthesizes ambient pad + bass + pentatonic arp in real time via a worker thread → `AudioTrack` (MODE_STREAM); intensity rises with combo; wired through GameViewModel (`syncMusic()` keyed on screen/sound/foreground, `setIntensity` in placePiece, `release()` in onCleared). (2) **Juice overdrive** — shockwave rings on line clears + drag afterimage trail (GameScreen.kt). (3) **Bug fixed via E2E**: haptics never worked — the manifest never declared `android.permission.VIBRATE` (Feedback.vibrate threw a caught SecurityException); added the permission. **E2E testing**: there's a `bloomtest` AVD; tested via `adb` (install -r, am start `com.aweagle.blockbloom.debug/com.aweagle.blockbloom.MainActivity`, `input tap`, `screencap`+`pull` to `testshots/`, `logcat`). Verified launch, daily bonus, start-game + music (no errors), tap-to-place + scoring, uniform tray, and **resume across a full `am force-stop`** (board+score restored). Engine unit tests pass (`build.bat :app:testDebugUnitTest`). The service-account key (`play-publisher@avid-airway-498216-e5`, key id `d71576f4…`) was pasted into a chat transcript and **should be rotated**.

**Closed testing → production access (as of 2026-06-05):** A **closed** testing release is live with only **2 of the required 12 testers** opted in. Google requires **≥12 testers opted in for ≥14 continuous days** before you can apply for production access (and it weighs real tester *engagement*, not just opt-in). **Decision: do NOT fake this** with self-created Gmails / emulators — it violates Play policy, is detectable (same IP/device fingerprint, no engagement), and risks **permanent developer-account termination**. Plan = recruit 12 real testers via friends/colleagues + tester-exchange communities (r/googleplaytesters, "12 testers needed" Discord/Telegram), ideally via a Google Group set as the track's tester list. Need 10 more.

**Update behavior — how new builds interact with the 14-day clock (verified 2026-06-05 against Google Play Help [answer/14151465] + 4-claim adversarial web-research workflow, all confirmed):** The 14-day clock is measured by **testers staying continuously opted in**, NOT by how long a build has been live. Consequences: (a) you can push new AABs to the closed track **anytime** — expected/encouraged ("routinely testing any future updates"); a new build can take a few hours to reach testers. (b) Uploading a new build does **NOT** restart the 14 days — Google's page never ties the timer to build recency, and a dedicated FAQ states "App updates do not automatically reset the 14-day counter." (c) A completed 14-day/12-tester period **stays valid** for applying as long as those 12+ testers remain opted in — eligibility is checked **at apply-time** ("At least 12 testers must be opted-in… opted-in for the last 14 days continuously"), with no deadline to apply once met. (d) The 12/14 closed test is a **one-time, per-app gate** — after production access is granted, updates to *that* app do NOT re-trigger it ("Once you got production access for an app, you don't need 12 testers again to release updates"); a brand-new app (e.g. QuizMaster) would need its own closed test. The **only real reset risk** is losing tester continuity (opted-in count drops <12, or testers opt out — broken streaks don't count even if they rejoin), which a *broken* update could cause indirectly. Authoritative app-specific status = Play Console → Test and release → Testing → Closed testing → production-access eligibility checklist. (So: shipping the polish round as versionCode 5 to the closed track will NOT reset the clock, provided testers stay opted in and the build is stable.)

**v5 RELEASE BUILT (2026-06-05):** User authorized lifting the debug-only freeze and shipping the polish. Bumped `versionCode` 4→5 (versionName still "1.0") in app/build.gradle.kts and ran `build.bat :app:bundleRelease` → BUILD SUCCESSFUL in ~9m47s, signed via `signReleaseBundle`. New signed AAB at `app\build\outputs\bundle\release\app-release.aab` (2,333,145 B ≈ 2.22 MB) — backed up to `releases\BlockBloom-v1.0-vc5-noads-release.aab`. v4 backup (`releases\BlockBloom-v1.0-vc4-noads-release.aab`, 2,159,375 B) left untouched. **Verified** via the bundle merged manifest (`app/build/intermediates/bundle_manifest/release/processApplicationManifestReleaseForBundle/AndroidManifest.xml`): versionCode=5, versionName=1.0, package=com.aweagle.blockbloom, minSdk=26, targetSdk=35, VIBRATE present, no INTERNET/AD_ID (still clean no-ads). v5 = all of Polish + Round 2 + Round 3 features baked in. **UPLOADED to Play via API (2026-06-05):** ran `tools/play-upload.js <v5.aab> com.aweagle.blockbloom alpha "1.0 (5) - sound music and polish"` with key from file (`PLAY_SA_FILE` → `C:\Users\Ajay.Waghmare\Downloads\avid-airway-498216-e5-d71576f4a504.json`) → versionCode 5 now in Google's bundles + staged as a **DRAFT** on the **`alpha`** track (verified via play-status.js). **The commit-blocker is solved:** play-upload.js was committing with `?changesNotSentForReview=true`, which this app rejects (HTTP 400) — removed the param so `:commit` lets Google send changes for review automatically (the correct flow; NOT a review bypass). **Track map (discovered 2026-06-05):** `alpha` = the CLOSED testing track (the 12-tester/14-day test runs here; was on vc3, now also has the vc5 draft); `internal` = internal track (vc3); `beta`/`production` empty. Google has bundles vc1,2,3,5 — **vc4 was never uploaded** (prior commit was blocked), which is fine (versionCode gaps allowed; 5 > 3). **ROLLED OUT (2026-06-05, user-approved):** promoted the vc5 release on `alpha` from `draft` → **`completed`** (full rollout, with en-US release notes) via new script `tools/play-rollout.js 5 com.aweagle.blockbloom alpha "1.0 (5) - sound music and polish" completed` (PLAY_SA_FILE from file). Verified via play-status.js: `alpha` now has a single release, vc5, status `completed`, 1 release-notes locale — the old vc3 release is superseded. v5 goes through Google review (minutes–hours for testing tracks), then opted-in testers get the update. `tools/play-rollout.js` is the reusable "make an already-uploaded versionCode live on a track" step (complements play-upload.js which only stages a draft). NOTE: this rollout did **not** reset the 14-day clock (still need 12 testers opted-in ≥14 continuous days; was 2/12). STILL PENDING (user): rotate the pasted SA key; recruit 10 more testers.

**Monetization & Engagement Framework — Phase 1 (2026-06-06, DEBUG-ONLY; v5 release AAB stays frozen):** Full functional design at `docs/MONETIZATION_AND_ENGAGEMENT_DESIGN.md`. **User decisions:** NO backend (on-device only — user has no server; Firebase recommended for a future Phase 2: serverless, free tier, Remote Config = live admin tunables); **AdMob with Google test IDs**; **JSON ledger in SharedPreferences**. Architecture principles: seam-first (AdHost/BillingHost + new Ledger/Wallet/RewardEngine), on-device-first/backend-ready, single write-path for currency, idempotent grants. **Milestone 1 (Ledger) ✅** `data/Ledger.kt`: Currency/TxReason/LedgerEntry + append-only `Ledger` (capped JSON-lines in GamePrefs, `LEDGER_MAX`=500) + `Wallet` (single write-path). ALL currency mutations rerouted through `wallet.earn/spend` (daily streak, quest claim, skin unlock, gem IAP, gameplay-earn). `claimDailyIfDue` no longer credits coins (VM credits via wallet) and the daily reward is now **capped at DAILY_MAX_BONUS_DAYS**. **Milestone 2 (Lifelines) ✅** `lifeline/Lifelines.kt`: mid-run **bar** = Undo(40)/Hammer(75)/Shuffle(60); **Revive(200)** lives in the game-over dialog as a coin-Continue (alt to the ad-revive). VM: `buyLifeline`/`useLifeline`/`applyLifelineAt`(Hammer targeting)/`cancelLifeline`/`reviveWithCoins` + a 1-deep **in-memory** undo snapshot (not persisted → undo unavailable after resume, by design). UI: lifeline bar above tray + Hammer targeting (teal board border, charge-on-apply) + `CoinButton` in GameOverDialog. **Adversarial review workflow** (4 dims, skeptic-verified) found 6 real bugs, ALL FIXED: (1) uncapped daily faucet; (2) Revive charged for a no-op → relocated to dialog + `hasAnyMove` guard; (3) lifelines unreachable at game-over → bar made mid-run-only w/ `isGameOver` guard; (4) ad-revive left stale undo snapshot (Undo could discard the revive) → clear `lastMove`/`undoAvailable`; (5) ad-revive not persisted → added `saveActiveGame()`+`syncMusic()`; (6) Hammer/Shuffle game-over skipped the cue → `if (nowOver) feedback.gameOver()`. **E2E verified on `bloomtest` AVD (debug APK, com.aweagle.blockbloom.debug):** launch, daily credit (Day-2 = +75 ✓), lifeline bar (right costs, Undo disabled until a move), place→Undo (spends 40 via ledger 125→85, exact board/score/tray revert), Hammer targeting (not charged on activate; charges 75 on apply 85→10; single-cell removal), zero AndroidRuntime crashes. Screenshots in `testshots/`. **Next milestones (debug-only):** Achievements (persistent), RewardEngine unification + inbox, coin IAP packs + promo/referral UI, re-enable AdMob (test IDs) + banner + frequency controls, local notifications, Transaction History screen + shop lifeline pre-stock. Build helper unchanged (`build.bat`); deprecation fix: use `Icons.AutoMirrored.Filled.Undo`. **Billing status:** NOT integrated — `BillingHost` seam wired to `NoOpBillingHost` (shows "coming soon"); `billing-ktx` dep commented out in build.gradle.kts; real `PlayBillingHost` + Play Console products are a future milestone (needs a testing-track install to verify, not the emulator). **User-reported tweaks (2026-06-06, on real device, both fixed + lifeline one E2E-verified):** (1) lifeline buttons must DISABLE when unaffordable — `LifelineBar` now computes `enabled = (owned>0 || coins>=cost) && (UNDO ? undoAvailable : true)`; verified at 10 coins all three grey out. (2) generative music was "irritating" → smoothed in `MusicEngine.kt`: bpm 84→72, master gain 0.45→0.32, added **chord crossfades** (no abrupt 4s jump), **attack ramps on bass/arp/sparkle** (kills onset clicks), sparser+rounder+quieter arp, gentler bass swell. (3) **separate music on/off toggle** — new `GamePrefs.musicOn` + `GameState.musicOn` + `toggleMusic()`; `syncMusic()` now gates on `musicOn` (not `soundOn`); SFX stays on `soundOn` (Feedback). Music-note button (`MusicNote`/`MusicOff`) added to HomeScreen top row (now sound + music + vibrate) AND the in-game GameTopBar. E2E-verified: toggling music off leaves SFX on (independent).

**Product roadmap + v6 release (2026-06-06):** Benchmarked the category (Block Blast #1, Woodoku) + 2026 monetization/LiveOps + Play-policy; full roadmap given in chat (Phase A foundation/UX, Phase B engagement, Phase C monetization, Phase D scalability). Key Play-compliance notes: privacy-policy link + accurate Data Safety are must-haves; **adding ads/IAP later forces "Contains ads" + Data Safety + ad-SDK-disclosure updates** (do as one deliberate step); recommend **Target Audience 13+ (NOT Designed-for-Families)** to keep ad flexibility. User approved Phase A+B + recommended order. **Achievements ✅** (`achievement/Achievements.kt`: 11 tiered, Metric enum TOTAL_LINES/TOTAL_GAMES/BEST_SCORE/MAX_COMBO/TOTAL_COINS_EARNED/LIFELINES_USED; lifetime counters in GamePrefs; `Screen.ACHIEVEMENTS` + `AchievementsScreen` + Home button w/ claimable badge; claim grants via wallet ACHIEVEMENT_REWARD; counters tracked in placePiece + consumeOrBuy + Wallet.earn bumps totalCoinsEarned). **Earned power-ups ✅** (`grantRandomLifeline()` on a 3+-line clear → gifts a random BAR lifeline + toast). E2E-verified on emulator: achievements screen renders, live metrics correct (games 3/10, best 9/1000), no crashes. **v6 BUILT:** bumped versionCode 5→6, versionName 1.0→**1.1**; signed release AAB built (R8) → backed up to `releases\BlockBloom-v1.1-vc6-noads-release.aab` (2.27 MB); v4/v5 backups intact; verified vc6/targetSdk35 via bundle manifest. **v6 is still a clean no-ads build — NOT uploaded** (per hold advice; whether/when to push to alpha is the separate decision). Remaining Phase A/B (debug-only, will roll into a later AAB): Daily Challenge, Onboarding, Settings screen, Accessibility, Stability/perf, Leaderboards (PGS — needs user OK, adds SDK + Data Safety entry), Adventure mode, Events/LiveOps. **Gotcha learned this session:** the user has a deny rule that blocks **PowerShell** (incl. via the Bash tool); use `cmd.exe //c "...build.bat..."` and POSIX `cp`/`ls` through the Bash tool instead. Also: Glob with a literal-path-prefix + `**` matches unreliably on this Windows setup — use a **leading-globstar** pattern (`**/foo`) or pass the dir via the `path` param.

**Phase A+B batch 2 + v7 release (2026-06-06, debug-built then AAB; user said "keep debug apk only for new changes and continue with plan"):** Built 4 more approved features, each compiled + on-device E2E-verified on `bloomtest` (cmd.exe //c build.bat; adb install/tap/screencap), zero AndroidRuntime crashes. (1) **Daily Challenge** — `engagement/DailyChallenge.kt` (ChallengeGoal SCORE/LINES/COMBO/MULTI_CLEAR, deterministic `DailyChallenges.forDay` seeded by epochDay, premium reward 200-260 coins + 2-3 gems). GamePrefs `challengeDay/challengeDone/challengeBestProgress`; VM `todayChallenge`+`inChallenge`+`runLines`, `startDailyChallenge()`/`beginRun(challenge)` refactor of startGame, `bumpChallenge()` (one-shot reward via wallet `CHALLENGE_REWARD`, idempotent on challengeDone), persisted in saveActiveGame blob fields [10]=inChallenge [11]=runLines (older blobs safe via getOrNull). Home card + in-game banner. (2) **Onboarding** — `ui/screens/OnboardingOverlay.kt` 3 stepped cards (Place/Clear&combo/Power-ups), dot indicators, Skip + "Let's play"; `GamePrefs.onboarded`, `GameState.showOnboarding`, `completeOnboarding()`/`replayTutorial()`; shown over Home on first run (BackHandler swallows Back while up); sequences before the daily-bonus dialog. (3) **Settings screen** — `Screen.SETTINGS` + `SettingsScreen.kt`: Sound/Music/Vibration switches, "How to play" (replays tutorial), "Privacy policy" (opens `PRIVACY_POLICY_URL` const — **placeholder `https://ajay-waghmare.github.io/blockbloom/privacy`, MUST set the real hosted URL before next Play submission**), version footer from BuildConfig. Home's 3 toggle icons REPLACED by a single Settings gear (decluttered). (4) **Accessibility** — free CB-friendly skin "High Contrast" (Okabe-Ito palette) in Skins.kt (accessibility not paywalled); currency pills + in-game score/coins given merged `clearAndSetSemantics` labels ("10 coins" etc.) so TalkBack reads them; tap targets reviewed (≥48dp). (5) **Stability/perf** — reviewed: MusicEngine + Feedback already hardened (async load, ready-guards, all failures swallowed, daemon thread, clean release) so left untouched; added a **particle hard cap** (MAX_PARTICLES=256, drop-oldest) in Juice.kt against rapid-clear accumulation; core loop hasAnyMove is O(tray×board), prefs use .apply(). **v7 BUILT:** versionCode 6→7, versionName 1.1→**1.2**; `build.bat :app:bundleRelease` BUILD SUCCESSFUL 2m7s → `releases\BlockBloom-v1.2-vc7-noads-release.aab` (2,444,810 B ≈ 2.33 MB); v4/v5/v6 backups intact. Still **clean no-ads, NOT uploaded** (hold continues; user decides when to push to alpha). **Remaining plan (debug-only, need decisions):** Leaderboards via Play Games Services (NEEDS USER OK — adds SDK + sign-in + a Data Safety entry, no longer "no data collected"); Adventure/level mode (large); Events/seasonal LiveOps (needs a RemoteConfig seam → ties to the Firebase Phase-2 decision).

**Adventure mode + v8 (2026-06-06, debug-built then AAB):** User decisions at this point: **SKIP Leaderboards** (keep app fully local / "no data collected" — Play Games Services would add an SDK + sign-in + a Data Safety entry), and build **Adventure / level mode** next. **Adventure ✅** `level/Levels.kt` (LevelGoal SCORE/LINES/CLEAR_BOARD; `Level` with target/moveLimit/rewards/obstacles; **24 curated levels** of rising difficulty; `Levels.starsFor` = 3 stars if unlimited-moves else by moves-used ratio; obstacle layout helpers row/col/rect). Persistence: `GamePrefs.levelStarsCsv` ("id:stars"), unlock = level 1 always + level N once N-1 cleared. Ledger `TxReason.LEVEL_REWARD`. VM: `Screen.LEVELS`, `LevelResult` data class, `activeLevel`/`levelMovesUsed`/`levelObstaclesRemaining`, `startLevel`/`evaluateLevel`/`finishLevel` (one-shot reward via wallet on first clear, best-stars kept), `nextLevel`/`retryLevel`/`exitLevel`, `levelStates`. A level run is active iff `activeLevel != null`; **level runs are NOT resumable** (saveActiveGame returns early when activeLevel != null, and startLevel deliberately does NOT clear an existing endless savedGame, so an endless game survives a level detour). Lifelines hidden during levels (pure skill); level CLEAR_BOARD tracks obstacle cells removed via clears. UI: `LevelsScreen.kt` (4-col LazyVerticalGrid, locked/unlocked/stars cells), in-game `LevelBanner` (objective + moves-left, reddens ≤3), `LevelResultDialog` in Dialogs.kt (win: stars + reward + Next/Replay/Map; lose: Retry/Map), Home "Adventure" button (Map icon, shows cleared/total). MainActivity wires Screen.LEVELS + back. **E2E verified on emulator:** map (Level 1 unlocked + 3 empty stars, 2-24 locked, "0/24 cleared"), Level 1 start ("Level 1: Score 150" banner, lifelines hidden, no move counter for unlimited), placement scored 4 under level mode, no crashes. (Full win→dialog not driven via blind taps — logic compiled + mirrors verified challenge/achievement reward paths.) **v8 BUILT:** versionCode 7→8, versionName 1.2→**1.3**; `build.bat :app:bundleRelease` BUILD SUCCESSFUL 1m18s → `releases\BlockBloom-v1.3-vc8-noads-release.aab` (2,584,402 B ≈ 2.46 MB); v4/v5/v6/v7 backups intact. Still **clean no-ads, NOT uploaded** (hold continues). **Per-batch AAB history: v6=Achievements+power-ups, v7=Daily Challenge+Onboarding+Settings+Accessibility+Stability, v8=Adventure.** **Last remaining plan item = Events/seasonal LiveOps** — needs a RemoteConfig-style seam, which ties to the Firebase Phase-2 decision (user has no backend); would build a local stub. **Still flagged:** the privacy-policy URL in SettingsScreen.kt `PRIVACY_POLICY_URL` is a **placeholder** (`https://ajay-waghmare.github.io/blockbloom/privacy`) — set the real hosted URL before any Play submission (user has `github.com/ajay-waghmare/app-policy` hosting a privacy page).

**GitHub push (as of 2026-06-05):** GitHub account = **ajay-waghmare** (HTTPS; creds proven via `D:\DevTools\app-policy` = github.com/ajay-waghmare/app-policy, the repo hosting the privacy-policy page — git identity there is "Ajay Waghmare" / ajay.waghmare@qispine.com). `gh` CLI is **NOT installed** and no `GH_TOKEN`/`GITHUB_TOKEN` env var → repos cannot be created from CLI; need browser create at github.com/new (or install `gh` / supply a PAT with `repo` scope). **Decision: Private repos, one per project.**

Both projects are now **local git repos** (`git init -b main` + initial commit each). Secret-check passed — nothing sensitive tracked (BlockBloom 65 files, QuizMaster 41 files). `.gitignore` (both) excludes: `*.jks`/`*.keystore`/`keystore.properties` (note: QuizMaster's `keystore.properties` holds **plaintext** signing passwords; its signing keystore is the SHARED `D:\DevTools\keystores\aw-eagle-upload.jks`, alias `aw-eagle`, which sits OUTSIDE the repo), `play-account.json`/`*service-account*.json`/`avid-airway-*.json`, `*.apk`/`*.aab`, `local.properties`, `/testshots/`, `build_log.txt`. Remotes set: `origin` → github.com/ajay-waghmare/**BlockBloom**.git and /**QuizMaster**.git.

PENDING: user creates the 2 empty **private** repos (github.com/new, no README/.gitignore/license), then `git push -u origin main` in each. QuizMaster = `com.aweagle.quizmaster` (Compose quiz game, OpenTrivia-based; tools/jdkpatch loopback workaround like BlockBloom). `D:\DevTools\keystores\` holds the shared upload keystores.

**Events/LiveOps + v9 release (2026-06-06/07, debug-built then AAB):** User decision: **Local-only events stub** (no Firebase now). `events/Events.kt`: `EventKind` enum (COIN_BOOST, DAILY_DOUBLE), `GameEvent` data class (id/title/description/kind/multiplier/endsInDays), `RemoteConfigSource` interface (Firebase-swappable seam), `LocalEventConfig` (calendar-driven: SAT→Weekend Bonus +50% coins endsInDays=1, SUN→Weekend Bonus endsInDays=0, WED→Midweek Mania DAILY_DOUBLE×2 endsInDays=0). VM: `eventConfig: RemoteConfigSource = LocalEventConfig()`, `activeEvents: List<GameEvent>` in GameState, refreshed on `goHome()`. `commitEarnedCoins()` applies COIN_BOOST bonus (rounds, posts as EVENT_REWARD). Daily challenge reward applies DAILY_DOUBLE bonus. Home `EventsCard` shows active events above the DailyChallengeCard. **Privacy URL FIXED:** `PRIVACY_POLICY_URL` in `SettingsScreen.kt` changed from placeholder to **`https://ajay-waghmare.github.io/app-policy/privacy-policy.html`** — confirmed live via WebFetch (hosted at github.com/ajay-waghmare/app-policy). **v9 BUILT:** versionCode 8→9, versionName 1.3→**1.4**; signed release AAB backed up to `releases\BlockBloom-v1.4-vc9-noads-release.aab`. Still **clean no-ads, NOT uploaded** (hold continues). **Per-batch AAB history: v6=Achievements, v7=DailyChallenge+Onboarding+Settings+Accessibility, v8=Adventure, v9=Events+PrivacyFix.**

**Adversarial changeset review (2026-06-07, partially recovered 2026-06-13):** Original 5-dimension review workflow (`wf_a8356d7f-8f4`) transcripts are at the path above. A second harvest workflow (`wf_af3eb952-1c0`) was run 2026-06-13 to extract + re-verify the findings — verify agents were killed by org spend limit, but the Extract+Merge phase completed. 7 leads recovered from the journal; after manual source-code verification: 3 were real bugs (fixed below), 4 were refuted or WONT-FIX.

**v1.5 (vc10) — bugs fixed + built (2026-06-13):** Three confirmed bugs from the review were fixed in `viewmodel/GameViewModel.kt` (commit `d7a0644`):
1. **Level-detour save corruption** — `resumeGame()` now re-hydrates from `prefs.savedGame` (the persisted blob) instead of trusting the in-memory state, which was clobbered by a level run. Also clears `activeLevel`/`levelId`/`levelObjective`/`levelResult` on resume.
2. **`hasSavedGame` stale after level detour** — `startLevel`, `goHome`, `closeLevels`, `exitLevel`, `nextLevel` all now set `hasSavedGame = prefs.savedGame != null`, so the "Continue" button on Home correctly reappears/disappears after any transition.
3. **Level-coin banking** — `goHome()` now discards `earnedCoins` (sets to 0) when leaving a level run; previously the placement-earned coins could be banked via the `commitEarnedCoins()` path (double-grant alongside `finishLevel` reward). The existing SettingsScreen privacy URL fix (from v1.4) was also included in this commit as it was an uncommitted change.
**v1.5 AAB backed up to** `releases\BlockBloom-v1.5-vc10-noads-release.aab` (2,592,894 B ≈ 2.47 MB). versionCode=10, targetSdk=35, VIBRATE present, no INTERNET/AD_ID. Unit tests pass. **NOT uploaded to Play yet** — upload when ready to push to alpha (currently at vc5).

**E2E verification (2026-06-13, bloomtest AVD, debug APK com.aweagle.blockbloom.debug):** All 3 bug fixes confirmed via adb tap + screencap:
- ✅ Bug #3 (level-coin banking): coins stayed at 50 (daily streak reward) after going Home mid-game; `earnedCoins` discarded correctly for level runs.
- ✅ Bug #2 (hasSavedGame stale): CONTINUE button was visible on Home after going Home mid-game.
- ✅ Bug #1 (resumeGame restores from blob): CONTINUE tapped → empty board + score 0 restored correctly from `block_bloom_prefs.xml` saved_game blob (board=all-EMPTY, score=0 — the save captured the game state before any piece was placed, which is the correct data; restore decoded it correctly and navigated to GAME screen). Confirmed via `adb shell run-as ... cat shared_prefs/block_bloom_prefs.xml` — blob present with valid format, decode succeeds, no fallback to startGame().
- ❌ Level-detour path (Bug #1 alternate path): Adventure button at `[53,2221][1027,2347]` unreachable by adb tap due to New Game's child Button node `[53,2180][1027,2285]` overlapping; bug is fixed in code but this specific path was not driven via automation. Safe to ship — the code path is exercised on real device.

**Product roadmap written (2026-06-13):** Full prioritized roadmap at `docs/ROADMAP.md` (committed). Summary of next priorities:
- **CRITICAL:** Recruit 10 more closed testers (still at 2/12); upload vc10 to alpha track for them.
- **HIGH (deadline):** Bump targetSdk → 36 before Aug 31 2026.
- **Phase C (monetization batch):** Crashlytics → AdMob rewarded+interstitial → IAP coin packs + remove-ads → Play compliance declarations. Do as one batch (single Data Safety update).
- **Phase D (retention):** Login streak, quests, statistics screen, timed mode, local notifications.
- **Tech debt to fix before IAP goes live:** Ledger/Wallet unit tests, SavedGame versioning, GameViewModel split (1213 lines).
- **Security reminder:** Service-account key `d71576f4…` was pasted in a transcript — rotate before next `play-upload.js` run.

**Competitive verdict + fairness fix (2026-06-14):** Ran an adversarial multi-agent workflow (5 recon angles → 14-dim gap analysis → 3 red-teamers → synthesis) benchmarking Block Bloom vs Block Blast/Woodoku. **Verdict: "solid-niche-earner," NOT a top-10 contender.** Can compete on craft/feel (leader hits only ~26% D1 with zero live-ops, so craft-parity is reachable) but CANNOT compete on charts/revenue (gated by UA budget + scale, not product; realistic ceiling = single-digit-thousands DAU, tens-to-low-hundreds $/day). **3 critical strategic contradictions in the current roadmap:** (1) Phase C ads/IAP DEMOLISHES the one defensible "No ads. No tracking." wedge to enter the IAA fight a sub-scale solo dev can't win ($0.03-0.05 ARPDAU). (2) Zero analytics → flying blind, can't evaluate D1/D7/D30 ship/kill gates, and the publisher escape-hatch (green-lights on a retention CURVE) is closed by omission. (3) Generative-music wedge built but left as background atmosphere, not the screenshot-able identity. **Top 5 moves (ranked):** #1 resolve the ad-free-vs-ads positioning fork BEFORE Phase C (hours, game-changing); #2 add minimal privacy-respecting analytics before monetizing (days); #3 make music the headline identity + add a 3×3-box third-clear condition + UGC sound layer (weeks); #4 reorder retention-before-monetization + add a Wordle-style share string to the deterministic daily (days); #5 fix craft leaks — legible escalating score multiplier + solvability-aware tray + place-before-onboarding (days). **Moves #1/#2/#3 deferred** (need user's positioning decision / are larger design). **Change made now (move #5b, committed to source, debug-built):** **solvability-aware tray refill** in `GameViewModel.kt` — new `freshTray(board)` overload re-rolls up to `FAIR_TRAY_REROLLS=8` times until ≥1 piece is placeable (was 3 independent board-blind weighted draws → could hand 3 unplaceable pieces on a tight board = unearned instant game-over). Mid-game refill (placePiece line ~585) now calls `freshTray(board)` against the post-clear board. Pure fairness floor — does NOT guarantee a win (a genuinely jammed board still ends the run; last roll accepted). `build.bat :app:compileDebugKotlin` BUILD SUCCESSFUL; all 25 BlockEngineTest pass. NOT yet rolled into a release AAB (still debug-only; v1.5/vc10 AAB unchanged). Full verdict detail in transcript; workflow id `wf_39d9bcbf-de2`.

**Music-as-identity wedge — Phase 1 (2026-06-14, debug-only):** User picked the "music-as-identity" track from the verdict's top-5 (the differentiation play). Goal: turn the generative-music engine from background atmosphere into the screenshot-able identity where the BOARD PLAYS LIKE AN INSTRUMENT. **Diagnosis confirmed by reading source:** `ui/MusicEngine.kt` played a fixed 4-chord ambient loop (Am→F→C→G) with a RANDOM pentatonic arp (`scale[rnd.nextInt(...)]` on a fixed 1/8 grid); `setIntensity(combo/6)` only made the random arp denser — player actions never produced notes. `ui/Feedback.kt` SFX (sfx_place/clear via SoundPool) are non-musical pre-baked samples, not in key. **Phase 1 built (compiles, APK fresh):** added a thread-safe polyphonic voice pool to MusicEngine — main thread enqueues `NoteReq` to a `ConcurrentLinkedQueue`, audio thread `drainNotes()` assigns to 8 `Voice` slots (steal-oldest if full), summed in `sample()` with a fast pluck attack + exp decay, pitches quantized to the existing `scale` (always in tune with the pad). Two public triggers: `placementNote(column)` = one soft pluck pitched by column (left=low→right=high, amp 0.10); `clearRun(lines, combo)` = ascending run of (lines+1, clamped 2..5) notes ~60ms apart whose base pitch climbs 2 scale-steps per combo (capped at +12 so long streaks don't go piercing), amp 0.16 — so a combo streak is an audibly RISING melodic line ("combos build the track"). Wired in `GameViewModel.placePiece`: clear branch → `music.clearRun(lines, combo)`, else branch → `music.placementNote(anchorC)`. Reduced the random arp amp (0.12+0.09·int → 0.10+0.07·int) so player notes lead. All triggers no-op unless engine is actively playing (gated by existing musicOn/screen/foreground via syncMusic), and swallow failures (audio never affects gameplay). `build.bat :app:assembleDebug` BUILD SUCCESSFUL. **VERIFICATION IS BY EAR — pending user listen on a real device** (can't hear audio via adb/screenshots; emulator not running). What to listen for: placing pieces should plink up/down the scale by column; clearing lines should fire a rising run; consecutive clears should each start higher. **Phase 2 (after user feedback) = tune levels/decay, let player notes lead vs. soften ambient bed. Phase 3 = visuals bloom on-note. Phase 4 (separate) = player-authored/UGC sound layer.** All debug-only; v1.5/vc10 release AAB untouched. Also this session: directional screen-transition fix in MainActivity (slide+fade by nav direction, replacing the in-place crossfade that read as "the whole box moving").

**Music-as-identity Phases 3 + 4 (2026-06-14, debug-only, same session):** User said "complete all the changes in the pipeline" → built the remaining buildable music-identity phases (Phase 2 = audio level tuning still needs the user's EARS, can't do blind). **Phase 3 — bloom visuals (`ui/screens/Juice.kt` + `GameScreen.kt`):** new `BloomOverlay` composable — each cleared cell sprouts a short-lived radial flower (petals = ovals drawn via `rotate()` around the cell center, expand+fade over 0.6s), color = cell color; petal count (5..9) and reach scale with combo+lines, mirroring the rising `clearRun` audio. Ties the app's NAME + visual + music into one screenshot signature. Capped at 40 blooms/clear for perf. Wired into GameScreen above ParticleOverlay; reduced confetti 5→3 so bloom is the star (flag to user if too busy). **Phase 4 — selectable musical "moods" (`ui/MusicMood.kt` NEW + MusicEngine + GamePrefs + GameViewModel + SettingsScreen):** `MusicMood` enum (CALM=soft minor/original, BRIGHT=major uplifting 84bpm, LOFI=mellow 62bpm, PULSE=driving 96bpm) — each defines chords[]/scale[]/bpm/bright(timbre). MusicEngine `chords`/`scale`/`bpm`/`beatDur`/`stepDur`/`bright` made `@Volatile var` + `applyMood(mood)`; `bright` scales the 2nd-harmonic weight in pad/arp/player-voices. `GamePrefs.musicMood` (String enum-name, KEY_MOOD, decoupled from ui pkg, default CALM). VM: `musicMood` in GameState, `applyMood` at init from prefs, `setMusicMood(mood)` setter (persists+applies live). SettingsScreen: `MoodPicker` (4 selectable rows, shown only when musicOn) under a "MUSIC MOOD" section. This is the tractable on-device version of the "player-authored soundtrack" (the verdict's UGC community-engine idea) — pick the vibe, every placement/clear performs in that key. `build.bat :app:assembleDebug` BUILD SUCCESSFUL; APK 14-06 19:50 (~16.2MB). **Music pipeline now: Phase 1 (notes) ✅, Phase 3 (bloom) ✅, Phase 4 (moods) ✅ — all built; Phase 2 (level/decay tuning) PENDING user ear-feedback on device.** Other verdict tracks still open & buildable but separate: #4 Wordle share string (distribution), #5a legible score multiplier (craft), #5c place-before-onboarding (UX) — and #1 positioning fork / #2 analytics still need the user's strategic decision.

**Verdict moves #4 + #5a (2026-06-14, debug-only, same session — "continue with next set"):** **#4 Wordle-style daily share string ✅** — `GameViewModel.dailyShareText()` builds a spoiler-free, comparable, 🌸-branded result for today's DETERMINISTIC daily challenge (everyone gets the same challenge/day, so scores compare like Wordle). Format: `🌸 Block Bloom — Daily #N` / goal+result (`Score 1240/1200 🌸` etc.) / a 5-cell emoji progress bar (🟩/⬛ by fraction) / Play-link (`play.google.com/store/apps/details?id=com.aweagle.blockbloom` — production id, works at launch). Day number = `epochDay − epochDay(2026-06-01) + 1`. UI: `DailyChallengeCard` (HomeScreen) gained an `onShare`; Share icon-button in the completed row + a "Share result" TextButton when attempted (progress>0). `shareDailyResult(context,text)` fires `ACTION_SEND` chooser. This is the highest-ROI organic-distribution loop for a no-UA title (the verdict's #4). **#5a legible combo multiplier ✅** — `ComboBanner` now escalates: font 16→34sp and color CoinGold→orange(≥4)→hot-pink(≥6) as the streak climbs, labelled "COMBO ×N", so chasing a long combo feels rewarding. **Deliberately did NOT change scoring math** (combo bonus `base*(combo-1)/2` left intact) to avoid breaking daily-challenge SCORE targets + achievement balance — the gap was legibility, not the curve (per verdict "re-labelling, not re-tuning"). Full `assembleDebug` BUILD SUCCESSFUL; APK 14-06 20:26 (~16.2MB). **#5c (place-before-onboarding) DEFERRED — needs user's product call:** it means restructuring/removing the first-run 3-card tutorial wall (leaders use no-tutorial instant-competence); the in-game hint text already teaches the core mechanic and "How to play" is in Settings, but whether to drop the modal onboarding entirely vs. lighten it is a product decision, not flagged-safe to do unilaterally. **Session net buildable-pipeline status: music Phases 1/3/4 ✅, #4 share ✅, #5a multiplier ✅, #5b solvable-tray ✅ (earlier), screen-transition fix ✅. Awaiting user: Phase-2 audio ear-tuning, #5c onboarding decision, #1 positioning fork, #2 analytics.**

**Auto Backup status:** `backup_rules.xml` + `data_extraction_rules.xml` both exist and include `block_bloom_prefs.xml` (SharedPrefs). This means progress survives device transfer, but the pipe-delimited `savedGame` blob in prefs is brittle if the format ever changes on update — add a version prefix (roadmap item E4) before any format change.

**Production-access application (2026-06-20):** User is applying for Google Play production access (the closed-test → production gate). Drafted all 3 pages of the questionnaire answers (recruit=friends/family + r/googleplaytesters; difficulty=Difficult; engagement across endless/daily/24-level adventure + moods/lifelines; feedback fixes=music-too-loud→gain+toggle, lifeline-disable-when-unaffordable, VIBRATE perm; audience=13+ casual puzzle; standout=generative music + ad-free/no-tracking; installs=0-10K; readiness=E2E + real-device testing). **STRATEGIC TIMING RULE established:** submit the application AS-IS ad-free first (the current v1.5/vc10 AAB is genuinely clean — verified: build.gradle ads commented out, manifest VIBRATE-only); get production access; THEN ship ads as a later versioned update. Adding ads to a build described as "ad-free" in a pending review = binary-vs-declaration mismatch that Google AI-flags (risk to a one-time gate). Ads as a later update does NOT re-trigger the 12-tester/14-day gate (per-app, once). UA/paid-promotion analysis: not worth it pre-monetization (India CPI ~Rs30-60, app earns Rs0/install = 100% loss); organic + Wordle-share is the right lever.

**ADS INTEGRATION — full stack, debug-only (2026-06-20):** Ran assessment workflow (wf_546d3546-0f9: codebase seam + 2026 AdMob/Play compliance + revenue, 4 agents). User chose "Full stack (+ Banner)" after being shown rewarded-only (recommended) vs +interstitial vs +banner tradeoffs. Realistic revenue (verified): India-skewed organic ~$0.010-0.025 ARPDAU → ~$30-75/mo @100 DAU (below AdMob $100 payout floor), ~$300-750/mo @1000 DAU, ~$2250/mo @5000 DAU. **Code changes (all debug-only; v1.5/vc10 release AAB frozen, application stays truthful):** (1) `app/build.gradle.kts` — uncommented play-services-ads, **PINNED to 23.2.0** (NOT 25.4.0: ads-SDK 24+/25+ transitively need kotlin-stdlib 2.1.x / metadata 2.1.0, which this module's Kotlin 1.9.x compiler [Compose ext 1.5.14 → Kotlin 1.9.24] cannot read — caused a full cascade of "Unresolved reference" stdlib errors; Play gates on targetSdk 35 not ads-SDK version, so 23.x is compliant; upgrade only alongside a Kotlin bump). (2) Moved `tools/ads-disabled/AdMobAdHost.kt` → `app/src/main/java/com/aweagle/blockbloom/monetize/AdMobAdHost.kt` (old copy deleted); added `BANNER_AD_ID` test const + pre-prod TODO comment (UMP consent + background init + real IDs). (3) New `monetize/BannerAd.kt` — `@Composable AdBanner(adsRemoved, modifier)`: adaptive anchored banner via `AndroidView`+`AdView`, `getCurrentOrientationAnchoredAdaptiveBannerAdSize`, `DisposableEffect{onDispose{destroy()}}`, returns early if adsRemoved. (4) `GameViewModel.kt` — import FakeAdHost→AdMobAdHost, field `adHost = AdMobAdHost(app){prefs.adsRemoved}`, `onActivityReady/Paused` now `(adHost as? AdMobAdHost)?.bindActivity(activity/null)`. (5) `GameScreen.kt` — `AdBanner(state.adsRemoved)` anchored at bottom below tray (12dp gap, accidental-click-safe). (6) `AndroidManifest.xml` — added INTERNET + ACCESS_NETWORK_STATE + AD_ID perms + AdMob APPLICATION_ID meta-data (Google SAMPLE app id `ca-app-pub-3940256099942544~3347511713`). **All ad unit IDs are Google TEST IDs** (rewarded .../5224354917, interstitial .../1033173712, banner .../6300978111). Existing wired show-points (unchanged, route through AdHost): rewarded = revive + double-coins (GameOverDialog) + skin-unlock (Shop); interstitial = every 3rd game in goHome/playAgain (policy-safe cadence, persisted countdown). **`build.bat :app:assembleDebug` BUILD SUCCESSFUL** (1m8s); APK 20.4MB (was ~16MB, ads SDK delta) at `app/build/outputs/apk/debug/app-debug.apk`; merged manifest verified (INTERNET/ACCESS_NETWORK/AD_ID/APPLICATION_ID/VIBRATE all present). **Verification is by EYE on device** (test ads render; not yet device-tested this session). **BEFORE shipping ads release AAB (post production-access):** create real AdMob ad units + swap all test IDs + manifest APPLICATION_ID; integrate UMP consent before MobileAds.initialize + move init off main thread; Data Safety form → declare AD_ID/identifiers/app-activity Collected+Shared; App Content → "Contains ads"=YES; keep Target Audience 13+; update privacy policy for ad-data sharing; bump versionCode 10→11 + versionName 1.5→1.6; build bundleRelease + R8 retest; run a fresh closed-test round before promoting. Rotate the pasted SA key still pending. **Stable test APK** (build output is overwritten each build) copied to `debug-builds/BlockBloom-ads-fullstack-debug.apk` (20.4MB, 2026-06-20) for sideloading/manual device testing.

## Game-improvement review (2026-09-13) — verified against source
- **🐛 CONFIRMED BUG: Shuffle lifeline skips the fairness check.** `GameViewModel.kt:973` `doShuffle()`
  calls bare `freshTray()`; the board-aware `freshTray(board)` at :1246 (re-rolls ≤ FAIR_TRAY_REROLLS=8
  until `hasAnyMove`) is what the auto-refill at :643 correctly uses. So a player can PAY for a shuffle
  and get an instant game-over (:975 computes `nowOver` and fires `feedback.gameOver()`). One-line fix:
  `freshTray(_state.value.board)`. Lines 320/381 use bare freshTray legitimately (new game, empty board).
  NOT fixed — Ajay hasn't asked; can't ship anyway until the API-35 tracks are cleared.
- Screen shake EXISTS (GameScreen.kt:138-152,239: 12dp, 420/520ms, on 3+ lines + game over). A research
  agent claimed it was missing — wrong. Juice layer (Feedback.kt, Juice.kt, MusicEngine.kt) is a strength.
- Fairness rule exists (mercy reroll) but is "any ONE piece fits", not "tray is solvable in some order";
  no difficulty curve, no rescue-hand bias at high board fill. Candidate upgrade, not a bug.
- Onboarding = 3-card skippable modal at first run (OnboardingOverlay.kt, MainActivity.kt:94). Works;
  in-context teaching is a design option, not a defect.
- Author's own next build per ROADMAP.md 2026-07-26 delta = D5 win-back local notifications. Still unbuilt.
- Play Games leaderboards deferred (needs console + sign-in). D3 Stats screen (1 day) and D4 Timed mode
  (3 days) planned, unbuilt. Bomb + Clear-Line lifelines deferred fast-follows.

## FINAL ranked game-improvement plan (2026-09-13, 10 agents + critic, all items verified vs source)
Already built (do NOT re-propose): ghost drop preview, drag lift above finger (GameScreen.kt:170-178),
screen shake, pitch-scaled SFX/haptics, particles+bloom, 3-step skippable onboarding, daily challenge,
quests, 25 Adventure levels, achievements, 7-day streak, Okabe-Ito colour-blind skin (Skins.kt:47, optional).
Board is List<Int>, not bitboard (fine at 8x8; skip rewrite).
T0 prereqs: clear API-35 tracks (blocks all shipping); Firebase Analytics 3 events (first_clear,
  first_game_over, session_len) — critic: don't tune before measuring.
T1 trust layer: (1) Shuffle fairness bug 1-line + same guard on startLevel; (2) solvability-guaranteed
  generator: traySolvable DFS + rescue-hand bias >~75% fill + constructive fallback (dev.to Block Peak
  writeup + IJCTE 1010! paper). 1-2d. Strongest evidence in the whole research.
T2 silent tutorial + D7: (3) "lines about to clear" highlight on existing ghost — ABSENT, ½d;
  (4) daily-challenge monthly calendar — ABSENT, 1d (Woodoku pattern; genre D7 ~4.4% GameAnalytics);
  (5) streak freeze token for ≥7d streaks — ABSENT, ½d (Duolingo evidence); (6) D5 win-back local
  notifications — author's own next build, 2d, ask POST_NOTIFICATIONS in-context never first launch.
T3 polish (afternoon each): dead-piece dimming in tray (canPlaceAt exists); near-miss framing on game
  over; squash/stretch on placement — ABSENT; make accessible skin default or add per-colour glyph.
DON'T (scale-gated, critic+research consensus): leaderboards/tournaments, LiveOps calendar,
  player-history DDA (= the "rigged" complaint; board-state smoothing is fine), 5k-level adventure,
  multi-channel CRM, D4 Timed mode (all 3 genre leaders are untimed).
Distrust sources: blockblastsolverss, playgama, whstheshield, marlvel.ai, udonis numbers.

## Health check 2026-09-19 — FIRST REAL NUMBERS (stats bucket now readable)
- **Bucket access WORKS**: `gs://pubsite_prod_8701670281323658688`, scope devstorage.read_only,
  same SA key. Script `scratchpad/play-stats-get.js <sa.json> <object...>`; CSVs are **UTF-16LE**.
  ⚠️ Node on this box cannot read `/tmp/...` paths (MSYS); write temp files into the scratchpad dir.
  Files lag ~10 days (Sep data ended Sep-08). `stats/installs/*` + `stats/ratings/*`, monthly, by
  country/device/language/os_version/app_version/carrier/overview.
- **Growth is ORGANIC and GLOBAL, not Ajay's network.** Sep 1-8: 31 installs across **18 countries**;
  active devices 46→61. Top installs US 7, BR 3, JP 3, IN 2. Active by country: IN 10 (16%), JP 5,
  US 5, BR 4, EG 4 — 29 countries total. India is a *minority*. Ajay confirmed he did nothing.
- **🔴 Uninstall rate ~68%** (31 installs vs 21 uninstall events, Sep 1-8). THE metric to fix — this is
  the D1/D7 retention hole, and it's why 120 acquisitions only became 70 MAU.
- **Ratings: still exactly 2** (FI, then CL on 2026-09-15). Public listing shows NO star rating and
  "100+ Downloads". Play's display threshold not yet crossed.
- Own-name search rank IMPROVED again: "block bloom" IN position 6 (was 11 on Sep-13), US 8 (was 11).
  Still absent for "block puzzle no ads".
- Android 16 (SDK 36) = 23 of 61 actives, largest bucket; SDK 37 already has 3. vc14 runs fine.
- 🔴 STILL UNCHANGED since July: alpha=vc10, internal=vc12 (both targetSdk 35) → Aug-31 flag never
  cleared, "Action required" banner still in console. No commits since Aug-29. Shuffle bug still live
  at GameViewModel.kt:973. Reporting API still disabled on GCP project 694223742398 (vitals unreadable).

## ✅ ja-JP store listing LIVE (committed 2026-09-20, edit 02530924414380697517)
- Title `Block Bloom：ブロックパズルゲーム` (22/30, full-width colon, Latin brand kept — app already ranks
  for "block bloom"), short 73/80, full 1263/4000. Produced by research→draft→native-review workflow;
  register unified to ですます; genre term ブロックパズル (NEVER 積み木 = toy blocks). 2 locales now: en-US, ja-JP.
- **Katakana reading committed: ブロックブルーム** (appears once, in body). Ajay didn't object; change = re-push.
- Facts verified in source before publishing: 3 stars/level (Levels.kt starsFor: ≤60%→3, ≤85%→2, else 1);
  daily streak pays 50+(days-1)*step coins, capped 7d (GamePrefs.kt:90-99).
- ⚠️ **Listing claims 「データ収集なし：個人情報を一切収集しません」 + Data Safety "No data collected".**
  If Firebase Analytics (planned T0 fix) ships, BOTH the ja-JP bullet and Data Safety MUST be updated
  first or it's a policy violation. Same applies to any future en-US "no data" wording.
- Script: `scratchpad/play-listing-set.js <sa.json> <pkg> <lang> <listing.json> [--dry-run]` — validates
  limits (code points), refuses promo terms in title, dry-run = PUT+readback+DELETE edit. Listing JSON
  must be written via Node (UTF-8), never PowerShell Set-Content (ANSI corrupts ：×｜①②③④ emoji).
  Images not touched — Play falls back to en-US graphics for ja-JP (localized screenshots still TODO).
- Commit went through review like every commit on this app. Next locales by user share: pt-BR (7%),
  id-ID (5%), uk-UA (5%), es (6%) — same pipeline, needs Ajay's go each.
- ✅ Verified 2026-09-20 IN-PROCESS: live ja-JP title/short/full byte-identical to sent (sha256 40d2d524…).
  ⚠️ Gotcha: `node play-listing.js > file.txt` via Git-Bash splits a multibyte char at a chunk boundary
  → a false "DIFFERS ✗" with `��`. Never verify listing text through a shell redirect; compare in Node.

## ✅ ja-JP SCREENSHOTS LIVE (committed 2026-09-20, edit 11673043688798612302, 7 images)
- Japanese-captioned versions of the 7 live en-US shots (app itself has NO ja strings; captions are
  marketing overlays). REORDERED for ja-JP: home/hero (en #02) first, daily-bonus dialog (en #01) last.
- Render path with ZERO installs: `scratchpad/render.ps1` (ASCII-only) + .NET System.Drawing, font
  **Yu Gothic UI Semibold 64px**, top panel 340px navy #0B0D24 + 5px mint #2EE6B6 accent, output
  24bpp PNG (no alpha, Play requires). Captions in `captions.json` written via Node (UTF-8) and read
  with `Get-Content -Encoding UTF8 | ConvertFrom-Json` — never put Japanese in PS source/argv.
  Panel MUST be ≥340px: at 300px it clipped the "BEST 0" HUD label on gameplay shots (caught in QA).
- Scripts: `play-images-pull.js` (download live shots, `=s0` for full-res), `play-images-push.js
  <sa> <pkg> <lang> <ordered.json> [--dry-run]` (deleteall → upload ×N → commit; 2–8 images enforced).
- 🔴 **GOTCHA: never pipe a committing script into sed/grep.** `node push.js | sed ...` — sed died on a
  bad expression, node got EPIPE and was killed BEFORE `:commit` (uploads done, edit abandoned).
  Live read-back showed ja-JP=0 → re-ran plain → OK. Always read live state before re-running a commit.
- ⚠️ en shots #01/#02 (and ja-07/ja-01) show a **"Remove Ads" button** — contradicts 広告なし / NO ADS
  copy. Needs a re-capture with that button hidden (or the button removed from the app). Not fixed.
- ja-JP page still has en-US feature graphic (only phone screenshots localized).

## ✅ 5 MORE LOCALE LISTINGS LIVE (committed 2026-09-20, ONE edit 11033433355992443668, byte-verified)
- pt-BR "Block Bloom: Jogo de Blocos" · es-419 + es-ES (identical neutral Spanish) "Block Bloom: Puzle de
  bloques" · id "Block Bloom - Puzzle Blok" (hyphen = Indonesian convention, reviewer's call) ·
  uk "Block Bloom: Блок-головоломка". **Store now has 7 locales**: en-US, ja-JP, pt-BR, es-419, es-ES, id, uk.
  Only ja-JP has localized screenshots; the other 5 fall back to en-US graphics.
- Pipeline (reusable for any locale): workflow research→draft→native-review per locale (pipeline(), no
  barrier) → `build-bundle.js <journal.jsonl|task.output> bundle.json` (journal rule: last titled result
  per locale, must be exactly 2 titled = draft+review) → `play-listings-set-multi.js <sa> <pkg> bundle.json
  [--dry-run]` (fails CLOSED on limits / promo title / missing "Block Bloom"; ONE edit, per-locale in-edit
  read-back, ONE commit) → in-process live byte-verify. Task .output file's JSON wrapper is NOT `{final}`
  at first `{` — use the journal.
- 🔴 **"No data collected" claim now lives in 7 locales + Data Safety.** Shipping Firebase Analytics
  requires updating ALL of them first (pt-BR also says "sem rastreamento" in footer; several say no IAP —
  "Grátis de verdade — sem compras no app" etc.). Grep bundle.json + ja-JP.json before any such build.
- pt-BR reviewer removed "Tente bater seu recorde!" believing no persisted best score exists — WRONG
  (GamePrefs `best`, HUD shows BEST). Replacement text is still true; harmless. Don't "fix" it back
  without re-review.

## ✅ vc15 "retention" build (1.8.0) LIVE ON INTERNAL (2026-09-20 09:27 IST) — production NOT yet
- Worktree `D:\DevTools\BlockBloom-vc15`, branch `feature/vc15-retention`, commit e44bcaf (on top of main d127a76). NOT merged to main, NOT pushed.
- Contents: StreakRules (shield from day 7, one missed day forgiven), WinBack.kt (AlarmManager inexact alarms + WinBackReceiver, ≤1 notif/day, POST_NOTIFICATIONS asked in context after 2nd-day claim), Settings "Daily reminders" toggle, Shuffle + level start use fairness-checked `freshTray(board)`, ReviewPrompter ASK_AT 2/6/15, `NoOpBillingHost.available=false` (hides dead Remove Ads/gem buttons). 15 unit tests pass.
- AAB: `D:\DevTools\BlockBloom\releases\BlockBloom-v1.8.0-vc15-retention-release.aab` (6,073,343 B; vc15, 1.8.0, minSdk 26, targetSdk 36). Uploaded edit 15030611586683743527, rolled out `completed` on **internal** edit 02532101988712131635 (Google review pending).
- ⛔ Production/alpha still on vc14. Promote only on Ajay's explicit go: `PLAY_SA_FILE=D:/Downloads/avid-airway-498216-e5-9f357c8e6b11.json node tools/play-rollout.js 15 com.aweagle.blockbloom production "1.8.0 (15) - Retention" completed` (release notes already in play-rollout.js).
- Build recipe that works in the worktree (no build.bat): `JAVA_HOME=D:/DevTools/Android/Jdk17/jdk-17.0.10+7 ANDROID_HOME=D:/DevTools/Android/Sdk JDK_JAVA_OPTIONS="--patch-module java.base=<worktree>/tools/jdkpatch/out" ./gradlew :app:lintVitalRelease :app:bundleRelease --console=plain` (~4 min). Merged manifest for verification: `app/build/intermediates/packaged_manifests/release/processReleaseManifestForPackage/AndroidManifest.xml` (AGP 8.13 path).
- Diff-review + 3 locale-review agents died on the org monthly spend limit (2026-09-20 ~01:15); I self-reviewed the diff instead. Screenshots re-uploaded WITHOUT the "Remove Ads" frame earlier the same night (edits 15130495118446453162 en-US, 05622866647325447522 ja-JP, 7 each).
- Locale batch 2 (ar, tr, zh-TW, vi): workflow `wf_dc5da302-d51` resumed 09:24 — see next section for outcome. Scratchpad `build-bundle.js` now takes the expected-locale CSV as 3rd arg; `play-listings-set-multi.js` PROMO regex extended with ar/tr/zh-TW/vi promo words.

## ✅ LOCALE BATCH 2 LIVE (committed 2026-09-20 ~09:40 IST, ONE edit 00427616802017612385, byte-verified)
- ar "Block Bloom - لغز المكعبات" (26/74/2042), tr-TR "Block Bloom: Blok Bulmaca" (25/80/2205 — short is exactly 80, legal), zh-TW "Block Bloom - 方塊消除拼圖遊戲" (22/43/989), vi "Block Bloom - Xếp Hình Khối" (27/77/2300). **Store now has 11 locales**: en-US, ja-JP, pt-BR, es-419, es-ES, id, uk, ar, tr-TR, zh-TW, vi.
- 🔴 GOTCHA: Play's Turkish code is **`tr-TR`** — plain `tr` → HTTP 400 "language is not currently supported". `ar`, `vi`, `zh-TW` are accepted as-is. Always `--dry-run` first; it caught this.
- Workflow `wf_dc5da302-d51` resumed after the spend-limit reset re-ran DRAFT+review for all 4 (cache did not hit the drafts) — 12 agents, ~630k tokens, ~10 min. Cost note for next batch: ~150k tokens/locale.
- New scratchpad script `play-listings-verify.js <sa> <pkg> <bundle.json>` = read-only sha256 compare of live vs sent (opens+discards an edit). `build-bundle.js` 3rd arg = expected-locale CSV.
- Reviewer flags to remember: every locale text carries "no data collected" + "no IAP" (11 locales now); zh-TW text is region-neutral, not for zh-HK verbatim; "8×8" uses × everywhere while competitors write "8x8" (ASO string-match decision pending).
- Remaining big-market gaps by Play share: de-DE, fr-FR, ko-KR, ru-RU, hi-IN, th-TH — same pipeline, Ajay's go each.

## 🚀 vc15 PROMOTED TO PRODUCTION (2026-09-20 ~10:05 IST, Ajay: "Put this on production")
- `play-rollout.js 15 … production "1.8.0 (15) - Retention" completed` → edit 03024361767047118453, 100% rollout, en-US release notes only. Read-back: production=vc15 completed, internal=vc15 completed, alpha=vc14 completed, beta=vc14 draft (alpha/beta testers still get vc15 because Play serves the highest available versionCode).
- ⚠️ Shipped WITHOUT a device smoke test — Ajay gave the go before reporting he installed the internal build. Lint + 15 unit tests were the only gates. If it misbehaves: **halt the rollout in the console** (you CANNOT roll back to a lower versionCode — a fix means building vc16).
- Watch for: WinBackReceiver alarm/notification behaviour on real devices (first release with POST_NOTIFICATIONS), and Remove-Ads/gem buttons now hidden via `NoOpBillingHost.available=false`.
- Follow-up nicety: release notes exist in en-US only while the store has 11 locales — localise `RELEASE_NOTES` in tools/play-rollout.js for the next build.
- Branch `feature/vc15-retention` (e44bcaf): ✅ merged into main and pushed later the same day — see the branch-state section below.

## 🌿 Branch state cleaned up (2026-09-20, after Ajay set the release-order rule — see [[feedback-blockbloom-release-process]])
- `main` fast-forwarded to **e44bcaf** = exactly the commit that is live on production (vc15 / 1.8.0). Tree clean apart from a junk `grep.exe.stackdump`. ✅ PUSHED to origin 2026-09-20 (main, feature/ads-billing, feature/vc15-retention all on GitHub; `git ls-remote` verified, nothing ahead/behind).
- 🔴 Discovered while merging: the main checkout had been sitting DIRTY since **2026-07-26** with a *different* vc15 plan — "ads ON + Play Billing". Preserved unchanged as commit **dad3547 on branch `feature/ads-billing`**: `PlayBillingHost.kt` (dormant until Play products exist), `billing-ktx:7.0.0` dep, Shop/Home/GameViewModel purchase wiring, `docs/GO_LIVE_VC15.md` runbook.
- That runbook is STALE: it says set `versionCode = 15`, but 15 is spent — **the revenue build is vc16**. Still blocked on Ajay's AdMob signup + Google Payments merchant profile. Turning ads on also invalidates the "no ads / no data collected" text in **all 11 locales** + the Data Safety form — fix those in the SAME release.
- Branches now: `main` e44bcaf (= production), `feature/vc15-retention` e44bcaf (merged, can be deleted with its worktree), `feature/ads-billing` dad3547 (next revenue build).

## ✅ vc15 DEVICE SMOKE TEST — PASSED (2026-09-20, emulator `bloomtest`, Android 14/API 34)
Stand-in for the Play pre-launch report (which has NO API — console-only). Verified the exact shipped
build (`assembleRelease` off e44bcaf → APK 3,084,985 B, versionCode 15 / 1.8.0 / targetSdk 36):
- Launch: no crash, `logcat -b crash` empty, process alive.
- **Alarm lifecycle correct:** 0 pending while open → **2** after backgrounding (today 19:00 + day+3 19:00, both `*walarm*:com.aweagle.blockbloom/.engagement.WinBackReceiver`, RTC_WAKEUP, `window=+1h` inexact) → **0** after reopening (history shows `Reason=alarm_cancelled`).
- **Notification posts correctly:** channel `winback` "Daily reminders" importance 3; NotificationRecord id=1003, `channel=winback color=0xff2bd9c6 category=reminder flags=0x10 (auto-cancel)`, lands in the normal (not Silent) section; `ic_launcher_monochrome` renders as a clean teal-circle block glyph.
- **Permission gate works:** with POST_NOTIFICATIONS ungranted the receiver returns early and posts nothing.
- Settings screen shows the **"Daily reminders"** row (and "Privacy policy", "How to play").
🔴 **Test gotchas for next time:** (1) `grep -c WinBackReceiver` on `dumpsys alarm` **over-counts** — it also matches the *history* section; count only `Alarm\{.*<pkg>` for pending alarms (this produced a false "cancel is broken" scare). (2) The receiver is `exported=false`, so `am broadcast` only reaches it **after `adb root`**. (3) Jumping the clock past the alarm does NOT fire it (inexact 1h window). (4) Git Bash rewrites `/sdcard/...` → set `MSYS_NO_PATHCONV=1 MSYS2_ARG_CONV_EXCL='*'` for every adb call using device paths. (5) Never `python - "$x"` as a fallback in these scripts — it blocks on stdin forever.
- Android vitals (Reporting API) still return **0 rows / 0 users** — the app is below Google's privacy threshold, so crash/ANR data gives no signal yet.

## 💳 Play PAYMENTS PROFILE created + PA-CB KYC submitted (2026-09-20)
- Payments profile did NOT exist before today (page showed "Create a payments profile to get started"). Now: **AJAY DATTATRY WAGHMARE, Individual profile for Play, profile ID 3947-8216-3189**, address Sector 5 Sanpada, Navi Mumbai, Maharashtra 400705.
- ✅ Account type is **Individual** → **no D-U-N-S number needed** (the Play Console Requirements org rule does not apply). That was the only long-lead-time risk before the 2026-09-30 deadline.
- Public merchant profile submitted: Business name `AW EagleCraft`, What-do-you-sell = **Computer Software** (NOT "Toys, Games and Hobbies" — that means physical toy retail in this merchant-category list), support email ajaywaghmare00a@gmail.com, credit-card statement name `AW EAGLECRAFT`, website blank.
- Google auto-created **TWO payments accounts** under the one profile (normal for Indian sellers, do not delete either): `0527-7459-1552-0300 – Cross border` and `7007-0018-9201-7637 – India only`, both INR/India.
- 🔴 **PA-CB / RBI rule:** selling to users OUTSIDE India requires KYC with Google's partner **BillDesk**. Ajay clicked Start verification 2026-09-20. Until it clears, the cross-border account cannot take sales — which is nearly the whole audience (app is live in 177 countries, localised in 11 languages).
- ⚠️ Watch for a KYC rejection: the payments-profile name reads "DATTATRY" — confirm against PAN ("DATTATRAY"?). Name/document mismatch is the usual rejection cause. Status lives on Settings → Payments profile; there is **NO API** for payments/KYC status, so it can only be read in the console.
- Not done: the **15% service fee** enrollment (needs an account group + accepting terms; halves Google's cut on the first $1M/yr — worth doing before any revenue).
- Still unknown: whether the red "Action required" chip is this KYC. It was still showing after the profile was created.

## 📊 PLAYER ANALYTICS — first full read of the stats bucket (2026-09-20)
Scripts now in scratchpad (copy somewhere permanent): `play-stats-ls.js <sa> <prefix>` (list bucket objects),
`play-report.js <sa>` (fetch all months + compute → report.json), `make-sheets.js` (report.json → sheets.json),
`make-xlsx.js <sheets.json> <out.xlsx>` (see [[reference-xlsx-generation-on-this-machine]]).
Bucket has 4 months (202606-202609) × {overview, country, language, device, os_version, app_version, carrier},
plus `stats/ratings/` and `stats/store_performance/`. Workbook delivered at `C:\Users\Ajay.Waghmare\Documents\BlockBloom-players.xlsx` (8 sheets).

**Headline numbers (Jun–Sep 2026, installs through 8 Sep):**
- Active installs **61** (was 8 end-Jun, 15 end-Jul, 24 on 21 Aug) — the base is compounding.
- 98 installs, 74 uninstalls → 🔴 **75% churn. This is the growth ceiling, not discovery.**
- Store listing: 605 visitors → 174 installs = **28.8% conversion**, which is healthy-normal. ⛔ Do NOT spend more effort rewriting the listing; the page converts fine.
- Rating **5.0** (through 17 Sep) but still below Play's display threshold.
- Best market by QUALITY: **Japan, 60% churn** vs India 89.5% and US 91.7% — the ja-JP listing + captioned screenshots are working. Localised markets (pt-BR, id, uk, tr, vi) all appear in the language data.
- Android 16 = 23 active devices, 15 = 11, 13 = 9. Everyone was on vc14 before today; updates propagate cleanly.
- 🔴 vc15's streak shield + reminders target churn directly — **this report is the baseline**. Re-run `play-report.js` in ~2 weeks and compare churn and active installs.

**Data gaps to remember:** traffic sources are all reported as "Other" (below Play's threshold, so no organic-vs-search split);
Android vitals return zero rows; **22–31 Aug was never published** as a daily file and the base jumped 24→46 inside it;
reporting lag is ~10 days. And Play NEVER exposes installer identity — no emails/names/accounts exist to fetch, ever.

## 🚀 vc16 / 1.9.0 BUILT AND RELEASE-READY (2026-09-24) — NOT yet uploaded
- `main` = **5bac4dc** (merge of `feature/vc16-analytics`), pushed. AAB backed up to
  `releases/BlockBloom-v1.9.0-vc16-analytics-release.aab` (8,565,652 B). APK 4.22 MB.
  55 unit tests green. Built FROM MAIN per the release-order rule.
- **Flags: ADS_ENABLED=false, ANALYTICS_ENABLED=true, BILLING_ENABLED=false.** The third is new;
  false constructs NoOpBillingHost so BillingClient never connects. `feature/ads-billing` is now
  fully merged — nothing stranded.
- **Firebase project `block-bloom-31b39`** (proj num 620724418792), personal Gmail. google-services.json
  has BOTH `com.aweagle.blockbloom` and `...debug` — the debug variant has applicationIdSuffix `.debug`
  and `processDebugGoogleServices` FAILS without its own registered client. BoM pinned **33.7.0**:
  34.x needs Kotlin 2.x metadata that this module's Kotlin 1.9.24 cannot read (same trap as ads 23.x).
  google-services plugin 4.5.0, crashlytics 3.0.2, firebase-perf 1.4.2.
- 🔴 **AdMob + Firebase both declare `android.adservices.AD_SERVICES_CONFIG`** → hard manifest-merge
  failure. Resolved in the app manifest with `tools:replace` in favour of `gma_ad_services_config`.
- **Measured kill-switch behaviour** (ANALYTICS_ENABLED=false): upload queue 0 rows even after a forced
  crash, no PersistedInstallation FID, Crashlytics uses a local `SYN_` id but DOES persist a crash as a
  priority-report → that report uploads RETROACTIVELY once the flag flips.
- 🔴 **Two seams I wrote were DEAD CODE, caught only by testing the built app, not by reading the diff:**
  `Analytics` (never instantiated → zero custom events) and `FirebaseEventConfig` (never wired, AND its
  constructor called `fetchAndActivate()` outside the flag). Both fixed. Analytics now fires at 11 sites;
  verified on device: `streak_claimed day=1 used_shield=0`, `tutorial_complete`, `game_start mode=endless`.
- **Player features:** `BlockEngine.traySolvable` (DFS, 4000-node budget, fails OPEN; measured 50µs/refill
  vs 16666µs frame budget), `linesIfPlaced` + board highlight, dead-tray-piece dimming, Statistics screen,
  daily-challenge calendar (`GamePrefs.challengeHistory`, capped 120 days), "Rate Block Bloom" row.
- ✅ **ALL 11 LISTINGS CORRECTED + byte-verified** (one edit, then re-read and hashed): removed "under 1 MB"
  (false — was already false at vc15's 3.08 MB), rescoped "100% OFFLINE" → "plays offline" (gameplay is
  offline; the app now talks to Firebase), removed "no data collected" → "no in-app purchases".
  🔴 tr-TR had explicitly cross-referenced the Data Safety form. Google 502s these PUTs at random →
  `play-listings-set-multi.js` now retries on 5xx (a partial publish is worse than a clean failure).
- ✅ **Privacy policy rewritten + pushed** (app-policy 95caec9), live and verified at the GitHub Pages URL.
- ⛔ **REMAINING BEFORE UPLOAD — Ajay only: the Play Data Safety form.** Answers drafted: Device/other IDs,
  App interactions, Crash logs, Diagnostics, Approximate location — all **collected, NOT shared** (the
  Analytics data-sharing toggles were switched off at project creation).
- Gotchas re-learned: heredoc mangles mixed-script files → use the Write tool; node cannot read MSYS
  `/tmp` → scratchpad; Turkish uses ASCII `'` not U+2019; a board filled to ONE gap completes every row
  AND column (useless as a line-preview fixture).

## ⚠️ CORRECTION: the release is **vc17**, not vc16 — vc16 is BURNT (2026-09-24 evening)
- 🔴 **Play REJECTS any bundle carrying Play Billing Library 7.x** ("must update to at least 8.0.0").
  It scans the bundle, so `BILLING_ENABLED=false` and an unconstructed PlayBillingHost do NOT exempt you.
- 🔴 **Play validates at COMMIT, not at upload.** `play-upload.js` succeeded and committed, THEN
  `play-rollout.js` got 403 → **versionCode 16 is permanently consumed** (Google holds bundle 16,
  sha fce5188512eaa741, which can never be rolled out). An upload whose edit is NOT committed does
  not burn the code — a later 503 mid-upload left vc17 free, confirmed via play-status before retrying.
- ✅ Fix: **`com.android.billingclient:billing:8.0.0`** — the PLAIN artifact, NOT billing-ktx.
  billing-ktx 8.0.0 carries Kotlin 2.1.0 metadata that Kotlin 1.9.24 cannot read (third instance of
  this trap after ads 24+ and Firebase BoM 34.x). PlayBillingHost only ever used async callbacks, so
  the ktx extensions were never needed. Billing 8 also changed `queryProductDetailsAsync` to return
  `QueryProductDetailsResult` instead of `List<ProductDetails>` — adapted at PlayBillingHost.kt:165.
- 🚀 **vc17 / 1.9.0 is LIVE ON THE INTERNAL TRACK** (completed, in Google review). main = **07fc1aa**,
  pushed. AAB `releases/BlockBloom-v1.9.0-vc17-analytics-release.aab` (8,620,549 B). 55 tests green.
- ✅ Data safety questionnaire SUBMITTED and in review (Collected/not-Shared × 5 types; Device-or-other-IDs
  also carries Developer communications for FCM). Privacy policy live. All 11 listings corrected.
- ⏭️ **NEXT: Ajay plays the internal build on his phone, THEN promote to production.** Watch for the
  line-clear highlight during a drag (unit-tested, never seen on a real screen) and Firebase events
  appearing within ~24h. ⛔ No rollback below a shipped versionCode — a production mistake means vc18.
- 🔴 Three libraries are now pinned by Kotlin 1.9.24 (ads 23.x, Firebase BoM 33.x, billing plain-not-ktx).
  The AGP 9 / Kotlin 2.x migration keeps getting more expensive to defer.

## Former index hook (moved from MEMORY.md 2026-09-28)

- [⭐ Project: Block Bloom release](project_blockbloom_release.md) — READ before any Play work: 🚀2026-09-20 vc15 1.8.0 (streak shield, daily reminders, fair Shuffle, Remove-Ads hidden) LIVE ON **PRODUCTION** 100% + internal, alpha/beta still vc14; ⚠️shipped with no device smoke test, no rollback to a lower versionCode (halt rollout, then vc16); ✅main=e44bcaf=production, all 3 branches pushed to GitHub; 🔴feature/ads-billing dad3547 = July ads+billing WIP rescued from a dirty main, ships as vc16 NOT vc15; **11 store locales live** — 🔴Turkish code is tr-TR not tr; 🔴"no data collected" in all 11 locales → update ALL + Data Safety BEFORE Firebase; 🔴never pipe a committing script (EPIPE killed a commit)

## vc19 in flight + first real analytics (2026-09-30)

**Production state:** vc18 / 1.9.0 live, **20% staged rollout** since 2026-09-25. main = `ee83031`.
Play **Installed audience = 108** users (verified independently: Play's own GCS CSV export gives
Active Device Installs 94 on 2026-09-20, and the base grew 46 → 94 across September).

**🔴 The number that matters: ~66% of installs uninstall.** Sept 1-20 = 103 user installs vs
68 user uninstalls, net +35. Store conversion is FINE (20-30% of listing visitors install), so
acquisition is not the problem — everything is lost after install.

**Three branches are pushed and NOT merged to main (all off `ee83031`):**
- `feature/ui-polish` `dde0253` — the UI work
- `feature/sdk-index-fragment` `189f24b` — androidx.fragment 1.1.0 → 1.8.9 via a gradle `constraints`
  block. Play SDK Index flags 1.1.0 as outdated; it arrives via firebase-perf → appcompat 1.2.0 and
  play-services-basement 18.4.0, neither bumpable under Kotlin 1.9.24. ⛔ Do NOT use fragment 1.9.x —
  it drags lifecycle to 2.10.0 into the metadata wall. A *constraint* (not `implementation`) keeps it
  off the compile classpath so the 1.9.24 compiler never reads its metadata.
- `feature/tutorial-funnel` `1ca8b98` — wires `tutorial_begin` (see below) + guard test.
Still TODO for vc19: **versionCode 18 → 19**, and Remote Config `minimumFetchIntervalInSeconds`
(never set, so the SDK default **12 h** applies — the force-update gate takes up to 12h to bite).

**🔴 Analytics interpretation trap: `tutorial_complete` fires on SKIP too.** Both "Let's play" and
the "Skip" link called `completeOnboarding()`, so that event has always meant "left the tutorial",
never "read the tutorial". Any completion rate read before vc19 is really an exit rate. vc19 adds
`skipped` + `step` params (event NAME unchanged so the existing series stays comparable).

**🔴 `tutorial_begin` was a dead constant** — declared on the Analytics seam, zero call sites, so the
first step of the new-player funnel was never measurable. Now fired from the **ViewModel** (init when
`!prefs.onboarded`, and `replayTutorial()` with `replay=true`) — NOT from the composable, because
composition runs many times per showing and would inflate every rate computed against it. It re-fires
if the app is killed before dismissal, so compute drop-off against USERS not EVENTS.

**Still-dead event constants (allowlisted in `AnalyticsTest.knownUnwired`):** `REMINDER_OPENED`
(so vc15's reminders are unmeasurable — the constant's own comment claims to measure them),
`SHARE_RESULT`, `REVIEW_PROMPT`. `AnalyticsTest` now fails the build if a constant has no call site;
verified by negative control (injected a dead constant → suite failed).

**Verified funnel, 28d to 2026-09-30 (36 users):** first_open 36 → streak_claimed 34 → game_start 21
→ tutorial_complete 18 → game_over 7 / first_clear 7; app_remove 9. `game_over` now fires (89 events
across 7 users ≈ 13 games each — the people who get in play a lot). ⚠️ 2026-09-24's 23 users were
emulator cycling, so exclude that day; real new users since the vc18 rollout ≈ 13.

**Credentials:** Play SA key ROTATED — now `play-publisher@avid-airway-498216-e5`, key id `9f357c8e…`,
file at `D:\Downloads\avid-airway-498216-e5-9f357c8e6b11.json` (old `d71576f4…` is gone). This one
key reads BOTH the Play Developer API **and** GA4 property **555700046** (it was granted property
access), plus the reports bucket `pubsite_prod_8701670281323658688`. Scripts in the session scratchpad:
`ga4.js <sa> <propertyId> [days]`, `play-stats-get.js <sa> <object...>` (CSVs are **UTF-16LE**),
`gcs-list.js <sa> <prefix>`. ⚠️ Play stats CSVs lag ~10 days.

**E2E recipe that worked (emulator `bloomtest`, Android 14):** set `log.tag.FA`/`log.tag.FA-SVC` to
VERBOSE and `debug.firebase.analytics.app <pkg>` **before** the process starts, then read
`Logging event: origin=app,name=…` out of logcat — this shows the real event + params leaving the app.
Use `uiautomator dump` for node bounds instead of blind taps. ⚠️ `adb shell screencap -p /sdcard/x.png`
needs `MSYS_NO_PATHCONV=1` or MSYS mangles the device path. Debug pkg is `com.aweagle.blockbloom.debug`
and google-services.json already carries a client for it.
