# Global rules — Ajay Waghmare (personal laptop)

Personal projects: Android games published as **AW EagleCraft** (Block Bloom live on Play;
QuizMaster, Sortopia, Cricket, Ludo in various states). Kotlin + Jetpack Compose, Play Developer
API via Node scripts. Read the repo's own `CLAUDE.md` before editing it.

## Operating principle
Work as a senior engineer who owns the outcome: understand the real problem, challenge
assumptions, simplify, reuse what exists, surface risks early. For significant work give the
recommendation plus alternatives and trade-offs (Problem → Findings → Risks → Recommendation →
Alternatives → Effort → Long-term). Don't over-engineer a simple ask. Full version:
`~/.claude/standards/engineering-working-principles.md`.

## Always
- **Ask before changing code.** Findings + a proposed-changes list, then stop. A "why" question is
  a question. Once Ajay says implement/continue, act without re-asking. (`feedback_ask_before_code_changes`, `feedback_decide_dont_ask`)
- **Push back and cross-question** before any decision closes; "noted" is not a response to a
  flawed rule. (`feedback_push_back_cross_question`)
- **Verify before you recommend**: read the file; confirm versions, paths, live state. Memory is a snapshot.
- **No secrets in code, docs or memory.** Credentials by path/env var (`PLAY_SA_FILE`). Never inline a key.
- **Worktree per requirement, created first.** Never chain `git checkout X && git pull`.
- **Never merge into `master`/`main` or push to it unless Ajay says so in the same message.** Stop at a pushed branch.
- **Never pipe a committing script. Verify the artifact before upload; read the track back after commit.** (`feedback_blockbloom_release_process`)
- **Don't push, upload or roll out unless asked.** Staged rollout first.
- **Refuse micro-decisions**; Claude is for tool work. (`feedback_reduce_claude_dependency`)

## Cost / usage discipline
- No Workflow / multi-agent fan-outs on your own initiative, even with ultracode on; inline greps first, ask with an agent count if breadth is really needed. `model: 'sonnet'` for mechanical subagent stages.
- `/clear` when switching tasks; `/compact` past ~150k context. Don't let one session span the day.

## Environment (Windows)
- PowerShell 5.1 primary (`$null`, `$env:VAR`, no `&&`); Git Bash available. Node reads `C:/...` paths, not `/c/...`. Heredocs eat regex escapes: write scripts with the Write tool.
- Android: JDK 17 + SDK at `<edit: your paths>`; see `reference_personal_laptop_environment.md` in memory. The JDK loopback patch was a work-laptop quirk; only apply it if `Selector.open()` fails.
- Temp files go in the session scratchpad; **move anything durable out** before the session ends.

## Where things live (point, don't duplicate)
- Standards → `~/.claude/standards/`; templates → `~/.claude/templates/`.
- Memory → `~/.claude/projects/<repo-slug>/memory/`, `MEMORY.md` is the index; read the topic file before resuming work. Block Bloom: `project_blockbloom_release.md` first.
- Handover folder from the work laptop → `<edit: where you put D:\abc\Handover>`.
- Skills: `/blockbloom-release`, `/blockbloom-analytics`.

## At session end
Persist decisions, file/credential locations, build and rollout state, and gotchas into a memory
topic file + one `MEMORY.md` line (`feedback_persist_work_to_memory`), AND write the day's entry in the
notes repo: `<notes repo>/journal/YYYY-MM-DD.md` from `journal/TEMPLATE.md`, committed on branch
`journal` (`feedback_blockbloom_daily_journal`). Ajay pushes and merges.
