# Techniques that worked (keep these)

Grouped by what they are for. Each one earned its place on Block Bloom or on the work repos.

## Getting accurate answers out of Claude

- **Put conventions where they load.** If a mistake recurs, write the correction into the file
  that loads before the work (repo `CLAUDE.md`, a feedback memory), not into chat.
- **Grep/Glob to locate, Read only the span.** A Read costs the whole file. Subagents for
  fan-out reads so the main context stays clean, but only when a few greps won't settle it.
- **Distrust "DONE" claims and paths in memory.** Re-run the check. Memory on this laptop still
  held a dead `D:/Service` path for months.
- **Split a surprising number before explaining it.** The 2-3 Oct GA4 spike was blamed on
  emulator testing until it was split by `appVersion`; the debug build was 1 user.
- **Test the built thing, not the diff.** Two analytics seams were dead code that read fine;
  only running the APK with Firebase verbose logging showed zero events. The fix was a unit test
  that fails the build when an event constant has no call site (`AnalyticsTest`).
- **Negative controls.** That test was proven by injecting a dead constant and watching it fail.
- **Verification is on the deployed artefact.** Check the merged manifest, `BuildConfig`,
  `aapt` badging and the file's mtime; exit code 0 has lied twice.

## Shipping safely

- **Dry-run modes in every mutating script** (`--dry-run` = PUT + read-back + delete the edit).
  The Turkish locale code bug (`tr` vs `tr-TR`) was caught this way, before a commit.
- **One edit, one commit, in-edit read-back** for multi-locale listing pushes, with retries on
  Google's random 502s: a partial publish is worse than a clean failure.
- **Byte-verify what went live, in-process** (sha256 of live vs sent). Shell redirects split
  multibyte characters and produce false diffs.
- **Fail closed on limits.** Title length, promo words, missing brand name, locale set: the
  script refuses rather than letting Play reject the commit (which burns the versionCode).
- **Staged rollout, then widen.** 20% first on every production release since vc18.
- **Back up before any destructive edit, and print what would change before `--apply`.**
- **Release notes in a file per release**, in all the locales the store has, checked against the
  live locale list before sending.
- **Scripts take credentials by path and have zero dependencies.** They survive Node upgrades,
  machine moves and `npm install` not being allowed.

## Branching and process

- **Release branch per versionCode**, features merged into it, main merged at the end so main
  equals what is on phones. The one time it was skipped (vc15), the live build and "truth"
  diverged for a week.
- **Worktree per feature** (21 of them for the six-language release). Disposable.
- **Merge forward** any fix made on an old release branch after the next one was cut.
- **Pickaxe before scanning**: `git log --all -S` answers "did we ever add X" in seconds.

## Analysis and product decisions

- **Honest numbers first, then the decision.** Revenue expectation ($3-8/month) was given before
  the revenue work was approved; lead time, not income, became the stated reason.
- **Find the gate, not the feature.** The growth loops existed; nobody reached the milestones
  that triggered them. Moving triggers beat building more.
- **Attribution by timing.** The install lift started before vc20 reached production, so the
  listings get the credit for acquisition and the app for engagement. Say which is which.
- **Ranked plan with a critic and a DON'T list.** The 13 Sep improvement plan (10 agents + critic)
  ended with an explicit do-not-build list, which has held.
- **Adversarial review workflows** (find on several dimensions -> try to refute each) found 6 real
  bugs in one pass and 3 in another, with refuted items listed so they do not come back.
- **Decision log in memory.** Every "do not re-litigate" item has a date and a reason.

## Windows + Claude Code mechanics worth remembering

- Node cannot read MSYS paths; pass `C:/...`. Temp files go in the session scratchpad, which is
  deleted with the session: **move anything durable out** (this handover exists because the
  scripts were still in a scratchpad).
- Tool results over ~32 KB are saved to a file and must be read back; a background task's
  `.output` file can look empty because node block-buffers stdout: make scripts write their own
  progress file.
- `MSYS_NO_PATHCONV=1` for `adb shell` paths; `cmd //c` for `.bat`; PowerShell 5.1 has no
  `&&`, no `?.`, and `Set-Content` corrupts non-ASCII (write JSON through Node).
- Git Bash `grep -c` over `dumpsys` output double-counts history sections; count the pattern that
  only pending entries match.
- `/compact` keeps the root `CLAUDE.md` only; nested rules reload on the next read there.
- The auto-mode classifier blocks credential hunting; ask the user for the path (as happened).
- Memory is per git repo; launching from a nested repo or a moved path creates stray memory dirs.

## Document production without Office

- `.xlsx`: dependency-free Node OOXML writer (`make-xlsx.js`), frozen header, autofilter,
  number formats; dates as strings need a date format or they render as serials.
- `.pdf`: Chrome headless `--print-to-pdf` with absolute forward-slash paths and a `sleep`
  before checking the file; CSS `@page` for pagination.
- Screenshot captions: .NET `System.Drawing` from PowerShell, text supplied via a UTF-8 JSON
  file written by Node.
