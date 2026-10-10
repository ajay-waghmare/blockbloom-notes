# Release runbook

How a Block Bloom release is actually shipped, with every failure that shaped a step. The
Claude-facing version is `02-claude-practices\starter-kit\skills\blockbloom-release\SKILL.md`.

## The flow (set 2 Oct 2026)

1. **Cut `release/vcNN` from `main`.** One release branch per versionCode.
2. **Develop each feature on its own branch, in its own worktree**, cut from `main`.
   `git worktree add D:\DevTools\BlockBloom-<name> -b feature/<name> main`.
   Copy `keystore.properties` and `local.properties` into every new worktree (both gitignored).
3. **Merge features INTO the release branch**, never into `main`.
4. **Bump `versionCode` / `versionName` on the release branch.** A versionCode can never be
   reused: check `play-status.js` for the highest code Google holds before picking.
5. **Build from the release branch** with a clean `git status`, so the AAB matches a commit.
6. **Verify the artifact before upload** (step 8 below).
7. **Upload once, then roll out per track.** Internal first, you play it on your phone, then
   production at 20%, then widen.
8. **Merge `release/vcNN` into `main` once it is in production.** This is the step that keeps
   `main` equal to what ships. It is currently overdue for vc20 and vc21.
9. **Next release cuts from `main`.** Any fix made on an old release branch after a cut must be
   merged forward or it silently disappears.

## Commands

Build (release worktree, work-laptop paths; on a healthy machine drop `JDK_JAVA_OPTIONS`):

```
cd D:\DevTools\BlockBloom-<rel>
set JAVA_HOME=D:\DevTools\Android\Jdk17\jdk-17.0.10+7
set ANDROID_HOME=D:\DevTools\Android\Sdk
set JDK_JAVA_OPTIONS=--patch-module java.base=%CD%\tools\jdkpatch\out
gradlew :app:testDebugUnitTest :app:lintVitalRelease :app:bundleRelease --console=plain
```

Output: `app\build\outputs\bundle\release\app-release.aab` (about 8.7 MB). Back it up as
`releases\BlockBloom-v<name>-vc<N>-<theme>-release.aab` (the folder is gitignored).

Play (Node, zero dependencies, credential by path):

```
set PLAY_SA_FILE=D:\Downloads\avid-airway-498216-e5-9f357c8e6b11.json
node tools\play-status.js %PLAY_SA_FILE% com.aweagle.blockbloom                       (read-only)
node tools\play-upload.js app\build\outputs\bundle\release\app-release.aab com.aweagle.blockbloom internal "1.12.0 (22) - Theme"
node tools\play-rollout.js 22 com.aweagle.blockbloom internal "1.12.0 (22) - Theme" completed
node tools\play-rollout.js 22 com.aweagle.blockbloom production "1.12.0 (22) - Theme" inProgress 0.2
node tools\play-rollout.js 22 com.aweagle.blockbloom production "1.12.0 (22) - Theme" completed      (= 100%)
```

Release notes: `tools\release-notes\vc22.json` as `[{ "language": "en-US", "text": "..." }, ...]`.
The `main` copy of `play-rollout.js` wants `PLAY_RELEASE_NOTES=<path>`; the release-branch copy
auto-loads `tools/release-notes/vc<N>.json`. Reconcile when you merge (keep the auto-path, drop
the silent fallback text).

## Pre-upload verification (what has actually burnt a versionCode)

Play validates at **COMMIT, not upload**. A rejected commit after a committed upload consumes the
versionCode forever (vc16: Play Billing 7.x rejected, bundle held, never rollable). Check before
the commit:

- Merged manifest `app\build\intermediates\packaged_manifests\release\processReleaseManifestForPackage\AndroidManifest.xml`:
  `versionCode`, `versionName`, `package=com.aweagle.blockbloom`, `targetSdkVersion=36`.
- Generated `BuildConfig.java`: `ADS_ENABLED`, `BILLING_ENABLED`, `ANALYTICS_ENABLED` as intended.
- AdMob ids: Google **test** ids must never ship with `ADS_ENABLED=true`.
- Library floors Play enforces by scanning the bundle, regardless of flags: Play Billing >= 8.0.0.
- AAB mtime is fresh. Exit code 0 is not proof a build ran (`build.bat` has "succeeded" while doing nothing).
- Release **name <= 50 characters** (61 characters failed with HTTP 400; that one did not burn the code because the edit was rejected whole).
- Every release-notes locale must already have a **store listing** (`scripts\play-locales.js` lists them: ar, de-DE, en-US, es-419, es-ES, id, ja-JP, ko-KR, pt-BR, tr-TR, uk, vi, zh-TW). Play's Turkish code is `tr-TR`; plain `tr` is rejected.
- Each note <= 500 characters.

## Rollout rules

- Staged first: arg 7 of `play-rollout.js` is the fraction and forces `status=inProgress`.
  `completed` with no fraction is 100%.
- After every commit, **read the track back** with `play-status.js`. Do not trust the commit output.
- **Never pipe a committing script** (`node x.js | sed ...`): a broken pipe killed node before
  `:commit` once, leaving uploads done and the edit abandoned.
- There is **no rollback** below a shipped versionCode. A production mistake means: halt the
  rollout in the console, then build the next code.
- This app forces every API commit through review (`changesNotSentForReview=true` is rejected).
  Draft commits do not trigger review; `completed`/`inProgress` do.
- A new app's first release must be created in the console UI; the API cannot do it.
- Internal testing does not count toward the closed-test clock; that was alpha.

## Console-only steps (no API exists)

App content declarations: Ads, Data safety, Content rating, Target audience, App access.
Payments profile and KYC status. Pre-launch report. Vitals dashboard. Halting a rollout is
possible via API but the console is safer.

Any build that turns ads or purchases on also needs, **in the same release**: the "Contains ads"
declaration, Data safety re-derived from Google's AdMob disclosure page, the privacy policy, and
the 13 store listings rewritten (several still promise no ads / no in-app purchases; one opens
with "NO ADS"). `docs\PLAY_CONSOLE_ADS_DECLARATIONS.md` has the two-phase plan.

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
