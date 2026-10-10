---
name: feedback-blockbloom-release-process
description: Block Bloom release flow — a release/vcNN branch cut from main lives until that build reaches production; features merge INTO it; main is merged at the end
metadata:
  node_type: memory
  type: feedback
  originSessionId: f4795aa1-7942-4344-a6c4-e7b6487ba3f4
  modified: 2026-10-02T08:01:03.984Z
---

**SUPERSEDED the old "merge to main FIRST, build from main" rule on 2026-10-02.** Ajay changed the
process while shipping vc19. Do not follow the old order; it is kept at the bottom only for the
reasoning behind one of its rules, which still applies.

## Current flow (stated 2026-10-02)

1. **Cut `release/vcNN` from `main`** when a release starts. One release branch per versionCode.
2. **Features are still developed on their own branches** (one worktree per requirement, cut from
   `main`), then **merged INTO the release branch** — not into `main`.
3. **The versionCode / versionName bump lives on the release branch**, not on `main`.
4. **Build the AAB from the release branch** and upload to Play from there.
5. **The release branch stays in use until that build reaches production.** Any further fix for
   that release goes onto a feature branch and is merged into the SAME release branch — do not
   cut a new release branch mid-cycle.
6. **Merge `release/vcNN` into `main` at the end**, once it is in production.
7. **The next release cuts `release/vc(NN+1)` from `main`** — so `main` must have received the
   previous release branch first.

**Why the change:** vc19 carried three independent feature branches plus a version bump that
should not sit on `main` until the build is actually live. A release branch gives one place to
assemble and re-test the combination, and keeps `main` matching what is really on phones.

**The one rule that carried over:** `main` must end up equal to what shipped. The vc15 release was
built straight from `feature/vc15-retention` and `main` was never updated, so the branch that
produced the live build and the branch everyone treats as truth were different commits. Step 6
exists to stop that recurring — it is the step to actually do, not skip.

## How to apply

- Before `bundleRelease`, confirm the worktree is on `release/vcNN` and `git status` is clean, so
  the uploaded AAB matches a real commit.
- Verify the artifact BEFORE uploading: Play validates at **commit**, not upload, and a rejected
  commit permanently burns the versionCode (this cost vc16). Check the merged manifest for the
  expected `versionCode`/`versionName`/`package`, and check `ADS_ENABLED=false`,
  `BILLING_ENABLED=false`, `ANALYTICS_ENABLED=true` in the generated `BuildConfig.java`.
- Upload once (`tools/play-upload.js`), then `tools/play-rollout.js` per track. One AAB serves
  internal, alpha, beta and production.
- Don't push or roll out unless Ajay asks.


## Added 4 Oct 2026, from shipping vc20 to production

- **Release notes are passed per run, never hardcoded.** `tools/play-rollout.js` used to carry a
  `RELEASE_NOTES` constant. It still held **vc15's** text four releases later and would have
  announced "streak shield, daily reminders" on top of a localisation release. It now reads
  `PLAY_RELEASE_NOTES=<path to JSON>` and **refuses to run without it** — a default that is right
  once is silently wrong for every release after it. Notes live in `tools/release-notes/vcNN.json`.
- **A release NAME is capped at 50 characters.** A 61-character name failed the commit with HTTP 400
  `INVALID_ARGUMENT`. The edit was rejected so nothing changed and the versionCode was NOT burned,
  but check the length first.
- **Only send release notes for locales that already have a store listing.** Check with
  `play-locales.js`; Play rejects the COMMIT otherwise, and a rejected commit is what burns a
  versionCode. 13 listings exist (ar, de-DE, en-US, es-419, es-ES, id, ja-JP, ko-KR, pt-BR, tr-TR,
  uk, vi, zh-TW); locales without notes fall back to en-US.
- **Staged rollout:** `play-rollout.js <vc> <pkg> production "<name>" inProgress 0.2`. Arg 7 is the
  fraction and passing it forces `status=inProgress`. Afterwards verify by reading the track back
  with `play-status.js` — do not trust the commit output alone.
- **Do not pipe a committing script.** EPIPE has killed a commit before; run `play-rollout.js` bare.
- **Deviation on vc21:** Ajay asked for `release/2026-10-09` to be cut from `release/vc19`, not from
  `main` as step 7 says. That was deliberate and user-directed. The consequence is that any fix made
  on `release/vc19` after the cut must be **merged forward** into `release/2026-10-09` or it silently
  disappears from the next build.

Related: [[feedback-worktree-per-requirement]], [[project-blockbloom-release]].
