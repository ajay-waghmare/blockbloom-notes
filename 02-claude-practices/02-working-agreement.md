# The working agreement (standing rules, with the why)

Every rule below was set by you after something went wrong or right. The memory files in
`starter-kit\memory\feedback_*.md` carry the full text; this is the one-page version.

## How to work together

1. **Ask before changing code.** A diagnosis ends with a proposed-changes list, then stops.
   A "why is this happening" question is a question, not a fix request (10 Oct: an explanation
   turned into an edit + commit pipeline and had to be reverted). Scratch scripts, memory and
   docs you asked for are fine.
2. **Decide, don't ask — once a recommendation exists.** "Continue" / "implement" / "clear the
   doubts" after a written recommendation means act, not re-poll. Reserve questions for real
   open-endedness.
3. **Push back and cross-question.** Before a decision closes: which rule it conflicts with, what
   data it breaks on, what the user sees. "Noted" is not an acceptable response to a flawed rule
   (9 Oct). The bar is "this will create a problem", not "I need permission".
4. **Counter your own patterns** (your words): overcomplicating by solving everything at once,
   researching instead of shipping, adding scope instead of finishing. One improvement at a time;
   problem -> solution -> why -> what to watch. Teach the reasoning, not just the fix.
5. **Reduce Claude dependency.** Micro-decisions get "you know this one, pick and go". Claude is
   for tool work: code, architecture, numbers, structured planning. Emotional expression goes to
   a human first.
6. **Persist to memory at session end.** Decisions, file/credential locations, build and deploy
   state, gotchas: topic file + one index line. Session knowledge must not evaporate.

## Engineering guardrails

7. **Verify before you recommend.** Read the file; confirm versions, paths and current code. A
   remembered fact is a snapshot; if memory contradicts code, code wins and memory gets fixed.
8. **No secrets in code, docs or memory.** Credentials by path or env var. A key once pasted in
   a chat gets rotated (the first Play key was).
9. **Worktree per requirement, created first.** Never edit feature A's files while on feature
   B's branch. Never chain `git checkout X && git pull origin X`; a failed checkout still pulls
   into whatever branch you are on.
10. **Never merge into master (any repo).** Claude stops at a pushed branch + the MR/PR link; you
    merge. (For Block Bloom the documented release flow ends in a merge to `main`; you still owe
    the call on whether this rule covers it.)
11. **Pull before merge and before build; push right after commit.** Building from a stale
    branch took a demo service down; unpushed commits were silently reverted by someone else's
    deploy.
12. **Additive by default; count callers before touching shared code.** A "small" shared-method
    edit can move behaviour you did not know existed. New method next to the old one, named for
    the difference.
13. **Run the tests before deploy**, not `-DskipTests`. New injected dependency = every
    `@InjectMocks` test needs the matching `@Mock` (work-repo flavour; the principle is general).
14. **No unrequested limits.** Never cap which records a job processes unless asked; propose a
    limit with the excluded count.
15. **Measure at scale before "done".** A slow run you have seen is fixed now or raised with
    numbers; never parked as a follow-up.
16. **Cherry-pick, don't merge, when syncing a shared branch back into a feature branch.**

## Tooling discipline

17. **No agent fan-outs for code checks, even with ultracode on.** Inline greps and reads. If
    breadth is genuinely needed, ask first with an agent count and what it buys. Usage limits
    are rationed; "start the next task" beats "polish this answer's confidence".
18. **Session hygiene.** `/clear` per task, `/compact` at ~150k, `model: 'sonnet'` for mechanical
    subagents, Opus only for judgement.
19. **No exhaustive branch scans.** `git log --all -S"<string>"` (seconds) or ask; a 150-ref
    grep took >5 minutes and you called it foolish.
20. **Read a build's exit code from the build, not the pipe.** `mvn ... | tail; echo $?` is
    tail's code. Log to a file, check the real exit, then check the artefact's timestamp.
21. **Heredocs eat regex escapes on this Windows setup** (`\b` became a backspace and a cleanup
    script gutted a file). Scripts with escapes go through an editor/Write; destructive scripts
    back up, sanity-check and dry-run first.
22. **Appending to config files: verify the seam, not the payload.** A file without a trailing
    newline glued a new block onto the last key and took a service down. Back up, force a
    separator, grep the join.
23. **One fix agent per finding.** A workflow with a Fix phase has already edited the tree by the
    time its result is read; re-read state before launching a follow-up; never stop an agent
    mid-write, let the build arbitrate.
24. **Every Bash chain in multi-repo work starts with an explicit `cd`.** Calls share one shell.

## Block Bloom-specific additions (from shipping vc5 to vc21)

25. **Never pipe a committing script.** EPIPE killed a Play commit after the uploads had happened.
26. **Verify the artifact before upload, read the track back after commit.** Play validates at
    commit; a rejected commit burns the versionCode.
27. **Release notes per release, never a hardcoded default.** A default that is right once is
    silently wrong for every release after (vc15's notes nearly shipped on vc20).
28. **Don't push or roll out unless asked.** Staged rollout first.
29. **Ship the proven build; never fake testers; submit ad-free first, add ads later as its own
    release; real ad ids and `ADS_ENABLED=true` land in the same commit.**
