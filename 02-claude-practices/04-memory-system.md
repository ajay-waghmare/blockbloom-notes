# The memory system

Full reference: `starter-kit\standards\memory-strategy.md`. This page is the operating summary
plus the new-laptop seeding steps.

## How it works

- Memory lives at `~\.claude\projects\<repo-slug>\memory\`. One directory per git repo; all
  worktrees share it. Outside a repo, the project-root path is used. Machine-local, never synced.
- `MEMORY.md` is the **index**; only its first 200 lines / 25 KB load at session start. Keep it
  under ~120 lines so nothing is silently cut.
- Topic files load when Claude reads them. Put the detail there, one topic per file.
- Each file has frontmatter: `name`, `description` (what a reader skims; make it specific),
  `type` (`user` | `feedback` | `project` | `reference`). `feedback` files carry **Why** and
  **How to apply**.
- Index line shape: `- [Title](file.md) — what's inside + a CHECK-THIS-FIRST hint`. Group:
  User/Feedback -> Active -> Reference -> Archived.

## What goes in, what stays out

In: decisions and why, file/credential **locations**, build/deploy state, gotchas a future
session would otherwise rediscover, dated verifications ("confirmed 2026-10-10").
Out: code structure (it goes stale instantly), git history, in-flight TODOs, anything already in
`CLAUDE.md` or a repo doc, and **any live secret**.

## Habits that kept it useful

- A **CURRENT STATE — <date> (read this first)** block at the top of the main project file,
  rewritten each time, with the history below it. `project_blockbloom_release.md` is the model.
- Extend an existing file rather than fork a new one; when a newer file supersedes, fold the
  unique detail forward and delete the old one.
- Each gotcha records the date and the incident, so staleness can be judged.
- Session end: topic file updated + one index line, every time. The scripts `mem-update.js` /
  `mem-index.js` in the scratchpad archive show the idempotent-update pattern (insert the block
  if absent, replace the index line if present).
- Move shipped/idle work to an Archived section instead of deleting it.

## Seeding memory on the new laptop

1. Clone the repo and open a terminal **inside** it, so the slug is the repo's.
2. Run `claude` once with any prompt. Look in `~\.claude\projects\` for the new slug directory
   (something like `D--DevTools-BlockBloom`).
3. Create `memory\` inside it and copy **everything** from `starter-kit\memory\` into it,
   including `MEMORY.md` and the `other-games\` subfolder (move those three files up a level or
   leave the index lines pointing at the subfolder; both work because Claude reads by path).
4. Fill in `reference_personal_laptop_environment.md` (it has TODO placeholders for the paths you
   chose) so Claude stops assuming the work-laptop layout.
5. Test: ask "What do you remember about Block Bloom and what is live right now?" The answer
   should say vc21 at 20% on 10 Oct 2026 and name the open decisions.

If you later work on Block Bloom from a different directory (for example a worktree outside the
repo path), check which slug loaded (`/memory` or look at the index that appears) before trusting
the context.

## Transcripts

Session transcripts (`*.jsonl` next to `memory\`) are deleted after about 30 days. They are the
raw history; memory is the distilled one. `01-blockbloom\scripts\extract-conversation.js` turns a
transcript into a readable prompts-and-replies log with secret lines redacted. Use it before a
session ages out if the conversation itself is worth keeping.
