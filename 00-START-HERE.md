# Block Bloom + Claude practices — handover

Prepared 10 Oct 2026 on the QI Spine work laptop, for moving Block Bloom and the Claude Code
working setup to a personal laptop and user account. Code is **not** in this folder: clone it
from GitHub. Everything here is what a clone does **not** give you.

## What is where

```
Handover\
  00-START-HERE.md                 <- this file: migration checklist + decisions you still owe
  01-blockbloom\
    01-project-brief.md            what the app is, every account/id, stack, repo map, flags
    02-current-state-and-history.md  state on 10 Oct 2026 (vc21 at 20%) + the full vc1->vc21 timeline
    03-release-runbook.md          how a release is actually shipped, and every way it has gone wrong
    04-analytics-and-metrics.md    how to pull Play/GA4 numbers, the latest numbers, the 3 traps
    05-revenue-plan.md             ads + IAP state, BillDesk/AdMob blockers, the recommendation
    06-new-machine-setup.md        toolchain + paths + emulator + what to edit after cloning
    07-open-items.md               prioritised backlog, with who owns each item
    08-files-to-carry-manually.md  the secrets manifest (paths only, nothing copied here)
    09-code-review-2026-10-10.md   vc21 release check + whole-project code review, ranked findings
    scripts\                       every Play/GA4/listing script that lived only in temp dirs
    reports\                       player workbooks, baseline report.json, store-listing dumps
    history\                       readable logs of the Block Bloom conversations (Aug->Oct 2026)
    scratchpad-archive\            the whole session scratchpad, untouched (31 MB, 519 files)
  02-claude-practices\
    01-how-claude-code-is-set-up.md  config layout, what loads when, memory/skills/standards
    02-working-agreement.md        the standing rules you set, with the why behind each
    03-techniques-that-worked.md   the engineering practices worth keeping (Block Bloom-tested)
    04-memory-system.md            how memory works and how to seed it on the new laptop
    05-skills-and-workflows.md     skill anatomy, Workflow/Agent use, cost discipline
    06-setup-on-new-laptop.md      step-by-step: install -> config -> memory -> first prompt
    starter-kit\                   drop-in files: CLAUDE.md, settings.json, memory\, skills\,
                                   standards\, templates\ (see starter-kit\README.md)
```

## Migration checklist, in order

1. **Carry the secrets by hand** (USB or an encrypted archive, never chat/email).
   List and verification commands: `01-blockbloom\08-files-to-carry-manually.md`.
2. **Clone the repos** on the new laptop:
   ```
   git clone https://github.com/ajay-waghmare/BlockBloom.git   D:\DevTools\BlockBloom
   git clone https://github.com/ajay-waghmare/app-policy.git   D:\DevTools\app-policy
   ```
   Every branch is on GitHub. The only things not in git are listed in
   `02-current-state-and-history.md` under "Uncommitted work" (copies are in `scripts\`).
3. **Install the toolchain** and put the secrets where the build expects them:
   `01-blockbloom\06-new-machine-setup.md`.
4. **Set up Claude Code** (global CLAUDE.md, settings, standards, skills, then the memory
   folder once the repo slug exists): `02-claude-practices\06-setup-on-new-laptop.md`.
5. **Verify** before relying on anything: unit tests green, a release bundle builds, and
   `node tools\play-status.js <sa.json> com.aweagle.blockbloom` (read-only) prints the tracks.
6. **First prompt to Claude on the new laptop** (paste as-is):
   > Read D:\...\Handover\00-START-HERE.md and 01-blockbloom\02-current-state-and-history.md,
   > then confirm what you know about Block Bloom's current state. Do not change any code.
7. **When you give the work laptop back**, wipe the personal material: `D:\abc` (you delete it),
   `D:\DevTools` (games, keystores, patch), `D:\Downloads\avid-airway-*.json`,
   `C:\Users\Ajay.Waghmare\Documents\BlockBloom-players*.xlsx`, the Block Bloom memory files and
   transcripts under `C:\Users\Ajay.Waghmare\.claude\projects\`, the `bloomtest` AVD under
   `C:\Users\Ajay.Waghmare\.android\avd\`, and the browser logins for the personal Google account.

## Decisions still yours (nothing below was actioned)

- **Merge the release branches into `main`.** `main` is 21 commits behind `release/vc19` and
  further behind `release/2026-10-09`, which is what is live. The documented flow ends in a
  merge to `main`, but your standing rule "never merge into master, any repo" was set on the
  work repos. Say which reading applies to Block Bloom.
- **Two versions of `tools/play-rollout.js` exist.** `main` (uncommitted) requires
  `PLAY_RELEASE_NOTES=<file>` and refuses to run without it. `release/2026-10-09` (committed on
  10 Oct) auto-loads `tools/release-notes/vc<N>.json` but silently falls back to "Bug fixes and
  visual polish." Recommendation: keep the auto-path, delete the fallback. Both copies are in
  `scripts\`.
- **Two files exist only on this laptop:** `tools/release-notes/vc20.json` (untracked on main)
  and `tools/play-reviews.js` (untracked in the vc21 worktree). Copies are in `scripts\`; commit
  them on the new laptop or let them go.
- **vc21 has sat at 20% since 10 Oct.** Widen it once Crashlytics is quiet; GA4 showed the first
  ever `app_exception` on 9 Oct (1 user).
- **Fix the committed es-419 release note.** `tools/release-notes/vc21.json` on the release branch carries a Portuguese fragment ("mais fluida com botão"); the text live on Play is correct. One-line fix before the next rollout. The code review (`01-blockbloom\09-code-review-2026-10-10.md`) also found two latent ads-path bugs, a dead Remote Config events class and a missing portrait lock; none affect what is live today.
- **Revenue:** gems-first or remove_ads-first, the BillDesk verification, and the AdMob account.
  See `05-revenue-plan.md`.

## Two things I could not verify from here

- Whether **Play App Signing** is enabled (it must be, because the app ships as AABs, which
  means the `aw-eagle` keystore is an *upload* key and is resettable through Play support if
  lost). Confirm in Play Console -> Setup -> App signing.
- The **BillDesk** verification status. There is no API; only the console shows it.

## A note on secrets in this session

While checking which secret files exist, one command printed the keystore password into this
session's transcript (`C:\Users\Ajay.Waghmare\.claude\projects\d--QiSpine-backend-qispine-webservices\f4795aa1-...jsonl`).
Nothing in this folder contains it, and the extracted conversation logs drop tool output. Delete
that transcript when you leave this laptop, or rotate the upload key through Play App Signing.
