# Block Bloom — notes, journal and handover

The record of **what happens around the game that is not the game's code**: a daily journal of
work done and changes made, the handover docs, the code reviews, the analytics pulls and the
Play/GA4 scripts. The app itself lives in `ajay-waghmare/BlockBloom`; this repo is what you read
before touching it.

## Layout

```
journal/                      one file per working day: what changed, where, why, what is next
  TEMPLATE.md                 copy this for a new day
  2026-10-10.md               first entry (vc21 release, handover, code review)
00-START-HERE.md              the laptop-move checklist and the decisions still open
01-blockbloom/                project brief, state + history, release runbook, analytics,
                              revenue plan, machine setup, open items, code review
  scripts/                    every Play / GA4 / listing / report script (Node, zero deps)
  reports/                    player workbooks, listing dumps, baselines
02-claude-practices/          how Claude Code is set up and the working rules, plus a
                              starter-kit (CLAUDE.md, settings, skills, templates, Block Bloom memory)
```

Not in git on purpose (see `.gitignore`): the conversation logs and scratchpad archive, the
secrets manifest, the work-laptop standards and rules, and personal memory files. They stay in
the local folder and move with the keystore and service-account key by hand.

## Keeping the journal

One file per day, named `journal/YYYY-MM-DD.md`, written at the end of the session from the
template. Claude writes it as part of "persist to memory" at session end; you can also add lines
by hand. Rules of thumb:

- Record the **live state** first (which versionCode is on which track, at what percentage).
- Every change says **where** (branch, commit, console page) and **why**.
- Numbers go in only when they change a decision.
- Decisions made today, and the ones still open, each get a line.
- Commit the day's file on a branch (`journal`), push, merge yourself.

## Pushing this repo the first time

Create an empty **private** repo on GitHub (no README, no .gitignore), then:

```
cd D:\abc\Handover
git remote add origin https://github.com/ajay-waghmare/blockbloom-notes.git
git push -u origin journal
```

Then on GitHub set `journal` as the default branch, or merge it into `main` yourself.
