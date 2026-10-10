---
name: blockbloom-release
description: Ship a Block Bloom build to Google Play safely — release-branch flow, artifact verification, upload, staged rollout, read-back. Use for any "release", "upload", "roll out", "promote", "versionCode" request on com.aweagle.blockbloom.
---

# Block Bloom release procedure

Read `project_blockbloom_release.md` (memory) first for the current track state, then follow this
in order. Never skip a verification step: Play validates at **commit**, and a rejected commit
after a committed upload burns the versionCode forever (this cost vc16).

## 0. Preconditions (ask Ajay if any is unclear)
- Which versionCode / versionName. Run `node tools/play-status.js <sa.json> com.aweagle.blockbloom`
  (read-only) and pick a code higher than anything Google holds.
- Which branch. The flow is: `release/vcNN` cut from `main`; features merged INTO it; bump on it;
  build from it. If Ajay directs a different base (vc21 was cut from `release/vc19`), note that any
  fix on the old branch must be merged forward.
- Credential by path only: `PLAY_SA_FILE=<path to avid-airway-*.json>`. Never inline it.
- `keystore.properties` + `local.properties` present in the worktree you build in.

## 1. Build (in the release worktree, clean `git status`)
```
gradlew :app:testDebugUnitTest :app:lintVitalRelease :app:bundleRelease --console=plain
```
On the work laptop this also needed `JDK_JAVA_OPTIONS=--patch-module java.base=<wt>/tools/jdkpatch/out`.
Output `app/build/outputs/bundle/release/app-release.aab`. Back it up under `releases/` with the
version in the name.

## 2. Verify the artifact BEFORE upload
- Merged manifest `app/build/intermediates/packaged_manifests/release/processReleaseManifestForPackage/AndroidManifest.xml`:
  versionCode, versionName, `package=com.aweagle.blockbloom`, targetSdk 36.
- `BuildConfig.java`: `ADS_ENABLED`, `BILLING_ENABLED`, `ANALYTICS_ENABLED` exactly as intended.
  Google TEST AdMob ids must never ship with `ADS_ENABLED=true`.
- AAB mtime is from this build (exit 0 is not proof).
- Library floors Play scans for: Play Billing >= 8.0.0.
- Release notes file `tools/release-notes/vc<N>.json` exists: `[{language,text}]`, each text <= 500
  chars, every language present in the store listings (`play-locales.js`; Turkish is `tr-TR`).
- Release name <= 50 characters.

## 3. Upload once, stage on internal
```
node tools/play-upload.js app/build/outputs/bundle/release/app-release.aab com.aweagle.blockbloom internal "<name>"
node tools/play-rollout.js <N> com.aweagle.blockbloom internal "<name>" completed
```
Run bare — **never pipe** these commands (EPIPE has killed a commit before). Then read back with
`play-status.js`. Ajay installs the internal build on his phone before anything goes further.

## 4. Production, staged
```
node tools/play-rollout.js <N> com.aweagle.blockbloom production "<name>" inProgress 0.2
```
Arg 7 is the fraction and forces `inProgress`. Read back. Widening to 100% = same command with
`completed` and no fraction. **Only on Ajay's explicit go** for each step.

## 5. After production
- Merge `release/vcNN` into `main` so `main` equals what ships — only when Ajay says so (his
  never-merge-master rule exists; confirm which reading applies).
- Update `project_blockbloom_release.md`: the CURRENT STATE block, the timeline row, any new gotcha.
- Watch Crashlytics / GA4 `app_exception` before suggesting a wider rollout.

## Known failure modes
- 400 INVALID_ARGUMENT on commit: name too long, unknown locale, bad fraction. Edit rejected whole, code not burned.
- 403 on rollout after a successful upload commit: library floor violation; code IS burned.
- `changesNotSentForReview=true` is rejected by this app: every commit goes to review.
- No rollback below a shipped versionCode: halt in the console, build the next code.
- Any build turning ads or purchases on needs, in the same release: "Contains ads", Data safety,
  privacy policy, and rewriting the 13 listings that promise no ads / no IAP.
