# Play Store Publishing — AW EagleCraft (BlockBloom + QuizMaster)

Set up 2026-06-03. Publishing the personal Android games to Google Play, fully scriptable via the
Play Developer API. **CHECK THIS before any Play Store / release / upload work.**

## Google Play developer account
- Name: **AW EagleCraft** · type: **Personal** · Account ID: **8701670281323658688**
- Console login: **ajaywaghmare00a@gmail.com** (personal Gmail — NOT the qispine email)
- Console: https://play.google.com/console/u/1/developers/8701670281323658688/
- Android developer verification: done.
- ⚠️ New personal account → **production requires a CLOSED test with 12+ testers opted in for 14
  continuous days, then "apply for production access" (Google review).** No API/shortcut around the 14 days.

## Play Developer API access (service account)
- SA: **play-publisher@avid-airway-498216-e5.iam.gserviceaccount.com** · GCP project: **avid-airway-498216-e5**
- JSON key (LOCAL, never commit): **D:\Downloads\avid-airway-498216-e5-9f357c8e6b11.json** (verified working 2026-06-21).
  ⚠️ The old key `C:\Users\Ajay.Waghmare\Downloads\...-d71576f4a504.json` is **GONE** (Downloads moved to D:, key rotated). If a script reports `ENOENT` on the key, it's looking at the dead path — use the D:\Downloads one above.
- Scope: `https://www.googleapis.com/auth/androidpublisher`. SA has release/listing/review perms (verified on com.aweagle.blockbloom).
- Auth: build RS256 JWT from the SA private_key → POST token_uri for an access token.
  **Node here is < 18 (no global `fetch`) → use the built-in `https` module.**

## Upload keystore (shared "AW Eagle")
- File: **D:\DevTools\keystores\aw-eagle-upload.jks** (PKCS12) · Alias: **aw-eagle**
- **Password lives in each app's gitignored `keystore.properties`** (BlockBloom + QuizMaster). Not duplicated
  here on purpose (upload key; resettable via Play App Signing if lost). Ask me to add it if you want it here.
- Cert SHA-256: `36:03:61:51:86:DE:F4:77:8F:1C:99:76:90:FA:9B:CD:24:50:B8:51:55:DB:D5:A9:64:85:15:79:27:C2:05:DA`
- `keytool` genkeypair does NOT need the loopback patch. Each `app/build.gradle.kts` loads `keystore.properties`
  into a `signingConfigs { release {...} }` block.

## App status
### BlockBloom — `com.aweagle.blockbloom` (renamed from com.qispine.blockbloom)
- In Play Console. Signed release **AAB built** (5.18 MB, R8 minify+shrink ON) → `app/build/outputs/bundle/release/app-release.aab`.
- **Uploaded** to internal track as DRAFT, versionCode 1 (via API).
- **Store listing fully pushed via API**: title "Block Bloom: Block Puzzle", short+full desc, contact email,
  icon 512, feature 1024x500, 7 phone screenshots (from `testshots/`). Source copy in `D:\DevTools\BlockBloom\store\`.
- **Privacy policy LIVE**: https://ajay-waghmare.github.io/app-policy/privacy-policy.html
- Shipping FIRST release **without real ads** (FakeAdHost/FakeBillingHost) → data safety = none, ads = No (fastest review).
  Wire real AdMob/Billing in a later update.
- To production: App content forms (console-only) → closed test + 12 testers → 14 days → apply for production → promote via API.
- ✅ **PRODUCTION ACCESS GRANTED (2026-06-21).** Gate cleared. Live track state via API on that date:
  bundles on Google = vc1,2,3,5; **alpha (closed)** = vc5 "1.0 (5) - sound music and polish" (completed) = the build testers actually ran;
  internal = vc3; beta empty.
- **DECISION (Ajay, 2026-06-21): ship the PROVEN build to production, NOT the latest.** vc5 (already battle-tested through the
  14-day closed test, and already polished) is what we promoted — NOT the newer untested vc10 noads build. Lower risk; vc5 already has sound+music+polish.
- ✅ **vc5 SUBMITTED TO PRODUCTION FOR REVIEW (2026-06-21).** Flow: I staged it as a draft via API (`scratchpad\stage-prod-draft.js`,
  release "1.0 (5)", en-US notes); Ajay finalized in the console — selected **all 177 countries/regions**, "Ready to release" (no blocking errors),
  **Submit 3 changes for review**. API now shows `production` = "1.0 (5)" vc5 **status=completed** (=100% rollout defined; "in review" is server-side).
  Awaiting Google approval → email when live. Monitor: console Publishing overview → Submission activity, or re-run `scratchpad\status-probe.js`.
  **Next prod update = newer build (e.g. vc10 noads, or +ads later) — normal promotion, NO new 14-day test required.** Reuse stage-prod-draft.js with the new vc.
- **vc10 (polished "very good UI/interaction" noads build, 2.59 MB) PUSHED TO ALL THREE TRACKS 2026-06-21:** internal (completed), closed/alpha
  "1.5 (10) - UI polish" (completed), and **production "1.5 (10)" (completed → in Google review)**. Bundles on Google = vc1,2,3,5,10.
- **DECISION (Ajay, 2026-06-21):** asked to add vc10 to closed testing AND production. I flagged vc10 had only run on the emulator and offered
  (1) stage-draft+his click, (2) full API rollout now, (3) hold for tester verification. **He chose (2) full rollout now via API.** Pushed `production` vc10 status=completed.
  vc5 stays LIVE to users until vc10 passes review (normal update — no gap). Future bug → halt rollout in console or re-promote vc5.
- **Reusable scratchpad scripts (synchronous-logging variants that dodge the node stdout-buffering blindness):** `upload-internal.js` (upload AAB + publish to a track),
  `promote-track.js` (promote an already-uploaded vc to any track/status), `stage-prod-draft.js`, `status-probe.js`. Scratchpad is ephemeral; the durable equivalents
  live in `D:\DevTools\BlockBloom\tools\` (play-upload.js / play-rollout.js / play-status.js) and work the same — just remember to Read their own progress file, not the harness task .output.
  ⚠️ Committing a **draft** does NOT trigger review; only a `completed`/`inProgress` release does — `changesNotSentForReview=true` is still rejected (HTTP 400) by this account.
- **Node stdout gotcha (2026-06-21):** node block-buffers stdout when redirected to a file and the harness auto-backgrounds these network scripts → the
  task .output file looks empty even on success. Fix: have the script `fs.writeFileSync` its own progress/result to an explicit file after each step (see stage-prod-draft.js / status-probe.js), then Read that file.

#### BlockBloom — growth phase (2026-07-13)
- ~3 weeks post-launch: acquisition (not retention/quality) is the bottleneck — last known 12 installs (Jun-22), 0 text reviews. Diagnosis: zero distribution + zero ratings = zero search impressions in the most crowded Play category; **not** an app-quality problem.
- **ASO listing rewrite PUSHED LIVE via API (2026-07-13)**: short desc now leads with differentiators ("Relaxing 8x8 block puzzle. No ads, no wifi needed, under 1 MB. Free forever!"); full desc opens with 🚫 NO ADS · 📶 100% OFFLINE · ⚡ UNDER 1 MB block + keyword-worked copy (8x8 grid, wood block, brain game, no wifi). Script: `scratchpad\listing-update.js`. Verified round-trip UTF-8 clean (PS console mojibake = display only; Read the probe file, don't trust Get-Content).
- ⚠️ **"No ads" is now a public listing promise — when AdMob ships in a future build, the listing copy MUST change in the same release.**
- Agreed growth plan: (1) 30+ ratings from testers/friends via personal WhatsApp asks — biggest ranking unlock; (2) WhatsApp status/groups; (3) faceless YT Shorts/Reels 3-5/wk; (4) Reddit r/AndroidGaming, r/playmygame, r/IndianGaming ("under 1 MB, no ads" hook); (5) vc11 product lever: Wordle-style daily share + streak-reminder notification (+ staged edge-to-edge fix); (6) optional paid UAC ₹300-500/day AFTER retention confirmed. Install/rating stats are Console-only (not in publisher API) — ask Ajay for Dashboard/Statistics/Vitals numbers.

### BlockBloom — vc11 MONETIZATION BUILD (2026-07-13, built + BLOCKED on console declaration)
- **Goal:** turn on revenue (Ajay's ask) BEFORE any paid UAC spend. Monetization scaffolding was already fully wired in source post-vc10
  (AdMobAdHost active in GameViewModel:139, revive/double-coins/skin rewarded flows, interstitial capped every 3rd playAgain, banner in GameScreen, NoOpBillingHost).
- **vc11 changes (versionCode 11 / versionName 1.6):** (1) all 4 AdMob IDs centralized in `app/build.gradle.kts` (manifestPlaceholder `admobAppId` + 3 buildConfigFields) —
  currently Google OFFICIAL TEST IDs, **go-live swap = that one file**; (2) **UMP consent flow** added to AdMobAdHost (`start(activity)` from onActivityReady — consent → background
  MobileAds.initialize → loads → `onReady` flips `state.adsActive`); (3) banner gated on `adsActive` (no pre-consent ad requests); (4) **purchase UI gated on `BillingHost.available`**
  (NoOp=false → gem packs + Remove-Ads buttons hidden until real billing) — never show buy buttons that can't purchase; (5) edge-to-edge themes.xml fix rides along.
- Debug build ✓, unit tests ✓, emulator E2E ✓ (launch clean, UMP ran, ad-load fail degrades gracefully — emulator has no WebView/JavascriptEngine so ads can't render there; banner check needs a real phone).
- AAB: `releases\BlockBloom-v1.6-vc11-testads-release.aab` (5.67 MB — ads SDK added ~3.5 MB (AAB was 2.59); "under 1 MB" listing line must change when this ships).
- ✅ **UNBLOCKED + vc11 LIVE ON INTERNAL (2026-07-19):** Advertising-ID declaration flipped to Yes in console (saved as pending draft, "Not now" on send-for-review) →
  **the AD_ID upload gate keys off the SAVED state, not the reviewed state** — upload committed immediately (internal = "1.6 ads QA (11)"). Declaration still pending
  send-for-review in Publishing overview (harmless; will ride along with a future publish).
  **Two-phase declaration plan (browser agent pushed back on my do-it-all-now sheet — correctly) lives in `D:\DevTools\BlockBloom\docs\PLAY_CONSOLE_ADS_DECLARATIONS.md`:**
  Phase 1 (done) = only the Advertising-ID toggle; Phase 2 at production = Ads=Yes + Data safety **filled from Google's official AdMob disclosure page** (SDK collects 4 types:
  IP-derived approx location, app interactions, diagnostics, device IDs — NOT just device IDs; my earlier template was wrong) + listing copy de-"NO ADS"-ed in the same release.
  **NEXT: Ajay adds his phone's Google account as internal tester + installs via opt-in link → verifies test ads → then AdMob account → real IDs → Phase 2 → production.**
- **Before vc11 → PRODUCTION checklist:** real AdMob IDs in build.gradle.kts + rebuild; Data safety = collects Device/other IDs, shared, Advertising purpose; App content Ads = "contains ads";
  content-rating questionnaire may re-ask about ads; **listing copy MUST drop "NO ADS"/"under 1 MB" claims in the same release**; consider gaming eCPM floor later. Test IDs NEVER to production.
- Machine gotcha (2026-07-13): host RAM-starved → Gradle test JVM OOM (pagefile err 1455; fix = kill my own 19:3x java daemons, NOT the older ones) and emulator display pipeline went white (app process stayed healthy — verify via pidof+logcat, not screencap).

### BlockBloom — vc12 GROWTH BUILD (2026-07-20, LIVE ON INTERNAL, prod decision pending)
- **Engine A of the zero-budget growth strategy** (3 engines: A=product-led/me, B=founder 14-day calendar in `marketing\MARKETING_PACK.md`, C=compounding loops).
- vc12 (versionCode 12 / 1.7), AAB `releases\BlockBloom-v1.7-vc12-growth-release.aab` (5.69 MB), tests ✓, **internal track "1.7 growth QA" ✓**:
  (1) **In-app review prompt** — NEW `engagement/ReviewPrompter.kt` (Play In-App Review API via `review-ktx:2.0.1`), fires at 3rd/12th/30th positive moment
  (level win / daily done / new best), own "review" prefs file, failure-proof; wired at crossedBest + level-success + challenge-done in GameViewModel (which now holds its own activityRef WeakReference).
  (2) Daily Wordle share — ALREADY EXISTED (dailyShareText + Home card Share); don't rebuild.
  (3) **"More games by AW EagleCraft"** Settings row → dev page `https://play.google.com/store/apps/dev?id=8701670281323658688` (DEVELOPER_PAGE_URL).
  (4) **`ADS_ENABLED` buildConfigField kill-switch** (currently true): false = AdMob never starts (start() skipped → adsActive never flips) and ALL ad surfaces hide —
  Dialogs revive/double-coins buttons now gated on `state.adsActive` too. Lets a no-ads growth build ship to prod while AdMob IDs are pending.
- **DECISION: Ajay chose Option A (2026-07-20) → EXECUTED.** **vc13** (versionCode 13, "1.7", `ADS_ENABLED=false`, AAB `releases\BlockBloom-v1.7-vc13-noads-growth-release.aab`)
  = same growth code as vc12 but ads OFF → **SUBMITTED TO PRODUCTION status=completed** ("1.7 (13) - growth", in Google review; vc10 serves users until approval).
  Also added manifest `com.google.android.gms.ads.DELAY_APP_MEASUREMENT_INIT=true` (permanent): keeps the compiled-but-never-initialized ads SDK from auto-collecting at
  process start → "no data collected" Data safety stays TRUE for ads-off builds, and pre-consent measurement stays off for future ads-on builds.
  Track state now: production=vc13 (review), internal=vc12 ads QA (kept for phone preview of test ads), alpha=vc10. New AAB needs NEW versionCode (12 was taken by the ads-on QA build).
  **Next BlockBloom release = vc14: real AdMob IDs + ADS_ENABLED=true + Phase-2 declarations + listing copy change, all in one release** (see PLAY_CONSOLE_ADS_DECLARATIONS.md).

### BlockBloom — SDK 35 edge-to-edge warnings (2026-06-22, NON-blocking)
- Play "recommended actions" on the vc10 release: (1) edge-to-edge display, (2) deprecated `Window.setStatusBarColor`/`setNavigationBarColor` + `LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES`. **Both benign — app is live & correct.**
- Insets ARE handled: every screen uses `.statusBarsPadding()`+`.navigationBarsPadding()` → no content under bars. `enableEdgeToEdge()` already in MainActivity:50.
- **Fix applied to source (rides next build, NOT shipped yet):** removed `android:statusBarColor`/`android:navigationBarColor` from `app/src/main/res/values/themes.xml` (dead under edge-to-edge = the app-side deprecated-API source).
- Residual flag = `enableEdgeToEdge()`'s own internal compat calls in `androidx.activity:activity-compose:1.9.0` (Google's API tripping Google's flag) — benign; optional to clear via lib bump. **Don't cut a release just for these — fold into the next feature/ads update (vc11).**

## QuizMaster — `com.aweagle.quizmaster` (renamed from com.qispine.quizmaster, 2026-06-03)
- Scrubbed "qispine" everywhere (14 kt files + build.gradle + proguard + README; folder `com/qispine`→`com/aweagle`).
  Signing config added (mirrors BlockBloom) + `keystore.properties`.
- Release AAB builds & signs (9.44 MB, minify OFF — enable R8 later to ~halve it).
- ⛔ **NOT yet created in Play Console** → can't upload until the app entry is created manually
  (**the API CANNOT create apps**). Then upload via play-upload.js.

## KEY API LIMITATION (learned)
The Android Publisher API has **NO endpoint** for the **App content / policy declarations** — App access, Ads,
**Content rating (IARC)**, **Target audience**, **Data safety**. These are **console-only legal attestations**
(do them in Play Console, or via the Chrome extension driving the UI). The API DOES cover: releases/tracks/rollout,
store-listing text, images (icon/feature/screenshots), contact details, testers, pricing, reviews.
- **App content lives INSIDE an app**, not at account level → Play Console → open the app → Policy → App content
  (or the Dashboard "Set up your app" checklist).
- Fast answers for these offline no-ads games: Ads=No · App access=all functionality available · Data safety=no
  data collected/shared · Content rating=Everyone · Target audience=13+ · Category=Games › Puzzle.

## Scripts (currently in %TEMP%; TODO move to D:\DevTools\play-tools\ to make permanent)
- `play-token-test.js <key> [pkg]` — mint token / test app access.
- `play-status.js <key> <pkg>` — read app details, release tracks, reviews.
- `play-upload.js <key> <pkg> <aab> [track=internal]` — upload AAB → track (draft) → commit.
- `play-listing.js <key> <pkg>` — push listing text + contact + icon/feature/screenshots → commit.
- `GenGraphics.java` (Java2D headless) — make 512 icon + 1024x500 feature graphic. Run:
  `javac GenGraphics.java` then `java "-Djava.awt.headless=true" -cp <dir> GenGraphics <outDir>`.
  **Quote `-D...` JVM args in PowerShell** or they mis-parse.
- Build release bundle: `build.bat :app:bundleRelease` (applies the loopback patch).

## GitHub
- Username: **ajay-waghmare**. Repos: `Demo`, `app-policy` (privacy policy; Pages enabled →
  https://ajay-waghmare.github.io/app-policy/privacy-policy.html).
- **`gh` CLI is NOT installed.** Plain `git` works; push from `D:\DevTools\app-policy` has creds. Fresh clones aren't auto-authed.
- Render GitHub HTML without Pages: `https://raw.githack.com/<user>/<repo>/<branch>/<file>` serves `text/html`.
  (jsDelivr serves `.html` as `text/plain` — don't use it for a viewable page.)

## Environment gotchas
- Shell commands writing OUTSIDE the session project (D:\QiSpine) to D:\DevTools need `dangerouslyDisableSandbox: true`. Network + reads work in the sandbox.
- `Remove-Item -Recurse -Force` on a variable path is blocked by a safety guard → clone into a fresh dir instead of pre-deleting.
- Gradle/Android builds need the loopback patch — see `env_android_gradle_loopback_fix.md`.
