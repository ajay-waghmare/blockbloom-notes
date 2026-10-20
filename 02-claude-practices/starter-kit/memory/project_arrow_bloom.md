---
name: project-arrow-bloom
description: "Arrow Bloom (com.aweagle.arrowbloom) — Ajay's second game; the line-arrow game (winding lines slide out, 3 hearts, up to 5 stars, shapes, light theme); vc3 DRAFT on internal + closed (alpha) 20 Oct, vc1 live; paths, scripts, hooks, what Ajay must do"
metadata:
  node_type: memory
  type: project
  originSessionId: f4795aa1-7942-4344-a6c4-e7b6487ba3f4
  modified: 2026-10-20T06:10:42.199Z
---

**Arrow Bloom** = AW EagleCraft's second game (sister of Block Bloom). Kotlin + Compose, zero backend, no INTERNET
permission, no ads/analytics/IAP. Package `com.aweagle.arrowbloom`.

**What the game is since build 2 (20 Oct 2026, ~11:30):** Ajay rejected build 1's look ("I didn't want this type
of UI") and sent screenshots of a line-arrow game: white board, dark winding arrows on a dot grid, 3 hearts,
Normal/Hard chip, hint with badge, # grid button. Build 2 is that genre with our identity (garden tints/accents,
petal bloom at the exit, Daily Bloom, shapes). Rule: an arrow (line, head first, cell behind head in line)
slides out along its own path; it can leave iff the line from its head to the board edge is empty. Wrong tap =
bump back + lose a heart; 0 hearts = same board again. Stars (build 3): up to 5 per board, every heart lost and
every hint used costs one, a clear keeps at least 1; Perfect = 5. Difficulty chip = solve depth
(Easy ≤3, Normal ≤6, Hard ≤8, Expert). Shapes every 5th level (heart/flower/diamond/circle); Daily shape varies.

**Where it lives on this laptop**
- Worktree `D:\DevTools\ArrowBloom-pub`, branch **`release/2026-10-20-line-arrows`** (90e7c4f build 2,
  fc3298c play-stage-draft.js, f628361 build 3 = five stars), cut from `release/2026-10-20` (build 1, 1a0d894/659746c/63bfd87). Pushed.
  `main` (dae1664) = 19 Oct scaffold; Ajay merges, never me.
- Notes `D:\abc\ArrowBloom-notes`, branch `journal` (pushed): checklist, copyright (build-2 genre note),
  runbook `04-PLAY-CONSOLE-RUNBOOK-2026-10-20.md` (Parts 1–9; Part 9 = roll out build 2), journal 2026-10-20.
- Privacy page live: `https://ajay-waghmare.github.io/app-policy/arrow-bloom-privacy.html` (app-policy main).
- Build dir `C:\Users\Ajay.Waghmare\.build-arrowbloom\app`; `keystore.properties`/`local.properties` copied from
  `D:\DevTools\BlockBloom-oct20` (gitignored, same upload key; never print the password). Same build env as
  Block Bloom (JDK 17 + jdkpatch, `dangerouslyDisableSandbox`, `./gradlew --stop` on "different roots").

**Play (20 Oct):** developer 8701670281323658688, app 4972007048514376994. Console setup complete
(all declarations). Tracks (12:00): internal = vc1 completed + **vc3 DRAFT "1.0.0 (3)"**; alpha (Closed Alpha, testers =
"Block Bloom Testers" list, 34 users) = vc1 completed (sent for review by browser Claude) + **vc3 DRAFT**.
vc2 was staged at 11:40 and replaced by vc3 before anyone rolled it out (vc2 is burnt, never used).
Listing text (8 locales) + new icon/feature graphic/6 screenshots committed by API. 12 testers × 14 days gate
applies (Dashboard says so). Opt-in link: `https://play.google.com/apps/testing/com.aweagle.arrowbloom`.

**Scripts** `ArrowBloom-pub\tools\`: `play-status.js`, `play-stage-draft.js` (one upload → drafts on several
tracks, keeps live releases, refuses to commit if one would vanish), `play-listings-set-multi.js`,
`play-images-upload.js`, `store-screenshots.js` (frames `store/screenshots/src/*.png`). SA key by path
`D:\Downloads\avid-airway-498216-e5-9f357c8e6b11.json`. See [[reference-play-api-track-update-gotcha]].

**Debug-only long-press hooks (1080×2400 AVD `bloomtest`):** arrows chip (113,331) = tap the hinted arrow;
hearts (537,331) = a wrong tap; title (541,171) = next garden; subtitle (540,234) = next multiple-of-5 level.
Walkthrough script was `ab-emu-walk-v2.sh` in the 20 Oct scratchpad (29 steps).

**Why:** Ajay wants that line-arrow game, released once testers approve; uniqueness via gardens, blooms,
Daily Bloom, shapes, own icon/colours. **How to apply:** next steps are Ajay's console clicks (runbook Part 9),
then testers. Saved runs are format v2 (bump the header whenever the generator changes). Keep garden colours
(do not drift to a plain copy of the reference screens); never copy its levels, icon or captions.
Related: [[project-blockbloom-release]], [[feedback-blockbloom-release-process]], [[feedback-never-merge-master]].
