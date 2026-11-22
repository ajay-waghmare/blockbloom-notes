# Gemini development specs — vc40, vc41, vc42, vc43

Part 1: vc40 (1.16.0) — below. Part 2: vc41 / vc42 / vc43 — appended when finished.
Owner of every item: Gemini. Read `00-README.md` and `01-day-by-day.md` first.

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
