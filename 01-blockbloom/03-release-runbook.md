# Release runbook

How a Block Bloom release is shipped, with every failure that shaped a step.

> **Updated 22 Nov 2026 for plan v2. What changed and why:**
> - **Gemini runs releases; Ajay gives the go for each production step and merges to `main`** (plan v2 README, "Who
>   owns what"). The Claude skill `02-claude-practices\starter-kit\skills\blockbloom-release\SKILL.md` is history only.
> - **Staged rollout is mandatory.** 1.15.0 (vc38) went straight to 100% and shipped an ANR to every player
>   (incident #001 in the app repo's `MAJOR_ISSUES_AND_GO_LIVE_CHECKLIST.md`).
> - **The four gates** of that checklist are part of every release. The release calendar to 31 Dec is below.
> - **The Play track-update risk is now a rule:** a track update that carries only the new release can drop the live
>   one.
> - The 11 Oct state (`main` behind vc20/vc21, work-laptop build lines) is replaced by the status below. The old text
>   is in git history (`e8fb087`).

## Status (22 Nov 2026, evening; tracks read from the Play API, read-only)

| | |
|---|---|
| Production | **1.15.1 (39) "Stability & Performance", completed (100%)**, notes in 13 languages. It fixed the vc38 ANR |
| Internal | 1.15.1 (39), completed |
| Alpha / beta | alpha: 1.10.0 (19) from the old closed test (harmless: production's 39 is higher); beta: empty |
| Highest versionCode Google holds | **39**, so the next is 40 |
| `main` | `d0235e0` (21 Nov). Every release branch up to vc39 is merged into it (checked 22 Nov) |
| In progress | **`release/vc40` (1.16.0)**, cut from `main` on 22 Nov. Merged: V40-1 onboarding v2, V40-3 push fix, V40-5 honest Shop banner, V40-6 interstitial 150 s gap (code default OFF), V40-8 review rule (custom star dialog removed). Still to merge: V40-2, V40-4, V40-7, V40-9, V40-10, V40-11. The branch still says version 39 |
| Store listings | All 13 languages rewritten honestly on 22 Nov (O-1); the Play edit is committed and waiting for Google's review |

## Who does what

| Who | Release work |
|---|---|
| **Gemini** | Release branch and merges, version and release notes, builds, Gates 1–3, internal upload, real-phone tests, the production commands **after Ajay's go**, the watch, `DAILY_ACTIVITY.md` (app repo) and `journal/<date>.md` (here) the same day |
| **Ajay** | A one-line go for each production step ("go 20%", "go 100%", "halt"); the Halt button in Play Console; the pre-launch report; console-only forms (Data Safety, content rating); merges `release/vcNN` into `main` once it is at 100% |
| **Claude** | No release tasks. Reviews when Ajay asks |

## Release calendar to 31 Dec (plan v2; item specs in `plan-2026-11/02-gemini-dev-specs.md`)

| Release | Branch | Internal | Production | Contents | New SDK |
|---|---|---|---|---|---|
| **vc40 · 1.16.0** | cut 22 Nov | Tue 24 Nov | 20% Wed 25 → 100% Thu 26 Nov | V40-1…V40-11: onboarding v2, first-session hook, push fix, rewarded readiness, remove-ads offers and honest Shop banner, 150 s interstitial gap, chest badge, review rule, Gate A analytics, staged-rollout script, real event strip | no |
| **vc41 · 1.17.0** | cut Thu 26 Nov, after Ajay merges vc40 | Tue 1 Dec | 10% Wed 2 → 50% Thu 3 → 100% Sat 5 Dec | V41-01…05: mediation (AppLovin, Liftoff Monetize, Pangle, Mintegral, Meta), daily loop, reminders v2, referral, friction fixes | **yes** |
| **vc42 · 1.18.0** | cut Mon 7 Dec, after Ajay merges vc41 | Tue 8 Dec | 20% Thu 10 → 100% Fri 11 Dec | V42-01…04: Winter Bloom (live 14–21 Dec through Remote Config), Adventure on Home, starter pack (only if `offer_tap` ≥ 3%), Arrow Bloom card (off) | no * |
| vc43 · 1.18.1 | only if needed | — | slot Fri 18 Dec | Hotfix only (spec R43) | never |

\* If referral phase B (Firebase Auth + Firestore) slips into vc42, it has new SDKs: 10% Thu 10 → 50% Fri 11 → 100%
Sat 12 Dec.

**Freeze from Sat 19 Dec** (holiday review is slow): no release except for a crash loop or a payment bug. Winter Bloom
and Holiday Bloom (24 Dec – 3 Jan) change only through Remote Config.

What can move the calendar (`plan-2026-11/01-day-by-day.md`):
- **Check A, Mon 30 Nov** (vc40: crash-free ≥ 99.5%, ANR < 0.47%, tutorial completion ≥ 80%, no wave of ad
  complaints). If it fails: a vc40 hotfix comes before vc41, vc41 slips, and Burst 1 moves to Christmas week.
- **vc42 not clean on Fri 11 Dec:** halt it. Players stay on vc41 and Burst 1 (12–18 Dec) still runs.
- **A hotfix takes the next versionCode.** A vc41 hotfix becomes 42 (1.17.1), and Winter Bloom becomes 43.

## The flow (every release)

1. **Cut `release/vcNN` from `main`**, only after Ajay has merged the previous release, so `main` equals what is live.
   One release branch per versionCode.
2. **One branch per item** (`feature/v40-<n>-<name>`), in its own worktree. Merge it **into the release branch** when
   its unit tests pass; never into `main`. Copy `keystore.properties` and `local.properties` into every new worktree
   (both gitignored).
3. **Version and release notes on the release branch:** `versionCode` + 1 (never reuse one; check `play-status.js`),
   `versionName`, the comment line in `app/build.gradle.kts`, and `tools/release-notes/vcNN.json` (rules below).
4. **Gates 1–3** of `MAJOR_ISSUES_AND_GO_LIVE_CHECKLIST.md` on the release build, written as passed in
   `DAILY_ACTIVITY.md`.
5. **Build from the release branch with a clean `git status`**, so the bundle matches a commit. Back it up as
   `releases\BlockBloom-v<name>-vc<N>-release.aab` (gitignored).
6. **Internal first:** upload, complete on internal, test on a real phone. Ajay reads the pre-launch report (about 1 h
   after the upload).
7. **Production, staged, on Ajay's go** (rules below). Read the track back after every step.
8. **At 100%, Ajay merges `release/vcNN` into `main` the same day**, then the next release branch is cut. A fix made on
   an old release branch after a cut must be merged forward, or it silently disappears.

Gate 4 of the checklist still says "100% completed" in one go and names `release/2026-10-25`. V40-10 (rule 5)
rewrites it to the staged rule and `release/vcNN`. Until it does, this runbook wins.

## Staged rollout rules

| Release type | Steps | Between steps |
|---|---|---|
| Normal (no new SDK) | internal → 20% → 100% | ≥ 24 h clean |
| New or upgraded SDK (vc41 mediation) | internal → 10% → 50% → 100% | ≥ 24 h clean; Play vitals read before 100% |
| Hotfix (vc43) | internal → 20% → 100% | ≥ 24 h clean |

- **Google's review comes first.** The fraction starts only once the release is approved, and review can take more
  than a day, so no start day is promised. Still open with Ajay: decision 9 in `plan-2026-11/00-README.md`. Is managed
  publishing on, and should the 20% be submitted Tue 20:00 or Wed 09:00 IST?
- **Watch** at +2 h, +6 h, +12 h and +24 h after each step. Look at Crashlytics filtered to the new version, Play
  vitals (`tools/check-vitals.js`; Play data lags 1–2 days) and GA4 realtime events from the new version.
- **Clean** means, for the new version only:
  - no crash signature on 2 or more players;
  - no ANR whose main-thread stack holds an ad SDK (`com.google.android.gms.ads`, `com.applovin`, `com.vungle`,
    `com.bytedance`, `com.pgl`, `com.mbridge`, `com.facebook.ads`) or `com.aweagle.blockbloom.monetize`;
  - no Play "bad behaviour" alert;
  - user-perceived ANR ≤ 0.47%.
- **Read counts, not percentages.** With about 100 daily players, 20% is about 20 players. For the 100% step, decision
  10 recommends "zero new crash signatures and no ANR cluster" (GEMINI.md Law 4) over a crash-free percentage.
- **Halt the same day** for any of these: an ANR cluster or any ad-SDK ANR, a crash cluster (2 or more players, same
  signature), crash-free below 99%, or an AdMob policy notice. Ajay halts in the console, or Gemini runs `--halt` on
  Ajay's word. If an ad SDK is in the stack, Gemini also sets `ads_mediation_enabled=false`.
- **Remote Config first.** If a kill switch fixes it (list: spec R43 rule 2 and §8), use the switch and ship nothing.
- **A halt is not a rollback.** Players who have the build keep it, and the fix ships as the next versionCode. Never
  raise `min_supported_version_code` for this: it is the emergency brake for old builds.

## Commands

Build (Gemini's laptop: `gradlew.bat`; the work laptop needs `build.bat`, which carries the JDK loopback patch; set-up
in `06-new-machine-setup.md`):

```
gradlew :app:testReleaseUnitTest :app:bundleRelease --console=plain
```

Output: `app\build\outputs\bundle\release\app-release.aab`.

Play (Node, no dependencies). `play-upload.js` and `play-rollout.js` read the key file path from env `PLAY_SA_FILE`;
`play-status.js` takes it as the first argument. Never print or commit the key.

```
node tools/play-status.js <key.json> com.aweagle.blockbloom        (read-only: opens an edit, reads, discards it)
node tools/play-upload.js releases/BlockBloom-v1.16.0-vc40-release.aab com.aweagle.blockbloom internal "1.16.0 (40) - First session + ad readiness"
node tools/play-rollout.js 40 com.aweagle.blockbloom internal "1.16.0 (40) - First session + ad readiness" completed
```

Production uses the named flags that V40-10 adds. Do a dry run first, every time; the name must equal the upload's
name:

```
node tools/play-rollout.js 40 --track=production --name="1.16.0 (40) - First session + ad readiness" --fraction=0.2 --dry-run
node tools/play-rollout.js 40 --track=production --name="1.16.0 (40) - First session + ad readiness" --fraction=0.2
node tools/play-rollout.js 40 --track=production --name="1.16.0 (40) - First session + ad readiness" --complete --dry-run
node tools/play-rollout.js 40 --track=production --name="1.16.0 (40) - First session + ad readiness" --complete
node tools/play-rollout.js 40 --track=production --name="1.16.0 (40) - First session + ad readiness" --halt
```

The positional form keeps working (`… production "<name>" inProgress 0.2`: arg 7 is the fraction and forces
`inProgress`; with no fraction it means `completed` at 100%). Before V40-10 that form has no dry run and no read-back,
and it prints "FULL rollout" even for a fraction. V40-10 is therefore P0: vc40 does not go to production without it.

## Play API safety (what has burnt, or nearly burnt, a release)

- **A track update replaces the track's whole release list.**
  - A PUT that carried only the new release dropped the live release inside the edit (Arrow Bloom dry run, 20 Oct).
  - `play-upload.js` sends only the new release, so use it on **internal only**, never on production.
  - It is UNVERIFIED whether Play keeps vc39 serving when `play-rollout.js` sends only vc40 at `inProgress`. The V40-10
    dry run reads the track back inside the edit: it must show vc39 `completed` next to vc40 `inProgress`. If vc39 is
    missing, add it unchanged to the same update, or stop.
- **Play validates at COMMIT, not upload.** A rejected commit after a committed upload burns the versionCode for good.
  On vc16, Play Billing 7.x was rejected and the bundle was held, never rollable.
- **Read the track back after every commit** with `play-status.js`; do not trust the commit output.
- **Never pipe a committing script** (`node x.js | …`). A broken pipe once killed node before the commit: the uploads
  were done and the edit was abandoned.
- **There is no rollback below a shipped versionCode.** A production mistake means: halt, then build the next code.
- Every API commit goes to review (`changesNotSentForReview=true` is rejected). Draft commits do not trigger review;
  `completed` and `inProgress` do.
- The older service-account key (`…d71576f4…`) returned HTTP 401 on 22 Nov; use the current one.

## Before the upload (what has actually burnt a versionCode)

- Merged manifest `app\build\intermediates\packaged_manifests\release\processReleaseManifestForPackage\AndroidManifest.xml`:
  `versionCode`, `versionName`, `package=com.aweagle.blockbloom`, `targetSdkVersion=36`.
- Generated `BuildConfig.java`: `ADS_ENABLED`, `BILLING_ENABLED` and `ANALYTICS_ENABLED` are as intended.
- AdMob ids: Google's **test** ids must never ship with `ADS_ENABLED=true`.
- Library floors Play enforces by scanning the bundle, whatever the flags: Play Billing ≥ 8.0.0. A hotfix never changes
  an SDK version.
- The bundle file is fresh (check its mtime). Exit code 0 is not proof a build ran: `build.bat` has "succeeded" while
  doing nothing.
- Release **name ≤ 50 characters.** A 61-character name failed with HTTP 400. The edit was rejected whole, so that
  code was not burnt.
- Release notes in `tools/release-notes/vcNN.json`, as `[{ "language": "en-US", "text": "…" }, …]`:
  - the same 13 languages as vc39 (ar, de-DE, en-US, es-419, es-ES, id, ja-JP, ko-KR, pt-BR, tr-TR, uk, vi, zh-TW);
  - each text 500 characters or fewer;
  - only languages that already have a store listing (Play's Turkish is `tr-TR`; plain `tr` is rejected);
  - only items that are really in the build.

  `play-rollout.js` stops before any edit when the file is missing.

## Console-only steps (no API)

App content declarations (Ads, Data safety, Content rating, Target audience, App access), the payments profile, the
pre-launch report and the vitals dashboard. Halting also works through the API, but the console is the safer place.

- **A new SDK or identifier changes Data Safety.** Two are due:
  - V40-3's push device identifier: decision 11 in `plan-2026-11/00-README.md`, before vc40's 20%;
  - vc41's mediation networks: Ajay updates the form before the 10% step (V41-01 part I).
- **Listing text must be true for every live version.** Ads and purchases have been live since vc23 (October). The 13
  listings were rewritten honestly on 22 Nov (O-1). Never again "no ads", "nothing interrupts" or a size claim.

## Store listings and screenshots (scripts in `scripts\`)

- Text per locale: `play-listing-set.js` (one locale, `--dry-run` first) or
  `play-listings-set-multi.js <sa> <pkg> bundle.json` (many locales, one edit, one commit,
  in-edit read-back, retries Google's random 502s). Both fail closed on length limits and promo
  words in titles.
- Verify live text **in-process** with `play-listings-verify.js` (sha256 of live vs sent).
  Never verify through a shell redirect; Git Bash splits multibyte characters at chunk boundaries.
- Write listing JSON via Node (UTF-8), never PowerShell `Set-Content`.
- Screenshots: `play-images-pull.js` (full-res with `=s0`), `play-images-push.js <sa> <pkg> <lang> <ordered.json>`
  (deleteall, upload, commit; 2-8 images). Captioned renders came from `render.ps1`
  (.NET System.Drawing, Yu Gothic UI for Japanese, top panel >= 340 px, 24-bit PNG, no alpha).
- Localised listing production pipeline: research -> draft -> native review per locale as a
  Workflow `pipeline()`, `build-bundle.js` to assemble, then set-multi. About 150k tokens per locale.

## Record every step

- `DAILY_ACTIVITY.md` in the app repo and `journal/<date>.md` here, the same day: what moved, the track read-back,
  crash and ANR counts, and Ajay's go or halt.
- After Ajay's merge to `main`, put the merge commit in the journal.

## Incidents behind these rules

| Release | What happened | Rule it gave |
|---|---|---|
| vc15 | Built straight from a feature branch; `main` was never updated | Build from `release/vcNN`; merge to `main` at 100% |
| vc16 | Play Billing 7.x rejected at commit; the versionCode was burnt | Check library floors before the commit |
| vc20 | A hard-coded release-notes constant still held vc15's text | Notes per release in `vcNN.json`; no file, no run |
| vc20 | A 61-character release name failed (HTTP 400) | Name ≤ 50 characters |
| vc38 · 1.15.0 | AdMob init lock contention ANR, shipped straight to 100% (incident #001) | Gate 1 thread audit; staged rollout |
| Arrow Bloom vc2 (20 Oct) | A track update with only a draft dropped the live release (seen in a dry run) | Carry live releases over; read back |
