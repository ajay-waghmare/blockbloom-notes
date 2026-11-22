# Gemini development specs — vc40, vc41, vc42, vc43

Part 1: vc40 (1.16.0). Part 2: vc41 (1.17.0), vc42 (1.18.0) and the vc43 hotfix rules.
Owner of every item: Gemini. Read `00-README.md` and `01-day-by-day.md` first.

> **Plan v2 (22 Nov evening).** The development work below is unchanged, and its release calendar is the one v2 uses
> (vc40 100% Thu 26 Nov, vc41 100% Sat 5 Dec, vc42 100% Fri 11 Dec). Gemini's additions that need no new app code are
> in `06-organic-tier1.md`: O-1 store listing fix (Mon 23 Nov), store video, Holiday Bloom event value (24 Dec – 3 Jan),
> the KPI organic split. Paid ads now run only in 7-day bursts (`07-ad-bursts.md`), so vc41 must be stable by Thu
> 10 Dec (burst-ready check).

---

# Block Bloom vc40 (1.16.0): development spec for Gemini

Written Sun 22 Nov 2026 from the app repo `main` at `d0235e0` (v1.15.1, vc39). I read the code; I changed nothing.
Strategy: `01-blockbloom/11-growth-roadmap-30-days.md` (v1.1). Console steps: `plan-2026-11/03-console-runbooks.md`
(C-xx). Texts: `plan-2026-11/05-content-pack.md`.

Release dates (roadmap §9): code Mon 23 Nov, internal Tue 24 Nov, production 20% Wed 25 Nov, 100% Thu 26 Nov.

Short path names used below:
- `…/` = `app/src/main/java/com/aweagle/blockbloom/`
- `test/…/` = `app/src/test/java/com/aweagle/blockbloom/`
- `res/` = `app/src/main/res/`

---

## 0. Read this first

### 0.1 Rules for every item

1. One branch per item, cut from `main`: `feature/v40-<n>-<short-name>`. Merge each into `release/vc40` when its
   unit tests pass. `release/vc40` is cut from `main` (roadmap Day 1). If it does not exist, cut it first.
   Ajay merges `release/vc40` into `main` only when vc40 is at 100%.
2. No new SDK and no dependency version change in vc40 (roadmap §9). One manifest flag for the existing ads SDK
   is allowed (V40-4).
3. Incident #001 rule (checklist Gates 1 and 2): no new SDK call inside Activity `onCreate`, `onStart` or
   `onResume`, and no new SDK call on the main thread in `Application.onCreate`. Post it to the next main-loop turn
   or run it on a background thread, exactly as each item says.
4. Every new analytics event is a `const val` in the `Analytics` companion (`…/analytics/Analytics.kt:30-71`) and is
   called as `Analytics.NAME`. Otherwise `AnalyticsTest.everyEventConstant_isActuallyCalledSomewhere`
   (`test/…/analytics/AnalyticsTest.kt:94`) fails. Names: 40 characters or fewer, letters, digits, underscore.
5. Every new player-facing text goes into 7 files: `res/values`, `res/values-de`, `res/values-es`, `res/values-ja`,
   `res/values-ko`, `res/values-pt-rBR`, `res/values-tr`. No English text written directly in Compose code.
6. Every new Remote Config key gets a code default as a constant (same style as `AdsRules`, `…/monetize/AdsConfig.kt`)
   and is registered in `setDefaultsAsync` in `…/BlockBloomApp.kt:58-70`.
7. Every rule that decides something (gap, offers, review, session, tutorial steps) goes into a small pure Kotlin
   object with JVM unit tests. Same pattern as `StreakRules` (`…/data/StreakRules.kt`) and `AdsRules`.
   The test framework is JUnit 4 (`app/build.gradle.kts`, `testImplementation("junit:junit:4.13.2")`).
8. Event params carry ids, counts and fixed words only. No names, no e-mail, no free text from players.
9. Commit messages: Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`).

### 0.2 What I found in the code that changes the work

- **F1. The Home event strip is fake.** `AuroraWeekendStrip` (`…/ui/screens/HomeScreen.kt:1225-1267`) always shows
  "Weekend Cascade · +50% coins" and "⏱️ 4h 12m". The top-left pill always shows "⏱️ 2 days"
  (`HomeScreen.kt:126-141`). `state.activeEvents` is never drawn; `EventsCard` (`HomeScreen.kt:580-608`) has no
  caller. So deleting `live_events` (issue I1) changes nothing on screen, and the Aurora Bloom Festival (27 Nov)
  would not be visible in the game. **New item V40-11 fixes this.** The roadmap Day 2 pass mark "no Weekend
  Cascade strip on a Monday" cannot pass on vc39.
- **F2. The Shop hero banner promises things that are not sold.** `StarterBloomPackBanner`
  (`…/ui/screens/ShopScreen.kt:300-366`) says "LIMITED OFFER · 70% OFF" (`:332`) and
  "Remove Ads + 200 Gems + 10 Spins" (`:342`). The button only buys `remove_ads` (`ShopScreen.kt:159-161` →
  `GameViewModel.removeAds`, `…/viewmodel/GameViewModel.kt:1305-1313`). Spins do not exist. It shows "$1.99" when
  Play has no price (`ShopScreen.kt:358`). This hurts player trust (GEMINI.md Law 5) and is a Google Play policy
  risk: "We do not allow apps that subject users to deceptive or manipulative purchase experiences (including
  in-app purchases or subscriptions)" (Deceptive Behavior policy,
  https://support.google.com/googleplay/android-developer/answer/9888077; exact current wording UNVERIFIED).
  Fixed in V40-5, priority P0.
- **F3. The rating prompt breaks Play's in-app review rules.** The game shows its own star dialog
  (`…/ui/screens/RatingPromptDialog.kt`, drawn at `…/MainActivity.kt:188-194`) after a game over with score ≥ 25
  (`GameViewModel.kt:1149-1150, 1160`), which is a loss, and in the middle of a game when the daily challenge is
  completed (`GameViewModel.kt:1940-1948`). Only 4-5 stars are sent to Play (`GameViewModel.kt:1796-1806`).
  Google: "Your app shouldn't ask the user any questions before or while presenting the rating button or card,
  including questions about their opinion (such as 'Do you like the app?') or predictive questions (such as
  'Would you rate this app 5 stars')" (https://developer.android.com/guide/playcore/in-app-review).
  The official API (`ReviewPrompter.launchInAppReview`, `…/engagement/ReviewPrompter.kt:87-112`) has no real caller.
  Fixed in V40-8.
- **F4. Two unit tests on `main` cannot pass.** `AdsRulesTest` expects `DEFAULT_INTERSTITIAL` false and interval 4
  (`test/…/monetize/AdsRulesTest.kt:15-16, 35`). The code has `true` and `3` (`…/monetize/AdsConfig.kt:28-29`).
  I did not run the tests (read-only), but the values differ. V40-6 makes the code match the tests.
- **F5. `ad_format` is already on `ad_failed_to_load` for banner and rewarded** (`…/monetize/PersistentBannerManager.kt:64-75`,
  `…/monetize/AdMobAdHost.kt:179-189, 294-303`). The interstitial logs no event at all (`AdMobAdHost.kt:207-230,
  322-345`). The likely reason nobody saw a split by format: GA4 shows a custom param in reports only after it is
  registered as a custom dimension. V40-6 adds interstitial events. V40-9 registers the dimensions.
- **F6. `tools/play-rollout.js` already takes a staged fraction** as positional argument 7 (`tools/play-rollout.js:25-28`,
  `:137`); it then forces `status=inProgress`. Missing: a named flag, halt, a dry run, and the console text still
  says "FULL rollout" (`:123`, `:153`). V40-10 adds these.
- **F7. Two different `ad_impression` events share one name.** The app logs its own `ad_impression`
  (`…/analytics/Analytics.kt:60`). GA4 also collects `ad_impression` automatically for "Publisher events coming from
  AdMob via the Google Mobile Ads SDK" (https://support.google.com/analytics/answer/9234069). Read the app's own
  ones by the `ad_format` param. Do not rename (it would break the series).
- **F8. The ads SDK is 23.2.0** (`app/build.gradle.kts:207`). Before 24.0.0 the `OPTIMIZE_AD_LOADING` flag is off by
  default. It "optimizes ad load calls for all ad formats" and needs SDK 21.0.0 or higher
  (https://developers.google.com/admob/android/optimize-initialization). V40-4 turns it on in the manifest.
- **F9. Ads start in parallel with consent.** `AdMobAdHost.start` initializes the SDK and loads ads while the UMP
  consent update runs (`AdMobAdHost.kt:85-120`). It never checks `canRequestAds()`. Google: "Before requesting ads,
  use canRequestAds() to check if you've obtained consent from the user"
  (https://developers.google.com/admob/android/privacy). This matters for UK and IE players (Tier-1).
  vc40 only stops ads during the first game (V40-1). The full fix is open question Q2.

### 0.3 Scope, hours and cut line

| ID | Title | Hours | Priority |
|---|---|---|---|
| V40-1 | Onboarding v2 | 3.5 | P0 |
| V40-2 | First-session hook + notification ask moved | 2.5 | P1 |
| V40-3 | Push fix (FCM auto-init) | 1.0 | P0 |
| V40-4 | Rewarded readiness + loads off `onResume` | 4.0 | P0 |
| V40-5 | remove_ads offers in context + honest Shop banner | 3.5 | P0 for the banner fix, P1 for offers |
| V40-6 | Interstitial 150 s gap + code default OFF | 1.5 | P0 |
| V40-7 | Lucky chest badge + nudge | 1.5 | P1 |
| V40-8 | Review prompt rule | 1.5 | P0 (policy) |
| V40-9 | Analytics for Gate A | 2.0 | P0 |
| V40-10 | Staged rollout option, version, release notes | 1.5 | P0 |
| V40-11 | Home event strip shows the real event | 1.5 | P0 (festival 27 Nov) |
| | **Total code** | **24.0** | |
| | Build, gates, internal test, release | ~5 | |

Honest note (GEMINI.md Law 3): 24 hours of code does not fit into one code day plus a QA day without risk.
**Cut line: at Tue 24 Nov 12:00 IST**, if `release/vc40` is not green (all unit tests pass, release build OK),
remove in this order until it is green, and move the removed parts to vc41:
1. V40-7 nudge (keep the badge).
2. V40-5 modal (keep the honest banner, the pause row, the events).
3. V40-2 hook (then keep today's notification ask; do not half-move it). Keep the `first_game_over_seen` pref
   (0.6): V40-1 needs it to stop ads in game 1.
4. V40-1 ghost hand animation (keep the 3 steps and the snap).

Never cut: V40-3, V40-4, V40-6, V40-8, V40-9, V40-10, V40-11, and the V40-5 banner fix.

### 0.4 New and changed Remote Config keys (summary)

| Key | Type | Code default | Meaning / kill switch | Item |
|---|---|---|---|---|
| `ads_interstitial_enabled` | Boolean | **false** (was true) | false = no interstitials. Never delete it: vc39 still defaults to true | V40-6 |
| `ads_interstitial_interval` | Number | **4** (was 3) | every Nth game exit; 0 or less → 4 | V40-6 |
| `ads_interstitial_min_gap_s` | Number | 150 | seconds between full-screen ads; 0 or less → 150 | V40-6 |
| `ads_rewarded_ready_only` | Boolean | true | false = vc39 behaviour (buttons always, 12 s wait) | V40-4 |
| `ads_rewarded_fallback_grant` | Boolean | true | false = no free reward when an ad fails | V40-4 |
| `remove_ads_offer_enabled` | Boolean | true | false = no modal, no pause row, no game-over row (Shop stays) | V40-5 |
| `review_prompt_enabled` | Boolean | true | false = never ask for a review automatically | V40-8 |
| `live_events` | String (JSON) | "" | new optional `startsAt`, `endsAt` | V40-11 |

On Tue 24 Nov Gemini adds the 5 new keys in the Firebase console with the code defaults, so the kill switches are
visible. Do not touch `ads_interstitial_enabled` while experiment E1 runs (runbook C-12).

### 0.5 New analytics (summary)

| Event (constant) | Params | Item |
|---|---|---|
| `tutorial_step` (TUTORIAL_STEP) | step 0-3, step_name, ms, idle_help, via | V40-1 |
| `first_session_hook` (FIRST_SESSION_HOOK) | action, score | V40-2 |
| `rewarded_offer` (REWARDED_OFFER) | placement, result | V40-4 |
| `interstitial_shown` (INTERSTITIAL_SHOWN) | count, since_last_s, interval, games_played | V40-6 |
| `interstitial_skipped` (INTERSTITIAL_SKIPPED) | reason | V40-6 |
| `offer_shown` (OFFER_SHOWN) | offer, placement, session, price_micros, currency | V40-5 |
| `offer_tap` (OFFER_TAP) | offer, placement, action | V40-5 |
| `purchase_result` (PURCHASE_RESULT) | product_id, placement, result, response_code | V40-5 |
| `lucky_chest_nudge` (LUCKY_CHEST_NUDGE) | action | V40-7 |
| `lucky_chest_dialog_open`, `lucky_chest_claimed` | as today (now constants) | V40-7 |
| `live_event_shown` (LIVE_EVENT_SHOWN) | event_id | V40-11 |

Changed: `tutorial_complete` (new `via` values), `first_game_over` (new trigger rule), `notification_permission`
(+`source`), `review_prompt` (new `action` values, +`moment`, +`session`), `ad_requested` (+`trigger`), interstitial
now uses `ad_requested` / `ad_loaded` / `ad_failed_to_load` / `ad_impression` with `ad_format=interstitial`.
User properties: `first_vc`, `notif_perm`, `push_ready`.

### 0.6 New local data (GamePrefs keys)

Add to `…/data/GamePrefs.kt` with the existing pattern (`var x get() = sp.getX(KEY, d) set(v) = sp.edit { putX(KEY, v) }`,
`GamePrefs.kt:25-60`). `sp.edit { }` uses `apply()`, so writes do not block the main thread.

| Key | Type | Meaning | New player | Player updating from vc39 (gamesPlayed > 0) |
|---|---|---|---|---|
| `session_count` | Int | app sessions (see rule below) | 0, then 1 | set 2 before the first count (they are returning) |
| `last_background_ms` | Long | time the app went to background | 0 | 0 |
| `first_open_day` | Long | epoch day of first open; 0 = unknown | today | 0 (treated as install day 3 or later) |
| `first_vc` | Int | versionCode at first open | 40 | 0 ("pre40") |
| `coach_step` | Int | tutorial step 0-3 | 1 | 0 |
| `first_game_over_seen` | Boolean | hook already shown | false | true |
| `interstitials_shown` | Int | lifetime count | 0 | 0 |
| `last_fullscreen_ad_ms` | Long | last interstitial or rewarded close | 0 | 0 |
| `remove_ads_modal_count` | Int | modal shown, lifetime | 0 | 0 |
| `remove_ads_modal_last_day` | Long | epoch day of last modal | 0 | 0 |

Session rule (pure `SessionRules.isNewSession(nowMs, lastBackgroundMs)`): a new session starts when
`lastBackgroundMs == 0` or `now − lastBackgroundMs ≥ 30 min`. 30 minutes is the Firebase Analytics default session
timeout (1,800,000 ms, FirebaseAnalytics reference,
https://firebase.google.com/docs/reference/android/com/google/firebase/analytics/FirebaseAnalytics). Count it in
`GameViewModel.onActivityReady` (`GameViewModel.kt:420`); write `last_background_ms` in `onActivityPaused`
(`GameViewModel.kt:444`). These are SharedPreferences writes, not SDK calls. A full-screen ad, the billing sheet or a
permission dialog also pauses the Activity; those pauses are short, so they do not start a new session.

---

## Items

### V40-1 Onboarding v2 (pre-set board, 3 steps at most, skip after step 1, nothing before game 1 ends)

**Owner:** Gemini

**Release + day:** vc40 · 1.16.0. Code Mon 23 Nov. Internal Tue 24. 20% Wed 25. 100% Thu 26.

**Goal and the metric it moves:** tutorial completion ≥ 80% of first opens (Gate A; roadmap §8 target ≥ 85%) and
first line clear ≥ 75% (today 62% and 50%, baseline 1-21 Nov). It also shows where the 38% who never place a block
drop out (step 0).

**Today (file + function):**
- At first launch the player is put straight onto a board: `GameViewModel` init calls `beginRun(firstRun = true)`
  (`GameViewModel.kt:411-413`).
- First board: bottom row full except 2 cells; first tray piece is the horizontal domino (`…/game/FirstSession.kt`,
  `board()` and `tray()`, lines 16-39). It is seeded only when `prefs.gamesPlayed == 1` (`GameViewModel.kt:517, 538-541`).
- Coaching is 1 step. `GameState.coaching` (`GameViewModel.kt:225`) is `!prefs.onboarded` (`:385`). The first legal
  placement anywhere ends it (`placePiece` → `finishCoaching`, `:1030`, `:1820-1826`) and logs `tutorial_complete`
  with `via="play"`.
- Hints: "Tap a block below to start" / "Now tap the grid to place it" (`…/ui/screens/GameScreen.kt:533-534`);
  glowing gap (`GameScreen.kt:216-228, 418-441`); pulsing first slot (`GameScreen.kt:558`, `TraySlot` at `:1092`).
- Nothing makes the domino go into the gap. A player can put it anywhere and get no clear. Tap placement tries
  3 anchors near the tap (`GameScreen.kt:258-270`).
- Bug: if the app is closed before the first placement, the next run starts on an empty board (gamesPlayed is now 2,
  `:517`) while the coaching hint and gap glow are still on.
- What can cover the first board: the UMP consent form, started from `MainActivity.onResume` →
  `GameViewModel.onActivityReady` → `AdMobAdHost.start` (`MainActivity.kt:215-219`, `GameViewModel.kt:436`,
  `AdMobAdHost.kt:103-119`).

**Change (precise rules, numbers):**
1. Replace the Boolean with a step: `GameState.coachStep: Int` (0 = no coaching). Keep reads working with a body
   property `val coaching: Boolean get() = coachStep > 0`. Update the two writes (`GameViewModel.kt:385`, `:1825`).
2. Step 1 text: "Drag this block into the glowing gap."
   - Only tray slot 0 (the domino) can move. Slots 1 and 2 are locked: new `TraySlot` param `locked`
     (alpha 0.35, no drag, no select, no "No space" label).
   - Any drop of the domino over the board, and any tap on the board, calls new `GameViewModel.coachPlaceFirst()`.
     It places the domino at (`FirstSession.GAP_ROW`, `FirstSession.GAP_COL`). This clears the bottom row and the
     board becomes empty. `first_clear` fires as today (`GameViewModel.kt:1074`).
   - The lifeline bar is disabled in step 1 (`LifelineBar`, `GameScreen.kt:589-592`).
3. Step 2 text: "Nice! Full rows and columns clear. Now place any block." Ends on the next legal placement.
4. Step 3 text: "Blocks don't turn. The game ends when no block fits." Ends on the next legal placement or a tap on
   the hint. Then `prefs.onboarded = true`, `coachStep = 0`, `tutorial_complete` {skipped=false, step=3, via="play_v2"}.
5. Idle help, step 1 only: if there is no touch for 4 s after the board is shown, draw a ghost domino that moves from
   slot 0 to the gap (700 ms move, 1200 ms pause, repeat) until the first touch. With reduce-motion on
   (`LocalReduceMotion`), no movement; keep the glow.
6. Skip: a "Skip" text button at the right of the hint row, visible only in steps 2 and 3. Tap → `onboarded = true`,
   `coachStep = 0`, `tutorial_complete` {skipped=true, step=<current>, via="play_v2"}.
7. Seed rule fix: use the FirstSession board for any endless run (not a challenge, not a level) while
   `!prefs.onboarded && prefs.coachStep <= 1`. Not only when gamesPlayed == 1.
8. Save the step in `prefs.coach_step`. Init: `coachStep = if (prefs.onboarded) 0 else maxOf(1, prefs.coachStep)`.
9. Leaving the tutorial run: going Home keeps the step (the run is saved, `goHome` → `saveActiveGame`, `:836`).
   Starting a daily challenge, a level, or "New game" while `coachStep > 0` ends the tutorial:
   `tutorial_complete` {skipped=true, step, via="left"}, `onboarded = true`.
10. Nothing before the first game ends: while `!prefs.first_game_over_seen`, `onActivityReady` must NOT call
    `AdMobAdHost.start(activity)` (`GameViewModel.kt:436`). It calls only `(adHost as? AdMobAdHost)?.bindActivity(activity)`.
    Ads start (one `Handler(Looper.getMainLooper()).post { start(activity) }`) at the first `playAgain()` or
    `goHome()` after the first game over, and on every later `onActivityReady`. Result: no consent form, no ad
    request, no banner (needs `adsActive`, `GameScreen.kt:603`), no interstitial in game 1.
    Other dialogs are already safe: interstitials skip games 1-2 (`GameViewModel.kt:1234`); the daily reward dialog
    renders only on Home (`HomeScreen.kt:383-392`); the forced-update overlay never covers the game screen
    (`MainActivity.kt:202`).
11. The Settings "How to play" card deck (`replayTutorial`, `GameViewModel.kt:1007-1012`) is unchanged.

**Remote Config:** none. A fresh install plays game 1 before the first fetch is reliably active (`fetchAndActivate`
is asynchronous, `BlockBloomApp.kt:71`), so a flag cannot switch this off for new players. Rollback = halt (V40-10).

**Analytics (events + params):**
- `tutorial_step` {step: 0|1|2|3, step_name: board_shown|first_clear|second_place|done, ms, idle_help: 0|1, via: "play_v2"}.
  - step 0 `board_shown`: once per process, when GameScreen first draws with `coachStep == 1` (a `LaunchedEffect`
    calls `vm.onCoachBoardShown()`; the ViewModel ignores repeats). `ms` = ms since the ViewModel was created
    (`SystemClock.elapsedRealtime()`).
  - step 1: in `coachPlaceFirst`. `ms` = ms since board shown. `idle_help` = 1 if the ghost was shown.
  - steps 2 and 3: on those placements, `ms` since board shown.
- `tutorial_complete`: name and params unchanged; new values via="play_v2" and via="left".
- `tutorial_begin` unchanged (`GameViewModel.kt:399`).

**Edge cases:**
- Drag of slot 1 or 2 in step 1: blocked.
- Domino dropped outside the board: nothing happens (as today).
- Undo in steps 2-3: allowed; the step does not go back.
- App killed in any step: "Continue" resumes the saved run at the saved step.
- Players already onboarded: never see v2.
- A player who placed the domino before the update (vc39) is already onboarded: not affected.

**Acceptance criteria:**
1. Fresh install on a real phone: following the hint, the bottom row clears in 10 s or less from the first frame
   of the board (`tutorial_step` step=1 `ms` ≤ 10000 in DebugView).
2. In step 1, slots 1 and 2 cannot be dragged or selected; the lifeline bar does nothing.
3. Skip is hidden in step 1 and visible in steps 2 and 3.
4. Exactly one `tutorial_complete` per fresh install.
5. UMP debug geography EEA on a fresh install: no consent form before the first game over; it appears after the
   first exit from the game-over screen.
6. No `ad_requested` event before `first_game_over` on a fresh install.
7. Kill the app before the first placement, relaunch, tap Play: the seeded board and step 1 appear again.
8. The 3 step texts and "Skip" appear translated in de, es, ja, ko, pt-BR, tr.

**Test steps:**
- Unit: new pure `CoachRules` — next step after a placement; skip allowed only for step ≥ 2;
  `shouldSeed(onboarded, coachStep, isChallenge, isLevel)`. Extend `test/…/FirstSessionTest.kt`: placing the domino at
  (GAP_ROW, GAP_COL) clears exactly one row and leaves an empty board.
- Emulator (debug build): `adb shell pm clear com.aweagle.blockbloom.debug`, launch, read events in logcat
  (`FirebaseAnalyticsHost.event` logs every event with tag `Analytics`, `Analytics.kt:96-99`). Try slot 1 (blocked),
  wait 4 s (ghost), kill in step 2 and relaunch.
- Consent test: in a DEBUG-only code path, pass UMP `ConsentDebugSettings` with debug geography EEA and the test
  device hash (class names UNVERIFIED for the UMP version in this build; check before use).
- Real phone (internal build): fresh install, stopwatch from icon tap to first clear; once more with system
  animations off.
- Firebase DebugView: `adb shell setprop debug.firebase.analytics.app com.aweagle.blockbloom` (release) or
  `com.aweagle.blockbloom.debug` (debug); off with `adb shell setprop debug.firebase.analytics.app .none.`
  (https://firebase.google.com/docs/analytics/debugview). Expect: tutorial_begin → tutorial_step 0,1,2,3 →
  tutorial_complete; first_clear right after step 1.

**Risk and rollback:** Risk: players who wanted to place freely in step 1 are guided; low, one move only. Risk: no
revive or double-coins ad in game 1 (small revenue). Rollback: halt the rollout; no Remote Config switch.

**Effort (hours):** 3.5

---

### V40-2 First-session hook on the first game-over, and the notification ask moved there

**Owner:** Gemini

**Release + day:** vc40 · 1.16.0. Code Mon 23 Nov. Internal Tue 24. 20% Wed 25. 100% Thu 26.

**Goal and the metric it moves:** day-1 return ≥ 22% for installs of Days 5-7 (Gate A; today 14.6%). Second metric:
share of new Android 13+ players who allow notifications (`notification_permission` granted=1 ÷ first_open).

**Today (file + function):**
- Game-over dialog: `GameOverDialog` (`…/ui/screens/Dialogs.kt:89-662`). The first game is always "NEW BEST"
  (`isBest`, `Dialogs.kt:125`). The revive card is the main block (`Dialogs.kt:244-389`).
- `first_game_over` fires when `prefs.gamesPlayed == 1` (`GameViewModel.kt:1148`).
- Notification ask, two places: (a) `goHome` asks when gamesPlayed ≥ 1, permission not granted, not asked before
  (`GameViewModel.kt:841-843, 857`); (b) after the daily reward dialog when streak ≥ 1 (`consumeDailyReward`,
  `GameViewModel.kt:1705-1712`). `MainActivity` then opens the system dialog (`MainActivity.kt:81-89`). So the
  system dialog appears with no explanation on the first trip to Home after game 1.
- Daily streak day 1 is claimed at launch (`GameViewModel.kt:346-358`). Reward = 50 + 25 × (day − 1), counted up to
  day 7 (`StreakRules.rewardFor`, `…/data/StreakRules.kt:38-42`; `GamePrefs.kt:315-317`).
- The Daily Challenge is always open (`startDailyChallenge`, `GameViewModel.kt:499-503`).

**Change (precise rules, numbers):**
1. New pref `first_game_over_seen` (0.6). At init, if the key is missing and gamesPlayed > 0, set it true.
2. In `triggerGameOver` (`GameViewModel.kt:1137-1164`), when `!first_game_over_seen && activeLevel == null`:
   - set `first_game_over_seen = true`;
   - log `first_game_over` here (replace the gamesPlayed == 1 rule at `:1148`);
   - set `GameState.firstSessionHook = FirstSessionHook(score, tomorrowDay, tomorrowCoins, showRemindMe)` with
     `tomorrowDay = dailyStreak + 1`, `tomorrowCoins = StreakRules.rewardFor(dailyStreak + 1)`,
     `showRemindMe = SDK ≥ 33 && notificationsOn && !notifPermissionAsked && permission not granted`.
3. `GameOverDialog` when `firstSessionHook != null`:
   - Hide the revive card and every double-coins action (no ad in game 1, V40-1). Use the "revive not available"
     layout (`Dialogs.kt:390-540`).
   - Add one card above PLAY AGAIN with 3 lines:
     - "🏆 Your first best: {score}"
     - "📅 The Daily Challenge is open. A new one every day." Button "Try it" → `vm.hookDailyChallenge()`
       (= `commitEarnedCoins()` then `startDailyChallenge()`).
     - "🔥 Come back tomorrow: Day {N} bonus, +{coins} coins." Button "Remind me" (only if `showRemindMe`) →
       `vm.hookRemindMe()` sets `askNotificationPermission = true`; the existing launcher in `MainActivity` shows
       the system dialog.
   - PLAY AGAIN stays the main button. Home stays.
4. Remove the automatic ask from `goHome`: delete `askNotif` (`GameViewModel.kt:841-843`) and its use (`:857`).
5. Keep one second chance: in `consumeDailyReward` change `r.streak >= 1` to `r.streak >= 2`
   (`GameViewModel.kt:1708`). A player who did not tap "Remind me" is asked once more on day 2. (Open question Q1.)
6. The hook shows once ever. On this game over: no review request (V40-8), no offer row (V40-5), no chest nudge (V40-7).
7. When the player leaves this dialog (Play again, Home, Try it), ads start (V40-1 rule 10).

**Remote Config:** none (same reason as V40-1).

**Analytics (events + params):**
- `first_session_hook` {action: shown|daily_challenge|remind_me|play_again|home, score}.
- `notification_permission` {granted} (`GameViewModel.kt:461`) gets `source`: hook|streak_day2|settings.
- User property `notif_perm` = granted|denied, set in `onNotificationPermissionResult`.

**Edge cases:**
- Android 12 or lower: no runtime permission; hide "Remind me". Reminders are on by default
  (`GamePrefs.notificationsOn` default true, `GamePrefs.kt:140-142`).
- Permission already granted: hide the button.
- Player denies: the existing toast (`GameViewModel.kt:465`). The hook does not ask again.
- First game over is a level fail: no hook (`activeLevel != null`); the hook waits for the first endless or daily game over.
- The daily reward dialog still appears on the first Home visit after game 1 (it is after the first game; allowed).

**Acceptance criteria:**
1. Fresh install: the first game over shows the hook card, no revive card, no ad button.
2. The second game over is the normal dialog.
3. Android 13+: "Remind me" opens the system dialog once; `notification_permission` has source=hook.
4. Going Home after game 1 does not open the system permission dialog by itself.
5. Debug build, device date +1 day: the day-2 bonus asks once if the player has not been asked yet.
6. A player updating from vc39 never sees the hook.
7. Hook texts translated in the 6 other languages.

**Test steps:**
- Unit: pure `HookRules.tomorrow(streak)` → (day, coins): streak 1 → (2, 75); streak 6 → (7, 200); streak 7 → (8, 200).
- Emulator: one API 34 image (permission path) and one API 31 image (no button).
- Real phone: internal build, fresh install, allow and deny paths (clear app data between).
- DebugView: `first_session_hook` shown → action; `notification_permission` source.

**Risk and rollback:** Fewer players may be asked (the ask now needs a tap). Watch `notification_permission` events
per `first_open` for 3 days after 20%. Rollback: halt; vc41 can restore the automatic ask.

**Effort (hours):** 2.5

---

### V40-3 Push fix: Firebase Cloud Messaging must work

**Owner:** Gemini

**Release + day:** vc40 · 1.16.0. Code Mon 23 Nov. Internal Tue 24. 20% Wed 25. 100% Thu 26.

**Goal and the metric it moves:** the Aurora Bloom Festival push (Fri 27 Nov) and the Winter Bloom push (Mon 14 Dec)
reach opted-in players. Metric: users with `push_ready=1`; `notification_open` per push.

**Today (file + function):**
- The manifest turns auto-init off: `firebase_messaging_auto_init_enabled=false` (`app/src/main/AndroidManifest.xml:87-89`).
- `BlockBloomApp.onCreate` turns on Analytics, Crashlytics, Performance and Remote Config, never Messaging
  (`…/BlockBloomApp.kt:20-83`). No code in `app/src` calls `setAutoInitEnabled`, `getToken` or a topic. So no device
  has a token and a console campaign reaches nobody.
- `BloomMessagingService` shows foreground and data pushes on channel `news` (`…/engagement/BloomMessagingService.kt:34-65, 86`).
  It creates the channel only inside `onMessageReceived` (`:47`, `:74-83`). Background pushes with a notification
  payload are drawn by the SDK; the manifest has no default channel, icon or color, so the SDK uses its own fallback.
- `onNewToken` does nothing (`:72`). That is fine for console campaigns.

**Change (precise rules, numbers):**
1. In `BlockBloomApp.onCreate`, inside the `ANALYTICS_ENABLED` branch (`BlockBloomApp.kt:22`), start ONE background
   thread (same style as `AdMobAdHost.initializeOnce`, `AdMobAdHost.kt:122-144`). In it, each step in `runCatching`:
   a. `FirebaseMessaging.getInstance().isAutoInitEnabled = true`. Firebase: "To re-enable FCM auto-init, make a runtime
      call … These values persist across app restarts once set." (https://firebase.google.com/docs/cloud-messaging/android/client)
   b. Create the `news` channel. Move `ensureChannel` into a shared `NewsChannel.ensure(context)` used here and in
      `BloomMessagingService`. (minSdk is 26, `app/build.gradle.kts:23`, so channels always exist.)
   c. `FirebaseMessaging.getInstance().token.addOnSuccessListener { … }`: set user property `push_ready = "1"`; in DEBUG
      builds only, `Log.d("FCM", token)` so a tester can send a test message. Never log the token in release.
2. Manifest: keep `firebase_messaging_auto_init_enabled=false` (a build with `ANALYTICS_ENABLED=false` stays dark).
   Add inside `<application>` (names from the same Firebase page):
   - `com.google.firebase.messaging.default_notification_channel_id` = `news`
   - `com.google.firebase.messaging.default_notification_icon` = `@drawable/ic_launcher_monochrome` (exists in `res/drawable`)
   - `com.google.firebase.messaging.default_notification_color` = new `@color/brand_teal` `#2BD9C6` (same color as
     `BloomMessagingService.kt:57`), added to `res/values/colors.xml`.
3. No topics. Console campaigns target the app plus conditions (app version, country, language).

**Remote Config:** none. Kill switch: do not send a campaign. Players can mute the "News and events" channel.

**Analytics (events + params):**
- User property `push_ready` = "1" (Firebase user property limits: name up to 24 characters, value up to 36 —
  UNVERIFIED in this session).
- Automatic GA4 events: `notification_receive` ("received … when the app is in the background", Android only),
  `notification_open`, `notification_foreground`, `notification_dismiss` (https://support.google.com/analytics/answer/9234069).
- A tap on a foreground push still logs `reminder_opened` {source=push} (`MainActivity.kt:74`, `GameViewModel.kt:476-478`).

**Edge cases:**
- Android 13+: without the permission no notification shows ("Your app won't be allowed to show notifications until
  the user has granted this permission", same Firebase page).
- Reach = vc40+ players who opened the app once after updating, AND (Android 12 or lower, OR permission granted).
  Expect tens of players on 27 Nov, not hundreds.
- A data-only message without "title" is dropped (`BloomMessagingService.kt:37`). Always send a title.
- Data Safety: the FCM token is a device identifier. Firebase Messaging is already in the build
  (`app/build.gradle.kts`, Firebase block). Ajay confirms the Data Safety form already declares it (Q8).

**Acceptance criteria:**
1. Debug build, first launch: logcat shows the token. Release build: no token in logcat.
2. Firebase console > Messaging > new notification > "Send test message" to that token (labels UNVERIFIED):
   app in background → notification on channel "News and events", monochrome icon, teal color.
   App in foreground → notification from `BloomMessagingService`.
3. Tap → the app opens; DebugView shows `notification_open`.
4. `BlockBloomApp.onCreate` has no new SDK call on the main thread (code review, Gate 2).
5. After the 20% rollout, GA4 shows users with `push_ready=1` on version 1.16.0.

**Test steps:**
- Unit: none (SDK only).
- Emulator: Google Play image API 34; allow notifications; background the app; send a test message.
- Real phone: internal build; same test; also with the permission denied (nothing must show).
- DebugView: `notification_receive` / `notification_open`.

**Risk and rollback:** Low. Rollback: halt. An unused token is harmless.

**Effort (hours):** 1.0

---

### V40-4 Rewarded readiness: preload, "ready" buttons only, measured fallback, loads off `onResume`

**Owner:** Gemini

**Release + day:** vc40 · 1.16.0. Code Mon 23 Nov. Internal Tue 24. 20% Wed 25. 100% Thu 26.

**Goal and the metric it moves:** more rewarded views per player (rewarded eCPM $26.93; 89 views from 26 players,
1-21 Nov) and no more 12-second "Loading ad…" waits. Metrics: `rewarded_offer` shown ÷ offered; revenue per Tier-1
active day (Gate B). Safety metric: 0 ANRs from ad code (Incident #001).

**Today (file + function):**
- Rewarded loads: after SDK init (`AdMobAdHost.kt:131-138`); on every resume when empty, synchronously on the main
  thread inside `MainActivity.onResume` → `GameViewModel.onActivityReady` (`AdMobAdHost.start`, `:93-100`;
  `GameViewModel.kt:436`); on tap, with a wait of up to 12 s (`showRewarded`, `:232-264`; `ON_DEMAND_TIMEOUT_MS`,
  `:366`); after a close or show failure (`:289-307`). No back-off. No age check.
- The consent update also runs on every resume (`AdMobAdHost.kt:103-119`).
- Billing connects from `onResume` too (`GameViewModel.kt:440`).
- Watch buttons are shown whether an ad is loaded or not: revive (`Dialogs.kt:293-314`), double coins
  (`Dialogs.kt:355-363`, `:445-467`), lucky chest (`HomeScreen.kt:2061-2104`), daily double (`HomeScreen.kt:388`).
  Shop free coins, rewarded skins and out-of-coins check `adsActive` (SDK up), not "ad loaded"
  (`ShopScreen.kt:166, 201, 219`; `GameViewModel.kt:1401`).
- On any failure, five flows give the reward free (`runRewarded`, `GameViewModel.kt:1211-1228`; callers `:1188`,
  `:1201`, `:1434`, `:1481`, `:1742`). Two flows have no fallback and show "No ad available" (`:1289` skins,
  `:1416` lifeline).
- `ad_failed_to_load` already has `ad_format` for rewarded and banner (F5).

**Change (precise rules, numbers):**
1. `AdHost` interface (`…/monetize/AdHost.kt:14-32`), with default bodies so `FakeAdHost` and the test `MockAdHost`
   still compile: `val rewardedReady: Boolean get() = true` and `fun preloadRewarded() {}`.
2. `AdMobAdHost`:
   - `rewardedReady` = a rewarded ad is loaded AND it is younger than 55 minutes. (Google's tip is to reload preloaded
     ads about every hour; the exact expiry is UNVERIFIED, https://developers.google.com/admob/android/rewarded.)
   - `preloadRewarded()`: return if not initialized; drop an ad older than 55 min; return if a load is in flight or a
     load failed less than 60 s ago (back-off); else `loadRewarded()`.
   - `var onRewardedReadyChanged: ((Boolean) -> Unit)?`, called on the main thread when the value changes
     (loaded → true; taken for show at `:278`, failed, expired → false).
   - `start()` no longer loads directly. It does
     `main.postDelayed({ preloadRewarded(); if (interstitial wanted) loadInterstitial() }, 1000)`.
   - The consent update runs once per process (an `AtomicBoolean`), not on every resume.
   - `loadRewarded` adds `trigger` to `ad_requested` (resume|game_start|home|tap|after_show|offer).
   - Keep the 12 s on-demand path for the rare tap on an ad that just expired.
3. Manifest: add `<meta-data android:name="com.google.android.gms.ads.flag.OPTIMIZE_AD_LOADING" android:value="true"/>`
   (F8). Do not add `OPTIMIZE_INITIALIZATION`: init already runs on a background thread, and Google's 2024 ANR post
   says that flag is then not needed (https://developers.google.com/ads/blog/posts/2024/07/reduce-anrs-when-implementing-mobile-ads).
4. `GameViewModel`:
   - `onActivityReady` (`GameViewModel.kt:420-442`): replace the direct `start(activity)` (`:436`) and
     `billing.start(activity)` (`:440`) with ONE `Handler(Looper.getMainLooper()).post { … }` that first checks the
     Activity is still resumed. Keep the V40-1 first-game rule.
   - New state `rewardedLoaded` (from `onRewardedReadyChanged`) and
     `rewardedButtons = if (adsConfig.rewardedReadyOnly()) rewardedLoaded else adsActive`.
   - Preload with `adHost.preloadRewarded()` at the end of `beginRun`, `startLevel` and `goHome` (button actions, not
     lifecycle).
   - `runRewarded(placement, onFailFallback, onReward)`: `placement` is required. On failure with a fallback: give
     the reward only if `adsConfig.rewardedFallbackGrant()` (default true); otherwise toast `no_ad_available_try_again`.
   - New `onRewardedOfferVisible(placement)`: logs `rewarded_offer` (offered or no_fill); on no_fill it calls
     `preloadRewarded()`.
5. UI: the watch button shows only when `state.rewardedButtons`:
   - revive button (`Dialogs.kt:293-314`); the "or use coins" link stays (`Dialogs.kt:316-338`);
   - double coins link (`Dialogs.kt:355-363`) and card (`Dialogs.kt:392`, `:445-467`);
   - lucky chest dialog button (`HomeScreen.kt:2061-2104`); if the chest is ready but no ad: new text
     "Bonus video not ready yet. Try again in a minute.";
   - daily double: `canDoubleWithAd = state.rewardedButtons && !state.adsRemoved` (`HomeScreen.kt:388`);
   - shop free coins (`ShopScreen.kt:166`, `:219`), rewarded skins filter (`ShopScreen.kt:201`), out-of-coins
     `canWatchAd` (`GameViewModel.kt:1401`).
   - Each surface calls `vm.onRewardedOfferVisible("<placement>")` once from `LaunchedEffect(Unit)`.
   - Placements: `revive`, `double_coins`, `lucky_chest`, `daily_double`, `free_coins`, `skin_unlock`, `out_of_coins`.

**Remote Config:**
- `ads_rewarded_ready_only` — Boolean, default true. false = vc39 behaviour. This is the kill switch.
- `ads_rewarded_fallback_grant` — Boolean, default true (keeps the free reward on failure, as asked). A later
  per-country test can set it false for Tier-1; not part of vc40.

**Analytics (events + params):**
- `rewarded_offer` {placement, result}. result values:
  - `offered` — surface opened with the button visible;
  - `no_fill` — surface opened, no ad loaded, button hidden;
  - `shown` — the ad is on screen (`onShown`);
  - `fallback_grant` — the ad failed after a tap and the reward was given free;
  - `failed` — the ad failed and nothing was given (no fallback, or fallback switched off).
  The roadmap named shown / no_fill / fallback_grant. `offered` and `failed` are added so the counts add up.
- `ad_requested` gets `trigger`. `ad_loaded` / `ad_failed_to_load` keep `ad_format`.

**Edge cases:**
- remove_ads buyers keep rewarded ads (they are opt-in).
- An ad loads while a dialog is open: the button appears (state-driven). The offer was already logged at entry.
- Offline: loads fail, buttons hidden, no_fill logged, at most one load try per 60 s.
- Activity gone at show time: existing `onFail` (`AdMobAdHost.kt:233-237`) → fallback rule.
- EEA consent: unchanged in vc40 (Q2).

**Acceptance criteria:**
1. Debug build online: watch buttons appear a few seconds after start; a tap shows the test ad with no
   "Loading ad…" overlay longer than 1 s.
2. Airplane mode: no watch buttons at game over; the chest dialog shows the "not ready" text; `rewarded_offer`
   result=no_fill; logcat shows at most one rewarded load every 60 s.
3. Debug Remote Config `ads_rewarded_ready_only=false` (debug fetch interval is 0, `BlockBloomApp.kt:55`) brings back
   vc39 behaviour.
4. `MainActivity.onResume` → `GameViewModel.onActivityReady` makes no direct ad or billing SDK call (code review and
   grep, Gate 2).
5. The merged release manifest contains `OPTIMIZE_AD_LOADING = true` (check
   `app/build/intermediates/merged_manifests/release/…/AndroidManifest.xml`).
6. Every rewarded tap gives exactly one `rewarded_offer` with shown, fallback_grant or failed.

**Test steps:**
- Unit: pure `RewardedRules` — `fresh(ageMs)` true at 54 min, false at 56 min; `backoffOver(now, lastFail)` false at
  59 s, true at 61 s. The existing `test/…/monetize/AdHostBehaviorTest.kt` must still pass.
- Emulator: debug test ad IDs (`app/build.gradle.kts` debug block); airplane-mode test.
- Real phone: internal build; the phone must be an AdMob test device first (Q9). One revive, one chest.
- DebugView: offered → shown; airplane: no_fill.

**Risk and rollback:** Fewer visible buttons where fill is poor (India, Pakistan, Bangladesh), so fewer free rewards
there and a tighter coin economy. These are not paid countries now. Rollback: `ads_rewarded_ready_only=false` in
Remote Config (seconds, no release).

**Effort (hours):** 4.0

---

### V40-5 remove_ads offers in context, and an honest Shop banner

**Owner:** Gemini

**Release + day:** vc40 · 1.16.0. Code Mon 23 Nov (banner fix first). Internal Tue 24. 20% Wed 25. 100% Thu 26.

**Goal and the metric it moves:** first purchases (0 in November). Roadmap §3: `remove_ads` at ≥ 2% of Tier-1 players
at about $2.99 adds about ₹5 per install. Metrics: `offer_tap ÷ offer_shown` by placement; `purchase_result` success.

**Today (file + function):**
- `remove_ads` is offered only in the Shop: the misleading hero banner (F2) and a row on the Gems tab
  (`ShopScreen.kt:272-288`).
- Price from Play: `PlayBillingHost.removeAdsPrice` (`…/monetize/PlayBillingHost.kt:67-68`) → `GameState.removeAdsPrice`
  (`GameViewModel.kt:205`, set at `:323-327`).
- Purchase: `GameViewModel.removeAds` (`:1305-1313`) → `PlayBillingHost.purchaseRemoveAds` (`:111-119`). Every
  non-success, including a player who cancels, shows "in-app purchases coming soon" (`GameViewModel.kt:1311`).
  No purchase analytics.
- What it removes: interstitials (`GameViewModel.kt:1231`, `AdMobAdHost.kt:323`) and the banner (`…/monetize/BannerAd.kt`,
  `if (adsRemoved) return`). Rewarded ads stay.
- No session counter and no install day exist (0.6).

**Change (precise rules, numbers):**
1. Shop hero (`ShopScreen.kt:159-161`, `:300-366`), priority P0: title "Remove Ads"; line "No banners or interstitials.
   Bonus videos stay optional."; price = Play price. Remove "LIMITED OFFER · 70% OFF", "200 Gems", "10 Spins" and
   the "$1.99" fallback. Hide the banner when the price is null or the player owns remove_ads.
2. Modal `RemoveAdsOfferDialog` (new composable in `Dialogs.kt`): title "Tired of ads?"; text "Remove banners and
   interstitials for {price}. Bonus videos stay optional."; buttons [Remove Ads · {price}] and [No thanks].
   Pure rule `OfferRules.modalAllowed(…)`: show only if ALL are true:
   - Remote Config `remove_ads_offer_enabled`; price not null; not owned; billing available;
   - `session_count ≥ 2` (never in session 1);
   - trigger (a): `interstitials_shown ≥ 3` → show right after an interstitial closes (in the `onDone` of
     `maybeInterstitialThen`, before `after()` runs); or trigger (b): `session_count ≥ 5` → show on the first Home
     arrival of that session;
   - not already shown today (`remove_ads_modal_last_day != today`) and shown fewer than 3 times ever;
   - never during a game; never on the first-session hook game over.
3. Pause menu: a slim row "Remove Ads · {price}" under Quit in `PauseDialog` (`Dialogs.kt:967-1141`, after `:1127-1136`).
   Visible from session 2, when the price is known, not owned, Remote Config on. The game stays paused during purchase.
4. Game over: a slim row "Remove Ads · {price}" above the Share / Rate / Home row (`Dialogs.kt:570`). Visible when
   install day ≥ 3 (`today − first_open_day ≥ 2`; players from vc39 count as day 3+), on at most one game over per
   session, and only if this game over has no other extra (V40-2 hook, V40-7 nudge, V40-8 review).
5. Purchase result: `PlayBillingHost` keeps the last `BillingResult.responseCode` (from `onPurchasesUpdated`,
   `:133-141`, and `launchFlow`, `:145-153`) and exposes `removeAdsPriceMicros` / `removeAdsCurrency` from
   `oneTimePurchaseOfferDetails`. `removeAds(placement)`: success → existing thank-you toast; USER_CANCELED → no toast;
   ITEM_ALREADY_OWNED → run the existing restore query; other → new toast "Purchase did not finish. Please try again."
6. After a purchase or a restore (`onRemoveAdsOwned`, `GameViewModel.kt:328-334`), every offer disappears at once.

**Remote Config:** `remove_ads_offer_enabled` — Boolean, default true. false = no modal, no pause row, no game-over
row. The Shop stays (a store page is not an interruption). Prices are set in Play Console by Ajay (decision D5).

**Analytics (events + params):**
- `offer_shown` {offer="remove_ads", placement: shop|modal_interstitial|modal_session|pause|game_over, session,
  price_micros, currency}. At most once per session per placement (in-memory set).
- `offer_tap` {offer, placement, action: buy|no_thanks}.
- `purchase_result` {product_id, placement, result: success|cancelled|pending|already_owned|error, response_code}.
  Not named `purchase`: GA4 collects `in_app_purchase` automatically for Google Play purchases with price and value
  (https://support.google.com/analytics/answer/9234069), so a second revenue event would count twice. Revenue is read
  from `in_app_purchase`.

**Edge cases:**
- Billing not connected (no price): nothing shows.
- Pending payment (cash methods): `handlePurchase` ignores non-PURCHASED states (`PlayBillingHost.kt:194`). Log
  result=pending; the entitlement arrives later through `onRemoveAdsOwned`.
- Experiment E1, interstitials OFF arm: trigger (a) never fires; trigger (b) still can.
- Interstitial then modal is two interruptions in a row. That is why it is capped (once a day, 3 times ever).
- Debug builds (`.debug` package) have no Play products, so price is null and offers never show there.

**Acceptance criteria:**
1. The Shop hero shows "Remove Ads" with the Play price. No "70% OFF", no gems, no spins. Hidden when owned.
2. Fresh install, 15 games in one session with interstitials on: no modal (session 1).
3. In session 2 or later, the modal appears right after the 3rd interstitial; at most once a day; at most 3 times ever.
4. The pause row appears from session 2; the game-over row from install day 3.
5. Cancel in the Play sheet: no "coming soon" toast; `purchase_result` result=cancelled.
6. Test purchase with a license tester: ads disappear at once; all offers hidden; `purchase_result` success.
7. All new texts translated in the 6 other languages.

**Test steps:**
- Unit: pure `OfferRules` — session 1 → false; interstitials 3 and session 2 → true; same day twice → false; 4th
  time → false; owned → false; price null → false; game-over row at install day 2 → false, day 3 → true.
- Emulator: rules only (no prices on debug).
- Real phone: internal build with a license tester account (Play Console license testing is set by Ajay, Q10); buy,
  check, then refund. To test "day 3" and "session 5", a DEBUG-only Settings action that sets `first_open_day` and
  `session_count` is allowed; it must not exist in release builds.
- DebugView: offer_shown → offer_tap → purchase_result.

**Risk and rollback:** Annoyance. Caps plus the Remote Config switch. The banner fix removes the policy risk.
Rollback: `remove_ads_offer_enabled=false`.

**Effort (hours):** 3.5

---

### V40-6 Interstitial minimum gap of 150 s, and code default OFF

**Owner:** Gemini

**Release + day:** vc40 · 1.16.0. Code Mon 23 Nov. Internal Tue 24. 20% Wed 25. 100% Thu 26.

**Goal and the metric it moves:** experiment E1 (interstitials ON vs OFF, runbook C-12) can run without stacked ads;
a missing Remote Config value can never switch interstitials on for everyone. Metrics: E1 guardrails (day-1 and
day-3 return, uninstalls); `interstitial_shown` per player.

**Today (file + function):**
- `DEFAULT_INTERSTITIAL = true`, `DEFAULT_INTERSTITIAL_INTERVAL = 3` (`…/monetize/AdsConfig.kt:28-29`). The class comment
  says both default to OFF (`AdsConfig.kt:4-5`). Live Remote Config v5 sets false and 4. If the key is deleted, or
  on a first launch before the fetch lands, interstitials are ON for everyone.
- `maybeInterstitialThen` (`GameViewModel.kt:1230-1250`): skip for buyers or when disabled; none while
  gamesPlayed ≤ 2; skip and reset after a rewarded view in the run; count down one per game exit; show at ≤ 0.
  No time gap. Called from `playAgain` (`:1208`) and `goHome` (`:844`).
- Interstitial loading and showing log nothing (`AdMobAdHost.kt:207-230`, `:322-345`).
- `AdsRulesTest` expects false and 4 (F4).

**Change (precise rules, numbers):**
1. `AdsRules`: `DEFAULT_INTERSTITIAL = false`; `DEFAULT_INTERSTITIAL_INTERVAL = 4`; new
   `KEY_INTERSTITIAL_MIN_GAP_S = "ads_interstitial_min_gap_s"`, `DEFAULT_INTERSTITIAL_MIN_GAP_S = 150L`.
   `AdsConfig.interstitialMinGapSeconds()`: value ≤ 0 → 150. Register the default in `BlockBloomApp.kt:58-70`.
   Fix the comments at `AdsConfig.kt:4-5` and `app/build.gradle.kts:70-71`.
2. New pure `InterstitialRules.gapOk(nowMs, lastFullScreenAdMs, minGapS)`: true if `last ≤ 0`, or `now < last`
   (clock moved back), or `now − last ≥ minGapS × 1000`.
3. Pref `last_fullscreen_ad_ms` is written when an interstitial OR a rewarded ad closes. `AdMobAdHost` gets
   `var onFullScreenAdClosed: (() -> Unit)?` and `var onInterstitialShown: (() -> Unit)?`, wired in the ViewModel
   `init` like `onReady` (`GameViewModel.kt:319-321`). So no interstitial within 150 s of any full-screen ad.
4. New order in `maybeInterstitialThen`:
   1. buyer or disabled → `after()`;
   2. gamesPlayed ≤ 2 → `after()`;
   3. rewarded watched in this run → countdown = interval, `after()`;
   4. countdown = max(0, countdown − 1);
   5. countdown > 0 → `after()`;
   6. gap not OK → log `interstitial_skipped` reason=gap, `after()` (countdown stays 0, so the next exit may show);
   7. countdown = interval; `adHost.maybeShowInterstitial(after)`.
5. Interstitial events in `AdMobAdHost`: `ad_requested` {ad_format=interstitial, trigger}; `ad_loaded`
   {ad_format=interstitial, latency_ms}; `ad_failed_to_load` {ad_format=interstitial, error_code, error_message,
   error_domain} (`:222-227`); show failure → `ad_failed_to_load` {ad_format=interstitial_show}. Add
   `onAdShowedFullScreenContent` to the interstitial callback (`:331-343`) → `ad_impression` {ad_format=interstitial}
   and `onInterstitialShown` → `interstitials_shown += 1` and `interstitial_shown`. No ad loaded at show time
   (`:326-329`) → `interstitial_skipped` reason=not_loaded.

**Remote Config:**
- `ads_interstitial_enabled` — Boolean, code default now false. Kill switch. Never delete it while vc39 is in use
  (vc39's default is true).
- `ads_interstitial_interval` — Number, code default now 4.
- `ads_interstitial_min_gap_s` — Number, default 150 (≤ 0 → 150). Gemini adds it in the console on Tue 24 Nov.
- E1 keeps working: its arms set `ads_interstitial_enabled` (runbook C-12).

**Analytics (events + params):** `interstitial_shown` {count (lifetime), since_last_s, interval, games_played};
`interstitial_skipped` {reason: gap|not_loaded}; the `ad_*` events above with `ad_format=interstitial`.

**Edge cases:** device clock changed; app killed (the pref survives); remove_ads bought in the session (checked first);
E1 OFF arm: no interstitial loads at all (`AdMobAdHost.kt:208` checks the flag before loading).

**Acceptance criteria:**
1. `AdsRulesTest` passes without edits to its existing asserts; new asserts for the gap key and 150 pass.
2. Debug, Remote Config enabled=true, interval=1: two game exits 30 s apart → one interstitial only; the next one
   only after 150 s.
3. After game 3, with interval=1: open the lucky chest (rewarded), then play a short game and exit within 150 s of
   closing the chest ad → no interstitial, `interstitial_skipped` reason=gap.
4. Debug Remote Config without the `ads_interstitial_enabled` key → no interstitial ever.
5. DebugView shows `ad_requested` / `ad_loaded` with ad_format=interstitial and `interstitial_shown`.

**Test steps:**
- Unit: `InterstitialRules` (149 s false, 150 s true, last=0 true, now<last true); updated `AdsRulesTest`.
- Emulator: debug build with test ad IDs and debug Remote Config.
- Real phone: internal build, test device only (Q9).
- DebugView: as above.

**Risk and rollback:** Low. Rollback: Remote Config.

**Effort (hours):** 1.5

---

### V40-7 Lucky chest "ready" badge on Home, and a nudge after game over

**Owner:** Gemini

**Release + day:** vc40 · 1.16.0. Code Mon 23 Nov. Internal Tue 24. 20% Wed 25. 100% Thu 26.

**Goal and the metric it moves:** more rewarded views per active player (the chest is a rewarded placement).
Metrics: `rewarded_offer` placement=lucky_chest result=shown per DAU; `lucky_chest_claimed` per DAU.

**Today (file + function):**
- State `luckyChestAvailable`, `luckyChestCooldownText` (`GameViewModel.kt:231-232`) from
  `checkLuckyChestAvailability` (`:1440-1465`). It runs at init (`:400`), on resume (`:428`), when the dialog opens
  (`:1468`) and after a claim (`:1498`). Not while the player stays on Home.
- Home card `AuroraLuckyChestCard` (`HomeScreen.kt:1135-1223`): gold border and an English "Ready to open" pill when
  ready (`:1205`); English "Lucky chest" (`:1183`); fake fallback "2h 45m" (`:1213`).
- Dialog `LuckyChestDialog` (`HomeScreen.kt:1883-2120`) shows fixed "+150", "+3", "+1" (`:2018`, `:2035`, `:2052`).
  The real values come from Remote Config with defaults 150 coins, 2 gems, 1 hammer (`AdsConfig.kt:30-33`;
  `grantLuckyChestReward`, `GameViewModel.kt:1486-1515`). Untrue texts: "Open 4 hr free with 1 daily watch…"
  (`:1990`), "Free daily 3/4" (`:2096`), "Or open 2 ready in 1h 14m" (`:2112`).
- Bottom navigation has a dot only for trophies (`…/ui/AuroraBottomNav.kt:116`, drawn at `:177-184`).
- Two events are plain strings: "lucky_chest_dialog_open" (`GameViewModel.kt:1470`), "lucky_chest_claimed" (`:1514`).

**Change (precise rules, numbers):**
1. `chestBadge = luckyChestAvailable && rewardedButtons` (V40-4). Home card: a pulsing 10 dp gold dot at the top
   right plus the "Ready" pill (translated). Bottom nav HOME tab: show the existing dot (`hasBadge`) when
   `chestBadge` and the current screen is not HOME.
2. While Home is visible, run `checkLuckyChestAvailability()` every 60 s (a `LaunchedEffect` loop in `HomeScreen`)
   and on `goHome`.
3. Nudge on game over: if `chestBadge`, and this game over has no V40-2 hook and no V40-8 review request, show one
   row "🎁 Lucky Chest is ready · Open" above PLAY AGAIN. Tap → new `vm.goHomeAndOpenChest()`: bank the coins, go
   Home WITHOUT an interstitial for this exit (do not change the countdown), open the chest dialog. At most once per
   session.
4. Make the dialog true: show the real numbers (`AdsConfig` values put into state by
   `checkLuckyChestAvailability`). Remove the 3 untrue texts. New text: "Watch a short video to open. Next chest in
   {N} h." Translate every chest text.
5. Make the two string events constants (`LUCKY_CHEST_DIALOG_OPEN`, `LUCKY_CHEST_CLAIMED`) with the SAME string
   values, so the GA4 series continue. Add `ad_ready` to `lucky_chest_dialog_open`.

**Remote Config:** existing `lucky_chest_cooldown_hours` (default 2), `lucky_chest_coins` (150), `lucky_chest_gems` (2),
`lucky_chest_hammers` (1). No new key.

**Analytics (events + params):** `lucky_chest_nudge` {action: shown|tap}; `lucky_chest_dialog_open` {available, ad_ready};
`rewarded_offer` placement=lucky_chest (V40-4).

**Edge cases:** chest ready but no ad → no badge and no nudge; the card still opens the dialog with the "not ready"
text. remove_ads buyers: rewarded still works, so the badge shows. Clock moved back: chest shows not ready (as today).

**Acceptance criteria:**
1. With Remote Config cooldown 1 h (debug), the badge appears within 60 s while the player stays on Home.
2. The dot shows on the HOME tab when the player is on Shop, Adventure or Trophies and the chest is ready.
3. Debug Remote Config interval=1: tap the nudge → Home + chest dialog, and no interstitial on that exit.
4. Set `lucky_chest_gems=5` (debug): the dialog shows +5.
5. `grep` finds none of "Free daily 3/4", "Or open 2 ready", "Open 4 hr free" in `…/ui`.

**Test steps:**
- Unit: none new (state logic is simple); existing tests pass.
- Emulator: debug Remote Config; device clock +2 h after a claim.
- Real phone: internal build.
- DebugView: lucky_chest_nudge shown → tap → lucky_chest_dialog_open → rewarded_offer shown → lucky_chest_claimed.

**Risk and rollback:** Low. Rollback: halt, or a longer cooldown in Remote Config.

**Effort (hours):** 1.5

---

### V40-8 Review prompt rule

**Owner:** Gemini

**Release + day:** vc40 · 1.16.0. Code Mon 23 Nov. Internal Tue 24. 20% Wed 25. 100% Thu 26.

**Goal and the metric it moves:** more Play ratings asked for in a way Play allows (10 ratings today; roadmap §8:
40+ by Day 30). Metric: `review_prompt` action=requested per week; ratings count in Play Console.

**Today (file + function):** see F3. Also: `ReviewPrompter.canPromptToday` = once per day (`ReviewPrompter.kt:45-50`);
`launchInAppReview` opens the Play Store page by itself when the review flow fails (`ReviewPrompter.kt:87-112`);
the game-over "Rate" button opens the Play listing directly and marks the player as rated (`Dialogs.kt:604-631` →
`GameViewModel.openRateStore`, `:1788-1793`).

**Change (precise rules, numbers):**
1. Remove the custom star dialog: the `showRatingPrompt` writes (`GameViewModel.kt:685-686, 694, 1149-1150, 1160,
   1940-1941, 1948`), the `MainActivity` blocks (`MainActivity.kt:95-97`, `:188-194`), `onRateFromPrompt`,
   `dismissRatingPrompt`, and the file `RatingPromptDialog.kt`.
2. New pure `ReviewRules.shouldAsk(…)`. True only if ALL hold:
   - Remote Config `review_prompt_enabled`;
   - not `hasRated` (set only by the manual Rate button);
   - `today − lastPromptDay ≥ 30` (at most once per 30 days);
   - the moment is a win:
     (a) a game over where the score beat the best from before this run AND that best was > 0 (a real personal
     best, never game 1); or
     (b) a level won; or
     (c) a run in which the daily challenge was completed;
     (b) and (c) count only when `session_count ≥ 3`;
   - no rewarded ad and no interstitial in this run or on this exit ("never rewarded": never next to an ad, never as
     payment for something);
   - not the first-session hook game over.
   Never after a loss: a normal game over without a new best, or a lost level → never.
3. Daily challenge completion (`bumpChallenge`, `GameViewModel.kt:1921-1956`) only sets `challengeWonThisRun = true`.
   The check runs at that run's game over. Never in the middle of a game.
4. When true: save `lastPromptDay = today`, wait 1500 ms (`Handler.postDelayed`), then, if the Activity is resumed and
   the game-over screen is still shown, call `reviewPrompter.launchInAppReview(activity, fallbackToStore = false)`.
   Add the `fallbackToStore` param (default false) so an automatic ask never jumps to the Play Store.
5. Never give coins, gems or anything for a rating.
6. Keep the manual "Rate" button. Google: for a button, "redirect the user to the Play Store instead" (in-app review page).
7. Nothing on top of the review card (Google: "Don't add any overlay on top of the card or around the card"):
   on that game over, skip the V40-5 row and the V40-7 nudge.

**Remote Config:** `review_prompt_enabled` — Boolean, default true. Kill switch.

**Analytics (events + params):** `review_prompt` {action: requested|flow_done|direct_tap, moment: new_best|level_win|daily_challenge,
session}. `direct_tap` exists (`GameViewModel.kt:1790`). The API does not tell whether the player rated; count
ratings in Play Console.

**Edge cases:**
- Play's quota can show nothing: "calling the launchReviewFlow method more than once during a short period of time
  (for example, less than a month) might not always display a dialog" (in-app review page). This is normal.
- No Play Store on the device: the request fails; nothing happens.
- Players asked by the old dialog keep their `lastPromptDay` and wait 30 days from it.

**Acceptance criteria:**
1. `grep -r RatingPromptDialog app/src` finds nothing.
2. A normal loss → no `review_prompt` event.
3. A new best (previous best > 0) → `review_prompt` action=requested after 1.5 s.
4. A second new best within 30 days → no request.
5. A revived run with a new best → no request.
6. Daily challenge completed mid-game → nothing mid-game; at that run's game over a request if session ≥ 3.

**Test steps:**
- Unit: `ReviewRules` — every guard on and off; 29 days → false, 30 days → true. Update
  `test/…/engagement/ReviewPrompterTest.kt` for the 30-day window.
- Emulator: debug; check events (the Play sheet may not show on an emulator).
- Real phone: internal build; check the `requested` event, not the sheet (quota).
- DebugView: review_prompt with moment.

**Risk and rollback:** Fewer asks than the daily dialog, but they follow Play's rules and come at good moments.
Rollback: `review_prompt_enabled=false`.

**Effort (hours):** 1.5

---

### V40-9 Analytics for Gate A

**Owner:** Gemini

**Release + day:** vc40 · 1.16.0. Code Mon 23 Nov (first, other items use it). GA4 setup Mon 23. Internal Tue 24.
20% Wed 25. 100% Thu 26. Gate A read Sun 29 Nov.

**Goal and the metric it moves:** Gate A (roadmap §11) can be read from data: vc40 crash-free ≥ 99.5%; 28-day ANR
< 0.47%; tutorial completion ≥ 80%; day-1 return ≥ 22% for installs of Days 5-7 (Thu 26 – Sat 28 Nov);
conversions visible per campaign.

**Today (file + function):** events in `Analytics.kt:30-62` plus two string events; no session counter, no install
day, no "installed on version" property; custom params not registered in GA4 (F5).

**Change (precise rules, numbers):**
1. GamePrefs keys and session rule (0.6).
2. User properties: `first_vc` = "40" for players whose first open is on vc40 (gamesPlayed == 0 at the first vc40
   start), else "pre40". Set once per launch from the ViewModel init. `notif_perm` (V40-2). `push_ready` (V40-3).
3. All event constants in 0.5, with exactly these names.
4. GA4 (Gemini, console, Mon 23 Nov): Admin > Data display > Custom definitions > Create custom dimension.
   Event scope: `step`, `step_name`, `via`, `skipped`, `placement`, `result`, `ad_format`, `error_code`, `trigger`,
   `reason`, `action`, `offer`, `moment`, `source`. User scope: `first_vc`, `notif_perm`, `push_ready`.
   Do it before vc40 data arrives: custom dimensions do not fill in old data (UNVERIFIED in this session). GA4 limits
   for a standard property: 50 event-scoped and 25 user-scoped custom dimensions (UNVERIFIED in this session).
   Menu path labels UNVERIFIED.
5. Check `tutorial_complete` is still a key event (runbook C-25 / C-01).
6. Gate A formulas for the KPI script (`tools/growth-kpi.js`, roadmap Day 1 agent task):
   - Crash-free: Crashlytics, version filter 1.16.0 (40), crash-free users, since release. Also Play Console Android
     vitals (`tools/check-vitals.js`).
   - ANR: Play Console vitals, user-perceived ANR rate, 28 days, all versions.
   - Tutorial completion = users with `tutorial_complete` (via ≠ "cards") ÷ users with `first_open`; first opens
     Thu 26 – Sat 28 Nov; app version 1.16.0. Also print the step funnel 0 → 1 → 2 → 3.
   - First clear = users with `first_clear` ÷ `first_open`, same group.
   - Day-1 return: cohort by `first_open` date (Thu 26 – Sat 28); return = any engagement the next day; split
     Tier-1 (US, GB, CA, AU, NZ, IE) and the rest; filter `first_vc = 40`.
   - Rewarded: `rewarded_offer` by placement × result; no_fill share by country.
   - Ad failures per player-hour by `ad_format` (settles "retry storm vs banner no-fill").
   - Offers: `offer_tap ÷ offer_shown` by placement; `purchase_result` success count.
7. Timing: Sat 28 Nov installs get their "day 1" on Sun 29 Nov, which ends in US time zones on Mon 30 morning IST.
   See Q7.

**Remote Config:** none.

**Analytics (events + params):** this item defines them (0.5).

**Edge cases:** offline events upload later; DebugView only shows devices in debug mode; with very small numbers GA4
reports may hide rows (data thresholds, UNVERIFIED for this property); then use counts from DebugView tests and the
Data API.

**Acceptance criteria:**
1. One full test run in DebugView (fresh install → game 1 → hook → games 2-5 → chest → Shop → pause) shows every
   event in 0.5 with its params.
2. `AnalyticsTest` passes.
3. The custom dimensions are listed in GA4 Admin on Mon 23 Nov evening.
4. The KPI script prints the 5 Gate A lines ("n/a" is allowed before data exists).

**Test steps:** unit (`SessionRules`: 29 min → same session, 30 min → new; `lastBackgroundMs = 0` → new); emulator;
real phone; DebugView as above.

**Risk and rollback:** none for players.

**Effort (hours):** 2.0

---

### V40-10 Staged rollout option, version bump, release notes

**Owner:** Gemini

**Release + day:** vc40 · 1.16.0. Script Mon 23 Nov. Version and notes Tue 24. Used Tue 24 (internal), Wed 25 (20%),
Thu 26 (100%).

**Goal and the metric it moves:** a bad build reaches 20% of players, not 100% (issue I2; v1.15.0 shipped the ANR to
everyone). Metric: no release goes to 100% without 24 h clean at 20%.

**Today (file + function):** F6. Also: `tools/release-vc39.js` uploads to production and completes at 100% in one
run (`tools/release-vc39.js:24-47`). Checklist Gate 4 says "100% completed status" and pushes to
`origin/release/2026-10-25` (`MAJOR_ISSUES_AND_GO_LIVE_CHECKLIST.md`, Gate 4). Version: `versionCode = 39`,
`versionName = "1.15.1"` (`app/build.gradle.kts:46-47`). Release notes: 13 languages in `tools/release-notes/vc39.json`
(en-US, ja-JP, es-419, es-ES, uk, id, pt-BR, ar, zh-TW, vi, tr-TR, ko-KR, de-DE).

**Change (precise rules, numbers):**
1. `tools/play-rollout.js`:
   - Keep the positional arguments as they are (old scripts still work). The default stays `completed` at 100%.
   - Add named flags: `--track=<name>`, `--name=<release name>`, `--fraction=<number>` (status inProgress +
     userFraction), `--complete` (status completed, no fraction), `--halt` (status halted), `--dry-run` (open the edit,
     PUT the track, call `edits:validate`, then DELETE the edit; never commit).
   - Validate before any API call: 0 < fraction < 1; `--fraction` with `--complete` → error; `--halt` with
     `--fraction` → error. Exit code 2.
   - Print the real action in capitals: "STAGED ROLLOUT 20%", "FULL ROLLOUT 100%", "HALT" (fix `:123`, `:153`).
   - Before the commit, GET the track and print its releases; after the commit, GET again and print. The operator
     must see vc39 still serving next to vc40 at 20% (runbook C-15 open point).
   - API bodies (https://developers.google.com/android-publisher/tracks): staged
     `{"versionCodes":["40"],"userFraction":0.2,"status":"inProgress"}`; halt `{"versionCodes":["40"],"status":"halted"}`;
     complete `{"versionCodes":["40"],"status":"completed"}`.
2. Do not write a one-run `release-vc40.js` that goes to production at 100%. A wrapper, if any, stops after the
   internal track.
3. Version: `versionCode = 40`, `versionName = "1.16.0"`, and a comment line "Release 1.16.0 (40): …" next to the
   others (`app/build.gradle.kts:42-47`).
4. `tools/release-notes/vc40.json`: the same 13 language codes as vc39.json; every text 500 characters or fewer (the
   script checks this, `tools/play-rollout.js:49-52`). Text: content-pack §8 "vc40 · 1.16.0" draft. Keep only the
   bullets for items that are really in the build (the festival bullet only if V40-11 ships). Gemini translates;
   Ajay reads en-US only.
5. Update `MAJOR_ISSUES_AND_GO_LIVE_CHECKLIST.md` Gate 4: "Staged rollout with play-rollout.js --fraction:
   20% → 100% after 24 h clean; releases with a new SDK 10% → 50% → 100%" and "branch release/vcNN; Ajay merges it
   into main at 100%".

**Remote Config:** `min_supported_version_code` stays 0. It is the emergency brake. Do not raise it during vc40.

**Analytics (events + params):** none.

**Edge cases:** the release name must be the same in upload and rollout (runbook C-15). Play review can take longer
than a day. A halt does not take vc40 back from players who have it. Managed publishing (Q5).

**Acceptance criteria:**
1. `node tools/play-rollout.js 40 --track=production --name="1.16.0 (40)" --fraction=0.2 --dry-run` validates and
   commits nothing (Play Console unchanged).
2. `--fraction=0`, `1`, `1.5`, `abc` → exit 2 before any network call.
3. `tools/release-notes/vc40.json` passes the script checks (13 entries, each ≤ 500 characters).
4. After the real 20% commit, Play Console shows vc40 "rolling out 20%" and vc39 still serving the others (screenshot
   in DAILY_ACTIVITY.md).

**Test steps:** run the dry-run against production; run the invalid-value cases; `node -e "…"` length check of vc40.json.

**Risk and rollback:** A wrong commit could put vc40 at 100%. Mitigation: dry-run first, capital-letter output, Ajay
can halt in the console.

**Effort (hours):** 1.5

---

### V40-11 Home event strip shows the real live event (new item, needed for the festival)

**Owner:** Gemini

**Release + day:** vc40 · 1.16.0. Code Mon 23 Nov. Internal Tue 24. 20% Wed 25. 100% Thu 26. Festival payload Fri 27.

**Goal and the metric it moves:** the Aurora Bloom Festival (27 Nov – 3 Dec, coins ×2) and the Play promotional
content match what players see in the game (roadmap Day 2 and Day 6). Fixes issue I1 on screen. Metric:
`live_event_shown` users ÷ DAU during the festival.

**Today (file + function):** F1. Model: `GameEvent` (`…/events/Events.kt:13-20`); calendar events Saturday/Sunday
coins ×1.5 and Wednesday daily ×2 (`Events.kt:46-73`); Remote Config payload parser `FirebaseEventConfig.parseOrNull`
(`…/events/FirebaseEventConfig.kt`, from line 57); the active list goes into state at init and `goHome`
(`GameViewModel.kt:378`, `:856`, `:2034`). The coin bonus is applied in `commitEarnedCoins` (`GameViewModel.kt:2121-2136`).

**Change (precise rules, numbers):**
1. Replace `AuroraWeekendStrip()` (`HomeScreen.kt:375`) with `ActiveEventStrip(state.activeEvents)`: the event with the
   highest multiplier; title, description, and a days-left label (strings `ends_today` and plural `days_left` exist,
   used at `HomeScreen.kt:600`). Hidden when the list is empty. Delete `AuroraWeekendStrip` and `WeekendRewardBanner`
   if nothing uses them.
2. Top-left pill (`HomeScreen.kt:126-141`): show the days-left label of that event; when there is no event, show a
   calendar icon and the word "Calendar" (translated). It still opens the calendar.
3. Payload: optional `startsAt` and `endsAt` ("YYYY-MM-DD", device local date, inclusive). An entry before
   `startsAt` or after `endsAt` is dropped. If `endsAt` is set, days left = `endsAt − today` (it replaces
   `endsInDays`). If dates drop EVERY entry, return null, so the calendar events run (the event cleans itself up).
   An explicit `[]` still means "no events" (unchanged). Old apps ignore the new fields; keep `endsInDays` and the
   Remote Config date conditions for vc39 players (runbook C-10).
4. Refresh `activeEvents` also in `onActivityReady` (a local read, no SDK), so a new day or a Remote Config update
   shows without a restart.

**Remote Config:** `live_events` (String/JSON). Festival example for Fri 27 Nov (title and text are server text,
English only; `FirebaseEventConfig` cannot translate them):
`[{"id":"aurora_bloom_festival","title":"Aurora Bloom Festival","description":"Coins x2 on every game","kind":"COIN_BOOST","multiplier":2.0,"endsInDays":6,"startsAt":"2026-11-27","endsAt":"2026-12-03"}]`

**Analytics (events + params):** `live_event_shown` {event_id}, once per session per event.

**Edge cases:** bad JSON → calendar events (as today). Unknown `kind` → that entry is skipped (as today). Two events
of the same kind → the highest multiplier applies (`GameViewModel.kt:2037-2038`) and is shown. vc39 players keep the
fake strip until they update (harmless; the coin bonus still works for them).

**Acceptance criteria:**
1. No payload: Saturday shows the weekend bonus; Wednesday shows the midweek bonus; Monday shows no strip.
2. Festival payload with `startsAt` tomorrow → no strip today; device date moved to 27 Nov → strip with "6 days left"
   (or the plural form for the locale).
3. `endsAt` yesterday → calendar events run.
4. The pill never shows a number that is not from a real event.

**Test steps:**
- Unit: extend `test/…/events/FirebaseEventConfigTest.kt`: inside and outside the dates; every entry dropped → null;
  days left from `endsAt`; `[]` → empty list.
- Emulator: debug Remote Config (fetch interval 0); change the device date.
- Real phone: internal build.
- DebugView: `live_event_shown`.

**Risk and rollback:** Low. Rollback: edit or delete the `live_events` value.

**Effort (hours):** 1.5

---

## Day-by-day build, QA and release checklist

Times are IST. "Done when" = do not go to the next step until it is true.

### Mon 23 Nov — code day

1. `git fetch`. Check `release/vc40` exists; if not, cut it from `main`.
2. On `main`, run `gradlew :app:testDebugUnitTest` and write down which tests fail (expected: 2 in `AdsRulesTest`, F4).
   On the work laptop the build needs `build.bat` (JDK loopback patch, `build.bat:1-25`); on Gemini's laptop use
   `gradlew.bat` unless the same error appears.
3. Build in this order, one branch each, merge into `release/vc40` when its tests pass:
   V40-9 base (prefs, sessions, constants) → V40-6 → V40-4 → V40-3 → V40-1 → V40-2 → V40-11 → V40-8 →
   V40-5 (banner fix first) → V40-7 → V40-10 script.
4. GA4 custom dimensions (V40-9 rule 4).
5. Evening: `gradlew :app:testDebugUnitTest` green on `release/vc40`; debug build on the emulator; one full run with
   DebugView.
6. Write DAILY_ACTIVITY.md and the journal (below).
Done when: all merged items have green tests on `release/vc40`.

Ajay on Mon (5-10 min each): add his phone as an AdMob test device (Q9); add a license tester in Play Console (Q10);
answer Q1-Q8.

### Tue 24 Nov — internal build and Gates 1-3

1. 12:00: apply the cut line (0.3) if needed.
2. Version 40 / 1.16.0 and `tools/release-notes/vc40.json` (V40-10).
3. **Gate 1 (Vitals and thread safety):**
   - Release build with R8: `gradlew :app:bundleRelease :app:assembleRelease` (`isMinifyEnabled = true`,
     `isShrinkResources = true` in the release block of `app/build.gradle.kts`).
   - Thread audit of the diff: `git diff main...release/vc40 -- app/src/main` and check every new line inside
     `onCreate`, `onStart`, `onResume`, `onActivityReady`, `BlockBloomApp.onCreate`: no direct SDK call; SDK work is
     posted or on a background thread; SDK init uses `applicationContext`.
   - Ad loads gated on `isInitialized` (`AdMobAdHost.kt:147, 208` stay).
   - Crashlytics for vc39 today: crash-free users and open ANRs, written down as the baseline.
4. **Gate 2 (ads protection):** banner refresh 120 s in AdMob (Ajay confirms, screenshot); no new floors;
   `curl -I https://ajay-waghmare.github.io/app-ads.txt` returns 200.
5. **Gate 3 (build standards):** minify and shrink on; `targetSdk = 36` (`app/build.gradle.kts:27`);
   `enableEdgeToEdge()` (`MainActivity.kt:70`); versionCode 40 and versionName 1.16.0; 13 release notes.
6. Copy the bundle to `releases/BlockBloom-v1.16.0-vc40-release.aab` (and the APK next to it, same naming as vc39).
7. Internal track (release name 50 characters or fewer, `tools/release-vc39.js:18`):
   ```
   node tools/play-upload.js releases/BlockBloom-v1.16.0-vc40-release.aab com.aweagle.blockbloom internal "1.16.0 (40) - First session + ad readiness"
   node tools/play-rollout.js 40 com.aweagle.blockbloom internal "1.16.0 (40) - First session + ad readiness" completed
   ```
   (`PLAY_SA_FILE` env var for the key file; never print it.)
8. Real phone tests on the internal build: every "Real phone" step of V40-1 to V40-11. Write each result as pass/fail.
9. Firebase console: add the 5 new Remote Config keys with their defaults (0.4). Check `ads_interstitial_enabled` and
   experiment E1 are unchanged.
10. 20:00: if steps 3-8 pass, dry-run then submit production at 20% (it goes live at 20% when Google approves it,
    target Wed 25):
    ```
    node tools/play-rollout.js 40 --track=production --name="1.16.0 (40) - First session + ad readiness" --fraction=0.2 --dry-run
    node tools/play-rollout.js 40 --track=production --name="1.16.0 (40) - First session + ad readiness" --fraction=0.2
    ```
    If Ajay prefers, submit Wed 09:00 instead (Q5).
11. DAILY_ACTIVITY.md and journal.
Done when: Gates 1-3 written as passed in DAILY_ACTIVITY.md; internal build tested on a real phone.

### Wed 25 Nov — production 20%

1. Check Play Console: vc40 "rolling out 20%", vc39 still serving. Screenshot (V40-10 acceptance 4).
2. Every 4 hours: Crashlytics (version 1.16.0), Play vitals (`tools/check-vitals.js`), GA4 realtime: `tutorial_step`,
   `rewarded_offer`, `interstitial_shown` arrive from 1.16.0.
3. Halt rules (runbook C-15): crash-free users on 1.16.0 below 99.5% with a real crash cluster, any ANR cluster, or a
   new crash in more than 1% of sessions → tell Ajay; Ajay halts in the console, or Gemini runs `--halt` if Ajay says so.
4. With about 100 daily players, 20% is about 20 players. Read counts (any ANR = look at its stack), not only percentages.
5. DAILY_ACTIVITY.md and journal.
Done when: 24 hours at 20% are logged with crash and ANR counts.

### Thu 26 Nov — 100% if clean

1. At least 24 h since the 20% went live.
2. Go to 100% only if: crash-free users for 1.16.0 ≥ 99.5% AND no ANR cluster (no ANR signature in 2 or more users,
   no ANR in `AdMobAdHost` or `BlockBloomApp`). GEMINI.md Law 4 asks for 100.0% crash-free and 0 new ANRs: report
   against both; if they disagree, Ajay decides (Q6).
3. Dry-run, then complete:
   ```
   node tools/play-rollout.js 40 --track=production --name="1.16.0 (40) - First session + ad readiness" --complete --dry-run
   node tools/play-rollout.js 40 --track=production --name="1.16.0 (40) - First session + ad readiness" --complete
   ```
4. Tell Ajay to merge `release/vc40` into `main`.
5. Prepare the festival `live_events` payload (V40-11 format) for Fri 27 Nov (runbook C-10). Prepare the festival push
   (content-pack §4), to be sent only after the festival shows in the app.
6. Cut `release/vc41` from `main` after Ajay's merge (roadmap Day 5).
7. DAILY_ACTIVITY.md and journal.
Done when: vc40 completed on production; Ajay has merged; festival payload ready.

### DAILY_ACTIVITY.md entries Gemini must write (app repo root, same style as the existing file)

Write at the end of each day. Use real numbers only; write "not measured" when there is none.

```
## 📅 November 23, 2026
### 1. vc40 (1.16.0) development
* Branches merged into release/vc40: <list with commit ids>
* Items done: V40-<n> … ; items moved to vc41 (cut line): <list or "none">
* Unit tests: <passed>/<total> on release/vc40 (main before work: <n> failing, names: …)
### 2. Firebase / GA4
* Custom dimensions created: <list>
### 3. Open problems
* …
```

```
## 📅 November 24, 2026
### 1. vc40 internal build
* AAB: releases/BlockBloom-v1.16.0-vc40-release.aab (<size> MB); release name "<name>"
* Gate 1: <pass/fail + notes>; Gate 2: <pass/fail>; Gate 3: <pass/fail>
* Real phone tests: <device, Android version>: V40-1 … V40-11 <pass/fail each>
### 2. Remote Config
* Keys added: <list with values>; ads_interstitial_enabled checked = <value>; E1 = <state>
### 3. Production submission
* Submitted 20% at <time IST> (or planned Wed 09:00)
```

```
## 📅 November 25, 2026
### 1. vc40 at 20%
* Live at 20% since <time>; Play Console shows vc39 still serving: <yes/no + screenshot file>
* Crashlytics 1.16.0: crash-free users <x%>, crashes <n>, ANRs <n> (users on 1.16.0: <n>)
* Play vitals: user-perceived ANR 28-day <x%>
* First events from 1.16.0: tutorial_step <n>, rewarded_offer <n>, interstitial_shown <n>
```

```
## 📅 November 26, 2026
### 1. vc40 to 100%
* Decision data: crash-free <x%> over <n> users / <n> sessions; ANR clusters: <none / list>
* Completed at <time IST>; release/vc40 merged into main by Ajay: <yes/no>
### 2. Festival preparation
* live_events payload ready (not yet published): <payload>
```

### Notes-repo journal entries Gemini must write (`blockbloom-notes`, branch `journal`)

1. One file per day: `journal/2026-11-23.md` … `journal/2026-11-26.md`, copied from `journal/TEMPLATE.md`
   (sections: Live state, Done today, Numbers worth noting, Decisions, Next).
2. "Live state" line on each day: Mon/Tue "production: vc39 (1.15.1) at 100%"; Wed "production: vc40 (1.16.0) at 20%
   · also live: vc39 at 100% for the rest"; Thu "production: vc40 (1.16.0) at 100%".
3. "Done today" = the same facts as DAILY_ACTIVITY.md, shorter, with branch names and commit ids.
4. "Decisions" = what Ajay decided on Q1-Q10, with the date.
5. Commit message `docs: journal 2026-11-2X vc40 <code day|internal|20%|100%>`; push to `origin journal`.
6. The notes repo is public (issue I8). Never write keys, tokens, service-account content, player ids or e-mails.

---

## Open questions for Ajay (answer by Mon 23 Nov evening)

- **Q1.** Notification ask: the hook "Remind me" button (tap first, then the system dialog) plus one second chance on
  the day-2 streak bonus. OK, or the hook only?
- **Q2.** Consent (F9): vc40 only stops ads during the first game. Gating all ad requests on `canRequestAds()` (Google
  guidance) may lower UK/IE/EEA ad fill until players answer the form. Do it in vc41?
- **Q3.** Shop banner (F2): replace "Starter Bloom Pack" with a plain, honest "Remove Ads" (recommended), or create a
  real bundle product in Play Console (your task) for vc42?
- **Q4.** Review prompt (F3): confirm removal of the star dialog. Ratings asks will be fewer but allowed.
- **Q5.** Play Console: is managed publishing on? If yes, a release waits for your "Publish" click. Submit production 20%
  on Tue 20:00 or Wed 09:00?
- **Q6.** Go to 100% on ≥ 99.5% crash-free (roadmap) or on 100.0% and 0 new ANRs (GEMINI.md Law 4)? With about 20 users
  at 20%, one crash gives about 95%.
- **Q7.** Gate A day-1 return for Sat 28 Nov installs is complete only on Mon 30 Nov morning IST. Read Gate A on Mon 30,
  or use Thu-Fri installs only on Sun 29?
- **Q8.** Data Safety form: does it already declare device identifiers for Firebase Cloud Messaging? (Play Console UI.)
- **Q9.** Add your test phone as an AdMob test device before Tue (AdMob > Settings > Test devices; label UNVERIFIED), so
  real-phone ad tests are not invalid traffic.
- **Q10.** Add a license tester account in Play Console (Settings > License testing; label UNVERIFIED) so the
  remove_ads purchase can be tested without a real charge.

## Sources used (outside the repos)

- Firebase Cloud Messaging Android client setup (auto-init, persistence, default channel/icon/color meta-data, Android 13
  permission): https://firebase.google.com/docs/cloud-messaging/android/client
- Play in-app review guidelines and quotas: https://developer.android.com/guide/playcore/in-app-review
- Play Developer API tracks (inProgress, userFraction, halted, completed): https://developers.google.com/android-publisher/tracks
- AdMob optimize initialization and ad loading (SDK 21.0.0+, default true only from 24.0.0):
  https://developers.google.com/admob/android/optimize-initialization
- Google ANR guidance for mobile ads (2024): https://developers.google.com/ads/blog/posts/2024/07/reduce-anrs-when-implementing-mobile-ads
- UMP consent (update at every launch, canRequestAds before requests): https://developers.google.com/admob/android/privacy
- GA4 automatically collected events (ad_impression, in_app_purchase, notification_*):
  https://support.google.com/analytics/answer/9234069
- Firebase DebugView adb commands: https://firebase.google.com/docs/analytics/debugview
- Firebase Analytics session timeout default: https://firebase.google.com/docs/reference/android/com/google/firebase/analytics/FirebaseAnalytics
- AdMob rewarded ads (reload about every hour; exact expiry UNVERIFIED): https://developers.google.com/admob/android/rewarded
- Google Play Deceptive Behavior policy: https://support.google.com/googleplay/android-developer/answer/9888077


---

# Part 2: vc41 (1.17.0), vc42 (1.18.0), vc43 hotfix rules

# Block Bloom: Gemini development spec for vc41 (1.17.0), vc42 (1.18.0) and vc43 (hotfix rules)

Written 22 Nov 2026 by Claude (planning only; Claude has no tasks). Readers: **Gemini** (builds exactly this) and
**Ajay** (accounts, money, consoles, decisions). Strategy: `01-blockbloom/11-growth-roadmap-30-days.md` v1.1.
Text to reuse word for word: `content-pack.md` (same folder as this file).

---

## 0. Read first (rules for Gemini)

1. **Line numbers** below are from app repo `main` at `d0235e0` (v1.15.1, vc39). vc40 will move them. Find code by
   the function name. If a function changed in vc40, keep the vc40 behaviour and apply this spec on top.
2. **Branches.** Wait until Ajay has merged `release/vc40` into `main` (planned Thu 26 Nov). Cut one branch per item
   from `main`: `feature/V41-01-mediation`, `feature/V41-02-daily-loop`, and so on. Merge them into
   `release/vc41` cut from `main`. Never merge into `main`. Ajay does that at 100%.
3. **No version catalog.** `gradle/libs.versions.toml` does not exist (checked 22 Nov). All versions are inline in
   `app/build.gradle.kts`, plugin versions in the root `build.gradle.kts`. Do not add a catalog in these releases.
4. **Kotlin 1.9.24 pin.** Root `build.gradle.kts:14`. Do not add any library that pulls `kotlin-stdlib` 2.1 or
   newer. Check after every dependency change:
   `./gradlew :app:dependencyInsight --dependency kotlin-stdlib --configuration releaseRuntimeClasspath`
   The highest version must be 1.9.24 (or lower libs aligned up to it). Never 2.x.
5. **Thread rules (Incident #001, GEMINI.md Law 2).** No SDK call, disk write or IPC on the main thread inside
   `onCreate`, `onStart` or `onResume`. Every ad load waits for the `MobileAds.initialize` completion callback.
   Background work uses `applicationContext`.
6. **Remote Config.** Every new key gets a default in `BlockBloomApp.onCreate` `setDefaultsAsync` (`BlockBloomApp.kt:58-70`)
   and a reader that never throws (same shape as `AdsConfig`). Every key has an explicit OFF value.
7. **Strings.** Every new user-facing string goes into `res/values/strings.xml` and the 6 translations
   (`values-de`, `-es`, `-ja`, `-ko`, `-pt-rBR`, `-tr`). No hardcoded English in Kotlin.
8. **Analytics.** Only through the `Analytics` seam (`analytics/Analytics.kt`). Event names 40 chars max. Register
   new params as GA4 custom dimensions the same day, or they cannot be reported.
9. **Release notes.** `tools/release-notes/vc<N>.json`, 13 locales (same list as `vc39.json`: en-US, ja-JP, es-419,
   es-ES, uk, id, pt-BR, ar, zh-TW, vi, tr-TR, ko-KR, de-DE), 500 chars max each. English text: content-pack §8.
10. **Logs.** Every day: `DAILY_ACTIVITY.md` in the app repo and the journal in `blockbloom-notes` (branch `journal`).

---

## 1. Summary

| ID | Item | Release | Gemini hours | Ajay time |
|---|---|---|---|---|
| V41-01 | AdMob mediation: 5 bidding adapters | vc41 | 10 | ~3 h consoles (Mon 30 Nov) + Meta later |
| V41-02 | Daily loop on Home (card, streak ladder 1/3/7, come-back chest, day-rollover fix) | vc41 | 9 | — |
| V41-03 | Reminders v2 (one a day, usual hour, streak at risk, 2 texts) | vc41 | 6 | — |
| V41-04 | Referral (score card image, referrer link, both rewarded, abuse limits) | vc41 | 15 (7 + 8) | 10 min (Data Safety) |
| V41-05 | Friction-only UI fixes | vc41 | 4 | — |
| R41 | vc41 build, gates, staged rollout 10/50/100, ANR watch | vc41 | 4 | 15 min/day |
| V42-01 | Winter Bloom event content | vc42 | 11 | Play card (by Tue 1 Dec) |
| V42-02 | Adventure next to Classic on Home | vc42 | 3 | — |
| V42-03 | Starter pack (only if `offer_tap` ≥ 3%) | vc42 | 7 | price decision, 15 min |
| V42-04 | Arrow Bloom cross-promotion card | vc42 | 3 | confirm Arrow Bloom is live |
| R42 | vc42 build, gates, staged rollout 20/100 | vc42 | 3 | 15 min/day |
| R43 | vc43 hotfix-only rules | vc43 | as needed | — |

**vc41 = about 48 Gemini hours** between Thu 26 Nov and Tue 1 Dec. If that does not fit, cut in this order:
(1) V41-04 inviter reward (Phase B) moves to vc42, (2) the come-back chest in V41-02 moves to vc42.
**vc42 = about 27 hours** (20 without the starter pack).

---

## 2. Findings from the code that change the plan (read before starting)

| # | Finding | Evidence | What to do |
|---|---|---|---|
| A | **The Shop sells a fake "Starter Bloom Pack".** The banner says "LIMITED OFFER · 70% OFF" and "Remove Ads + 200 Gems + 10 Spins", but the button buys only `remove_ads`. It also shows "$1.99" when Play gave no price, and it shows to players who already removed ads. This misleads buyers (Play policy and refund risk). | `ui/screens/ShopScreen.kt:159-161` (calls `vm.removeAds()`), `StarterBloomPackBanner` :300-366 (text at :332, :342, :358); `GameViewModel.removeAds()` :1305-1313 | **Fix in vc40 if it is not shipped yet** (vc40 already touches remove-ads offers). Else V41-05 item F0. |
| B | **The Home "Weekend Cascade +50% coins" strip is hardcoded.** It shows every day with a fake "⏱️ 4h 12m". Deleting `live_events` in Remote Config (issue I1) does not remove it. The top-left "⏱️ 2 days" pill is also fake. On 27 Nov the Aurora Bloom Festival gives coins ×2, but Home will still say "+50%", which will not match the Play promotional card. | `HomeScreen.kt:375` calls `AuroraWeekendStrip()` :1226-1267 (text :1253, :1260); pill text :139. `state.activeEvents` exists but is never shown (`EventsCard` :582 is unused). | **Fix in vc40 if possible** (1 h). Else V41-05 F1/F2. |
| C | **The daily streak is claimed only when the process starts.** A player whose app stays in memory overnight and resumes the next day gets no claim. If they cold-start a day later, the gap is 2 days and the streak resets (unless shielded). Reminders also skip them. | Claim in `GameViewModel` `init` :346-361; `onActivityReady` :420-442 never checks the date. `WinBackPlanner.plan` uses `lastClaimDay` (`WinBack.kt:74`). | V41-02 part 1. |
| D | **play-services-ads 23.x is "Deprecated"** since 17 Feb 2026 and sunsets 30 Jun 2027 (ads "at risk of not serving"). The Kotlin 2 + GMA 24/25 migration planned for February (root `build.gradle.kts:4-11`) is now a hard deadline, not a nice-to-have. | https://developers.google.com/admob/android/deprecation | Ajay: keep the February migration in the plan. Not in vc41/vc42. |
| E | **Adapters must be mid-2024 versions** (the newest that accept play-services-ads 23.2.0). Old adapters for Liftoff, Pangle and Mintegral do not forward GDPR/TCF consent. Pangle US bidding needs adapter 7.2.0.2+. | §V41-01 table; Google mediation pages | Serve Liftoff, Pangle, Mintegral and Meta outside EEA/UK/CH only. AppLovin everywhere. Pangle = "Pangle ROW" only. |
| F | **Ad loads still run on the main thread** after init (vc39). SDK 23.x has the `OPTIMIZE_AD_LOADING` flag OFF by default. | `AdMobAdHost.start()` :93-100; https://developers.google.com/admob/android/optimize-initialization | Turn both OPTIMIZE flags on in V41-01. |
| G | **A versionCode is used up when a build is uploaded.** If vc41 needs a fix before vc42, that fix is versionCode 42 (1.17.1), and Winter Bloom becomes versionCode 43 (1.18.0). | Play rule | Rename the slots, not the content. |
| H | **The interstitial also fires when a player quits a game mid-run** (`goHome()` :828-862 calls `maybeInterstitialThen`). That is friction. | `GameViewModel.kt:844` | Do NOT change it while the interstitial test E1 runs (to 6 Dec). Decide after E1 (vc43 is hotfix-only, so this is a January item). |
| I | **Adventure level starts are not logged.** `startLevel()` :588 sends no `game_start`. | `GameViewModel.kt:588-640` | V42-02 adds it. |
| J | **Our own `ad_impression` event has the same name as the automatic AdMob `ad_impression`** that GA4 logs for linked AdMob apps. Counts mix. | `Analytics.AD_IMPRESSION` (`Analytics.kt:60`), fired in `AdMobAdHost.kt:282-285`, `PersistentBannerManager.kt:77-82` | V41-01 renames ours to `ad_shown` (Ajay to confirm, open question 11). |

---

## 3. vc41 items

### V41-01 AdMob mediation bidding: AppLovin, Liftoff Monetize, Pangle, Mintegral, Meta

**Owner:** Gemini (code, build, app-ads.txt, privacy policy text, Remote Config, tests, Data Safety draft).
Ajay (network accounts, AdMob mediation groups, ad partner lists, test device, Data Safety submit). Ajay's list is in
part H below and in §10.

**Release + day:** vc41 1.17.0. Code Thu 26 Nov to Mon 30 Nov. Ajay's console work Mon 30 Nov (Day 9). Internal
build Tue 1 Dec. Production 10% Wed 2 Dec. Meta is mapped in AdMob only after Meta business verification (no new
release needed: the adapter ships now and stays idle until mapped).

**Goal and metric:** More buyers per ad request, so more fill and higher eCPM.
1. Ad load success = `ad_loaded` ÷ (`ad_loaded` + `ad_failed_to_load`), per `ad_format`. Today about 39%
   (637 ÷ 1,626). Week-2 pass mark: ≥ 60% (roadmap §6).
2. eCPM per format in AdMob (Mediation report), and revenue per Tier-1 active day ≥ ₹3 (Gate B, 9 Dec).
3. Zero new ANR signatures on vc41.
No lift is promised. In Tier-1 the gain comes from price competition; in India and Pakistan from fill.

**Today (file + function):**
- `app/build.gradle.kts:198-207`: only `implementation("com.google.android.gms:play-services-ads:23.2.0")`. The
  comment at :203-206 explains the pin: SDK 24+ needs kotlin-stdlib 2.1 metadata, which Kotlin 1.9.24 cannot read.
- Root `build.gradle.kts:14`: Kotlin plugin 1.9.24.
- `gradle/libs.versions.toml`: does not exist.
- `settings.gradle.kts:16-22`: `FAIL_ON_PROJECT_REPOS`, repositories `google()` and `mavenCentral()` only.
- `monetize/AdMobAdHost.kt`: `initializeOnce()` :122-144 runs `MobileAds.initialize` on a background `Thread` with
  `applicationContext`; `isInitialized` is set only in the callback (:131-133); first loads are posted to main
  after it (:134-138). `start()` :85-120 reloads on resume only when initialized. `loadRewarded()` :146-205 logs
  `ad_requested`, `ad_loaded`, `ad_failed_to_load` with `ad_format`. `loadInterstitial()` :207-230 logs nothing
  (vc40 adds events). `openAdInspector()` :347-362.
- `monetize/PersistentBannerManager.kt` `getOrCreate()` :35-102: banner events with `ad_format=banner`.
- `AndroidManifest.xml:34-43`: AdMob app ID and `DELAY_APP_MEASUREMENT_INIT`. No OPTIMIZE flags. No network
  security config.
- `proguard-rules.pro:17-20`: keep rules for Google Mobile Ads only.
- Ad inspector: tap on the version footer in Settings (`ui/screens/SettingsScreen.kt:226-237`) →
  `GameViewModel.openAdInspector()` :1715-1721.

**Change:**

A. **Adapter versions.** Each is the newest adapter whose POM asks for play-services-ads 23.2.0 or lower (POMs read on
Google Maven, 22 Nov 2026). The next version of each needs 23.3.0+ (AppLovin 12.6.1.0, Liftoff 7.4.1.0, Pangle
6.1.0.9.0, Mintegral 16.8.31.0, Meta 6.18.0.0). Do not take newer ones.

| Network | Artifact | Its play-services-ads | Network SDK it pulls | Extra Maven repo | Bidding formats with this version |
|---|---|---|---|---|---|
| AppLovin | `com.google.ads.mediation:applovin:12.6.0.0` | 23.2.0 | `com.applovin:applovin-sdk:12.6.0` (Maven Central) | none | Interstitial, Rewarded. Not banner (Google's table says bidding has no banner) |
| Liftoff Monetize (Vungle) | `com.google.ads.mediation:vungle:7.4.0.1` | 23.2.0 | `com.vungle:vungle-ads:7.4.0` + okhttp 4.10.0, kotlinx-serialization 1.4.1, kotlin-stdlib-jdk8 1.8.20 | none | Banner, Interstitial, Rewarded (bidding needs ≥ 7.3.0.0: OK) |
| Pangle | `com.google.ads.mediation:pangle:6.1.0.7.0` | 23.2.0 | `com.pangle.global:ads-sdk:6.1.0.7` (+ crash_monitor, gecko, androidx.browser 1.6.0-alpha02) | `https://artifact.bytedance.com/repository/pangle/` | "Pangle ROW" only (ROW needs ≥ 5.5.0.4.0: OK; "Pangle US" needs ≥ 7.2.0.2: NOT OK) |
| Mintegral | `com.google.ads.mediation:mintegral:16.8.11.0` | 23.2.0 | `com.mbridge.msdk.oversea:{mbbid,reward,mbnative,mbbanner,newinterstitial,mbsplash}:16.8.11` | `https://dl-maven-android.mintegral.com/repository/mbridge_android_sdk_oversea` | Banner, Interstitial, Rewarded (bidding needs ≥ 16.5.91.1: OK) |
| Meta Audience Network | `com.google.ads.mediation:facebook:6.17.0.0` | 23.0.0 (resolves to 23.2.0) | `com.facebook.android:audience-network-sdk:6.17.0` (Maven Central) | none | Banner, Interstitial, Rewarded (bidding only) |

Sources: `https://dl.google.com/dl/android/maven2/com/google/ads/mediation/<name>/<version>/<name>-<version>.pom`;
Google pages `https://developers.google.com/admob/android/mediation/{applovin,liftoff-monetize,pangle,mintegral,meta}`
(opened 22 Nov 2026). Pangle SDK 6.1.0.7 and Mintegral 16.8.11 POMs were found on their own repos the same day.

B. **`app/build.gradle.kts`**, replace line 207 and add the adapters below it:
```kotlin
// play-services-ads is pinned STRICTLY: no adapter may pull it above 23.2.0 (Kotlin 1.9.24, see comment above).
implementation("com.google.android.gms:play-services-ads") { version { strictly("23.2.0") } }

// ── Mediation (vc41). Newest adapters whose POM asks for play-services-ads <= 23.2.0 (Google Maven, 22 Nov 2026).
// Next versions need 23.3.0+. Upgrade all of them together with the Kotlin 2 / GMA 24 migration.
implementation("com.google.ads.mediation:applovin:12.6.0.0")
implementation("com.google.ads.mediation:vungle:7.4.0.1")        // Liftoff Monetize
implementation("com.google.ads.mediation:pangle:6.1.0.7.0")
implementation("com.google.ads.mediation:mintegral:16.8.11.0") {
    exclude(group = "org.jacoco")  // the adapter POM declares org.jacoco.core 0.8.8 as a compile dependency
}
implementation("com.google.ads.mediation:facebook:6.17.0.0")     // Meta: mapped in AdMob only after verification
```
If Mintegral throws `NoClassDefFoundError` for `org.jacoco` in the test (part G), remove the exclude and note it.

C. **`settings.gradle.kts`**, inside `dependencyResolutionManagement.repositories`, after `mavenCentral()`:
```kotlin
maven {
    url = uri("https://artifact.bytedance.com/repository/pangle/")
    content { includeGroup("com.pangle.global") }
}
maven {
    url = uri("https://dl-maven-android.mintegral.com/repository/mbridge_android_sdk_oversea")
    content { includeGroup("com.mbridge.msdk.oversea") }
}
```
The `content` filters stop these two repos from serving any other library.

D. **`AndroidManifest.xml`**, inside `<application>`:
```xml
<!-- vc41: move ad init and ad-load work off the main thread (default OFF before SDK 24). Incident #001 follow-up. -->
<meta-data android:name="com.google.android.gms.ads.flag.OPTIMIZE_INITIALIZATION" android:value="true" />
<meta-data android:name="com.google.android.gms.ads.flag.OPTIMIZE_AD_LOADING" android:value="true" />
```
- Do **not** add `applovin.sdk.key`. Google's AppLovin changelog (12.1.0.0): "Adapter no longer checks for the
  AppLovin SDK key from the AndroidManifest.xml file." The key goes into the AdMob mapping (Ajay).
- Meta on Android 9+ caches media through `127.0.0.1`. Google's Meta page says to "update the network security
  configuration" per Meta's docs. Add `res/xml/network_security_config.xml` that permits cleartext ONLY for the domain
  `127.0.0.1`, and set `android:networkSecurityConfig="@xml/network_security_config"` on `<application>`. The exact
  XML is UNVERIFIED: copy it from Meta's Audience Network Android setup page, not from memory.
- After the release build, diff the merged manifest
  (`app/build/intermediates/merged_manifests/release/.../AndroidManifest.xml`) against vc40. List every new
  permission, activity, provider and receiver in the journal. If any SDK adds a location, phone, contacts or
  storage permission, remove it with `tools:node="remove"` and test that ads still load.

E. **Initialization** (`AdMobAdHost.initializeOnce()`), keep the Incident #001 structure exactly. Add:
1. New reader `AdsConfig.mediationEnabled()` for RC `ads_mediation_enabled` (default true).
2. On the same background thread, before `MobileAds.initialize`: if `mediationEnabled()` is false, call
   `MobileAds.disableMediationAdapterInitialization(appContext)`. This is the in-app kill switch. It works from
   the next cold start.
3. In the completion callback, for each entry of `initStatus.adapterStatusMap`, log the class name, state and
   latency (`Log.i`), and send ONE analytics event per adapter per process: `ad_adapter_init`.
4. Do not call any network SDK directly (no `AppLovinSdk`, `PAGSdk`, `MBridgeSDK`, `VungleAds` calls). The
   adapters initialize their own SDK. This keeps third-party classes out of our Kotlin code and our lifecycle.
5. Loads still wait for `isInitialized`. With mediation, the callback comes only after the adapters finish (or time
   out), so the first rewarded ad may be ready a few seconds later. vc40's "ready-only" buttons handle that.

F. **R8 / ProGuard.** Google's adapter pages list no rules. Network SDKs ship their own consumer rules in the AAR
(Pangle says so for SDK 3.6.0.0+). Steps:
1. For each of the 5 SDK AARs in the Gradle cache, confirm `proguard.txt` exists. Note the result.
2. Build release with R8. If R8 writes `app/build/outputs/mapping/release/missing_rules.txt`, copy those
   `-dontwarn` lines into `proguard-rules.pro` under a `# Mediation (vc41)` header. Only those lines.
3. In `mapping.txt`, check these adapter classes keep their names (GMA loads them by name):
   `com.google.ads.mediation.applovin.AppLovinMediationAdapter`, `com.google.ads.mediation.vungle.VungleMediationAdapter`,
   `com.google.ads.mediation.pangle.PangleMediationAdapter`, `com.google.ads.mediation.mintegral.MintegralMediationAdapter`,
   `com.google.ads.mediation.facebook.FacebookMediationAdapter`. If one is renamed, add a narrow
   `-keep class <that class> { *; }`. Never add package-wide keeps "just in case".

G. **Analytics in ad code.**
1. `ad_loaded`: add param `ad_source` = `ad.responseInfo.loadedAdapterResponseInfo?.adSourceName ?: "unknown"`
   for rewarded, interstitial (vc40 events) and banner (`AdView.responseInfo` in `onAdLoaded`).
2. Rename our own impression event from `ad_impression` to `ad_shown` (same params). Reason: finding J. Update
   `Analytics.kt:60`, `AdMobAdHost.kt:282-285`, `PersistentBannerManager.kt:77-82` and the vc40 interstitial event if
   it reuses the name. (Ajay confirms, open question 11. If he says no, skip this step.)

H. **Consoles (Ajay, Mon 30 Nov).** Full click list in §10. Summary:
1. Accounts: AppLovin, Liftoff Monetize, Pangle, Mintegral. Meta only after verification.
2. Payment and tax: only for a network that AdMob marks **"direct pay"** when you add it. Google: "Revenue from
   most bidding ad sources will be paid through AdMob" (https://support.google.com/admob/answer/9360574).
3. AdMob mediation groups (5 groups, no floors):

| Group | Format / ad unit | Locations | Bidding sources |
|---|---|---|---|
| BB-Banner-ROW | Banner `ca-app-pub-1693732810683011/3081693900` | All, excluding EEA + UK + CH | Liftoff, Mintegral, Pangle ROW, (Meta later) |
| BB-Inter-ROW | Interstitial `.../5516285554` | All, excluding EEA + UK + CH | AppLovin, Liftoff, Mintegral, Pangle ROW, (Meta later) |
| BB-Reward-ROW | Rewarded `.../7020938918` | All, excluding EEA + UK + CH | AppLovin, Liftoff, Mintegral, Pangle ROW, (Meta later) |
| BB-Inter-EEA | Interstitial `.../5516285554` | EEA + UK + CH | AppLovin |
| BB-Reward-EEA | Rewarded `.../7020938918` | EEA + UK + CH | AppLovin |

Why the split: AppLovin adapter 12.0.0.0+ passes UMP GDPR consent. Liftoff only from 7.4.1.0, Pangle from
7.9.0.9.0, Mintegral from 17.1.61.1 (Google pages). Our versions are older, so those networks must not serve
EEA/UK/CH users. Meta is not on the IAB vendor list. Whether AdMob location targeting supports "exclude" is
UNVERIFIED; if not, list the ROW countries by hand. Banner in EEA stays AdMob-only (no group needed).
4. AdMob Privacy & messaging: add "AppLovin Corp." to the European regulations ad partners. Add AppLovin Corp.,
   Liftoff, Pangle DSP, Mobvista/Mintegral and Meta to the US state regulations ad partners (names as on the Google
   pages). Needs Account Management permission.
5. Add Gemini's test phone as an AdMob test device (ad inspector "launches only on test devices",
   https://developers.google.com/admob/android/ad-inspector).
6. Send Gemini each network's app-ads.txt lines (they are public, not secret). Never paste SDK keys into chat.

I. **app-ads.txt and privacy.** Gemini appends each network's lines to `https://ajay-waghmare.github.io/app-ads.txt`,
keeps the AdMob line, checks HTTP 200. Gemini adds the 5 networks to the privacy policy partner list
(`store/privacy-policy.html` and the hosted copy). Gemini drafts the Data Safety changes from each network's published
Play data-safety guidance (UNVERIFIED which categories change); Ajay submits them in Play Console **before Wed 2 Dec**.

**Remote Config (key, type, default, kill switch):**

| Key | Type | Default | Kill switch |
|---|---|---|---|
| `ads_mediation_enabled` | Boolean | true | false = adapters are not initialized from the next cold start (`disableMediationAdapterInitialization`) |

Faster per-network switch: Ajay turns the ad source off in the AdMob mediation group (server side, no release).

**Analytics:**
- New `ad_adapter_init` {`adapter` (applovin, vungle, pangle, mintegral, facebook, admob), `state` (READY or NOT_READY), `latency_ms`}. Once per adapter per process.
- `ad_loaded` gets `ad_source`. Rename `ad_impression` (ours) → `ad_shown`.
- GA4 report for Gemini's daily KPI: ad load success by `ad_format` × `ad_source` × country.

**Edge cases:**
1. A network has no mapping yet: its adapter stays idle. No harm, no release needed later.
2. Pangle/Mintegral app review not finished: the source returns no bids. Normal.
3. Adapter init hangs: the completion callback waits for a timeout; ads start later; game stays playable.
4. Low-end Android 8 phone (minSdk 26; adapters need API 24+): OK.
5. Ads removed (`remove_ads`): no interstitials and no banner, rewarded stays opt-in. Unchanged.
6. EEA user: only AdMob + AppLovin fill (group split).
7. App size grows by several MB. Measure, do not guess (acceptance 8).

**Acceptance criteria:**
1. `dependencyInsight` shows play-services-ads 23.2.0 and kotlin-stdlib 1.9.24 at most on `releaseRuntimeClasspath`.
2. Release build passes with R8 and resource shrinking on (`app/build.gradle.kts:101-102` unchanged).
3. The 5 adapter classes keep their names in `mapping.txt`.
4. Merged manifest: no new dangerous permission; the two OPTIMIZE flags present; no AppLovin key.
5. Cold start with airplane mode, then network on: no ANR, no crash, game playable at once.
6. Ad inspector on the internal-track build: every network already mapped shows its adapter READY and passes
   "single ad source testing" for each format it supports.
7. `ad_adapter_init` and `ad_loaded.ad_source` visible in GA4 DebugView.
8. AAB size and Play download size recorded in the journal (vc40 vs vc41).
9. Play Console shows no SDK warning for the new SDK versions after the internal upload (Play blocks SDK
   versions with critical issues: https://support.google.com/googleplay/android-developer/answer/10358880, not opened).
10. app-ads.txt returns 200 with all lines; Data Safety submitted by Ajay.

**Test steps:**
1. `./gradlew :app:dependencyInsight --dependency play-services-ads --configuration releaseRuntimeClasspath`, same for `kotlin-stdlib`.
2. `./gradlew :app:bundleRelease` then check `mapping.txt` and `missing_rules.txt`.
3. Debug build on a test device: StrictMode thread policy `detectAll().penaltyLog()` in debug only; open and
   resume the app 20 times; no StrictMode violation from our code on the main thread in `onResume`.
4. Internal track build on 2 phones (one Android 8-10 low-end, one Android 14+). Add each as AdMob test device.
5. Open ad inspector (Settings → version footer, see V41-05 F6). For each mapped network: single ad source
   testing → load rewarded, interstitial, banner. Record pass or fail per network per format in the journal.
6. Turn `ads_mediation_enabled` false in a debug-app RC condition, cold start twice, check the log shows no
   adapter init. Turn it back.

**Risk and rollback:**
- Risk: a third-party SDK causes an ANR or crash at init (the Incident #001 class of bug). Mitigation: staged
  10/50/100 (R41), OPTIMIZE flags, kill switches.
- Risk: old SDK versions get flagged by Play. Mitigation: acceptance 9 before 10%.
- Risk: Data Safety mismatch. Mitigation: Ajay submits before 10%.
- Rollback order: (1) Ajay turns off the network in AdMob groups (minutes); (2) Gemini sets
  `ads_mediation_enabled=false` (next cold start); (3) halt the rollout (R41); (4) fix in the next versionCode.
  Never use `min_supported_version_code` for this.

**Effort (hours):** 10 (dependencies and repos 1, manifest and init 1.5, analytics 1, R8 and release checks 1.5,
ad inspector tests 2, app-ads.txt / privacy / Data Safety draft 1.5, journal 0.5). Ajay about 3 h.

---

### V41-02 Daily loop on Home: Daily Challenge card, streak ladder (day 1/3/7), come-back chest

**Owner:** Gemini.

**Release + day:** vc41. Code Fri 27 Nov to Sun 29 Nov.

**Goal and metric:** Give every player a reason to open the app tomorrow.
1. Day-1 return ≥ 28% for installs of 3-5 Dec (Gate B, 9 Dec).
2. Share of DAU who play the daily challenge (`game_start` mode=daily ÷ DAU), before vs after.
3. Share of `streak_claimed` events with day ≥ 3.

**Today (file + function):**
- `ui/screens/HomeScreen.kt` `AuroraDailyChallengeCard` :1003-1133, called at :356-361. Problems: "DAILY CHALLENGE"
  hardcoded (:1040); shows "Score N" for every goal type, so LINES, COMBO and MULTI_CLEAR days show a wrong
  objective (:1049); fake timer "15h 22m" (:1080); fake fallbacks 0.58 / 700 / 220 / 2 when data is missing
  (:1010-1012, :1061, :1068); the `streak` parameter is never used.
- The unused old `DailyChallengeCard` :611-731 already uses `ch.title(context)` and share. Reuse its logic.
- `DailyRewardDialog` :1538-1619: day number and coins only.
- Streak claim: `GameViewModel` `init` :346-361 → `GamePrefs.claimDailyIfDue()` :155-163 →
  `StreakRules.advance()` :25-36. Reward `StreakRules.rewardFor()` :39-42 = 50 + 25 per day, capped at day 7 (200).
- Day rollover: `ensureQuests()` and `ensureChallenge()` :1903-1911 run only in `init` and `beginRun()`.
- `dailyShareText()` :1977-1997.

**Change:**
1. **Day-rollover fix (finding C).** Move the claim block from `init` (:346-361) into a new
   `private fun rolloverDayIfNeeded()`. It does: `ensureQuests()`, `ensureChallenge()`, `claimDailyIfDue(today)`,
   the event DAILY_DOUBLE bonus, then updates `dailyReward`, `dailyStreak`, `dailyChallenge`, `quests`,
   `activeEvents` in state. Call it from `init` and from `onActivityReady()` right after `refreshUpdateGate()`.
   Only `SharedPreferences` (in memory, writes use `apply`) is touched, so it is safe in `onResume`. Add param
   `trigger` = "launch" or "resume" to `streak_claimed`.
2. **Daily Challenge card.** Rewrite `AuroraDailyChallengeCard` content:
   - Label `R.string.daily_challenge_2`. Objective `cp.challenge.short(context)`. Real reward numbers from `cp`.
   - Real time left until local midnight (`LocalDate.now().plusDays(1).atStartOfDay()`), refreshed by a
     1-minute `LaunchedEffect` ticker. Format "5h 12m" with a new string.
   - When `cp == null`: do not draw fake numbers. Draw the card frame with the label only.
   - When done: green check, "Back tomorrow" (`R.string.completed_back_tomorrow` exists) and a share icon
     (`vm.dailyShareText()`, `vm.onShared("daily_card")`).
   - Under the objective: the **streak ladder** row (part 3), compact.
3. **Streak ladder (day 1 / 3 / 7).** Pure rules in `StreakRules` (unit-tested):
   - `ladderPosition(streak) = ((streak - 1) % 7) + 1` (1..7). Day 8 starts a new ladder at position 1.
   - `milestoneFor(streak)`: position 3 → +2 gems; position 7 → +5 gems and +1 Hammer. Others → none.
     Coins stay as `rewardFor()` today.
   - Granted inside `rolloverDayIfNeeded()` right after the claim: `wallet.earn(GEMS, …, TxReason.DAILY_STREAK,
     "milestone:<pos>")`; the Hammer through the existing lifeline inventory (`economy` / `lifelineInv`).
   - UI: 7 pips; pips 1, 3, 7 have an icon (coin, gem, chest); pips done are filled; today is highlighted.
     Shown in `DailyRewardDialog` (big) and on the card (small). When the shield is ready (streak ≥ 7),
     keep the existing shield note (:1569-1580).
4. **Come-back chest.** When a claim restarts the streak after a gap (player was away):
   - Rule (pure, in `StreakRules`): `isComeback(lastClaimDay, today)` = `lastClaimDay >= 0` and
     `today - lastClaimDay >= 2` and the claim did not use the shield. First-ever claim is never a comeback.
   - Reward: 150 coins + 1 random lifeline (reuse `grantRandomLifeline()` :1370), no ad needed.
   - Cap: once per 7 days (`prefs.lastComebackDay`).
   - UI: inside `DailyRewardDialog`, a "Welcome back" block above the coins. One dialog, not two.
   - Needs `GamePrefs.DailyResult` to carry `gapDays` and `previousStreak` (extend the data class; keep defaults).
5. Strings (7 locales): card time-left format, "Day %1$d of 7", "Welcome back!", milestone labels.

**Remote Config (key, type, default, kill switch):**

| Key | Type | Default | Kill switch |
|---|---|---|---|
| `daily_loop_enabled` | Boolean | true | false = no milestone gems, no come-back chest, ladder hidden. The card fixes and the rollover fix stay (they are bug fixes). |

**Analytics:**
- `streak_claimed` + `trigger` (launch, resume) + `ladder_pos`.
- New `streak_milestone` {`day` (3 or 7), `gems`, `item`}.
- New `comeback_chest` {`gap_days`, `prev_streak`}.
- New `daily_card_tap` {`state` (open, done)}.

**Edge cases:**
1. App open across midnight, then resumed: claim happens on resume (part 1). The dialog shows on Home only.
2. Player is in a game at resume: claim happens, dialog waits until they go Home (it renders in `HomeScreen`).
3. Clock moved backwards: `advance()` returns null for the same day; a past day gives gap ≤ 0 → treat as no claim
   (add a guard: `today < lastClaimDay` → return null).
4. Shield used (gap 2, streak ≥ 7): not a comeback; streak continues.
5. Time zone change: uses `LocalDate.now()` like today. Accept.
6. First launch: no comeback, no milestone (day 1).
7. `daily_loop_enabled` flips mid-day: next claim follows the new value.

**Acceptance criteria:**
1. Resume after midnight (process alive) claims the new day once; no double claim on later resumes.
2. The card shows the correct objective text for all 4 goal types (test with 4 epoch days, one per goal).
3. No hardcoded English or fake numbers left in `AuroraDailyChallengeCard`.
4. Day 3 and day 7 grant the milestone once; day 10 is position 3 again and grants again.
5. Come-back chest: away 2+ days → chest once; again within 7 days → none.
6. Unit tests added in `StreakRulesTest.kt` for `ladderPosition`, `milestoneFor`, `isComeback`, backwards clock.
7. `daily_loop_enabled=false` hides ladder and chest; rollover fix still works.

**Test steps:**
1. Run `./gradlew :app:testReleaseUnitTest`.
2. On a debug build, set the device date forward 1 day without killing the app, resume: dialog appears on Home.
3. Use a debug-only menu (or `adb` prefs edit on the debug app) to set `daily_streak=2`, `last_claim_epoch_day=today-1`;
   relaunch → day 3 milestone. Then `last_claim_epoch_day=today-3` → come-back chest.
4. Check DebugView for the 4 events.

**Risk and rollback:** Economy inflation is small (max 7 gems a week). Risk: a dialog on resume interrupts. It
shows only on Home. Rollback: `daily_loop_enabled=false`.

**Effort (hours):** 9 (rollover fix 1.5, card 2, ladder 2.5, come-back chest 1.5, strings and tests 1.5).

---

### V41-03 Reminders v2: one local reminder a day, at the player's usual hour, only when the streak is at risk

**Owner:** Gemini. (Experiment E5 set-up in Firebase A/B Testing: Gemini. Reading it: Gemini, decision Ajay.)

**Release + day:** vc41. Code Sat 28 Nov to Sun 29 Nov. E5 starts Sat 5 Dec (Day 14) when vc41 is at 100%; read
Thu 17 Dec (Day 26; roadmap says Day 24, but there will be too few opens before).

**Goal and metric:**
1. `reminder_opened` ÷ `reminder_shown` (open rate) per variant.
2. Day-1 return of players who got a reminder vs those who did not (descriptive only; not causal).
3. Guardrail: notification-permission revokes not up (Android vitals; and fewer uninstalls).

**Today (file + function):**
- `engagement/WinBack.kt`: `WinBackPlanner.plan()` :57-101 plans up to 2 alarms at a fixed `HOUR = 19` (:52):
  STREAK_GUARD (streak ≥ 2, claimed today, no shield) or DAILY_CHALLENGE, plus WIN_BACK after 3 days (:96-99).
  `WinBackScheduler.reschedule()` :107-124 (inexact `setAndAllowWhileIdle`), `cancelAll()` :126-132,
  `WinBackReceiver.onReceive()` :152-190 (checks setting and POST_NOTIFICATIONS, resolves strings at fire time).
- Called from `GameViewModel.onActivityPaused()` :444-452 (reschedule at :451) and `onActivityReady()` (cancel at :431).
- Texts: `notif_streak_title` "Your %1$d-day streak ends tonight", `notif_streak_text` "One quick round keeps it
  alive." (`res/values/strings.xml:251-252`).
- Opens are logged: `NotificationIntent` + `GameViewModel.onNotificationOpened()` :476-478.

**Change:**
1. **Usual play hour.** On each `onActivityReady()` where the previous pause was more than 30 minutes ago, append
   the local hour (0-23) to `prefs.playHoursCsv` (keep the last 14). Pure function
   `WinBackPlanner.usualHour(hours: List<Int>): Int` = the most frequent hour; ties → the most recent; fewer than 3
   samples → 19; clamp to 9..21 (no early-morning or late-night alerts).
2. **Streak at risk.** New pure planner `WinBackPlanner.planV2(nowMillis, zone, enabled, streak, lastClaimDay,
   freezeAvailable, hour)`. Returns at most ONE notice:
   - only if `enabled`, `streak >= 1`, `lastClaimDay == today` (claimed today) and `!freezeAvailable`;
   - trigger = tomorrow at `hour:00` local (`today.plusDays(1).atTime(hour, 0)`), kind STREAK_GUARD;
   - otherwise nothing (no daily-challenge reminder, no 3-day win-back).
   Note: streak ≥ 1 (not ≥ 2 as today) so a brand-new player gets the day-2 reminder. Ajay to confirm (open question 6).
3. **Mode switch.** `WinBackScheduler.reschedule()` picks the planner from RC `reminder_mode`:
   "streak_only" → `planV2`; "legacy" → today's `plan()`; "off" → nothing. Keep all 3 `Kind` values in the enum
   so `cancelAll()` still cancels alarms armed by older builds.
4. **Two texts (E5).** Keep both variants as string resources, so all 7 languages work:
   - A (control): `notif_streak_title` / `notif_streak_text` (unchanged).
   - B: plurals `notif_streak_title_b` (one: "%1$d day in a row. Keep it going?", other: "%1$d days in a row. Keep it
     going?") and `notif_streak_text_b` "A 1-minute puzzle saves your streak. No rush." (content-pack §4).
   - RC `reminder_variant` ("A" or "B") chooses. Put `variant` into the alarm extras. The receiver resolves B's
     title with `getQuantityString` (add an extra flag for plurals).
   - Why not raw text in Remote Config: Remote Config text would be English only and could not be pluralized.
5. **Receiver.** In `WinBackReceiver.onReceive()`, after posting: log `reminder_shown` through `Analytics.create(context)`.
   Put `variant` into the open intent so `reminder_opened` gets a `variant` param.

**Remote Config (key, type, default, kill switch):**

| Key | Type | Default | Kill switch |
|---|---|---|---|
| `reminder_mode` | String | "streak_only" | "off" = no reminders; "legacy" = vc40 behaviour |
| `reminder_variant` | String | "A" | "A" = control text. E5: Firebase A/B experiment 50/50 on this key, app version ≥ 1.17.0 |

**Analytics:**
- New `reminder_scheduled` {`kind`, `hour`, `variant`, `streak`}.
- New `reminder_shown` {`kind`, `variant`} (from the receiver).
- `reminder_opened` + `variant`.

**Edge cases:**
1. Shield ready (streak ≥ 7, unused): no reminder (the player is protected; content-pack §4 rule).
2. Permission denied or Settings toggle off: receiver posts nothing (unchanged) and logs nothing.
3. Player opens the app before the reminder: `cancelAll()` on resume removes it (unchanged).
4. Usual hour already passed when the alarm is armed: impossible, the alarm is always for tomorrow.
5. DST change: `atZone` handles it. Travel: the alarm keeps its absolute time. Accept.
6. Doze: delivery can be late (inexact alarm). Accept.
7. Hours around midnight (23 and 0) count as different hours; clamping to 21 and 9 covers it. Accept.
8. A vc40 alarm already armed when vc41 installs: first `onActivityReady` cancels all kinds.

**Acceptance criteria:**
1. At most one alarm is armed at any time in "streak_only" mode.
2. No alarm when streak = 0, when not claimed today, or when the shield is ready.
3. Alarm time = tomorrow at the usual hour, clamped 9..21; default 19 with fewer than 3 samples.
4. "legacy" gives exactly vc40 behaviour; "off" arms nothing.
5. Variant B shows the plural title correctly for 1 and for 5 days, in English and German.
6. Unit tests in `WinBackPlannerTest.kt` for `usualHour` (ties, clamp, few samples) and `planV2` (all branches).

**Test steps:**
1. Unit tests.
2. Debug build: set a debug-only RC condition for the debug app (`com.aweagle.blockbloom.debug` is its own
   Firebase app in `google-services.json`) with `reminder_variant=B`. Background the app; check with
   `adb shell dumpsys alarm | findstr blockbloom` that one alarm exists at the right time.
3. Set the device clock to 1 minute before the alarm; see the notification; tap it; check DebugView for
   `reminder_shown` and `reminder_opened` with `variant`.

**Risk and rollback:** Fewer reminders overall (the win-back and challenge reminders stop), which could lower
returns of lapsed players. Rollback: `reminder_mode=legacy`. E5 itself is low risk.

**Effort (hours):** 6 (usual hour 1.5, planner 1.5, mode + variants + strings 1.5, receiver analytics 0.5, tests 1).

---

### V41-04 Referral: score card image + Play install referrer link; both players rewarded; abuse limits

**Owner:** Gemini (code; Firebase Auth/Firestore set-up and rules for Phase B). Ajay: Data Safety update if Phase B
ships.

**Release + day:** vc41. Phase A (share card, link, friend reward) Sat 28 Nov to Mon 30 Nov. Phase B (inviter reward,
needs a small backend) Mon 30 Nov to Tue 1 Dec **if time allows; otherwise it moves to vc42** (open question 3).
The code for Phase B ships behind `referral_inviter_reward_enabled=false` and is switched on only after test.

**Goal and metric:**
1. Free Tier-1 installs: GA4 `first_open` with source `referral` (campaign `invite_v1`) per week.
2. Share rate: `share_result` per game over, before vs after (the image should lift it).
3. Friend reward rate: `referral_friend_reward` ÷ referral `first_open`.
Honest size: with about 60-100 DAU this brings single-digit installs a week. It is cheap and compounding, not a
growth engine.

**Today (file + function):**
- Share on game over: `ui/screens/Dialogs.kt:546-547` and `:583-584` call `shareText(shareCtx, vm.scoreShareText())`.
- `ui/Share.kt` `shareText()` :116-126 (text only, ACTION_SEND text/plain).
- `engagement/ShareText.forScore()` :89-95 builds "Score N ... Can you beat it? <store link>"
  (`STORE_LISTING_WEB`, `ui/screens/SettingsScreen.kt:105`). No referrer.
- `GameViewModel.onShared()` :1816-1818 logs `share_result` {where}.
- First game finished: `triggerGameOver()` :1137-1167 logs `first_game_over` when `prefs.gamesPlayed == 1` (:1148).
- No install-referrer code, no Firebase Auth or Firestore in `app/build.gradle.kts:230-235`.
- `TxReason.REFERRAL_BONUS` already exists (`data/Ledger.kt:16`).

**Change:**

Phase A (no backend):
1. **Referral code.** On first share, create an 8-character code from `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` with
   `SecureRandom`. Save in `prefs.referralCode`. Never changes for this install.
2. **Link.** Pure helper `ReferralLink.build(code)` =
   `https://play.google.com/store/apps/details?id=com.aweagle.blockbloom&referrer=` + URL-encoded
   `utm_source=referral&utm_medium=share&utm_campaign=invite_v1&ref=<CODE>`. Firebase reads the `utm_*` values from
   the install referrer for GA4 attribution (Gemini checks this in DebugView after one test install; UNVERIFIED for
   this app). `ref` is ours.
3. **Score card image.** New `ui/ShareCard.kt`: draw a 1080×1350 PNG with `android.graphics.Canvas` (Compose 1.6.8
   from BoM 2024.06.00 has no layer-to-bitmap API). Content: brand gradient, "Block Bloom" wordmark, the score
   (big), "New best!" if `ShareText.isNewBest()`, a mini 8×8 board drawn from the final `state.board` colour indices
   with the current skin colours, footer "Free on Google Play". All text from string resources. Draw on
   `Dispatchers.Default`; write to `cacheDir/share/score.png` on `Dispatchers.IO`; overwrite each time.
4. **Share intent.** `FileProvider` (`androidx.core.content.FileProvider`, already in core): authority
   `${applicationId}.fileprovider`, `res/xml/share_paths.xml` with `<cache-path name="share" path="share/"/>`,
   provider entry in the manifest (`exported=false`, `grantUriPermissions=true`). Intent: ACTION_SEND, type
   `image/png`, EXTRA_STREAM = content URI, EXTRA_TEXT = share text with the link, `ClipData` set,
   `FLAG_GRANT_READ_URI_PERMISSION`. If anything fails, fall back to today's text-only `shareText()`.
5. **Share text** (new strings, 7 locales). Phase A: "I scored %1$s in Block Bloom. Can you beat it? Install with
   my link and get a welcome gift: %2$s". Phase B on: "…and we both get a gift: %2$s". Never promise the inviter
   reward while it is off.
6. **Read the referrer once (friend's phone).** On the first launch only (`prefs.referrerChecked`), in
   `BlockBloomApp` or the ViewModel `init`, start `InstallReferrerClient` (`com.android.installreferrer:installreferrer:2.2`,
   Java, no dependencies). In `onInstallReferrerSetupFinished(OK)`, call `getInstallReferrer()` on a background
   executor (it is a synchronous IPC call; Google says to call the API only once, the first time the app runs
   after install: https://developer.android.com/google/play/installreferrer/library), then `endConnection()`.
   Parse `ref` with a pure `ReferralLink.parseCode(referrer)`. Save `prefs.pendingRefCode` and
   `prefs.referrerClickToInstallSec` = `installBeginTimestampSeconds - referrerClickTimestampSeconds`.
7. **Friend reward.** When the friend finishes a first game (first `triggerGameOver()` or first `finishLevel()`),
   and all abuse checks pass (below), grant 200 coins + 1 Hammer with `TxReason.REFERRAL_BONUS`, toast
   "Welcome gift from your friend!", set `prefs.referralFriendRewarded=true`.

Phase B (inviter reward; Firebase Auth anonymous + Cloud Firestore, both from the existing BoM 33.7.0:
`firebase-auth` 23.1.0 and `firebase-firestore` 25.1.1 pull kotlin-stdlib 1.7.10 and 1.8.22 only, checked on
Google Maven 22 Nov):
8. Firebase console (Gemini): enable Anonymous sign-in; create Firestore (Spark plan is enough; no Cloud
   Functions); deploy these rules (no other collections are opened):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    match /ref_codes/{code} {
      allow get: if request.auth != null;
      allow create: if request.auth != null
        && code.matches('^[A-HJ-NP-Z2-9]{8}$')
        && request.resource.data.keys().hasOnly(['owner', 'createdAt'])
        && request.resource.data.owner == request.auth.uid
        && request.resource.data.createdAt == request.time;
      allow update, delete: if false;
      match /joins/{friendUid} {
        allow create: if request.auth != null
          && friendUid == request.auth.uid
          && get(/databases/$(db)/documents/ref_codes/$(code)).data.owner != request.auth.uid
          && request.resource.data.keys().hasOnly(['createdAt', 'claimed'])
          && request.resource.data.createdAt == request.time
          && request.resource.data.claimed == false;
        allow get, list: if request.auth != null
          && get(/databases/$(db)/documents/ref_codes/$(code)).data.owner == request.auth.uid;
        allow update: if request.auth != null
          && get(/databases/$(db)/documents/ref_codes/$(code)).data.owner == request.auth.uid
          && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['claimed'])
          && request.resource.data.claimed == true;
        allow delete: if false;
      }
    }
  }
}
```
9. Inviter, on first share with Phase B on: anonymous sign-in, then create `ref_codes/<code>` {owner, createdAt}.
   On a collision (create denied), make a new code and retry once.
10. Friend, after the friend reward (step 7): anonymous sign-in, create `ref_codes/<code>/joins/<friendUid>`
    {createdAt, claimed=false}. Fire and forget; retry on the next 2 launches if it failed.
11. Inviter, on resume at most once every 6 hours: query `joins` where `claimed == false` (limit 10). For each:
    update `claimed=true`; ONLY if that update succeeds, grant 300 coins + 5 gems (`TxReason.REFERRAL_BONUS`,
    ref = friendUid), stop at the caps. Toast "A friend joined! +300 coins +5 gems".
12. All Firebase calls are async Tasks; nothing waits on the main thread. Offline = try next time.

Abuse limits:
- Friend reward needs ALL: a valid code; code ≠ own code; `prefs.referralFriendRewarded == false`;
  click-to-install ≤ 7 days; first game finished within 7 days of first launch.
- Inviter: cap `referral_inviter_cap` (default 5) lifetime per install, and at most 2 per day (client side).
- Rules allow one join per friend account and one claim per join; a friend cannot join their own code.
- Rewards are soft currency with no cash value, so reinstall farming gains little. Play Integrity / App Check is
  not in scope (note for later).

**Remote Config (key, type, default, kill switch):**

| Key | Type | Default | Kill switch |
|---|---|---|---|
| `referral_enabled` | Boolean | true | false = plain store link, no image card change, no friend reward |
| `referral_inviter_reward_enabled` | Boolean | false | stays false until Phase B is tested; false = no Firebase Auth/Firestore calls at all |
| `referral_inviter_cap` | Long | 5 | 0 = no inviter rewards |

**Analytics:**
- `share_result` + `has_image` (true/false) + `has_ref` (true/false).
- New `referral_install` {`code_valid`, `click_to_install_h`} (once, first launch).
- New `referral_friend_reward` {}.
- New `referral_join_sent` {`ok`}.
- New `referral_inviter_reward` {`total`}.

**Edge cases:**
1. Link opened on a desktop browser: Play may drop the referrer. The install still counts in Play, no gift.
2. Organic install (no referrer): nothing happens.
3. Friend installed more than 90 days after click: referrer not available (Google). Nothing happens.
4. Friend uninstalls before the first game: no reward, no join.
5. Inviter reinstalled: new code; old joins stay unclaimed forever. Accept.
6. Two friends join the same day: 2 rewards (daily cap 2).
7. Share target accepts only text: the text with the link still goes.
8. Low storage: PNG write fails → text-only fallback.
9. Firestore down or blocked: no inviter reward until it works; game unaffected.

**Acceptance criteria:**
1. Game over → Share opens the sheet with the image and text; the link carries `ref=<own code>`.
2. Image looks right in 3 skins and 2 languages (en, de); no text cut off.
3. A test install through the link (internal testing track, test account) stores the code and, after the first
   game over, grants the friend gift once.
4. Self-code and a second first-game do not grant again.
5. Phase B: the inviter phone gets exactly one reward per friend; the 6th friend gives nothing (cap 5).
6. Firestore rules tested in the Firebase rules playground: a stranger cannot read joins; a friend cannot set
   `claimed=true`; an owner cannot join their own code.
7. No main-thread work beyond starting the async calls (StrictMode clean in debug).
8. Unit tests for `ReferralLink.build`, `parseCode` (encoded, missing, junk, lower case) and the abuse checks.

**Test steps:**
1. Unit tests.
2. Debug-only hook: a hidden debug setting to inject a referrer string, to test steps 6-7 without Play.
3. Real path: uninstall on phone B; open the referral link from phone A in WhatsApp on phone B; install from the
   internal testing track (B is a tester); play one game; check the gift and DebugView events. (Whether the
   referrer reaches an internal-track install is UNVERIFIED; if not, repeat after the 10% rollout with a
   production install.)
4. Phase B: run the rules playground cases; then two phones end to end.

**Risk and rollback:** New SDKs in Phase B (Auth, Firestore) mean a Data Safety change (Ajay, before switching
on) and slightly more app size. Rollback: `referral_inviter_reward_enabled=false` (Phase B), `referral_enabled=false`
(all). Firestore rules can be set to deny-all in the console in one minute.

**Effort (hours):** 15. Phase A 7 (card image 3, FileProvider and share 1, link and parser 1, install referrer 1,
friend reward 1). Phase B 8 (Firebase set-up and rules 2, client code 4, tests 2).

---

### V41-05 Friction-only UI fixes

**Owner:** Gemini.

**Release + day:** vc41. Fri 27 Nov (half a day). Skip any fix that vc40 already shipped.

**Goal and metric:** Remove things that confuse or mislead players. No new features. Metric: zero fake timers,
fake prices or wrong claims on Home and Shop (checked by acceptance), and no drop in `game_start` per DAU.
Only the fixes below, or a fix for a funnel step where vc40's `tutorial_step` data shows a clear drop. Each fix
1 hour or less. No redesign.

**Today (file + function):**

| # | Problem today | Where |
|---|---|---|
| F0 | Fake "Starter Bloom Pack" (finding A): "LIMITED OFFER · 70% OFF", "Remove Ads + 200 Gems + 10 Spins", "$1.99" fallback, but the button buys only `remove_ads`; shown even to ad-free buyers | `ui/screens/ShopScreen.kt:159-161`, `StarterBloomPackBanner` :300-366; `GameViewModel.removeAds()` :1305-1313 |
| F1 | Fake "⏱️ 2 days" pill (finding B) | `HomeScreen.kt:127-141` (text :139) |
| F2 | "Weekend Cascade · +50% coins" and "⏱️ 4h 12m" hardcoded, shown every day (finding B) | `AuroraWeekendStrip` `HomeScreen.kt:1226-1267`, called at :375 |
| F3 | Lucky chest card in English only; fake "2h 45m" when the cooldown text is blank | `AuroraLuckyChestCard` `HomeScreen.kt:1136-1223` (text :1183, :1205, :1213) |
| F4 | Play button subtitle in English ("· score N", " mode") | `HomeScreen.kt:313-318` |
| F5 | Bottom-nav labels in English ("Home", "Adventure", "Shop", "Trophies") | `ui/AuroraBottomNav.kt:51-54` |
| F6 | Any player who taps the version text gets a technical English toast "Ad Inspector: …" | `ui/screens/SettingsScreen.kt:226-237`, `GameViewModel.openAdInspector()` :1715-1721 |

**Change:**
- **F0:** Until V42-03, replace the banner with a plain "Remove Ads" card: real title (`R.string.remove_ads`),
  `R.string.no_interstitials_ever`, Play price only. Hide it when `removeAdsPrice == null` or `adsRemoved`. Remove
  "70% OFF", "LIMITED OFFER", "200 Gems", "10 Spins" and the "$1.99" fallback.
- **F1:** Show the real time left of the first `state.activeEvents` item (`R.string.ends_today` or
  `R.plurals.days_left`). No event: show only a calendar icon (keeps `openCalendar()`).
- **F2:** Pass `state.activeEvents` to the strip. Show the event `title`, `description` and real time left. Hide the
  strip when the list is empty.
- **F3:** String resources; show nothing instead of a fake time when `cooldownText` is blank. Coordinate with
  vc40's chest badge.
- **F4:** String resources with format arguments.
- **F5:** String resources (`R.string.adventure` exists; add home, shop, trophies).
- **F6:** Open the ad inspector only after 5 taps within 3 seconds. In release builds, log the error, no toast.

**Remote Config (key, type, default, kill switch):** None. These are bug fixes; rollback is the release itself.

**Analytics:** None new. Check `game_start` per DAU and Shop `offer_tap` (vc40) do not drop.

**Edge cases:**
1. Two events active (e.g. weekend + festival): F1 shows the one that ends first; F2 lists the first one and "+1 more".
2. `live_events` payload with `endsInDays` stale (static number): show it as given (vc42 adds real end dates).
3. Very long event title from RC: `maxLines = 1`, ellipsis.

**Acceptance criteria:**
1. On a weekday with no event in RC, Home shows no event strip and no countdown pill.
2. With the festival payload, Home shows "Aurora Bloom Festival" and the right multiplier text from the payload.
3. Shop shows no discount claim and no bundle that is not sold; price only from Play.
4. Debug pseudo-locale (en-XA, `app/build.gradle.kts:115`) shows no plain English on Home, Shop banner and nav.
5. One tap on the version text does nothing visible; 5 quick taps open the ad inspector on a test device.

**Test steps:** Debug build in en-XA; RC debug-app condition with and without `live_events`; Shop with billing
unavailable (debug) and available (internal track); screenshots of before and after into the journal.

**Risk and rollback:** Very low. Rollback = halt the rollout.

**Effort (hours):** 4.

---

## 4. R41: vc41 build, gates, staged rollout (10% → 50% → 100%) and ANR watch

Owner: Gemini (all steps except where Ajay is named). Times in IST. US evening is IST early morning, so the +12 h
check covers it.

**Before the build (Mon 30 Nov)**
1. `main` contains vc40 (Ajay merged it). `release/vc41` cut from `main`; all V41 branches merged.
2. `versionCode = 41`, `versionName = "1.17.0"` (`app/build.gradle.kts:46-47`); update the version comment there.
3. `tools/release-notes/vc41.json` from content-pack §8 (vc41 block), 13 locales, ≤ 500 chars. Delete bullets for
   anything cut.
4. `MAJOR_ISSUES_AND_GO_LIVE_CHECKLIST.md` Gate 4 still says "Full Production Rollout … (100% completed status)".
   If vc40 did not change it, change it to "Staged rollout: 20% → 100% after 24 h clean; releases with new SDKs
   10% → 50% → 100%".

**Tue 1 Dec (Day 10): internal**
1. `./gradlew :app:testReleaseUnitTest :app:bundleRelease`. Gate 1 (R8 + shrink), Gate 3 (target 36, notes,
   version) of the checklist. Gate 2: thread audit of every new call in `onCreate/onStart/onResume` (list them in
   the journal; must be empty except async starts).
2. `node tools/play-upload.js <aab> com.aweagle.blockbloom internal "1.17.0 (41)"` (stages a draft on
   **internal** only; never use this script on production: its track update carries only the new release, so it can
   drop the live one inside the edit). Then make it installable for testers:
   `node tools/play-rollout.js 41 com.aweagle.blockbloom internal "1.17.0 (41)" completed`. Read back with
   `node tools/play-status.js`.
3. Ajay: Play Console → pre-launch report for vc41 (about 1 h after upload): no crash, no ANR. 5 minutes.
4. Gemini: install from the internal track on 2 phones; run V41-01 to V41-05 test steps; ad inspector per network.
5. Check Play Console for SDK warnings (V41-01 acceptance 9). Ajay has submitted Data Safety (V41-01 part I).
6. Go / no-go written in the journal by 20:00.

**Wed 2 Dec (Day 11): 10%**
1. 10:00: `node tools/play-rollout.js 41 com.aweagle.blockbloom production "1.17.0 (41)" inProgress 0.1`
   (arg 7 = userFraction; the script sets `status=inProgress`, `tools/play-rollout.js:28,137`; the body matches
   Google's staged-rollout example: https://developers.google.com/android-publisher/tracks).
2. Read back with `node tools/play-status.js`: production shows vc41 inProgress 0.1 and vc40 still serving.
3. Watch at +2 h, +6 h, +12 h, +24 h (ANR watch, below).

**Thu 3 Dec (Day 12): 50%**, at 10:00 if the 24-hour watch is clean:
`node tools/play-rollout.js 41 com.aweagle.blockbloom production "1.17.0 (41)" inProgress 0.5`. Same watch.
Also read the first mediation numbers (`ad_loaded` by `ad_source`).

**Sat 5 Dec (Day 14): 100%**, at 10:00 if clean since Thursday:
`node tools/play-rollout.js 41 com.aweagle.blockbloom production "1.17.0 (41)" completed`. Then Ajay merges
`release/vc41` into `main`. Start E5 (V41-03) the same day.

**ANR watch: what "clean" means** (all must hold for the new version only):
1. Crashlytics (filter 1.17.0 (41)): crash-free users ≥ 99.5%. With fewer than 200 users on vc41 (expected:
   10% of ~60-100 DAU = 6-10 players a day), use counts instead: no crash issue on 2 or more users, and no crash
   at all in our `monetize/` package or an ad SDK.
2. Crashlytics ANR issues (Android 11+): **zero** issues on vc41 whose main-thread stack contains
   `com.google.android.gms.ads`, `com.applovin`, `com.vungle`, `com.bytedance` or `com.pgl`, `com.mbridge`,
   `com.facebook.ads`, `com.google.firebase.firestore`, or `com.aweagle.blockbloom.monetize`.
3. Play Console Android vitals: no "bad behavior" alert. Play data lags 1-2 days, so it is the check at 50% → 100%,
   not at 10% → 50%. Gemini updates `tools/check-vitals.js` to take `--from/--to` dates and group by
   `versionCode` (Play Developer Reporting API `anrRateMetricSet` / `crashRateMetricSet`; the dimension name
   `versionCode` is UNVERIFIED, check the API reference). Pass: user-perceived ANR on vc41 ≤ 0.47%.
4. Ads: `ad_failed_to_load` with `error_code = 0` (internal error) not above vc40's level; no AdMob policy or
   invalid-traffic email (Ajay checks his inbox once a day).
5. Gameplay: `game_start` per DAU on vc41 not lower than vc40 by more than 20% (rough, small numbers).

**Halt rules** (same day, no waiting):
1. Any ANR from point 2, a crash cluster (≥ 2 users, same signature), an AdMob policy notice, or crash-free < 99%.
2. Halt: `node tools/play-rollout.js 41 com.aweagle.blockbloom production "1.17.0 (41) halted" halted`.
3. If an ad SDK is in the stack: Gemini sets `ads_mediation_enabled=false`; Ajay turns that network off in all
   AdMob groups. Then find the root cause (Law 1: exact thread, lock, frame).
4. The fix ships as versionCode 42 (1.17.1). Winter Bloom then becomes versionCode 43 (finding G).
5. Never raise `min_supported_version_code` for this. Players on vc41 keep working.

Ajay's daily time: 10 minutes (check the journal's watch line, reply "go" or "halt").

---

## 5. vc42 items

### V42-01 Winter Bloom event content (theme, limited-time challenge, rewards) driven by `live_events` with date conditions

**Owner:** Gemini (code, Remote Config payload and conditions, checks). Ajay: Play promotional content card for
14-21 Dec, submitted by Tue 1 Dec (roadmap Day 10; Play asks for 4+ days, featuring needs 14 days).

**Release + day:** vc42 1.18.0. Code Sun 6 Dec to Mon 7 Dec. Internal Tue 8 Dec. RC payload published Sun 13 Dec.
Event live Mon 14 Dec 00:00 to Mon 21 Dec 23:59 (device local time).

**Goal and metric:** A visible holiday reason to return during the year's highest-eCPM weeks.
1. DAU 14-21 Dec vs 7-13 Dec.
2. Share of DAU with `event_progress` > 0; share that claims each milestone.
3. Sessions per DAU during the event.
4. Guardrail: coin inflation (gems and coins earned per DAU, Ledger) stays under 2× the week before.

**Today (file + function):**
- `events/FirebaseEventConfig.kt` `activeEvents()` :38-42 and `parseOrNull()` :57-80: kinds `COIN_BOOST`,
  `DAILY_DOUBLE` (`events/Events.kt:7`); fields id, title, description, kind, multiplier, endsInDays. No dates.
  Unknown kind → entry skipped. A non-blank valid payload REPLACES the local calendar events; `[]` = no events.
- `events/Events.kt` `LocalEventConfig` :46-73: weekend ×1.5 coins, Wednesday daily ×2.
- Coin boost applied in `GameViewModel.commitEarnedCoins()` :2121-2136 via `activeEventMultiplier()` :2037-2038.
- Home does not render events (finding B; fixed by V41-05 F1/F2).
- Lines are counted in `placePiece()` at `prefs.totalLines += lines` (:1075).
- Skins: `cosmetics/Skins.kt` `Unlock` :7-12 (Free, Coins, Gems, RewardedAd), `Skins.all` :34-125.
- Shop unlock UI: `ShopScreen.kt` `UnlockButton` :435-462, `unlockLabel` :464-470.

**Change:**
1. **Payload contract v2** (backward compatible; old builds ignore new fields because they only read known keys):
   - Optional `startDate`, `endDate` (ISO local dates, inclusive). vc42 skips an entry when today is outside them
     (defense in depth: RC caches up to 1 h and offline phones keep old values).
   - If the raw array had entries but ALL were skipped by the date check, return **null** (use local calendar events),
     not an empty list. (An explicit `[]` still means "no events".) This prevents finding I1 from happening again.
   - Optional `theme` ("winter"), optional `titles` / `descriptions` maps by language code (fallback `title`).
   - Optional `challenge`: `{"metric":"LINES","milestones":[{"target":30,"coins":300},{"target":80,"gems":10},{"target":150,"skin":"frost"}]}`.
     Only `LINES` in vc42. Max 3 milestones.
   - `GameEvent` gets nullable fields for all of the above; `endsInDays` is computed from `endDate` when present.
2. **Event progress.** New pure class `EventProgress` (unit-tested). Prefs: `eventId`, `eventLines`,
   `eventClaimedMask`. Reset when the event id changes. In `placePiece()` next to `prefs.totalLines += lines`, add
   lines while an event with a LINES challenge is active (all modes: classic, daily, adventure).
   When a milestone is reached: grant at once (coins/gems via `wallet.earn(…, TxReason.EVENT_REWARD,
   "event:<id>:m<n>")`, skin via `prefs.unlockSkin("frost")`), `feedback.reward()`, toast. No claim button
   (less friction; the player may never visit Home mid-run).
3. **Frost skin.** New `Unlock.Event(eventId: String)` in `Skins.kt`; new skin `frost` (icy palette, 6 colours,
   board background, glow; new string `skin_frost`). Not purchasable. Shop label "Winter Bloom reward"; after the
   event, unowned shows "Event reward" (disabled). Owned forever once granted. Handle the new `Unlock` branch
   everywhere a `when` on `Unlock` exists (the compiler lists them).
4. **Home event card** (extends V41-05 F2): when `theme == "winter"`, winter style (snowflake icon, ice-blue
   gradient), title, description, real time left to `endDate`, a progress bar `eventLines / next target` with 3
   milestone icons. Optional light snowfall `Canvas` on Home only, max 24 flakes, off when `reduceMotion` is on.
5. **Remote Config set-up (Gemini, Sun 13 Dec):**
   1. Condition `winter_bloom_2026`:
      `device.dateTime > dateTime('2026-12-13T23:59:59') && device.dateTime <= dateTime('2026-12-21T23:59:59')`,
      device time zone (syntax from https://firebase.google.com/docs/remote-config/condition-reference; how the
      console sets "device time zone" when no zone is written is UNVERIFIED: pick it in the condition builder).
   2. Parameter `live_events`: default value **"(use in-app default)"**; conditional value for `winter_bloom_2026`:
```json
[{"id":"winter_bloom_2026","title":"Winter Bloom","description":"Coins x1.5 and a winter challenge",
  "kind":"COIN_BOOST","multiplier":1.5,"endsInDays":0,"startDate":"2026-12-14","endDate":"2026-12-21",
  "theme":"winter",
  "titles":{"de":"Winterblüte"},
  "challenge":{"metric":"LINES","milestones":[{"target":30,"coins":300},{"target":80,"gems":10},{"target":150,"skin":"frost"}]}}]
```
      (Gemini fills the other 5 languages in `titles`/`descriptions`; the German word is a placeholder to check.)
   3. Before publishing: paste the exact JSON into a unit test of `parseOrNull` and run it.
   4. Test first with a condition for the debug Firebase app (`com.aweagle.blockbloom.debug`) and a debug-only
      date override; then publish the real condition; check RC history shows the condition and the default.
   5. Old builds (vc39-vc41) will see a COIN_BOOST ×1.5 "Winter Bloom" event only. That is fine.
   6. Cleanup: delete the conditional value on **Tue 22 Dec**, not Sun 20 Dec (the roadmap's Day 29 line would end
      the event a day early; the date condition already ends it).
   7. Never publish `live_events` without a condition (issue I1).

**Remote Config (key, type, default, kill switch):**

| Key | Type | Default | Kill switch |
|---|---|---|---|
| `live_events` (existing) | String (JSON) | "(use in-app default)" = local calendar events | Remove the conditional value: the event disappears within about 1 h for online players |

**Analytics:**
- New `event_progress` {`event_id`, `lines` (bucketed 10s)} once per game over during an event.
- New `event_reward` {`event_id`, `milestone`, `reward`}.
- New `event_card_view` {`event_id`} once per day.

**Edge cases:**
1. Device clock set inside the window: the client check passes if RC also served the payload. Low value to cheat. Accept.
2. Offline phone with a cached payload after 21 Dec: the client date check hides it (null → local events).
3. Payload broken: `parseOrNull` returns null → local events (unchanged safety).
4. Player reaches 150 lines on day 1: all claimed; card says "Complete".
5. Reinstall mid-event: progress lost (local only). Accept.
6. Two events at once (weekend local events are replaced by the payload anyway): only payload events exist.
7. Frost skin owned, event over: stays selectable.
8. `remove_ads` buyers: same event.

**Acceptance criteria:**
1. Parser unit tests: new fields; date skip; all-skipped → null; explicit `[]` → empty list; unknown fields ignored;
   old payload (festival format) still parses the same.
2. With the debug condition: Home shows the winter card, real days left, progress moves with lines in all 3 modes.
3. Milestones grant once each; restart does not re-grant.
4. Frost skin unlocks at 150 and appears in the Shop as owned.
5. On a vc41 build with the real payload: ×1.5 coins, no crash.
6. On 22 Dec (date override) the event is gone and weekend events are back.
7. Snowfall off with reduce motion; no frame drops on the low-end phone (Profile GPU rendering, eyeball).

**Test steps:** unit tests; debug-app RC condition; date override (debug only); low-end phone; vc41 phone with the
same payload; screenshots into the journal.

**Risk and rollback:** Risk: wrong condition shows the event early or for ever (I1 again). Mitigation: client
dates + RC history check + delete on 22 Dec. Rollback: remove the conditional value.

**Effort (hours):** 11 (parser + dates 2, progress + rewards 3, Frost skin + Unlock.Event 1.5, Home card 2,
strings 1, tests and RC set-up 1.5).

---

### V42-02 Adventure next to Classic on Home

**Owner:** Gemini.

**Release + day:** vc42. Mon 7 Dec.

**Goal and metric:** Make the second mode easy to find. Today it is only a bottom-nav tab.
1. Share of DAU who start an Adventure level per day (new `game_start` mode=level).
2. `level_complete` per DAU. Guardrail: Classic `game_start` per DAU and day-1 return do not drop.

**Today (file + function):**
- Home hero row `HomeScreen.kt:253-339`: one big Play/Continue button + a restart circle.
- Adventure only via `ui/AuroraBottomNav.kt:52` → `vm.openLevels()` (:122).
- `GameViewModel.startLevel()` :588 (no `game_start` event, finding I); `isLevelUnlocked()` :759;
  `levelStates()` :761-764; 25 levels in `level/Levels.kt`.
- A level detour keeps a saved Classic game (:595-596).

**Change:**
1. VM: `nextAdventureLevelId(): Int?` = the first unlocked level with 0 stars; null when all 25 have stars. Add
   `nextLevelId` to `GameState`; refresh it where `levels = levelStates()` is set.
2. Home: replace the hero row with two equal tiles. **Classic** (Play or Continue, subtitle: difficulty or
   "score N", localized) and **Adventure** (subtitle "Level 7", or "All clear · replay" when null). Keep the
   restart circle only when `hasSavedGame` is true, as a small icon on the Classic tile.
3. Adventure tap: `startLevel(nextLevelId)` when not null; else `openLevels()`.
4. `startLevel()`: log `game_start` {mode: "level", level_id, difficulty}.
5. Strings: "Classic", "Level %1$d", "All clear · replay" (7 locales).

**Remote Config (key, type, default, kill switch):**

| Key | Type | Default | Kill switch |
|---|---|---|---|
| `home_adventure_button` | Boolean | true | false = vc41 hero row |

**Analytics:** New `home_mode_tap` {`mode` (classic, adventure)}; `game_start` mode=level.

**Edge cases:**
1. First-ever launch: the coached first run starts on its own (`init` :411-413); tiles show after.
2. All levels cleared: opens the level list.
3. Small screen (360 dp wide): both tiles fit; text `maxLines = 1` with ellipsis.
4. Saved Classic game + Adventure tap: the Classic save stays (existing behaviour).
5. The difficulty selector applies to Classic only. Leave it; do not add text.

**Acceptance criteria:**
1. Both tiles visible without scrolling on a 360×640 dp emulator.
2. Adventure tile starts the right level; level 25 cleared → list opens.
3. `game_start` mode=level and `home_mode_tap` in DebugView.
4. `home_adventure_button=false` shows the old row.

**Test steps:** emulator 360×640; a fresh install; a profile with 24 and 25 levels cleared (debug prefs);
RC debug-app condition for the flag.

**Risk and rollback:** Players may spend their 25 levels fast. Watch `level_complete` for level 25. Rollback: flag false.

**Effort (hours):** 3.

---

### V42-03 Starter pack (only if `offer_tap` ≥ 3%), including creating the new in-app product

**Owner:** Gemini (gate read, product creation script, code, tests). Ajay: price decision, license testers,
activate the product if the script cannot.

**Release + day:** vc42. Gate read Mon 7 Dec 10:00 (Day 16). Code Mon 7 Dec. Product created Mon 7 Dec (must be
active before the internal build on Tue 8 Dec).

**Gate (decides whether this item exists):**
1. Data: vc40's `offer_shown` / `offer_tap` events, app version ≥ 1.16.0, 26 Nov to 6 Dec, all countries, plus a
   Tier-1 split. Gemini pulls it with the GA4 Data API.
2. Rate = unique users with `offer_tap` ÷ unique users with `offer_shown`.
3. Pass = rate ≥ 3% AND at least 5 users tapped (fewer is noise).
4. Gemini writes the numbers in the journal; Ajay replies "build" or "skip" in one line.
5. Skip → V42-03 is not built; delete its bullet from `vc42.json`; F0 (plain Remove Ads card) stays.

**Goal and metric:** First purchase from players who showed interest. Metric: `purchase` (vc40 event) with
`product=starter_pack` ÷ users who saw it; revenue in Play Console. Guardrail: `remove_ads` purchases not down.

**Today (file + function):**
- `monetize/BillingHost.kt` `Products` :11-18: `remove_ads`, `gems_small/medium/large` only.
- `monetize/PlayBillingHost.kt`: `queryDetails()` :155-175 queries those IDs (INAPP); `handlePurchase()` :193-228:
  `remove_ads` is acknowledged (non-consumable), `gems_*` consumed first then granted; restore on every connect
  (`restorePurchases()` :177-186).
- The fake banner `StarterBloomPackBanner` (`ShopScreen.kt:300-366`), replaced by F0 in vc41.
- Out-of-coins prompt: `Dialogs.kt:884` (`OutOfCoinsPrompt`), shown from `GameScreen.kt:706-712`.

**Change:**
1. **Product** (Ajay decides price; suggestion US $1.99 base, Play converts other countries):
   - ID `starter_pack`, one-time, non-consumable (acknowledge, never consume), one per player.
   - Contents: 100 gems + 1,000 coins + 3 Hammer + 3 Shuffle + 3 Undo. Ajay may change numbers; do not show any
     "% off" or "worth $X" text.
   - Listing en-US: title "Starter Pack" (≤ 55 chars), description "100 gems, 1,000 coins and 3 of each power-up.
     One per player." (≤ 200 chars).
2. **Create it by API** (Gemini): new `tools/play-create-product.js`, same auth pattern as `tools/play-rollout.js`.
   `PATCH applications/com.aweagle.blockbloom/oneTimeProducts/starter_pack?allowMissing=true` with a `OneTimeProduct`
   body: `listings`, one purchase option (`purchaseOptionId` "buy", `buyOption.legacyCompatible=true` so the older
   billing flow and `oneTimePurchaseOfferDetails` see it, `multiQuantityEnabled=false`), `newRegionsConfig`
   (`usdPrice`, `eurPrice`, availability AVAILABLE) and the regional prices. Reference:
   https://developers.google.com/android-publisher/api-ref/rest/v3/monetization.onetimeproducts (opened 22 Nov).
   The purchase option must then be **activated**; the endpoint name is UNVERIFIED. If the script cannot activate
   it, Ajay: Play Console → Monetize with Play → Products → One-time products → `starter_pack` → Activate
   (click path UNVERIFIED). Read it back with `GET` and log the state.
3. **Billing code:** add `Products.STARTER_PACK`; add it to `queryDetails()`; expose `starterPackPrice`;
   `handlePurchase()` branch: acknowledge if needed, then post to `onStarterPackOwned`. VM:
   `buyStarterPack()` and idempotent `grantStarterPack()` guarded by `prefs.starterPackGranted`; grants with
   `TxReason.IAP_PURCHASE`, ref `starter_pack`; lifelines through the existing inventory.
4. **Where it shows** (no pop-ups on launch):
   - Shop Featured, top card (replaces F0's position; the Remove Ads card moves below it).
   - Out-of-coins prompt: one secondary line "Starter Pack · {price}", at most once a day.
   - Only when: RC `starter_pack_enabled`, Play returned a price, not owned, `gamesPlayed ≥ starter_pack_min_games`.
5. **Events:** use vc40's `offer_shown` / `offer_tap` / `purchase` with `offer=starter_pack` and `where`.

**Remote Config (key, type, default, kill switch):**

| Key | Type | Default | Kill switch |
|---|---|---|---|
| `starter_pack_enabled` | Boolean | false | false = hidden everywhere. Set true only after the product is active and the test purchase passed. |
| `starter_pack_min_games` | Long | 3 | higher = shown later |

**Analytics:** `offer_shown`, `offer_tap`, `purchase` with `offer`/`product = starter_pack`, `where` (shop, out_of_coins).

**Edge cases:**
1. Pending purchase (slow card): grant only when PURCHASED (existing check :194).
2. Acknowledge fails: Play refunds after 3 days; `restorePurchases()` acknowledges again on next connect.
3. Reinstall: purchase restored → granted again if `starterPackGranted` is false (fresh wallet). With Auto Backup
   the flag comes back too → no double grant.
4. Refund: no take-back (soft currency). Accept.
5. Product not active yet: no price → nothing shows.
6. Player bought `remove_ads`: still eligible (different content).

**Acceptance criteria:**
1. License-tester purchase with "always approves" grants exactly the contents once.
2. "Slow test card" grants only after approval.
3. Reinstall restores once.
4. Hidden when owned, when RC false, or with no Play price.
5. No "% off", "limited" or "worth" text anywhere.

**Test steps:** Ajay adds Gemini's Google account as a license tester (Play Console → Settings → License testing;
path UNVERIFIED). Install from the internal track; buy; reinstall; buy with the slow card; check Ledger entries
and DebugView.

**Risk and rollback:** Policy risk if the text promises more than the product gives (that is why F0 exists).
Rollback: `starter_pack_enabled=false`.

**Effort (hours):** 7 (gate read 0.5, product script 1.5, billing code 2, UI 1.5, tests 1.5).

---

### V42-04 Arrow Bloom cross-promotion card

**Owner:** Gemini. Ajay confirms Arrow Bloom (`com.aweagle.arrowbloom`) is live in production in the 6 Tier-1
countries and India before the flag goes on.

**Release + day:** vc42. Mon 7 Dec. Flag on only after Ajay's confirmation.

**Goal and metric:** Free installs for Arrow Bloom from Block Bloom's most engaged players.
1. CTR = `xpromo_tap` ÷ `xpromo_shown`.
2. Arrow Bloom installs from `utm_campaign=home_card_v1` in Arrow Bloom's Play Console acquisition report
   (Arrow Bloom has no analytics SDK; the report path is UNVERIFIED).
3. Guardrail: Block Bloom sessions per DAU and day-1 return not down.

**Today (file + function):** No cross-promotion anywhere. Home layout `HomeScreen.kt:182-380`. Arrow Bloom's package
is `com.aweagle.arrowbloom` (`D:/DevTools/ArrowBloom/app/build.gradle.kts:11` on the work laptop; on Gemini's laptop
it is the Arrow Bloom repo's `app/build.gradle.kts`).

**Change:**
1. Card on Home below the Daily/Chest row: Arrow Bloom icon (export the launcher icon to
   `res/drawable-nodpi/xpromo_arrowbloom.webp`, ≤ 20 KB), title "Arrow Bloom", text "Slide the arrows out. A calm
   new puzzle from the maker of Block Bloom.", button "Get it free", a close (X) button. 7 locales.
2. Tap: `ACTION_VIEW` `market://details?id=com.aweagle.arrowbloom&referrer=utm_source%3Dblockbloom%26utm_medium%3Dxpromo%26utm_campaign%3Dhome_card_v1`
   with package `com.android.vending`; fallback to the `https://play.google.com/store/apps/details?...` URL.
3. Manifest: `<queries><package android:name="com.aweagle.arrowbloom" /></queries>` so the app can see if Arrow Bloom
   is installed (Android 11+ package visibility). Installed → never show.
4. Show only when: RC `xpromo_arrowbloom_enabled`; `gamesPlayed ≥ 5`; not dismissed; at most once every 2 days;
   at most 6 impressions in total; not on a Home visit where the daily reward dialog is open.
5. Close (X) = never again (`prefs.xpromoDismissed`).

**Remote Config (key, type, default, kill switch):**

| Key | Type | Default | Kill switch |
|---|---|---|---|
| `xpromo_arrowbloom_enabled` | Boolean | false | false = hidden. Ajay turns it on after confirming Arrow Bloom is live. |

**Analytics:** New `xpromo_shown`, `xpromo_tap`, `xpromo_dismiss` {`app`="arrowbloom"}.

**Edge cases:** Play Store missing (rare) → web URL; Arrow Bloom not available in the player's country → Play shows
"not available"; the card counts the impression anyway (accept); `remove_ads` buyers still see it (own product,
not an ad); never shown during the first 5 games.

**Acceptance criteria:**
1. Not shown when Arrow Bloom is installed, dismissed, before game 5, or after 6 impressions.
2. Tap opens Arrow Bloom's Play page with the referrer.
3. Events in DebugView.
4. `<queries>` contains only this one package.

**Test steps:** phone with and without Arrow Bloom installed; debug prefs for game count and impressions; RC
debug-app condition.

**Risk and rollback:** Players may leave to the other game. Rollback: flag false.

**Effort (hours):** 3.

---

## 6. R42: vc42 build, gates, staged rollout (internal Tue 8 → 20% Thu 10 → 100% Fri 11 Dec)

1. **Mon 7 Dec:** V42-03 gate read (10:00). Code complete by 20:00. `versionCode = 42`, `versionName = "1.18.0"`
   (or 43 if a vc41 hotfix used 42, finding G). `tools/release-notes/vc42.json` from content-pack §8; delete the
   starter-pack bullet if skipped.
2. **Tue 8 Dec (Day 17): internal.** Unit tests, release build, Gates 1-3. Upload to internal with
   `tools/play-upload.js`, then `play-rollout.js 42 … internal … completed` and read back (same as R41).
   Ajay reads the pre-launch report. Gemini: V42 test steps, license purchase, Winter Bloom on
   the debug-app condition, a vc41 phone with the real payload.
3. **Wed 9 Dec (Day 18):** Gate B day; no rollout. Fix anything from internal testing.
4. **Thu 10 Dec (Day 19) 10:00: 20%.**
   `node tools/play-rollout.js 42 com.aweagle.blockbloom production "1.18.0 (42)" inProgress 0.2`, read back with
   `play-status.js`. Watch +2 h, +6 h, +12 h, +24 h with the R41 "clean" rules (the SDK list in rule 2 still applies).
5. **Fri 11 Dec (Day 20) 10:00: 100%** if clean for 24 h:
   `node tools/play-rollout.js 42 com.aweagle.blockbloom production "1.18.0 (42)" completed`. Ajay merges
   `release/vc42` into `main`.
6. **Sun 13 Dec:** publish the Winter Bloom condition (V42-01 part 5). **Mon 14 Dec:** check the event on vc42 and
   vc41 phones in the morning.
7. **Exception:** if V41-04 Phase B (Firebase Auth + Firestore, new SDKs) slipped into vc42, use 10% Thu 10 →
   50% Fri 11 → 100% Sat 12 instead.
8. Halt rules: as R41. A fix ships as the next versionCode (vc43 slot).

---

## 7. R43: vc43 hotfix-only rules (slot Fri 18 Dec)

1. vc43 exists only if one of these is true on vc42 (or vc41): crash-free users < 99.5% with a known cause; any ANR
   cluster; a purchase that charges but does not grant; event rewards granted wrongly; an AdMob policy notice that
   needs code.
2. **Remote Config first.** If a kill switch fixes it (`live_events`, `ads_mediation_enabled`, `starter_pack_enabled`,
   `referral_*`, `reminder_mode`, `home_adventure_button`, `xpromo_arrowbloom_enabled`, `daily_loop_enabled`),
   use it and do not ship vc43.
3. **Scope:** the smallest change that fixes the root cause (Law 2: no band-aid that only hides a symptom). No
   features, no new SDKs, no SDK version changes, no new strings except release notes, no Remote Config default
   changes unless the bug is the default.
4. **Branch:** `hotfix/vc43-<short-name>` from the head of `release/vc42` (or `main` if Ajay merged it) →
   `release/vc43`. Version: next versionCode, patch version (1.18.1).
5. **Gates:** all 4 checklist gates; unit test that reproduces the bug first.
6. **Rollout:** internal → 20% → 100% after 24 h clean. Release notes: "Bug fixes and stability." in 13 locales.
7. **Freeze:** no release after Fri 18 Dec except a crash loop or a payment bug (holiday review times are slower).
   Winter Bloom (14-21 Dec) is never changed by a release, only by Remote Config.
8. Ajay approves in one line before upload; Ajay merges after 100%.

---

## 8. Remote Config register (all new keys; register defaults in `BlockBloomApp.kt:58-70`)

| Key | Type | Code default | Item | OFF / kill value |
|---|---|---|---|---|
| `ads_mediation_enabled` | Boolean | true | V41-01 | false |
| `daily_loop_enabled` | Boolean | true | V41-02 | false |
| `reminder_mode` | String | "streak_only" | V41-03 | "off" (or "legacy") |
| `reminder_variant` | String | "A" | V41-03 (E5) | "A" |
| `referral_enabled` | Boolean | true | V41-04 | false |
| `referral_inviter_reward_enabled` | Boolean | false | V41-04 | false |
| `referral_inviter_cap` | Long | 5 | V41-04 | 0 |
| `live_events` (existing) | String | "" (local events) | V42-01 | delete the conditional value |
| `home_adventure_button` | Boolean | true | V42-02 | false |
| `starter_pack_enabled` | Boolean | false | V42-03 | false |
| `starter_pack_min_games` | Long | 3 | V42-03 | — |
| `xpromo_arrowbloom_enabled` | Boolean | false | V42-04 | false |

Rule: after each console publish, open Remote Config history and check the diff. A typo in a Boolean key falls
back to the code default (the interstitial default trap, update 2 in FACTS).

## 9. Analytics register (new events and params)

| Event | Params | Item |
|---|---|---|
| `ad_adapter_init` | adapter, state, latency_ms | V41-01 |
| `ad_loaded` (+param) | ad_source | V41-01 |
| `ad_shown` (rename of our `ad_impression`) | ad_format | V41-01 |
| `streak_claimed` (+params) | trigger, ladder_pos | V41-02 |
| `streak_milestone` | day, gems, item | V41-02 |
| `comeback_chest` | gap_days, prev_streak | V41-02 |
| `daily_card_tap` | state | V41-02 |
| `reminder_scheduled` | kind, hour, variant, streak | V41-03 |
| `reminder_shown` | kind, variant | V41-03 |
| `reminder_opened` (+param) | variant | V41-03 |
| `share_result` (+params) | has_image, has_ref | V41-04 |
| `referral_install` | code_valid, click_to_install_h | V41-04 |
| `referral_friend_reward` | — | V41-04 |
| `referral_join_sent` | ok | V41-04 |
| `referral_inviter_reward` | total | V41-04 |
| `event_progress` | event_id, lines | V42-01 |
| `event_reward` | event_id, milestone, reward | V42-01 |
| `event_card_view` | event_id | V42-01 |
| `home_mode_tap` | mode | V42-02 |
| `game_start` (+mode=level) | level_id | V42-02 |
| `offer_shown` / `offer_tap` / `purchase` (vc40) | offer=starter_pack, where | V42-03 |
| `xpromo_shown` / `xpromo_tap` / `xpromo_dismiss` | app | V42-04 |

Gemini registers each new param as a GA4 custom dimension on the day it ships (GA4 Admin, or the Analytics Admin API).

## 10. Ajay's console checklist (by date)

**Tue 1 Dec (Day 10)**
- Play Console: submit the **Winter Bloom** promotional content for 14-21 Dec. It must match the game: "coins ×1.5,
  a winter line challenge, a Frost theme reward". (Roadmap Day 10.)
- Play Console: submit Data Safety changes drafted by Gemini (V41-01 part I) **before** the 10% rollout on Wed 2 Dec.

**Mon 30 Nov (Day 9), about 3 hours. Mediation networks.** For every network: sign up with the business email, use
package `com.aweagle.blockbloom` and the Play Store URL. Fill payment and tax ONLY if AdMob says the source is "direct pay".
Never paste keys into chats or files; type them into AdMob yourself.
1. **AppLovin** (dash.applovin.com): Account → Keys → copy the **SDK Key**. No ad units are needed for bidding
   (Google's AppLovin page).
2. **Liftoff Monetize**: Add Application (Android) → note the **App ID**. Add 3 NEW placements (not the default):
   "BB Banner" type Banner, "BB Interstitial" type Interstitial, "BB Rewarded" type Rewarded. Set **In-App Bidding =
   Enabled** on each. Note each **Reference ID**.
3. **Pangle** (pangleglobal.com): Applications → Add App (Android) → **App ID**. Add placements Banner,
   Interstitial, Rewarded Video, each with **Pricing Type = In-App Bidding** → note each **Ad Placement ID**.
4. **Mintegral**: APP Setting → Add APP (Android) → **APP ID** and **APP Key**. Placements & Units → Add Placement
   for Banner, Interstitial and Rewarded with bidding type **Header Bidding** → note **Placement ID** and **AD Unit ID**.
5. **Meta** (only after business verification): Monetization Manager → property → Android app → payment account →
   placements Banner, Interstitial, Rewarded with mediation platform **Google AdMob** → note **Placement IDs**.
6. **AdMob → Mediation:** create the 5 groups in the V41-01 part H table (no floors). In each group: Bidding card →
   Add ad source → pick the network → accept the bidding agreement → Add mapping with the IDs above. AppLovin
   mapping = SDK Key. Liftoff = Application ID + Placement Reference ID. Pangle ROW = App ID + Ad Placement ID.
   Mintegral = App Key + App ID + Placement ID + Ad Unit ID. Meta = Placement ID (later).
7. **AdMob → Privacy & messaging:** European regulations ad partners: add "AppLovin Corp.". US state regulations ad
   partners: add AppLovin Corp., Liftoff, Pangle DSP, Mobvista/Mintegral, Meta. Publish both messages.
8. **AdMob → Settings → Test devices:** add Gemini's test phone (advertising ID) (click path UNVERIFIED).
9. Send Gemini each network's **app-ads.txt lines** (public text).

**Mon 7 Dec (Day 16)**
- Reply "build" or "skip" to the starter-pack gate; if build, confirm the price.
- Play Console → License testing: add Gemini's test account.
- Confirm Arrow Bloom is live in production (US, UK, CA, AU, NZ, IE, IN) → Gemini switches the x-promo flag on.

**Each rollout day:** read Gemini's watch line in the journal; reply "go" or "halt" (10 minutes).

## 11. Open questions (Ajay decides; my recommendation in brackets)

1. **Urgent, vc40:** fix the fake "Starter Bloom Pack" banner now (finding A)? [Yes, in vc40. It misleads buyers.]
2. **Urgent, vc40:** make the Home event strip and pill read the real events (finding B) before the 27 Nov festival?
   [Yes, 1 hour. Otherwise Home says "+50%" while the festival gives ×2.]
3. Referral inviter reward needs a small backend (Firebase Auth anonymous + Firestore, Spark plan, Data Safety
   change). Ship in vc41 or vc42? [vc42, unless vc41 work is ahead of plan by Sun 29 Nov. Phase A ships in vc41.]
4. EEA/UK/CH: only AdMob + AppLovin there, because the old adapters do not pass GDPR consent. OK with 5 groups?
   [Yes. UK and IE are small; US, CA, AU, NZ get all networks.]
5. No Pangle bidding for US users until the adapter upgrade (needs 7.2.0.2+). OK? [Yes.]
6. Reminders: "at risk" from streak 1 (a day-2 reminder for brand-new players) or from streak 2 (today)?
   [Streak 1. Day-1 return is the gate metric.]
7. Reminders v2 drops the 3-day win-back and the daily-challenge reminders ("only when the streak is at risk").
   Keep that? [Yes, as briefed. `reminder_mode=legacy` brings them back without a release.]
8. Starter pack price and contents. [US $1.99; 100 gems + 1,000 coins + 3 of each power-up.]
9. Is Arrow Bloom live in production in the target countries? [If not, ship the card with the flag off.]
10. Winter Bloom cleanup: delete the payload on Tue 22 Dec, not Sun 20 Dec (roadmap Day 29). [Yes.]
11. Rename our `ad_impression` to `ad_shown` (finding J)? It breaks the old "saw an ad" series. [Yes; report both
    for one month.]
12. vc41 is about 48 Gemini hours in 6 days. Is that capacity real? [If not: cut V41-04 Phase B, then the
    come-back chest.]
13. Kotlin 2 + GMA 24/25 migration (finding D): v23 sunsets 30 Jun 2027. Keep it as a fixed February 2027 job?
    [Yes. It also unlocks newer adapters, EEA consent for all networks, and Pangle US.]
14. Interstitial on a mid-game quit (finding H): review after E1 is read (6 Dec)? [Yes; January, not vc43.]

## 12. Sources (opened 22 Nov 2026 unless marked)

- Adapter POMs (versions, play-services-ads requirement, SDK dependencies): Google Maven
  `https://dl.google.com/dl/android/maven2/com/google/ads/mediation/{applovin,vungle,pangle,mintegral,facebook}/…`;
  Pangle SDK `https://artifact.bytedance.com/repository/pangle/com/pangle/global/ads-sdk/6.1.0.7/`;
  Mintegral SDK `https://dl-maven-android.mintegral.com/repository/mbridge_android_sdk_oversea/com/mbridge/msdk/oversea/mbbid/16.8.11/`;
  Maven Central for `applovin-sdk 12.6.0`, `vungle-ads 7.4.0`, `audience-network-sdk 6.17.0`.
- Google mediation guides: https://developers.google.com/admob/android/mediation/applovin ,
  …/liftoff-monetize , …/pangle , …/mintegral , …/meta
- Initialization flags: https://developers.google.com/admob/android/optimize-initialization
- SDK deprecation table: https://developers.google.com/admob/android/deprecation
- Ad inspector: https://developers.google.com/admob/android/ad-inspector
- Bidding payments: https://support.google.com/admob/answer/9360574
- Play SDK requirements (search result, not opened): https://support.google.com/googleplay/android-developer/answer/10358880
- Install referrer: https://developer.android.com/google/play/installreferrer/library
- Remote Config conditions: https://firebase.google.com/docs/remote-config/condition-reference
- Staged rollout API: https://developers.google.com/android-publisher/tracks
- One-time products API: https://developers.google.com/android-publisher/api-ref/rest/v3/monetization.onetimeproducts
- Firebase BoM 33.7.0 and the auth/firestore POMs: Google Maven `com/google/firebase/…`
- App repo files read (main d0235e0): `build.gradle.kts`, `app/build.gradle.kts`, `settings.gradle.kts`,
  `AndroidManifest.xml`, `proguard-rules.pro`, `BlockBloomApp.kt`, `MainActivity.kt`, `monetize/{AdHost,AdMobAdHost,AdsConfig,PersistentBannerManager,BillingHost,PlayBillingHost,ShopCatalog}.kt`,
  `viewmodel/GameViewModel.kt`, `ui/screens/{HomeScreen,ShopScreen,Dialogs,SettingsScreen,GameScreen}.kt`,
  `ui/{AuroraBottomNav,Share}.kt`, `engagement/{WinBack,DailyChallenge,ShareText,NotificationIntent}.kt`,
  `events/{Events,FirebaseEventConfig}.kt`, `data/{GamePrefs,StreakRules,Ledger}.kt`, `analytics/Analytics.kt`,
  `cosmetics/Skins.kt`, `ui/theme/ThemeDirection.kt`, `res/values/strings.xml`, `tools/{play-rollout,play-upload,play-status,check-vitals}.js`,
  `tools/release-notes/vc39.json`, `GEMINI.md`, `MAJOR_ISSUES_AND_GO_LIVE_CHECKLIST.md`, `DAILY_ACTIVITY.md`.
