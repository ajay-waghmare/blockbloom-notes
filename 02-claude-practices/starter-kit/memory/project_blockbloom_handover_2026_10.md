---
name: project-blockbloom-handover-2026-10
description: "Block Bloom + Claude-practices handover folder built 10 Oct 2026 at D:\\abc\\Handover for Ajay's move to a personal laptop — what is in it, what was deliberately left out, and the decisions he still owes"
metadata:
  type: project
---

On 10 Oct 2026 Ajay said he is moving all Block Bloom work to another laptop and user, that code
will be cloned from GitHub, and asked for a handover of everything that is NOT code plus "all the
practices we have been using". Built at **`D:\abc\Handover\`** (inside his personal folder, see
[[project-personal-files-d-abc]]; never tidy or delete it).

## What is there
- `00-START-HERE.md` — migration checklist, pending decisions, two things not verifiable from here.
- `01-blockbloom\` — 8 docs (brief, state + history, release runbook, analytics, revenue plan,
  machine setup, open items, secrets manifest), `scripts\` (every Play/GA4/listing script from the
  session scratchpad + both `play-rollout.js` variants + `release-notes\vc20.json`/`vc21.json` +
  `D:\DevTools\_shared` + the emulator launcher), `reports\`, `history\` (two readable conversation
  logs: 2 Jun→20 Jul and 23 Aug→10 Oct 2026, extracted with `scripts\extract-conversation.js`,
  secrets redacted), `scratchpad-archive\` (the whole f4795aa1 scratchpad, 519 files).
- `02-claude-practices\` — 6 docs (setup layout, working agreement, techniques, memory system,
  skills/workflows, new-laptop setup) + `starter-kit\` (personal-laptop `CLAUDE.md`, a draft repo
  `CLAUDE.md`, `settings.json`, `memory\` with 38 files + `other-games\` + a new index, the 8
  standards, 10 templates, two NEW skills `blockbloom-release` and `blockbloom-analytics`, and the
  10 generic skills as optional).

## Deliberately NOT copied
- Secrets: keystores, `keystore.properties`, the Play SA key, `local.properties` — listed by path
  with sizes in `08-files-to-carry-manually.md` for him to carry by hand.
- The canonical `D--QiSpine\memory\user_profile.md` (holds a Jira API token + Resend key in
  plaintext — work credentials; flagged to Ajay to rotate/move to `~/.claude/.env`).
- QiSpine skills/rules, the multi-user VS Code setup, `.mcp.json` (local DB password), transcripts
  (only the extracted logs).

## Verified while building it (10 Oct 2026)
- Play tracks read live: production vc21 `inProgress` 0.2 + vc20 `completed`; alpha vc19;
  internal vc21 draft + vc20. Matches [[project-blockbloom-release]].
- All 21 worktrees clean except `main` (`tools/play-rollout.js` modified, `tools/release-notes/`
  untracked) and `BlockBloom-oct9` (`tools/play-reviews.js` untracked). `release/2026-10-09`
  carries a DIFFERENT `play-rollout.js` (auto-path by versionCode with a silent fallback) plus
  `tools/pull-metrics.js`; the two designs need reconciling when merging.
- Scratchpad archive and extracted logs scanned for key/token patterns: clean.

## Gotcha from this session
An existence check `grep -iE '^(storeFile|keystore|store)' keystore.properties` also matched
`storePassword=` and printed the keystore password into this session's transcript. Mask with
`cut -d= -f1` or match `^storeFile=` only. Ajay was told; the transcript stays on this laptop.

## Still his to decide (none actioned)
Merge the release branches into `main` vs the never-merge-master rule; reconcile the two
`play-rollout.js`; commit `vc20.json` + `play-reviews.js`; widen vc21 from 20%; gems-first vs
remove_ads-first; BillDesk; AdMob. See [[project-blockbloom-monetization]].

## Update 11 Oct 2026
Ajay: findings and daily work go to GitHub as NOTES, not into the code repo. `D:\abc\Handover` is now a
git repo (branch `journal`, local identity = personal Gmail) with `journal/YYYY-MM-DD.md` per working day;
`.gitignore` keeps logs, the scratchpad archive, the secrets manifest, QI Spine standards/rules and personal
memory out. First commit made locally; HE creates the private GitHub repo and pushes (commands in README.md).
The docs branch staged in the code repo was removed unpushed. See [[feedback-blockbloom-daily-journal]].
Pushed 11 Oct 2026: remote `origin` = https://github.com/ajay-waghmare/blockbloom-notes (private), branch `journal` is the default; two commits so far. Daily entries go in `journal/YYYY-MM-DD.md`, committed and pushed on `journal`.

Later on 11 Oct: the vc21.json claim was corrected everywhere (committed copy right, main's untracked copy
wrong), the review fixes landed on `release/2026-10-11` as vc22 1.11.1 (see
[[project-blockbloom-code-review-2026-10]]), and `scripts\release-notes\vc22.json` + the 11 Oct journal
entry were added to the notes repo. The code worktree for the branch is `D:\DevTools\BlockBloom-oct11`
(has keystore.properties + local.properties copied in; not for the handover).

## 19 Oct 2026 — the handover worked
Ajay has been working from the personal laptop (user `Ajay`) since 11 Oct: vc22 and vc23 were built,
uploaded and rolled out from there, and the journal was kept daily in the notes repo (entries 11, 12, 14,
15, 18, 19 Oct). On that machine Gradle's build dir is redirected to `C:\Users\Ajay\.build-blockbloom\app`
(a `build.gradle.kts` change on the release branches to dodge OneDrive file locks) — on THIS laptop the
same setting lands in `C:\Users\Ajay.Waghmare\.build-blockbloom\app`, so look for AABs/APKs there, not
under `app/build/`. Gotcha on this laptop: with sources on D: and the build dir on C:, the Kotlin daemon's
incremental compile dies with "this and base files have different roots" (seen on `bundleRelease` 19 Oct);
`./gradlew --stop` and rerun worked (7.5 min non-incremental). If it recurs, point the build dir at D: via
a local gradle property rather than editing `build.gradle.kts`. Pulling this laptop back in sync = `git fetch` + ff-only pulls in each worktree plus a
new worktree per release branch (`D:\DevTools\BlockBloom-oct17` = `release/2026-10-17`, added 19 Oct).
